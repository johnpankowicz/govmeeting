import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DropdownValue } from './dropdown.value';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'dropdown',
  templateUrl: 'dropdown.component.html'
})
export class DropdownComponent {

  @Input()
  values: DropdownValue[];

 @Output()
  selectSpeaker: EventEmitter<number>;

 @Output()
  addSpeaker: EventEmitter<string>;

  constructor(public fb: FormBuilder) {
    this.selectSpeaker = new EventEmitter();
    this.addSpeaker = new EventEmitter();
  }

  public newOptionForm = this.fb.group({
    newOption: ["", Validators.required],
  });

  onSelectChange(i: number) {
    // console.log("DropdownComponent - selected index=" + i);
    this.selectSpeaker.emit(i);
  }

  onNewEntry(event: any) {
    //console.log(event);
    //console.log(this.loginForm.value);
    var value = this.newOptionForm.value.newOption;
    this.newOptionForm.reset();
    this.addSpeaker.emit(value);
  }
}

/**
Then you can use the component like this:
  <dropdown [values]="dropdownvalues" (select)="action($event)"></dropdown>
Note that dropdownvalues and the action method are on the parent component (not the dropdown one).
  dropdownvalues: DropdownValue [] = [
    {'value': 'value1', 'label': 'label1'},
    {'value': 'value2', 'label': 'label2'},
    {'value': 'value3', 'label': 'label3'}
  ];
  action(d: any){
    console.log("selected=" + d.label);
  }
**/