import { useState } from 'react';
import { Calendar, ChevronDown, MapPin, Search, Users, DollarSign } from 'lucide-react';
import { AED_TO_USD_RATE } from '@/data/residences';

interface SearchProps {
  onSearch: (params: {
    neighborhood: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    currency: 'AED' | 'USD';
  }) => void;
  currency: 'AED' | 'USD';
  setCurrency: (c: 'AED' | 'USD') => void;
}

export function SearchAvailabilityBar({ onSearch, currency, setCurrency }: SearchProps) {
  // Default to upcoming dates
  const today = new Date();
  const defaultCheckIn = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];
  const defaultCheckOut = new Date(today.setDate(today.getDate() + 4)).toISOString().split('T')[0];

  const [neighborhood, setNeighborhood] = useState('All');
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ neighborhood, checkIn, checkOut, guests, currency });
    const target = document.querySelector('#all-residences');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-20 mx-auto -mt-10 max-w-5xl px-4 md:-mt-14" data-testid="search-availability-bar">
      <form
        onSubmit={handleSearch}
        className="rounded-xl border border-[#263442]/15 bg-[#fbf8f2] p-4 shadow-2xl backdrop-blur-md md:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Destination */}
          <div className="flex flex-col justify-center border-b border-[#263442]/15 pb-2 sm:border-b-0 sm:border-r sm:pr-4">
            <span className="eyebrow flex items-center gap-1.5 text-[10px] text-[#c56749]">
              <MapPin size={12} /> Destination
            </span>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="mt-1 bg-transparent text-sm font-semibold text-[#263442] outline-none"
              data-testid="select-destination"
            >
              <option value="All">All Dubai</option>
              <option value="Downtown Dubai">Downtown Dubai</option>
              <option value="Palm Jumeirah">Palm Jumeirah</option>
              <option value="Dubai Marina">Dubai Marina</option>
              <option value="Emirates Hills">Emirates Hills</option>
            </select>
          </div>

          {/* Check-In */}
          <div className="flex flex-col justify-center border-b border-[#263442]/15 pb-2 sm:border-b-0 sm:border-r sm:pr-4">
            <span className="eyebrow flex items-center gap-1.5 text-[10px] text-[#c56749]">
              <Calendar size={12} /> Check-In
            </span>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  const nextDay = new Date(e.target.value);
                  nextDay.setDate(nextDay.getDate() + 2);
                  setCheckOut(nextDay.toISOString().split('T')[0]);
                }
              }}
              className="mt-1 bg-transparent text-sm font-semibold text-[#263442] outline-none"
              data-testid="input-check-in"
            />
          </div>

          {/* Check-Out */}
          <div className="flex flex-col justify-center border-b border-[#263442]/15 pb-2 lg:border-r lg:pr-4">
            <span className="eyebrow flex items-center gap-1.5 text-[10px] text-[#c56749]">
              <Calendar size={12} /> Check-Out
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="mt-1 bg-transparent text-sm font-semibold text-[#263442] outline-none"
              data-testid="input-check-out"
            />
          </div>

          {/* Guests & Currency */}
          <div className="flex flex-col justify-center border-b border-[#263442]/15 pb-2 sm:border-b-0 sm:border-r sm:pr-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow flex items-center gap-1 text-[10px] text-[#c56749]">
                <Users size={12} /> Guests
              </span>
              <button
                type="button"
                onClick={() => setCurrency(currency === 'AED' ? 'USD' : 'AED')}
                className="rounded border border-[#263442]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#263442] hover:bg-[#263442]/10"
                title="Toggle currency AED / USD"
              >
                {currency}
              </button>
            </div>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-1 bg-transparent text-sm font-semibold text-[#263442] outline-none"
              data-testid="select-guests"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-center">
            <button
              type="submit"
              className="btn-fill flex w-full items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-wider text-[#fbf8f2]"
              data-testid="button-search-availability"
            >
              <Search size={15} /> CHECK DATES
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
