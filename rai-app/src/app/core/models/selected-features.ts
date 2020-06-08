export interface SelectedFeatures {
  gmin: string;
  gmaj: string;
}

export function protectedFeaturesSet(features: SelectedFeatures) {
  return !!features.gmin && !!features.gmaj;
}
