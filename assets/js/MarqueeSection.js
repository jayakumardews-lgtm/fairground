const marqueeData = {
  home: {

    left: [
      "Illustration",
      "Typography",
      "Animation",
      "Brand Development",
      "3D Visualisation",
      "Motion Design",
    ],

    right: [
      "Copywriting",
      "Iconography",
      "App Development",
      "Social Media",
      "UI/UX",
      "Brand Guidelines",
    ],

  },



  about: {

    left: [
      "Creative Direction",
      "Art Direction",
      "Brand Strategy",
      "Visual Identity",
      "Digital Design",
      "Experience Design",
    ],

    right: [
      "Web Design",
      "Development",
      "Motion",
      "Interaction",
      "Typography",
      "Creative Technology",
    ],

  },

};


class MarqueeSection extends HTMLElement {

  constructor() {

    super();

    this.gsapContext = null;

  }


  connectedCallback() {

    this.style.display = "block";

    this.render();

    this.init();

  }


  render() {
    const page =
      this.dataset.page || "home";
    const data =
      marqueeData[page] || marqueeData.home;


    const leftItems = [
      ...data.left,
      ...data.left,
    ];

    const rightItems = [
      ...data.right,
      ...data.right,
    ];


    const itemClass = `
      inline-flex
      items-center
      whitespace-nowrap
      rounded-full
      border-2
      border-white/[0.76]
      font-['Poppins',_sans-serif]
      font-semibold
      text-[1.05rem]
      px-[1.9rem]
      py-4
      md:text-[2.2rem]
      md:px-[1.8rem]
      md:py-[0.85rem]
    `;


    const leftHTML =
      leftItems
        .map((item) => {

          return `
            <span class="${itemClass}">
              ${item}
            </span>
          `;

        })
        .join("");


    const rightHTML =
      rightItems
        .map((item) => {

          return `
            <span class="${itemClass}">
              ${item}
            </span>
          `;

        })
        .join("");


    this.innerHTML = `

      <section
        class="
          marquee-section
          py-4
          sm:py-6
          space-y-4
          sm:space-y-5
          overflow-hidden
          will-change-transform
        "
      >




        <div
          class="
            marquee-row
            overflow-hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          <div
            class="
              marquee-left
              flex
              w-max
              gap-3
              sm:gap-4
              px-4
              will-change-transform
            "
          >

            ${leftHTML}

          </div>

        </div>




        <div
          class="
            marquee-row
            overflow-hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          <div
            class="
              marquee-right
              flex
              w-max
              gap-3
              sm:gap-4
              px-4
              will-change-transform
            "
          >

            ${rightHTML}

          </div>

        </div>

      </section>

    `;

  }



  init() {

    this.initGSAP();

  }



  initGSAP() {


    if (typeof gsap === "undefined") {

      console.error(
        "MarqueeSection: GSAP is not loaded."
      );

      return;

    }



    if (typeof ScrollTrigger === "undefined") {

      console.error(
        "MarqueeSection: ScrollTrigger is not loaded."
      );

      return;

    }


    gsap.registerPlugin(ScrollTrigger);



    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    if (prefersReducedMotion) {

      return;

    }



    if (this.gsapContext) {

      this.gsapContext.revert();

      this.gsapContext = null;

    }


    this.gsapContext =
      gsap.context(() => {

        const section =
          this.querySelector(
            ".marquee-section"
          );


        const left =
          this.querySelector(
            ".marquee-left"
          );


        const right =
          this.querySelector(
            ".marquee-right"
          );


        const rows =
          this.querySelectorAll(
            ".marquee-row"
          );


        if (
          !section ||
          !left ||
          !right ||
          rows.length < 2
        ) {

          return;

        }


        gsap.set(left, {

          xPercent: 0,

        });


        gsap.set(right, {

          xPercent: -50,

        });


gsap.fromTo(

  section,

  {
    opacity: 0,
    y: 80,
    scale: 0.97,
  },

  {
    opacity: 1,
    y: 0,
    scale: 1,

    duration: 2,

    ease: "power3.out",

    scrollTrigger: {

      trigger: section,

      start: "top 88%",

      once: true,

    },

  }

);


        gsap.to(left, {

          xPercent: -50,

          ease: "none",

          scrollTrigger: {

            trigger: rows[0],

            start: "top bottom",

            end: "bottom top",

            scrub: 0.5,

          },

        });


        gsap.to(right, {

          xPercent: 0,

          ease: "none",

          scrollTrigger: {

            trigger: rows[1],

            start: "top bottom",

            end: "bottom top",

            scrub: 0.5,

          },

        });


      }, this);



    requestAnimationFrame(() => {

      ScrollTrigger.refresh();

    });

  }



  disconnectedCallback() {

    if (this.gsapContext) {

      this.gsapContext.revert();

      this.gsapContext = null;

    }

  }

}


if (
  !customElements.get("marquee-section")
) {

  customElements.define(
    "marquee-section",
    MarqueeSection
  );

}