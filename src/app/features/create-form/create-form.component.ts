import { BugsService } from './../../shared/common-services/bugs.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bug } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  priorities: Array<number> = [1, 2, 3];
  reporters: Array<string> = ['', 'QA', 'PO', 'DEV'];
  statuses: Array<string> = ['', 'Ready for test', 'Done', 'Rejected'];

  bug: Bug;
  routeParamID: string;

  form: FormGroup;

  constructor(private service: BugsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      reporter: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('')
    });
    this.setStatusValidator();


    this.route.params.subscribe(p => {
      console.log(p);
      this.routeParamID = p.id;
      if (p.id != null) { this.fetchBugById(p.id) }
    });

  }

  fetchBugById(id: string) {
    this.service.getBugByID(id).subscribe((data: Bug) => {
      console.log(data);
      this.form.patchValue(data);
    });
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
      if (this.routeParamID) {
        this.service.saveBugRecord(this.form, this.routeParamID).subscribe(response => {
          console.log(response);
          this.router.navigate(['/']);
        });
      } else {
        this.service.createBugRecord(this.form).subscribe(response => {
          console.log(response);
          this.router.navigate(['/']);
        });
      }
    }
  }

}
