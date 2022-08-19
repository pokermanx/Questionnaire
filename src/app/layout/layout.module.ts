import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { ManageQuestionsComponent } from './questions-managment/questions-managment.component';

@NgModule({
  imports: [
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    QuestionFormComponent,
    ManageQuestionsComponent,
    QuestionsListComponent
  ]
})
export class LayoutModule { }
