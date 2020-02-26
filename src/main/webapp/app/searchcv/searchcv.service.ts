import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { ISearch } from 'app/shared/model/search';
import { ICompany } from 'app/shared/model/company.model';

type EntityResponseType = HttpResponse<ISearch>;
type EntityArrayResponseType = HttpResponse<ISearch[]>;

@Injectable({ providedIn: 'root' })
export class SearchcvService {
  public resourceUrl = SERVER_API_URL + 'api/search';

  constructor(protected http: HttpClient) {}

  find(search: ISearch): Observable<EntityResponseType> {
    return this.http.post<ISearch>(this.resourceUrl, search, { observe: 'response' });
  }
}
