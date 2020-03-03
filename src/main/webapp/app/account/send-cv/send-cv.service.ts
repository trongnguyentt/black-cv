import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class SendCvService {
  constructor(private http: HttpClient) {}

  save(info: string, user: string, companyName: string): Observable<{}> {
    console.log(user);
    return this.http.post(SERVER_API_URL + 'api/account/send-cv', { info, user, companyName });
  }
}
