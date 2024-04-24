const STATIC_URL_BASE = "https://static.stationdex.com";

const data = [
  {
    type: "section",
    title: "Logo",
    subsections: [
      {
        title: "PNG",
        items: [
          {
            title: "Primary-512px",
            href: "/brand-assets/logo/SD-logo-gradient.png"
          },
          {
            title: "Dark-512px",
            href: "/brand-assets/logo/SD-logo-black.png"
          },
          {
            title: "Light-512px",
            href: "/brand-assets/logo/SD-logo-white.png"
          }
        ]
      },
      {
        title: "SVG",
        items: [
          {
            title: "Primary-512px",
            href: "/brand-assets/logo/SD-logo-gradient.svg"
          },
          {
            title: "Dark-512px",
            href: "/brand-assets/logo/SD-logo-black.svg"
          },
          {
            title: "Light-512px",
            href: "/brand-assets/logo/SD-logo-white.svg"
          }
        ]
      }
    ],
  },
  {
    type: "section",
    title: "Logomark",
    subsections: [
      {
        title: "PNG",
        items: [
          {
            title: "Primary-512px",
            href: "/brand-assets/logomark/SD-logomark-primary-512px.png"
          },
          {
            title: "Dark-512px",
            href: "/brand-assets/logomark/SD-logomark-whiteonblack-512px.png"
          },
          {
            title: "Light-512px",
            href: "/brand-assets/logomark/SD-logomark-blackonwhite-512px.png"
          }
        ]
      },
      {
        title: "SVG",
        items: [
          {
            title: "Primary-512px",
            href: "/brand-assets/logomark/SD-logomark-primary-512px.svg"
          },
          {
            title: "Dark-512px",
            href: "/brand-assets/logomark/SD-logomark-whiteonblack-512px.svg"
          },
          {
            title: "Light-512px",
            href: "/brand-assets/logomark/SD-logomark-blackonwhite-512px.svg"
          }
        ]
      }
    ],
  },
  {
    type: "section",
    title: "Icon",
    subsections: [
      {
        title: "PNG",
        items: [
          {
            title: "Dark-512px",
            href: "/brand-assets/icon/SD-icon-black-512px.png"
          },
          {
            title: "Light-512px",
            href: "/brand-assets/icon/SD-icon-white-512px.png"
          }
        ]
      },
      {
        title: "SVG",
        items: [
          {
            title: "Dark-512px",
            href: "/brand-assets/icon/SD-icon-black-512px.svg"
          },
          {
            title: "Light-512px",
            href: "/brand-assets/icon/SD-icon-white-512px.svg"
          }
        ]
      }
    ],
  },
  {
    type: "section",
    title: "StationDEX Teaser",
    subsections: [
      {
        title: "PDF",
        items: [
          {
            title: "Teaser PDF",
            href: "/brand-assets/StationDEX-teaser.pdf"
          }
        ]
      }
    ],
  }
]

export {
  data,
  STATIC_URL_BASE,
}