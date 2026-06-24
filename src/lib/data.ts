import tvImg from "@/assets/cat-tv.jpg";
import speakerImg from "@/assets/cat-speakers.jpg";
import coolerImg from "@/assets/cat-cooler.jpg";
import washerImg from "@/assets/cat-washer.jpg";
import kitchenImg from "@/assets/cat-kitchen.jpg";

import digieOled from "@/assets/digie-oled.png";
import digieOled2 from "@/assets/digie-oled2.jpg";
import digie24 from "@/assets/DIGIE-24.png";
import digie26 from "@/assets/DIGIE-26.png";
import digie35 from "@/assets/DIGIE-35.png";
import dgSS02 from "@/assets/DG-SS02.png";
import dgSS03 from "@/assets/DG-SS03.png";
import dgSS04 from "@/assets/DG-SS04.png";
import dgSS05 from "@/assets/DG-SS05.png";
import dgSS06 from "@/assets/DG-SS06.png";
import airCooler from "@/assets/Air-Cooler-01.jpg";
import breeze50 from "@/assets/BREEZE-50-cooler.png";
import washingMachine from "@/assets/washing-machine-01.jpg";
import cookTop from "@/assets/COOK-TOP-Photoroom.png";
import kettle from "@/assets/KETTLE-Photoroom-2.png";
import partySpeaker from "@/assets/party-speaker-01.jpg";
import multimediaSpeaker from "@/assets/multimedia-speaker-01.jpg";
import digiSpeaker1 from "@/assets/digi-speaker1.jpg";
import ledTv from "@/assets/led-tv-01.jpg";
import heroTv from "@/assets/hero-tv.jpg";
import smallAppliance from "@/assets/Small-Appliance-01.jpg";
// Add these imports at the top of data.ts
import ledTvBanner from "@/assets/led-tv-banner.avif";
import speakerBanner from "@/assets/speaker.avif";
import airCoolerBanner from "@/assets/air-cooler-banner.jpg";
import washerBanner from "@/assets/washing-machine-banner.avif";
import kitchenBanner from "@/assets/kitchen appliances.avif";
import accessoriesBanner from "@/assets/accesories.avif";
import smarttv from "@/assets/smart-tv.avif";
export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: boolean;
  bestSeller?: boolean;
  featured?: boolean;
  shortDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
  warranty: string;
}

export const categories: Category[] = [
  {
    id: "smart-tv",
    name: "Smart TVs",
    tagline: "Immersive 4K cinema at home",
    image: smarttv,
    count: 24,
  },
  {
    id: "led-tv",
    name: "LED TVs",
    tagline: "Crisp colour, everyday brilliance",
    image: ledTvBanner,
    count: 18,
  },
  {
    id: "speakers",
    name: "Speakers",
    tagline: "Studio sound, sculpted form",
    image: speakerBanner,
    count: 31,
  },
  {
    id: "air-coolers",
    name: "Air Coolers",
    tagline: "Cool, quiet, efficient",
    image: airCoolerBanner,
    count: 12,
  },
  {
    id: "washing-machines",
    name: "Washing Machines",
    tagline: "Effortless, precise laundry",
    image: washerBanner,
    count: 16,
  },
  {
    id: "kitchen",
    name: "Kitchen Appliances",
    tagline: "Craft meals with confidence",
    image: kitchenBanner,
    count: 27,
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "Refine every setup",
    image: accessoriesBanner,
    count: 40,
  },
];

export const brands = ["Digie", "Aurelis", "Voxel", "Nimbus", "Forge", "Lumin"];

const catName: Record<string, string> = {
  "smart-tv": "Smart TVs",
  "led-tv": "LED TVs",
  speakers: "Speakers",
  "air-coolers": "Air Coolers",
  "washing-machines": "Washing Machines",
  kitchen: "Kitchen Appliances",
  accessories: "Accessories",
};

function makeProduct(
  id: string,
  name: string,
  categoryId: string,
  brand: string,
  price: number,
  mrp: number,
  rating: number,
  reviews: number,
  image: string,
  opts: Partial<Product> = {},
): Product {
  return {
    id,
    name,
    categoryId,
    category: catName[categoryId],
    brand,
    price,
    mrp,
    rating,
    reviews,
    image,
    inStock: true,
    shortDescription:
      "Engineered with precision and built to elevate your everyday with refined performance and lasting reliability.",
    features: [
      "Premium grade build with anti-glare finish",
      "Energy efficient with intelligent power modes",
      "Whisper-quiet operation under load",
      "Connected app control & OTA updates",
    ],
    specs: [
      { label: "Model Year", value: "2025" },
      { label: "Warranty", value: "2 Years" },
      { label: "Energy Rating", value: "5 Star" },
      { label: "Connectivity", value: "Wi-Fi 6 + BT 5.3" },
    ],
    warranty: "2 Years comprehensive + 1 Year on panel",
    ...opts,
  };
}

