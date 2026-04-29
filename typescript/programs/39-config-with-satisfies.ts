type FeatureConfig = Record<
  string,
  {
    enabled: boolean;
    rolloutPercentage: number;
  }
>;

const features = {
  newCheckout: {
    enabled: true,
    rolloutPercentage: 25,
  },
  darkMode: {
    enabled: false,
    rolloutPercentage: 0,
  },
} satisfies FeatureConfig;

type FeatureName = keyof typeof features;

const activeFeature: FeatureName = 'newCheckout';

console.log(features[activeFeature]);

