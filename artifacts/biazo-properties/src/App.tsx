import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Contact from '@/pages/contact';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight,
  ArrowRight,
  BedDouble,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Heart,
  KeyRound,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  Eye,
  EyeOff,
  CalendarSearch,
} from 'lucide-react';
import heroImage from '@assets/generated_images/biazo-hero.jpg';
import livingImage from '@assets/generated_images/biazo-featured-living.jpg';
import bedroomImage from '@assets/generated_images/biazo-featured-bedroom.jpg';
import poolImage from '@assets/generated_images/biazo-pool.jpg';
import terraceImage from '@assets/generated_images/biazo-terrace.jpg';
import beachImage from '@assets/generated_images/biazo-beach.jpg';
import downtownImage from '@assets/generated_images/biazo-downtown.jpg';
import futureCityImage from '@assets/generated_images/biazo-future-city.jpg';
import golfImage from '@assets/generated_images/biazo-golf.jpg';
import partnersImage from '@assets/generated_images/biazo-partners.jpg';

import { residences, type Residence, type BookingRecord } from '@/data/residences';
import { SearchAvailabilityBar } from '@/components/SearchAvailabilityBar';
import { ResidenceListings } from '@/components/ResidenceListings';
import { BookingModal } from '@/components/BookingModal';
import { ReservationLookupModal } from '@/components/ReservationLookupModal';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Residences', href: '#all-residences' },
  { label: 'The Biazo way', href: '#biazo-way' },
  { label: 'Dubai, considered', href: '#neighborhoods' },
  { label: 'Why Biazo', href: '#why-biazo' },
];

const neighborhoodItems = [
  { name: 'Jumeirah Beach', note: 'Salt air, soft mornings', image: beachImage },
  { name: 'Downtown Dubai', note: 'The city at its brightest', image: downtownImage },
  { name: 'The Future District', note: 'A new rhythm of city life', image: futureCityImage },
  { name: 'Emirates Hills', note: 'Green space, quiet time', image: golfImage },
];

const benefits = [
  { icon: KeyRound, title: 'Arrive as you are', copy: 'Private keyless access, considered details and a welcome that feels like it was made for you.' },
  { icon: ShieldCheck, title: 'A steady hand', copy: 'One local team, available around the clock, from your first reservation to the last key.' },
  { icon: Sparkles, title: 'The finer things', copy: 'Thoughtful extras that make a stay memorable: a table booked, a fridge prepared, a city decoded.' },
];

function useMeta() {
  useEffect(() => {
    document.title = 'Biazo Vacation Homes | Residences, thoughtfully lived';
    const description = 'Biazo Vacation Homes brings the privacy of a beautiful Dubai residence together with the certainty of exceptional, local service.';
    const upsert = (selector: string, attribute: string, value: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    upsert('meta[name="description"]', 'name', 'description', description);
    upsert('meta[property="og:title"]', 'property', 'og:title', 'Biazo Vacation Homes | Residences, thoughtfully lived');
    upsert('meta[property="og:description"]', 'property', 'og:description', description);
    upsert('meta[property="og:type"]', 'property', 'og:type', 'website');
  }, []);
}

function Header({ onJoin, onMyReservation }: { onJoin: () => void; onMyReservation: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <header className={`nav-shell fixed left-0 right-0 top-0 z-40 text-[#fbf8f2] ${scrolled ? 'scrolled' : ''}`} data-testid="header-main">
      <div className="container-wide flex h-[76px] items-center justify-between">
        <button onClick={() => go('#top')} className="flex items-center gap-3 text-left" data-testid="button-brand-home">
          <span className="flex h-9 w-9 items-center justify-center border border-current font-serif text-xl italic">B</span>
          <span className="text-[13px] font-semibold tracking-[.18em]">Biazo <span className="font-normal opacity-70">Vacation Homes</span></span>
        </button>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => <button key={item.href} onClick={() => go(item.href)} className="nav-link" data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</button>)}
           <Link href="/contact" className="nav-link" data-testid="link-nav-contact">Contact</Link>
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <button onClick={onMyReservation} className="flex items-center gap-2 text-[12px] font-medium" data-testid="button-my-reservation">
            <CalendarSearch size={16} strokeWidth={1.5} /> My Reservation
          </button>
          <button onClick={onJoin} className="flex items-center gap-2 text-[12px]" data-testid="button-member-access"><CircleUserRound size={16} strokeWidth={1.5} /> Member access</button>
          <button onClick={() => go('#all-residences')} className="btn-fill px-5 py-3 text-[11px] font-semibold tracking-[.1em]" data-testid="button-find-residence">BOOK NOW</button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" data-testid="button-mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div className="mobile-panel border-t border-[#263442]/10 px-4 pb-6 pt-5 lg:hidden">
        <div className="flex flex-col gap-5">
          {navItems.map((item) => <button key={item.href} onClick={() => go(item.href)} className="border-b border-[#263442]/10 pb-3 text-left text-sm" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</button>)}
           <Link href="/contact" onClick={() => setOpen(false)} className="border-b border-[#263442]/10 pb-3 text-left text-sm" data-testid="link-mobile-contact">Contact</Link>
          <button onClick={() => { setOpen(false); onMyReservation(); }} className="border-b border-[#263442]/10 pb-3 text-left text-sm">My Reservation</button>
          <button onClick={() => { setOpen(false); onJoin(); }} className="btn-fill px-4 py-3 text-left text-[11px] font-semibold tracking-[.1em]" data-testid="button-mobile-member">MEMBER ACCESS</button>
        </div>
      </div>}
    </header>
  );
}

