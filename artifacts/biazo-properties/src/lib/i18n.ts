import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    'Residences': 'Residences',
    'The Biazo way': 'The Biazo way',
    'Dubai, considered': 'Dubai, considered',
    'Why Biazo': 'Why Biazo',
    'Private access': 'Private access',
    'Make Dubai yours.': 'Make Dubai yours.',
    'Dubai, thoughtfully lived': 'Dubai, thoughtfully lived',
    'Stay somewhere': 'Stay somewhere',
    'with a point of view.': 'with a point of view.',
    'The privacy of a beautiful residence, the ease of exceptional service, and a city that is yours to discover.': 'The privacy of a beautiful residence, the ease of exceptional service, and a city that is yours to discover.',
    'EXPLORE RESIDENCES': 'EXPLORE RESIDENCES',
    'FIND MY RESERVATION': 'FIND MY RESERVATION',
  }
};

// Arabic translations
const ar = {
  translation: {
    'Residences': 'المساكن',
    'The Biazo way': 'طريقة بيازو',
    'Dubai, considered': 'دبي، بعناية',
    'Why Biazo': 'لماذا بيازو',
    'Private access': 'دخول خاص',
    'Make Dubai yours.': 'اجعل دبي لك.',
    'Dubai, thoughtfully lived': 'دبي، نعيشها بعناية',
    'Stay somewhere': 'أقم في مكان',
    'with a point of view.': 'بأسلوب فريد.',
    'The privacy of a beautiful residence, the ease of exceptional service, and a city that is yours to discover.': 'خصوصية المسكن الجميل، وسهولة الخدمة الاستثنائية، ومدينة تنتظر استكشافك.',
    'EXPLORE RESIDENCES': 'استكشف المساكن',
    'FIND MY RESERVATION': 'ابحث عن حجزي',
  }
};

// French translations
const fr = {
  translation: {
    'Residences': 'Résidences',
    'The Biazo way': 'La méthode Biazo',
    'Dubai, considered': 'Dubaï, repensé',
    'Why Biazo': 'Pourquoi Biazo',
    'Private access': 'Accès privé',
    'Make Dubai yours.': 'Faites de Dubaï la vôtre.',
    'Dubai, thoughtfully lived': 'Dubaï, vécue avec soin',
    'Stay somewhere': 'Séjournez dans un lieu',
    'with a point of view.': 'avec une perspective unique.',
    'The privacy of a beautiful residence, the ease of exceptional service, and a city that is yours to discover.': 'L\'intimité d\'une belle résidence, la facilité d\'un service exceptionnel et une ville qui vous appartient.',
    'EXPLORE RESIDENCES': 'EXPLORER LES RÉSIDENCES',
    'FIND MY RESERVATION': 'TROUVER MA RÉSERVATION',
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      ar,
      fr
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
