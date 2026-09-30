const lenis = new Lenis();                              
lenis.on('scroll', ScrollTrigger.update);                 
gsap.ticker.add(time => lenis.raf(time * 1000));   
gsap.ticker.lagSmoothing(0);

function updateClock() {
  const el = document.getElementById("ldnClock");
  if (!el) return;
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  el.textContent = "LDN · " + fmt;
}
updateClock();
setInterval(updateClock, 30000);


gsap.registerPlugin(ScrollTrigger);

const topsection = document.querySelector("#top");

if (topsection) {
  gsap.to(topsection, {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: topsection,
      start: "top top",
      endTrigger: ".slidey",
      end: "top top",
      pin: true,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}

const design = document.querySelector("#design");
const heading = document.querySelector("#heading");
const pararight = document.querySelectorAll(".pararight");
const whatwedo = document.querySelector("#whatwedo");

const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power1.in" },
  scrollTrigger: {
    trigger: design,
    start: "top center",
    end: "bottom center ",
    toggleActions: "play pause resume pause",
  },
});

tl.fromTo(
  pararight,
  {
    opacity: 0,
    x: 40,
  },
  {
    opacity: 1,
    x: 0,
  },
)
  .fromTo(
    heading,
    {
      opacity: 0,
      x: -40,
    },
    {
      opacity: 1,
      x: 0,
    },
    "<",
  )
.fromTo(
  whatwedo,
  {
    opacity: 0,
    x: 40,
  },
  {
    opacity: 1,
    x: 0,
    delay: 1.1,
  },
);


const about = document.querySelector("#about");
const groupcards = document.querySelector("#groupcards");
const projectbtn = document.querySelector("#projectbtn");

const about_Tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.inOut" },
  scrollTrigger: {
    trigger: about,
    start: "top center",
    end: "bottom center",
    toggleActions: "play pause resume pause",
  },
});

about_Tl.fromTo(
  groupcards,
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
  },
);


gsap.fromTo(
  projectbtn,
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    delay: 1,
    duration:1.5,
    scrollTrigger: {
      trigger: projectbtn,
      start: "top center",
      end: "bottom top",
      toggleActions: "play pause resume pause"
    },
  },
);



const circle = document.querySelector("#rotatingCircle");
const footer = document.querySelector("#contact");

const text = "NO HALF MEASURES • ";
const radius = 82;

[...text].forEach((letter, i) => {
  const span = document.createElement("span");

  span.textContent = letter;

  span.className =
    "absolute left-1/2 top-1/2 " +
    "text-[16px] font-medium text-white";

  const angle = (360 / text.length) * i;

  span.style.transform = `
    rotate(${angle}deg)
    translateY(-${radius}px)
  `;

  span.style.transformOrigin = "0 0";

  circle.appendChild(span);
});

const spans = circle.querySelectorAll("span");


const tll = gsap.timeline({
  scrollTrigger: {
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: true,

    onUpdate: () => {
      spans.forEach((span) => {
        gsap.set(span, {
          color: Draggable.hitTest(span, footer) ? "#000000" : "#ffffff"
        });
      });
    }
  }
});

tll.to(circle, {
  rotation: 360,
  ease: "none"
});
