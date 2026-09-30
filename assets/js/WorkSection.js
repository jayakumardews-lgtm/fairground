
const workData = {
  home: [
    {
      image: "./assets/img/Axillex_Depot.jpg",
      name: "AXILLEX DEPOT",
      title: "Modern spaces built for what's next",
      bg: "#8a8a82",
      page: "Work",
    },
    {
      image: "./assets/img/TGS-Hero-2.jpg",
      name: "THE GREAT SIMPLIFICATION",
      title: "Illuminating a path for future generations",
      bg: "#151515",
      page: "Projects",
    },
    {
      image: "./assets/img/Liftlab_Hero.jpg",
      name: "LIFTLAB",
      title: "Creating a fresh experience for beauty",
      bg: "#141414",
      page: "Studio",
    },
    {
      image: "./assets/img/Stoneoak_Logo.jpg",
      name: "STONEOAK REALTY",
      title: "A new identity for modern real estate",
      bg: "#8a8a82",
      page: "Realty",
    },
    {
      image: "./assets/img/Liftlab_Hero.jpg",
      name: "LIFTLAB",
      title: "Creating a fresh experience for beauty",
      bg: "#141414",
      page: "Projects",
    },
  ],

  about: [
    {
      date: "02 FEB",
      title: "Sustainable design thinking",
      image: "./assets/img/Hero-14.jpg",
      bg: "#3a3a2a",
      page: "Ideas",
    },
    {
      date: "28 JAN",
      title: "Motion as a brand language",
      image: "./assets/img/Digital.jpg",
      bg: "#55650f",
      page: "Motion",
    },
    {
      date: "15 JAN",
      title: "Why founders need a brand sprint",
      image: "./assets/img/Empress_Poster.jpg",
      bg: "#1c1c1c",
      page: "Strategy",
    },
    {
      date: "09 JAN",
      title: "Typography that speaks first",
      image: "./assets/img/TGS-Hero-2.jpg",
      bg: "#1c1c1c",
      page: "Typography",
    },
    {
      date: "20 DEC",
      title: "Building a flexible identity system",
      image: "./assets/img/Axillex_Depot.jpg",
      bg: "#1c1c1c",
      page: "Identity",
    },
    {
      date: "11 DEC",
      title: "The case for slower branding",
      image: "./assets/img/Hero-14.jpg",
      bg: "#1c1c1c",
      page: "Thinking",
    },
    {
      date: "30 NOV",
      title: "Packaging that earns its shelf space",
      image: "./assets/img/Digital.jpg",
      bg: "#1c1c1c",
      page: "Packaging",
    },
    {
      date: "18 NOV",
      title: "Designing for the next screen",
      image: "./assets/img/Empress_Poster.jpg",
      bg: "#1c1c1c",
      page: "Digital",
    },
    {
      date: "05 NOV",
      title: "Naming without the noise",
      image: "./assets/img/TGS-Hero-2.jpg",
      bg: "#1c1c1c",
      page: "Naming",
    },
    {
      date: "24 OCT",
      title: "Tone of voice, tuned",
      image: "./assets/img/Axillex_Depot.jpg",
      bg: "#1c1c1c",
      page: "Voice",
    },
    {
      date: "12 OCT",
      title: "Wireframes worth keeping",
      image: "./assets/img/Hero-14.jpg",
      bg: "#1c1c1c",
      page: "UX",
    },
    {
      date: "29 SEP",
      title: "Colour in the age of dark mode",
      image: "./assets/img/Digital.jpg",
      bg: "#1c1c1c",
      page: "Colour",
    },
    {
      date: "17 SEP",
      title: "What great art direction asks",
      image: "./assets/img/Empress_Poster.jpg",
      bg: "#1c1c1c",
      page: "Direction",
    },
    {
      date: "03 SEP",
      title: "Digital toolkits that scale",
      image: "./assets/img/TGS-Hero-2.jpg",
      bg: "#1c1c1c",
      page: "Systems",
    },
    {
      date: "21 AUG",
      title: "Beyond the like button",
      image: "./assets/img/Axillex_Depot.jpg",
      bg: "#3b0d12",
      page: "Culture",
    },
  ],
};

