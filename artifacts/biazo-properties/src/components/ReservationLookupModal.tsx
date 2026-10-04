import { useState } from 'react';
import { BookingRecord, AED_TO_USD_RATE } from '@/data/residences';
import { CheckCircle2, Download, KeyRound, Search, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface LookupProps {
  onClose: () => void;
}

export function ReservationLookupModal({ onClose }: LookupProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [foundBooking, setFoundBooking] = useState<BookingRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const stored = JSON.parse(localStorage.getItem('bvh_bookings') || '[]') as BookingRecord[];
    const match = stored.find(
      (b) =>
        b.id.toLowerCase() === query.trim().toLowerCase() ||
        b.guestEmail.toLowerCase() === query.trim().toLowerCase()
    );
    setFoundBooking(match || null);
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-[#fbf8f2] p-6 text-[#263442] shadow-2xl md:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#263442]/60 hover:text-[#263442]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <img src="/biazo-logo-new.png" alt="Biazo Logo" className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-contain shadow-md" />
          <p className="eyebrow text-[#c56749]">{t('reservation_eyebrow', 'Guest Access')}</p>
        </div>
        <h3 className="font-serif text-3xl">{t('reservation_title', 'Find Your Reservation')}</h3>
        <p className="mt-1 text-xs text-[#263442]/65">
          {t('reservation_sub', 'Enter your Booking Reference (e.g. BVH-12345) or the email address used at reservation.')}
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('reservation_placeholder', 'Reference code or email')}
            className="field-input flex-1"
          />
          <button
            type="submit"
            className="btn-fill flex items-center gap-2 px-5 py-3 text-xs font-semibold"
          >
            <Search size={14} /> {t('reservation_search', 'SEARCH')}
          </button>
        </form>

        {hasSearched && !foundBooking && (
          <div className="mt-6 rounded-lg border border-[#263442]/15 bg-white p-6 text-center">
            <p className="text-sm font-semibold text-[#263442]">{t('reservation_not_found_title', 'No reservation found')}</p>
            <p className="mt-1 text-xs text-[#263442]/60">
              {t('reservation_not_found_sub', 'We couldn\'t locate a booking for "{query}". If you reserved via phone or WhatsApp, please message our concierge at +971 54 4937128.').replace('{query}', query)}
            </p>
          </div>
        )}

        {foundBooking && (
          <div className="mt-6 space-y-4 rounded-xl border border-[#263442]/15 bg-white p-5 text-left text-sm shadow-sm">
            <div className="flex items-center justify-between border-b border-[#263442]/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#263442]/50">{t('reservation_ref', 'Reference')}</span>
                <p className="font-mono text-lg font-bold text-[#c56749]">{foundBooking.id}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                {foundBooking.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div>
              <p className="font-serif text-lg font-bold">{foundBooking.residenceName}</p>
              <p className="text-xs text-[#263442]/60">{t('reservation_guest', 'Guest:')} {foundBooking.guestName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#263442]/60">{t('reservation_checkin', 'Check-in')}</span>
                <p className="font-semibold">{foundBooking.checkIn}</p>
              </div>
              <div>
                <span className="text-[#263442]/60">{t('reservation_checkout', 'Check-out')}</span>
                <p className="font-semibold">{foundBooking.checkOut}</p>
              </div>
              <div>
                <span className="text-[#263442]/60">{t('reservation_total', 'Total')}</span>
                <p className="font-semibold text-emerald-700">
                  {formatPrice(foundBooking.totalAed, foundBooking.currency)}
                </p>
              </div>
              <div>
                <span className="text-[#263442]/60">{t('reservation_guests', 'Guests')}</span>
                <p className="font-semibold">{foundBooking.guests} {t('booking_guests', 'Guests')}</p>
              </div>
            </div>

            <div className="rounded-lg bg-[#fbf8f2] p-3 text-xs border border-[#c56749]/30">
              <div className="flex items-center gap-2 text-[#c56749] font-bold">
                <KeyRound size={15} /> {t('reservation_lock_label', 'Keyless Smart Lock PIN:')} {foundBooking.smartLockPin}
              </div>
              <p className="mt-0.5 text-[11px] text-[#263442]/60">
                {t('reservation_lock_note', 'Activates automatically on check-in day.')}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#263442]/20 py-2.5 text-xs font-semibold hover:bg-[#263442]/5"
            >
              <Download size={14} /> {t('reservation_print', 'PRINT / SAVE ITINERARY')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
