import {InjectionToken, inject} from '@angular/core';

export type AppConfig = {
  apiUrl: string;
  featureFlags: Record<string, boolean>;
};

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export class ConfigConsumer {
  private readonly config = inject(APP_CONFIG);

  get apiUrl() {
    return this.config.apiUrl;
  }
}

export const appConfigProvider = {
  provide: APP_CONFIG,
  useValue: {
    apiUrl: 'https://api.example.com',
    featureFlags: {
      newDashboard: true,
    },
  } satisfies AppConfig,
};

