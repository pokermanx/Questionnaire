import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { ManageQuestionsComponent } from './questions-managment/questions-managment.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'questions'
      },
      {
        path: 'manage-questions',
        component: ManageQuestionsComponent
      },
      {
        path: 'add-question',
        component: QuestionFormComponent
      },
      {
        path: 'edit-question',
        redirectTo: 'manage-questions',
      },
      {
        path: 'edit-question/:id',
        component: QuestionFormComponent
      },
      {
        path: 'questions',
        component: QuestionsListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
