import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  private readonly STORAGE_KEY = 'ep_lang';

  readonly current = signal<Lang>(this.loadSaved());

  toggle(): void {
    this.setLang(this.current() === 'es' ? 'en' : 'es');
  }

  setLang(lang: Lang): void {
    this.current.set(lang);
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  private loadSaved(): Lang {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === 'en' ? 'en' : 'es';
  }
}
