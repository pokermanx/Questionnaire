import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Dictionary } from '../../utils/models';

@Component({
  selector: 'qs-validation',
  templateUrl: './qs-validation.component.html',
  styleUrls: ['./qs-validation.component.scss']
})
export class QSValidationComponent {

  @Input() control!: AbstractControl;
  @Input() messages: Dictionary<string> = {};

  @Input() showOnDirty = false;
  @Input() forceShow = false;

  @Input() name!: string;

  get showValidation() {
    return this.control.invalid || (this.showOnDirty && this.control.dirty);
  }
  get forceShowValidation() {
    return this.forceShow || (this.showOnDirty && this.control.dirty);
  }
  constructor() { }

  trackMessages(i: number, item: any) {
    return item.key;
  }
}
