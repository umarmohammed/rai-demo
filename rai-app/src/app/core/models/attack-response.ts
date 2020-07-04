import { Metric } from './metric';

export interface AttackResponse {
  borderlines: Adversarials;
  inlines: Adversarials;
}

export interface Adversarials {
  actualInstances: any[];
  generatedInstances: any[];
  explanations: { [key: number]: Metric[] };
  predictProbabilities: { [key: number]: AdversarialProbabilities };
}

export interface AdversarialProbabilities {
  actual: Metric[];
  generated: Metric[];
}

export interface Adversarial {
  actualInstance: any;
  generatedInstance: any;
}

export function createAdversarialGrid(adversarials: Adversarials, id: number) {
  return adversarialToComparisonGrid(createAdversarial(adversarials, id));
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

export function adversarialToComparisonGrid(adversarial: Adversarial) {
  return Object.keys(adversarial.actualInstance).map((feature) => ({
    feature,
    actual: adversarial.actualInstance[feature],
    generated: adversarial.generatedInstance[feature],
  }));
}
