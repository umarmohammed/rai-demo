export interface AttackResponse {
  borderlines: Adversarials;
  inlines: Adversarials;
}

export interface Adversarials {
  actualInstances: any[];
  generatedInstances: any[];
}

export interface Adversarial {
  actualInstance: any;
  generatedInstance: any;
}

export function createAdversarial(
  adversarials: Adversarials,
  id: number
): Adversarial {
  return {
    actualInstance: adversarials.actualInstances.find((item) => item.id === id),
    generatedInstance: adversarials.generatedInstances.find(
      (item) => item.id === id
    ),
  };
}