class WorkSection extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.gsapContext = null;
    this.dragCursor = null;
    this.handleMouseMove = null;
    this.handleBlur = null;
    this.handleMouseLeave = null;
    this.handleScroll = null;
  }

  connectedCallback() {
    this.style.display = "block";
    this.render();
    this.init();
  }

  render() {
    const page = this.dataset.page || "home";
    const projects = workData[page] || workData.home;
    const showButtons = page === "home";

    const slides = projects
      .map((project) => {
        return `
          <div class="swiper-slide">
            <article
              class="group relative
                     aspect-[3/2]
                     w-full
                     overflow-hidden
                     rounded-xl
                     scale-[0.88]
                     origin-top
                     opacity-40
                     transition-all
                     duration-500
                     ease-out
                     [.swiper-slide-active_&]:scale-100
                     [.swiper-slide-active_&]:scale-y-[1.06]
                     [.swiper-slide-active_&]:opacity-100"
              style="background-color: ${project.bg};"
            >
              <img
                src="${project.image}"
                alt="${project.name || project.title}"
                class="absolute inset-0
                       h-full
                       w-full
                       object-cover
                       transition-transform
                       duration-500
                       group-hover:scale-105"
              />
            </article>

            <div
              class="mt-3
                     translate-y-0
                     opacity-0
                     transition-all
                     duration-500
                     [.swiper-slide-active_&]:translate-y-[25px]
                     [.swiper-slide-active_&]:opacity-100"
            >
              <p
                class="font-sans
                       text-[10px]
                       uppercase
                       tracking-wide
                       text-white/50
                       sm:text-xs
                       lg:text-sm"
              >
                ${project.name || project.date || ""}
              </p>

              <h3
                class="mt-1
                       max-w-[500px]
                       font-display
                       font-700
                       text-base
                       leading-tight
                       text-white
                       sm:text-xl
                       lg:text-3xl"
              >
                ${project.title}
              </h3>
            </div>
          </div>
        `;
      })
      .join("");

    this.innerHTML = `
      <section
        class="work-section
               relative
               w-full
               overflow-hidden
               bg-noise-grid
               py-14
               sm:py-20
               lg:py-24"
      >
        <span
          class="work-background-title
                 pointer-events-none
                 absolute
                 left-0
                 top-0
                 select-none
                 whitespace-nowrap
                 font-display
                 font-800
                 text-[5rem]
                 leading-none
                 text-white/5
                 sm:top-4
                 sm:text-[9rem]
                 md:text-[14rem]
                 lg:top-8
                 lg:text-[20rem]
                 xl:text-[23rem]"
        >
          ${projects[0]?.page || "Work"}
        </span>

        <div class="relative w-full">
          <div
            class="mx-auto
                   mb-8
                   flex
                   w-full
                   max-w-[1400px]
                   items-center
                   justify-between
                   gap-4
                   px-5
                   sm:mb-12
                   sm:px-8
                   lg:mb-14
                   lg:px-12
                   xl:w-[70%]
                   xl:px-0
                   xl:pb-[3%]"
          >
            <div
              class="flex
                     w-full
                     items-center
                     justify-between
                     gap-3
                     sm:gap-5
                     lg:gap-6"
            >
              ${
                showButtons
                  ? `
                    <div
                      class="flex
                             justify-between
                             gap-1.5
                             sm:gap-2"
                    >
                      <button
                        type="button"
                        class="rounded-full
                               bg-lime-400
                               px-3
                               py-1.5
                               font-display
                               text-xs
                               font-600
                               text-black
                               sm:px-4
                               sm:py-2
                               sm:text-sm
                               lg:px-5
                               lg:py-2.5
                               lg:text-base"
                      >
                        Work
                      </button>

                      <button
                        type="button"
                        class="rounded-full
                               border
                               border-white/30
                               px-3
                               py-1.5
                               font-display
                               text-xs
                               font-600
                               text-white/80
                               sm:px-4
                               sm:py-2
                               sm:text-sm
                               lg:px-5
                               lg:py-2.5
                               lg:text-base"
                      >
                        News
                      </button>
                    </div>
                  `
                  : `
                    <div></div>
                  `
              }

              <span
                class="work-counter
                       hidden
                       font-body
                       text-sm
                       text-white/50
                       sm:inline
                       lg:text-base"
              >
                1/${projects.length}
              </span>
            </div>
          </div>

          <div
            class="work-swiper
                   swiper
                   mySwiper
                   h-full
                   w-full
                   cursor-none
                   overflow-visible"
          >
            <div class="swiper-wrapper items-start">
              ${slides}
            </div>
          </div>
        </div>
      </section>

      <div
        class="drag-cursor
               pointer-events-none
               fixed
               left-0
               top-0
               z-[99999]
               hidden
               h-[90px]
               w-[90px]
               -translate-x-1/2
               -translate-y-1/2
               items-center
               justify-center
               rounded-full
               bg-[#c8ff00]
               font-serif
               text-[13px]
               font-bold
               text-black"
      >
        DRAG
      </div>
    `;

    this.dragCursor = this.querySelector(".drag-cursor");
  }

  init() {
    this.initSwiper();
    this.initGSAP();
    this.initDragCursor();
  }

  initSwiper() {
    const swiperElement = this.querySelector(".work-swiper");

    if (!swiperElement) {
      console.error("WorkSection: .work-swiper not found.");
      return;
    }

    if (typeof Swiper === "undefined") {
      console.error("WorkSection: Swiper is not loaded.");
      return;
    }

    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    this.swiper = new Swiper(swiperElement, {
      centeredSlides: true,
      loop: true,
      slidesPerView: 1.1,
      spaceBetween: 0,
      speed: 700,
      grabCursor: false,
      allowTouchMove: true,
      slideToClickedSlide: true,

      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 0,
        },
        480: {
          slidesPerView: 1.25,
          spaceBetween: 0,
        },
        640: {
          slidesPerView: 1.8,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2.15,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 2.75,
          spaceBetween: 0,
        },
        1440: {
          slidesPerView: 2.75,
          spaceBetween: 0,
        },
      },
    });

    this.updateCounter();
    this.updateBackgroundTitle();

    this.swiper.on("slideChange", () => {
      this.updateCounter();
      this.updateBackgroundTitle();
    });
  }

  updateCounter() {
    if (!this.swiper) {
      return;
    }

    const counter = this.querySelector(".work-counter");

    if (!counter) {
      return;
    }

    const page = this.dataset.page || "home";
    const projects = workData[page] || workData.home;

    const current = this.swiper.realIndex + 1;
    const total = projects.length;

    counter.textContent = `${current}/${total}`;
  }

  updateBackgroundTitle() {
    if (!this.swiper) {
      return;
    }

    const backgroundTitle = this.querySelector(
      ".work-background-title"
    );

    if (!backgroundTitle) {
      return;
    }

    const page = this.dataset.page || "home";
    const projects = workData[page] || workData.home;
    const activeProject = projects[this.swiper.realIndex];

    if (!activeProject) {
      return;
    }

    backgroundTitle.textContent =
      activeProject.page || "";
  }

  initGSAP() {
    const work = this.querySelector(".work-section");

    if (!work) {
      console.error("WorkSection: .work-section not found.");
      return;
    }

    if (typeof gsap === "undefined") {
      console.error("WorkSection: GSAP is not loaded.");
      return;
    }

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (this.gsapContext) {
      this.gsapContext.revert();
      this.gsapContext = null;
    }

    this.gsapContext = gsap.context(() => {
      gsap.fromTo(
        work,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          delay: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: work,
            start: "top center",
            end: "bottom center",
            toggleActions: "play pause resume pause",
          },
        }
      );
    }, this);
  }

  initDragCursor() {
    const workSection = this.querySelector(".work-swiper");
    const dragCursor = this.dragCursor;

    if (!workSection || !dragCursor) {
      console.error("WorkSection: drag cursor elements not found.");
      return;
    }

    if (typeof gsap === "undefined") {
      console.error("WorkSection: GSAP is not loaded.");
      return;
    }

    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!isDesktop) {
      return;
    }

    const moveCursorX = gsap.quickTo(
      dragCursor,
      "left",
      {
        duration: 0.08,
        ease: "power2.out",
      }
    );

    const moveCursorY = gsap.quickTo(
      dragCursor,
      "top",
      {
        duration: 0.08,
        ease: "power2.out",
      }
    );

    const cards = () => {
      return workSection.querySelectorAll("article");
    };

    const showDragCursor = () => {
      dragCursor.classList.remove("hidden");
      dragCursor.classList.add("flex");
      document.body.style.cursor = "none";
    };

    const hideDragCursor = () => {
      dragCursor.classList.add("hidden");
      dragCursor.classList.remove("flex");
      document.body.style.cursor = "";
    };

    const isOverAnyCard = (x, y) => {
      const list = cards();

      for (let i = 0; i < list.length; i++) {
        const rect = list[i].getBoundingClientRect();

        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          return true;
        }
      }

      return false;
    };

    this.handleMouseMove = (e) => {
      if (
        isOverAnyCard(
          e.clientX,
          e.clientY
        )
      ) {
        showDragCursor();
        moveCursorX(e.clientX);
        moveCursorY(e.clientY);
      } else {
        hideDragCursor();
      }
    };

    this.handleBlur = hideDragCursor;
    this.handleMouseLeave = hideDragCursor;
    this.handleScroll = hideDragCursor;

    document.addEventListener(
      "mousemove",
      this.handleMouseMove
    );

    window.addEventListener(
      "blur",
      this.handleBlur
    );

    document.addEventListener(
      "mouseleave",
      this.handleMouseLeave
    );

    window.addEventListener(
      "scroll",
      this.handleScroll,
      {
        passive: true,
      }
    );
  }

  disconnectedCallback() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    if (this.gsapContext) {
      this.gsapContext.revert();
      this.gsapContext = null;
    }

    if (this.handleMouseMove) {
      document.removeEventListener(
        "mousemove",
        this.handleMouseMove
      );
      this.handleMouseMove = null;
    }

    if (this.handleBlur) {
      window.removeEventListener(
        "blur",
        this.handleBlur
      );
      this.handleBlur = null;
    }

    if (this.handleMouseLeave) {
      document.removeEventListener(
        "mouseleave",
        this.handleMouseLeave
      );
      this.handleMouseLeave = null;
    }

    if (this.handleScroll) {
      window.removeEventListener(
        "scroll",
        this.handleScroll
      );
      this.handleScroll = null;
    }

    if (this.dragCursor) {
      this.dragCursor.classList.add("hidden");
      this.dragCursor.classList.remove("flex");
      this.dragCursor = null;
    }

    document.body.style.cursor = "";
  }
}

if (!customElements.get("work-section")) {
  customElements.define(
    "work-section",
    WorkSection
  );
}

