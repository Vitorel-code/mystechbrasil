// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Form submission handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Obtém os dados do formulário
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Envia os dados para o FormSubmit via AJAX
  fetch('https://formsubmit.co/ajax/mystechbrasil@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(data => {
    // Exibe uma mensagem de sucesso (opcional)
    alert('Pedido enviado com sucesso!');

    // Recarrega a página após o envio bem-sucedido
    window.location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
  });
});
  e.preventDefault(); // Prevent the default form submission
  console.log('Form submitted'); // Log to check if the event is triggered

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Send form data to FormSubmit
  fetch('https://formsubmit.co/ajax/mystechbrasil@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(data => {
    // Show success message
    alert('Pedido enviado com sucesso!');
    contactForm.reset(); // Reset the form after successful submission
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
  });

// Scroll-based animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '50px'
};

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation classes and observe elements
document.querySelectorAll('.service-card, .portfolio-item, .contact-card').forEach(element => {
  element.classList.add('animate-hidden');
  animateOnScroll.observe(element);
});

// Animate stats counter
const statsSection = document.querySelector('.hero-stats');
let animated = false;

const animateStats = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !animated) {
    animated = true;
    document.querySelectorAll('.stat-number').forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + '+';
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current) + '+';
        }
      }, 20);
    });
    animateStats.unobserve(entries[0].target);
  }
}, { threshold: 0.5 });

animateStats.observe(statsSection);

// Parallax effect for hero shapes
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 2;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    shape.style.transform = `translate(${x}%, ${y}%)`;
  });
});

// Header transparency on scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    header.classList.remove('scrolled');
  } else {
    header.classList.add('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Verifica se o formulário foi enviado com sucesso
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
  // Exibe a mensagem de sucesso
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';

  // Remove o parâmetro da URL para evitar que a mensagem apareça novamente ao recarregar
  window.history.replaceState({}, document.title, window.location.pathname);
}