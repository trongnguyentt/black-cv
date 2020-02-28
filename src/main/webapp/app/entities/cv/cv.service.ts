import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICV } from 'app/shared/model/cv.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<ICV>;
type EntityArrayResponseType = HttpResponse<ICV[]>;

@Injectable({ providedIn: 'root' })
export class CVService {
  public resourceUrl = SERVER_API_URL + 'api/cvs';

  constructor(protected http: HttpClient) {}

  create(cV: ICV, iconPath: File, iconPath2: File): Observable<EntityResponseType> {
    const data: FormData = new FormData();
    data.append('cV', new Blob([JSON.stringify(cV)], { type: 'application/json' }));
    data.append('avatar', iconPath);
    data.append('fileUploadCV', iconPath2);

    return this.http.post<ICV>(this.resourceUrl, data, { observe: 'response' });
  }

  update(cV: ICV, iconPath: File, iconPath2: File): Observable<EntityResponseType> {
    const data: FormData = new FormData();
    data.append('cV', new Blob([JSON.stringify(cV)], { type: 'application/json' }));
    data.append('avatar', iconPath);
    data.append('fileUploadCV', iconPath2);
    return this.http.put<ICV>(this.resourceUrl, data, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICV>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICV[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  findInHome(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICV[]>(`${this.resourceUrl}/find`, { params: options, observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
