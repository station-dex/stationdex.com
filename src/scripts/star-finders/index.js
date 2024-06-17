{
  const images = Array.from(document.querySelectorAll('.contents > .item img'))

  if (images.length > 0) {
    import('../utils/image-zoom.min.js')
      .then(({ mediumZoom }) => mediumZoom(images))
      .catch(() => console.log('Cannot add medium zoom effect'))
  }
}
