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
  checkInTime?: string;
  checkOutTime?: string;
  houseRules?: string[];
  roomFeatures?: string[];
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
      { url: downtownImage, caption: 'Downtown Dubai & Burj Khalifa skyline perspective' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85', caption: 'Floor-to-ceiling glass panoramic living salon' },
      { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85', caption: 'The principal suite & Italian linen bed' },
      { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85', caption: 'Freestanding travertine soaking tub with city views' },
      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85', caption: 'Private infinity-edge rooftop pool overlooking the skyline' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85', caption: 'Open-plan dining table with Burj Khalifa framed in glass' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85', caption: 'Bespoke marble island chef kitchen with wine cooler' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85', caption: 'Second bedroom with workspace and city views' },
      { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85', caption: 'Dusk skyline from the private balcony terrace' }
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
    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking inside the property',
      'No pets allowed',
      'No parties or events',
      'Quiet hours after 22:00',
      'Government-issued ID required at check-in',
      'Maximum 4 guests as stated'
    ],
    roomFeatures: [
      'King Size Bed — Belgian linen & Tempur-Pedic mattress',
      'Queen Bed in second suite',
      'Private balcony with Burj Khalifa & fountain views',
      'Floor-to-ceiling panoramic glass throughout',
      'Travertine en-suite bathrooms (x2)',
      '55" & 65" Smart OLED TVs',
      'Open-plan living & dining with city backdrop',
      'Bespoke Italian kitchen with full appliances'
    ],
    bookedRanges: [
      { start: '2026-10-02', end: '2026-10-06' },
      { start: '2026-10-14', end: '2026-10-18' },
      { start: '2026-11-04', end: '2026-11-09' }
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
      { url: beachImage, caption: 'Private beachfront & shoreline on Palm Frond N' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', caption: 'Double-height grand oceanfront salon' },
      { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85', caption: 'Master suite with private sunrise ocean balcony' },
      { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85', caption: 'Private courtyard infinity pool & sun loungers' },
      { url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85', caption: 'Open-air dining terrace overlooking the Arabian Gulf' },
      { url: 'https://images.unsplash.com/photo-1600047508788-786f3865b0c7?auto=format&fit=crop&w=1600&q=85', caption: 'Landscaped garden with direct beach gate' },
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85', caption: 'Modern open kitchen with breakfast island' },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85', caption: 'Palm suite two with dedicated walk-in closet' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85', caption: 'Aerial view of Palm Jumeirah Frond N' }
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
    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking inside the property',
      'No pets allowed',
      'No events or commercial shoots without prior approval',
      'Quiet hours after 23:00',
      'Original passport required at check-in',
      'Maximum 8 guests — no additional overnight visitors'
    ],
    roomFeatures: [
      'Master King Suite with ocean balcony',
      'Three additional Queen bedrooms',
      'Private pool (heated, 12m)',
      'Direct beach access from rear garden',
      'Chef kitchen with Miele appliances',
      'Outdoor terrace BBQ & dining area for 12',
      'En-suite marble bathrooms in all 4 rooms',
      'Dedicated driver/butler service on request'
    ],
    bookedRanges: [
      { start: '2026-09-28', end: '2026-10-03' },
      { start: '2026-10-20', end: '2026-10-25' },
      { start: '2026-11-14', end: '2026-11-20' }
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
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', caption: 'Marina-facing open salon with yacht views' },
      { url: terraceImage, caption: 'Curved glass terrace overlooking the yacht marina' },
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85', caption: 'Primary bedroom suite with harbor vistas' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85', caption: 'Designer quartz chef kitchen with wine cooler' },
      { url: heroImage, caption: 'Illuminated Dubai Marina night vista' },
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85', caption: 'Second bedroom suite with built-in wardrobes' },
      { url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1600&q=85', caption: 'Rain-shower bathroom with floor-to-ceiling tiling' },
      { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85', caption: 'Evening view of the marina promenade from terrace' }
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
    checkInTime: 'From 15:00',
    checkOutTime: 'Until 11:00',
    houseRules: [
      'No smoking on premises',
      'No pets allowed',
      'No parties or events',
      'Quiet hours after 22:00',
      'Valid photo ID required at check-in',
      'Maximum 6 guests'
    ],
    roomFeatures: [
      'King Bed in master suite with marina view',
      'Two Queen beds in secondary suites',
      'Full-width glazed terrace with marina panorama',
      'Quartz island kitchen with wine cooler',
      'Three en-suite bathrooms',
      '75" OLED Smart TV in living room',
      'Dedicated dining area for 8',
      'Two covered parking bays included'
    ],
    bookedRanges: [
      { start: '2026-10-08', end: '2026-10-12' },
      { start: '2026-11-06', end: '2026-11-12' }
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
      { url: golfImage, caption: 'Private estate grounds bordering championship fairways' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85', caption: 'Grand architectural reception hall with bespoke chandelier' },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85', caption: 'Presidential master sanctuary with fairway views' },
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85', caption: '20-meter private illuminated garden swimming pool' },
      { url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=85', caption: 'Private cinema lounge & marble fireplace salon' },
      { url: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&w=1600&q=85', caption: 'Family living room overlooking the pool terrace' }
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

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking inside the property',
      'Pets in garden areas only — not inside',
      'Private events require advance approval',
      'Quiet hours after 23:00',
      'Original passports required for all adult guests',
      'Maximum 10 guests',
      'Security deposit of AED 5,000 required',
    ],
    roomFeatures: [
      'Presidential King Master Suite with golf course views',
      'Four additional King/Twin suites',
      'Private 20m heated pool & jacuzzi',
      'Private home cinema (12-seat)',
      'Sub-Zero & Wolf fitted chef kitchen',
      'Manicured lawns with outdoor BBQ',
      'Six en-suite marble bathrooms',
    ],
    bookedRanges: [
      { start: '2026-10-10', end: '2026-10-16' },
      { start: '2026-11-18', end: '2026-11-25' }
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
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85', caption: 'Double-height industrial-chic concrete & timber salon' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85', caption: 'Upper mezzanine sleeping retreat with glass balustrade' },
      { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85', caption: 'Artisan cocktail bar & dedicated workstation' },
      { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85', caption: 'Matte black & brushed brass rain-shower ensuite' },
      { url: futureCityImage, caption: 'Architectural skyline overlooking DIFC Gate Village' },
      { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85', caption: 'Reading nook with skylights and bespoke shelving' },
      { url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1600&q=85', caption: 'Gate Village street-level art walk & dining row' }
    ],
    amenities: [
      'Walking Distance to Gate Village & Fine Dining',
      'Dedicated Ergonomic Workstation & Fast Wi-Fi',
      'Artisan Coffee & Craft Cocktail Bar',
      'Building Infinity Pool & Spa Access',
      'Metro & Downtown Proximity',
      'Keyless Mobile Entry'
    ],

    checkInTime: 'From 14:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking on premises',
      'No pets allowed',
      'No events or gatherings of more than 2 guests',
      'Quiet hours after 22:00',
      'Valid photo ID required at check-in',
    ],
    roomFeatures: [
      'King Bed on mezzanine level',
      'Double-height concrete & timber salon below',
      'Artisan cocktail bar & Nespresso station',
      'Matte-black rainfall ensuite shower',
      'Dedicated ergonomic workstation',
      'Building infinity pool & spa access',
      '43" Smart TV & ultra-fast fiber Wi-Fi',
    ],
    bookedRanges: [
      { start: '2026-10-01', end: '2026-10-04' },
      { start: '2026-11-03', end: '2026-11-08' }
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
    description: "Wake up to the Gulf and the iconic Ain Dubai — the world's largest observation wheel — from your private waterfront terrace. This beautifully appointed two-bedroom retreat combines airy island calm with the energy of Dubai's most exciting new destination, steps from world-class dining and the Caesars Palace beach.",
    images: [
      { url: bluewatersImage, caption: 'Direct seafront panorama with Ain Dubai views' },
      { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85', caption: 'Bright coastal open-plan living room with linen furnishings' },
      { url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85', caption: 'Calm sea-view master bedroom' },
      { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85', caption: 'Private sunset terrace overlooking the Arabian Gulf' },
      { url: jbrImage, caption: 'Caesars Palace private beach & Ain Dubai promenade' },
      { url: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1600&q=85', caption: 'Bright dining space with Ain Dubai through floor windows' },
      { url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=85', caption: 'Second bedroom in calm coastal palette' }
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

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 11:00',
    houseRules: [
      'No smoking inside the residence',
      'No pets allowed',
      'No parties or events',
      'Quiet hours after 22:00',
      'Valid passport or Emirates ID required',
      'Maximum 4 guests',
    ],
    roomFeatures: [
      'King Bed in master suite with Gulf panorama',
      'Queen Bed in second bedroom',
      'Private glazed terrace with Ain Dubai view',
      'Two full bathrooms with rainfall showers',
      'Open-plan kitchen & dining island',
      'Access to Caesars Palace Beach',
      '55" Smart TV & fiber Wi-Fi',
    ],
    bookedRanges: [
      { start: '2026-10-05', end: '2026-10-09' },
      { start: '2026-11-20', end: '2026-11-26' }
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
    description: "A sophisticated full-floor penthouse hovering above the Dubai Water Canal with commanding views of the Burj Khalifa and Downtown skyline. Dark timber, brushed brass fixtures, and custom Italian furnishings set the tone — paired with a chef kitchen, private jacuzzi, and seamless access to Dubai's financial and cultural heartbeat.",
    images: [
      { url: businessBayImage, caption: 'Canal-front open salon with designer marble kitchen' },
      { url: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1600&q=85', caption: 'Dark timber & brass master bedroom overlooking canal bridges' },
      { url: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=85', caption: 'Private rooftop heated jacuzzi deck under the stars' },
      { url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85', caption: 'Formal dining room with Gaggenau wine library' },
      { url: szrImage, caption: 'Wraparound penthouse terrace with illuminated city skyline' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85', caption: 'Night terrace with Burj Khalifa illuminated on the horizon' },
      { url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1600&q=85', caption: 'Jacuzzi deck under the stars with canal water reflections' },
      { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85', caption: 'Third bedroom suite with workspace and canal views' }
    ],
    amenities: [
      'Dubai Water Canal & Burj Khalifa Views',
      'Private Rooftop Jacuzzi',
      "Chef's Gaggenau Kitchen",
      'Dedicated Concierge & Valet',
      'Infinity Rooftop Pool Access',
      'Walking Distance to Dubai Mall & Metro',
      'Smart Home Automation',
      'Keyless Mobile Entry',
      '2 Reserved Parking Spaces'
    ],

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking inside the penthouse',
      'No pets allowed',
      'No parties or unauthorized events',
      'Quiet hours after 22:30',
      'Government-issued ID required at check-in',
      'Maximum 6 guests',
    ],
    roomFeatures: [
      'King Bed in master suite with canal views',
      'Two additional Queen suites',
      'Private rooftop jacuzzi deck',
      'Full-height glass overlooking the Dubai Water Canal',
      'Gaggenau chef kitchen with wine library',
      'Three and a half en-suite bathrooms',
      'Dedicated concierge & valet parking',
    ],
    bookedRanges: [
      { start: '2026-10-12', end: '2026-10-17' },
      { start: '2026-11-16', end: '2026-11-22' }
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
      { url: downtown2Image, caption: 'Private heated plunge pool directly facing Burj Khalifa' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', caption: 'Opulent high-ceiling penthouse salon with velvet and brass' },
      { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85', caption: 'Grand master suite with direct views of the Dubai Fountain show' },
      { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85', caption: 'Marble ensuite bathroom with deep soaking jacuzzi tub' },
      { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85', caption: 'Sunset dining balcony overlooking Downtown Dubai' },
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85', caption: 'Gourmet marble kitchen with butler pantry' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85', caption: 'Third bedroom suite with built-in wardrobes' },
      { url: 'https://images.unsplash.com/photo-1549488344-cbb6c34f2f2f?auto=format&fit=crop&w=1600&q=85', caption: 'Evening Dubai Fountain show from the private terrace' }
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

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking on premises',
      'No pets allowed',
      'No parties or events',
      'Quiet hours after 23:00',
      'Original passport required at check-in',
      'Maximum 6 guests',
      'Security deposit of AED 3,000 required',
    ],
    roomFeatures: [
      'King Bed in master suite with fountain view',
      'Two additional King/Queen suites',
      'Heated private plunge pool on terrace',
      'Front-row Dubai Fountain & Burj Khalifa view nightly',
      'Three en-suite marble bathrooms',
      'Gourmet marble kitchen with full appliances',
      '75" OLED TVs in living and master suite',
    ],
    bookedRanges: [
      { start: '2026-10-08', end: '2026-10-11' },
      { start: '2026-10-22', end: '2026-10-27' },
      { start: '2026-11-24', end: '2026-11-30' }
    ]
  },
  {
    id: 'bvh-muse-dubai-marina',
    name: 'The Muse — JW Marriott Residence',
    tagline: 'Timeless indulgence at the heart of Dubai Marina',
    neighborhood: 'Dubai Marina',
    address: 'JW Marriott Hotel Marina, Dubai Marina, Dubai',
    type: 'Suite',
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    sqft: 1400,
    pricePerNightAed: 885,
    cleaningFeeAed: 250,
    rating: 4.35,
    reviewsCount: 7,
    description: "An exquisitely curated residence within the iconic JW Marriott tower, offering a seamless blend of residential privacy and five-star hotel living. Styled with bespoke furnishings, a fully equipped gourmet kitchen, and a private balcony overlooking the Dubai Marina yacht parade — just 15 minutes' walk from Marina Beach. Guests enjoy access to the JW Marriott's rooftop pool, spa, and restaurant portfolio while retreating to a home that is entirely their own.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412665.jpg?k=16bd634779a5c7ec4bc55fa6bed73a862741283328e3809a101270ae419e41d1&o=&hp=1',
        caption: 'The Muse — grand living salon at JW Marriott Marina'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412650.jpg?k=5e21a8a11c139ac399066a530842d5e8052d5baaeb689e1746fb99227f2cb748&o=&hp=1',
        caption: 'Private balcony with panoramic Dubai Marina views'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412647.jpg?k=33d9a61592a7e966b4854e9245340a9a0d2966ef4cf8b74e40fbf5ac50213d0b&o=&hp=1',
        caption: 'Master bedroom with flat-screen TV and plush linen'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412621.jpg?k=36ed6f64c4c588a6bdbe4617394b97f1fcac07f183c4b0c1dcd64657dfbe22f0&o=&hp=1',
        caption: 'Marble bathroom with soaking tub and walk-in shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/752412580.jpg?k=b5146c32ed09bb0076a0a108498b44506a544f05cb61b0729a232da4f9225e61&o=&hp=1',
        caption: 'JW Marriott rooftop pool with city skyline backdrop'
      },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85', caption: 'Balcony with yacht-lined marina panorama at dusk' },
      { url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1600&q=85', caption: 'Marble rain-shower bathroom with dual vanity' }
    ],
    amenities: [
      'JW Marriott Hotel Rooftop Pool Access',
      'Fully Equipped Gourmet Kitchen',
      'Private Marina-View Balcony',
      '15-Min Walk to Marina Beach',
      'Five-Star Hotel Concierge',
      'Luxury Spa & Wellness Access',
      'Valet Parking Available',
      'High-Speed Wi-Fi',
      'Daily Housekeeping on Request',
      'Keyless Smart Entry'
    ],

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking on any floor',
      'No pets allowed',
      'No parties or events',
      'Quiet hours after 22:00',
      'Valid photo ID required',
      'Maximum 2 guests',
    ],
    roomFeatures: [
      'King Bed with JW Marriott Heavenly mattress',
      'Private terrace balcony with marina view',
      'Marble en-suite bathroom with rainfall shower',
      'Living area with sofa & 55" Smart TV',
      'JW Marriott branded toiletries & minibar',
      'Access to rooftop pool, gym & spa',
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-hampton-hilton-airport',
    name: 'Hampton by Hilton Dubai Airport',
    tagline: 'Brand-new contemporary hotel steps from Dubai International Airport',
    neighborhood: 'Al Qusais',
    address: 'Damascus Street, Al Qusais, Dubai',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 320,
    pricePerNightAed: 189,
    cleaningFeeAed: 80,
    rating: 4.0,
    reviewsCount: 6352,
    description: "A brand-new, contemporary hotel ideally located close to Dubai International Airport. Featuring modern, well-appointed rooms with all the comforts of home, a sparkling outdoor pool, fully equipped fitness centre, and complimentary breakfast. Perfect for business travellers and transit guests seeking quality accommodation with seamless airport access and easy connectivity to the city.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/483734620.jpg?k=b3f8f83441fed9414cd3bbb2eb5a2b3b6e3c2082123e272a3c9f9aa0c7d96ba2&o=&hp=1',
        caption: 'Outdoor swimming pool with loungers at Hampton by Hilton Dubai Airport'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/723711802.jpg?k=ed7cdd1c3441a5a07d54346c8c49ccada4377e05a992a7ee303ebc8c9697f2aa&o=&hp=1',
        caption: 'Contemporary hotel exterior with palm tree surroundings'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/723711941.jpg?k=795d7a97bce5311cf31820091223ede44d4754d450ae540f8a89fc65e4cd8d1a&o=&hp=1',
        caption: 'Modern hotel room with king bed and work desk'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/483734598.jpg?k=402cedd8c21e3da1e3bc4b86c10a0e2709f037857fc683b5ec883a48bbeb0701&o=&hp=1',
        caption: 'Clean en-suite bathroom with walk-in shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/514371513.jpg?k=12086a259baa18ba5d03a51643098ee35f6b56965495f593dc46b13b5a255e92&o=&hp=1',
        caption: 'Pool deck with sun umbrellas and city views'
      },
      { url: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1600&q=85', caption: 'Outdoor pool deck with sun loungers' },
      { url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85', caption: 'Fitness center with panoramic city view' }
    ],
    amenities: [
      'Complimentary Daily Breakfast',
      'Outdoor Swimming Pool',
      'Fitness Centre',
      '3-Min Drive to Dubai International Airport',
      'Free Airport Shuttle',
      'Business Centre & Meeting Rooms',
      'On-Site Restaurant & Bar',
      'High-Speed Wi-Fi Throughout',
      'Keyless Smart Entry',
      '24/7 Front Desk'
    ],

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking in rooms (designated outdoor areas available)',
      'No pets allowed',
      'Quiet hours after 22:00',
      'Valid photo ID required at check-in',
    ],
    roomFeatures: [
      'King Bed with Hampton Cloud Nine mattress',
      'Blackout curtains & ergonomic workspace',
      'En-suite bathroom with power shower',
      '42" Smart TV & complimentary Wi-Fi',
      'On-site outdoor pool & 24/7 gym',
      'Complimentary hot breakfast included',
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-damac-hills-2-rotana',
    name: 'DAMAC Hills 2 Hotel — Edge by Rotana',
    tagline: 'Tranquil resort-style retreat with swimming pools & community leisure',
    neighborhood: 'DAMAC Hills 2',
    address: 'DAMAC Hills 2, Dubai, United Arab Emirates',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 350,
    pricePerNightAed: 127,
    cleaningFeeAed: 70,
    rating: 4.1,
    reviewsCount: 2901,
    description: "Set in the tranquil master community of DAMAC Hills 2, this contemporary Edge by Rotana hotel combines modern comforts with resort-style leisure. Features outdoor swimming pools with sun decks, a state-of-the-art fitness centre, stylish all-day dining restaurant and bar, and quick connectivity to Dubai's arterial highways while escaping the bustle of downtown.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/403702022.jpg?k=813d904014699b92a782dfc54dac184555c4cd01041929619aaba9d9ea442f2e&o=&hp=1',
        caption: 'Contemporary hotel architecture and landscaped grounds'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/422847598.jpg?k=1d3569d2f0f5aec41b8bb770ba762d21b7b8bfeef8f83cb0a8e5eef4ad5be934&o=&hp=1',
        caption: 'Resort swimming pool with sun loungers and cabana seating'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/403924712.jpg?k=1121835fe43523cf5f7d442b96c83917c5bddde0df35d622242f630b5f474ba4&o=&hp=1',
        caption: 'Deluxe guest room with plush bed and seating lounge'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/614237499.jpg?k=a2c941ec791141a44b95acbfbc5e9b8f18a0f29a7e1b4ee177383579099c121d&o=&hp=1',
        caption: 'Modern en-suite bathroom with walk-in rain shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/407424646.jpg?k=5075b28b66ac74afeb2811ffb7ca4d96878ee4d900a04d629e3a97590c161425&o=&hp=1',
        caption: 'Urban Bar and all-day dining restaurant'
      },
      { url: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=1600&q=85', caption: 'Community lake & gardens view from room balcony' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', caption: 'Outdoor pool terrace surrounded by palms' }
    ],
    amenities: [
      'Outdoor Swimming Pools & Sun Deck',
      'State-of-the-Art Fitness Centre',
      'Urban Bar & All-Day Dining',
      'High-Speed Wi-Fi',
      'Complimentary Self & Valet Parking',
      '24/7 Front Desk & Concierge',
      'Individual Climate Control',
      'Keyless Smart Entry',
      'In-Room Coffee & Tea Facilities'
    ],

    checkInTime: 'From 14:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking in rooms',
      'No pets allowed',
      'Quiet hours after 22:00',
      'Valid photo ID required',
    ],
    roomFeatures: [
      'King or Twin Bed configuration',
      'Private balcony with community view',
      'En-suite bathroom with bathtub & shower',
      '43" Smart TV & free Wi-Fi',
      'Community outdoor pool & fitness centre',
      'On-site restaurant & room service',
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-towers-rotana-szr',
    name: 'Towers Rotana — Sheikh Zayed Road',
    tagline: 'Prime city hotel suite facing the Burj Khalifa & Financial Centre',
    neighborhood: 'Sheikh Zayed Road',
    address: 'Sheikh Zayed Road, Trade Centre Area, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 345,
    pricePerNightAed: 330,
    cleaningFeeAed: 120,
    rating: 4.35,
    reviewsCount: 3560,
    description: "Located prominently on Dubai's legendary Sheikh Zayed Road, Towers Rotana offers luxury hospitality right opposite the Financial Centre Metro Station and only minutes from Burj Khalifa and Dubai Mall. Guests enjoy an elevated rooftop swimming pool with sun terrace overlooking the metropolis, Bodylines Fitness & Wellness Club, award-winning dining including Teatro, and seamless access to Dubai's financial and leisure hubs.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/481019125.jpg?k=6e0635929a3d73101f102e6d5c614fae9de8d7662c727441998c444a776f3be1&o=&hp=1',
        caption: 'Elevated outdoor pool overlooking the Sheikh Zayed Road skyline'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/637036331.jpg?k=819ab3f00c7a78ed680ba003181375567811e9f4a56bbefc9ff60096d4160d07&o=&hp=1',
        caption: 'Classic King bedroom with panoramic Dubai city views'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/481913608.jpg?k=8956dea196be6381bd93b75768b1649debb60920138c509bab3b4ec19a608a96&o=&hp=1',
        caption: 'Rooftop sundeck with sun umbrellas and loungers'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/664756347.jpg?k=3e412835a140058c82928e1bd030b93c680589a173061e29f106d6748dd445ee&o=&hp=1',
        caption: 'Executive lounge living area and work salon'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/637036275.jpg?k=dcb7768e7004ecc7c65fb9e3b55264df4b67a8d4e8f72401018763ee7d590ff5&o=&hp=1',
        caption: 'En-suite marble bathroom with bathtub and luxury toiletries'
      },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85', caption: 'Sheikh Zayed Road skyline panorama from upper floors' },
      { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85', caption: 'Rooftop pool with SZR towers backdrop' }
    ],
    amenities: [
      'Elevated Rooftop Swimming Pool & Sundeck',
      'Directly Opposite Financial Centre Metro Station',
      'Bodylines Fitness & Wellness Club',
      'Award-Winning On-Site Restaurants & Teatro Lounge',
      '5-Min Drive to Burj Khalifa & Dubai Mall',
      'Valet & Covered Parking',
      'Ultra High-Speed Wi-Fi',
      '24/7 Room Service & Concierge',
      'Keyless Smart Entry'
    ],

    checkInTime: 'From 14:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking in rooms (outdoor terraces only)',
      'No pets allowed',
      'Quiet hours after 23:00',
      'Government-issued ID required',
    ],
    roomFeatures: [
      'King Bed with Rotana signature pillow menu',
      'Floor-to-ceiling window with SZR views',
      'Marble bathroom with bathtub & rainfall shower',
      '47" LED Smart TV & high-speed Wi-Fi',
      'Club Rotana floor access with lounge & breakfast',
      'Rooftop pool & Bodylines fitness centre',
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-crowne-plaza-marina',
    name: 'Crowne Plaza Dubai Marina — IHG Hotel',
    tagline: 'Waterfront luxury living along the vibrant Dubai Marina promenade',
    neighborhood: 'Dubai Marina',
    address: 'Al Yahoom Street, Dubai Marina, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1.5,
    sleeps: 2,
    sqft: 450,
    pricePerNightAed: 480,
    cleaningFeeAed: 150,
    rating: 4.5,
    reviewsCount: 2416,
    description: "Hovering over the sparkling waters of Dubai Marina, Crowne Plaza Dubai Marina by IHG offers premier five-star hospitality with direct access to the world-famous Marina promenade. Features floor-to-ceiling panoramic glass with yacht views, 5 distinguished dining outlets including an authentic Thai restaurant and open-air lounge, an infinity swimming pool facing the Marina canal, and a state-of-the-art wellness fitness centre — just steps from Dubai Marina Mall and the sandy shores of JBR Beach.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/579889365.jpg?k=ac69c59f11d6c3908b59896c900f633b7037cdca80083c1551b26547fab87d54&o=&hp=1',
        caption: 'Panoramic Dubai Marina waterfront perspective'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/563167285.jpg?k=b0b19afdb8ab15f81d7381298965ccede7e1f389f60dbaacea74250e796ec4ae&o=&hp=1',
        caption: 'Outdoor swimming pool and sun loungers overlooking the canal'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/563167291.jpg?k=79f12ae17ead8cbaaf497126f9b5e247c916fc77eef3cfe04d468e8c834a0036&o=&hp=1',
        caption: 'Executive Marina Suite living salon with plush seating'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/907089282.jpg?k=b2255c7ae457ce5812576ab003bb304466ccab01f81697e6f7930c158a768b93&o=&hp=1',
        caption: 'Spa-inspired marble bathroom with soaking tub and walk-in rain shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/314428487.jpg?k=72c8a0742301480f5e16604d0c1327cf8ff9a465f3a612105947c4aa15fdae76&o=&hp=1',
        caption: 'Private balcony terrace overlooking the yacht harbour'
      },
      { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85', caption: 'Marina sunset view from the private balcony' },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85', caption: 'Executive Club Lounge with evening canapes' }
    ],
    amenities: [
      'Outdoor Infinity Swimming Pool with Marina Views',
      'Direct Access to Dubai Marina Promenade',
      '5 Distinct On-Site Dining Outlets & Bars',
      'Walking Distance to Dubai Marina Mall & Metro',
      '24/7 High-Tech Fitness Centre',
      'Valet & Covered Parking',
      'Ultra High-Speed Wi-Fi',
      'Concierge & 24/7 Room Service',
      'Keyless Smart Entry'
    ],

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking in rooms',
      'No pets allowed',
      'Quiet hours after 23:00',
      'Valid passport required at check-in',
    ],
    roomFeatures: [
      'King Bed with IHG Pillow Menu',
      'Marina-view balcony',
      'Marble bathroom with rainfall shower & bathtub',
      '50" Smart TV & high-speed Wi-Fi',
      'IHG Club floor access with breakfast & cocktail hour',
      'Outdoor pool, spa & 24/7 fitness centre',
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-aloft-dubai-airport',
    name: 'Aloft Dubai Airport — Marriott Bonvoy',
    tagline: 'Loft-inspired urban sanctuary beside Terminal 1 in Al Garhoud',
    neighborhood: 'Al Garhoud',
    address: 'Airport Road, Al Garhoud, Next to Terminal 1, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 360,
    pricePerNightAed: 219,
    cleaningFeeAed: 90,
    rating: 4.25,
    reviewsCount: 3972,
    description: "Designed for today's hyper-connected traveler, Aloft by Marriott Dubai Airport brings energetic loft-inspired design to Al Garhoud, right next to Dubai International Airport Terminal 1. Features ultra-comfortable signature platform beds, high ceilings, custom amenities by Bliss® Spa, walk-in rainfall showers, an open-air Splash pool, 24/7 re:charge fitness centre, and the vibrant W XYZ® bar with craft cocktails and live music.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/643189508.jpg?k=b2077e5ea5430543632b72678717f4e90dcb97580c977d242de7707458a61f3f&o=&hp=1',
        caption: 'Outdoor Splash swimming pool and sun terrace lounge'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/643128620.jpg?k=cf3408d067b785d9685d49ad5bb12945b40250cb8718af6a73414b161d9a7f0c&o=&hp=1',
        caption: 'Loft-style King bedroom with custom artwork and ergonomic desk'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/643189464.jpg?k=6cc2b2ce4c0c744ff697bf513f6d07678259a305c0ddf5c0fb3cea05327b8dee&o=&hp=1',
        caption: 'Urban living lounge suite with plush sofa and media entertainment'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/643189416.jpg?k=cbbf33fb14c8c1bdc824dbb13459cedda8856826a6b8b971a4c7405c515be11e&o=&hp=1',
        caption: 'Spa bathroom with dual vessel sinks and walk-in rainfall shower'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/643128600.jpg?k=507d62be008ccbc816028274c3a1f3b555da6fa13cb7afcb921a5be1d08b3c0a&o=&hp=1',
        caption: 'W XYZ Bar and social lounge with craft beverages and music'
      },
      { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85', caption: 'W XYZ Bar evening ambiance with craft cocktails' },
      { url: 'https://images.unsplash.com/photo-1551882547-ff40c4a49d6b?auto=format&fit=crop&w=1600&q=85', caption: 'Re:fuel pantry with all-day grab-and-go bites' }
    ],
    amenities: [
      'Open-Air Splash Swimming Pool & Sundeck',
      'Beside Dubai International Airport Terminal 1',
      '24/7 re:charge Fitness Centre',
      'W XYZ Bar & Social Lounge',
      'Complimentary Airport Shuttle',
      'High-Speed Wi-Fi',
      'On-Site Grab & Go Re:fuel Pantry',
      '24/7 Front Desk & Concierge',
      'Keyless Smart Entry'
    ],

    checkInTime: 'From 15:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking in rooms',
      'No pets allowed',
      'Quiet hours after 22:00',
      'Valid photo ID required',
    ],
    roomFeatures: [
      'King or Queen loft-style bed',
      'High ceilings with custom urban artwork',
      'Walk-in rainfall shower',
      '49" Smart TV & ultra-fast Wi-Fi',
      'Outdoor Splash Pool & re:charge fitness',
      'Complimentary airport shuttle service',
    ],
    bookedRanges: []
  },
  {
    id: 'bvh-metropolitan-hotel-dubai',
    name: 'Metropolitan Hotel Dubai — Sheikh Zayed Road',
    tagline: '4-Star landmark comfort with rooftop pool, spa & beach shuttle',
    neighborhood: 'Al Thanya, Sheikh Zayed Road',
    address: 'Al Thanya Street, Exit 41, Sheikh Zayed Road, Dubai',
    type: 'Suite',
    bedrooms: 1,
    bathrooms: 1,
    sleeps: 2,
    sqft: 345,
    pricePerNightAed: 223,
    cleaningFeeAed: 90,
    rating: 4.15,
    reviewsCount: 1683,
    description: "Located prominently along Sheikh Zayed Road at Al Thanya Street, just 1.5 miles from Mall of the Emirates and near the beaches of Jumeirah, Metropolitan Hotel Dubai offers refined 4-star hospitality. Guests enjoy an elevated rooftop swimming pool with sun loungers, luxury spa and fitness facilities, 5 vibrant on-site restaurants and bars (including the legendary Red Lion English pub and Don Corleone Italian restaurant), plus a complimentary shuttle bus service directly to Jumeirah Beach and Mall of the Emirates.",
    images: [
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/98823289.jpg?k=22b2a6038cf934a0106c2b12267307c0dfa075b96d032eb9c9981b1d14c757c7&o=&hp=1',
        caption: 'Grand architectural exterior of Metropolitan Hotel Dubai'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/537355743.jpg?k=2821e2696cb61bd72442d57c1d8e2ad8e08760acf47c1c377bdcefa1110f2a9c&o=',
        caption: 'Deluxe King bedroom with contemporary furnishings and city views'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/537354952.jpg?k=b698c654ed1915ffc6f2ee4f64e5494b7e08b155d6894919e8b76634c2670b94&o=',
        caption: 'Elevated outdoor swimming pool and sun terrace'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/537354935.jpg?k=71e2403cb6d1d791eccd81b6823e45922cca679956eca967c5873bb63c40f582&o=',
        caption: 'Elegant guest lounge with modern seating and ambient lighting'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/537354941.jpg?k=49b06bfab2a381784cc8f7d008670041d1e789bc785596c8b0627729062fa196&o=',
        caption: 'Spacious guest suite featuring ergonomic desk and ambient lighting'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/92618982.jpg?k=bbe702b00ea4f4f65be769295e74a6b7cd5522b09884f4ac0338a6f7d5bb1c44&o=',
        caption: 'Twin executive guest room with plush bedding'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/92618970.jpg?k=278ff5b4069c27ecd819573eb3aba6c6e609fd41404cb3d2c1825dbd3160cd82&o=',
        caption: 'Premium room lounge corner with floor-to-ceiling windows'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/529951117.jpg?k=cc079529ba2cb94a926a7fe84646134c7d02f7d89ebc5b97a48f8f6740f43e45&o=',
        caption: 'En-suite bathroom with bathtub, rainfall shower and luxury toiletries'
      },
      {
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/92618346.jpg?k=0dc7c146232092f5d5ae967270ddab45072b47c159ebe97ff63accd3b8fea562&o=',
        caption: 'Refined hotel restaurant and dining salon'
      }
    ],
    amenities: [
      'Elevated Rooftop Swimming Pool & Sundeck',
      'Complimentary Beach & Mall Shuttle Bus',
      'Full-Service Luxury Spa & Hot Tub',
      '5 On-Site Dining Venues & Bars',
      '24/7 Modern Fitness Gymnasium',
      'High-Speed Wi-Fi',
      'Complimentary Covered Parking & Valet',
      '24/7 Concierge & Room Service',
      'Keyless Smart Entry'
    ],
    checkInTime: 'From 14:00',
    checkOutTime: 'Until 12:00',
    houseRules: [
      'No smoking in rooms (designated outdoor smoking areas available)',
      'No pets allowed',
      'Quiet hours after 22:30',
      'Valid Emirates ID or Passport required at check-in',
      'Maximum 2 guests per room'
    ],
    roomFeatures: [
      'King Bed or Twin Bed options with premium mattress',
      'Complimentary shuttle bus to Beach & Mall of the Emirates',
      'Individual climate control air conditioning',
      'En-suite bathroom with deep bathtub & rainfall shower',
      'Flat-screen Smart Satellite TV',
      'Minibar & complimentary tea/coffee maker',
      'Safety deposit box & ergonomic workstation'
    ],
    bookedRanges: []
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
