import { BugsService } from './../../shared/common-services/bugs.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  priorities: Array<number> = [1, 2, 3];
  reporters: Array<string> = ['', 'QA', 'PO', 'DEV'];
  statuses: Array<string> = ['', 'Ready for test', 'Done', 'Rejected'];

  form: FormGroup;

  constructor(private service: BugsService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      priority: new FormControl(0, Validators.required),
      status: new FormControl('')
    });
   }

  ngOnInit() {

    this.setStatusValidator();

  }

  setStatusValidator() {
    this.form.get('reporter').valueChanges.subscribe(
      status => {
        if (status === 'QA'){
          this.form.get('status').setValidators(Validators.required);
        }
      }
    );
  }

  formSubmit() {
    if (this.form.valid) {
      this.service.saveBugRecord(this.form);
    }
  }

}
