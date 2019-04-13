import { Component, OnInit } from '@angular/core';
import { BugsService, Bug } from 'src/app/shared/common-services/bugs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bugsList: Array<Bug> = []

  constructor(private service: BugsService) { }

  ngOnInit() {
    this.fetchBugs();
  }

  fetchBugs() {
    this.service.getBugsList().subscribe(data => this.bugsList = data);
  }

}
