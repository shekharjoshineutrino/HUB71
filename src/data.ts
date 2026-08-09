export type Redemption = 'instant' | 'booking' | 'apply'

export type Offer = {
  id: string
  icon: string
  partner: string
  initials: string
  cat: string
  type: 'Software' | 'Service' | 'Both'
  lifecycle: string
  usd: number
  valueLabel: string
  valueAED: number
  exclusive: boolean
  short: string
  about: string
  why: string
  whoFor: string
  included: string[]
  website: string
  hq: string
  founded: string
  redemption: Redemption
  status: 'available' | 'requested' | 'redeemed'
  claimed: number
  contact: string
  views: number
  clicks: number
  redemptions: number
}

export type Category = { id: string; name: string; icon: string; desc: string; g1: string; g2: string }

export const categories: Category[] = [
  { id: 'build', name: 'Build & Tech', icon: 'code', desc: 'Dev tools, APIs, and AI to ship faster.', g1: '#6d5efc', g2: '#9b8bff' },
  { id: 'growth', name: 'Growth & Marketing', icon: 'trending', desc: 'Reach customers and grow revenue.', g1: '#ec4899', g2: '#fb7bb3' },
  { id: 'talent', name: 'Talent & HR', icon: 'users', desc: 'Hire, pay, and manage your team.', g1: '#0ea5a3', g2: '#2fd0b6' },
  { id: 'finance', name: 'Finance & Legal', icon: 'scale', desc: 'Banking, payments, and legal setup.', g1: '#2563eb', g2: '#5b8bff' },
  { id: 'ops', name: 'Operations', icon: 'settings', desc: 'Run the day-to-day smoothly.', g1: '#f59e0b', g2: '#fbbf5a' },
  { id: 'infra', name: 'Infrastructure & Tools', icon: 'server', desc: 'Cloud, hosting, and core infrastructure.', g1: '#0891b2', g2: '#2bc0e0' },
]
export const categoryById = (id: string) => categories.find((c) => c.id === id)

export const valueBands = ['$10,000+', 'Up to $10,000', 'Up to $1,000']
export const types = ['Software', 'Service', 'Both']
export const lifecycles = ['Vision', 'Product', 'Go-to-market', 'Growth']
export const sorts = ['Most viewed', 'Highest value', 'A – Z']
export const bandOf = (usd: number) => (usd >= 10000 ? '$10,000+' : usd > 1000 ? 'Up to $10,000' : 'Up to $1,000')

