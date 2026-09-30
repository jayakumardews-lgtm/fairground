(function () {
  if (customElements.get("site-menu")) return;

  const BASE_PHOTO = "./assets/img/Hero-15.jpg";

  const LINKS = [
    { name: "Studio", href: "about.html", photo: "./assets/img/Hero-14.jpg" },
    { name: "Work", href: "index.html", photo: "./assets/img/Axillex_Depot.jpg" },
    { name: "The latest", href: "about.html", photo: "./assets/img/Digital.jpg" },
    { name: "Contact", href: "service.html", photo: "./assets/img/Empress_Poster.jpg" }
  ];

  const PROJECTS = [
    { name: "The Great Simplification", photo: "./assets/img/TGS-Hero-2.jpg" },
    { name: "Stoneoak Realty", photo: "./assets/img/Stoneoak_Logo.jpg" },
    { name: "Freedom Field", photo: "./assets/img/Hero-14.jpg" },
    { name: "Lofted", photo: "./assets/img/Digital.jpg" },
    { name: "Closershave", photo: "./assets/img/Empress_Poster.jpg" },
    { name: "Mad or Nomad", photo: "./assets/img/Hero-15.jpg" },
    { name: "Liftlab Beauty", photo: "./assets/img/Liftlab_Hero.jpg" },
    { name: "Keylocations", photo: "./assets/img/Axillex_Depot.jpg" },
    { name: "The Grewery", photo: "./assets/img/Hero-14.jpg" },
    { name: "Beevitalise", sup: true, photo: "./assets/img/Digital.jpg" }
  ];

  const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

  class SiteMenu extends HTMLElement {
    connectedCallback() {
      if (!window.gsap) {
        window.addEventListener("load", () => this.connectedCallback(), { once: true });
        return;
      }

      if (this.dataset.initialized) return;
      this.dataset.initialized = "true";

      this.innerHTML = `
        <main
          id="menu"
          style="visibility:hidden"
          class="fixed inset-0 z-[200] grid w-full grid-cols-1 overflow-x-hidden overflow-y-auto bg-[#111111] lg:grid-cols-[48.2fr_23.75fr_28.05fr] lg:grid-rows-[minmax(100%,auto)]"
        >
          <section id="left" class="relative hidden overflow-hidden bg-[#5b7180] lg:block">
            <a
              id="logo"
              href="index.html"
              aria-label="Fairground home"
              class="absolute z-20 flex h-12 items-center text-[clamp(24px,1.75vw,38px)] font-bold leading-none tracking-[-0.035em] text-[#111] ${FOCUS} focus-visible:outline-[#111] lg:left-[19.4%] lg:top-[calc(6.3vh_-_24px)]"
            >
              Fairgr
              <svg
                id="logoStar"
                class="mx-[0.02em] inline-block h-[0.82em] w-[0.82em] translate-y-[0.07em]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3.4"
                stroke-linecap="round"
              >
                <line x1="12" y1="2.5" x2="12" y2="21.5" />
                <line x1="3.8" y1="7.25" x2="20.2" y2="16.75" />
                <line x1="3.8" y1="16.75" x2="20.2" y2="7.25" />
              </svg>
              und
            </a>

            <div id="photoStage" class="absolute inset-0">
              <img src="${BASE_PHOTO}" alt="Fairground studio" class="absolute inset-0 h-full w-full object-cover" />
              <img alt="" class="photo-hover absolute inset-0 h-full w-full object-cover opacity-0" />
              <img alt="" class="photo-hover absolute inset-0 h-full w-full object-cover opacity-0" />
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25"></div>
            </div>
          </section>

          <section
            id="mid"
            role="navigation"
            aria-label="Projects"
            class="relative order-2 flex flex-col bg-[#111111] px-6 py-12 sm:px-10 lg:order-none lg:px-6 lg:pb-[6vh] lg:pt-[17.27vh] xl:px-[10%] 2xl:px-[16.7%]"
          >
            <h2 class="reveal-mid flex min-h-[3.4rem] items-center text-[clamp(26px,1.78vw,42px)] font-bold leading-none tracking-[-0.02em] text-white lg:mb-[2.43vh] lg:min-h-[clamp(3rem,5.38vh,5.5rem)]">
              Projects
            </h2>

            <ul id="projList" class="group text-[clamp(17px,1.29vw,28px)] font-normal tracking-[-0.005em]">
              ${PROJECTS.map((item) => this.projectItem(item)).join("")}
            </ul>

            <a
              href="#"
              class="reveal-mid mt-4 flex min-h-[2.6rem] items-center text-[clamp(12px,.83vw,17px)] font-medium text-[#ccff00] transition-opacity hover:opacity-70 lg:min-h-[4.4vh]"
            >
              All Projects
            </a>
          </section>

          <section
            id="right"
            role="navigation"
            aria-label="Primary"
            class="relative order-1 flex flex-col bg-[#ccff00] px-6 pb-12 pt-24 text-black sm:px-10 lg:order-none lg:px-[14.1%] lg:pb-[9vh] lg:pt-[28.6vh]"
          >
            <button
              id="close"
              type="button"
              aria-label="Close menu"
              class="group absolute right-6 top-[calc(1.5rem_+_env(safe-area-inset-top,0px))] flex h-11 w-11 items-center justify-center text-black ${FOCUS} focus-visible:outline-black lg:left-[calc(61%_-_22px)] lg:right-auto lg:top-[calc(6.94vh_-_22px)]"
            >
              <svg
                class="transition-transform duration-500 ease-out group-hover:rotate-90"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                stroke="currentColor"
                stroke-width="3.2"
                stroke-linecap="square"
              >
                <path d="M3 3 23 23M23 3 3 23" />
              </svg>
            </button>

            <ul id="rightList" class="text-[clamp(28px,1.8vw,44px)] font-bold leading-none tracking-[-0.02em]">
              ${LINKS.map((item) => this.rightItem(item)).join("")}
            </ul>

            <a
              href="#"
              class="reveal-right mt-2 flex min-h-[2.6rem] items-center text-[clamp(13px,.85vw,17px)] font-light text-black/40 transition-colors hover:text-black lg:mt-[1.2vh] lg:min-h-[4.4vh] lg:text-black/20"
            >
              Join Us
            </a>

            <div class="reveal-right mt-12 lg:mt-auto lg:pt-10">
              <div class="flex items-center gap-[clamp(18px,1.5vw,30px)]">
                <a href="#" aria-label="Instagram" class="block ${FOCUS} focus-visible:outline-black">
                  <svg
                    class="h-[clamp(20px,1.08vw,24px)] w-[clamp(20px,1.08vw,24px)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.3"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5.2" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" class="text-[clamp(18px,1.15vw,26px)] font-extrabold leading-none tracking-tight">in</a>
                <a href="#" aria-label="Behance" class="text-[clamp(17px,1.1vw,25px)] font-extrabold leading-none tracking-tight">Bē</a>
              </div>

              <p class="mt-6 text-[clamp(12px,.8vw,16px)]">
                <strong class="mr-[.35em] font-bold">LDN</strong>
                <span>- <time id="time">07:18</time></span>
              </p>
            </div>
          </section>
        </main>
      `;

      this.menu = this.querySelector("#menu");
      this.isOpen = false;
      this.locked = false;
      this.speed = matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 1;

      this.setupPhotos();
      this.setupClock();
      this.setupTimeline();
      this.setupControls();
    }

    projectItem(item) {
      const sup = item.sup ? '<sup class="ml-[1px] align-super text-[.45em]">®</sup>' : "";

      return `
        <li class="reveal-mid flex min-h-[3.25rem] lg:min-h-[clamp(2.5rem,5.38vh,5.5rem)]">
          <a
            href="#"
            data-photo="${item.photo}"
            class="group/item flex w-full items-center py-1 text-white transition-colors duration-300 group-hover:text-white/40 hover:!text-white ${FOCUS} focus-visible:outline-white"
          >
            <span class="inline-block transition-transform duration-500 ease-out group-hover/item:translate-x-3">${item.name}${sup}</span>
          </a>
        </li>
      `;
    }

    rightItem(item) {
      return `
        <li class="reveal-right flex min-h-[4.25rem] lg:min-h-[clamp(3.5rem,8.75vh,7rem)]">
          <a
            href="${item.href}"
            data-photo="${item.photo}"
            class="group/item flex w-full items-center text-black/60 transition-colors duration-300 ${FOCUS} focus-visible:outline-black lg:text-black/20 lg:hover:text-black"
          >
            <span class="inline-block transition-transform duration-500 ease-out group-hover/item:translate-x-2.5">${item.name}</span>
          </a>
        </li>
      `;
    }

    setupPhotos() {
      const desktop = matchMedia("(min-width: 1024px)");
      const layers = [...this.querySelectorAll(".photo-hover")];
      let top = 0;
      let current = "";

      if (desktop.matches) {
        [...PROJECTS, ...LINKS].forEach((item) => (new Image().src = item.photo));
      }

      const showPhoto = (src) => {
        if (!desktop.matches || src === current) return;
        current = src;

        top = 1 - top;
        const next = layers[top];

        next.src = src;
        gsap.set(next, { zIndex: 2 });
        gsap.set(layers[1 - top], { zIndex: 1 });
        gsap.fromTo(
          next,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out", overwrite: true }
        );
      };

      const hidePhoto = () => {
        current = "";
        gsap.to(layers, { opacity: 0, duration: 0.7, ease: "power2.out", overwrite: true });
      };

      ["#projList", "#rightList"].forEach((selector) => {
        const list = this.querySelector(selector);

        list.addEventListener("mouseover", (event) => {
          const link = event.target.closest("a");
          if (link) showPhoto(link.dataset.photo);
        });

        list.addEventListener("mouseleave", hidePhoto);
      });
    }

    setupClock() {
      const time = this.querySelector("#time");
      const format = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/London"
      });

      const tick = () => (time.textContent = format.format(new Date()));

      tick();
      this.clock = setInterval(tick, 1000);
    }

    setupTimeline() {
      const q = (selector) => this.querySelectorAll(selector);

      this.tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });

      this.tl
        .fromTo("#left", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.15 }, 0)
        .fromTo("#mid", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.15 }, 0.1)
        .fromTo("#right", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 1.15 }, 0.2)
        .fromTo(q(".reveal-mid"), { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.05 }, 0.55)
        .fromTo(q(".reveal-right"), { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.07 }, 0.65)
        .fromTo("#close", { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.9 }, 0.8)
        .fromTo("#logo", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.7)
        .fromTo("#photoStage", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.3 }, 0.15);

      gsap.to("#logoStar", { rotation: 360, duration: 12, repeat: -1, ease: "none" });
    }

    lockScroll(lock) {
      if (lock === this.locked) return;
      this.locked = lock;

      const html = document.documentElement;
      html.style.paddingRight = lock ? window.innerWidth - html.clientWidth + "px" : "";
      html.style.overflow = lock ? "hidden" : "";

      if (window.lenis) lock ? window.lenis.stop() : window.lenis.start();
    }

    openMenu = () => {
      if (this.isOpen) return;
      this.isOpen = true;

      this.menu.style.visibility = "visible";
      this.lockScroll(true);
      this.tl.timeScale(this.speed).play();
    };

    closeMenu = () => {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.tl.timeScale(this.speed * 1.5).reverse();
    };

    setupControls() {
      this.tl.eventCallback("onReverseComplete", () => {
        if (this.isOpen) return;

        this.menu.style.visibility = "hidden";
        this.menu.scrollTop = 0;
        this.lockScroll(false);
      });

      this.querySelector("#close").addEventListener("click", this.closeMenu);

      this.menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) this.closeMenu();
      });

      this.onKeydown = (event) => {
        if (event.key === "Escape") this.closeMenu();
      };

      this.onToggle = () => (this.isOpen ? this.closeMenu() : this.openMenu());

      document.addEventListener("keydown", this.onKeydown);
      document.addEventListener("toggle-menu", this.onToggle);
    }

    disconnectedCallback() {
      clearInterval(this.clock);
      document.removeEventListener("keydown", this.onKeydown);
      document.removeEventListener("toggle-menu", this.onToggle);
      this.lockScroll(false);
      if (this.tl) this.tl.kill();
    }
  }

  customElements.define("site-menu", SiteMenu);
})();