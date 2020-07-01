import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BootstrapResponse } from '../core/models/bootstrap-response';
import { SelectedFeatures } from '../core/models/selected-features';
import { PermutationResponse } from '../core/models/permutation-response';
import { AttackResponse } from '../core/models/attack-response';
import { of } from 'rxjs';
import { hardcoded } from '../shared/hard-coded';

@Injectable({ providedIn: 'root' })
export class ModelService {
  featuresUrl = `${environment.baseUrl}api/features`;
  bootstrapUrl = `${environment.baseUrl}api/bootstrap`;
  baselineUrl = `${environment.baseUrl}api/baseline`;
  permutationUrl = `${environment.baseUrl}api/permutation`;
  attacksUrl = `${environment.baseUrl}api/attacks`;

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

  getAttacks(formData: FormData) {
    return this.http.post<AttackResponse>(
      this.attacksUrl,
      this.createFeaturesToUpload(formData, null)
    );
  }

  private getOverview(url: string) {
    const server = false;
    return (formData: FormData, features: SelectedFeatures = null) =>
      server
        ? this.http.post<BootstrapResponse>(
            url,
            this.createFeaturesToUpload(formData, features)
          )
        : of(hardcoded[url]);
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
