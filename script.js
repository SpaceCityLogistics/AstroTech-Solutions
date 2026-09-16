// Generate starfield
(function(){
  const field = document.getElementById('starfield');
  if(!field) return;
  const starCount = 180;
  for(let i=0;i<starCount;i++){
    const s = document.createElement('div');
    const isGreen = Math.random() < 0.15;
    const isBig = Math.random() < 0.2;
    s.className = 'star' + (isGreen ? ' green' : '') + (isBig ? ' big' : '');
    const size = isBig ? (Math.random()*2 + 2.8) : (Math.random()*2 + 1.4);
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.top = Math.random()*100 + '%';
    s.style.left = Math.random()*100 + '%';
    s.style.setProperty('--min-o', (Math.random()*0.2 + 0.35).toFixed(2));
    s.style.setProperty('--max-o', (Math.random()*0.2 + 0.8).toFixed(2));
    s.style.animationDuration = (Math.random()*3 + 2) + 's';
    s.style.animationDelay = (Math.random()*4) + 's';
    field.appendChild(s);
  }

  const moon = document.createElement('div');
  moon.className = 'moon';
  moon.style.width = '110px'; moon.style.height = '110px';
  moon.style.top = '6%'; moon.style.left = '84%';
  field.appendChild(moon);

  const ring = document.createElement('div');
  ring.className = 'planet-ring';
  ring.style.width = '170px'; ring.style.height = '50px';
  ring.style.top = '4%'; ring.style.left = '78%';
  field.appendChild(ring);

  const smallMoon = document.createElement('div');
  smallMoon.className = 'moon';
  smallMoon.style.width = '46px'; smallMoon.style.height = '46px';
  smallMoon.style.top = '58%'; smallMoon.style.left = '4%';
  field.appendChild(smallMoon);

  const meteorCount = 9;
  for(let i=0;i<meteorCount;i++){
    const m = document.createElement('div');
    const variant = Math.random();
    m.className = 'meteor' + (variant < 0.3 ? ' big' : variant > 0.7 ? ' thin' : '');
    m.style.top = (Math.random()*70 - 20) + '%';
    m.style.left = (Math.random()*90 - 20) + '%';
    m.style.animationDuration = (1.6 + Math.random()*1.8) + 's';
    m.style.animationDelay = (Math.random()*7) + 's';
    field.appendChild(m);
  }
})();

// Hamburger menu toggle
(function(){
  const menuBtn = document.getElementById('menuBtn');
  const navPanel = document.getElementById('navPanel');
  const navOverlay = document.getElementById('navOverlay');
  if(!menuBtn || !navPanel || !navOverlay) return;
  function closeMenu(){
    menuBtn.classList.remove('open');
    navPanel.classList.remove('open');
    navOverlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu(){
    const isOpen = navPanel.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    navOverlay.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  }
  menuBtn.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);
  navPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
})();

// Booking form -> Formspree submission
(function(){
  const form = document.getElementById('quoteForm');
  if(!form) return;
  const submitBtn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent = '';
    statusEl.style.color = '';

    try{
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if(response.ok){
        form.reset();
        statusEl.style.color = '#7dffa3';
        statusEl.textContent = "Transmission received! We'll make contact shortly to confirm timing and price.";
        submitBtn.textContent = 'Sent ✓';
        setTimeout(() => {
          submitBtn.textContent = 'Request Appointment';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch(err){
      statusEl.style.color = '#ff8080';
      statusEl.textContent = "Something went wrong. Please call or text us at (480) 930-5278 instead.";
      submitBtn.textContent = 'Request Appointment';
      submitBtn.disabled = false;
    }
  });
})();
