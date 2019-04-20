import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Bug, PaginatedResult } from '../../models';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  getAllBugsEndpoint = environment.endpointUrl + 'bugs';
  saveBug = environment.endpointUrl + 'bugs';

  constructor(private http: HttpClient) {}

  getBugsList(): Observable<Array<Bug>> {
    return this.http.get<Array<Bug>>(this.getAllBugsEndpoint);
  }

  getBugsListByParams(
    page?,
    itemsPerPage?,
    userParams?
  ): Observable<PaginatedResult<Bug[]>> {
    const paginatedResult: PaginatedResult<Bug[]> = new PaginatedResult<
      Bug[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('page', page);
      params = params.append('size', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append(
        'sort',
        userParams.sortBy + ',' + userParams.orderBy
      );
    }

    return this.http
      .get<Bug[]>(this.getAllBugsEndpoint, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  saveBugRecord(record: AbstractControl) {
    return this.http
      .post(this.getAllBugsEndpoint, record.value)
      .subscribe(response => {
        console.log(response);
      });
  }
}
