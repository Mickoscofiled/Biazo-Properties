import { useEffect, useState, type FormEvent } from 'react';
import {
  BedDouble, Bell, Calendar, Check, ChevronDown, ChevronUp,
  Eye, EyeOff, KeyRound, Link2, LogOut, Pencil, Plus, RefreshCw,
  Save, Shield, Sparkles, Star, Trash2, X, ArrowLeft, Users,
  CheckCircle2, XCircle, Clock,
} from 'lucide-react';
import { Link } from 'wouter';
import { residences as hardcodedResidences } from '../data/residences';

/* ── Types ─────────────────────────────────────────────────────────────────── */
interface BookedRange { start: string; end: string; bookingId?: string; icalSynced?: boolean; icalSource?: string; }
interface Residence {
  id: string; name: string; tagline: string; neighborhood: string;
  address: string; type: string; bedrooms: number; bathrooms: number;
  sleeps: number; sqft: number; pricePerNightAed: number; cleaningFeeAed: number;
  rating: number; reviewsCount: number; description: string;
  images: { url: string; caption: string }[];
  amenities: string[]; bookedRanges: BookedRange[];
}
interface Booking {
  id: string; residenceId: string; residenceName: string;
  guestName: string; guestEmail: string; guestPhone: string;
  checkIn: string; checkOut: string; nights: number; guests: number;
  totalAed: number; currency: string; specialRequests?: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  createdAt: string; updatedAt?: string; updatedBy?: string;
}
interface IcalFeed { url: string; label?: string; lastSynced?: string; }

/* ── API helpers ───────────────────────────────────────────────────────────── */
const getToken = () => localStorage.getItem('bvh_admin_token') ?? '';
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' });

