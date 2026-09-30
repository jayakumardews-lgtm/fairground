gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".work-card");
const fog = document.querySelector("#cardFog");
const closeBtn = document.querySelector("#focusClose");
const cursor = document.querySelector("#cursor");
const hero = document.querySelector("#heroSection");
const noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasMouse = matchMedia("(hover: hover)").matches;
const IMG_SCALE = 1.2;

let current = null;
let floats = [];
let busy = false;

cards.forEach((card) => {
  const title = card.querySelector("h2");

  title.innerHTML = `<span class="mask"><span class="inner">${title.innerHTML}</span></span>`;

  gsap.set(card.querySelector("img"), { scale: IMG_SCALE });
});

gsap.set(closeBtn, { autoAlpha: 0, scale: 0.6, rotation: -90 });


if (!noMotion && hero && heroBg) {

  gsap.fromTo(
    heroBg,
    {
      scale: 1.25,
      transformOrigin: "center center",
    },
    {
      scale: 1,
      duration: 2.5,
      ease: "expo.out",
    }
  );


  gsap.to(heroBg, {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
}



  cards.forEach((card, i) => {
    const media = card.children[0];
    const img = card.querySelector("img");
    const kicker = card.querySelector("p");
    const title = card.querySelector(".inner");

    gsap
      .timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: card, start: "top 85%" },
      })
      .fromTo(
        media,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
      )
      .fromTo(img, { scale: 1.8 }, { scale: IMG_SCALE, duration: 1.8 }, 0)
      .fromTo(
        kicker,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1 },
        0.4,
      )
      .fromTo(title, { yPercent: 110 }, { yPercent: 0, duration: 1.1 }, 0.5);

    gsap.fromTo(
      img,
      { yPercent: -9 },
      {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    if (window.innerWidth >= 1024) {
      gsap.fromTo(
        card,
        { yPercent: "random(3, 8)" },
        {
          yPercent: (i, target) => {
            return -parseFloat(gsap.getProperty(target, "yPercent"));
          },
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }
  });


function showCursor(text) {
  if (!hasMouse) return;
  cursor.querySelector("span").textContent = text;
  gsap.to(cursor, {
    scale: 1,
    duration: 0.4,
    ease: "expo.out",
    overwrite: "auto",
  });
}

function hideCursor() {
  if (!hasMouse) return;
  gsap.to(cursor, {
    scale: 0,
    duration: 0.3,
    ease: "power3.out",
    overwrite: "auto",
  });
}

if (hasMouse) {
  gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 1 });

  const moveX = gsap.quickTo(cursor, "x", {
    duration: 0.5,
    ease: "power3.out",
  });
  const moveY = gsap.quickTo(cursor, "y", {
    duration: 0.5,
    ease: "power3.out",
  });

  window.addEventListener("mousemove", (e) => {
    moveX(e.clientX);
    moveY(e.clientY);
  });

  cards.forEach((card) => {
    const img = card.querySelector("img");

    card.addEventListener("mouseenter", () => {
      if (current) return;
      showCursor("View");
      gsap.to(img, {
        scale: IMG_SCALE * 1.07,
        duration: 1.2,
        ease: "expo.out",
        overwrite: "auto",
      });
    });

    card.addEventListener("mouseleave", () => {
      hideCursor();
      gsap.to(img, {
        scale: IMG_SCALE,
        duration: 1.2,
        ease: "expo.out",
        overwrite: "auto",
      });
    });
  });

  fog.addEventListener("mouseenter", () => current && showCursor("Close"));
  fog.addEventListener("mouseleave", hideCursor);
}

const stopScroll = (e) => e.preventDefault();

