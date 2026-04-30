import {
  LayoutDashboard,
  Users,
  Rocket,
  Handshake,
  Image as ImageIcon,
  Calendar,
  Contact,
  FileText,
  Settings,
  ShieldCheck,
  Command,
  Newspaper,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Admin',
    email: 'admin@gbwc.org',
    avatar: '',
  },
  teams: [
    {
      name: 'GBWC CMS',
      logo: Command,
      plan: 'Admin Panel',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Leaders',
          url: '/leaders',
          icon: Users,
        },
        {
          title: 'Initiatives',
          url: '/initiatives',
          icon: Rocket,
        },
        {
          title: 'Partners',
          url: '/partners',
          icon: Handshake,
        },
        {
          title: 'Media',
          url: '/media',
          icon: ImageIcon,
        },
        {
          title: 'Sessions',
          url: '/sessions',
          icon: Calendar,
        },
        {
          title: 'News',
          url: '/news',
          icon: Newspaper,
        },
        {
          title: 'Contacts',
          url: '/contacts',
          icon: Contact,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Home',
          url: '/pages/home',
          icon: FileText,
        },
        {
          title: 'About',
          url: '/pages/about',
          icon: FileText,
        },
        {
          title: 'Initiatives',
          url: '/pages/initiatives',
          icon: FileText,
        },
        {
          title: 'Media',
          url: '/pages/media',
          icon: FileText,
        },
        {
          title: 'Contacts',
          url: '/pages/contacts',
          icon: FileText,
        },
        {
          title: 'Partners',
          url: '/pages/partners',
          icon: FileText,
        },
        {
          title: 'Events',
          url: '/pages/events',
          icon: FileText,
        },
        {
          title: 'Founders',
          url: '/pages/founders',
          icon: FileText,
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          title: 'Users',
          url: '/users',
          icon: ShieldCheck,
        },
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
