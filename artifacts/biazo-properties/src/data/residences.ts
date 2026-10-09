import heroImage from '@assets/generated_images/biazo-hero.jpg';
import livingImage from '@assets/generated_images/biazo-featured-living.jpg';
import bedroomImage from '@assets/generated_images/biazo-featured-bedroom.jpg';
import poolImage from '@assets/generated_images/biazo-pool.jpg';
import terraceImage from '@assets/generated_images/biazo-terrace.jpg';
import beachImage from '@assets/generated_images/biazo-beach.jpg';
import downtownImage from '@assets/generated_images/biazo-downtown.jpg';
import futureCityImage from '@assets/generated_images/biazo-future-city.jpg';
import golfImage from '@assets/generated_images/biazo-golf.jpg';
import bluewatersImage from '@assets/generated_images/biazo-bluewaters.jpg';
import businessBayImage from '@assets/generated_images/biazo-businessbay.jpg';
import downtown2Image from '@assets/generated_images/biazo-downtown2.jpg';
import deiraImage from '@assets/generated_images/biazo-deira.jpg';
import jvcImage from '@assets/generated_images/biazo-jvc.jpg';
import jumeirahImage from '@assets/generated_images/biazo-jumeirah.jpg';
import jbrImage from '@assets/generated_images/biazo-jbr.jpg';
import szrImage from '@assets/generated_images/biazo-szr.jpg';
import alBarshaImage from '@assets/generated_images/biazo-albarsha.jpg';

export interface Residence {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  address: string;
  type: 'Penthouse' | 'Villa' | 'Suite' | 'Apartment';
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  sqft: number;
  pricePerNightAed: number;
  cleaningFeeAed: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: { url: string; caption: string }[];
  amenities: string[];
  bookedRanges: { start: string; end: string }[];
  externalIcalUrls?: string[];
}