export const offers: Offer[] = [
  { id: 'openai', icon: 'sparkles', partner: 'OpenAI', initials: 'OA', cat: 'build', type: 'Software', lifecycle: 'Product', usd: 2500, valueLabel: '$2,500 API credits', valueAED: 9200, exclusive: false, short: 'API credits for building with GPT models.', about: 'OpenAI offers general-purpose AI models through a simple, powerful API.', why: 'Add AI features — chat, search, extraction — without training your own models.', whoFor: 'Teams building AI-powered product features.', included: ['$2,500 in API credits', 'Priority docs and usage guides'], website: 'openai.com', hq: 'San Francisco, US', founded: '2015', redemption: 'apply', status: 'available', claimed: 5, contact: 'Dana Kim', views: 505, clicks: 240, redemptions: 40 },
  { id: 'github', icon: 'git-branch', partner: 'GitHub', initials: 'GH', cat: 'build', type: 'Software', lifecycle: 'Product', usd: 9000, valueLabel: 'Enterprise free · 12 months', valueAED: 33000, exclusive: false, short: 'Code hosting, CI/CD, and collaboration.', about: 'GitHub is where developers build, ship, and maintain software together.', why: 'Version control, code review, and automation your engineers already know.', whoFor: 'Any startup with an engineering team.', included: ['GitHub Enterprise free for 12 months', '3,000 CI/CD minutes', 'Advanced security features'], website: 'github.com', hq: 'San Francisco, US', founded: '2008', redemption: 'apply', status: 'redeemed', claimed: 14, contact: 'Marcus Vale', views: 470, clicks: 300, redemptions: 180 },
  { id: 'auth0', icon: 'key', partner: 'Auth0', initials: 'Au', cat: 'build', type: 'Software', lifecycle: 'Product', usd: 12000, valueLabel: 'Free for 1 year', valueAED: 44000, exclusive: false, short: 'Authentication and authorization as a service.', about: 'Auth0 by Okta provides drop-in authentication for apps and APIs.', why: 'Ship secure login, SSO, and MFA in days instead of building it yourself.', whoFor: 'Startups that need production-grade auth fast.', included: ['Free Auth0 for 12 months', 'Up to 10,000 monthly active users'], website: 'auth0.com', hq: 'Bellevue, US', founded: '2013', redemption: 'apply', status: 'available', claimed: 9, contact: 'Priya Raman', views: 306, clicks: 150, redemptions: 95 },
  { id: 'hubspot', icon: 'megaphone', partner: 'HubSpot', initials: 'HS', cat: 'growth', type: 'Software', lifecycle: 'Go-to-market', usd: 60000, valueLabel: '90% off year one', valueAED: 220000, exclusive: true, short: 'CRM, marketing, and sales in one platform.', about: 'HubSpot is a customer platform for marketing, sales, and service.', why: 'One system for your pipeline, campaigns, and support as you scale.', whoFor: 'Startups with under $2M funding building go-to-market.', included: ['Up to 90% off year one, 50% year two', 'Guided onboarding', 'HubSpot Academy access'], website: 'hubspot.com/startups', hq: 'Cambridge, US', founded: '2006', redemption: 'apply', status: 'requested', claimed: 6, contact: 'Elena Ruiz', views: 556, clicks: 260, redemptions: 31 },
  { id: 'mailchimp', icon: 'mail', partner: 'Mailchimp', initials: 'Mc', cat: 'growth', type: 'Software', lifecycle: 'Go-to-market', usd: 3000, valueLabel: '6 months free', valueAED: 7300, exclusive: false, short: 'Email marketing and automation.', about: 'Mailchimp helps you send campaigns and automate customer journeys.', why: 'Launch newsletters and lifecycle emails without a marketing hire.', whoFor: 'Early teams starting email and audience building.', included: ['6 months on the Standard plan free', 'Automation and audience tools'], website: 'mailchimp.com', hq: 'Atlanta, US', founded: '2001', redemption: 'apply', status: 'redeemed', claimed: 11, contact: 'Tom Whitby', views: 300, clicks: 180, redemptions: 120 },
  { id: 'semrush', icon: 'search', partner: 'Semrush', initials: 'Se', cat: 'growth', type: 'Software', lifecycle: 'Go-to-market', usd: 5000, valueLabel: '3 months Guru free', valueAED: 5500, exclusive: false, short: 'SEO, content, and competitor research.', about: 'Semrush is an online visibility and marketing analytics platform.', why: 'Find keywords, track rankings, and study competitors in one place.', whoFor: 'Teams investing in SEO and content.', included: ['3 months of the Guru plan free', 'Keyword and backlink tools'], website: 'semrush.com', hq: 'Boston, US', founded: '2008', redemption: 'apply', status: 'available', claimed: 8, contact: 'Noor Haddad', views: 240, clicks: 140, redemptions: 88 },
  { id: 'deel', icon: 'globe', partner: 'Deel', initials: 'De', cat: 'talent', type: 'Both', lifecycle: 'Growth', usd: 8000, valueLabel: 'Free payroll · 1 year', valueAED: 29000, exclusive: false, short: 'Global payroll, hiring, and compliance.', about: 'Deel lets you hire, pay, and manage teams in 150+ countries.', why: 'Hire internationally without setting up local entities.', whoFor: 'Startups hiring across borders.', included: ['Free global payroll for 12 months', 'Contractor management and compliance'], website: 'deel.com', hq: 'San Francisco, US', founded: '2019', redemption: 'apply', status: 'available', claimed: 4, contact: 'Sofia Lindqvist', views: 274, clicks: 120, redemptions: 22 },
  { id: 'remote', icon: 'users', partner: 'Remote', initials: 'Re', cat: 'talent', type: 'Service', lifecycle: 'Growth', usd: 6000, valueLabel: '3 months free + setup', valueAED: 22000, exclusive: false, short: 'Employer of record and global HR.', about: 'Remote helps you employ and pay people anywhere, compliantly.', why: 'Onboard your first international hires with an EOR handling the rest.', whoFor: 'Teams making their first global hires.', included: ['3 months of EOR fees waived', 'Guided onboarding session'], website: 'remote.com', hq: 'San Francisco, US', founded: '2019', redemption: 'apply', status: 'available', claimed: 3, contact: 'Kai Bennett', views: 180, clicks: 90, redemptions: 24 },
  { id: 'lattice', icon: 'target', partner: 'Lattice', initials: 'La', cat: 'talent', type: 'Software', lifecycle: 'Growth', usd: 9000, valueLabel: 'Demo + 50% off', valueAED: 9000, exclusive: false, short: 'Performance and engagement management.', about: 'Lattice brings reviews, goals, and engagement into one platform.', why: 'Build a performance culture early with reviews and 1:1s.', whoFor: 'Teams of 15+ formalising people processes.', included: ['Personalised product demo', '50% off the first year'], website: 'lattice.com', hq: 'San Francisco, US', founded: '2015', redemption: 'apply', status: 'available', claimed: 2, contact: 'Ana Duarte', views: 150, clicks: 70, redemptions: 18 },
  { id: 'brex', icon: 'credit-card', partner: 'Brex', initials: 'Br', cat: 'finance', type: 'Both', lifecycle: 'Growth', usd: 50000, valueLabel: '$50,000 in perks', valueAED: 183000, exclusive: true, short: 'Corporate cards and business banking.', about: 'Brex offers cards, banking, and spend management for startups.', why: 'Get a corporate card and banking without a personal guarantee.', whoFor: 'Incorporated startups managing spend.', included: ['$50,000+ in partner perks', 'Corporate card, no personal guarantee', 'Business banking account'], website: 'brex.com', hq: 'San Francisco, US', founded: '2017', redemption: 'apply', status: 'requested', claimed: 5, contact: 'Jordan Blake', views: 402, clicks: 180, redemptions: 22 },
  { id: 'stripe', icon: 'wallet', partner: 'Stripe', initials: 'St', cat: 'finance', type: 'Software', lifecycle: 'Go-to-market', usd: 5000, valueLabel: 'Waived fees on first $50k', valueAED: 18000, exclusive: false, short: 'Payments infrastructure for the internet.', about: 'Stripe is used by millions of businesses to accept payments online.', why: 'Start charging customers with a few lines of code.', whoFor: 'Startups accepting online payments.', included: ['Processing fees waived on first $50,000', 'Priority onboarding'], website: 'stripe.com', hq: 'San Francisco, US', founded: '2010', redemption: 'apply', status: 'redeemed', claimed: 13, contact: 'Mei Chen', views: 351, clicks: 190, redemptions: 140 },
  { id: 'amara', icon: 'scale', partner: 'Amara & Partners', initials: 'AP', cat: 'finance', type: 'Service', lifecycle: 'Vision', usd: 15000, valueLabel: '20 free advisory hours', valueAED: 55000, exclusive: true, short: 'UAE corporate and legal advisory.', about: 'Amara & Partners is a UAE legal consultancy for startups.', why: 'Incorporate in ADGM and get contracts right from day one.', whoFor: 'Startups incorporating or operating in Abu Dhabi.', included: ['20 free advisory hours', 'ADGM incorporation guidance', 'Standard contract templates'], website: 'amarapartners.ae', hq: 'Abu Dhabi, UAE', founded: '2016', redemption: 'apply', status: 'available', claimed: 7, contact: 'Omar Farouk', views: 198, clicks: 95, redemptions: 30 },
  { id: 'notion', icon: 'notebook', partner: 'Notion', initials: 'No', cat: 'ops', type: 'Software', lifecycle: 'Vision', usd: 3000, valueLabel: '6 months free + $1,000', valueAED: 11000, exclusive: false, short: 'Docs, wiki, and projects in one workspace.', about: 'Notion is a connected workspace for docs, wikis, and projects.', why: 'Keep company knowledge and projects in one organised place.', whoFor: 'Any team that lives in docs and tasks.', included: ['6 months of Notion Plus free', '$1,000 in Notion AI credits'], website: 'notion.so/startups', hq: 'San Francisco, US', founded: '2016', redemption: 'apply', status: 'redeemed', claimed: 15, contact: 'Lucy Grant', views: 388, clicks: 230, redemptions: 160 },
  { id: 'airtable', icon: 'table', partner: 'Airtable', initials: 'At', cat: 'ops', type: 'Software', lifecycle: 'Product', usd: 1000, valueLabel: '$1,000 in credits', valueAED: 3700, exclusive: false, short: 'Build apps and databases, no code.', about: 'Airtable is a flexible platform for building apps and databases.', why: 'Run ops workflows without waiting on engineering.', whoFor: 'Ops and non-technical teams.', included: ['$1,000 in Airtable credits', 'Template gallery access'], website: 'airtable.com', hq: 'San Francisco, US', founded: '2012', redemption: 'apply', status: 'available', claimed: 10, contact: 'Ravi Shah', views: 233, clicks: 140, redemptions: 96 },
  { id: 'slack', icon: 'message', partner: 'Slack', initials: 'Sl', cat: 'ops', type: 'Software', lifecycle: 'Go-to-market', usd: 6000, valueLabel: '25% off Pro', valueAED: 6000, exclusive: false, short: 'Team messaging and collaboration.', about: 'Slack is the messaging hub where teams get work done.', why: 'Move team comms out of email and into organised channels.', whoFor: 'Growing teams that need structured comms.', included: ['25% off the Pro plan for 12 months', 'Unlimited message history'], website: 'slack.com', hq: 'San Francisco, US', founded: '2013', redemption: 'apply', status: 'available', claimed: 9, contact: 'Erin Doyle', views: 210, clicks: 130, redemptions: 85 },
  { id: 'gcp', icon: 'cloud', partner: 'Google Cloud', initials: 'GC', cat: 'infra', type: 'Software', lifecycle: 'Product', usd: 200000, valueLabel: '$200,000 in credits', valueAED: 734000, exclusive: true, short: 'Cloud compute, data, and AI infrastructure.', about: 'Google Cloud provides scalable compute, storage, data, and AI infrastructure.', why: 'Run your product on the same infrastructure as global companies.', whoFor: 'Early-stage startups building on the cloud.', included: ['Up to $200,000 in credits over 2 years', 'Technical training and reviews', 'Startup community access'], website: 'cloud.google.com/startup', hq: 'Mountain View, US', founded: '2008', redemption: 'apply', status: 'requested', claimed: 8, contact: 'Jordan Reyes', views: 910, clicks: 402, redemptions: 58 },
  { id: 'aws', icon: 'server', partner: 'AWS Activate', initials: 'AW', cat: 'infra', type: 'Software', lifecycle: 'Product', usd: 100000, valueLabel: '$100,000 in credits', valueAED: 367000, exclusive: true, short: 'The most broadly adopted cloud platform.', about: 'Amazon Web Services offers 200+ cloud services from data centres globally.', why: 'Scale from prototype to production on proven infrastructure.', whoFor: 'Startups that have not used AWS Activate before.', included: ['Up to $100,000 in AWS credits', 'Business and technical support', 'Training and labs'], website: 'aws.amazon.com/activate', hq: 'Seattle, US', founded: '2006', redemption: 'apply', status: 'available', claimed: 7, contact: 'Sam Okafor', views: 784, clicks: 360, redemptions: 49 },
  { id: 'cloudflare', icon: 'shield', partner: 'Cloudflare', initials: 'Cf', cat: 'infra', type: 'Software', lifecycle: 'Product', usd: 9000, valueLabel: 'Pro plan free · 1 year', valueAED: 9000, exclusive: false, short: 'CDN, security, and edge network.', about: 'Cloudflare protects and accelerates apps on a global edge network.', why: 'Faster, safer apps with CDN, DDoS protection, and edge functions.', whoFor: 'Any startup running a website or API.', included: ['Pro plan free for 12 months', 'WAF and DDoS protection', 'Workers edge compute'], website: 'cloudflare.com', hq: 'San Francisco, US', founded: '2009', redemption: 'apply', status: 'available', claimed: 6, contact: 'Nina Petrov', views: 260, clicks: 150, redemptions: 70 },
]

