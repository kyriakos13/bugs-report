import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  getAllBugsEndpoint = environment.endpointUrl + 'bugs';
  saveBug = environment.endpointUrl + 'bugs';

  constructor(private client: HttpClient) { }
d
  getBugsList(): Observable<Array<Bug>> {
    return this.client.get<Array<Bug>>(this.getAllBugsEndpoint);
  }

  saveBugRecord(record: Bug): Observable<Bug> {
    return this.client.post<Bug>(this.getAllBugsEndpoint, record);
  }
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  priority: string;
  reporter: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  comments: Comments;
}

export interface Comments {
  id: string;
  reporter: string;
  description: string;
}
