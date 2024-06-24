type HeaderLink = {
  [key: string]: {
    title: string,
    path: string
  }
}

const headerLinks: HeaderLink = {
  about: {
    title: 'About Us',
    path: '/about-us'
  },
  documentation: {
    title: 'Documentation',
    path: '/documentation'
  },
  explorer: {
    title: 'Explorer',
    path: '/explorer'
  },
  contact: {
    title: 'Contact Us',
    path: '/contact-us'
  },
  launchApp: {
    title: 'Launch App',
    path: 'https://app.stationdex.com/'
  }
}

export { headerLinks }
