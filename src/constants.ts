import { Translations, Device } from './types';

export const translations: Translations = {
  title: { en: 'Responsiview', bn: 'রেসপন্সিভিউ' },
  home: { en: 'Home', bn: 'হোম' },
  language: { en: 'Language', bn: 'ভাষা' },
  aboutApp: { en: 'About App', bn: 'অ্যাপ সম্পর্কে' },
  appStore: { en: 'App Store', bn: 'অ্যাপ স্টোর' },
  developer: { en: 'About Developer', bn: 'ডেভেলপার সম্পর্কে' },
  version: { en: 'Version 1.0.0', bn: 'ভার্সন ১.০.০' },
  enterUrl: { en: 'Enter website URL...', bn: 'ওয়েবসাইটের লিংক দিন...' },
  check: { en: 'Check', bn: 'চেক করুন' },
  warning: {
    en: 'Note: Some websites may block embedding via X-Frame-Options.',
    bn: 'দ্রষ্টব্য: অনেক ওয়েবসাইট নিরাপত্তার কারণে (X-Frame-Options) ডিসপ্লে ব্লক করতে পারে।'
  },
  devTitle: { en: 'About Developer', bn: 'ডেভেলপার সম্পর্কে' },
  devInfo: {
    en: 'Developed by Asif I.',
    bn: 'ডেভেলপ করেছেন আসিফ আই.'
  },
  aboutTitle: { en: 'About App', bn: 'অ্যাপ সম্পর্কে' },
  aboutInfo: {
    en: 'A modern tool to preview any website on different device sizes.',
    bn: 'যেকোনো ওয়েবসাইট বিভিন্ন ডিভাইসের সাইজে প্রিভিউ করার জন্য একটি আধুনিক ও সহজ টুল।'
  },
  dark: { en: 'Dark Mode', bn: 'ডার্ক মোড' },
  light: { en: 'Light Mode', bn: 'লাইট মোড' },
  english: { en: 'English', bn: 'ইংরেজি' },
  bengali: { en: 'Bangla', bn: 'বাংলা' },
  capture: { en: 'Capture', bn: 'ক্যাপচার' },
  urlMode: { en: 'Website URL', bn: 'ওয়েবসাইট লিংক' },
  htmlMode: { en: 'HTML Code / File', bn: 'এইচটিএমএল কোড / ফাইল' },
  enterHtml: { en: 'Paste your HTML code here...', bn: 'আপনার এইচটিএমএল কোড এখানে পেস্ট করুন...' },
  uploadHtml: { en: 'Upload HTML File', bn: 'এইচটিএমএল ফাইল আপলোড করুন' }
};

export const devices: Device[] = [
  { id: 'desktop', name: { en: 'Computer', bn: 'কম্পিউটার' }, width: 1440, height: 900, iconName: 'Monitor' },
  { id: 'android', name: { en: 'Android', bn: 'এনড্রয়েড' }, width: 360, height: 800, iconName: 'Smartphone' },
  { id: 'iphone', name: { en: 'iPhone', bn: 'আইফোন' }, width: 390, height: 844, iconName: 'Smartphone' },
  { id: 'tab', name: { en: 'Tab', bn: 'ট্যাব' }, width: 768, height: 1024, iconName: 'Tablet' },
  { id: 'ipad', name: { en: 'iPad', bn: 'আইপ্যাড' }, width: 810, height: 1080, iconName: 'Tablet' }
];