export const offersByCat = (cat: string) => offers.filter((o) => o.cat === cat)
export const offerById = (id: string) => offers.find((o) => o.id === id)
export const catCount = (cat: string) => offers.filter((o) => o.cat === cat).length
export function addOffer(newOffer: Offer) {
  offers.unshift(newOffer)
}

export const redemptionMeta: Record<Redemption, { label: string; cta: string; icon: string }> = {
  instant: { label: 'Instant access', cta: 'Get access', icon: 'zap' },
  booking: { label: 'Book a session', cta: 'Book a session', icon: 'calendar' },
  apply: { label: 'Apply', cta: 'Request access', icon: 'send' },
}

export const monthly = [
  { month: 'Mar', views: 2100, clicks: 1050, redemptions: 380 },
  { month: 'Apr', views: 2600, clicks: 1300, redemptions: 470 },
  { month: 'May', views: 3100, clicks: 1600, redemptions: 560 },
  { month: 'Jun', views: 3500, clicks: 1800, redemptions: 660 },
  { month: 'Jul', views: 4200, clicks: 2200, redemptions: 820 },
  { month: 'Aug', views: 4820, clicks: 2600, redemptions: 980 },
]

export const kpis = { livePerks: 100, views: 6717, clicks: 3427, redemptions: 1328, valueRedeemed: 'AED 4.2M' }

