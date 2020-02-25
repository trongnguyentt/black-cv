import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICV } from 'app/shared/model/cv.model';

type EntityResponseType = HttpResponse<ICV>;
type EntityArrayResponseType = HttpResponse<ICV[]>;

@Injectable({ providedIn: 'root' })
export class CVService {
  public resourceUrl = SERVER_API_URL + 'api/cvs';

  constructor(protected http: HttpClient) {}

  create(cV: ICV): Observable<EntityResponseType> {
    return this.http.post<ICV>(this.resourceUrl, cV, { observe: 'response' });
  }

  update(cV: ICV): Observable<EntityResponseType> {
    return this.http.put<ICV>(this.resourceUrl, cV, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICV>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICV[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
