type Social = {
  link: string,
  icon: string,
  iconDark: string,
}

const socials: Social[] = [
  {
    icon: 'twitter-white',
    iconDark: 'twitter',
    link: 'https://www.twitter.com'
  },
  {
    icon: 'telegram-white',
    iconDark: 'telegram',
    link: 'https://www.telegram.com'
  },
  {
    icon: 'github-white',
    iconDark: 'github',
    link: 'https://www.github.com'
  },
  {
    icon: 'discord-white',
    iconDark: 'discord',
    link: 'https://www.discord.com'
  },
]

type FooterLink = {
  title: string,
  sublinks: {
    title: string,
    link: string
  }[]
}

const footerLinks: FooterLink[] = [
  {
    title: 'Main',
    sublinks: [
      {
        title: 'Trade',
        link: '/trade'
      },
      {
        title: 'Add Liquidity',
        link: '/add-liquidity'
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
        link: '/github'
      },
      {
        title: 'Audit Report',
        link: '/audit-report'
      },
    ]
  },
  {
    title: 'Participant',
    sublinks: [
      {
        title: 'Bug Bounty',
        link: '/bug-bounty'
      },
      {
        title: 'Testnet',
        link: '/testnet'
      },
      {
        title: 'Community',
        link: '/community'
      },
      {
        title: 'Governance',
        link: '/governance'
      }
    ]
  },
  {
    title: 'About',
    sublinks: [
      {
        title: 'About Us',
        link: '/about-us'
      },
      {
        title: 'Contact',
        link: '/contact'
      },
      {
        title: 'Brand Assets',
        link: '/brand-assets'
      }
    ]
  }
]

const otherLinks = {
  privacyPolicy: '/privacy-policy',
  termsOfUse: '/terms-of-use'
}

export { socials, footerLinks, otherLinks }