export const products: Product[] = [
  // ── Smart TVs ──────────────────────────────────────────────────────────────
  makeProduct(
    "digie-oled-65",
    'Digie OLED 65" Infinity',
    "smart-tv",
    "Digie",
    134990,
    169990,
    4.9,
    312,
    digieOled,
    { badge: "New", featured: true },
  ),
  makeProduct(
    "digie-oled-55",
    'Digie OLED 55" Pro',
    "smart-tv",
    "Digie",
    94990,
    119990,
    4.8,
    201,
    digieOled2,
    { featured: true },
  ),
  makeProduct(
    "digie-35",
    'Digie Smart TV 35"',
    "smart-tv",
    "Digie",
    42990,
    54990,
    4.6,
    178,
    digie35,
    { badge: "Value", featured: true },
  ),
  makeProduct(
    "digie-oled-65",
    'Digie LED 65" Infinity',
    "smart-tv",
    "Aurelis",
    134990,
    169990,
    4.9,
    312,
    heroTv,
    { badge: "New", featured: true },
  ),

  // ── LED TVs ────────────────────────────────────────────────────────────────
  makeProduct("digie-24", 'Digie LED 24" HD', "led-tv", "Digie", 12990, 16990, 4.4, 310, digie24, {
    badge: "Best Seller",
    bestSeller: true,
  }),
  makeProduct(
    "digie-26",
    'Digie LED 26" Vivid',
    "led-tv",
    "Digie",
    15990,
    19990,
    4.5,
    265,
    digie26,
    { featured: true },
  ),
  makeProduct(
    "digie-led-43",
    'Digie LED 43" Vivid',
    "led-tv",
    "Nimbus",
    28990,
    37990,
    4.5,
    421,
    ledTv,
    { badge: "Value" },
  ),
  makeProduct(
    "digie-led-32",
    'Digie LED 32" Edge',
    "led-tv",
    "Lumin",
    16990,
    21990,
    4.4,
    256,
    ledTv,
    { bestSeller: true },
  ),

  // ── Speakers ───────────────────────────────────────────────────────────────
  makeProduct(
    "digie-ss02",
    "Digie SS02 Soundbar",
    "speakers",
    "Digie",
    8990,
    11990,
    4.5,
    189,
    dgSS02,
    { badge: "New", featured: true },
  ),
  makeProduct(
    "digie-ss03",
    "Digie SS03 Tower",
    "speakers",
    "Digie",
    12990,
    15990,
    4.6,
    143,
    dgSS03,
    { featured: true },
  ),
  makeProduct("digie-ss04", "Digie SS04 Party", "speakers", "Digie", 9990, 13990, 4.4, 201, dgSS04),
  makeProduct(
    "digie-ss05",
    "Digie SS05 Wireless",
    "speakers",
    "Digie",
    6990,
    8990,
    4.3,
    167,
    dgSS05,
  ),
  makeProduct("digie-ss06", "Digie SS06 Mini", "speakers", "Digie", 4990, 6990, 4.2, 134, dgSS06),
  makeProduct(
    "digie-party-spk",
    "Digie Party Speaker 80W",
    "speakers",
    "Digie",
    14990,
    18990,
    4.7,
    220,
    partySpeaker,
    { bestSeller: true },
  ),
  makeProduct(
    "digie-multimedia-spk",
    "Digie Multimedia Speaker",
    "speakers",
    "Digie",
    3990,
    5490,
    4.3,
    312,
    multimediaSpeaker,
  ),

  makeProduct(
    "digie-orb",
    "Digie Orb Wireless",
    "speakers",
    "Aurelis",
    12990,
    16990,
    4.6,
    309,
    digiSpeaker1,
    { badge: "Best Seller", bestSeller: true },
  ),

  // ── Air Coolers ────────────────────────────────────────────────────────────
  makeProduct(
    "digie-breeze50",
    "Digie Breeze 50L",
    "air-coolers",
    "Digie",
    10990,
    13990,
    4.5,
    198,
    breeze50,
    { badge: "New", featured: true },
  ),
  makeProduct(
    "digie-aircooler",
    "Digie AirCool 65L",
    "air-coolers",
    "Digie",
    13990,
    17990,
    4.4,
    154,
    airCooler,
  ),
  makeProduct(
    "digie-tower-cool",
    "Digie TowerCool 65L",
    "air-coolers",
    "Voxel",
    14990,
    18990,
    4.3,
    176,
    airCooler,
    { featured: true },
  ),
  makeProduct(
    "digie-desert-cool",
    "Digie DesertCool 90L",
    "air-coolers",
    "Nimbus",
    11990,
    15990,
    4.2,
    134,
    airCooler,
  ),

  // ── Washing Machines ───────────────────────────────────────────────────────
  makeProduct(
    "digie-frontload-7",
    "Digie FrontLoad 7kg",
    "washing-machines",
    "Digie",
    34990,
    44990,
    4.6,
    187,
    washingMachine,
    { badge: "New", featured: true },
  ),
  makeProduct(
    "digie-frontload-8",
    "Digie FrontLoad 8kg AI",
    "washing-machines",
    "Forge",
    42990,
    54990,
    4.7,
    211,
    washingMachine,
    { badge: "Editor's Pick", bestSeller: true },
  ),
  makeProduct(
    "digie-topload-7",
    "Digie TopLoad 7kg",
    "washing-machines",
    "Lumin",
    21990,
    27990,
    4.4,
    188,
    washingMachine,
  ),

  // ── Kitchen ────────────────────────────────────────────────────────────────
  makeProduct(
    "digie-cooktop",
    "Digie Glass Cook Top",
    "kitchen",
    "Digie",
    5990,
    7990,
    4.6,
    341,
    cookTop,
    { badge: "Trending", featured: true },
  ),
  makeProduct(
    "digie-kettle",
    "Digie Smart Kettle 1.8L",
    "kitchen",
    "Digie",
    2490,
    3490,
    4.4,
    289,
    kettle,
  ),
  makeProduct(
    "digie-small-appl",
    "Digie Small Appliance Kit",
    "kitchen",
    "Digie",
    3990,
    5490,
    4.3,
    156,
    smallAppliance,
  ),
  makeProduct(
    "digie-chef-mixer",
    "Digie Chef Mixer 1000W",
    "kitchen",
    "Aurelis",
    8990,
    11990,
    4.6,
    402,
    kitchenImg,
    { featured: true },
  ),
  makeProduct(
    "digie-induction",
    "Digie Induction Glide",
    "kitchen",
    "Voxel",
    4990,
    6990,
    4.5,
    521,
    kitchenImg,
    { badge: "Trending" },
  ),
  makeProduct(
    "digie-airfry",
    "Digie AirFry 5.5L",
    "kitchen",
    "Nimbus",
    7990,
    10990,
    4.7,
    367,
    kitchenImg,
    { bestSeller: true },
  ),

  // ── Accessories ────────────────────────────────────────────────────────────
  makeProduct(
    "digie-remote",
    "Digie Smart Remote",
    "accessories",
    "Forge",
    2490,
    3490,
    4.3,
    98,
    speakerImg,
  ),
  makeProduct(
    "digie-wallmount",
    "Digie Tilt Wall Mount",
    "accessories",
    "Lumin",
    1990,
    2990,
    4.5,
    145,
    speakerImg,
  ),
  makeProduct(
    "digie-mini-orb",
    "Digie Orb Mini",
    "accessories",
    "Aurelis",
    5990,
    7990,
    4.6,
    233,
    speakerImg,
    { badge: "New" },
  ),
];

