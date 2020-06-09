import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BootstrapResponse } from '../core/models/bootstrap-response';
import { SelectedFeatures } from '../core/models/selected-features';
import { PermutationResponse } from '../core/models/permutation-response';
import { of } from 'rxjs';

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
    return of({
      performanceFeatures: [
        {
          features: [
            { name: 'other_installment_plans_none', value: 0.125877093160987 },
            { name: 'housing_for free', value: 0.12613707828551765 },
            {
              name: 'other_installment_plans_stores',
              value: 0.12641997951364634,
            },
            { name: 'telephone_none', value: 0.12671583893309232 },
            { name: 'job_unskilled - resident', value: 0.12888219001252688 },
            {
              name: 'job_skilled employee / official',
              value: 0.12969945326881452,
            },
            {
              name: 'job_unemployed/ unskilled - non-resident',
              value: 0.1299640035333648,
            },
            { name: 'housing_rent', value: 0.13023374775208887 },
            {
              name:
                'job_management/ self-employed/ highly qualified employee/ officer',
              value: 0.13079913207791888,
            },
            { name: 'housing_own', value: 0.13104239365856168 },
          ],
          name: 'Accuracy',
        },
        {
          features: [
            { name: 'young', value: 0.1587942964530948 },
            {
              name: 'other_installment_plans_stores',
              value: 0.15905317439745964,
            },
            {
              name: 'telephone_yes, registered under the customers name ',
              value: 0.15924695899155278,
            },
            { name: 'telephone_none', value: 0.16068722459715085 },
            { name: 'job_unskilled - resident', value: 0.16280065053430764 },
            {
              name: 'job_skilled employee / official',
              value: 0.16325834011587906,
            },
            {
              name: 'job_unemployed/ unskilled - non-resident',
              value: 0.16347155973208372,
            },
            { name: 'housing_rent', value: 0.16435205427029648 },
            {
              name:
                'job_management/ self-employed/ highly qualified employee/ officer',
              value: 0.16476152236459302,
            },
            { name: 'housing_own', value: 0.16548435784609045 },
          ],
          name: 'Precision',
        },
        {
          features: [
            { name: 'other_debtors_none', value: 0.24608745927581782 },
            { name: 'telephone_none', value: 0.24687907843074974 },
            { name: 'other_debtors_co-applicant', value: 0.2469272957678282 },
            {
              name: 'telephone_yes, registered under the customers name ',
              value: 0.2478363866769191,
            },
            {
              name: 'job_skilled employee / official',
              value: 0.24938634811362848,
            },
            {
              name: 'job_unemployed/ unskilled - non-resident',
              value: 0.24938634811362848,
            },
            { name: 'job_unskilled - resident', value: 0.24946622669817992 },
            {
              name:
                'job_management/ self-employed/ highly qualified employee/ officer',
              value: 0.25112600472054175,
            },
            { name: 'housing_rent', value: 0.25112600472054175 },
            { name: 'housing_own', value: 0.2529695241968046 },
          ],
          name: 'Recall',
        },
        {
          features: [
            { name: 'telephone_none', value: 0.23122479299676169 },
            { name: 'housing_rent', value: 0.23132334395997348 },
            {
              name: 'telephone_yes, registered under the customers name ',
              value: 0.23140001022403317,
            },
            { name: 'other_debtors_co-applicant', value: 0.23148594614383122 },
            { name: 'other_debtors_none', value: 0.23155258650400898 },
            { name: 'young', value: 0.2315807241680025 },
            { name: 'adult', value: 0.2316242691215696 },
            { name: 'other_debtors_guarantor', value: 0.23178251081384885 },
            { name: 'foreign_worker_no', value: 0.2319407556694643 },
            { name: 'foreign_worker_yes', value: 0.23198607356249906 },
          ],
          name: 'AUC',
        },
        {
          features: [
            { name: 'foreign_worker_no', value: 0.193768712987494 },
            { name: 'other_debtors_co-applicant', value: 0.19410098895822966 },
            {
              name: 'telephone_yes, registered under the customers name ',
              value: 0.19477668616938504,
            },
            { name: 'telephone_none', value: 0.19536626352949363 },
            { name: 'job_unskilled - resident', value: 0.1977511401101492 },
            {
              name: 'job_skilled employee / official',
              value: 0.19805386681072373,
            },
            {
              name: 'job_unemployed/ unskilled - non-resident',
              value: 0.1981799660308996,
            },
            { name: 'housing_rent', value: 0.199362035839118 },
            {
              name:
                'job_management/ self-employed/ highly qualified employee/ officer',
              value: 0.1996583466479817,
            },
            { name: 'housing_own', value: 0.20076112192070705 },
          ],
          name: 'F1-Score',
        },
        {
          features: [
            {
              name: 'account_check_status_< 0 DM',
              value: -0.025650170125915132,
            },
            {
              name:
                'account_check_status_>= 200 DM / salary assignments for at least 1 year',
              value: -0.02563828638203338,
            },
            {
              name: 'account_check_status_0 <= ... < 200 DM',
              value: -0.02347411659415501,
            },
            { name: 'credit_amount', value: -0.023144798855951547 },
            { name: 'age', value: -0.021155015393490004 },
            {
              name: 'installment_as_income_perc',
              value: -0.014579419332505419,
            },
            { name: 'duration_in_month', value: -0.013552806069053097 },
            { name: 'people_under_maintenance', value: -0.013501435597139072 },
            { name: 'present_res_since', value: -0.00016407858181343715 },
            { name: 'credits_this_bank', value: -4.326472419805272e-5 },
          ],
          name: 'Brier',
        },
      ],
      performanceMetricNames: [
        'Accuracy',
        'Precision',
        'Recall',
        'AUC',
        'F1-Score',
        'Brier',
      ],
    });
    // return this.http.post<PermutationResponse>(
    //   this.permutationUrl,
    //   this.createFeaturesToUpload(formData, features)
    // );
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
