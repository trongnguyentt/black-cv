import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReasonList } from 'app/shared/model/reason-list.model';

type EntityResponseType = HttpResponse<IReasonList>;
type EntityArrayResponseType = HttpResponse<IReasonList[]>;

@Injectable({ providedIn: 'root' })
export class ReasonListService {
  public resourceUrl = SERVER_API_URL + 'api/reason-lists';

  constructor(protected http: HttpClient) {}

  create(reasonList: IReasonList): Observable<EntityResponseType> {
    return this.http.post<IReasonList>(this.resourceUrl, reasonList, { observe: 'response' });
  }

  update(reasonList: IReasonList): Observable<EntityResponseType> {
    return this.http.put<IReasonList>(this.resourceUrl, reasonList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReasonList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReasonList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
