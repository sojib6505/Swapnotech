// =====================================================================
// 1) HomePage er jonno (purono shape). HomePage `portfolioData` import kore.
//    ⚠️ Ager real project data hariye gele ekhane placeholder dilam.
//    Apnar purono data thakle ei array ta tar sathe replace korun, shape ek-i rakhben.
// ====================================================================
import design1 from '../../public/images/portfolio/design/design1.png';
import design2 from '../../public/images/portfolio/design/design2.png';
import brand1 from '../../public/images/portfolio/design/brand1.png';
import vedio1 from '../../public/images/portfolio/vedio/vedio1.mp4'

export const portfolioData = [
  {
    id: 'p1',
    title: 'Freshmart E-commerce Platform',
    badgeLabel: 'Web Development',
    tag: 'E-commerce',
    summary: 'A full-stack storefront with fast catalog filtering, secure checkout and an easy-to-use admin panel.',
    visualPlaceholder: 'E-commerce Platform',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    caseStudy: {
      challenge: 'The client needed to move from selling over social media to a store that could handle orders on its own.',
      solution: 'We built a responsive storefront with product filtering, local payment options and an admin dashboard for managing orders.',
    },
  },
  {
    id: 'p2',
    title: 'Nova Coffee Brand Identity',
    badgeLabel: 'Branding',
    tag: 'Identity',
    summary: 'A warm, modern identity system covering logo, color, typography and packaging.',
    visualPlaceholder: 'Brand Identity',
    techStack: ['Logo', 'Guidelines', 'Packaging'],
    caseStudy: {
      challenge: 'A new coffee brand needed to stand out in a crowded local market with limited budget.',
      solution: 'We created a flexible identity and a short guideline so every touchpoint looks consistent.',
    },
  },
  {
    id: 'p3',
    title: 'Lumen Clinic Lead Campaign',
    badgeLabel: 'Marketing',
    tag: 'Campaign',
    summary: 'A paid campaign and landing page built to bring in qualified appointment requests.',
    visualPlaceholder: 'Marketing Campaign',
    techStack: ['Meta Ads', 'Google Ads', 'Landing page'],
    caseStudy: {
      challenge: 'The clinic had steady walk-ins but no reliable way to bring in new patients online.',
      solution: 'We set up tracking, tested creatives and tuned the landing page to lower the cost per lead.',
    },
  },
];

// =====================================================================
// 2) Notun Portfolio page er jonno
// =====================================================================
// ⚠️ Shob placeholder data. Real project ashle sudhu ei file e edit korun, code chhuté hobe na.
// tone: 'orange' | 'dark' | 'sand' | 'stone'  (image na thakle ei color block dekhabe)
// Real image add korte chaile item e `image: '/images/portfolio/xyz.jpg'` field dite parben
// (PortfolioPage e Art component e image support add kora jabe).
// featured: true dile "All" tab e dekhabe.

export const categories = [
  { id: 'all', label: 'All', blurb: 'A curated mix of our best work across every discipline.' },
  { id: 'branding', label: 'Branding', blurb: 'Identities that make businesses memorable.' },
  { id: 'design', label: 'Design', blurb: 'Posters, social creatives and print, crafted to stop the scroll.' },
  { id: 'video', label: 'Video', blurb: 'Reels, promos and films with pace and personality.' },
  { id: 'web', label: 'Web', blurb: 'Fast, responsive websites built to convert.' },
  { id: 'marketing', label: 'Marketing', blurb: 'Campaigns measured by results, not just reach.' },
];

