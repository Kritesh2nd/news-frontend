import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MaterialModule } from './utils/material/material.module';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), RouterOutlet,MaterialModule]
};