export const reviews = [
  {
    name: "Ananya Rao",
    city: "Ghaziabad",
    rating: 5,
    text: "The Digie OLED transformed my living room. The picture quality and the design are simply on another level.",
    product: 'Digie OLED 65"',
  },
  {
    name: "Vikram Mehta",
    city: "Noida",
    rating: 5,
    text: "Forge Soundstage delivers cinema-grade audio. Setup was effortless and the support team was outstanding.",
    product: "Forge Soundstage 5.1",
  },
  {
    name: "Priya Nair",
    city: "Ghaziabad",
    rating: 4,
    text: "Premium feel at a fair price. The washing machine is whisper quiet and the app control is genuinely useful.",
    product: "Forge FrontLoad 8kg",
  },
  {
    name: "Rohit Sharma",
    city: "Delhi",
    rating: 5,
    text: "Became a Digie dealer last year — best decision for my store. Margins and brand pull are excellent.",
    product: "Dealer Partner",
  },
];

export const faqs = [
  {
    q: "What warranty do Digie products carry?",
    a: "Every product includes a minimum 2-year comprehensive warranty, with extended coverage on panels and motors. Warranty is fully transferable and serviceable across 400+ centres in India.",
  },
  {
    q: "How fast is delivery?",
    a: "Metro orders are delivered within 24–48 hours. Remaining serviceable pincodes receive delivery within 2–5 business days with free installation on large appliances.",
  },
  {
    q: "Can I become a Digie dealer?",
    a: "Yes. We are actively expanding our dealer network across India. Apply through the Dealer Network page and our regional team will reach out within 3 working days.",
  },
  {
    q: "Do you offer EMI and financing?",
    a: "We offer no-cost EMI on leading credit and debit cards, plus partner financing for orders above ₹15,000.",
  },
  {
    q: "What is the return policy?",
    a: "Unopened products can be returned within 10 days. Defective units are replaced free of charge under our quick-swap promise.",
  },
];

export const stats = [
  { value: 400, suffix: "+", label: "Service centres" },
  { value: 25, suffix: " yrs", label: "Of engineering" },
  { value: 3, suffix: "M+", label: "Homes powered" },
  { value: 1200, suffix: "+", label: "Dealer partners" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getRelated = (p: Product) =>
  products.filter((x) => x.categoryId === p.categoryId && x.id !== p.id).slice(0, 4);
