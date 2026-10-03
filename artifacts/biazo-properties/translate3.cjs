const fs = require('fs');

// 1. Add listing_baths and reservation modal keys to i18n
const i18nKeys = {
  en: {
    listing_baths: 'Baths',
    // ReservationLookupModal
    reservation_eyebrow: 'Guest Access',
    reservation_title: 'Find Your Reservation',
    reservation_sub: 'Enter your Booking Reference (e.g. BVH-12345) or the email address used at reservation.',
    reservation_placeholder: 'Reference code or email',
    reservation_search: 'SEARCH',
    reservation_not_found_title: 'No reservation found',
    reservation_not_found_sub: 'We couldn\'t locate a booking for "{query}". If you reserved via phone or WhatsApp, please message our concierge at +971 54 4937128.',
    reservation_guest: 'Guest:',
    reservation_checkin: 'Check-in',
    reservation_checkout: 'Check-out',
    reservation_total: 'Total',
    reservation_guests: 'Guests',
    reservation_lock_label: 'Keyless Smart Lock PIN:',
    reservation_lock_note: 'Activates automatically on check-in day.',
    reservation_print: 'PRINT / SAVE ITINERARY',
    reservation_ref: 'Reference',
  },
  ar: {
    listing_baths: 'حمامات',
    reservation_eyebrow: 'وصول الضيف',
    reservation_title: 'ابحث عن حجزك',
    reservation_sub: 'أدخل رقم مرجع الحجز (مثال: BVH-12345) أو عنوان البريد الإلكتروني المستخدم عند الحجز.',
    reservation_placeholder: 'رمز المرجع أو البريد الإلكتروني',
    reservation_search: 'بحث',
    reservation_not_found_title: 'لم يتم العثور على حجز',
    reservation_not_found_sub: 'لم نتمكن من تحديد موقع حجز لـ "{query}". إذا حجزت عبر الهاتف أو واتساب، يرجى مراسلة كونسيرج على +971 54 4937128.',
    reservation_guest: 'الضيف:',
    reservation_checkin: 'تسجيل الوصول',
    reservation_checkout: 'تسجيل المغادرة',
    reservation_total: 'الإجمالي',
    reservation_guests: 'الضيوف',
    reservation_lock_label: 'رقم PIN للقفل الذكي:',
    reservation_lock_note: 'يتم التفعيل تلقائياً في يوم تسجيل الوصول.',
    reservation_print: 'طباعة / حفظ خطة الرحلة',
    reservation_ref: 'المرجع',
  },
  fr: {
    listing_baths: 'Salles de bain',
    reservation_eyebrow: 'Accès Invité',
    reservation_title: 'Trouvez Votre Réservation',
    reservation_sub: 'Entrez votre référence de réservation (ex. BVH-12345) ou l\'adresse e-mail utilisée lors de la réservation.',
    reservation_placeholder: 'Code de référence ou e-mail',
    reservation_search: 'RECHERCHER',
    reservation_not_found_title: 'Aucune réservation trouvée',
    reservation_not_found_sub: 'Nous n\'avons pas pu localiser une réservation pour "{query}". Si vous avez réservé par téléphone ou WhatsApp, veuillez contacter notre concierge au +971 54 4937128.',
    reservation_guest: 'Invité :',
    reservation_checkin: 'Arrivée',
    reservation_checkout: 'Départ',
    reservation_total: 'Total',
    reservation_guests: 'Invités',
    reservation_lock_label: 'Code PIN de la serrure intelligente :',
    reservation_lock_note: 'S\'active automatiquement le jour du check-in.',
    reservation_print: 'IMPRIMER / SAUVEGARDER L\'ITINÉRAIRE',
    reservation_ref: 'Référence',
  },
  de: {
    listing_baths: 'Badezimmer',
    reservation_eyebrow: 'Gastzugang',
    reservation_title: 'Finden Sie Ihre Reservierung',
    reservation_sub: 'Geben Sie Ihre Buchungsreferenz (z.B. BVH-12345) oder die bei der Reservierung verwendete E-Mail-Adresse ein.',
    reservation_placeholder: 'Referenzcode oder E-Mail',
    reservation_search: 'SUCHEN',
    reservation_not_found_title: 'Keine Reservierung gefunden',
    reservation_not_found_sub: 'Wir konnten keine Buchung für "{query}" finden. Wenn Sie telefonisch oder per WhatsApp reserviert haben, wenden Sie sich bitte an unseren Concierge unter +971 54 4937128.',
    reservation_guest: 'Gast:',
    reservation_checkin: 'Check-in',
    reservation_checkout: 'Check-out',
    reservation_total: 'Gesamt',
    reservation_guests: 'Gäste',
    reservation_lock_label: 'Schlüsselloser Smart-Lock-PIN:',
    reservation_lock_note: 'Wird am Check-in-Tag automatisch aktiviert.',
    reservation_print: 'REISEPLAN DRUCKEN / SPEICHERN',
    reservation_ref: 'Referenz',
  },
  ru: {
    listing_baths: 'Ванные',
    reservation_eyebrow: 'Доступ гостя',
    reservation_title: 'Найдите вашу бронь',
    reservation_sub: 'Введите номер бронирования (например, BVH-12345) или адрес электронной почты, использованный при бронировании.',
    reservation_placeholder: 'Код или email',
    reservation_search: 'ИСКАТЬ',
    reservation_not_found_title: 'Бронирование не найдено',
    reservation_not_found_sub: 'Мы не смогли найти бронирование для "{query}". Если вы бронировали по телефону или через WhatsApp, свяжитесь с консьержем по +971 54 4937128.',
    reservation_guest: 'Гость:',
    reservation_checkin: 'Заезд',
    reservation_checkout: 'Выезд',
    reservation_total: 'Итого',
    reservation_guests: 'Гостей',
    reservation_lock_label: 'PIN-код умного замка:',
    reservation_lock_note: 'Активируется автоматически в день заезда.',
    reservation_print: 'РАСПЕЧАТАТЬ / СОХРАНИТЬ МАРШРУТ',
    reservation_ref: 'Справка',
  },
  zh: {
    listing_baths: '浴室',
    reservation_eyebrow: '客人访问',
    reservation_title: '查找您的预订',
    reservation_sub: '输入您的预订参考号（例如 BVH-12345）或预订时使用的电子邮件地址。',
    reservation_placeholder: '参考号或电子邮件',
    reservation_search: '搜索',
    reservation_not_found_title: '未找到预订',
    reservation_not_found_sub: '我们无法找到"{query}"的预订。如果您通过电话或WhatsApp预订，请联系我们的礼宾服务 +971 54 4937128。',
    reservation_guest: '客人：',
    reservation_checkin: '入住',
    reservation_checkout: '退房',
    reservation_total: '总计',
    reservation_guests: '客人',
    reservation_lock_label: '无钥匙智能锁 PIN 码：',
    reservation_lock_note: '入住当天自动激活。',
    reservation_print: '打印 / 保存行程',
    reservation_ref: '参考',
  }
};

const indexPath = 'C:/Users/mikia/Downloads/Biazo-Properties/artifacts/biazo-properties/src/i18n/index.ts';
let code = fs.readFileSync(indexPath, 'utf-8');

for (const lang of Object.keys(i18nKeys)) {
  const keysObj = i18nKeys[lang];
  let injectionStr = '';
  for (const [key, val] of Object.entries(keysObj)) {
    injectionStr += "\n      " + key + ": " + JSON.stringify(val) + ",";
  }
  const regex = new RegExp("(" + lang + ":\\s*\\{\\s*translation:\\s*\\{)");
  code = code.replace(regex, "$1" + injectionStr);
}

fs.writeFileSync(indexPath, code);
console.log('Done: Added baths + reservation modal keys to i18n.');
