/* -------------------------- */
/* HEADER SCROLL HIDE/SHOW */
/* -------------------------- */
let lastScrollTop = 0;
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Hide/show header
  if (scrollTop > lastScrollTop && scrollTop > 50) {
    header.style.top = "-100px"; 
  } else {
    header.style.top = "0"; 
  }

  // Smooth header background change
  header.style.background = scrollTop > 50 ? "rgba(56,189,248,0.95)" : "#38bdf8";

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Active nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

/* -------------------------- */
/* SMOOTH SCROLL NAV LINKS */
/* -------------------------- */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

/* -------------------------- */
/* HAMBURGER MENU TOGGLE */
/* -------------------------- */
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

/* -------------------------- */
/* FADE-IN SECTIONS */
/* -------------------------- */
const sections = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

/* -------------------------- */
/* FLOATING SKILLS DRAG & CLICK */
/* -------------------------- */
const floatingSkills = document.querySelectorAll('.floating-skills a');
const hero = document.querySelector('.hero');
const profile = document.querySelector('.profile-container');

floatingSkills.forEach(skillLink => {
  const skill = skillLink.querySelector('.skill');
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Set initial random position around hero section
const heroWidth = hero.offsetWidth;
const heroHeight = hero.offsetHeight;

let left, top;

const profileRect = profile.getBoundingClientRect();
const heroRect = hero.getBoundingClientRect();

do {
  left = Math.random() * (heroWidth - 100);
  top = Math.random() * (heroHeight - 100);
} while (
  left > profileRect.left - heroRect.left - 120 &&
  left < profileRect.right - heroRect.left + 120 &&
  top > profileRect.top - heroRect.top - 120 &&
  top < profileRect.bottom - heroRect.top + 120
);
  skill.style.left = `${left}px`;
  skill.style.top = `${top}px`;
  skill.style.position = 'absolute';
  skill.style.zIndex = 1;

  // Mouse events for dragging
  skill.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - skill.getBoundingClientRect().left;
    offsetY = e.clientY - skill.getBoundingClientRect().top;
    skill.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
  if (!isDragging) return;

  let newLeft = e.clientX - offsetX;
  let newTop = e.clientY - offsetY;

  const heroWidth = hero.offsetWidth;
  const heroHeight = hero.offsetHeight;

  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + skill.offsetWidth > heroWidth)
    newLeft = heroWidth - skill.offsetWidth;
  if (newTop + skill.offsetHeight > heroHeight)
    newTop = heroHeight - skill.offsetHeight;

  skill.style.left = `${newLeft}px`;
  skill.style.top = `${newTop}px`;
});

  document.addEventListener('mouseup', e => {
    if (isDragging) {
      isDragging = false;
      skill.style.cursor = 'grab';
    }
  });

  // Click to open link (only if not dragging)
  skillLink.addEventListener('click', e => {
    if (isDragging) {
      e.preventDefault();
    }
  });

  skill.style.cursor = 'grab';
});

/* -------------------------- */
/* PROJECT CARDS CLICKABLE */
/* -------------------------- */
document.querySelectorAll('.card img').forEach(img => {
  img.addEventListener('click', () => {
    const url = img.getAttribute('data-url');
    if (url) window.open(url, '_blank');
  });
});