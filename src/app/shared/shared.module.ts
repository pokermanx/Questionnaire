import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { QSValidationComponent } from "./components/qs-validation/qs-validation.component";
import { EnumValuesPipe } from "./pipes/enum-values";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
    ],
    declarations: [
        EnumValuesPipe,
        QSValidationComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        EnumValuesPipe,
        QSValidationComponent
    ]
})
export class SharedModule { }
