import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReason } from 'app/shared/model/reason.model';

type EntityResponseType = HttpResponse<IReason>;
type EntityArrayResponseType = HttpResponse<IReason[]>;

@Injectable({ providedIn: 'root' })
export class ReasonService {
  public resourceUrl = SERVER_API_URL + 'api/reasons';

  constructor(protected http: HttpClient) {}

  create(reason: IReason): Observable<EntityResponseType> {
    return this.http.post<IReason>(this.resourceUrl, reason, { observe: 'response' });
  }

  update(reason: IReason): Observable<EntityResponseType> {
    return this.http.put<IReason>(this.resourceUrl, reason, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReason>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReason[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
