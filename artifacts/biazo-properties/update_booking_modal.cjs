const fs = require('fs');
const filePath = 'C:/Users/mikia/Downloads/Biazo-Properties/artifacts/biazo-properties/src/components/BookingModal.tsx';
let code = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  // Imports
  {
    search: "import { formatPrice as formatPriceGlobal } from '@/lib/utils';",
    replace: "import { formatPrice as formatPriceGlobal } from '@/lib/utils';\nimport { useTranslation } from 'react-i18next';"
  },
  // Hook
  {
    search: "export function BookingModal({\n  residence,\n  initialCheckIn,\n  initialCheckOut,\n  initialGuests = 2,\n  currency,\n  onClose,\n  onBookingSuccess\n}: BookingModalProps) {\n  const today = new Date().toISOString().split('T')[0];",
    replace: "export function BookingModal({\n  residence,\n  initialCheckIn,\n  initialCheckOut,\n  initialGuests = 2,\n  currency,\n  onClose,\n  onBookingSuccess\n}: BookingModalProps) {\n  const { t } = useTranslation();\n  const today = new Date().toISOString().split('T')[0];"
  },
  
  // Confirmed section texts
  { search: ">Reservation Confirmed</p>", replace: ">{t('booking_confirmed', 'Reservation Confirmed')}</p>" },
  { search: ">We look forward to welcoming you.</h2>", replace: ">{t('booking_welcoming', 'We look forward to welcoming you.')}</h2>" },
  { search: "A confirmation voucher and receipt have been issued for", replace: "{t('booking_voucher', 'A confirmation voucher and receipt have been issued for')}" },
  { search: "Booking Reference</span>", replace: "{t('booking_ref', 'Booking Reference')}</span>" },
  { search: "Payment Status</span>", replace: "{t('booking_status', 'Payment Status')}</span>" },
  { search: "PAID IN FULL", replace: "{t('booking_paid', 'PAID IN FULL')}" },
  { search: "CARD GUARANTEED", replace: "{t('booking_guaranteed', 'CARD GUARANTEED')}" },
  
  { search: "Check-In</span>", replace: "{t('booking_checkin', 'Check-In')}</span>" },
  { search: "(from 3:00 PM)", replace: "{t('booking_checkin_time', '(from 3:00 PM)')}" },
  { search: "Check-Out</span>", replace: "{t('booking_checkout', 'Check-Out')}</span>" },
  { search: "(by 11:00 AM)", replace: "{t('booking_checkout_time', '(by 11:00 AM)')}" },
  { search: ">Duration & Guests</span>", replace: ">{t('booking_duration', 'Duration & Guests')}</span>" },
  { search: " Nights · ", replace: " {t('booking_Nights', 'Nights')} · " },
  { search: " Guests\n", replace: " {t('booking_guests', 'Guests')}\n" },
  { search: ">Total Amount</span>", replace: ">{t('booking_total_amt', 'Total Amount')}</span>" },
  
  { search: ">Keyless Smart Lock Access</p>", replace: ">{t('booking_smart_lock', 'Keyless Smart Lock Access')}</p>" },
  { search: "PIN: {confirmedBooking.smartLockPin}", replace: "{t('booking_pin', 'PIN:')} {confirmedBooking.smartLockPin}" },
  { search: "Activates on ", replace: "{t('booking_activates', 'Activates on')} " },
  { search: " at 3:00 PM</p>", replace: " {t('booking_at', 'at 3:00 PM')}</p>" },
  
  { search: "PRINT / SAVE VOUCHER\n", replace: "{t('booking_print', 'PRINT / SAVE VOUCHER')}\n" },
  { search: "BACK TO RESIDENCES\n", replace: "{t('booking_back', 'BACK TO RESIDENCES')}\n" },
  
  // Left column texts
  { search: ">Select Dates & Guests</h4>", replace: ">{t('booking_select_dates', 'Select Dates & Guests')}</h4>" },
  { search: ">Check live availability and calculate your stay.</p>", replace: ">{t('booking_live_avail', 'Check live availability and calculate your stay.')}</p>" },
  
  { search: ">Check-In Date</label>", replace: ">{t('booking_checkin', 'Check-In Date')}</label>" },
  { search: ">Check-Out Date</label>", replace: ">{t('booking_checkout', 'Check-Out Date')}</label>" },
  
  { search: ">Selected dates are unavailable</p>", replace: ">{t('booking_conflict', 'Selected dates are unavailable')}</p>" },
  { search: ">This residence has a confirmed reservation on overlapping dates. Please pick alternative dates.</p>", replace: ">{t('booking_conflict_desc', 'This residence has a confirmed reservation on overlapping dates. Please pick alternative dates.')}</p>" },
  { search: "Residence is available for these dates!", replace: "{t('booking_available', 'Residence is available for these dates!')}" },
  
  { search: ">Number of Guests</label>", replace: ">{t('booking_num_guests', 'Number of Guests')}</label>" },
  { search: "{n === 1 ? 'Guest' : 'Guests'} (Max {residence.sleeps})", replace: "{n === 1 ? t('booking_guest', 'Guest') : t('booking_guests', 'Guests')} ({t('booking_max', 'Max')} {residence.sleeps})" },
  
  { search: ">Primary Guest Details</h5>", replace: ">{t('booking_primary', 'Primary Guest Details')}</h5>" },
  { search: ">Full Name *</label>", replace: ">{t('booking_name', 'Full Name *')}</label>" },
  { search: "placeholder=\"e.g. Alexander Wright\"", replace: "placeholder={t('booking_name_ph', 'e.g. Alexander Wright')}" },
  
  { search: ">Email Address *</label>", replace: ">{t('booking_email', 'Email Address *')}</label>" },
  { search: "placeholder=\"name@company.com\"", replace: "placeholder={t('booking_email_ph', 'name@company.com')}" },
  
  { search: ">Phone / WhatsApp *</label>", replace: ">{t('booking_phone', 'Phone / WhatsApp *')}</label>" },
  { search: "placeholder=\"+971 50 123 4567\"", replace: "placeholder={t('booking_phone_ph', '+971 50 123 4567')}" },
  
  { search: ">Special Requests (Optional)</label>", replace: ">{t('booking_special', 'Special Requests (Optional)')}</label>" },
  { search: "placeholder=\"Airport transfer, baby cot, early arrival, etc.\"", replace: "placeholder={t('booking_special_ph', 'Airport transfer, baby cot, early arrival, etc.')}" },
  
  { search: "PROCEED TO PAYMENT & CONFIRMATION <", replace: "{t('booking_proceed', 'PROCEED TO PAYMENT & CONFIRMATION')} <" },
  { search: ">Please fill in name, email and phone to proceed.", replace: ">{t('booking_fill_warn', 'Please fill in name, email and phone to proceed.')}" },
  
  { search: ">Payment Options</h4>", replace: ">{t('booking_pay_options', 'Payment Options')}</h4>" },
  { search: ">Edit Dates\n", replace: ">{t('booking_edit_dates', 'Edit Dates')}\n" },
  
  { search: ">Pay Online</span>", replace: ">{t('booking_pay_online', 'Pay Online')}</span>" },
  { search: ">Hold & Pay Later</span>", replace: ">{t('booking_pay_later', 'Hold & Pay Later')}</span>" },
  { search: ">WhatsApp Desk</span>", replace: ">{t('booking_whatsapp', 'WhatsApp Desk')}</span>" },
  
  { search: "> 256-Bit SSL Encrypted\n", replace: "> {t('booking_encrypted', '256-Bit SSL Encrypted')}\n" },
  
  { search: ">Name on Card *</label>", replace: ">{t('booking_name_card', 'Name on Card *')}</label>" },
  { search: "placeholder=\"Name as it appears on card\"", replace: "placeholder={t('booking_name_card_ph', 'Name as it appears on card')}" },
  
  { search: ">Card Number *</label>", replace: ">{t('booking_card_num', 'Card Number *')}</label>" },
  { search: ">Expires *</label>", replace: ">{t('booking_expires', 'Expires *')}</label>" },
  { search: ">CVC / CVV *</label>", replace: ">{t('booking_cvc', 'CVC / CVV *')}</label>" },
  
  { search: ">Pay Upon Check-in</p>", replace: ">{t('booking_pay_upon', 'Pay Upon Check-in')}</p>" },
  { search: ">Your reservation is instantly confirmed and held under your name. You can pay with Card, Cash, or Bank Wire when you arrive in Dubai. Free cancellation up to 48 hours before check-in.</p>", replace: ">{t('booking_pay_upon_desc', 'Your reservation is instantly confirmed and held under your name. You can pay with Card, Cash, or Bank Wire when you arrive in Dubai. Free cancellation up to 48 hours before check-in.')}</p>" },
  { search: ">Credit Card Number for Guarantee *</label>", replace: ">{t('booking_guarantee', 'Credit Card Number for Guarantee *')}</label>" },
  
  { search: ">Direct Concierge Assistance</p>", replace: ">{t('booking_concierge', 'Direct Concierge Assistance')}</p>" },
  { search: ">Prefer to speak with our reservations desk directly? Click below to send your reservation details to our WhatsApp team for bespoke invoicing or corporate wire transfers.</p>", replace: ">{t('booking_concierge_desc', 'Prefer to speak with our reservations desk directly? Click below to send your reservation details to our WhatsApp team for bespoke invoicing or corporate wire transfers.')}</p>" },
  { search: "OPEN CONCIERGE WHATSAPP (+971 54 4937128)\n", replace: "{t('booking_open_wa', 'OPEN CONCIERGE WHATSAPP (+971 54 4937128)')}\n" },
  
  { search: "SUBMITTING YOUR BOOKING...</span>", replace: "{t('booking_submitting', 'SUBMITTING YOUR BOOKING...')}</span>" },
  { search: "`REQUEST BOOKING — ${formatPrice(totalAed)}`", replace: "`${t('booking_request', 'REQUEST BOOKING — ')}${formatPrice(totalAed)}`" },
  { search: "`GUARANTEE & CONFIRM RESERVATION`", replace: "t('booking_confirm', 'GUARANTEE & CONFIRM RESERVATION')" },
  
  { search: ">Price Summary</h5>", replace: ">{t('booking_summary', 'Price Summary')}</h5>" },
  { search: "} nights\n", replace: "} {t('booking_nights', 'nights')}\n" },
  { search: ">Departure Housekeeping & Linen Fee</span>", replace: ">{t('booking_cleaning', 'Departure Housekeeping & Linen Fee')}</span>" },
  { search: ">Dubai Tourism Dirham Fee</span>", replace: ">{t('booking_tourism', 'Dubai Tourism Dirham Fee')}</span>" },
  { search: ">UAE Value Added Tax (5% VAT)</span>", replace: ">{t('booking_vat', 'UAE Value Added Tax (5% VAT)')}</span>" },
  { search: ">Total Due</span>", replace: ">{t('booking_total', 'Total Due')}</span>" },
  
  { search: "Included: High-speed Wi-Fi & Nespresso\n", replace: "{t('booking_incl1', 'Included: High-speed Wi-Fi & Nespresso')}\n" },
  { search: "24/7 Local Concierge & Keyless Entry\n", replace: "{t('booking_incl2', '24/7 Local Concierge & Keyless Entry')}\n" },
  { search: "Free cancellation up to 48 hours before stay\n", replace: "{t('booking_incl3', 'Free cancellation up to 48 hours before stay')}\n" }
];

for (const r of replacements) {
  code = code.replace(r.search, r.replace);
}

fs.writeFileSync(filePath, code);
console.log('Successfully updated BookingModal with translations.');
