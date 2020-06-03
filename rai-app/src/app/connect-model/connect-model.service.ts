import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectModelService {
  featuresUrl = `${environment.baseUrl}${'api/features'}`;

  constructor(private http: HttpClient) {}

  features$ = this.http.get<string[]>(this.featuresUrl);

  getFeatures(formData: FormData) {
    return of(['foo', 'bar']);
    //  return this.http.post<string[]>(this.featuresUrl, formData);
  }
}
