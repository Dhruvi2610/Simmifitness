// ===== HAMBURGER MENU =====
const toggle = document.getElementById('menu-toggle');
const menu = document.querySelector('nav ul');
toggle.addEventListener('change', () => {
  menu.classList.toggle('show');
});

// ===== NAVBAR HIDE/SHOW ON SCROLL =====
let lastScroll = 0;
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.top = '-120px'; // hide
  } else {
    navbar.style.top = '0'; // show
  }
  lastScroll = currentScroll;
});

// ===== SCROLL-TO-APPEAR =====
const scrollElements = document.querySelectorAll('.scroll-reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  scrollElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== TILT EFFECT ON YOGA CARDS + SCROLL =====
const cards = document.querySelectorAll('.style-card');

cards.forEach(card => {
  let scrollOffsetY = 0;

  function applyTransform(rotateX = 0, rotateY = 0) {
    const scrollTranslate = scrollOffsetY ? `translateY(${scrollOffsetY}px)` : '';
    card.style.transform = `${scrollTranslate} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    applyTransform(rotateX, rotateY);
  });

  card.addEventListener('mouseleave', () => {
    applyTransform(0, 0);
  });
});

// ===== UPDATE YOGA CARD SCROLL TRANSLATE =====
function updateCardScroll() {
  const windowHeight = window.innerHeight;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const scrollTranslateY = cardTop < windowHeight - 100 ? 0 : 40;
    card.scrollOffsetY = scrollTranslateY;
    card.style.transform = `translateY(${scrollTranslateY}px)`;
  });
}
window.addEventListener('scroll', updateCardScroll);
window.addEventListener('load', updateCardScroll);

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const speed = 100; // adjust speed

function runCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if(count < target){
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    }
    updateCount();
  });
}

// Trigger counters when stats section is in view
const statsSection = document.getElementById('stats');
let countersRun = false;
window.addEventListener('scroll', () => {
  const rect = statsSection.getBoundingClientRect();
  if(rect.top < window.innerHeight - 100 && !countersRun){
    runCounters();
    countersRun = true;
  }
});
