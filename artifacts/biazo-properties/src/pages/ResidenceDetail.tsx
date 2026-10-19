import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Coins,
  Heart,
  KeyRound,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  X,
  Maximize2,
  Bath,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { residences as fallbackResidences, type Residence, type BookingRecord } from '@/data/residences';
import { useSettings } from '@/context/SettingsContext';
import { formatPrice } from '@/lib/utils';
import { BookingModal } from '@/components/BookingModal';
import { SettingsModal } from '@/components/SettingsModal';

export default function ResidenceDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { currency } = useSettings();
  const { t } = useTranslation();

  const [residencesList, setResidencesList] = useState<Residence[]>(fallbackResidences);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Parse query params for dates/guests if passed from search
  const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialCheckInParam = queryParams?.get('checkIn') || '';
  const initialCheckOutParam = queryParams?.get('checkOut') || '';
  const initialGuestsParam = Number(queryParams?.get('guests')) || 2;

  // Local reservation widget dates
  const today = new Date();
  const defaultIn = initialCheckInParam || new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];
  const defaultOut = initialCheckOutParam || new Date(today.setDate(today.getDate() + 4)).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultIn);
  const [checkOut, setCheckOut] = useState(defaultOut);
  const [guests, setGuests] = useState(initialGuestsParam);

  // Fetch live KV residences
  useEffect(() => {
    fetch('/api/residences?sync=true')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = fallbackResidences.map(res => {
            const match = data.find((d: any) => d.id === res.id);
            return match
              ? {
                  ...res,
                  bookedRanges: match.bookedRanges ?? res.bookedRanges,
                  rating: match.rating ?? res.rating,
                  reviewsCount: match.reviewsCount ?? res.reviewsCount,
                  pricePerNightAed: match.pricePerNightAed ?? res.pricePerNightAed,
                }
              : res;
          });
          const extra = data.filter((d: any) => !fallbackResidences.some(h => h.id === d.id));
          setResidencesList([...merged, ...extra]);
        }
      })
      .catch(() => { /* fallback */ });
  }, []);

  const residence = residencesList.find(r => r.id === params.id) || fallbackResidences.find(r => r.id === params.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [params.id]);

  if (!residence) {
    return (
      <div className="min-h-screen bg-[#f3eee2] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-[#263442]">Residence Not Found</h1>
        <p className="mt-3 text-sm text-[#263442]/65 max-w-md">
          The requested luxury residence could not be found or may no longer be available.
        </p>
        <Link
          href="/#all-residences"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#263442] px-6 py-3 text-xs font-semibold tracking-wider text-[#fbf8f2] hover:bg-[#1a242e] transition-all"
        >
          <ArrowLeft size={16} /> Return to All Residences
        </Link>
      </div>
    );
  }

  // Calculate nights and availability
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.max(1, Math.round(timeDiff / (1000 * 3600 * 24)));

  const isDatesAvailable = !residence.bookedRanges?.some(range => {
    return checkIn < range.end && checkOut > range.start;
  });

  const nightlyRate = residence.pricePerNightAed;
  const cleaningFee = residence.cleaningFeeAed;
  const subtotalAed = nightlyRate * nights;
  const totalAed = subtotalAed + cleaningFee;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Biazo Concierge, I am interested in reserving ${residence.name} in ${residence.neighborhood} for ${nights} nights (${checkIn} to ${checkOut}) for ${guests} guests.`
  );

  return (
    <div className="min-h-screen bg-[#fbfaf4] text-[#263442] flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-[#263442]/10 bg-[#fbfaf4]/90 backdrop-blur-md">
        <div className="container-wide flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/biazo-logo-new.png"
              alt="Biazo Vacation Homes"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[.14em] leading-none text-[#263442]">Biazo</span>
              <span className="text-[9px] font-medium tracking-[.22em] uppercase text-[#c56749]">Vacation Homes</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => setLocation('/#all-residences')}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-wider text-[#263442]/80 hover:text-[#263442] transition-colors"
            >
              <ArrowLeft size={14} /> {t('back_to_residences', 'All Residences')}
            </button>

            <button
              onClick={() => setSettingsOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-[#263442]/15 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#263442] hover:bg-white transition-all"
              aria-label="Change currency"
            >
              <Coins size={14} className="text-[#c56749]" />
              <span>{currency}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-wide py-8 md:py-12 flex-1">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-2 text-xs text-[#263442]/60">
            <Link href="/" className="hover:text-[#263442] transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-[#263442] transition-colors">{residence.neighborhood}</span>
            <span>/</span>
            <span className="text-[#263442] font-semibold truncate max-w-[200px] sm:max-w-none">{residence.name}</span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-full border border-[#263442]/15 bg-white px-3.5 py-1.5 text-xs font-medium text-[#263442] hover:bg-[#263442]/5 transition-all"
            >
              <Share2 size={13} /> {showShareToast ? 'Link Copied!' : 'Share'}
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex items-center gap-1.5 rounded-full border border-[#263442]/15 bg-white px-3.5 py-1.5 text-xs font-medium text-[#263442] hover:bg-[#263442]/5 transition-all"
            >
              <Heart size={13} fill={isSaved ? '#c56749' : 'none'} className={isSaved ? 'text-[#c56749]' : ''} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Title & Headline Block */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-md bg-[#263442] px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white">
              {residence.neighborhood.toUpperCase()}
            </span>
            <span className="rounded-md border border-[#c56749]/30 bg-[#c56749]/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#c56749]">
              {residence.type.toUpperCase()}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl text-[#263442] tracking-tight">{residence.name}</h1>
          <p className="mt-2 text-base md:text-lg text-[#263442]/75 max-w-3xl">{residence.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#263442]/70">
            <span className="flex items-center gap-1 font-semibold text-[#263442]">
              <Star size={14} fill="#e8a83e" className="text-[#e8a83e]" />
              {residence.rating} ({residence.reviewsCount} verified reviews)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-[#c56749]" />
              {residence.address}
            </span>
          </div>
        </div>

        {/* PHOTO GALLERY — Multi-image mosaic */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-[#263442]/15 bg-black/5 shadow-md">
            {/* Desktop Mosaic Grid (1 Big Hero + 4 Secondary Photos) */}
            <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 h-[520px]">
              {/* Main Feature Image */}
              <div
                onClick={() => { setActivePhotoIndex(0); setIsLightboxOpen(true); }}
                className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
              >
                <img
                  src={residence.images[0]?.url}
                  alt={residence.images[0]?.caption || residence.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-4 left-4 rounded-md bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                  {residence.images[0]?.caption || 'Main Living Salon'}
                </span>
              </div>

              {/* Secondary Images */}
              {residence.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => { setActivePhotoIndex(idx + 1); setIsLightboxOpen(true); }}
                  className="relative group cursor-pointer overflow-hidden"
                >
                  <img
                    src={img.url}
                    alt={img.caption || residence.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-2.5 left-2.5 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm truncate max-w-[90%]">
                    {img.caption}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Carousel View */}
            <div className="md:hidden relative aspect-[4/3] w-full">
              <img
                src={residence.images[activePhotoIndex]?.url}
                alt={residence.images[activePhotoIndex]?.caption || residence.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="rounded bg-black/60 px-2.5 py-1 backdrop-blur-sm truncate max-w-[70%]">
                  {residence.images[activePhotoIndex]?.caption}
                </span>
                <span className="rounded bg-black/60 px-2 py-1 font-mono text-[11px] backdrop-blur-sm">
                  {activePhotoIndex + 1} / {residence.images.length}
                </span>
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : residence.images.length - 1));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#263442] backdrop-blur-sm"
                aria-label="Previous photo"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((prev) => (prev < residence.images.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#263442] backdrop-blur-sm"
                aria-label="Next photo"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* "Show All Photos" trigger button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-xs font-semibold text-[#263442] shadow-lg backdrop-blur-md hover:bg-white transition-all"
            >
              <Maximize2 size={14} />
              <span>View All {residence.images.length} Photos</span>
            </button>
          </div>

          {/* Thumbnail preview strip */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {residence.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => { setActivePhotoIndex(idx); setIsLightboxOpen(true); }}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  activePhotoIndex === idx ? 'border-[#c56749] scale-95 shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.caption} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* 2-Column Layout: Details (Left) + Booking Widget (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Residence Specifications, Full Description & Amenities */}
          <div className="lg:col-span-7 space-y-10">
            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[#263442]/10 py-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c56749]/10 text-[#c56749]">
                  <BedDouble size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263442]">{residence.bedrooms} Bedrooms</span>
                  <span className="text-[11px] text-[#263442]/60">Dedicated suites</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c56749]/10 text-[#c56749]">
                  <Bath size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263442]">{residence.bathrooms} Baths</span>
                  <span className="text-[11px] text-[#263442]/60">Luxury travertine</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c56749]/10 text-[#c56749]">
                  <UsersRound size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263442]">Sleeps {residence.sleeps}</span>
                  <span className="text-[11px] text-[#263442]/60">Max guests</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c56749]/10 text-[#c56749]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#263442]">{residence.sqft.toLocaleString()} sq ft</span>
                  <span className="text-[11px] text-[#263442]/60">Living space</span>
                </div>
              </div>
            </div>

            {/* Full Property Description */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-[#263442]">About This Residence</h2>
              <p className="mt-4 text-base leading-8 text-[#263442]/80 font-normal">
                {residence.description}
              </p>
            </section>

            {/* Signature Biazo Perks */}
            <section className="rounded-xl border border-[#263442]/10 bg-[#f3eee2]/60 p-6">
              <h3 className="font-serif text-xl text-[#263442]">The Biazo Standard</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#263442]/75">
                <div className="flex items-start gap-2.5">
                  <KeyRound size={16} className="text-[#c56749] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#263442] font-semibold block">Keyless Smart Entry</strong>
                    Private encrypted access code active upon arrival date.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={16} className="text-[#c56749] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#263442] font-semibold block">Personally Verified</strong>
                    Inspected and maintained to 5-star hospitality standards.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MessageCircle size={16} className="text-[#c56749] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#263442] font-semibold block">24/7 Local Concierge</strong>
                    Reservations, transfers, and in-residence requests handled anytime.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles size={16} className="text-[#c56749] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#263442] font-semibold block">Luxury Hotel Linens</strong>
                    Belgian cotton bedding, plush towels, and luxury toiletries.
                  </div>
                </div>
              </div>
            </section>

            {/* All Amenities */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-[#263442]">Amenities & Inclusions</h2>
              <p className="mt-1 text-xs text-[#263442]/60">Everything provided for an effortless and refined stay.</p>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {residence.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-[#263442]/10 bg-white p-3.5 shadow-xs"
                  >
                    <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                    <span className="text-xs font-medium text-[#263442]">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Check-in / Check-out Times */}
            {(residence.checkInTime || residence.checkOutTime) && (
              <section className="border-t border-[#263442]/10 pt-8">
                <h2 className="font-serif text-xl text-[#263442]">Check-in & Check-out</h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {residence.checkInTime && (
                    <div className="flex items-start gap-3 rounded-xl border border-[#263442]/10 bg-white p-4 shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#263442]/50">Check-in</span>
                        <span className="mt-0.5 block text-sm font-bold text-[#263442]">{residence.checkInTime}</span>
                      </div>
                    </div>
                  )}
                  {residence.checkOutTime && (
                    <div className="flex items-start gap-3 rounded-xl border border-[#263442]/10 bg-white p-4 shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c56749]/10 text-[#c56749]">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#263442]/50">Check-out</span>
                        <span className="mt-0.5 block text-sm font-bold text-[#263442]">{residence.checkOutTime}</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Room Features */}
            {residence.roomFeatures && residence.roomFeatures.length > 0 && (
              <section className="border-t border-[#263442]/10 pt-8">
                <h2 className="font-serif text-xl text-[#263442]">Room Configuration & Features</h2>
                <p className="mt-1 text-xs text-[#263442]/55">Bed types, layout highlights, and in-room details.</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {residence.roomFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-[#263442]/10 bg-[#f9f7f0] p-3">
                      <BedDouble size={15} className="text-[#c56749] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#263442]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* House Rules & Stay Policies */}
            <section className="border-t border-[#263442]/10 pt-8">
              <h2 className="font-serif text-xl text-[#263442]">House Rules & Stay Policies</h2>
              {residence.houseRules && residence.houseRules.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {residence.houseRules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-lg border border-[#263442]/10 bg-white p-3.5">
                      <AlertCircle size={14} className="text-[#c56749] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#263442]/75">{rule}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2.5 rounded-lg border border-[#263442]/10 bg-white p-3.5">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#263442]/75">Free cancellation up to 48 hours before check-in</span>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-lg border border-[#263442]/10 bg-white p-3.5">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#263442]/75">Pay securely online or reserve with Pay Upon Arrival</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#263442]/70">
                  <div className="space-y-1">
                    <strong className="text-[#263442] block">Check-in / Check-out</strong>
                    <p>Check-in from 3:00 PM via keyless code. Check-out by 12:00 PM.</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#263442] block">Cancellation Policy</strong>
                    <p>Free cancellation up to 48 hours before scheduled check-in.</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#263442] block">House Rules</strong>
                    <p>Non-smoking indoors. Quiet hours observed after 10:00 PM.</p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-[#263442] block">Payment Flexibility</strong>
                    <p>Pay online securely with Card or reserve with Pay Upon Arrival.</p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT: Sticky Live Reservation Widget */}
          <aside className="lg:col-span-5 sticky top-28">
            <div className="rounded-2xl border border-[#263442]/15 bg-white p-6 md:p-8 shadow-xl">
              {/* Price Header */}
              <div className="flex items-baseline justify-between border-b border-[#263442]/10 pb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#263442]/55">Nightly Rate</span>
                  <div className="font-serif text-3xl font-bold text-[#263442]">
                    {formatPrice(nightlyRate, currency)}
                    <span className="font-sans text-xs font-normal text-[#263442]/60"> / night</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-[#263442]">
                  <Star size={14} fill="#e8a83e" className="text-[#e8a83e]" />
                  {residence.rating}
                </span>
              </div>

              {/* Date & Guest Selectors */}
              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#263442]/15 bg-[#fbfaf4] p-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#c56749]">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (e.target.value >= checkOut) {
                          const nxt = new Date(e.target.value);
                          nxt.setDate(nxt.getDate() + 2);
                          setCheckOut(nxt.toISOString().split('T')[0]);
                        }
                      }}
                      className="mt-1 w-full bg-transparent text-xs font-semibold text-[#263442] outline-none"
                    />
                  </div>

                  <div className="border-l border-[#263442]/15 pl-2.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#c56749]">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1 w-full bg-transparent text-xs font-semibold text-[#263442] outline-none"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="rounded-xl border border-[#263442]/15 bg-[#fbfaf4] p-2.5">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#c56749]">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="mt-1 w-full bg-transparent text-xs font-semibold text-[#263442] outline-none cursor-pointer"
                  >
                    {Array.from({ length: residence.sleeps }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'} (Max {residence.sleeps})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability Status Notice */}
                {isDatesAvailable ? (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-700" />
                    <span>Residence is free for your selected dates!</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                    <AlertCircle size={16} className="shrink-0 text-amber-700 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Reserved on these dates</strong>
                      These dates overlap with an existing booking. Please pick alternative dates above.
                    </div>
                  </div>
                )}

                {/* Cost Breakdown Preview */}
                <div className="space-y-2 border-y border-[#263442]/10 py-4 text-xs text-[#263442]/75">
                  <div className="flex justify-between">
                    <span>{formatPrice(nightlyRate, currency)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span className="font-semibold text-[#263442]">{formatPrice(subtotalAed, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>One-time preparation & cleaning fee</span>
                    <span className="font-semibold text-[#263442]">{formatPrice(cleaningFee, currency)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#263442]/10 pt-2 text-sm font-bold text-[#263442]">
                    <span>Estimated Total</span>
                    <span>{formatPrice(totalAed, currency)}</span>
                  </div>
                </div>

                {/* Primary CTA: "Reserve" / "Book Now" Button */}
                <button
                  onClick={() => setIsBookingOpen(true)}
                  disabled={!isDatesAvailable}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 text-xs font-semibold tracking-wider uppercase transition-all shadow-md ${
                    isDatesAvailable
                      ? 'bg-[#263442] text-[#fbf8f2] hover:bg-[#1a242e] active:scale-[0.98]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  data-testid="button-reserve-residence"
                >
                  {isDatesAvailable ? 'Reserve Residence' : 'Unavailable on Dates'} <ArrowRight size={15} />
                </button>

                {/* Secondary Option: WhatsApp Direct Inquiries */}
                <a
                  href={`https://wa.me/971544937128?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#263442]/20 py-3 text-xs font-semibold text-[#263442] hover:bg-[#263442]/5 transition-all"
                >
                  <MessageCircle size={15} className="text-emerald-600" />
                  <span>Ask Concierge on WhatsApp</span>
                </a>

                {/* Micro Guarantee Copy */}
                <div className="pt-2 text-center text-[11px] text-[#263442]/55 space-y-1">
                  <p>Pay online or upon arrival in Dubai.</p>
                  <p>Instant booking confirmation & 256-bit encrypted.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FULL-SCREEN PHOTO LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white p-4 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/60">
                {activePhotoIndex + 1} / {residence.images.length}
              </span>
              <span className="text-sm font-medium text-white/90 truncate max-w-sm">
                {residence.images[activePhotoIndex]?.caption}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Close photo gallery"
            >
              <X size={20} />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={residence.images[activePhotoIndex]?.url}
              alt={residence.images[activePhotoIndex]?.caption || residence.name}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Prev Button */}
            <button
              onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : residence.images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-all backdrop-blur-md"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setActivePhotoIndex((prev) => (prev < residence.images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-all backdrop-blur-md"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Lightbox Thumbnails Strip */}
          <div className="flex gap-2 justify-center overflow-x-auto pt-2 border-t border-white/10">
            {residence.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                  activePhotoIndex === idx ? 'border-[#c56749] scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.caption} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Booking Checkout Modal */}
      {isBookingOpen && (
        <BookingModal
          residence={residence}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuests={guests}
          currency={currency}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={(booking: BookingRecord) => {
            setIsBookingOpen(false);
            setLocation(`/#all-residences`);
          }}
        />
      )}

      {/* Settings Modal (Currency) */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Simple Footer */}
      <footer className="border-t border-[#263442]/10 bg-[#f3eee2] py-8 text-center text-xs text-[#263442]/60">
        <p>© {new Date().getFullYear()} Biazo Vacation Homes. All rights reserved. Dubai, United Arab Emirates.</p>
      </footer>
    </div>
  );
}