async function apiGet(path: string) {
  const r = await fetch(path, { headers: authHeaders() });
  return r.json();
}
async function apiPost(path: string, body: unknown) {
  const r = await fetch(path, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
  return r.json();
}
async function apiPut(path: string, body: unknown) {
  const r = await fetch(path, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
  return r.json();
}
async function apiPatch(path: string, body: unknown) {
  const r = await fetch(path, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(body) });
  return r.json();
}
async function apiDelete(path: string, body: unknown) {
  const r = await fetch(path, { method: 'DELETE', headers: authHeaders(), body: JSON.stringify(body) });
  return r.json();
}

/* ── Login Screen ──────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (token: string, name: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json() as any;
      if (data.ok && data.token) {
        localStorage.setItem('bvh_admin_token', data.token);
        onLogin(data.token, data.ownerName);
      } else {
        setError(data.error ?? 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0ece5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center border-2 border-[#263442] font-serif text-3xl italic text-[#263442]">B</span>
          <h1 className="mt-4 font-serif text-3xl text-[#263442]">Owner Admin</h1>
          <p className="mt-1 text-sm text-[#263442]/60">Biazo Vacation Homes — Secure Management Portal</p>
        </div>
        <form onSubmit={submit} className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="space-y-5">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#263442]/55">Username</span>
              <input required value={username} onChange={e => setUsername(e.target.value)}
                placeholder="owner1 or owner2"
                className="mt-2 w-full border-b-2 border-[#263442]/20 bg-transparent pb-2 text-sm font-medium text-[#263442] outline-none focus:border-[#c56749]"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#263442]/55">Password</span>
              <div className="relative mt-2">
                <input required value={password} onChange={e => setPassword(e.target.value)}
                  type={showPw ? 'text' : 'password'} placeholder="Enter your password"
                  className="w-full border-b-2 border-[#263442]/20 bg-transparent pb-2 pr-8 text-sm font-medium text-[#263442] outline-none focus:border-[#c56749]"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-0 text-[#263442]/40 hover:text-[#263442]">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>
          </div>
          {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading}
            className="mt-7 w-full rounded-lg bg-[#263442] py-3.5 text-sm font-semibold tracking-widest text-white transition-all hover:bg-[#1a2530] disabled:opacity-60"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN TO ADMIN'}
          </button>
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#f0ece5] px-4 py-3">
            <Shield size={14} className="text-[#c56749]" />
            <p className="text-[11px] text-[#263442]/60">Secure admin access. You will remain signed in until you log out.</p>
          </div>
        </form>
        <Link href="/" className="mt-5 flex items-center justify-center gap-2 text-sm text-[#263442]/50 hover:text-[#263442]">
          <ArrowLeft size={14} /> Back to website
        </Link>
      </div>
    </div>
  );
}

/* ── Edit Modal ────────────────────────────────────────────────────────────── */
function EditModal({ residence, onSave, onClose, icalFeeds, onAddFeed, onRemoveFeed }: {
  residence: Residence;
  onSave: (updated: Residence) => void;
  onClose: () => void;
  icalFeeds: IcalFeed[];
  onAddFeed: (url: string, label: string) => void;
  onRemoveFeed: (url: string) => void;
}) {
  const [r, setR] = useState<Residence>({ ...residence, bookedRanges: [...residence.bookedRanges] });
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');
  const [newIcalUrl, setNewIcalUrl] = useState('');
  const [newIcalLabel, setNewIcalLabel] = useState('');
  const [tab, setTab] = useState<'pricing' | 'dates' | 'ical'>('pricing');

  const today = new Date().toISOString().split('T')[0];

  const addRange = () => {
    if (!newStart || !newEnd || newStart >= newEnd) return;
    setR(prev => ({ ...prev, bookedRanges: [...prev.bookedRanges, { start: newStart, end: newEnd }] }));
    setNewStart(''); setNewEnd('');
  };
  const removeRange = (i: number) =>
    setR(prev => ({ ...prev, bookedRanges: prev.bookedRanges.filter((_, idx) => idx !== i) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-[#263442]/40 hover:bg-[#f0ece5] hover:text-[#263442]">
          <X size={20} />
        </button>

        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#c56749]">{r.neighborhood}</p>
          <h2 className="mt-1 font-serif text-2xl text-[#263442]">{r.name}</h2>
        </div>

        {/* Sub-tabs */}
        <div className="mb-6 flex gap-1 rounded-xl bg-[#f0ece5] p-1">
          {([['pricing', 'Pricing'], ['dates', 'Blocked Dates'], ['ical', 'iCal Sync']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${tab === t ? 'bg-white text-[#263442] shadow-sm' : 'text-[#263442]/50 hover:text-[#263442]'}`}
            >{label}</button>
          ))}
        </div>

        {tab === 'pricing' && (
          <div className="space-y-6">
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#263442]">
                <Sparkles size={14} className="text-[#c56749]" /> Pricing
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] text-[#263442]/55">Price per Night (AED)</span>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-[#263442]/15 px-3 py-2">
                    <span className="text-xs text-[#263442]/50">AED</span>
                    <input type="number" min={100} step={50} value={r.pricePerNightAed}
                      onChange={e => setR(prev => ({ ...prev, pricePerNightAed: Number(e.target.value) }))}
                      className="w-full bg-transparent text-sm font-semibold text-[#263442] outline-none"
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-[#263442]/40">≈ USD {Math.round(r.pricePerNightAed / 3.6725).toLocaleString()}/night</p>
                </label>
                <label className="block">
                  <span className="text-[11px] text-[#263442]/55">Cleaning Fee (AED)</span>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-[#263442]/15 px-3 py-2">
                    <span className="text-xs text-[#263442]/50">AED</span>
                    <input type="number" min={0} step={50} value={r.cleaningFeeAed}
                      onChange={e => setR(prev => ({ ...prev, cleaningFeeAed: Number(e.target.value) }))}
                      className="w-full bg-transparent text-sm font-semibold text-[#263442] outline-none"
                    />
                  </div>
                </label>
              </div>
            </section>
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#263442]">
                <KeyRound size={14} className="text-[#c56749]" /> Quick Availability
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => {
                    const end = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                    setR(prev => ({ ...prev, bookedRanges: [{ start: today, end }] }));
                  }}
                  className="rounded-lg border-2 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 hover:bg-amber-100"
                >🔴 Mark as Unavailable (All Year)</button>
                <button
                  onClick={() => setR(prev => ({ ...prev, bookedRanges: [] }))}
                  className="rounded-lg border-2 border-emerald-400 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
                >🟢 Mark as Fully Available</button>
              </div>
            </section>
          </div>
        )}

        {tab === 'dates' && (
          <div className="space-y-4">
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#263442]">
                <Calendar size={14} className="text-[#c56749]" /> Blocked / Booked Dates
              </h3>
              {r.bookedRanges.length === 0 && (
                <p className="mb-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">✓ No dates blocked — residence is fully available</p>
              )}
              <div className="space-y-2">
                {r.bookedRanges.map((range, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm ${range.icalSynced ? 'bg-blue-50' : 'bg-amber-50'}`}>
                    <div>
                      <span className={`font-medium ${range.icalSynced ? 'text-blue-900' : 'text-amber-900'}`}>
                        {range.start} → {range.end}
                      </span>
                      {range.icalSynced && <span className="ml-2 text-[10px] text-blue-600">📅 {range.icalSource ?? 'iCal'}</span>}
                      {range.bookingId && <span className="ml-2 text-[10px] text-amber-600">🔑 {range.bookingId}</span>}
                    </div>
                    {!range.icalSynced && (
                      <button onClick={() => removeRange(i)} className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-dashed border-[#263442]/20 p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#263442]/50">Block New Dates</p>
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <label className="block">
                    <span className="text-[10px] text-[#263442]/50">Check-In Date</span>
                    <input type="date" value={newStart} min={today} onChange={e => setNewStart(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#263442]/15 px-3 py-2 text-sm text-[#263442] outline-none focus:border-[#c56749]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] text-[#263442]/50">Check-Out Date</span>
                    <input type="date" value={newEnd} min={newStart || today} onChange={e => setNewEnd(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#263442]/15 px-3 py-2 text-sm text-[#263442] outline-none focus:border-[#c56749]"
                    />
                  </label>
                  <button onClick={addRange} disabled={!newStart || !newEnd || newStart >= newEnd}
                    className="mt-5 flex items-center gap-1.5 rounded-lg bg-[#263442] px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
                  ><Plus size={14} /> Add</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {tab === 'ical' && (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
              <p className="font-semibold">📅 Sync from Airbnb / Booking.com</p>
              <p className="mt-1 text-xs text-blue-700">Paste your iCal URL from Airbnb or Booking.com. The calendar syncs automatically every 6 hours.</p>
            </div>
            {icalFeeds.map(feed => (
              <div key={feed.url} className="flex items-center justify-between rounded-lg border border-[#263442]/10 bg-[#f9f7f4] p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#263442] truncate">{feed.label ?? 'External calendar'}</p>
                  <p className="text-[11px] text-[#263442]/50 truncate">{feed.url}</p>
                  {feed.lastSynced && <p className="text-[10px] text-emerald-600">Last synced: {new Date(feed.lastSynced).toLocaleString()}</p>}
                </div>
                <button onClick={() => onRemoveFeed(feed.url)} className="ml-3 flex-shrink-0 text-red-400 hover:text-red-600">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {icalFeeds.length === 0 && (
              <p className="text-sm text-[#263442]/50 text-center py-4">No iCal feeds added yet</p>
            )}
            <div className="rounded-xl border border-dashed border-[#263442]/20 p-4 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#263442]/50">Add New iCal Feed</p>
              <input value={newIcalLabel} onChange={e => setNewIcalLabel(e.target.value)}
                placeholder="Label (e.g. Airbnb)"
                className="w-full rounded-lg border border-[#263442]/15 px-3 py-2 text-sm text-[#263442] outline-none focus:border-[#c56749]"
              />
              <input value={newIcalUrl} onChange={e => setNewIcalUrl(e.target.value)}
                placeholder="https://www.airbnb.com/calendar/ical/..."
                className="w-full rounded-lg border border-[#263442]/15 px-3 py-2 text-sm text-[#263442] outline-none focus:border-[#c56749]"
              />
              <button
                onClick={() => { if (newIcalUrl) { onAddFeed(newIcalUrl, newIcalLabel); setNewIcalUrl(''); setNewIcalLabel(''); } }}
                disabled={!newIcalUrl}
                className="flex items-center gap-1.5 rounded-lg bg-[#263442] px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
              ><Link2 size={13} /> Add Feed</button>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-lg border border-[#263442]/20 py-3 text-sm font-semibold text-[#263442] hover:bg-[#f0ece5]">
            Cancel
          </button>
          <button
            onClick={() => onSave(r)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#c56749] py-3 text-sm font-semibold text-white hover:bg-[#b05840]"
          >
            <Save size={15} /> Save Changes → Go Live
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Booking Status Badge ───────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: Booking['status'] }) {
  const map = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-600',
  };
  const icons = {
    pending: <Clock size={11} />,
    confirmed: <CheckCircle2 size={11} />,
    rejected: <XCircle size={11} />,
    cancelled: <XCircle size={11} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${map[status]}`}>
      {icons[status]} {status}
    </span>
  );
}

/* ── Bookings Panel ─────────────────────────────────────────────────────────── */
function BookingsPanel({ showToast }: { showToast: (msg: string) => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet('/api/bookings');
      if (Array.isArray(data)) setBookings(data);
    } catch { /* empty */ }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (bookingId: string, action: 'approve' | 'reject' | 'cancel') => {
    setActioning(bookingId);
    const res = await apiPatch('/api/bookings', { bookingId, action });
    if (res.ok) {
      setBookings(prev => prev.map(b => b.id === bookingId ? res.booking : b));
      showToast(action === 'approve' ? `✅ Booking confirmed! Email sent to guest.` : `❌ Booking ${action}d. Dates are now open.`);
    } else {
      showToast(`Error: ${res.error}`);
    }
    setActioning(null);
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-2xl text-[#263442]">Booking Requests</h2>
          {pendingCount > 0 && (
            <span className="rounded-full bg-[#c56749] px-2.5 py-0.5 text-xs font-bold text-white">{pendingCount} pending</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-lg bg-[#f0ece5] p-1">
            {(['all', 'pending', 'confirmed', 'rejected'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-[11px] font-semibold capitalize transition-all ${filter === f ? 'bg-white text-[#263442] shadow-sm' : 'text-[#263442]/50 hover:text-[#263442]'}`}
              >{f}</button>
            ))}
          </div>
          <button onClick={load} className="flex items-center gap-1.5 rounded-lg border border-[#263442]/15 px-3 py-2 text-xs font-semibold text-[#263442] hover:bg-white">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="animate-pulse text-sm text-[#263442]/50">Loading bookings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#263442]/15 py-16 text-center">
          <Users size={32} className="text-[#263442]/20" />
          <p className="mt-3 text-sm text-[#263442]/50">{filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(b => (
            <div key={b.id} className={`rounded-2xl border bg-white p-5 shadow-sm ${b.status === 'pending' ? 'border-amber-300' : 'border-[#263442]/10'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-sm font-bold text-[#c56749]">{b.id}</p>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="mt-1 font-serif text-lg text-[#263442]">{b.residenceName}</p>
                </div>
                <p className="text-xs text-[#263442]/40">{new Date(b.createdAt).toLocaleString()}</p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#263442]/50">Guest</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#263442]">{b.guestName}</p>
                  <p className="text-xs text-[#263442]/60">{b.guestEmail}</p>
                  <p className="text-xs text-[#263442]/60">{b.guestPhone}</p>
                </div>
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#263442]/50">Dates</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#263442]">{b.checkIn} → {b.checkOut}</p>
                  <p className="text-xs text-[#263442]/60">{b.nights} nights · {b.guests} guests</p>
                </div>
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#263442]/50">Total</p>
                  <p className="mt-0.5 text-sm font-bold text-[#263442]">AED {b.totalAed.toLocaleString()}</p>
                  <p className="text-xs text-[#263442]/60 capitalize">{b.paymentMethod}</p>
                </div>
                <div className="rounded-lg bg-[#f9f7f4] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-[#263442]/50">Special Requests</p>
                  <p className="mt-0.5 text-xs text-[#263442]/70">{b.specialRequests || '—'}</p>
                </div>
              </div>

              {b.status === 'pending' && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAction(b.id, 'approve')}
                    disabled={actioning === b.id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <CheckCircle2 size={14} /> {actioning === b.id ? 'Processing...' : 'APPROVE & CONFIRM'}
                  </button>
                  <button
                    onClick={() => handleAction(b.id, 'reject')}
                    disabled={actioning === b.id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-red-300 py-2.5 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    <XCircle size={14} /> REJECT & RELEASE DATES
                  </button>
                </div>
              )}
              {b.status === 'confirmed' && b.updatedBy && (
                <p className="mt-3 text-[11px] text-emerald-600">✓ Confirmed by {b.updatedBy} on {new Date(b.updatedAt!).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Admin Dashboard ──────────────────────────────────────────────────── */
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [residences, setResidences] = useState<Residence[]>([]);
  const [editTarget, setEditTarget] = useState<Residence | null>(null);
  const [icalFeeds, setIcalFeeds] = useState<IcalFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<'residences' | 'bookings'>('residences');

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('bvh_admin_token');
      if (!token) { setCheckingAuth(false); setLoading(false); return; }
      const res = await apiGet('/api/auth/me');
      if (res.authenticated) { setAuthed(true); setOwnerName(res.ownerName); }
      setCheckingAuth(false);
    })();
  }, []);

  useEffect(() => {
    if (!authed) { setLoading(false); return; }
    (async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/residences');
        setResidences(Array.isArray(data) && data.length > 0 ? data : hardcodedResidences);
      } catch { setResidences(hardcodedResidences); }
      setLoading(false);
    })();
  }, [authed]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 4500); };

  const handleLogin = (token: string, name: string) => { setAuthed(true); setOwnerName(name); };

  const handleLogout = async () => {
    await apiPost('/api/auth/logout', {});
    localStorage.removeItem('bvh_admin_token');
    setAuthed(false); setOwnerName(''); setResidences([]);
  };

  const handleSave = async (updated: Residence) => {
    setSaving(true);
    const newList = residences.map(r => r.id === updated.id ? updated : r);
    const res = await apiPut('/api/residences', newList);
    if (res.ok) { setResidences(newList); setEditTarget(null); showToast(`✅ ${updated.name} updated and live!`); }
    else showToast(`❌ Error: ${res.error ?? 'Save failed.'}`);
    setSaving(false);
  };

  const handleAddIcalFeed = async (url: string, label: string) => {
    if (!editTarget) return;
    const res = await apiPost('/api/ical', { residenceId: editTarget.id, url, label });
    if (res.ok) {
      setIcalFeeds(prev => [...prev, { url, label }]);
      showToast('✅ iCal feed added! Will sync within 6 hours.');
    }
  };

  const handleRemoveIcalFeed = async (url: string) => {
    if (!editTarget) return;
    await apiDelete('/api/ical', { residenceId: editTarget.id, url });
    setIcalFeeds(prev => prev.filter(f => f.url !== url));
    showToast('iCal feed removed.');
  };

  const openEdit = async (r: Residence) => {
    setEditTarget(r);
    // Load iCal feeds for this residence
    try {
      const data = await apiGet('/api/ical');
      setIcalFeeds(data[r.id] ?? []);
    } catch { setIcalFeeds([]); }
  };

  const isAvailableToday = (r: Residence) => {
    const today = new Date().toISOString().split('T')[0];
    return !r.bookedRanges.some(range => today >= range.start && today < range.end);
  };

  if (checkingAuth) return (
    <div className="flex min-h-screen items-center justify-center bg-[#f0ece5]">
      <p className="animate-pulse text-sm text-[#263442]/60">Checking session...</p>
    </div>
  );

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#f0ece5]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#263442]/10 bg-[#263442] px-6 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-9 w-9 items-center justify-center border border-white/50 font-serif text-xl italic">B</span>
            <div>
              <p className="text-xs font-semibold tracking-widest text-white/60">BIAZO VACATION HOMES</p>
              <p className="text-sm font-semibold">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-[11px] text-white/50">Signed in as</p>
              <p className="text-sm font-semibold">{ownerName}</p>
            </div>
            <Link href="/" className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10">
              <ArrowLeft size={13} /> Website
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20">
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Total Residences', value: residences.length, icon: BedDouble },
            { label: 'Available Today', value: residences.filter(isAvailableToday).length, icon: Check },
            { label: 'Blocked Today', value: residences.filter(r => !isAvailableToday(r)).length, icon: Calendar },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <Icon size={22} className="text-[#c56749]" />
              <div>
                <p className="text-2xl font-bold text-[#263442]">{value}</p>
                <p className="text-xs text-[#263442]/55">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl bg-white p-1 shadow-sm w-fit">
          <button onClick={() => setActiveTab('residences')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === 'residences' ? 'bg-[#263442] text-white' : 'text-[#263442]/60 hover:text-[#263442]'}`}
          ><BedDouble size={15} /> Residences</button>
          <button onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${activeTab === 'bookings' ? 'bg-[#263442] text-white' : 'text-[#263442]/60 hover:text-[#263442]'}`}
          ><Bell size={15} /> Bookings</button>
        </div>

        {activeTab === 'residences' && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#263442]">All Residences</h2>
              <p className="text-sm text-[#263442]/50">Click <strong>Edit</strong> to change price or availability — changes go live instantly.</p>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <p className="animate-pulse text-sm text-[#263442]/50">Loading residences from database...</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {residences.map(r => {
                  const avail = isAvailableToday(r);
                  return (
                    <div key={r.id} className="rounded-2xl border border-[#263442]/10 bg-white shadow-sm">
                      <div className="relative aspect-[1.6] overflow-hidden rounded-t-2xl bg-[#e0d9cd]">
                        <img src={r.images[0]?.url} alt={r.name} className="h-full w-full object-cover" />
                        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${avail ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                          {avail ? '● AVAILABLE' : '● BLOCKED'}
                        </span>
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c56749]">{r.neighborhood}</p>
                        <h3 className="mt-1 font-serif text-lg text-[#263442] leading-tight">{r.name}</h3>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <p className="text-xl font-bold text-[#263442]">AED {r.pricePerNightAed.toLocaleString()}</p>
                            <p className="text-[11px] text-[#263442]/50">per night · Cleaning: AED {r.cleaningFeeAed}</p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#263442]/60">
                            <Star size={12} fill="#e8a83e" className="text-[#e8a83e]" />
                            {r.rating} ({r.reviewsCount})
                          </div>
                        </div>
                        <div className="mt-2 text-[11px] text-[#263442]/50">
                          {r.bookedRanges.length === 0 ? '✓ No blocked dates' : `${r.bookedRanges.length} blocked period${r.bookedRanges.length > 1 ? 's' : ''}`}
                        </div>
                        <button onClick={() => openEdit(r)}
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#263442] py-2.5 text-xs font-semibold text-[#263442] transition-all hover:bg-[#263442] hover:text-white"
                        ><Pencil size={13} /> Edit Price & Availability</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'bookings' && <BookingsPanel showToast={showToast} />}
      </main>

      {editTarget && (
        <EditModal
          residence={editTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
          icalFeeds={icalFeeds}
          onAddFeed={handleAddIcalFeed}
          onRemoveFeed={handleRemoveIcalFeed}
        />
      )}

      {saving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-2xl bg-white px-8 py-6 shadow-2xl text-center">
            <p className="animate-pulse text-sm font-semibold text-[#263442]">Saving to database...</p>
            <p className="mt-1 text-xs text-[#263442]/50">Changes will be live in seconds</p>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#263442] px-6 py-3 text-sm text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
