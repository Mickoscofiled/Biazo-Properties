import { type FormEvent, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react';
import { Link } from 'wouter';

const whatsappUrl = 'https://wa.me/971544937128';
const emailAddress = 'danait.yohwannes@gmail.com';

function ContactHeader() {
  return (
    <header className="relative z-20 border-b border-[#1d3340]/15 bg-[#f3eee2]/90 backdrop-blur-md" data-testid="header-contact">
      <div className="container-wide flex h-[82px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" data-testid="link-contact-brand">
          <span className="flex h-9 w-9 items-center justify-center border border-[#1d3340] font-serif text-xl italic">B</span>
          <span className="text-[13px] font-semibold tracking-[.18em]">Biazo <span className="font-normal opacity-60">Properties</span></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Contact page navigation">
          <Link href="/" className="nav-link" data-testid="link-contact-home">Home</Link>
          <a href="#contact-details" className="nav-link" data-testid="link-contact-details">Contact details</a>
          <a href="#enquiry" className="nav-link" data-testid="link-contact-enquiry">Make an enquiry</a>
        </nav>
        <Link href="/" className="flex items-center gap-2 text-[11px] font-semibold tracking-[.1em] text-[#174f5a]" data-testid="link-contact-back">
          <ArrowDownRight size={15} className="rotate-45" /> BACK TO BIAZO
        </Link>
      </div>
    </header>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-shell min-h-[100dvh]" data-testid="page-contact">
      <ContactHeader />
      <main>
        <section className="contact-hero-grid relative overflow-hidden border-b border-[#1d3340]/15 py-20 md:py-28" data-testid="section-contact-hero">
          <div className="container-wide relative">
            <div className="max-w-4xl">
              <p className="eyebrow text-[#174f5a]" data-testid="text-contact-eyebrow">The door is open</p>
              <h1 className="display mt-5 text-[clamp(4.6rem,12vw,10.5rem)] text-[#1d3340]" data-testid="text-contact-title">
                Let&apos;s make<br /><i>space for you.</i>
              </h1>
              <div className="mt-10 flex max-w-xl items-start gap-5 border-l-2 border-[#e8a83e] pl-5 md:ml-[18%]">
                <p className="text-base leading-7 text-[#1d3340]/68" data-testid="text-contact-intro">
                  Whether you are planning a considered stay, looking after a Dubai home, or simply want a local point of view, our team is close by.
                </p>
              </div>
            </div>
            <span className="absolute right-0 top-2 hidden font-mono text-[10px] tracking-[.16em] text-[#1d3340]/45 md:block" data-testid="text-contact-coordinate">25° 11′ N / 55° 16′ E</span>
          </div>
        </section>

        <section id="contact-details" className="container-wide py-20 md:py-28" data-testid="section-contact-details">
          <div className="grid gap-12 lg:grid-cols-[.66fr_1.34fr]">
            <div>
              <p className="eyebrow text-[#174f5a]">Find us here</p>
              <h2 className="mt-4 max-w-sm font-serif text-4xl leading-[.98] text-[#1d3340] md:text-6xl" data-testid="text-contact-details-title">A real person,<br /><i>in your corner.</i></h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-[#1d3340]/62">No call centres. No hand-offs. Just a local team with a good sense of place and time.</p>
            </div>
            <div className="grid gap-0 border-t border-[#1d3340]/20">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-link group flex items-center justify-between border-b border-[#1d3340]/20 py-7" data-testid="link-contact-whatsapp">
                <span className="flex items-center gap-4"><MessageCircle size={21} strokeWidth={1.4} className="text-[#174f5a]" /><span><span className="eyebrow block text-[#1d3340]/48">WhatsApp</span><span className="mt-2 block font-serif text-2xl text-[#1d3340]" data-testid="text-contact-whatsapp">+971 54 4937128</span></span></span>
                <ArrowUpRight size={19} className="text-[#e8a83e] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href={`mailto:${emailAddress}`} className="contact-link group flex items-center justify-between border-b border-[#1d3340]/20 py-7" data-testid="link-contact-email">
                <span className="flex items-center gap-4"><Mail size={21} strokeWidth={1.4} className="text-[#174f5a]" /><span><span className="eyebrow block text-[#1d3340]/48">Email</span><span className="mt-2 block break-all font-serif text-2xl text-[#1d3340]" data-testid="text-contact-email">{emailAddress}</span></span></span>
                <ArrowUpRight size={19} className="text-[#e8a83e] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <div className="flex items-center justify-between border-b border-[#1d3340]/20 py-7" data-testid="row-contact-address">
                <span className="flex items-center gap-4"><MapPin size={21} strokeWidth={1.4} className="text-[#174f5a]" /><span><span className="eyebrow block text-[#1d3340]/48">Office</span><span className="mt-2 block font-serif text-2xl text-[#1d3340]" data-testid="text-contact-office">Dubai, UAE</span><span className="mt-1 block text-xs text-[#1d3340]/55" data-testid="text-contact-po-box">P.O. Box 118-885</span></span></span>
                <span className="font-mono text-[10px] tracking-[.12em] text-[#1d3340]/45">DXB / 01</span>
              </div>
            </div>
          </div>
        </section>

        <section id="enquiry" className="bg-[#174f5a] py-20 text-[#fbfaf4] md:py-28" data-testid="section-contact-enquiry">
          <div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-[#e8a83e]">A little context helps</p>
              <h2 className="mt-4 max-w-md font-serif text-5xl leading-[.95] md:text-7xl" data-testid="text-enquiry-title">Tell us what<br /><i>you need.</i></h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-[#fbfaf4]/65">Leave a few details and we will come back to you personally. For an immediate answer, use WhatsApp above.</p>
              <a href="tel:+971544937128" className="contact-link mt-8 flex w-fit items-center gap-3 border-b border-[#fbfaf4]/35 pb-2 text-[11px] font-semibold tracking-[.1em]" data-testid="link-contact-phone"><Phone size={14} /> CALL THE BIAZO DESK</a>
            </div>
            <div className="contact-card p-7 text-[#1d3340] md:p-10">
              {sent ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center" data-testid="status-contact-sent">
                  <Check size={27} className="text-[#174f5a]" />
                  <h3 className="mt-5 font-serif text-4xl">We have your note.</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#1d3340]/62">Thank you. A Biazo Properties specialist will be in touch shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-7 border-b border-[#174f5a] pb-2 text-[11px] font-semibold tracking-[.1em] text-[#174f5a]" data-testid="button-contact-send-another">SEND ANOTHER NOTE</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-7" data-testid="form-contact-enquiry">
                  <label className="block"><span className="field-label">Your name</span><input required className="contact-input" placeholder="How should we address you?" data-testid="input-contact-name" /></label>
                  <label className="block"><span className="field-label">Email or WhatsApp</span><input required className="contact-input" placeholder="The best way to reach you" data-testid="input-contact-reply" /></label>
                  <label className="block"><span className="field-label">What can we help with?</span><textarea required rows={3} className="contact-input resize-none" placeholder="A residence, your property, a question about Dubai..." data-testid="input-contact-message" /></label>
                  <button type="submit" className="btn-fill flex items-center gap-3 px-6 py-4 text-[11px] font-semibold tracking-[.1em]" data-testid="button-contact-submit">SEND YOUR NOTE <ArrowUpRight size={16} /></button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#142633] py-12 text-[#fbfaf4]" data-testid="footer-contact">
        <div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><Link href="/" className="flex items-center gap-3" data-testid="link-contact-footer-brand"><span className="flex h-9 w-9 items-center justify-center border border-[#fbfaf4] font-serif text-xl italic">B</span><span className="text-[13px] font-semibold tracking-[.18em]">Biazo <span className="font-normal opacity-60">Properties</span></span></Link><p className="mt-5 max-w-xs text-sm leading-6 text-[#fbfaf4]/52">Private residences and local perspective, for the way you want to experience Dubai.</p></div>
          <div className="flex flex-col items-start gap-3 text-sm text-[#fbfaf4]/65 md:items-end"><a href={whatsappUrl} target="_blank" rel="noreferrer" data-testid="link-contact-footer-whatsapp">WhatsApp +971 54 4937128</a><a href={`mailto:${emailAddress}`} data-testid="link-contact-footer-email">{emailAddress}</a><span data-testid="text-contact-footer-address">Dubai, UAE · P.O. Box 118-885</span></div>
        </div>
        <div className="container-wide mt-10 border-t border-[#fbfaf4]/15 pt-6 text-[10px] tracking-[.08em] text-[#fbfaf4]/38">© 2025 Biazo Properties. Dubai, UAE.</div>
      </footer>
    </div>
  );
}