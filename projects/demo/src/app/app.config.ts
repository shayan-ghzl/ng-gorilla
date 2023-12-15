import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';


const prefersReducedMotion = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion)').matches : false;


export const appConfig: ApplicationConfig = {
  providers: [
    prefersReducedMotion ? provideNoopAnimations() : provideAnimations(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }), withComponentInputBinding()),
    provideHttpClient(),
  ]
};
