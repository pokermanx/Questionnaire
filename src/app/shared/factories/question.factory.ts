import { IAnswer } from '../models/answer.model';
import { AnsweredQuestion, IQuestion, Question } from '../models/question.model';

export class QuestionFactory {

    static toAnsweredModel(question: IQuestion, answer: IAnswer): AnsweredQuestion {
        return new AnsweredQuestion(
            question,
            answer.answer,
            answer.answerDate,
        )
    }

    static toModel(question: IQuestion): Question {
        return new Question(
            question.id,
            question.type,
            question.text,
            question.dateCreated,
            question.options || [],
            question.assignedControl || undefined
        );
    }
}