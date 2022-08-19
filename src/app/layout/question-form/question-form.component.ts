import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { QuestionType } from 'src/app/shared/enums/question-type.enum';
import { QuestionFactory } from 'src/app/shared/factories/question.factory';
import { Question } from 'src/app/shared/models/question.model';
import { QuestionService } from 'src/app/shared/services/questions.service';
import { Utils } from 'src/app/shared/utils/utils.service';
import { requiredNoWhiteSpace } from 'src/app/shared/utils/validators';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit, OnDestroy {

  question!: Question;

  questionForm!: FormGroup;

  get QuestionType() {
    return QuestionType;
  }

  get text(): FormControl {
    return this.questionForm.get('text') as FormControl;
  }
  get type(): FormControl {
    return this.questionForm.get('type') as FormControl;
  }
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  get optionControls(): FormControl[] {
    return this.options.controls as FormControl[];
  }

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { this.createForm() }

  ngOnInit(): void {
    const currentId = this.route.snapshot.params['id'];

    if (!!currentId) {
      const question = this.questionService.getQuestionById(currentId);

      if (!!question) {
        this.question = question;
        this.patchValue();
      } else {
        this.backToManage();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (!!this.question) {
      const updatedQuestion = QuestionFactory.toModel({
        id: this.question.id,
        dateCreated: this.question.dateCreated,
        ...this.questionForm.value
      });

      this.questionService.updateQuestion(updatedQuestion);
    } else {
      const newQuestion = QuestionFactory.toModel({
        id: Utils.UUID(),
        dateCreated: (new Date()).toISOString(),
        ...this.questionForm.value
      });

      this.questionService.addQuestion(newQuestion);
    }

    this.backToManage();
  }

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id);
    this.backToManage();
  }

  addAnswerOption(): FormControl {
    const control = new FormControl(null, requiredNoWhiteSpace);
    this.options.push(control);
    return control;
  }

  deleteAnswerOption(i: number) {
    this.options.removeAt(i);
  }

  backToManage() {
    this.router.navigate(['/manage-questions']);
  }

  private patchValue() {
    this.question.options.forEach(() => this.addAnswerOption());
    this.questionForm.patchValue(this.question);
  }

  private createForm() {
    this.questionForm = this.fb.group({
      text: new FormControl(null, requiredNoWhiteSpace),
      type: new FormControl(QuestionType.SingleChoice, [Validators.required]),
      options: this.fb.array([], [Validators.required, Validators.minLength(2)])
    });

    this.type.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: QuestionType) => {
        if (val === QuestionType.Open) {
          this.options.disable();
        } else {
          this.options.enable();
        }
      });
  }
}
