import { Component, OnInit } from '@angular/core';
import { BugsService } from 'src/app/shared/common-services/bugs.service';
import { Bug, Pagination, PaginatedResult } from '../../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bugsList: Array<Bug> = [];
  userParams: any = {};
  pagination: Pagination;
  currentPage: number = 0;
  priorities: Array<number> = [1, 2, 3];
  reporters: Array<string> = ['', 'QA', 'PO', 'DEV'];
  statuses: Array<string> = ['', 'Ready for test', 'Done', 'Rejected'];
  form: FormGroup

  constructor(private service: BugsService) {
    this.userParams.sortBy = 'title';
    this.userParams.orderBy = 'desc';
    this.userParams.title = '';
    this.userParams.reporter = '';
    this.userParams.priority = '';
    this.userParams.status = '';
  }

  ngOnInit() {
    // this.fetchBugs();
      this.form = new FormGroup({
      title: new FormControl(),
      reporter: new FormControl(),
      priority: new FormControl(),
      status: new FormControl()
    });

    this.loadBugs(this.currentPage);
  }

  fetchBugs() {
    this.service.getBugsList().subscribe(data => this.bugsList = data);
  }


  orderBy() {
    this.userParams.orderBy = this.orderType();
    this.loadBugs(this.currentPage);
  }

  orderType() {
    return (this.userParams.orderBy && this.userParams.orderBy === 'asc')
      ? 'desc'
      : 'asc';
  }

  next() {
    this.currentPage ++;
    this.loadBugs(this.currentPage);
  }

  previous() {
    this.currentPage --;
    this.loadBugs(this.currentPage);
  }

  loadBugs(page: number) {
    this.service.getBugsListByParams(page, 5, this.userParams)
      .subscribe((res: PaginatedResult<Bug[]>) => {
        this.bugsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        console.log(error);
      });
  }

  search() {
    this.userParams.title = this.form.get('title').value;
    this.userParams.reporter = this.form.get('reporter').value;
    this.userParams.priority = this.form.get('priority').value;
    this.userParams.status = this.form.get('status').value;

    this.loadBugs(this.currentPage);
  }
}
