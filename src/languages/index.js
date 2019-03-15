import es from './es/main';
import en from './en/main';
import pt from './pt/main';

const language = {
  es,
  en,
  pt
};

const navigatorLanguage = navigator.language.slice(0, 2);
// console.log('language');
// console.log(navigatorLanguage);
export default language[navigatorLanguage];