export const residences: Residence[] = [
  {
    id: 'bvh-skyline-suite',
    name: 'The Address Skyline Suite',
    tagline: 'High-floor panoramic haven overlooking the Burj Khalifa',
    neighborhood: 'Downtown Dubai',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    type: 'Penthouse',
    bedrooms: 2,
    bathrooms: 2.5,
    sleeps: 4,
    sqft: 1850,
    pricePerNightAed: 1850,
    cleaningFeeAed: 350,
    rating: 4.96,
    reviewsCount: 38,
    description: 'A high-floor two-bedroom residence overlooking the city’s most iconic silhouette. Calm natural timber, bespoke Italian furnishings, soft Belgian linen, and floor-to-ceiling glass that reveals the Dubai skyline as light transitions through the day.',
    images: [
      { url: livingImage, caption: 'The panoramic living salon' },
      { url: bedroomImage, caption: 'The principal suite & skyline views' },
      { url: poolImage, caption: 'Private infinity-edge rooftop pool' },
      { url: terraceImage, caption: 'Sunlit sunset terrace' },
      { url: downtownImage, caption: 'Downtown neighborhood perspective' },
    ],
    amenities: [
      'Private Rooftop Pool Access',
      '24/7 Dedicated Concierge',
      'Burj Khalifa & Fountain Views',
      'Valet & Reserved Covered Parking',
      'Daily Housekeeping Available',
      'Sonos Multi-Room Sound',
      'Gourmet Nespresso & Tea Bar',
      'Ultra High-Speed Fiber Wi-Fi (500 Mbps)',
      'Luxury Acqua di Parma Toiletries',
      'Keyless Smart Door Lock'
    ],
    bookedRanges: [
      { start: '2026-10-02', end: '2026-10-06' },
      { start: '2026-10-14', end: '2026-10-18' }
    ]
  },
  {
    id: 'bvh-palm-beach-villa',
    name: 'Palm Jumeirah Ocean Villa',
    tagline: 'Direct beachfront villa with private shoreline and infinity pool',
    neighborhood: 'Palm Jumeirah',
    address: 'Frond N, Palm Jumeirah, Dubai',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 4.5,
    sleeps: 8,
    sqft: 5200,
    pricePerNightAed: 4600,
    cleaningFeeAed: 650,
    rating: 4.98,
    reviewsCount: 52,
    description: 'Step directly from your private travertine patio onto the serene white sands of the Arabian Gulf. Featuring generous outdoor entertaining spaces, a temperature-controlled pool, private sunbeds, and custom interior architecture.',
    images: [
      { url: beachImage, caption: 'Private beachfront & shoreline' },
      { url: poolImage, caption: 'Private courtyard infinity pool' },
      { url: livingImage, caption: 'Double-height grand salon' },
      { url: bedroomImage, caption: 'Master suite with private ocean balcony' },
      { url: terraceImage, caption: 'Open-air dining terrace' }
    ],
    amenities: [
      'Direct Private Beach Access',
      'Private Temperature-Controlled Pool',
      'Outdoor BBQ & Al Fresco Dining',
      'Private Butler Service on Request',
      'Miele Fitted Chef Kitchen',
      'Chauffeured Airport Arrival Transfer',
      'Paddleboards & Beach Equipment',
      'Creston Home Automation',
      'Secure Gated Community'
    ],
    bookedRanges: [
      { start: '2026-09-28', end: '2026-10-03' },
      { start: '2026-10-20', end: '2026-10-25' }
    ]
  },
  {
    id: 'bvh-marina-promenade',
    name: 'Marina Promenade Sky Residence',
    tagline: 'Waterfront luxury surrounded by yachts, sea breezes, and city lights',
    neighborhood: 'Dubai Marina',
    address: 'Marina Promenade, Dubai Marina',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 6,
    sqft: 2600,
    pricePerNightAed: 2450,
    cleaningFeeAed: 450,
    rating: 4.92,
    reviewsCount: 29,
    description: 'Perched above the sparkling water of Dubai Marina, this three-bedroom home combines nautical elegance with relaxed residential warmth. Walk down to premier waterfront dining, or watch luxury yachts glide by from your expansive terrace.',
    images: [
      { url: terraceImage, caption: 'Marina waterfront terrace' },
      { url: livingImage, caption: 'Spacious light-flooded living room' },
      { url: bedroomImage, caption: 'Primary bedroom suite' },
      { url: poolImage, caption: 'Building resident lap pool' },
      { url: heroImage, caption: 'Marina night vista' }
    ],
    amenities: [
      'Expansive Marina Waterfront Terrace',
      'Walking Distance to JBR Beach',
      'Technogym Wellness Gym Access',
      'High-Speed Wi-Fi',
      'Smart 75" 4K OLED Screens',
      'Wine Cooler & Espresso Bar',
      '2 Dedicated Parking Bays',
      '24/7 Security & Concierge'
    ],
    bookedRanges: [
      { start: '2026-10-08', end: '2026-10-12' }
    ]
  },
  {
    id: 'bvh-emirates-hills-sanctuary',
    name: 'Emirates Hills Golf Estate',
    tagline: 'Secluded private estate overlooking championship emerald fairways',
    neighborhood: 'Emirates Hills',
    address: 'Montgomerie Hill, Emirates Hills, Dubai',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sleeps: 10,
    sqft: 7800,
    pricePerNightAed: 6800,
    cleaningFeeAed: 900,
    rating: 5.0,
    reviewsCount: 19,
    description: 'An architectural statement set in the prestigious Emirates Hills enclave. Sprawling manicured gardens, a secluded 20-meter pool, private screening room, and panoramic golf course views deliver the ultimate in tranquility and family privacy.',
    images: [
      { url: golfImage, caption: 'Championship fairways & private grounds' },
      { url: livingImage, caption: 'Art-curated living gallery' },
      { url: poolImage, caption: '20m private illuminated pool' },
      { url: bedroomImage, caption: 'Presidential master retreat' },
      { url: terraceImage, caption: 'Sunset pergola & lounge' }
    ],
    amenities: [
      'Championship Golf Course Frontage',
      'Private 20-Meter Pool & Jacuzzi',
      'Private Cinema & Entertainment Lounge',
      'Dedicated Driver & Private Chef Available',
      'Staff Quarters with Separate Entrance',
      'Sub-Zero & Wolf Kitchen Appliances',
      'Lush Landscaped Lawns & Barbecue Station',
      'Ultimate Privacy in Dubai’s Most Exclusive Gated Community'
    ],
    bookedRanges: [
      { start: '2026-10-10', end: '2026-10-16' }
    ]
  },
  {
    id: 'bvh-difc-loft',
    name: 'DIFC Artisan Sky Loft',
    tagline: 'Sophisticated metropolitan duplex for couples & business travelers',
    neighborhood: 'Downtown Dubai',
    address: 'Gate Precinct, DIFC, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1.5,
    sleeps: 2,
    sqft: 1250,
    pricePerNightAed: 1250,
    cleaningFeeAed: 250,
    rating: 4.89,
    reviewsCount: 44,
    description: 'Steps away from Dubai’s Michelin-starred restaurants and contemporary art galleries. Features soaring double-height concrete-and-timber ceilings, bespoke cocktail station, dedicated workstation, and serene urban elegance.',
    images: [
      { url: futureCityImage, caption: 'Metropolitan cityscape view' },
      { url: livingImage, caption: 'Double-height urban loft salon' },
      { url: bedroomImage, caption: 'Mezzanine master sleeping suite' },
      { url: heroImage, caption: 'Twilight architectural skyline' }
    ],
    amenities: [
      'Walking Distance to Gate Village & Fine Dining',
      'Dedicated Ergonomic Workstation & Fast Wi-Fi',
      'Artisan Coffee & Craft Cocktail Bar',
      'Building Infinity Pool & Spa Access',
      'Metro & Downtown Proximity',
      'Keyless Mobile Entry'
    ],
    bookedRanges: [
      { start: '2026-10-01', end: '2026-10-04' }
    ]
  },
  {
    id: 'bvh-bluewaters-retreat',
    name: 'Bluewaters Island Waterfront Retreat',
    tagline: 'Seafront living with Ain Dubai views and private Gulf terrace',
    neighborhood: 'Bluewaters Island',
    address: 'Bluewaters Residences, Bluewaters Island, Dubai',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    sqft: 1620,
    pricePerNightAed: 2100,
    cleaningFeeAed: 380,
    rating: 4.94,
    reviewsCount: 31,
    description: 'Wake up to the Gulf and the iconic Ain Dubai — the world\'s largest observation wheel — from your private waterfront terrace. This beautifully appointed two-bedroom retreat combines airy island calm with the energy of Dubai\'s most exciting new destination, steps from world-class dining and the Caesars Palace beach.',
    images: [
      { url: bluewatersImage, caption: 'Gulf-front living with Ain Dubai views' },
      { url: beachImage, caption: 'Caesars Palace private beach access' },
      { url: livingImage, caption: 'Bright open-plan living salon' },
      { url: bedroomImage, caption: 'Master bedroom with sea breeze' },
      { url: terraceImage, caption: 'Waterfront terrace at sunset' },
    ],
    amenities: [
      'Ain Dubai & Gulf Panorama Views',
      'Access to Caesars Palace Beach',
      'Island Promenade & World-Class Dining Steps Away',
      'Private Waterfront Terrace',
      'Keyless Smart Entry',
      '24/7 Concierge',
      'Technogym Fitness Access',
      'Secure Covered Parking',
      'High-Speed Wi-Fi'
    ],
    bookedRanges: [
      { start: '2026-10-05', end: '2026-10-09' }
    ]
  },
  {
    id: 'bvh-businessbay-canal',
    name: 'Business Bay Canal Penthouse',
    tagline: 'Sleek urban sanctuary above the glittering Dubai Water Canal',
    neighborhood: 'Business Bay',
    address: 'Executive Towers, Business Bay, Dubai',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 6,
    sqft: 2900,
    pricePerNightAed: 2750,
    cleaningFeeAed: 480,
    rating: 4.91,
    reviewsCount: 23,
    description: 'A sophisticated full-floor penthouse hovering above the Dubai Water Canal with commanding views of the Burj Khalifa and Downtown skyline. Dark timber, brushed brass fixtures, and custom Italian furnishings set the tone — paired with a chef kitchen, private jacuzzi, and seamless access to Dubai\'s financial and cultural heartbeat.',
    images: [
      { url: businessBayImage, caption: 'Canal-view living & designer kitchen' },
      { url: futureCityImage, caption: 'Business Bay skyline at dusk' },
      { url: bedroomImage, caption: 'Master suite with canal views' },
      { url: poolImage, caption: 'Private rooftop jacuzzi deck' },
      { url: terraceImage, caption: 'Wraparound penthouse terrace' },
    ],
    amenities: [
      'Dubai Water Canal & Burj Khalifa Views',
      'Private Rooftop Jacuzzi',
      'Chef\'s Gaggenau Kitchen',
      'Dedicated Concierge & Valet',
      'Infinity Rooftop Pool Access',
      'Walking Distance to Dubai Mall & Metro',
      'Smart Home Automation',
      'Keyless Mobile Entry',
      '2 Reserved Parking Spaces'
    ],
    bookedRanges: [
      { start: '2026-10-12', end: '2026-10-17' }
    ]
  },
  {
    id: 'bvh-downtown-fountain-penthouse',
    name: 'Downtown Fountain Penthouse',
    tagline: 'Iconic terrace pool with front-row Burj Khalifa & Fountain views',
    neighborhood: 'Downtown Dubai',
    address: 'Opera Grand, Downtown Dubai',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    sleeps: 6,
    sqft: 3400,
    pricePerNightAed: 3950,
    cleaningFeeAed: 580,
    rating: 5.0,
    reviewsCount: 14,
    description: 'The most coveted address in Downtown Dubai — a sprawling three-bedroom penthouse with an enormous private terrace, heated plunge pool, and an uninterrupted front-row seat to the Dubai Fountain and Burj Khalifa light show every evening. Designed for those who want the absolute best that Dubai has to offer.',
    images: [
      { url: downtown2Image, caption: 'Private terrace pool with Burj Khalifa view' },
      { url: downtownImage, caption: 'Downtown Dubai neighbourhood' },
      { url: livingImage, caption: 'Grand penthouse living salon' },
      { url: bedroomImage, caption: 'Master suite with fountain views' },
      { url: poolImage, caption: 'Terrace heated plunge pool at night' },
    ],
    amenities: [
      'Unobstructed Burj Khalifa & Fountain Views',
      'Private Heated Terrace Plunge Pool',
      'Front-Row Dubai Fountain Show Nightly',
      'Steps from Dubai Opera & Dubai Mall',
      'Dedicated Butler on Request',
      'Valet & Covered Parking',
      'Luxury Diptyque Toiletries',
      'Keyless Smart Entry',
      'Daily Housekeeping'
    ],
    bookedRanges: [
      { start: '2026-10-08', end: '2026-10-11' },
      { start: '2026-10-22', end: '2026-10-27' }
    ]
  }
];

export interface BookingRecord {
  id: string;
  residenceId: string;
  residenceName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAed: number;
  currency: 'AED' | 'USD';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: 'card' | 'arrival' | 'whatsapp';
  paymentStatus: 'paid' | 'guaranteed' | 'inquiry';
  bookedAt: string;
  smartLockPin: string;
}

export const AED_TO_USD_RATE = 3.6725;