export const portfolioItems = [
  // ---------- BRANDING ----------
  {
    id: 'b1', category: 'branding', title: 'NIRBAN DESIGN STUDIO.', client: '', year: 2025, tone: 'orange', featured: true,
    tagline: 'Crafting Spaces, Inspiring Lives.', colors: [ '#18181B', '#FFFFFF'], font: 'Sora',
    tags: ['Logo', 'Guidelines'],
    summary: 'Logo concept and design brief will be added after discussion and confirmation with the designer.', image: brand1
  },
  {
    id: 'b2', category: 'branding', title: 'Atlas Studio', client: 'Atlas Studio', year: 2025, tone: 'dark', featured: true,
    tagline: 'Architecture, clearly drawn.', colors: ['#18181B', '#FAFAFA', '#F97316'], font: 'Inter',
    tags: ['Logo', 'Stationery', 'Website'],
    summary: 'Placeholder brief: a design studio wanted a quiet, confident identity that lets its work speak.',
  },
  {
    id: 'b3', category: 'branding', title: 'Bloom Skincare', client: 'Bloom', year: 2024, tone: 'sand',
    tagline: 'Gentle by nature.', colors: ['#FED7AA', '#7C2D12', '#FFFFFF'], font: 'Playfair',
    tags: ['Logo', 'Packaging', 'Social kit'],
    summary: 'Placeholder brief: a skincare startup needed a soft, trustworthy look across packaging and digital.',
  },

  // ---------- DESIGN ----------
  { id: 'd2', category: 'design', title: 'Social Media Pack', client: 'Travel Architect', year: 2025, tone: 'dark', aspect: 'square', featured: true,image: design1 },
  { id: 'd1', category: 'design', title: 'Occasion-Based Design', client: 'Freshmart', year: 2025, tone: 'orange', aspect: 'portrait', featured: true,image: design2  },
  { id: 'd3', category: 'design', title: 'Event Banner', client: 'Atlas Studio', year: 2025, tone: 'sand', aspect: 'landscape' },
  { id: 'd4', category: 'design', title: 'Menu Design', client: 'Spice Route', year: 2024, tone: 'stone', aspect: 'portrait' },
  { id: 'd5', category: 'design', title: 'Product Ad Creative', client: 'Bloom', year: 2024, tone: 'orange', aspect: 'square' },
  { id: 'd6', category: 'design', title: 'Brochure Cover', client: 'Lumen Clinic', year: 2024, tone: 'dark', aspect: 'landscape',  },

  // ---------- VIDEO ----------
  // videoUrl: YouTube/Vimeo embed link, jemon 'https://www.youtube.com/embed/VIDEO_ID'
  { id: 'v1', category: 'video', title: 'Brand Promo Reel', client: 'Nova Coffee', year: 2025, tone: 'dark', format: 'reel', duration: '0:30', videoUrl:vedio1},
  { id: 'v2', category: 'video', title: 'Product Launch Film', client: 'Freshmart', year: 2025, tone: 'orange', format: 'wide', duration: '1:20', videoUrl: '', featured: true },
  { id: 'v3', category: 'video', title: 'Customer Story', client: 'Lumen Clinic', year: 2024, tone: 'stone', format: 'wide', duration: '2:05', videoUrl: '' },
  { id: 'v4', category: 'video', title: 'Offer Teaser', client: 'Spice Route', year: 2025, tone: 'sand', format: 'reel', duration: '0:15', videoUrl: '' },
  { id: 'v5', category: 'video', title: 'Event Recap', client: 'Atlas Studio', year: 2024, tone: 'dark', format: 'reel', duration: '0:45', videoUrl: '' },

  // ---------- WEB ----------
  {
    id: 'w1', category: 'web', title: 'Freshmart Storefront', client: 'Freshmart', year: 2025, tone: 'orange', featured: true,
    domain: 'freshmart.example', liveUrl: '', stack: ['React', 'Node.js', 'MongoDB'],
    summary: 'Placeholder: an e-commerce storefront with fast catalog filtering and a simple checkout.',
  },
  {
    id: 'w2', category: 'web', title: 'Archway Interiors', client: 'Archway', year: 2025, tone: 'stone',
    domain: 'archway.example', liveUrl: '', stack: ['React', 'Tailwind CSS'],
    summary: 'Placeholder: a portfolio-led website for an interior design studio.',
  },
  {
    id: 'w3', category: 'web', title: 'Lumen Clinic', client: 'Lumen Clinic', year: 2024, tone: 'sand',
    domain: 'lumenclinic.example', liveUrl: '', stack: ['React', 'Firebase'],
    summary: 'Placeholder: a clinic website with online appointment requests.',
  },

  // ---------- MARKETING ----------
  {
    id: 'm1', category: 'marketing', title: 'Seasonal Collection Launch', client: 'Freshmart', year: 2025, featured: true,
    goal: 'Drive online sales during a seasonal peak.', channels: ['Meta Ads', 'Reels', 'Email'],
    metrics: [{ value: '3.4x', label: 'ROAS' }, { value: '120K', label: 'Reach' }, { value: '+68%', label: 'Orders' }],
  },
  {
    id: 'm2', category: 'marketing', title: 'Lead Generation Campaign', client: 'Lumen Clinic', year: 2025,
    goal: 'Fill the appointment calendar with qualified leads.', channels: ['Google Ads', 'Landing page'],
    metrics: [{ value: '420', label: 'Leads' }, { value: '-35%', label: 'Cost / lead' }, { value: '9.1%', label: 'Conversion' }],
  },
  {
    id: 'm3', category: 'marketing', title: 'Brand Awareness Push', client: 'Nova Coffee', year: 2024,
    goal: 'Introduce a new brand to the local audience.', channels: ['Instagram', 'TikTok', 'Influencers'],
    metrics: [{ value: '1.2M', label: 'Impressions' }, { value: '+4.8K', label: 'Followers' }, { value: '6.3%', label: 'Engagement' }],
  },
];