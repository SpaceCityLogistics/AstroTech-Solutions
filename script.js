// Generate starfield
(function(){
  const field = document.getElementById('starfield');
  if(!field) return;

  const UFO_SVG = '<svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="50" cy="34" rx="44" ry="8" fill="#1f8a4c"/>' +
    '<ellipse cx="50" cy="30.5" rx="40" ry="8" fill="#39ff6a"/>' +
    '<ellipse cx="50" cy="30.5" rx="40" ry="8" fill="none" stroke="#a8ffb8" stroke-width="1.3" opacity="0.85"/>' +
    '<ellipse cx="50" cy="25.5" rx="23" ry="6.5" fill="#7dffa3"/>' +
    '<path d="M36,26 A14,11 0 1 1 64,26 Z" fill="#0a1410" stroke="#7dffa3" stroke-width="1.6"/>' +
    '<ellipse cx="45" cy="19.5" rx="5" ry="2.6" fill="#a8ffb8" opacity="0.55"/>' +
    '<circle cx="17" cy="32" r="2.1" fill="#eafff0"/>' +
    '<circle cx="32" cy="36.5" r="2.1" fill="#eafff0"/>' +
    '<circle cx="50" cy="38" r="2.1" fill="#eafff0"/>' +
    '<circle cx="68" cy="36.5" r="2.1" fill="#eafff0"/>' +
    '<circle cx="83" cy="32" r="2.1" fill="#eafff0"/>' +
    '</svg>';

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
  moon.appendChild(document.createElement('div')).className = 'moon-ring';
  field.appendChild(moon);

  const smallMoon = document.createElement('div');
  smallMoon.className = 'moon';
  smallMoon.style.width = '46px'; smallMoon.style.height = '46px';
  smallMoon.style.top = '58%'; smallMoon.style.left = '4%';
  smallMoon.appendChild(document.createElement('div')).className = 'moon-ring';
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

  const ufoPaths = ['path-1', 'path-2', 'path-3'];
  const ufoCount = 4;
  for(let i=0;i<ufoCount;i++){
    const wrap = document.createElement('div');
    const sizeRoll = Math.random();
    wrap.className = 'ufo ' + ufoPaths[i % ufoPaths.length] + (sizeRoll < 0.3 ? ' small' : sizeRoll > 0.75 ? ' big' : '');
    wrap.style.top = (Math.random()*50 - 5) + '%';
    wrap.style.left = (Math.random()*50 - 5) + '%';
    wrap.style.animationDuration = (16 + Math.random()*10) + 's';
    wrap.style.animationDelay = (i * 1.5 + Math.random()*2) + 's';

    const inner = document.createElement('div');
    inner.className = 'ufo-inner';
    inner.style.animationDuration = (2 + Math.random()*1.4) + 's';
    inner.style.animationDelay = (Math.random()*2) + 's';
    inner.innerHTML = UFO_SVG;

    wrap.appendChild(inner);
    field.appendChild(wrap);
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
