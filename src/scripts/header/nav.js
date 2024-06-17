const navButton = document.querySelector('header button.hamburger[data-open]')
const mobileMenu = document.querySelector('header div.mobile.menu[data-open]')

const updateNavLinkActiveState = () => {
  // trim off leading and trailing slashes
  const sanitizePath = path => path.replace(/^\/*|\/*$/g, '')

  const path = sanitizePath(window.location.pathname)
  const anchorItems = document.querySelectorAll('header a')

  anchorItems.forEach((link) => {
    const href = sanitizePath(link.getAttribute('href'))

    if (path === href || (path.startsWith(href) && href !== '')) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}

const registerMobileMenuToggle = () => {
  navButton.addEventListener('click', () => {
    navButton.dataset.open =
      navButton.dataset.open === 'true' ? 'false' : 'true'
    mobileMenu.dataset.open =
      mobileMenu.dataset.open === 'true' ? 'false' : 'true'

    document.documentElement.style.overflow =
      mobileMenu.dataset.open === 'true' ? 'hidden' : 'auto'
  })
}

registerMobileMenuToggle()
updateNavLinkActiveState()
