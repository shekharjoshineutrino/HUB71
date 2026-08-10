export type Redemption = 'instant' | 'booking' | 'apply'

export type Offer = {
  id: string
  icon: string
  logoUrl?: string
  partner: string
  initials: string
  cat: string
  subcat?: string
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
  redemptionUrl?: string
  status: 'available' | 'requested' | 'redeemed'
  claimed: number
  contact: string
  contactEmail?: string
  views: number
  clicks: number
  redemptions: number
}

export type Category = {
  id: string
  name: string
  icon: string
  desc: string
  g1: string
  g2: string
  subcategories: string[]
}

export const categories: Category[] = [
  {
    id: 'accounting',
    name: 'Accounting & Finance',
    icon: 'finance',
    desc: 'Banking, billing, expense management, and payments.',
    g1: '#2563eb',
    g2: '#60a5fa',
    subcategories: [
      'Banking',
      'Billing',
      'Bookkeeping',
      'CPA',
      'Expense management',
      'Global Payroll',
      'License Management',
      'Payment Processing',
      'Payouts',
      'Tax Management',
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    icon: 'cloud',
    desc: 'Compute, storage, hosting, databases, and serverless.',
    g1: '#0284c7',
    g2: '#38bdf8',
    subcategories: [
      'Cloud Computing',
      'Databases',
      'Storage',
      'Web Hosting',
      'CDN & Edge Network',
      'DevOps & CI/CD',
      'Serverless',
    ],
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    icon: 'ai',
    desc: 'LLMs, generative AI APIs, and vector databases.',
    g1: '#8b5cf6',
    g2: '#a78bfa',
    subcategories: [
      'AI Models & APIs',
      'Generative AI & LLMs',
      'Data Annotation',
      'Vector Databases',
      'AI Assistants',
    ],
  },
  {
    id: 'dev',
    name: 'Developer Tools',
    icon: 'dev',
    desc: 'CI/CD, code repositories, APIs, and observability.',
    g1: '#6366f1',
    g2: '#818cf8',
    subcategories: [
      'APIs',
      'Code Management',
      'Testing & QA',
      'Authentication & SSO',
      'Error Monitoring',
      'Documentation',
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    icon: 'marketing',
    desc: 'SEO, email automation, ads, and lead generation.',
    g1: '#ec4899',
    g2: '#f472b6',
    subcategories: [
      'SEO & SEM',
      'Email Marketing',
      'Social Media Management',
      'Content Creation',
      'Affiliate Marketing',
      'Advertising',
    ],
  },
  {
    id: 'sales',
    name: 'Sales & CRM',
    icon: 'sales',
    desc: 'Pipelines, lead gen, outreach, and proposal management.',
    g1: '#f59e0b',
    g2: '#fbbf24',
    subcategories: [
      'CRM',
      'Lead Generation',
      'Sales Outreach & Automation',
      'Pipeline Management',
      'Proposal & E-Signatures',
    ],
  },
  {
    id: 'support',
    name: 'Customer Support & Success',
    icon: 'support',
    desc: 'Help desk, live chat, feedback, and customer retention.',
    g1: '#10b981',
    g2: '#34d399',
    subcategories: [
      'Help Desk & Ticketing',
      'Live Chat',
      'Customer Feedback & Surveys',
      'Knowledge Base',
    ],
  },
  {
    id: 'hr',
    name: 'HR, Talent & Recruiting',
    icon: 'hr',
    desc: 'Global hiring, compliance, ATS, and employee benefits.',
    g1: '#0d9488',
    g2: '#2dd4bf',
    subcategories: [
      'Applicant Tracking (ATS)',
      'Employer of Record (EOR)',
      'Employee Engagement',
      'Team Benefits',
      'Freelancer Management',
    ],
  },
  {
    id: 'ops',
    name: 'Operations & Collaboration',
    icon: 'ops',
    desc: 'Docs, databases, team wikis, and task management.',
    g1: '#ea580c',
    g2: '#fb923c',
    subcategories: [
      'Project Management',
      'Team Chat & Messaging',
      'Workspace & Docs',
      'No-Code & Automation',
      'Video Conferencing',
    ],
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    icon: 'security',
    desc: 'ADGM incorporation, contracts, and SOC2 compliance.',
    g1: '#e11d48',
    g2: '#fb7185',
    subcategories: [
      'Company Formation & ADGM',
      'Contract Management',
      'Compliance & SOC 2',
      'IP & Trademark',
      'Data Privacy & GDPR',
    ],
  },
  {
    id: 'product',
    name: 'Product, Design & Analytics',
    icon: 'product',
    desc: 'UI/UX design systems, analytics, and user research.',
    g1: '#d946ef',
    g2: '#e879f9',
    subcategories: [
      'UI/UX Design',
      'Product Analytics',
      'User Research',
      'A/B Testing',
    ],
  },
]
export const categoryById = (id: string) => categories.find((c) => c.id === id)

export const valueBands = ['AED 350,000+', 'AED 50,000 – 350,000', 'Up to AED 50,000']
export const types = ['Software', 'Service', 'Both']
export const lifecycles = ['Vision', 'Product', 'Standardization', 'Go-to-Market', 'Growth', 'Optimization', 'Exit']
export const sorts = ['Most viewed', 'Highest value', 'A – Z']
export const bandOf = (aed: number) => (aed >= 350000 ? 'AED 350,000+' : aed >= 50000 ? 'AED 50,000 – 350,000' : 'Up to AED 50,000')

export const offers: Offer[] = [
  { id: 'openai', icon: 'sparkles', partner: 'OpenAI', initials: 'OA', cat: 'ai', subcat: 'Generative AI & LLMs', type: 'Software', lifecycle: 'Product', usd: 2500, valueLabel: 'AED 9,200 in API credits', valueAED: 9200, exclusive: false, short: 'API credits for building with GPT-4o & reasoning models.', about: 'OpenAI offers general-purpose frontier AI models through a simple, high-throughput API.', why: 'Ship AI copilot, search, and intelligent workflow features without training custom models.', whoFor: 'Teams building AI-powered product features.', included: ['AED 9,200 ($2,500) in API credits', 'Priority rate limits and technical docs'], website: 'openai.com', hq: 'San Francisco, US', founded: '2015', redemption: 'apply', status: 'available', claimed: 5, contact: 'Dana Kim', views: 505, clicks: 240, redemptions: 40 },
  { id: 'gcp', icon: 'cloud', partner: 'Google Cloud', initials: 'GC', cat: 'cloud', subcat: 'Cloud Computing', type: 'Software', lifecycle: 'Product', usd: 200000, valueLabel: 'AED 734,000 in cloud credits', valueAED: 734000, exclusive: true, short: 'Scalable compute, BigQuery data warehouse, and Vertex AI.', about: 'Google Cloud provides scalable compute, storage, data, and AI infrastructure.', why: 'Run your product on the same hyper-scale infrastructure as global tech companies.', whoFor: 'Early-stage startups building on the cloud.', included: ['Up to AED 734,000 in credits over 2 years', 'Technical architecture reviews', 'Google Startup community access'], website: 'cloud.google.com/startup', hq: 'Mountain View, US', founded: '2008', redemption: 'apply', status: 'requested', claimed: 8, contact: 'Jordan Reyes', views: 910, clicks: 402, redemptions: 58 },
  { id: 'aws', icon: 'server', partner: 'AWS Activate', initials: 'AW', cat: 'cloud', subcat: 'Cloud Computing', type: 'Software', lifecycle: 'Product', usd: 100000, valueLabel: 'AED 367,000 in credits', valueAED: 367000, exclusive: true, short: 'The most broadly adopted global cloud compute platform.', about: 'Amazon Web Services offers 200+ fully-featured cloud services from data centres globally.', why: 'Scale smoothly from prototype to production on battle-tested infrastructure.', whoFor: 'Startups that have not used AWS Activate before.', included: ['Up to AED 367,000 in AWS credits', 'Business and technical support', 'Self-paced labs & training credits'], website: 'aws.amazon.com/activate', hq: 'Seattle, US', founded: '2006', redemption: 'apply', status: 'available', claimed: 7, contact: 'Sam Okafor', views: 784, clicks: 360, redemptions: 49 },
  { id: 'github', icon: 'git-branch', partner: 'GitHub', initials: 'GH', cat: 'dev', subcat: 'Code Management', type: 'Software', lifecycle: 'Standardization', usd: 9000, valueLabel: 'Enterprise free · 12 months', valueAED: 33000, exclusive: false, short: 'Code hosting, CI/CD Actions, and developer collaboration.', about: 'GitHub is where 100M+ developers build, ship, and maintain software together.', why: 'Version control, code review, and automation your engineers already know.', whoFor: 'Any startup with an engineering team.', included: ['GitHub Enterprise free for 12 months', '3,000 CI/CD Actions minutes', 'Advanced GitHub Copilot & security features'], website: 'github.com', hq: 'San Francisco, US', founded: '2008', redemption: 'apply', status: 'redeemed', claimed: 14, contact: 'Marcus Vale', views: 470, clicks: 300, redemptions: 180 },
  { id: 'cloudflare', icon: 'shield', partner: 'Cloudflare', initials: 'Cf', cat: 'cloud', subcat: 'CDN & Edge Network', type: 'Software', lifecycle: 'Product', usd: 9000, valueLabel: 'Pro plan free · 1 year', valueAED: 33000, exclusive: false, short: 'Global CDN, DDoS mitigation, and edge compute network.', about: 'Cloudflare protects and accelerates applications on an intelligent global edge network.', why: 'Faster, ultra-secure web apps with global CDN, WAF, and Workers edge functions.', whoFor: 'Any startup running a web application, mobile backend, or API.', included: ['Pro plan free for 12 months', 'WAF and automated DDoS protection', 'Workers serverless edge compute'], website: 'cloudflare.com', hq: 'San Francisco, US', founded: '2009', redemption: 'apply', status: 'available', claimed: 6, contact: 'Nina Petrov', views: 260, clicks: 150, redemptions: 70 },
  { id: 'auth0', icon: 'key', partner: 'Auth0', initials: 'Au', cat: 'dev', subcat: 'Authentication & SSO', type: 'Software', lifecycle: 'Standardization', usd: 12000, valueLabel: 'Free for 1 year', valueAED: 44000, exclusive: false, short: 'Universal authentication, MFA, and SSO as a service.', about: 'Auth0 by Okta provides drop-in enterprise-grade authentication for web apps and APIs.', why: 'Ship secure login, Google/SAML SSO, and multi-factor auth in hours instead of weeks.', whoFor: 'Startups that need production-grade auth fast.', included: ['Free Auth0 tier for 12 months', 'Up to 10,000 monthly active users', 'Custom domain branding'], website: 'auth0.com', hq: 'Bellevue, US', founded: '2013', redemption: 'apply', status: 'available', claimed: 9, contact: 'Priya Raman', views: 306, clicks: 150, redemptions: 95 },
  { id: 'hubspot', icon: 'megaphone', partner: 'HubSpot', initials: 'HS', cat: 'sales', subcat: 'CRM', type: 'Software', lifecycle: 'Go-to-Market', usd: 60000, valueLabel: '90% off year one', valueAED: 220000, exclusive: true, short: 'Full CRM, sales pipelines, and marketing automation.', about: 'HubSpot is the leading customer platform for scaling marketing, sales, and support.', why: 'One connected system for your inbound pipeline, email campaigns, and deal stages.', whoFor: 'Startups with under $2M funding building go-to-market.', included: ['Up to 90% off year one, 50% year two', 'Guided CRM onboarding', 'HubSpot Academy certifications'], website: 'hubspot.com/startups', hq: 'Cambridge, US', founded: '2006', redemption: 'apply', status: 'requested', claimed: 6, contact: 'Elena Ruiz', views: 556, clicks: 260, redemptions: 31 },
  { id: 'mailchimp', icon: 'mail', partner: 'Mailchimp', initials: 'Mc', cat: 'marketing', subcat: 'Email Marketing', type: 'Software', lifecycle: 'Go-to-Market', usd: 3000, valueLabel: '6 months free', valueAED: 11000, exclusive: false, short: 'Targeted email campaigns, automations, and audience journeys.', about: 'Mailchimp helps startups build their audience and convert leads with automated marketing.', why: 'Launch product newsletters and customer onboarding sequences with zero coding.', whoFor: 'Early teams starting email and audience building.', included: ['6 months on the Standard plan free', 'AI subject line optimizer and journey automations'], website: 'mailchimp.com', hq: 'Atlanta, US', founded: '2001', redemption: 'apply', status: 'redeemed', claimed: 11, contact: 'Tom Whitby', views: 300, clicks: 180, redemptions: 120 },
  { id: 'semrush', icon: 'search', partner: 'Semrush', initials: 'Se', cat: 'marketing', subcat: 'SEO & SEM', type: 'Software', lifecycle: 'Go-to-Market', usd: 5000, valueLabel: '3 months Guru free', valueAED: 18500, exclusive: false, short: 'Keyword SEO, competitor analysis, and backlink audit.', about: 'Semrush is an all-in-one search visibility, content, and competitor intelligence suite.', why: 'Rank on Google, optimize search keywords, and spy on competitor traffic strategies.', whoFor: 'Teams investing in organic search growth.', included: ['3 months of the Guru tier free', 'Keyword tracking & backlink audits'], website: 'semrush.com', hq: 'Boston, US', founded: '2008', redemption: 'apply', status: 'available', claimed: 8, contact: 'Noor Haddad', views: 240, clicks: 140, redemptions: 88 },
  { id: 'deel', icon: 'globe', partner: 'Deel', initials: 'De', cat: 'accounting', subcat: 'Global Payroll', type: 'Both', lifecycle: 'Growth', usd: 8000, valueLabel: 'Free payroll · 1 year', valueAED: 29000, exclusive: false, short: 'Global contractor payroll, EOR, and tax compliance in 150+ countries.', about: 'Deel enables startups to legally hire, pay, and manage distributed teams anywhere.', why: 'Hire top engineering and sales talent worldwide without creating foreign legal entities.', whoFor: 'Startups hiring across international borders.', included: ['Free global contractor payroll for 12 months', 'Contract generation and tax compliance'], website: 'deel.com', hq: 'San Francisco, US', founded: '2019', redemption: 'apply', status: 'available', claimed: 4, contact: 'Sofia Lindqvist', views: 274, clicks: 120, redemptions: 22 },
  { id: 'remote', icon: 'users', partner: 'Remote', initials: 'Re', cat: 'hr', subcat: 'Employer of Record (EOR)', type: 'Service', lifecycle: 'Growth', usd: 6000, valueLabel: '3 months free + setup', valueAED: 22000, exclusive: false, short: 'Employer of record, localized benefits, and global HR support.', about: 'Remote helps founders onboard full-time team members with IP protection and compliance.', why: 'Onboard international hires with an automated platform handling health benefits and taxes.', whoFor: 'Teams making their first overseas full-time hires.', included: ['3 months of EOR fees waived', 'Personalized onboarding session'], website: 'remote.com', hq: 'San Francisco, US', founded: '2019', redemption: 'apply', status: 'available', claimed: 3, contact: 'Kai Bennett', views: 180, clicks: 90, redemptions: 24 },
  { id: 'lattice', icon: 'target', partner: 'Lattice', initials: 'La', cat: 'hr', subcat: 'Employee Engagement', type: 'Software', lifecycle: 'Optimization', usd: 9000, valueLabel: '50% off year one', valueAED: 33000, exclusive: false, short: 'OKR goal tracking, performance reviews, and team engagement.', about: 'Lattice brings quarterly goals, performance feedback, and 1:1 agendas into one platform.', why: 'Build a high-performance culture early with structured manager-employee syncs.', whoFor: 'Teams of 10+ employees scaling their organization.', included: ['Personalized product demo', '50% discount on the first year subscription'], website: 'lattice.com', hq: 'San Francisco, US', founded: '2015', redemption: 'apply', status: 'available', claimed: 2, contact: 'Ana Duarte', views: 150, clicks: 70, redemptions: 18 },
  { id: 'brex', icon: 'credit-card', partner: 'Brex', initials: 'Br', cat: 'accounting', subcat: 'Expense management', type: 'Both', lifecycle: 'Growth', usd: 50000, valueLabel: 'AED 183,000 in perks + cards', valueAED: 183000, exclusive: true, short: 'High-limit corporate cards and automated expense management.', about: 'Brex offers corporate cards, multi-currency banking, and spend control for startups.', why: 'Get high credit limits and automated receipt tracking with no personal guarantee.', whoFor: 'Incorporated venture-backed startups.', included: ['AED 183,000+ ($50k) in partner discounts', 'Corporate cards with zero personal liability', 'Treasury account access'], website: 'brex.com', hq: 'San Francisco, US', founded: '2017', redemption: 'apply', status: 'requested', claimed: 5, contact: 'Jordan Blake', views: 402, clicks: 180, redemptions: 22 },
  { id: 'stripe', icon: 'wallet', partner: 'Stripe', initials: 'St', cat: 'accounting', subcat: 'Payment Processing', type: 'Software', lifecycle: 'Go-to-Market', usd: 5000, valueLabel: 'Waived processing fees on AED 180k', valueAED: 18000, exclusive: false, short: 'Global payment processing and billing infrastructure.', about: 'Stripe powers online payments for millions of technology businesses around the world.', why: 'Accept payments in 135+ currencies with direct checkout and subscription billing.', whoFor: 'Startups monetizing digital or SaaS products.', included: ['Processing fees waived on first AED 180,000 in transactions', 'Direct developer onboarding'], website: 'stripe.com', hq: 'San Francisco, US', founded: '2010', redemption: 'apply', status: 'redeemed', claimed: 13, contact: 'Mei Chen', views: 351, clicks: 190, redemptions: 140 },
  { id: 'amara', icon: 'scale', partner: 'Amara & Partners', initials: 'AP', cat: 'legal', subcat: 'Company Formation & ADGM', type: 'Service', lifecycle: 'Vision', usd: 15000, valueLabel: '20 free advisory hours', valueAED: 55000, exclusive: true, short: 'UAE corporate structuring, ADGM licensing, and startup legal advisory.', about: 'Amara & Partners is a premier Abu Dhabi legal consultancy specializing in venture setup.', why: 'Incorporate in ADGM and get shareholder agreements and SAFE notes right from day one.', whoFor: 'Startups incorporating or expanding in Abu Dhabi.', included: ['20 free senior advisory hours', 'ADGM setup & compliance consultation', 'Standard investor contract templates'], website: 'amarapartners.ae', hq: 'Abu Dhabi, UAE', founded: '2016', redemption: 'apply', status: 'available', claimed: 7, contact: 'Omar Farouk', views: 198, clicks: 95, redemptions: 30 },
  { id: 'notion', icon: 'notebook', partner: 'Notion', initials: 'No', cat: 'ops', subcat: 'Workspace & Docs', type: 'Software', lifecycle: 'Vision', usd: 3000, valueLabel: '6 months free + AI credits', valueAED: 11000, exclusive: false, short: 'Connected docs, engineering wikis, and roadmap tracking.', about: 'Notion combines team wikis, project boards, and AI writing assistants in one workspace.', why: 'Keep company documentation, sprint backlogs, and product roadmaps organized.', whoFor: 'Any startup team collaborating on docs and tasks.', included: ['6 months of Notion Plus free', 'AED 3,700 in Notion AI generation credits'], website: 'notion.so/startups', hq: 'San Francisco, US', founded: '2016', redemption: 'apply', status: 'redeemed', claimed: 15, contact: 'Lucy Grant', views: 388, clicks: 230, redemptions: 160 },
  { id: 'airtable', icon: 'table', partner: 'Airtable', initials: 'At', cat: 'ops', subcat: 'No-Code & Automation', type: 'Software', lifecycle: 'Product', usd: 1000, valueLabel: 'AED 3,700 in credits', valueAED: 3700, exclusive: false, short: 'Relational database builder and automated internal workflows.', about: 'Airtable is a low-code platform for creating custom relational apps and databases.', why: 'Build custom operations, CRM trackers, and inventory flows without writing backend code.', whoFor: 'Ops and non-technical founders.', included: ['AED 3,700 ($1,000) in credits', 'Access to pre-built startup templates'], website: 'airtable.com', hq: 'San Francisco, US', founded: '2012', redemption: 'apply', status: 'available', claimed: 10, contact: 'Ravi Shah', views: 233, clicks: 140, redemptions: 96 },
  { id: 'slack', icon: 'message', partner: 'Slack', initials: 'Sl', cat: 'ops', subcat: 'Team Chat & Messaging', type: 'Software', lifecycle: 'Standardization', usd: 6000, valueLabel: '25% off Pro for 1 year', valueAED: 22000, exclusive: false, short: 'Real-time team messaging, channels, and bot integrations.', about: 'Slack is the AI-powered collaboration hub where modern tech startups get work done.', why: 'Keep engineering alerts, customer tickets, and team chatter organized in channels.', whoFor: 'Growing startup teams needing streamlined communication.', included: ['25% discount on Pro tier for 12 months', 'Unlimited message history & canvas access'], website: 'slack.com', hq: 'San Francisco, US', founded: '2013', redemption: 'apply', status: 'available', claimed: 9, contact: 'Erin Doyle', views: 210, clicks: 130, redemptions: 85 },
  { id: 'mixpanel', icon: 'target', partner: 'Mixpanel', initials: 'Mp', cat: 'product', subcat: 'Product Analytics', type: 'Software', lifecycle: 'Optimization', usd: 50000, valueLabel: 'AED 183,000 in credits · 1 year', valueAED: 183000, exclusive: true, short: 'Self-serve product analytics and user funnel tracking.', about: 'Mixpanel helps tech teams measure conversion funnels, retention, and feature adoption.', why: 'Understand where users drop off and optimize your product conversion metrics.', whoFor: 'Post-launch startups tracking user engagement.', included: ['AED 183,000 in free analytics credits', 'Funnel, retention, and cohort reports'], website: 'mixpanel.com', hq: 'San Francisco, US', founded: '2009', redemption: 'apply', status: 'available', claimed: 8, contact: 'Sarah Lin', views: 320, clicks: 175, redemptions: 52 },
  { id: 'intercom', icon: 'message', partner: 'Intercom', initials: 'In', cat: 'support', subcat: 'Live Chat', type: 'Software', lifecycle: 'Go-to-Market', usd: 12000, valueLabel: '95% off for 1 year', valueAED: 44000, exclusive: true, short: 'AI customer service agent and in-app support chat.', about: 'Intercom delivers AI-first customer service through its Fin AI agent and live messenger.', why: 'Resolve 50%+ of founder inquiries instantly with an automated AI support agent.', whoFor: 'Startups offering web/mobile SaaS products.', included: ['95% off Intercom for Early Stage', 'Fin AI automated customer bot'], website: 'intercom.com/early-stage', hq: 'San Francisco, US', founded: '2011', redemption: 'apply', status: 'available', claimed: 12, contact: 'Cillian Murphy', views: 410, clicks: 215, redemptions: 64 },
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
  { company: 'Figma', initials: 'Fi', cat: 'product', contact: 'startups@figma.com', date: 'Aug 4, 2026', note: 'Design and prototyping platform for product teams.' },
  { company: 'Twilio', initials: 'Tw', cat: 'dev', contact: 'startups@twilio.com', date: 'Aug 2, 2026', note: 'Communication APIs — SMS, voice, and email.' },
  { company: 'Ramp', initials: 'Ra', cat: 'accounting', contact: 'partners@ramp.com', date: 'Jul 31, 2026', note: 'Corporate cards and spend management.' },
  { company: 'Webflow', initials: 'We', cat: 'dev', contact: 'startups@webflow.com', date: 'Jul 30, 2026', note: 'Visual website builder and CMS.' },
]

export const currentUser = { name: 'Alex Morgan', role: 'Programme Manager', email: 'alex.morgan@hub71.example', initials: 'AM' }

/** The partner currently signed in to the Partner portal. */
export const currentPartner = {
  id: 'gcp',
  name: 'Google Cloud',
  initials: 'GC',
  cat: 'cloud',
  icon: 'cloud',
  tier: 'Premium partner',
  status: 'Active',
  since: 'Jan 2025',
  manager: 'Jordan Reyes',
  contact: 'partners@cloud.example',
  website: 'cloud.google.com/startup',
  offersLive: 1,
  valueLabel: 'AED 734,000 in credits',
}

export const cohortSize = 18

export const fmt = (n: number) => n.toLocaleString('en-US')