export type Redeem = { founder: string; email: string; offer: string; type: Redemption; date: string }
export const partnerRedemptions: Redeem[] = [
  { founder: 'Falcon AI', email: 'team@falcon.ai', offer: '$200,000 in credits', type: 'apply', date: 'Aug 4, 2026' },
  { founder: 'Nuha Labs', email: 'hello@nuhalabs.ai', offer: '$200,000 in credits', type: 'apply', date: 'Aug 3, 2026' },
  { founder: 'Zayed Robotics', email: 'ops@zayedrobotics.ae', offer: '$200,000 in credits', type: 'apply', date: 'Aug 1, 2026' },
  { founder: 'Marble Health', email: 'founders@marble.health', offer: '$200,000 in credits', type: 'apply', date: 'Jul 29, 2026' },
  { founder: 'Oryx Mobility', email: 'hi@oryx.io', offer: '$200,000 in credits', type: 'apply', date: 'Jul 27, 2026' },
  { founder: 'Cedar Fintech', email: 'team@cedar.finance', offer: '$200,000 in credits', type: 'apply', date: 'Jul 24, 2026' },
]

export const partnerMonthly = [
  { month: 'Mar', views: 96, clicks: 42, redemptions: 6 },
  { month: 'Apr', views: 118, clicks: 55, redemptions: 8 },
  { month: 'May', views: 141, clicks: 68, redemptions: 9 },
  { month: 'Jun', views: 163, clicks: 79, redemptions: 11 },
  { month: 'Jul', views: 178, clicks: 88, redemptions: 13 },
  { month: 'Aug', views: 214, clicks: 96, redemptions: 14 },
]

