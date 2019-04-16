import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators';
// import { Bug } from 'src/app/shared/common-services/bugs.service';
export interface Comments {
  id: string;
  reporter: string;
  description: string;
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

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  getAllBugsEndpoint = environment.endpointUrl + 'bugs';

  constructor(private http: HttpClient) { }
d
  getBugsList(): Observable<Array<Bug>> {
    return this.http.get<Array<Bug>>(this.getAllBugsEndpoint);
  }



  getBugsListByParams(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Bug[]>> {
    const paginatedResult: PaginatedResult<Bug[]> = new PaginatedResult<Bug[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('page', page);
      params = params.append('size', itemsPerPage);
    }

    if (userParams != null) {
      // params = params.append('sort', userParams.orderBy);
      params = params.append('sort', 'title,desc');
    }

    return this.http.get<Bug[]>(this.getAllBugsEndpoint, { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        })
      );
  

      }}
