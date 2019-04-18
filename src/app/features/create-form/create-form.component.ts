import { BugsService } from './../../shared/common-services/bugs.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private service: BugsService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('')
    });
    this.setStatusValidator();

  }

  setStatusValidator() {
    this.form.get('reporter').valueChanges.subscribe(
      reporter => {
        if (reporter === 'QA') {
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
