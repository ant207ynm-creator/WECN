// ===== MODERN ANIMATIONS SYSTEM =====
class ModernAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupMicroInteractions();
    this.setupPageTransitions();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn(entry.target);
        }
      });
    }, this.observerOptions);

    // عناصر للتحريك
    const elementsToAnimate = document.querySelectorAll('.section, .concept-card, .media-item');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
  }

  animateIn(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    // تأثيرات إضافية بناءً على نوع العنصر
    if (element.classList.contains('concept-card')) {
      element.style.transitionDelay = '0.1s';
    }
  }

  setupHoverEffects() {
    // تأثيرات عند المرور على البطاقات
    document.querySelectorAll('.concept-card, .media-item').forEach(card => {
      card.addEventListener('mouseenter', this.handleCardHoverIn);
      card.addEventListener('mouseleave', this.handleCardHoverOut);
    });

    // تأثيرات على الروابط
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', this.handleLinkHover);
    });
  }

  handleCardHoverIn(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  handleCardHoverOut(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }

  setupMicroInteractions() {
    // تأثيرات النقر
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn, [role="button"]')) {
        this.createRippleEffect(e);
      }
    });
  }

  createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

// تهيئة النظام
document.addEventListener('DOMContentLoaded', () => {
  new ModernAnimations();
});