import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStaffOrigin } from 'app/shared/model/staff-origin.model';

type EntityResponseType = HttpResponse<IStaffOrigin>;
type EntityArrayResponseType = HttpResponse<IStaffOrigin[]>;

@Injectable({ providedIn: 'root' })
export class StaffOriginService {
  public resourceUrl = SERVER_API_URL + 'api/staff-origins';

  constructor(protected http: HttpClient) {}

  create(staffOrigin: IStaffOrigin): Observable<EntityResponseType> {
    return this.http.post<IStaffOrigin>(this.resourceUrl, staffOrigin, { observe: 'response' });
  }

  update(staffOrigin: IStaffOrigin): Observable<EntityResponseType> {
    return this.http.put<IStaffOrigin>(this.resourceUrl, staffOrigin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStaffOrigin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaffOrigin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getListStaff(name: string, email: string): Observable<EntityArrayResponseType> {
    return this.http.get<IStaffOrigin[]>(`${this.resourceUrl}/${name}/${email}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  save(email: string): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/account/respond-cv', email);
  }
}
