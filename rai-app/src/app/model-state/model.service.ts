import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BootstrapResponse } from '../core/models/bootstrap-response';
import { SelectedFeatures } from '../core/models/selected-features';
import { PermutationResponse } from '../core/models/permutation-response';

@Injectable({ providedIn: 'root' })
export class ModelService {
  featuresUrl = `${environment.baseUrl}${'api/features'}`;
  bootstrapUrl = `${environment.baseUrl}${'api/bootstrap'}`;
  baselineUrl = `${environment.baseUrl}${'api/baseline'}`;
  permutationUrl = `${environment.baseUrl}${'api/permutation'}`;

  constructor(private http: HttpClient) {}

  getFeatures(formData: FormData) {
    return this.http.post<string[]>(this.featuresUrl, formData);
  }

  getBootstrap = this.getOverview(this.bootstrapUrl);

  getBaseline = this.getOverview(this.baselineUrl);

  getPermutation(formData: FormData, features: SelectedFeatures = null) {
    return this.http.post<PermutationResponse>(
      this.permutationUrl,
      this.createFeaturesToUpload(formData, features)
    );
  }

  private getOverview(url: string) {
    return (formData: FormData, features: SelectedFeatures = null) =>
      this.http.post<BootstrapResponse>(
        url,
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
