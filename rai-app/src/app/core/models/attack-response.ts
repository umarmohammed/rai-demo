export interface AttackResponse {
  borderlines: Adversarials;
  inlines: Adversarials;
}

export interface Adversarials {
  actualInstances: any[];
  generatedInstances: any[];
}
