gsap.registerPlugin(ScrollTrigger);


const lenis = new Lenis();                              
lenis.on('scroll', ScrollTrigger.update);                 
gsap.ticker.add(time => lenis.raf(time * 1000));   
gsap.ticker.lagSmoothing(0);



const services = {
  strategy: [
    ['Brand Positioning',       'We define where your brand sits in the market and the space only you can own, so every decision that follows has a clear anchor.'],
    ['Brand Architecture',      'A clear structure for how your brands, products and services relate to each other, built to grow without becoming confusing.'],
    ['Market Research & Analysis', 'Competitor, audience and category insight that turns assumptions into evidence and highlights real opportunities.'],
    ['Naming',                  'Distinctive, ownable names for companies, products and services, tested for meaning, sound and availability.'],
    ['Tone of Voice',           'A consistent way of speaking that sounds like you everywhere, from the homepage to the help centre.'],
    ['Messaging',               'Core messages and proof points that make your story easy to tell, and easy to remember.']
  ],
  creative: [
    ['Brand Identity',          'Logos, colour, type and systems that give your brand a recognisable face and the flexibility to work everywhere.'],
    ['Art Direction',           'A cohesive visual language across imagery, layout and motion so every touchpoint feels considered.'],
    ['Copywriting',             'Clear, characterful words for campaigns, websites and launches, written to sound like a person.'],
    ['Packaging Design',        'Packaging that earns its place on the shelf and delivers a memorable unboxing.'],
    ['Graphic Design',          'Print and digital collateral, from pitch decks to social templates, crafted with care.'],
    ['Advertising Campaigns',   'Big ideas developed for the channels that matter, with creative built to be noticed and remembered.'],
    ['Environment Branding',    'Brand brought into physical spaces through signage, wayfinding and installations.'],
    ['3D Visualisation',        'Photoreal and stylised 3D for products, spaces and concepts before they exist.'],
    ['Animation',               'Motion design and animated identities that bring your brand to life on screen.']
  ],
  digital: [
    ['Web Design',              'Websites designed around your users and your goals, with clear journeys and a strong visual identity.'],
    ['Wireframing & Prototyping','Structure and interaction mapped out early, so ideas are tested before development begins.'],
    ['Web Development',         'Fast, accessible, standards-based builds that are easy for your team to manage.'],
    ['Digital Toolkits',        'Templates, guidelines and assets that let your team create on-brand digital content with confidence.']
  ]
};





const caretSVG = '<svg class="caret shrink-0" viewBox="0 0 10 9"><path d="M0 1h10L5 9z" fill="currentColor"/></svg>';

document.querySelectorAll('[data-accordion]').forEach(root => {
  const items = services[root.dataset.accordion] || [];
  root.innerHTML = items.map(([title, text]) => `
    <div class="acc-item">
      <button class="acc-head" type="button" aria-expanded="false">
        <span>${title}</span>${caretSVG}
      </button>
      <div class="acc-body"><p>${text}</p></div>
    </div>`).join('');

  root.addEventListener('click', e => {
    const head = e.target.closest('.acc-head');
    if (!head) return;
    const isOpen = head.getAttribute('aria-expanded') === 'true';

    root.querySelectorAll('.acc-head[aria-expanded="true"]').forEach(h => { if (h !== head) setAccordion(h, false); });
    setAccordion(head, !isOpen);
  });
});

function setAccordion(head, open) {
  const item = head.closest('.acc-item');
  head.setAttribute('aria-expanded', open);
  gsap.to(item.querySelector('.acc-body'), {
    height: open ? 'auto' : 0,
    duration: .55,
    ease: 'power3.inOut',
    onComplete: () => ScrollTrigger.refresh()
  });
  gsap.to(head.querySelector('.caret'), { rotate: open ? 180 : 0, duration: .4, ease: 'power2.out' });
}


gsap.timeline({ defaults: { ease: 'power3.out' } })
  .from('.h1-line', { yPercent: 110, duration: 1, stagger: .09 })
  .fromTo('.hero-img', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out', clearProps: 'clipPath' }, .1)
  .from('.hero-img img', { scale: 1.25, duration: 1.6 }, .1)
  .from('[data-hero]', { y: 24, opacity: 0, duration: .9, stagger: .1 }, .6);





gsap.utils.toArray('[data-rule]').forEach(el => {
  gsap.from(el, { scaleX: 0, duration: 1.3, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 92%' } });
});
gsap.utils.toArray('[data-reveal]').forEach(el => {
  gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});
gsap.utils.toArray('[data-stagger]').forEach(el => {
  gsap.from(el.children, { y: 30, opacity: 0, duration: .9, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
});


