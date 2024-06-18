import type { paths } from '@/elements/icons/paths'

type Social = {
  link: string,
  icon: keyof typeof paths,
  iconDark: keyof typeof paths
}

const socials: Social[] = [
  {
    icon: 'twitter-white',
    iconDark: 'twitter',
    link: 'https://twitter.com/stationdex_'
  },
  {
    icon: 'telegram-white',
    iconDark: 'telegram',
    link: 'https://t.me/+dN2W3Uqp_jpkMmI0'
  }
  // {
  //   icon: 'github-white',
  //   iconDark: 'github',
  //   link: 'https://www.github.com'
  // },
  // {
  //   icon: 'discord-white',
  //   iconDark: 'discord',
  //   link: 'https://www.discord.com'
  // },
]

type FooterLink = {
  title: string,
  sublinks: {
    title: string,
    link: string,
    external?: boolean
  }[]
}

const footerLinks: FooterLink[] = [
  {
    title: 'Command Deck',
    sublinks: [
      {
        title: 'Swap',
        link: 'https://app.stationdex.com/',
        external: true
      },
      {
        title: 'Add Liquidity',
        link: 'https://app.stationdex.com/pools',
        external: true
      }
    ]
  },
  {
    title: 'Observation Deck',
    sublinks: [
      {
        title: 'About Us',
        link: '/about-us'
      },
      {
        title: 'Contact',
        link: '/contact-us'
      }
    ]
  },
  {
    title: 'Resources',
    sublinks: [
      {
        title: 'Documentation',
        link: '/documentation'
      },
      {
        title: 'Github',
        link: 'https://github.com/station-dex',
        external: true
      },
      {
        title: 'Brand Assets',
        link: '/brand-assets'
      },
      {
        title: 'Explorer',
        link: '/explorer'
      }
    ]
  },
  {
    title: 'Community Zone',
    sublinks: [
      // {
      //   title: 'Testnet',
      //   link: 'https://test.stationdex.com',
      //   external: true
      // },
      {
        title: 'Community',
        link: '/community'
      },
      {
        title: 'Governance',
        link: '/governance'
      },
      {
        title: 'Starfinders Program',
        link: '/star-finders'
      }
    ]
  }
]

const otherLinks = {
  privacyPolicy: '/privacy-policy',
  termsOfUse: '/terms-of-use'
}

export { socials, footerLinks, otherLinks }
