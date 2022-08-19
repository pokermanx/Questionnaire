import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { QuestionFactory } from 'src/app/shared/factories/question.factory';
import { IAnswer } from 'src/app/shared/models/answer.model';
import { AnsweredQuestion, Question } from 'src/app/shared/models/question.model';
import { AnswersService } from 'src/app/shared/services/answers.service';
import { QuestionService } from 'src/app/shared/services/questions.service';
import { Constrains } from 'src/app/shared/utils/constrains';
import { checkMadeChoice, requiredNoWhiteSpace } from 'src/app/shared/utils/validators';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  unansweredQuestions: Question[] = [];
  answeredQuestions: AnsweredQuestion[] = [];

  get QuestionType() {
    return QuestionType;
  }

  constructor(
    private fb: FormBuilder,
    private answersService: AnswersService,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    const questions = this.questionService.getQuestionsList();
    const answers = this.answersService.getAnswersList();

    ({
      unansweredQuestions: this.unansweredQuestions,
      answeredQuestions: this.answeredQuestions
    } = questions.reduce((accum, question) => {
      const answer = answers.find(y => y.questionId === question.id);

      if (question.type === QuestionType.MultipleChoice) {
        question.assignedControl = this.fb.group({}, { validators: [checkMadeChoice()] });
        question.options.forEach(option => (question.assignedControl as FormGroup).addControl(option, new FormControl()));
      } else {
        const validators = [...requiredNoWhiteSpace];

        if (question.type === QuestionType.Open) {
          validators.push(Validators.maxLength(Constrains.Answer.MaxTextAnswerLngth));
        }

        question.assignedControl = new FormControl(null, validators);
      }

      if (!!answer) {
        question.assignedControl.patchValue(answer.answer);
        question.assignedControl.disable();
        accum.answeredQuestions.push(QuestionFactory.toAnsweredModel(question, answer));
      } else {
        accum.unansweredQuestions.push(QuestionFactory.toModel(question));
      }

      return accum;
    },
      {
        unansweredQuestions: [] as Question[],
        answeredQuestions: [] as AnsweredQuestion[]
      }
    ));

    this.sortQuestion();
  }

  answerQuestion(question: Question) {
    const answer: IAnswer = {
      answer: question.assignedControl?.value,
      answerDate: (new Date()).toISOString(),
      questionId: question.id
    };

    this.answersService.addAnswer(answer);

    question.assignedControl?.disable();

    this.unansweredQuestions = this.unansweredQuestions.filter(x => x.id !== question.id);

    this.answeredQuestions.push(QuestionFactory.toAnsweredModel(question, answer));

    this.sortQuestion();
  }

  deleteAnswer(answered: AnsweredQuestion): void {
    this.answersService.deleteAnswer(answered.question.id);

    answered.question.assignedControl?.enable();

    if (answered.question.type === QuestionType.MultipleChoice) {
      answered.question.assignedControl?.reset();
    } else {
      answered.question.assignedControl?.setValue(null);
    }

    this.answeredQuestions = this.answeredQuestions.filter(x => x.question.id !== answered.question.id);

    this.unansweredQuestions.push(QuestionFactory.toModel(answered.question));

    this.sortQuestion();
  }

  questionsTrack(i: number, question: Question): string {
    return question.id;
  }

  answeredQuestionsTrack(i: number, answered: AnsweredQuestion): string {
    return answered.question.id;
  }

  private sortQuestion() {
    this.unansweredQuestions.sort((a, b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated));
    this.answeredQuestions.sort((a, b) => Date.parse(b.answerDate) - Date.parse(a.answerDate));
  };
}
