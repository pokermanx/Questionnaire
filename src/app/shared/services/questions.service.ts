import { Injectable } from '@angular/core';
import { QuestionFactory } from '../factories/question.factory';

import { IQuestion, Question } from '../models/question.model';
import { AnswersService } from './answers.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    private readonly QUESTIONS_LIST_KEY = 'questions';

    constructor(private answersService: AnswersService) { }

    getQuestionsList(): Question[] {
        const uprasedQuestions = localStorage.getItem(this.QUESTIONS_LIST_KEY) || '';
        let questions;

        if (!!uprasedQuestions) {
            try {
                questions = JSON.parse(uprasedQuestions);
            } catch {
                alert(`${this.QUESTIONS_LIST_KEY} parse error`);
            }
        }

        if (!Array.isArray(questions)) {
            questions = [];
        }

        return questions.map((question: IQuestion) => QuestionFactory.toModel(question));
    }

    getQuestionById(id: string): Question | undefined {
        const questions = this.getQuestionsList();
        const question = questions.find(x => x.id === id) as IQuestion;

        if (!question) {
            return undefined;
        }

        return QuestionFactory.toModel(question);
    }

    updateQuestion(question: Question): void {
        const questions = this.getQuestionsList();
        const index = questions.findIndex(x => x.id === question.id);
        if (index !== -1) {
            questions[index] = question;
            this.updateQuestionsList(questions);
        }
    }

    addQuestion(question: Question): void {
        const questions = this.getQuestionsList();
        questions.push(question);
        this.updateQuestionsList(questions);
    }

    deleteQuestion(id: string): void {
        let questions = this.getQuestionsList();
        questions = questions.filter(x => x.id !== id);
        this.updateQuestionsList(questions);

        this.answersService.deleteAnswer(id);
    }

    private updateQuestionsList(questions: Question[]): void {
        let stringifiedQuestions = '';

        try {
            stringifiedQuestions = JSON.stringify(questions);
        } catch {
            alert(`questions stringify error`);
        }

        localStorage.setItem(this.QUESTIONS_LIST_KEY, stringifiedQuestions)
    }
}