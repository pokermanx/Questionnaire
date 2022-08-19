import { Answer, IAnswer } from "../models/answer.model";

export class AnswerFactory {
    static toModel(answer: IAnswer): Answer {
        return new Answer(
            answer.questionId,
            answer.answer,
            answer.answerDate,
        );
    }
}