function openFocus(card) {
  if (current || busy) return;
  busy = true;
  hideCursor();

  const r = card.getBoundingClientRect();
  const others = cards.filter((c) => c !== card);

  const clone = card.cloneNode(true);
  clone.removeAttribute("tabindex");
  Object.assign(clone.style, {
    position: "fixed",
    left: r.left + "px",
    top: r.top + "px",
    width: r.width + "px",
    margin: "0",
    zIndex: 100,
    cursor: "default",
  });
  clone.addEventListener("mouseenter", hideCursor);

  document.body.appendChild(clone);
  card.style.visibility = "hidden";

  const targetWidth =
    window.innerWidth < 768 ? innerWidth * 0.92 : innerWidth * 0.6;
  const scale = Math.min(targetWidth / r.width, (innerHeight * 0.8) / r.height);
  const x = innerWidth / 2 - (r.left + r.width / 2);
  const y = innerHeight / 2 - (r.top + r.height / 2);

  window.addEventListener("wheel", stopScroll, { passive: false });
  window.addEventListener("touchmove", stopScroll, { passive: false });

  current = { card, clone, others };
  fog.classList.add("is-active");

  const tl = gsap.timeline({
    defaults: { duration: 1.1, ease: "expo.inOut" },
    onComplete: () => {
      busy = false;

      floats = others.map((el) =>
        gsap.to(el, {
          y: gsap.getProperty(el, "y") + gsap.utils.random(-14, 14),
          duration: gsap.utils.random(3, 5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        }),
      );
    },
  });

  tl.to(fog, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0)
    .to(clone, { x, y, scale }, 0)
    .to(clone.querySelector("img"), { scale: 1, yPercent: 0 }, 0)
    .to(
      closeBtn,
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.7, ease: "expo.out" },
      0.5,
    );

  others.forEach((el) => {
    const b = el.getBoundingClientRect();
    const dx = b.left + b.width / 2 - innerWidth / 2;
    const dy = b.top + b.height / 2 - innerHeight / 2;
    const dist = Math.hypot(dx, dy) || 1;
    const push = 70 + 240 * (1 - Math.min(dist / 1100, 1));

    tl.to(
      el,
      {
        x: (dx / dist) * push,
        y: (dy / dist) * push,
        rotation: gsap.utils.random(-5, 5),
        scale: 0.92,
        opacity: 0.4,
        duration: 1.3,
        ease: "expo.out",
      },
      0.05,
    );
  });
}

function closeFocus() {
  if (!current || busy) return;
  busy = true;
  hideCursor();

  const { card, clone, others } = current;

  floats.forEach((t) => t.kill());
  floats = [];

  const img = card.querySelector("img");

  gsap
    .timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      onComplete: () => {
        clone.remove();
        card.style.visibility = "";
        fog.classList.remove("is-active");
        window.removeEventListener("wheel", stopScroll);
        window.removeEventListener("touchmove", stopScroll);
        current = null;
        busy = false;
      },
    })
    .to(
      closeBtn,
      {
        autoAlpha: 0,
        scale: 0.6,
        rotation: 90,
        duration: 0.4,
        ease: "power3.in",
      },
      0,
    )
    .to(clone, { x: 0, y: 0, scale: 1 }, 0.05)
    .to(
      clone.querySelector("img"),
      {
        scale: gsap.getProperty(img, "scale"),
        yPercent: gsap.getProperty(img, "yPercent"),
      },
      0.05,
    )
    .to(fog, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0.2)
    .to(
      others,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        stagger: { each: 0.02, from: "random" },
      },
      0,
    );
}

cards.forEach((card) => card.addEventListener("click", () => openFocus(card)));

fog.addEventListener("click", closeFocus);
closeBtn.addEventListener("click", closeFocus);
window.addEventListener("resize", closeFocus);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFocus();
});

window.addEventListener("load", () => ScrollTrigger.refresh());



let lastWidth = window.innerWidth;

window.addEventListener("resize", () => {
  const currentWidth = window.innerWidth;

  const crossedBreakpoint =
    (lastWidth < 640 && currentWidth >= 640) ||
    (lastWidth >= 640 && currentWidth < 640) ||
    (lastWidth < 1024 && currentWidth >= 1024) ||
    (lastWidth >= 1024 && currentWidth < 1024);

  if (crossedBreakpoint) {
    window.location.reload();
  }

  lastWidth = currentWidth;
});