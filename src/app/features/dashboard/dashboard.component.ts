import { Component, OnInit } from '@angular/core';
import { BugsService, Bug } from 'src/app/shared/common-services/bugs.service';

export interface Pagination {
  currentPage: 0;
  itemsPerPage: 10;
  totalItems: 10;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bugsList: Array<Bug> = []

  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  // bugsList: Array<Bug> = []

  constructor(private service: BugsService) { }

  ngOnInit() {
    // this.fetchBugs();
    this.loadUsers();
  }

  fetchBugs() {
    this.service.getBugsList().subscribe(data => this.bugsList = data);
  }


  loadUsers() {
    this.service.getBugsListByParams(0, 10, this.userParams)
      .subscribe((res: PaginatedResult<Bug[]>) => {
        this.bugsList = res.result;
        this.pagination = res.pagination;
    }, error => {
         console.log(error);
    });
  }

}
