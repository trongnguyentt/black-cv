import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStaffOrigin } from 'app/shared/model/staff-origin.model';

@Injectable({ providedIn: 'root' })
export class SendCvService {
  constructor(private http: HttpClient) {}

  save(info: string): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/account/send-cv', info);
  }
}