function Neighborhoods() {
  return (
    <section id="neighborhoods" className="bg-[#e7dfd3] py-24 md:py-32" data-testid="section-neighborhoods">
      <div className="container-wide">
        <div className="grid gap-8 md:grid-cols-[.75fr_1.25fr] md:items-end"><div><p className="eyebrow text-[#c56749]">Know your Dubai</p><h2 className="mt-3 font-serif text-4xl leading-none text-[#263442] md:text-6xl">Find your<br /><i>right side</i> of town.</h2></div><div className="flex items-end justify-between gap-8"><p className="max-w-sm text-sm leading-6 text-[#263442]/65">Dubai is not one destination. It is a collection of distinct moods, each with its own pace, light and local rituals.</p></div></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{neighborhoodItems.map((item, index) => <article key={item.name} className={`group ${index % 2 === 1 ? 'lg:mt-12' : ''}`} data-testid={`card-neighborhood-${index}`}><div className="image-wrap relative aspect-[.78]"><img src={item.image} alt={item.name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#202d3b]/75 via-transparent to-transparent opacity-80" /><div className="absolute bottom-5 left-5 right-4 text-[#fbf8f2]"><p className="font-serif text-2xl">{item.name}</p><p className="mt-1 text-xs text-[#fbf8f2]/72">{item.note}</p></div><span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-[#fbf8f2]/90 text-[#263442] opacity-0 transition-opacity group-hover:opacity-100"><ArrowDownRight size={16} className="-rotate-90" /></span></div></article>)}</div>
      </div>
    </section>
  );
}

function Benefits() {
  return <section id="biazo-way" className="bg-[#263442] py-24 text-[#fbf8f2] md:py-28" data-testid="section-biazo-way"><div className="container-wide"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-[#dbcdbb]">The Biazo way</p><h2 className="mt-4 max-w-sm font-serif text-4xl leading-[.98] md:text-6xl">The comfort<br />of <i>knowing.</i></h2></div><div><p className="max-w-lg text-base leading-7 text-[#fbf8f2]/68">A residence should give you more than space. It should give you a sense of place, and the confidence that every detail has been quietly considered.</p><div className="mt-12 grid gap-9 border-t border-[#fbf8f2]/20 pt-8 md:grid-cols-3">{benefits.map(({ icon: Icon, title, copy }, index) => <div key={title} data-testid={`card-benefit-${index}`}><Icon size={23} strokeWidth={1.2} className="text-[#d88562]" /><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#fbf8f2]/58">{copy}</p></div>)}</div></div></div></div></section>;
}

function WhyBiazo() {
  const perks = [
    { icon: BedDouble, title: 'Handpicked homes', desc: 'Every residence is personally inspected and styled for comfort, space and natural light.' },
    { icon: KeyRound, title: 'Keyless check-in', desc: 'Arrive on your schedule with a private smart-lock PIN — no waiting, no lobby, no hassle.' },
    { icon: Heart, title: 'Concierge on call', desc: 'Restaurant bookings, airport transfers, grocery delivery — our local team handles the details so you don\'t have to.' },
    { icon: ShieldCheck, title: 'Transparent pricing', desc: 'The price you see is the price you pay. No hidden fees, no surprises at checkout.' },
  ];
  return (
    <section id="why-biazo" className="container-wide py-24 md:py-36" data-testid="section-why-biazo">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="image-wrap aspect-[1.08]">
          <img src={partnersImage} alt="Guest arriving at a Biazo Vacation Homes residence in Dubai" className="h-full w-full object-cover" data-testid="img-why-biazo" />
        </div>
        <div className="lg:pl-14">
          <p className="eyebrow text-[#c56749]">Why stay with us</p>
          <h2 className="mt-4 max-w-lg font-serif text-4xl leading-[.98] text-[#263442] md:text-6xl">Your vacation,<br /><i>in careful hands.</i></h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-[#263442]/68">Biazo Vacation Homes offers a curated collection of Dubai residences with the privacy of home and the service of a five-star hotel — so every stay feels effortless.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <Icon size={22} strokeWidth={1.3} className="mt-1 shrink-0 text-[#c56749]" />
                <div>
                  <h3 className="text-sm font-semibold text-[#263442]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#263442]/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function MemberModal({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  return <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="member-title" data-testid="modal-member"><div className="relative w-full max-w-md bg-[#fbf8f2] p-7 md:p-10"><button onClick={onClose} className="absolute right-5 top-5 text-[#263442]/60 hover:text-[#263442]" aria-label="Close member access" data-testid="button-close-member-modal"><X size={20} /></button>{submitted ? <div className="py-10 text-center"><Check size={28} className="mx-auto text-[#c56749]" /><h2 className="mt-5 font-serif text-3xl text-[#263442]">Welcome to Biazo.</h2><p className="mt-3 text-sm leading-6 text-[#263442]/65">Your member profile is ready. We'll send the latest residences and considered city notes to {email}.</p><button onClick={onClose} className="btn-fill mt-7 px-5 py-3 text-[11px] font-semibold tracking-[.1em]" data-testid="button-close-member-success">CONTINUE</button></div> : <><p className="eyebrow text-[#c56749]">Private access</p><h2 id="member-title" className="mt-3 font-serif text-4xl text-[#263442]">Make Dubai yours.</h2><p className="mt-3 text-sm leading-6 text-[#263442]/65">Save residences, keep your preferences close and hear about new Biazo vacation homes first.</p><form onSubmit={submit} className="mt-8 space-y-5"><label className="block"><span className="field-label">Email address</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field-input" placeholder="you@example.com" data-testid="input-member-email" /></label><label className="block"><span className="field-label">Password</span><div className="relative"><input required minLength={6} type={showPassword ? 'text' : 'password'} className="field-input pr-10" placeholder="At least 6 characters" data-testid="input-member-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-2 text-[#263442]/55" aria-label={showPassword ? 'Hide password' : 'Show password'} data-testid="button-toggle-password">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label><button className="btn-fill w-full py-4 text-[11px] font-semibold tracking-[.1em]" type="submit" data-testid="button-submit-member">CREATE MEMBER PROFILE</button></form><p className="mt-5 text-center text-xs text-[#263442]/45">Already a member? Sign in with your email.</p></>}</div></div>;
}

function Home() {
  useMeta();
  const [memberOpen, setMemberOpen] = useState(false);
  const [reservationLookupOpen, setReservationLookupOpen] = useState(false);
  const [bookingResidence, setBookingResidence] = useState<Residence | null>(null);
  const [searchDates, setSearchDates] = useState<{ checkIn: string; checkOut: string } | undefined>();
  const [searchGuests, setSearchGuests] = useState(2);
  const [currency, setCurrency] = useState<'AED' | 'USD'>('AED');
  const [toast, setToast] = useState('');


  const handleSearch = (params: { neighborhood: string; checkIn: string; checkOut: string; guests: number; currency: 'AED' | 'USD' }) => {
    setSearchDates({ checkIn: params.checkIn, checkOut: params.checkOut });
    setSearchGuests(params.guests);
    setCurrency(params.currency);
  };

  const handleBookingSuccess = (booking: BookingRecord) => {
    setToast(`Reservation ${booking.id} confirmed! Check your confirmation screen.`);
    window.setTimeout(() => setToast(''), 6000);
  };

  return (
    <div id="top" className="site-shell min-h-[100dvh]">
      <Header onJoin={() => setMemberOpen(true)} onMyReservation={() => setReservationLookupOpen(true)} />
      <main>
        {/* HERO SECTION */}
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#263442] text-[#fbf8f2] md:min-h-[820px]" data-testid="section-hero">
          <img src={heroImage} alt="Warm Dubai penthouse overlooking the skyline" className="hero-image absolute inset-0 h-full w-full object-cover opacity-80" data-testid="img-hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#202d3b]/75 via-[#202d3b]/20 to-[#202d3b]/15" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#202d3b]/65 to-transparent" />
          <div className="container-wide relative z-10 pb-36 pt-40 md:pb-44">
            <div className="max-w-3xl">
              <p className="eyebrow rise text-[#dbcdbb]">Dubai, thoughtfully lived</p>
              <h1 className="display rise rise-delay-1 mt-6 text-[clamp(4.1rem,10vw,9.4rem)]">Stay somewhere<br /><i>with a point of view.</i></h1>
              <p className="rise rise-delay-2 mt-7 max-w-md text-base leading-7 text-[#fbf8f2]/78 md:text-lg">The privacy of a beautiful residence, the ease of exceptional service, and a city that is yours to discover.</p>
              <div className="rise rise-delay-3 mt-8 flex flex-wrap items-center gap-5">
                <button onClick={() => document.querySelector('#all-residences')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 border-b border-[#fbf8f2]/70 pb-3 text-[11px] font-semibold tracking-[.12em]" data-testid="button-hero-explore">EXPLORE RESIDENCES <ArrowDownRight size={16} /></button>
                <button onClick={() => setReservationLookupOpen(true)} className="flex items-center gap-3 border-b border-[#fbf8f2]/40 pb-3 text-[11px] tracking-[.12em] text-[#fbf8f2]/75" data-testid="button-hero-my-reservation"><Search size={14} /> FIND MY RESERVATION</button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 text-[#fbf8f2]/65 md:flex"><span className="h-px w-16 bg-[#fbf8f2]/50" /><span className="font-mono text-[10px] tracking-[.12em]">25° 11′ N / 55° 16′ E</span></div>
        </section>

        {/* SEARCH BAR — overlaps hero */}
        <SearchAvailabilityBar
          onSearch={handleSearch}
          currency={currency}
          setCurrency={setCurrency}
        />

        {/* FULL RESIDENCE LISTINGS */}
        <ResidenceListings
          residences={residences}
          selectedDates={searchDates}
          currency={currency}
          onSelectResidence={(r) => setBookingResidence(r)}
        />

        <Neighborhoods />
        <Benefits />
        <WhyBiazo />

        {/* JOIN MEMBERS CTA */}
        <section className="bg-[#c56749] py-20 text-[#fbf8f2] md:py-28" data-testid="section-member-cta"><div className="container-wide flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="eyebrow text-[#fbf8f2]/70">A little closer</p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-none md:text-6xl">The best of Dubai,<br /><i>kept in your pocket.</i></h2></div><button onClick={() => setMemberOpen(true)} className="flex w-fit items-center gap-3 border-b border-[#fbf8f2]/65 pb-3 text-[11px] font-semibold tracking-[.12em]" data-testid="button-join-members">JOIN BIAZO MEMBERS <ArrowRight size={16} /></button></div></section>
      </main>

      <Footer onJoin={() => setMemberOpen(true)} />

      {/* MODALS */}
      {memberOpen && <MemberModal onClose={() => setMemberOpen(false)} />}

      {reservationLookupOpen && (
        <ReservationLookupModal onClose={() => setReservationLookupOpen(false)} />
      )}

      {bookingResidence && (
        <BookingModal
          residence={bookingResidence}
          initialCheckIn={searchDates?.checkIn}
          initialCheckOut={searchDates?.checkOut}
          initialGuests={searchGuests}
          currency={currency}
          onClose={() => setBookingResidence(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 max-w-sm text-center rounded-lg bg-[#263442] px-6 py-3 text-sm text-[#fbf8f2] shadow-xl" role="status" data-testid="status-toast">
          {toast}
        </div>
      )}
    </div>
  );
}

function Footer({ onJoin }: { onJoin: () => void }) {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  return <footer className="bg-[#202d3b] py-14 text-[#fbf8f2]" data-testid="footer-main"><div className="container-wide"><div className="grid gap-12 border-b border-[#fbf8f2]/15 pb-12 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#fbf8f2] font-serif text-xl italic">B</span><span className="text-[13px] font-semibold tracking-[.18em]">Biazo <span className="font-normal opacity-65">Vacation Homes</span></span></div><p className="mt-7 max-w-xs text-sm leading-6 text-[#fbf8f2]/55">Private residences and local perspective, for the way you want to experience Dubai.</p></div><div><p className="eyebrow text-[#dbcdbb]">Explore</p><div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#fbf8f2]/68"><button onClick={() => go('#all-residences')} data-testid="link-footer-residences">Residences</button><button onClick={() => go('#biazo-way')} data-testid="link-footer-biazo-way">The Biazo way</button></div></div><div><p className="eyebrow text-[#dbcdbb]">Stay close</p><div className="mt-5 flex flex-col items-start gap-3 text-sm text-[#fbf8f2]/68"><button onClick={() => go('#why-biazo')} data-testid="link-footer-why-biazo">Why stay with us</button><Link href="/contact" className="text-left" data-testid="link-footer-contact">Contact us</Link></div></div></div><div className="flex flex-col justify-between gap-5 pt-7 text-[10px] tracking-[.08em] text-[#fbf8f2]/42 md:flex-row"><span>© 2025 Biazo Vacation Homes. Dubai, UAE.</span><span>Privacy · Terms · Carefully considered, locally managed.</span></div></div></footer>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;