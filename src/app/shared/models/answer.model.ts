export class Answer implements IAnswer {

    questionId: string;
    answer: any;
    answerDate: string;

    constructor(
        questionId: string,
        answer: any,
        answerDate: string,
    ) {
        this.questionId = questionId;
        this.answer = answer;
        this.answerDate = answerDate;
    }
}

export interface IAnswer {
    questionId: string;
    answer: any;
    answerDate: string;
}