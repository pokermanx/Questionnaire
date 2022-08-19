import { FormControl, FormGroup } from '@angular/forms';

import { QuestionType } from '../enums/question-type.enum';

export class AnsweredQuestion {

    question: Question;
    answer: any;
    answerDate: string;

    constructor(
        question: Question,
        answer: any,
        answerDate: string
    ) {
        this.question = question;
        this.answer = answer;
        this.answerDate = answerDate;
    }
}

export class Question implements IQuestion {

    id: string;

    type: QuestionType;
    text: string;
    dateCreated: string;
    options: string[];

    assignedControl: FormControl | FormGroup | undefined;

    constructor(
        id: string,
        type: QuestionType,
        text: string,
        dateCreated: string,
        options?: string[],
        assignedControl?: FormControl | FormGroup,
    ) {
        this.id = id;
        this.type = type;
        this.text = text;
        this.dateCreated = dateCreated;
        this.options = options || [];
        this.assignedControl = assignedControl;
    }
}

export interface IQuestion {
    id: string;
    type: QuestionType;
    text: string;
    dateCreated: string;
    options: string[];
    assignedControl: FormControl | FormGroup | undefined;
}
