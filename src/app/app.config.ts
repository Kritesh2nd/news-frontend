import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MaterialModule } from './utils/material/material.module';
import { NgFor, NgIf } from '@angular/common';
import { jwtInterceptor } from './interceptor/JWTInterceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    RouterOutlet, MaterialModule, RouterModule, NgIf, NgFor,
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations(),
    provideToastr(),
  ]
};
