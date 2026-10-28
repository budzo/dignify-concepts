document.querySelectorAll('.menu').forEach(button=>button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));document.querySelector('header').classList.toggle('open',open);button.textContent=open?'Close −':'Menu +';}));document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('header').classList.remove('open');const b=document.querySelector('.menu');b.setAttribute('aria-expanded','false');b.textContent='Menu +';}));
// Testimonials rotate slowly; pause for reading, keyboard use, or reduced motion.
document.querySelectorAll('.testimonials').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.testimonial-slide')];
  const region = carousel.querySelector('.testimonial-slides');
  const count = carousel.querySelector('.testimonial-count');
  const pause = carousel.querySelector('.testimonial-pause');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = motion.matches;
  let hovering = false;
  let focusing = false;
  let timer;
  function show(index, manual = false) {
    current = (index + slides.length) % slides.length;
    region.setAttribute('aria-live', manual ? 'polite' : 'off');
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }
  function schedule() {
    clearInterval(timer);
    pause.textContent = paused ? 'Play ▶' : 'Pause ⏸';
    pause.setAttribute('aria-label', `${paused ? 'Start' : 'Pause'} testimonial rotation`);
    if (!paused && !hovering && !focusing && !document.hidden) timer = setInterval(() => show(current + 1), 8000);
  }
  carousel.querySelector('[data-previous]').addEventListener('click', () => { show(current - 1, true); schedule(); });
  carousel.querySelector('[data-next]').addEventListener('click', () => { show(current + 1, true); schedule(); });
  pause.addEventListener('click', () => { paused = !paused; schedule(); });
  carousel.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  carousel.addEventListener('focusin', () => { focusing = true; schedule(); });
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { focusing = false; schedule(); } });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', event => { paused = event.matches; schedule(); });
  schedule();
});

// Mockup only: validate locally; never transmit or retain email addresses.
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.newsletter-status').textContent = 'Preview only — your email has not been submitted. Newsletter signup will be connected during implementation.';
  });
});
