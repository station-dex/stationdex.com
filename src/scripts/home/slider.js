import Swiper from "swiper";
import { Pagination } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  Swiper.use([Pagination]);

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: false,

    slidesPerView: 1,

    // only slide through 1 at a time
    slidesPerGroup: 1,

    allowTouchMove: true,

    //gap of 32px
    spaceBetween: 16,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  swiper.init();
});
