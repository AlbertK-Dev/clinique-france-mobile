import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import fr from './i18next/fr.json';
import en from './i18next/en.json'

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	lng: 'Fr',
	fallbackLng: 'Fr',
	resources: {
		En: {translation: en},
		Fr: {translation: fr},
	},
	interpolation: {
		escapeValue: false 
	}
});

export default i18n;
