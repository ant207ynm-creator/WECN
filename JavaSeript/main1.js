// ===== NETWORK EDUCATION MODERN APP =====
// كود JavaScript موحد ومتطور لجميع صفحات المشروع
// يستخدم ES6+ Modules, Classes, Modern APIs

class NetworkEducationApp {
  constructor() {
    this.currentUser = null;
    this.learningProgress = {};
    this.settings = {};
    this.init();
  }

  async init() {
    try {
      await this.loadUserData();
      this.setupCoreFeatures();
      this.setupPageSpecificFeatures();
      this.setupAdvancedInteractions();
      this.setupPerformanceOptimizations();
      this.setupAccessibility();

      console.log('🚀 Network Education App Initialized Successfully');
    } catch (error) {
      console.error('App Initialization Error:', error);
    }
  }

  // ===== نظام إدارة البيانات =====
  async loadUserData() {
    this.currentUser = this.getFromStorage('currentUser');
    this.learningProgress = this.getFromStorage('learningProgress') || {};
    this.settings = this.getFromStorage('appSettings') || this.getDefaultSettings();

    // تحديث التقدم تلقائياً
    this.updateLearningProgress();
  }

  getDefaultSettings() {
    return {
      theme: 'light',
      language: 'ar',
      animations: true,
      autoSave: true,
      fontSize: 'medium',
      videoQuality: 'auto'
    };
  }

  // ===== الميزات الأساسية لجميع الصفحات =====
  setupCoreFeatures() {
    this.setupNavigation();
    this.setupProgressTracking();
    this.setupThemeManager();
    this.setupSearchSystem();
    this.setupResponsiveDesign();
    this.setupLoadingStates();
  }

