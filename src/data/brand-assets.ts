const logo = {
  png: ["SD-logo-gradient.png", "SD-logo-white.png", "SD-logo-black.png"],
  svg: ["SD-logo-gradient.svg", "SD-logo-white.svg", "SD-logo-black.svg"],
};

const logomark = {
  png: [
    "SD-logomark-primary-512px.png",
    "SD-logomark-whiteonblack-512px.png",
    "SD-logomark-blackonwhite-512px.png",
  ],
  svg: [
    "SD-logomark-primary-512px.svg",
    "SD-logomark-whiteonblack-512px.svg",
    "SD-logomark-blackonwhite-512px.svg",
  ],
};

const icon = {
  png: ["SD-icon-black-512px.png", "SD-icon-white-512px.png"],
  svg: ["SD-icon-black-512px.svg", "SD-icon-white-512px.svg"],
};

const pdf = "StationDEX-teaser.pdf";

const assets = {
  logo,
  logomark,
  icon,
  pdf,
}

const STATIC_URL_BASE = "https://static.stationdex.com/brand-assets";

export {
  assets,
  STATIC_URL_BASE,
}