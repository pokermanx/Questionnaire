import { Injectable } from '@angular/core';
import { AnswerFactory } from '../factories/answer.factory';
import { Answer, IAnswer } from '../models/answer.model';

@Injectable({
    providedIn: 'root'
})
export class AnswersService {

    private readonly ANSWERS_LIST_KEY = 'answers';

    getAnswersList(): Answer[] {
        const uprasedAnswers = localStorage.getItem(this.ANSWERS_LIST_KEY) || '';
        let answers;

        if (!!uprasedAnswers) {
            try {
                answers = JSON.parse(uprasedAnswers);
            } catch {
                alert(`${this.ANSWERS_LIST_KEY} parse error`);
            }
        }

        if (!Array.isArray(answers)) {
            answers = [];
        }

        return answers.map((answer: IAnswer) => AnswerFactory.toModel(answer));
    }

    addAnswer(answer: IAnswer): void {
        const answers = this.getAnswersList();
        answers.push(answer);
        this.updateAnswersList(answers);
    }

    deleteAnswer(questionId: string): void {
        let answers = this.getAnswersList();
        answers = answers.filter(x => x.questionId !== questionId);
        this.updateAnswersList(answers);
    }

    private updateAnswersList(answers: IAnswer[]): void {
        let stringifiedAnswers = '';

        try {
            stringifiedAnswers = JSON.stringify(answers);
        } catch {
            alert(`answers stringify error`);
        }

        localStorage.setItem(this.ANSWERS_LIST_KEY, stringifiedAnswers)
    }
}