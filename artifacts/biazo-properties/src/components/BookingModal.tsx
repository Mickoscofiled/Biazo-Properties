import { useState, useId } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  Info,
  Lock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  KeyRound,
  AlertTriangle
} from 'lucide-react';
import { Residence, AED_TO_USD_RATE, BookingRecord } from '@/data/residences';

interface BookingModalProps {
  residence: Residence;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  currency: 'AED' | 'USD';
  onClose: () => void;
  onBookingSuccess?: (booking: BookingRecord) => void;
}

export function BookingModal({
  residence,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  currency,
  onClose,
  onBookingSuccess
}: BookingModalProps) {
  const today = new Date().toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(
    initialCheckIn || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [checkOut, setCheckOut] = useState(
    initialCheckOut || new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0]
  );
  const [guests, setGuests] = useState(initialGuests);

  // Guest Information
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Payment Options: 'card' | 'arrival' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'arrival' | 'whatsapp'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const calculatedNights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  // Check date conflict with bookedRanges
  const hasConflict = residence.bookedRanges.some((range) => {
    return checkIn < range.end && checkOut > range.start;
  });

  // Price calculations
  const basePriceAed = calculatedNights * residence.pricePerNightAed;
  const tourismFeeAed = calculatedNights * 20; // Dubai Tourism Dirham
  const subtotalAed = basePriceAed + residence.cleaningFeeAed + tourismFeeAed;
  const vatAed = Math.round(subtotalAed * 0.05); // 5% UAE VAT
  const totalAed = subtotalAed + vatAed;

  const formatPrice = (aedAmount: number) => {
    if (currency === 'USD') {
      const usd = Math.round(aedAmount / AED_TO_USD_RATE);
      return `$${usd.toLocaleString()} USD`;
    }
    return `AED ${aedAmount.toLocaleString()}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setCardExpiry(val);
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasConflict) return;

    setIsProcessing(true);

    setTimeout(() => {
      const bookingId = `BVH-${Math.floor(10000 + Math.random() * 90000)}`;
      const randomPin = `${Math.floor(1000 + Math.random() * 9000)}#`;

      const newBooking: BookingRecord = {
        id: bookingId,
        residenceId: residence.id,
        residenceName: residence.name,
        checkIn,
        checkOut,
        nights: calculatedNights,
        guests,
        totalAed,
        currency,
        guestName,
        guestEmail,
        guestPhone,
        paymentMethod,
        paymentStatus: paymentMethod === 'card' ? 'paid' : paymentMethod === 'arrival' ? 'guaranteed' : 'inquiry',
        bookedAt: new Date().toISOString(),
        smartLockPin: randomPin
      };

      // Save to localStorage so guest can view reservations
      const existing = JSON.parse(localStorage.getItem('bvh_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('bvh_bookings', JSON.stringify(existing));

      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      setStep('confirmed');
      if (onBookingSuccess) onBookingSuccess(newBooking);
    }, 1200);
  };

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      `Hello Biazo Vacation Homes Concierge,\n\nI would like to reserve:\n• Residence: ${residence.name}\n• Check-In: ${checkIn}\n• Check-Out: ${checkOut} (${calculatedNights} nights)\n• Guests: ${guests}\n• Estimated Total: ${formatPrice(totalAed)}\n• Guest Name: ${guestName || 'Valued Guest'}\n• Contact: ${guestPhone || ''}\n\nPlease confirm availability and payment link.`
    );
    window.open(`https://wa.me/971544937128?text=${message}`, '_blank');
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative my-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#fbf8f2] shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-[#263442]/15 bg-[#263442] px-6 py-4 text-[#fbf8f2]">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center border border-[#fbf8f2]/40 font-serif text-sm italic">
              B
            </span>
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#dbcdbb]">BIAZO VACATION HOMES</p>
              <h3 className="font-serif text-lg leading-tight text-[#fbf8f2]">{residence.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#fbf8f2]/70 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'confirmed' && confirmedBooking ? (
          /* CONFIRMATION SCREEN */
          <div className="p-6 md:p-10 text-[#263442]">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={36} />
              </div>
              <p className="eyebrow mt-4 text-[#c56749]">Reservation Confirmed</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">We look forward to welcoming you.</h2>
              <p className="mt-3 text-sm text-[#263442]/70">
                A confirmation voucher and receipt have been issued for <strong>{confirmedBooking.guestName}</strong>.
              </p>

              {/* Voucher Card */}
              <div className="mt-8 rounded-xl border border-[#263442]/20 bg-white p-6 text-left shadow-sm">
                <div className="flex items-center justify-between border-b border-[#263442]/15 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#263442]/50">Booking Reference</span>
                    <p className="font-mono text-xl font-bold tracking-widest text-[#c56749]">{confirmedBooking.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#263442]/50">Payment Status</span>
                    <p className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800 uppercase">
                      {confirmedBooking.paymentStatus === 'paid' ? 'PAID IN FULL' : 'CARD GUARANTEED'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-[#263442]/60">Check-In</span>
                    <p className="font-semibold">{confirmedBooking.checkIn} (from 3:00 PM)</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#263442]/60">Check-Out</span>
                    <p className="font-semibold">{confirmedBooking.checkOut} (by 11:00 AM)</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#263442]/60">Duration & Guests</span>
                    <p className="font-semibold">
                      {confirmedBooking.nights} Nights · {confirmedBooking.guests} Guests
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-[#263442]/60">Total Amount</span>
                    <p className="font-semibold text-emerald-800">{formatPrice(confirmedBooking.totalAed)}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-[#fbf8f2] p-4 border border-[#c56749]/30">
                  <div className="flex items-center gap-3">
                    <KeyRound size={20} className="text-[#c56749]" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#263442]">Keyless Smart Lock Access</p>
                      <p className="font-mono text-lg font-bold text-[#c56749]">PIN: {confirmedBooking.smartLockPin}</p>
                      <p className="text-[11px] text-[#263442]/60">Activates on {confirmedBooking.checkIn} at 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 rounded-lg border border-[#263442]/30 px-5 py-3 text-xs font-semibold text-[#263442] hover:bg-[#263442]/5"
                >
                  <Download size={15} /> PRINT / SAVE VOUCHER
                </button>
                <button
                  onClick={onClose}
                  className="btn-fill px-8 py-3 text-xs font-semibold tracking-wider"
                >
                  BACK TO RESIDENCES
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* BOOKING & PAYMENT FLOW */
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr]">
            {/* Left Column: Form & Dates */}
            <div className="border-b border-[#263442]/15 p-6 md:border-b-0 md:border-r md:p-8">
              {step === 'details' ? (
                <div>
                  <h4 className="font-serif text-2xl text-[#263442]">Select Dates & Guests</h4>
                  <p className="mt-1 text-xs text-[#263442]/65">Check live availability and calculate your stay.</p>

                  {/* Date Pickers */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="field-label">Check-In Date</label>
                      <input
                        type="date"
                        min={today}
                        value={checkIn}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                          if (e.target.value >= checkOut) {
                            const next = new Date(e.target.value);
                            next.setDate(next.getDate() + 2);
                            setCheckOut(next.toISOString().split('T')[0]);
                          }
                        }}
                        className="field-input mt-1"
                      />
                    </div>
                    <div>
                      <label className="field-label">Check-Out Date</label>
                      <input
                        type="date"
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="field-input mt-1"
                      />
                    </div>
                  </div>

                  {/* Date Conflict Alert */}
                  {hasConflict ? (
                    <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-700">
                      <AlertTriangle size={18} className="shrink-0 text-red-500" />
                      <div>
                        <p className="font-semibold">Selected dates are unavailable</p>
                        <p className="mt-0.5">This residence has a confirmed reservation on overlapping dates. Please pick alternative dates.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700">
                      <CheckCircle2 size={15} /> Residence is available for these dates!
                    </div>
                  )}

                  {/* Guests */}
                  <div className="mt-5">
                    <label className="field-label">Number of Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="field-input mt-1"
                    >
                      {Array.from({ length: residence.sleeps }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'} (Max {residence.sleeps})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="mt-6 space-y-4 border-t border-[#263442]/15 pt-5">
                    <h5 className="font-serif text-lg text-[#263442]">Primary Guest Details</h5>
                    <div>
                      <label className="field-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Wright"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="field-input mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="field-label">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="field-input mt-1"
                        />
                      </div>
                      <div>
                        <label className="field-label">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+971 50 123 4567"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          className="field-input mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="field-label">Special Requests (Optional)</label>
                      <input
                        type="text"
                        placeholder="Airport transfer, baby cot, early arrival, etc."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="field-input mt-1"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      disabled={hasConflict || !guestName || !guestEmail || !guestPhone}
                      onClick={() => setStep('payment')}
                      className="btn-fill flex w-full items-center justify-center gap-2 py-4 text-xs font-semibold tracking-wider disabled:opacity-50"
                    >
                      PROCEED TO PAYMENT & CONFIRMATION <ChevronRight size={16} />
                    </button>
                    {(!guestName || !guestEmail || !guestPhone) && (
                      <p className="mt-2 text-center text-[11px] text-[#263442]/50">
                        Please fill in name, email and phone to proceed.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* STEP 2: PAYMENT METHOD */
                <form onSubmit={handleConfirmReservation}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-2xl text-[#263442]">Payment Options</h4>
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="text-xs font-semibold text-[#c56749] underline"
                    >
                      Edit Dates
                    </button>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#c56749] bg-[#c56749]/10 font-bold text-[#c56749]'
                          : 'border-[#263442]/20 text-[#263442]/70 hover:bg-white'
                      }`}
                    >
                      <CreditCard size={20} className="mb-1.5" />
                      <span className="text-[11px]">Pay Online</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('arrival')}
                      className={`flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                        paymentMethod === 'arrival'
                          ? 'border-[#c56749] bg-[#c56749]/10 font-bold text-[#c56749]'
                          : 'border-[#263442]/20 text-[#263442]/70 hover:bg-white'
                      }`}
                    >
                      <ShieldCheck size={20} className="mb-1.5" />
                      <span className="text-[11px]">Hold & Pay Later</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                        paymentMethod === 'whatsapp'
                          ? 'border-[#c56749] bg-[#c56749]/10 font-bold text-[#c56749]'
                          : 'border-[#263442]/20 text-[#263442]/70 hover:bg-white'
                      }`}
                    >
                      <MessageCircle size={20} className="mb-1.5 text-emerald-600" />
                      <span className="text-[11px]">WhatsApp Desk</span>
                    </button>
                  </div>

                  {/* Payment Form Fields */}
                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4 rounded-xl border border-[#263442]/15 bg-white p-5">
                      <div className="flex items-center justify-between text-xs text-[#263442]/60">
                        <span className="flex items-center gap-1 font-medium text-emerald-700">
                          <Lock size={12} /> 256-Bit SSL Encrypted
                        </span>
                        <span className="font-semibold">Visa · Mastercard · Amex</span>
                      </div>

                      <div>
                        <label className="field-label">Name on Card *</label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Name as it appears on card"
                          className="field-input mt-1"
                        />
                      </div>

                      <div>
                        <label className="field-label">Card Number *</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          className="field-input mt-1 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="field-label">Expires *</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="field-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="field-label">CVC / CVV *</label>
                          <input
                            type="password"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.slice(0, 4))}
                            placeholder="123"
                            maxLength={4}
                            className="field-input mt-1 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'arrival' && (
                    <div className="mt-6 rounded-xl border border-[#263442]/15 bg-white p-5 text-sm text-[#263442]/80">
                      <p className="font-semibold text-[#263442]">Pay Upon Check-in</p>
                      <p className="mt-2 text-xs leading-relaxed text-[#263442]/65">
                        Your reservation is instantly confirmed and held under your name. You can pay with Card, Cash, or Bank Wire when you arrive in Dubai. Free cancellation up to 48 hours before check-in.
                      </p>
                      <div className="mt-4">
                        <label className="field-label">Credit Card Number for Guarantee *</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="Hold guarantee card number"
                          className="field-input mt-1 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'whatsapp' && (
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-sm text-emerald-900">
                      <p className="font-semibold">Direct Concierge Assistance</p>
                      <p className="mt-2 text-xs leading-relaxed text-emerald-800/80">
                        Prefer to speak with our reservations desk directly? Click below to send your reservation details to our WhatsApp team for bespoke invoicing or corporate wire transfers.
                      </p>
                      <button
                        type="button"
                        onClick={handleWhatsAppBooking}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        <MessageCircle size={16} /> OPEN CONCIERGE WHATSAPP (+971 54 4937128)
                      </button>
                    </div>
                  )}

                  {paymentMethod !== 'whatsapp' && (
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn-fill flex w-full items-center justify-center gap-2 py-4 text-xs font-semibold tracking-wider disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <span>PROCESSING SECURE PAYMENT...</span>
                        ) : (
                          <>
                            <Lock size={14} />
                            {paymentMethod === 'card'
                              ? `PAY ${formatPrice(totalAed)} & CONFIRM`
                              : `GUARANTEE & CONFIRM RESERVATION`}
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Right Column: Price Breakdown & Property Preview */}
            <div className="bg-[#f4efe5] p-6 md:p-8">
              <div className="overflow-hidden rounded-xl border border-[#263442]/15 bg-white shadow-sm">
                <img
                  src={residence.images[0].url}
                  alt={residence.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <span className="eyebrow text-[#c56749]">{residence.neighborhood}</span>
                  <h4 className="mt-1 font-serif text-lg font-bold text-[#263442]">{residence.name}</h4>
                  <p className="mt-1 text-xs text-[#263442]/65">
                    {residence.bedrooms} Bedrooms · {residence.bathrooms} Bathrooms · Sleeps {residence.sleeps}
                  </p>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="mt-6">
                <h5 className="font-serif text-base text-[#263442]">Price Summary</h5>
                <div className="mt-4 space-y-2.5 text-xs text-[#263442]/80">
                  <div className="flex justify-between">
                    <span>
                      {formatPrice(residence.pricePerNightAed)} × {calculatedNights} nights
                    </span>
                    <span className="font-medium">{formatPrice(basePriceAed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure Housekeeping & Linen Fee</span>
                    <span className="font-medium">{formatPrice(residence.cleaningFeeAed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dubai Tourism Dirham Fee</span>
                    <span className="font-medium">{formatPrice(tourismFeeAed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>UAE Value Added Tax (5% VAT)</span>
                    <span className="font-medium">{formatPrice(vatAed)}</span>
                  </div>

                  <div className="mt-4 border-t border-[#263442]/20 pt-4 flex items-baseline justify-between text-base font-bold text-[#263442]">
                    <span>Total Due</span>
                    <span className="font-serif text-xl text-[#c56749]">{formatPrice(totalAed)}</span>
                  </div>
                </div>
              </div>

              {/* Inclusion highlights */}
              <div className="mt-6 border-t border-[#263442]/15 pt-5 text-xs text-[#263442]/70 space-y-2">
                <p className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#c56749]" /> Included: High-speed Wi-Fi & Nespresso
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#c56749]" /> 24/7 Local Concierge & Keyless Entry
                </p>
                <p className="flex items-center gap-2">
                  <Info size={14} className="text-[#c56749]" /> Free cancellation up to 48 hours before stay
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