export type Application = { company: string; initials: string; cat: string; contact: string; date: string; note: string }
export const applications: Application[] = [
  { company: 'Zoho', initials: 'Zo', cat: 'ops', contact: 'partnerships@zoho.com', date: 'Aug 5, 2026', note: 'Business suite — CRM, mail, and finance apps.' },
  { company: 'Figma', initials: 'Fi', cat: 'build', contact: 'startups@figma.com', date: 'Aug 4, 2026', note: 'Design and prototyping platform for product teams.' },
  { company: 'Twilio', initials: 'Tw', cat: 'infra', contact: 'startups@twilio.com', date: 'Aug 2, 2026', note: 'Communication APIs — SMS, voice, and email.' },
  { company: 'Ramp', initials: 'Ra', cat: 'finance', contact: 'partners@ramp.com', date: 'Jul 31, 2026', note: 'Corporate cards and spend management.' },
  { company: 'Webflow', initials: 'We', cat: 'growth', contact: 'startups@webflow.com', date: 'Jul 30, 2026', note: 'Visual website builder and CMS.' },
]

export const currentUser = { name: 'Alex Morgan', role: 'Programme Manager', email: 'alex.morgan@hub71.example', initials: 'AM' }

/** The partner currently signed in to the Partner portal. */
export const currentPartner = {
  id: 'gcp',
  name: 'Google Cloud',
  initials: 'GC',
  cat: 'infra',
  tier: 'Premium partner',
  status: 'Active',
  since: 'Jan 2025',
  manager: 'Jordan Reyes',
  contact: 'partners@cloud.example',
  website: 'cloud.google.com/startup',
  offersLive: 1,
  valueLabel: '$200,000 in credits',
}

export const cohortSize = 18

export const fmt = (n: number) => n.toLocaleString('en-US')
