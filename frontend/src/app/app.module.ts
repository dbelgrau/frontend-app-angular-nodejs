import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { PostsModule } from './posts/posts.module';
import { LoginModule } from './login/login.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { DatePipe, LOCATION_INITIALIZED } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function i18nInitializerFactory(translate: TranslateService, injector: Injector) {
  return (): Promise<null | void> =>
    new Promise<null | void>((resolve: any) => {
      const locationInitialized: Promise<any> = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        const langToSet: string = 'pl';
        translate.setDefaultLang(langToSet);

        translate.use(langToSet).subscribe({
          complete: () => {
            resolve(null);
          }
        });
      });
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    HttpClientModule,
    PostsModule,
    LoginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: i18nInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
