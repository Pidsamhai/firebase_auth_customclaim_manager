import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../model/'

const BASE_URL = "AUTH_INTERCEP_BASE_URL";

@Injectable({
  providedIn: 'root'
})
class ApiService {

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient,
  ) { }


  getUsers(
    templateId: string,
    pageToken?: string
  ): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.baseUrl}/users/${templateId}`,
      { 
        params: pageToken ? {
          page_token: pageToken
        } : undefined
      },
    )
  }

  getUserClaims(
    templateId: string,
    uid: string
  ): Observable<string> {
    return this.http.get<string>(
      `${this.baseUrl}/user/${templateId}/claims/${uid}`
    )
  }
}

export { ApiService, BASE_URL }
