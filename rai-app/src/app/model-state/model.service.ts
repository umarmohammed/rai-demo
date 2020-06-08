import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OverviewMetric } from '../core/models/overview-metric';
import { SelectedFeatures } from '../core/models/selected-features';

@Injectable({ providedIn: 'root' })
export class ModelService {
  featuresUrl = `${environment.baseUrl}${'api/features'}`;
  bootstrapUrl = `${environment.baseUrl}${'api/bootstrap'}`;

  constructor(private http: HttpClient) {}

  getFeatures(formData: FormData) {
    return this.http.post<string[]>(this.featuresUrl, formData);
  }

  getBootstrap(formData: FormData, features: SelectedFeatures = null) {
    return this.http.post<OverviewMetric[]>(
      this.bootstrapUrl,
      this.createFeaturesToUpload(formData, features)
    );
  }

  private createFeaturesToUpload(
    formData: FormData,
    features: SelectedFeatures
  ) {
    const out = new FormData();
    out.append('file', formData.get('file'));
    out.append('data', JSON.stringify(features));
    return out;
  }
}