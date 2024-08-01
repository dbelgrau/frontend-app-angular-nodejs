import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public constructor(private translate: TranslateService) { }

  public initialize(): void {
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
  }

  public setLanguage(language: string): void {
    this.translate.use(language);
  }
}