  // ===== نظام التنقل المحسن =====
  setupNavigation() {
    // التنقل السلس مع تأثيرات
    this.setupSmoothScrolling();
    this.setupActiveNavLinks();
    this.setupBackToTop();
    this.setupBreadcrumbNavigation();
  }

  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  setupActiveNavLinks() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  setupBackToTop() {
    const backToTop = this.createBackToTopButton();
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
      this.throttle(() => {
        backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
        backToTop.style.visibility = window.scrollY > 300 ? 'visible' : 'hidden';
      }, 100);
    });
  }

  createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '⬆️';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'العودة إلى الأعلى');

    Object.assign(button.style, {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: '1000',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '3.5rem',
      height: '3.5rem',
      cursor: 'pointer',
      opacity: '0',
      visibility: 'hidden',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      fontSize: '1.2rem'
    });

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return button;
  }

  // ===== نظام تتبع التقدم الدراسي =====
  setupProgressTracking() {
    this.createProgressBar();
    this.trackStudyTime();
    this.setupAchievementSystem();
  }

  createProgressBar() {
    let progressBar = document.getElementById('global-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'global-progress-bar';
      progressBar.innerHTML = `
                <div class="progress-container">
                    <div class="progress-fill"></div>
                    <div class="progress-text"></div>
                </div>
            `;

      const container = document.querySelector('.container') || document.querySelector('main');
      if (container) {
        container.insertBefore(progressBar, container.firstChild);
      }
    }

    this.updateProgressBar();
  }

  updateProgressBar() {
    const totalPages = ['Network_Basics', 'Network_Devices', 'Network_Protocols', 'Network_Security'];
    const completedPages = totalPages.filter(page => this.learningProgress[page]?.completed);
    const progress = (completedPages.length / totalPages.length) * 100;

    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    if (progressFill) {
      progressFill.style.width = `${progress}%`;
      progressFill.style.background = `linear-gradient(90deg, 
                #4CAF50 ${progress}%, 
                #45a049 100%)`;
    }

    if (progressText) {
      progressText.textContent = `${completedPages.length}/${totalPages.length} دروس مكتملة (${Math.round(progress)}%)`;
    }
  }

  updateLearningProgress() {
    const currentPage = this.getCurrentPageName();
    if (currentPage && currentPage.startsWith('Network_')) {
      if (!this.learningProgress[currentPage]) {
        this.learningProgress[currentPage] = {
          completed: true,
          completedAt: new Date().toISOString(),
          timeSpent: 0,
          score: 0
        };
        this.saveToStorage('learningProgress', this.learningProgress);
        this.showAchievement(`🎉 أكملت درس ${this.getPageTitle(currentPage)}!`);
      }
    }
  }

  trackStudyTime() {
    let startTime = Date.now();

    const updateTime = () => {
      const currentPage = this.getCurrentPageName();
      if (currentPage && this.learningProgress[currentPage]) {
        this.learningProgress[currentPage].timeSpent += 1;
      }
    };

    setInterval(updateTime, 60000); // تحديث كل دقيقة
  }

  // ===== نظام الإنجازات =====
  setupAchievementSystem() {
    this.checkForAchievements();
  }

  showAchievement(message) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-notification';
    achievement.innerHTML = `
            <div class="achievement-content">
                <span class="achievement-icon">🏆</span>
                <span class="achievement-text">${message}</span>
            </div>
        `;

    Object.assign(achievement.style, {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
      color: '#333',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      zIndex: '10000',
      animation: 'slideInRight 0.5s ease'
    });

    document.body.appendChild(achievement);

    setTimeout(() => {
      achievement.style.animation = 'slideOutRight 0.5s ease';
      setTimeout(() => achievement.remove(), 500);
    }, 3000);
  }

  // ===== نظام البحث الذكي =====
  setupSearchSystem() {
    this.injectSearchBar();
    this.setupQuickNavigation();
  }

  injectSearchBar() {
    if (!document.getElementById('smart-search')) {
      const searchHTML = `
                <div id="smart-search" class="smart-search">
                    <div class="search-input-container">
                        <input type="text" id="global-search" 
                               placeholder="🔍 ابحث في المحتوى التعليمي..." 
                               aria-label="بحث في المحتوى التعليمي">
                        <button id="search-clear" aria-label="مسح البحث">✕</button>
                    </div>
                    <div id="search-results" class="search-results"></div>
                </div>
            `;

      const header = document.querySelector('.header-content');
      if (header) {
        header.insertAdjacentHTML('beforeend', searchHTML);
        this.setupSearchFunctionality();
      }
    }
  }

  setupSearchFunctionality() {
    const searchInput = document.getElementById('global-search');
    const searchClear = document.getElementById('search-clear');
    const searchResults = document.getElementById('search-results');

    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSmartSearch(e.target.value);
      }, 300);
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
    });

    // بحث بالضغط على Enter
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSmartSearch(e.target.value);
      }
    });
  }

  async performSmartSearch(query) {
    if (query.length < 2) {
      document.getElementById('search-results').style.display = 'none';
      return;
    }

    const results = await this.searchContent(query);
    this.displaySearchResults(results, query);
  }

  async searchContent(query) {
    // محاكاة بحث ذكي (يمكن تطويره ليكون حقيقياً)
    const content = document.body.textContent.toLowerCase();
    const queryLower = query.toLowerCase();

    const matches = [];
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td');

    elements.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes(queryLower)) {
        matches.push({
          element: element,
          text: element.textContent,
          relevance: this.calculateRelevance(text, queryLower)
        });
      }
    });

    return matches.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
  }

  // ===== نظام إدارة السمات (الوضع الليلي) =====
  setupThemeManager() {
    this.injectThemeToggle();
    this.applyThemeSettings();
  }

  injectThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'تبديل الوضع الليلي');

    Object.assign(themeToggle.style, {
      position: 'fixed',
      bottom: '6rem',
      right: '2rem',
      zIndex: '1000',
      background: 'var(--primary-color, #333)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '3rem',
      height: '3rem',
      cursor: 'pointer',
      fontSize: '1.2rem'
    });

    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });

    document.body.appendChild(themeToggle);
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    this.settings.theme = isDark ? 'dark' : 'light';
    this.saveToStorage('appSettings', this.settings);

    const toggle = document.getElementById('theme-toggle');
    toggle.innerHTML = isDark ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي');
  }

  // ===== تحسينات الأداء =====
  setupPerformanceOptimizations() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupVideoOptimization();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ===== إمكانية الوصول (Accessibility) =====
  setupAccessibility() {
    this.improveKeyboardNavigation();
    this.setupSkipLinks();
    this.enhanceFocusIndicators();
  }

  improveKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // التنقل بين الأقسام باستخدام لوحة المفاتيح
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            document.querySelector('main')?.scrollIntoView();
            break;
          case '2':
            e.preventDefault();
            document.querySelector('footer')?.scrollIntoView();
            break;
        }
      }
    });
  }

  // ===== الميزات الخاصة بكل صفحة =====
  setupPageSpecificFeatures() {
    const page = this.getCurrentPageName();

    switch (page) {
      case 'Home_Network.html':
        this.setupHomePageFeatures();
        break;
      case 'Network_Basics.html':
        this.setupBasicsPageFeatures();
        break;
      case 'Network_Devices.html':
        this.setupDevicesPageFeatures();
        break;
      case 'Network_Protocols.html':
        this.setupProtocolsPageFeatures();
        break;
      case 'Network_Security.html':
        this.setupSecurityPageFeatures();
        break;
      case 'Login_to.html':
      case 'Single_up.html':
        this.setupAuthPagesFeatures();
        break;
    }
  }

  setupAuthPagesFeatures() {
    this.setupFormValidation();
    this.setupPasswordStrength();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  }

  // ===== أدوات مساعدة =====
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  getFromStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  getCurrentPageName() {
    return window.location.pathname.split('/').pop();
  }

  getPageTitle(pageName) {
    const titles = {
      'Network_Basics.html': 'أساسيات الشبكات',
      'Network_Devices.html': 'أجهزة الشبكات',
      'Network_Protocols.html': 'بروتوكولات الشبكات',
      'Network_Security.html': 'أمن الشبكات'
    };
    return titles[pageName] || 'الصفحة';
  }
}

// ===== التهيئة عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function () {
  // تأخير التهيئة قليلاً لضمان تحميل DOM بالكامل
  setTimeout(() => {
    window.networkApp = new NetworkEducationApp();
  }, 100);
});

// ===== دعم Service Worker للتخزين المؤقت (اختياري) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}