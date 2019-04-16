import { BugsService } from './../../shared/common-services/bugs.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bug } from 'src/app/shared/common-services/bugs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  priorities: Array<string> = ['', 'Minor', 'Major', 'Critical'];
  reporters: Array<string> = ['', 'QA', 'PO', 'DEV'];
  statuses: Array<string> = ['', 'Ready for test', 'Done', 'Rejected'];

  form: FormGroup;
  bug: Bug;

  constructor(private service: BugsService, private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
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
      this.bug.title = this.form.get('title').value;
      this.bug.description = this.form.get('description').value;
      this.bug.comments.description = this.form.get('comments').value;
      this.bug.comments.reporter = this.form.get('reporter').value;
      this.bug.reporter = this.form.get('reporter').value;
      this.bug.priority = this.form.get('priority').value;
      this.bug.status = this.form.get('status').value;

      this.service.saveBugRecord(this.bug);
      this.router.navigate(['']);
      console.log('--------- save');
    }
    console.log('--------- not valid');
  }

}
