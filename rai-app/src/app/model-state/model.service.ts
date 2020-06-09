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
  permutationUrl = `${environment.baseUrl}${'api/permutation'}`;

  constructor(private http: HttpClient) {}

  getFeatures(formData: FormData) {
    return this.http.post<string[]>(this.featuresUrl, formData);
  }

  getBootstrap(formData: FormData, features: SelectedFeatures = null) {
    return this.http.post<BootstrapResponse>(
      this.bootstrapUrl,
      this.createFeaturesToUpload(formData, features)
    );
  }

  getPermutation(formData: FormData, features: SelectedFeatures = null) {
    return this.http.post<PermutationResponse>(
      this.permutationUrl,
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
