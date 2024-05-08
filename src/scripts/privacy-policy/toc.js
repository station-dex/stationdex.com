const tocContainer = document.querySelector(".toc.component[data-open]");
const toc = document.querySelector(".toc.component");

const tocMobileBtn = document.querySelector("button.toc.mobile[data-open]");

const scrollToTopBtn = document.querySelector("button.scroll.top");

let scrolling = false;

function updateActive(currentHash) {
  const tocLinks = tocContainer.querySelectorAll("a");
  tocLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (linkHref === currentHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function checkActive() {
  if (!window.navigation) return;

  // on url change
  window.navigation.addEventListener("navigate", (event) => {
    const url = event.destination.url;
    const hash = new URL(url).hash;
    updateActive(hash);
  });

  // initial check
  const hash = window.location.hash;
  updateActive(hash);
}

function toggleLinks() {
  const toggleButtons = tocContainer.querySelectorAll("button[data-open]");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;

      const ul = tocContainer.querySelector(`ul[data-id="${id}"]`);

      if (!ul) return;

      const isOpen = ul.dataset.open === "true";
      const newState = isOpen ? "false" : "true";
      ul.dataset.open = newState;
      button.dataset.open = newState;
    });
  });
}

function togglePageScroll(enable = true) {
  if (enable) {
    document.body.classList.remove("no", "vertical", "scroll");
  } else {
    document.body.classList.add("no", "vertical", "scroll");
  }
}

function toggleTocMobileSidebar() {
  tocMobileBtn.addEventListener("click", () => {
    const isOpen = tocContainer.dataset.open === "true";
    const newState = isOpen ? "false" : "true";
    tocContainer.dataset.open = newState;
    tocMobileBtn.dataset.open = newState;

    if (newState === "true") togglePageScroll(false);
    else togglePageScroll(true);
  });

  document.addEventListener("click", (event) => {
    const isOpen = tocContainer.dataset.open === "true";

    if (!isOpen) return;

    if (event.target.closest("button.toc.mobile")) return;

    if (event.target.closest(".toc.component")) {
      const clickedOnLink = event.target.closest("a");
      if (clickedOnLink) {
        tocContainer.dataset.open = "false";
        tocMobileBtn.dataset.open = "false";
        togglePageScroll(true);
      }

      return;
    }

    tocContainer.dataset.open = "false";
    tocMobileBtn.dataset.open = "false";
    togglePageScroll(true);
  });
}

function scrollToTop() {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function setupIntersectionObserver() {
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !scrolling) {
            // Update the URL hash to the id of the currently visible element
            history.replaceState(null, "", "#" + entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
        threshold: 1,
      },
    );

    const titles = toc.querySelectorAll(`ul`);
    const headings = toc.querySelectorAll(`ul a`);


    const clickables = Array.from(titles).concat(Array.from(headings));

    clickables.forEach(clickable => {
      clickable.addEventListener("click", (event) => {
        scrolling = true;

        setTimeout(() => {
          scrolling = false;
        }, 2000)
      })
    })


    // Attach observer to each element with class 'hash.link'
    const hashLinks = document.querySelectorAll(".hash.link");
    hashLinks.forEach((link) => {
      observer.observe(link);
    });
  });
}

checkActive();

toggleLinks();

toggleTocMobileSidebar();

scrollToTop();

setupIntersectionObserver();