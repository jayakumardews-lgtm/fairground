class SiteHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <header id="header" class="sticky z-30 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        <a href="#top" class="split font-display font-700 text-lg sm:text-xl lg:text-2xl tracking-tight flex items-center gap-1">
          Fairgr<span class="text-lime-400">&#x2733;</span>und
        </a>
        <button id="menu-btn" aria-label="Open menu" class="flex flex-row gap-[3px] p-2">
          <span class="block w-[2px] h-4 bg-white"></span>
          <span class="block w-[2px] h-4 bg-white"></span>
          <span class="block w-[2px] h-4 bg-white"></span>
        </button>
      </header>
    `;

    this.setupMenuToggle();
    this.setupAnimations();
  }

setupAnimations() {
  const header = this.querySelector("#header");
  const splitTarget = this.querySelector(".split");

  gsap.registerPlugin(
    ScrollTrigger,
    CustomEase,
    CustomBounce,
    SplitText
  );

  gsap.set(header, {
    paddingTop: window.innerWidth >= 640 ? 32 : 24,
    paddingBottom: 24
  });

  console.log("BEFORE animation:");
  console.log("padding top:", getComputedStyle(header).paddingTop);
  console.log("padding right:", getComputedStyle(header).paddingRight);
  console.log("padding bottom:", getComputedStyle(header).paddingBottom);
  console.log("padding left:", getComputedStyle(header).paddingLeft);

  const headerAnimation = gsap.timeline();

  headerAnimation.to(header, {
    top: 10,
    backgroundColor: "#232323",
    borderRadius: "30px",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 18,
    duration: 0.4,
    ease: "power2.out"
  });

  ScrollTrigger.create({
    trigger: header,
    start: "top -10px",
    toggleActions: "play none none reverse",
    animation: headerAnimation,
  });

  if (!gsap.parseEase("myBounce")) {
    CustomBounce.create("myBounce", {
      strength: 0.6,
      squash: 3,
      squashID: "myBounce-squash"
    });
  }

  const split = SplitText.create(splitTarget, {
    type: "words, chars"
  });

  gsap.from(split.chars, {
    duration: 1,
    y: 10,
    ease: "myBounce",
    autoAlpha: 0,
    stagger: 0.07
  });
}

  setupMenuToggle() {
    const menuBtn = this.querySelector('#menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        console.log('Menu button clicked!');
        this.dispatchEvent(new CustomEvent('toggle-menu', { bubbles: true }));
      });
    }
  }
}

customElements.define('site-header', SiteHeader);