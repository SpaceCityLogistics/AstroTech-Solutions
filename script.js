// Generate starfield
(function(){
  const field = document.getElementById('starfield');
  if(!field) return;

  const UFO_SVG = '<svg viewBox="0 0 64 34" xmlns="http://www.w3.org/2000/svg">' +
    '<ellipse cx="32" cy="23" rx="28" ry="7" fill="#39ff6a"/>' +
    '<ellipse cx="32" cy="23" rx="28" ry="7" fill="none" stroke="#a8ffb8" stroke-width="1.3" opacity="0.8"/>' +
    '<ellipse cx="32" cy="13" rx="13" ry="11" fill="#0c1712" stroke="#7dffa3" stroke-width="1.4"/>' +
    '<ellipse cx="32" cy="11" rx="9.5" ry="7.5" fill="#39ff6a" opacity="0.3"/>' +
    '<circle cx="14" cy="24" r="1.8" fill="#eafff0"/>' +
    '<circle cx="24" cy="27.5" r="1.8" fill="#eafff0"/>' +
    '<circle cx="40" cy="27.5" r="1.8" fill="#eafff0"/>' +
    '<circle cx="50" cy="24" r="1.8" fill="#eafff0"/>' +
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

  const ufoPaths = ['path-1', 'path-2', 'path-3'];
  const ufoCount = 4;
  for(let i=0;i<ufoCount;i++){
    const wrap = document.createElement('div');
    const sizeRoll = Math.random();
    wrap.className = 'ufo ' + ufoPaths[i % ufoPaths.length] + (sizeRoll < 0.3 ? ' small' : sizeRoll > 0.75 ? ' big' : '');
    wrap.style.top = (Math.random()*50 - 5) + '%';
    wrap.style.left = (Math.random()*50 - 5) + '%';
    wrap.style.animationDuration = (16 + Math.random()*10) + 's';
    wrap.style.animationDelay = (Math.random()*14) + 's';

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
