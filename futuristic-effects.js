// === Animated Particles Background ===
const canvas = document.getElementById('particles-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 60;
  const colors = ['#3a86ff', '#8338ec', '#ffbe0b', '#fff'];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 1.5,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
  createParticles();
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// === Custom Futuristic Cursor ===
const cursor = document.getElementById('futuristicCursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
  });
  document.addEventListener('mousedown', () => cursor.classList.add('active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('active'));
  // Cursor grows on interactive elements
  const interactive = ['a', 'button', '.button', 'input', 'textarea', 'select', 'label'];
  document.addEventListener('mouseover', e => {
    if (interactive.some(sel => e.target.matches(sel))) {
      cursor.classList.add('active');
    }
  });
  document.addEventListener('mouseout', e => {
    if (interactive.some(sel => e.target.matches(sel))) {
      cursor.classList.remove('active');
    }
  });
}

// === Section Reveal on Scroll ===
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (const el of reveals) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  // Add .reveal to main sections for animation
  document.querySelectorAll('.intro, .projects-section, .resume-preview, form').forEach(el => {
    el.classList.add('reveal');
  });
}); 