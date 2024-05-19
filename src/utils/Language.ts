import { Language } from '../interfaces/Language';

export const getStoredLanguage = (): Language =>
  (localStorage.getItem('language') as Language) ?? Language.TR;

export const getLanguageName = (language: Language): string => {
  switch (language) {
    case Language.EN:
      return 'English';
    case Language.TR:
      return 'Türkçe';
    default:
      return '';
  }
};
