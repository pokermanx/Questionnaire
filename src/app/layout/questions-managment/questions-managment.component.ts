import { Component, OnInit } from '@angular/core';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-questions-managment',
  templateUrl: './questions-managment.component.html',
  styleUrls: ['./questions-managment.component.scss']
})
export class ManageQuestionsComponent implements OnInit {

  questions: Question[] = [];

  get QuestionType() {
    return QuestionType;
  }

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    const questions = this.questionService.getQuestionsList();

    questions.sort((a,b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated))

    this.questions = questions;
  }

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id);
    this.questions = this.questions.filter(x => x.id !== id);
  }

  questionsTrack(i: number, question: Question): string {
    return question.id;
  }
}
