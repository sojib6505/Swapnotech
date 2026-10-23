// Monthly plans: tier gulor values screenshot theke neya
// Cell value: true = included (✓), false = not included (—), string = text dekhabe

export const monthlyTiers = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For new brands finding their voice.',
    posts: 8,
    highlights: ['2 platforms, 2 reels, 4 stories', 'Basic Meta Ads', 'Basic analytics & strategy'],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For brands ready to grow consistently.',
    posts: 12,
    featured: true,
    highlights: ['4 reels, 8 stories, 2 carousels', 'Meta Ads, basic SEO & Pixel / CAPI', 'Analytics & strategy included'],
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For teams running multi-channel growth.',
    posts: 16,
    highlights: ['3 platforms, 8 reels, 12 stories', 'Meta + Google Ads, full SEO & Pixel / CAPI', 'Advanced reporting & account manager'],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'A dedicated, full-service partnership.',
    posts: 20,
    highlights: ['4+ platforms, 12 reels, 16 stories', 'Meta, Google & TikTok Ads', 'Dedicated account manager'],
  },
];

// values order: [Starter, Growth, Scale, Premium]
export const featureGroups = [
  {
    label: 'Content',
    rows: [
      { label: 'Platforms', values: ['2', '2', '3', '4+'] },
      { label: 'Static posts', values: ['8', '12', '16', '20'] },
      { label: 'Reels', values: ['2', '4', '8', '12'] },
      { label: 'Stories', values: ['4', '8', '12', '16'] },
      { label: 'Carousel posts', values: [false, '2', '4', '6'] },
    ],
  },
  {
    label: 'Ads & Growth',
    rows: [
      { label: 'Meta Ads', values: ['Basic', true, true, true] },
      { label: 'Google Ads', values: [false, false, true, true] },
      { label: 'TikTok Ads', values: [false, false, false, true] },
      { label: 'SEO', values: [false, 'Basic', true, true] },
      { label: 'Pixel / CAPI setup', values: [false, 'Basic', true, true] },
    ],
  },
  {
    label: 'Support',
    rows: [
      { label: 'Analytics & reporting', values: ['Basic', true, 'Advanced', 'Advanced'] },
      { label: 'Strategy & planning', values: ['Basic', true, true, true] },
      { label: 'Account manager', values: [false, false, true, 'Dedicated'] },
    ],
  },
  {
    label: 'Billing',
    rows: [{ label: 'Ad spend', values: ['Extra', 'Extra', 'Extra', 'Extra'] }],
  },
];

export const adSpendNote = 'Ad spend is not included in the plan price. Billing: monthly, in advance.';

// One-time / project based packages (ager data theke)
export const projectPackages = [
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Content planning and production support.',
    features: [
      'Editorial calendar & content roadmap',
      'Visual asset production for social & web',
      'Copywriting & storytelling frameworks',
      'Multi-format asset delivery',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Support for digital channels and campaigns.',
    features: [
      'Audience research & campaign setup',
      'Cross-channel advertising coordination',
      'Conversion tracking & funnel analytics',
      'Monthly optimization & performance reviews',
    ],
  },
  {
    id: 'brand-development',
    title: 'Brand Development',
    description: 'A foundation for a consistent brand presence.',
    features: [
      'Visual identity & design principles',
      'Logo suite, color palettes & typography',
      'Digital brand guidelines documentation',
      'Core stationery & collateral mockups',
    ],
  },
  {
    id: 'business-growth',
    title: 'Business Growth',
    description: 'A conversation about connected creative and digital needs.',
    features: [
      'Comprehensive digital touchpoint audit',
      'Web application & platform roadmapping',
      'Ongoing technical & creative advisory',
      'Custom SLA & dedicated project cadence',
    ],
  },
];