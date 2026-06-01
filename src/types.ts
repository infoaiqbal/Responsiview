export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';
export type ViewState = 'home' | 'about' | 'developer';

export interface Device {
  id: string;
  name: { en: string; bn: string };
  width: number;
  height: number;
  iconName: string;
}

export type TranslationKey = 
  | 'title' | 'home' | 'language' | 'aboutApp' | 'appStore' 
  | 'developer' | 'version' | 'enterUrl' | 'check' | 'warning' 
  | 'devInfo' | 'aboutInfo' | 'aboutTitle' | 'devTitle' 
  | 'dark' | 'light' | 'english' | 'bengali' | 'capture';

export type Translations = Record<TranslationKey, { en: string; bn: string }>;
