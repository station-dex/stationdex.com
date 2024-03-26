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
  contact: {
    title: 'Contact Us',
    path: '/contact-us'
  },
  tradeNow: {
    title: 'Trade Now',
    path: '/trade'
  }
}

export { headerLinks }