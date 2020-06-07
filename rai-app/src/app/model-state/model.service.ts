import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OverviewMetric } from '../core/models/overview-metric';

@Injectable({ providedIn: 'root' })
export class ModelService {
  featuresUrl = `${environment.baseUrl}${'api/features'}`;
  bootstrapUrl = `${environment.baseUrl}${'api/bootstrap'}`;

  constructor(private http: HttpClient) {}

  getFeatures(formData: FormData) {
    return this.http.post<string[]>(this.featuresUrl, formData);
  }

  getBootstrap(formData: FormData) {
    return this.http.post<OverviewMetric[]>(this.bootstrapUrl, formData);
  }
}
