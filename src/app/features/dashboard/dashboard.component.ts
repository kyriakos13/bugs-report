import { Component, OnInit } from '@angular/core';
import { BugsService } from 'src/app/shared/common-services/bugs.service';
import { Bug } from '../../models';
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
  userParams: any = {};
  pagination: Pagination;


  constructor(private service: BugsService) {
    this.userParams.sortBy = 'title';
    this.userParams.orderBy = 'desc';
  }

  ngOnInit() {
    // this.fetchBugs();
    this.loadBugs();
  }

  fetchBugs() {
    this.service.getBugsList().subscribe(data => this.bugsList = data);
  }


  orderBy() {
    this.userParams.orderBy = this.orderType();
    this.loadBugs();
  }

  orderType() {
    return (this.userParams.orderBy && this.userParams.orderBy === "asc")
      ? "desc"
      : "asc";
  }

  loadBugs() {
    this.service.getBugsListByParams(0, 10, this.userParams)
      .subscribe((res: PaginatedResult<Bug[]>) => {
        this.bugsList = res.result;
        this.pagination = res.pagination;
      }, error => {
        console.log(error);
      });
  }
}
