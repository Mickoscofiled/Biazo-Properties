const fs = require('fs');

const reserveKeys = {
  en: { listings_reserve: 'RESERVE' },
  ar: { listings_reserve: 'احجز' },
  fr: { listings_reserve: 'RÉSERVER' },
  de: { listings_reserve: 'BUCHEN' },
  ru: { listings_reserve: 'ЗАБРОНИРОВАТЬ' },
  zh: { listings_reserve: '预订' }
};

const indexPath = 'C:/Users/mikia/Downloads/Biazo-Properties/artifacts/biazo-properties/src/i18n/index.ts';
let code = fs.readFileSync(indexPath, 'utf-8');

for (const lang of Object.keys(reserveKeys)) {
  const keysObj = reserveKeys[lang];
  let injectionStr = '';
  for (const [key, val] of Object.entries(keysObj)) {
    injectionStr += "\n      " + key + ": " + JSON.stringify(val) + ",";
  }
  const regex = new RegExp("(" + lang + ":\\s*\\{\\s*translation:\\s*\\{)");
  code = code.replace(regex, "$1" + injectionStr);
}

fs.writeFileSync(indexPath, code);
console.log('Done: Added reserve key.');
