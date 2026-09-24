import { useState } from 'react';
import {
  BedDouble,
  Building2,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Sparkles,
  Star,
  UsersRound,
  ArrowRight
} from 'lucide-react';
import { Residence, AED_TO_USD_RATE } from '@/data/residences';

interface ListingsProps {
  residences: Residence[];
  selectedDates?: { checkIn: string; checkOut: string };
  currency: 'AED' | 'USD';
  onSelectResidence: (residence: Residence) => void;
}

export function ResidenceListings({
  residences,
  selectedDates,
  currency,
  onSelectResidence
}: ListingsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Downtown Dubai' | 'Palm Jumeirah' | 'Dubai Marina' | 'Emirates Hills'>('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = residences.filter((r) => {
    if (selectedFilter === 'All') return true;
    return r.neighborhood === selectedFilter;
  });

  const formatPrice = (aed: number) => {
    if (currency === 'USD') {
      const usd = Math.round(aed / AED_TO_USD_RATE);
      return `$${usd.toLocaleString()}`;
    }
    return `AED ${aed.toLocaleString()}`;
  };

  const checkIsAvailable = (r: Residence) => {
    if (!selectedDates || !selectedDates.checkIn || !selectedDates.checkOut) return true;
    return !r.bookedRanges.some((range) => {
      return selectedDates.checkIn < range.end && selectedDates.checkOut > range.start;
    });
  };

  return (
    <section id="all-residences" className="container-wide py-20 md:py-28" data-testid="section-all-residences">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#263442]/15 pb-8">
        <div>
          <p className="eyebrow text-[#c56749]">The Portfolio</p>
          <h2 className="mt-2 font-serif text-3xl md:text-5xl text-[#263442]">
            Curated Vacation Homes & Residences
          </h2>
          <p className="mt-2 text-sm text-[#263442]/65 max-w-xl">
            Each home in our collection is handpicked for its architectural beauty, prime Dubai positioning, and thoughtful private luxury.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Emirates Hills'] as const).map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedFilter(loc)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all ${
                selectedFilter === loc
                  ? 'bg-[#263442] text-[#fbf8f2]'
                  : 'border border-[#263442]/20 text-[#263442] hover:bg-[#263442]/10'
              }`}
            >
              {loc === 'All' ? 'All Locations' : loc}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Residences */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((residence) => {
          const isAvail = checkIsAvailable(residence);
          const isSaved = savedIds.includes(residence.id);

          return (
            <article
              key={residence.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#263442]/15 bg-white shadow-sm transition-all hover:shadow-xl"
              data-testid={`card-residence-${residence.id}`}
            >
              {/* Image & Badges */}
              <div>
                <div className="relative aspect-[1.35] w-full overflow-hidden bg-[#e0d9cd]">
                  <img
                    src={residence.images[0].url}
                    alt={residence.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Neighborhood badge */}
                  <span className="absolute bottom-3 left-3 rounded-md bg-[#263442]/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-sm">
                    {residence.neighborhood.toUpperCase()}
                  </span>

                  {/* Availability badge */}
                  <span
                    className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider backdrop-blur-md ${
                      isAvail
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-amber-600/90 text-white'
                    }`}
                  >
                    {isAvail ? 'AVAILABLE' : 'RESERVED ON SELECTED DATES'}
                  </span>

                  {/* Save button */}
                  <button
                    onClick={(e) => toggleSave(residence.id, e)}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#263442] backdrop-blur-sm transition-all hover:scale-110"
                    aria-label="Save to favorites"
                  >
                    <Heart size={15} fill={isSaved ? '#c56749' : 'none'} className={isSaved ? 'text-[#c56749]' : ''} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-[#263442]/60">
                    <span className="font-semibold text-[#c56749] uppercase tracking-wider">{residence.type}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#263442]">
                      <Star size={13} fill="#e8a83e" className="text-[#e8a83e]" />
                      {residence.rating} ({residence.reviewsCount})
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl text-[#263442]">{residence.name}</h3>
                  <p className="mt-1 text-xs text-[#263442]/65 line-clamp-2">{residence.tagline}</p>

                  {/* Specs */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-[#263442]/10 py-3 text-xs text-[#263442]/75">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={14} className="text-[#c56749]" /> {residence.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <UsersRound size={14} className="text-[#c56749]" /> Sleeps {residence.sleeps}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#c56749]" /> {residence.sqft.toLocaleString()} sq ft
                    </span>
                  </div>

                  {/* Amenities highlights */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {residence.amenities.slice(0, 3).map((am) => (
                      <span
                        key={am}
                        className="rounded-full bg-[#fbf8f2] border border-[#263442]/10 px-2.5 py-1 text-[10px] text-[#263442]/75"
                      >
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & CTA */}
              <div className="flex items-center justify-between border-t border-[#263442]/10 bg-[#fbf8f2] p-5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#263442]/55">From</span>
                  <p className="font-serif text-xl font-bold text-[#263442]">
                    {formatPrice(residence.pricePerNightAed)}{' '}
                    <span className="font-sans text-xs font-normal text-[#263442]/60">/ night</span>
                  </p>
                </div>

                <button
                  onClick={() => onSelectResidence(residence)}
                  className="btn-fill flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider"
                  data-testid={`button-book-${residence.id}`}
                >
                  RESERVE <ArrowRight size={14} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
