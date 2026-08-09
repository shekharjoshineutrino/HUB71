import {
  Code2, TrendingUp, Users, Scale, Settings2, Server,
  Zap, Calendar, Send,
  Sparkles, GitBranch, KeyRound, Megaphone, Mail, Search, Globe, Target,
  CreditCard, Wallet, NotebookPen, Table2, MessageSquare, Cloud, Shield, Building2,
} from 'lucide-react'

export const CAT_ICON: Record<string, any> = {
  code: Code2, trending: TrendingUp, users: Users, scale: Scale, settings: Settings2, server: Server,
}

export const RTYPE_ICON: Record<string, any> = { zap: Zap, calendar: Calendar, send: Send }

/** Per-partner logo stand-ins. */
export const PARTNER_ICON: Record<string, any> = {
  sparkles: Sparkles, 'git-branch': GitBranch, key: KeyRound, megaphone: Megaphone, mail: Mail,
  search: Search, globe: Globe, users: Users, target: Target, 'credit-card': CreditCard,
  wallet: Wallet, scale: Scale, notebook: NotebookPen, table: Table2, message: MessageSquare,
  cloud: Cloud, server: Server, shield: Shield,
}
export const partnerIcon = (name?: string) => PARTNER_ICON[name || ''] || Building2
