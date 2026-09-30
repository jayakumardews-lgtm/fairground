class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.timerInterval = null;
  }

  connectedCallback() {
    const currentYear = new Date().getFullYear();

    this.innerHTML = `
      <footer id="contact" class="relative w-full overflow-hidden border-t-[3px] border-black bg-white text-black z-50">
        <div class="mx-auto w-full max-w-[1220px] px-5 py-[60px] sm:px-8 sm:py-[70px] md:py-[80px] lg:px-10 lg:py-[90px] xl:px-0 xl:pt-[96px] xl:pb-[88px]">
          
          <div class="block xl:hidden">
            <div class="flex items-start justify-between gap-6">
              <div class="shrink-0">
                <p class="font-display text-[12px] leading-[1.05] sm:text-[13px]">Get in touch</p>
                <span class="mt-[28px] block text-[48px] leading-none sm:mt-[32px] sm:text-[54px]">&#x2733;</span>
              </div>
              <a href="#top" class="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-lime-400 text-[14px] leading-none text-black transition-transform duration-300 hover:scale-105">▲</a>
            </div>
            <div class="mt-[48px] sm:mt-[55px]">
              <h3 class="max-w-[760px] font-display font-900 text-[32px] leading-[1.05] tracking-[-1px] underline decoration-[2px] underline-offset-[5px] sm:text-[40px] sm:leading-[1.03] sm:tracking-[-1.2px]">Where do you want to take your brand experience?</h3>
              <a href="mailto:hello@fairground.studio" class="mt-[38px] block w-fit max-w-full break-all font-display font-700 text-[19px] leading-tight transition-colors duration-300 hover:text-lime-400 sm:mt-[45px] sm:text-[21px]">hello@fairground.studio</a>
            </div>
            <div class="mt-[48px] border-t border-black/10 pt-[28px] sm:mt-[55px] sm:pt-[32px]">
              <div class="flex flex-col gap-[10px] text-[14px]">
                <a href="#" class="font-display transition-colors hover:text-lime-400">Instagram</a>
                <a href="#" class="font-display transition-colors hover:text-lime-400">LinkedIn</a>
                <a href="#" class="font-display transition-colors hover:text-lime-400">Behance</a>
              </div>
              <div class="mt-[38px] flex flex-wrap gap-x-[28px] gap-y-[12px] sm:mt-[42px] sm:gap-x-[42px]">
                <a href="#" class="font-display text-[13px] transition-colors hover:text-lime-400">T&amp;C's</a>
                <a href="#" class="font-display text-[13px] transition-colors hover:text-lime-400">Privacy</a>
                <a href="#" class="font-display text-[13px] transition-colors hover:text-lime-400">Cookies</a>
                <a href="#" class="font-display text-[13px] transition-colors hover:text-lime-400">Sitemap</a>
              </div>
              <div class="mt-[28px] flex flex-col gap-[12px] sm:mt-[30px] sm:flex-row sm:items-center sm:justify-between">
                <p class="font-display text-[13px]">© Copyright Fairground ${currentYear}</p>
                <p class="ldnClock whitespace-nowrap font-display text-[13px]"><span class="font-700">LDN</span> - --:--</p>
              </div>
            </div>
          </div>

    
          <div class="hidden xl:grid xl:grid-cols-[170px_minmax(0,1fr)_90px]">
            <div>
              <p class="font-display text-[12px] leading-none">Get in touch</p>
              <span class="mt-[37px] block text-[58px] leading-none">&#x2733;</span>
            </div>
            <div>
              <h3 class="max-w-[760px] font-display font-900 text-[46px] leading-[1.02] tracking-[-1.5px] underline decoration-[3px] underline-offset-[5px]">Where do you want to take your brand experience?</h3>
              <a href="mailto:hello@fairground.studio" class="mt-[54px] block w-fit font-display font-700 text-[21px] leading-none transition-colors duration-300 hover:text-lime-400">hello@fairground.studio</a>
              <div class="mt-[52px] flex items-center gap-[70px]">
                <a href="#" class="font-display text-[13px] hover:text-lime-400">T&amp;C's</a>
                <a href="#" class="font-display text-[13px] hover:text-lime-400">Privacy</a>
                <a href="#" class="font-display text-[13px] hover:text-lime-400">Cookies</a>
                <a href="#" class="font-display text-[13px] hover:text-lime-400">Sitemap</a>
              </div>
              <p class="mt-[27px] font-display text-[13px]">© Copyright Fairground ${currentYear}</p>
            </div>
            <div class="flex flex-col items-end">
              <a href="#top" class="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-lime-400 text-[14px] leading-none transition-transform duration-300 hover:scale-105">▲</a>
              <div class="mt-[109px] flex flex-col items-end gap-[12px] text-[14px]">
                <a href="#" class="font-display hover:text-lime-400">Instagram</a>
                <a href="#" class="font-display hover:text-lime-400">LinkedIn</a>
                <a href="#" class="font-display hover:text-lime-400">Behance</a>
              </div>
              <p class="ldnClock mt-[41px] whitespace-nowrap font-display text-[13px]"><span class="font-700">LDN</span> - --:--</p>
            </div>
          </div>

        </div>
      </footer>
    `;

    this.startLondonClock();
  }

  startLondonClock() {
    const updateTime = () => {
      const ldnTimeString = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      this.querySelectorAll('.ldnClock').forEach(el => {
        el.innerHTML = `<span class="font-700">LDN</span> - ${ldnTimeString}`;
      });
    };

    updateTime(); 
    this.timerInterval = setInterval(updateTime, 1000); 
  }

  disconnectedCallback() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}

customElements.define('site-footer', SiteFooter);
