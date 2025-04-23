/**
 * Hotel Website - Main JavaScript File
 * Optimized for performance, readability and maintainability
 */

// Configuration Constants
const CONFIG = {
  ROOM_PRICES: {
    standard: 1200,
    deluxe: 1800,
    suite: 2500
  },
  LOADING: {
    initialSpeed: 10,
    slowThreshold: 70,
    slowSpeed: 2
  },
  ANIMATION: {
    duration: 0.3,
    ease: "power2.out"
  }
};

// Main Application Controller
class HotelApp {
  constructor() {
    this.init = this.init.bind(this);
    this.initPreloader = this.initPreloader.bind(this);
    this.initCustomCursor = this.initCustomCursor.bind(this);
    this.initScrollEffects = this.initScrollEffects.bind(this);
    this.initParallaxEffects = this.initParallaxEffects.bind(this);
    this.initGallery = this.initGallery.bind(this);
    this.initForms = this.initForms.bind(this);
    this.initCinemagraphs = this.initCinemagraphs.bind(this);
    this.initVideoControls = this.initVideoControls.bind(this);
    this.initAccessibility = this.initAccessibility.bind(this);
  }

  init() {
    // AOS başlatma
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
      startEvent: 'DOMContentLoaded' // AOS'u DOM yüklendiğinde başlat
    });
  
    // AOS'u hemen yenile
    setTimeout(() => {
      AOS.refreshHard();
    }, 100);
  

    // Initialize all components
    this.initPreloader();
    this.initCustomCursor();
    this.initScrollEffects();
    this.initParallaxEffects();
    this.initGallery();
    this.initForms();
    this.initCinemagraphs();
    this.initVideoControls();
    this.initAccessibility();

    console.log('HotelApp initialized');
  }

  initPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    
    // 3 saniye sonra kapanacak maksimum bekleme süresi
    const timeout = setTimeout(() => {
      this.completeLoading(preloader);
    }, 3000);
    
    // Sayfa yüklenince preloader'ı kapat
    window.addEventListener('load', () => {
      clearTimeout(timeout);
      this.completeLoading(preloader);
    });
  }

  completeLoading(preloader) {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
        this.animatePageContent();
      }
    });
  }

  animatePageContent() {
    this.animateLogo();
    this.animateHero();
    this.initKineticText();
  }

  animateLogo() {
    const logoElements = document.querySelectorAll(".logo-text, .logo-symbol");
    
    gsap.fromTo(logoElements, {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });

    this.initLogoHoverEffects();
  }

  initLogoHoverEffects() {
    document.querySelectorAll(".kinetic-logo, .animated-logo").forEach(logo => {
      logo.addEventListener("mouseenter", () => {
        gsap.to(logo.querySelectorAll(".logo-text, .logo-symbol"), {
          y: -5,
          stagger: 0.1,
          duration: CONFIG.ANIMATION.duration,
          ease: CONFIG.ANIMATION.ease
        });
      });

      logo.addEventListener("mouseleave", () => {
        gsap.to(logo.querySelectorAll(".logo-text, .logo-symbol"), {
          y: 0,
          stagger: 0.1,
          duration: CONFIG.ANIMATION.duration,
          ease: CONFIG.ANIMATION.ease
        });
      });
    });
  }

  animateHero() {
    const textElements = document.querySelectorAll(".text-animate");
    if (!textElements.length) return;

    gsap.from(textElements, {
      opacity: 0,
      y: 50,
      stagger: 0.5,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero-content",
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
  }

  initKineticText() {
    document.querySelectorAll(".kinetic-text, .fancy-title").forEach(text => {
      text.addEventListener("mouseenter", () => {
        const chars = text.textContent.split("");
        text.textContent = "";
        
        chars.forEach((char, i) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.animationDelay = `${i * 0.03}s`;
          span.classList.add("char-animation");
          text.appendChild(span);
        });
      });

      text.addEventListener("mouseleave", () => {
        text.innerHTML = text.textContent;
      });
    });
  }

  initCustomCursor() {
    const cursor = document.getElementById("cursor-dot");
    const cursorCircle = document.getElementById("cursor-circle");
    
    if (!cursor || !cursorCircle) return;
    
    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      
      gsap.to(cursorCircle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    });
    
    document.addEventListener("mousedown", () => {
      cursor.classList.add("click");
      cursorCircle.classList.add("click");
    });
    
    document.addEventListener("mouseup", () => {
      cursor.classList.remove("click");
      cursorCircle.classList.remove("click");
    });

    this.initCursorHoverEffects();
  }

  initCursorHoverEffects() {
    document.querySelectorAll("a, button, [data-cursor-class]").forEach(link => {
      link.addEventListener("mouseenter", () => {
        const cursorClass = link.getAttribute("data-cursor-class");
        document.getElementById("cursor-dot").classList.add(cursorClass || "hover");
        document.getElementById("cursor-circle").classList.add(cursorClass || "hover");
      });
      
      link.addEventListener("mouseleave", () => {
        document.getElementById("cursor-dot").className = "cursor-dot";
        document.getElementById("cursor-circle").className = "cursor-circle";
      });
    });
  }

  initScrollEffects() {
    window.addEventListener("scroll", this.handleScroll);
    this.initSmoothScrolling();
    this.initSectionTracking();
  }

  handleScroll() {
    const header = document.querySelector("header");
    const scrollY = window.scrollY;
    
    header?.classList.toggle("scrolled", scrollY > 50);
    
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(1 - scrollY / 400, 0);
    }
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initSectionTracking() {
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });
      
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
      });
    });
  }

  initParallaxEffects() {
    const parallaxBg = document.querySelector(".parallax-bg");
    if (parallaxBg) {
      window.addEventListener("scroll", () => {
        parallaxBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      });
    }
    
    this.initAdvancedParallax();
  }

  initAdvancedParallax() {
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll(".abstract-decor").forEach(decor => {
      gsap.to(decor, {
        y: () => Math.random() * 100 - 50,
        x: () => Math.random() * 100 - 50,
        rotation: () => Math.random() * 20 - 10,
        scrollTrigger: {
          trigger: decor.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });
    
    document.querySelectorAll(".texture-overlay").forEach(texture => {
      gsap.to(texture, {
        backgroundPosition: `50% ${50 + Math.random() * 30}%`,
        scrollTrigger: {
          trigger: texture.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });
    });
  }

  initGallery() {
    const gallery = new GalleryController();
    gallery.init();
  }

  initForms() {
    const formHandler = new FormHandler();
    formHandler.init();
  }

  initCinemagraphs() {
    document.querySelectorAll(".cinemagraph").forEach(cinemagraph => {
      const element = cinemagraph.querySelector(".room-cinemagraph-element");
      if (!element) return;
      
      const roomType = cinemagraph.getAttribute("data-room-type");
      
      switch(roomType) {
        case "standard":
          this.animateStandardRoom(element);
          break;
        case "deluxe":
          this.animateDeluxeRoom(element);
          break;
        case "suite":
          this.animateSuiteRoom(element);
          break;
      }
    });
  }

  animateStandardRoom(element) {
    gsap.to(element, {
      backgroundPosition: "center calc(50% + 10px)",
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: "sine.inOut"
    });
  }

  animateDeluxeRoom(element) {
    gsap.to(element, {
      opacity: 0.9,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut"
    });
    
    setInterval(() => {
      const bird = document.createElement("div");
      bird.className = "bird-animation";
      element.appendChild(bird);
      
      gsap.fromTo(bird, 
        { left: "-10%", top: `${Math.random() * 50 + 10}%` },
        { 
          left: "110%", 
          duration: 8, 
          ease: "power1.inOut",
          onComplete: () => bird.remove()
        }
      );
    }, 10000);
  }

  animateSuiteRoom(element) {
    gsap.to(element, {
      filter: "brightness(1.1)",
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "sine.inOut",
      repeatDelay: 0.2
    });
  }

  initVideoControls() {
    document.querySelectorAll('.video-wrapper').forEach(wrapper => {
      const video = wrapper.querySelector('video');
      if (!video) return;
      
      video.addEventListener('loadeddata', () => video.removeAttribute('poster'));
      
      wrapper.addEventListener('click', () => {
        video.paused ? video.play() : video.pause();
        wrapper.classList.toggle('playing', !video.paused);
      });
    });
  }

  initAccessibility() {
    document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach(el => {
      el.addEventListener('focus', () => el.classList.add('focus-visible'));
      el.addEventListener('blur', () => el.classList.remove('focus-visible'));
    });
  }
}

// Gallery Controller Class
class GalleryController {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.modal = null;
    this.activeFilter = 'odalar'; // Varsayılan filtre: odalar
  }

  init() {
    this.createModal();
    this.cacheImages();
    this.setupEventListeners();
    this.applyFilter(this.activeFilter); // Sayfa yüklendiğinde odalar filtresini uygula
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'gallery-modal';
    this.modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">×</span>
        <img src="" alt="" class="modal-image">
        <div class="modal-caption"></div>
        <button class="nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
        <button class="nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
      </div>
    `;
    document.body.appendChild(this.modal);
  }

  cacheImages() {
    this.images = Array.from(document.querySelectorAll('.gallery-item')).map(item => ({
      src: item.querySelector('img').dataset.src || item.querySelector('img').src,
      alt: item.querySelector('img').alt,
      title: item.querySelector('h3')?.textContent || '',
      category: item.dataset.category // Kategoriyi kaydet
    }));
  }

  setupEventListeners() {
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.addEventListener('click', () => this.openModal(index));
    });

    this.modal.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => e.target === this.modal && this.closeModal());
    this.modal.querySelector('.prev-btn').addEventListener('click', () => this.navigate(-1));
    this.modal.querySelector('.next-btn').addEventListener('click', () => this.navigate(1));
    document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));

    // Filtre butonları için olay dinleyicileri
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.activeFilter = button.dataset.filter;
        this.applyFilter(this.activeFilter);
      });
    });
  }

  applyFilter(filter) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
      const isVisible = filter === 'all' || item.dataset.category === filter;
      item.style.display = isVisible ? '' : 'none'; // Varsayılan display değerini koru
      if (isVisible) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    });

    // Modal için filtrelenmiş görüntüleri güncelle
    this.images = Array.from(document.querySelectorAll('.gallery-item'))
      .filter(item => filter === 'all' || item.dataset.category === filter)
      .map(item => ({
        src: item.querySelector('img').dataset.src || item.querySelector('img').src,
        alt: item.querySelector('img').alt,
        title: item.querySelector('h3')?.textContent || '',
        category: item.dataset.category
      }));
  }

  openModal(index) {
    this.currentIndex = index;
    this.updateModalContent();
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      this.modal.querySelector('.modal-content'),
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3 }
    );
  }

  updateModalContent() {
    const image = this.images[this.currentIndex];
    const modalImg = this.modal.querySelector('.modal-image');
    const modalCaption = this.modal.querySelector('.modal-caption');

    modalImg.src = '';
    modalCaption.textContent = 'Yükleniyor...';

    const img = new Image();
    img.onload = () => {
      modalImg.src = image.src;
      modalImg.alt = image.alt;
      modalCaption.textContent = image.title;
    };
    img.src = image.src;
  }

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    this.updateModalContent();
  }

  closeModal() {
    gsap.to(this.modal.querySelector('.modal-content'), {
      opacity: 0,
      scale: 0.9,
      duration: 0.2,
      onComplete: () => {
        this.modal.style.display = 'none';
        document.body.style.overflow = ''; // Overflow'u sıfırla
      }
    });
  }

  handleKeyNavigation(e) {
    if (this.modal.style.display !== 'flex') return;

    switch (e.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.navigate(-1);
        break;
      case 'ArrowRight':
        this.navigate(1);
        break;
    }
  }
}

// Form Handler Class
class FormHandler {
  constructor() {
    this.init = this.init.bind(this);
    this.initContactForm = this.initContactForm.bind(this);
    this.initReservationForm = this.initReservationForm.bind(this);
    this.enhanceFormValidation = this.enhanceFormValidation.bind(this);
  }

  init() {
    this.initContactForm();
    this.initReservationForm();
    this.enhanceFormValidation();
  }

  initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.simulateFormSubmission(form, document.getElementById("contactAlert"));
    });
  }

  initReservationForm() {
    const form = document.getElementById("reservationForm");
    if (!form) return;

    this.setupDateInputs(form);
    this.setupPriceCalculation(form);
    form.addEventListener("submit", (e) => this.handleReservationSubmit(e, form));
  }

  setupDateInputs(form) {
    const today = new Date().toISOString().split('T')[0];
    const checkIn = form.querySelector("#checkIn");
    const checkOut = form.querySelector("#checkOut");
    
    checkIn.min = today;
    checkIn.value = today;
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOut.min = tomorrow.toISOString().split('T')[0];
    checkOut.value = tomorrow.toISOString().split('T')[0];
    
    checkIn.addEventListener("change", () => {
      const minCheckOut = new Date(checkIn.value);
      minCheckOut.setDate(minCheckOut.getDate() + 1);
      checkOut.min = minCheckOut.toISOString().split('T')[0];
      
      if (new Date(checkOut.value) < minCheckOut) {
        checkOut.value = minCheckOut.toISOString().split('T')[0];
      }
    });
  }

  setupPriceCalculation(form) {
    const roomType = form.querySelector("#roomType");
    const priceDisplay = document.createElement('div');
    priceDisplay.className = 'room-price-display';
    roomType.parentNode.appendChild(priceDisplay);
    
    function updatePrice() {
      const price = CONFIG.ROOM_PRICES[roomType.value] || 0;
      priceDisplay.textContent = `Fiyat: ₺${price.toLocaleString('tr-TR')} / gece`;
    }
    
    roomType.addEventListener("change", updatePrice);
    updatePrice();
  }

  handleReservationSubmit(e, form) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = (CONFIG.ROOM_PRICES[data.roomType] || 0) * nights;
    
    this.showReservationSummary(data, nights, totalPrice, form);
  }

  showReservationSummary(data, nights, totalPrice, form) {
    const modal = document.createElement('div');
    modal.className = 'reservation-summary-modal';
    modal.innerHTML = `
      <div class="modal-content glassmorphism">
        <span class="close-modal" id="closeSummary">&times;</span>
        <h2 class="fancy-title">Rezervasyon Özeti</h2>
        <div class="summary-content">
          <p><strong>Ad Soyad:</strong> ${data.fullName}</p>
          <p><strong>E-posta:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <p><strong>Giriş Tarihi:</strong> ${this.formatDate(data.checkIn)}</p>
          <p><strong>Çıkış Tarihi:</strong> ${this.formatDate(data.checkOut)}</p>
          <p><strong>Oda Tipi:</strong> ${this.getRoomName(data.roomType)}</p>
          <p><strong>Kişi Sayısı:</strong> ${data.guests}</p>
          ${data.specialRequests ? `<p><strong>Özel İstekler:</strong> ${data.specialRequests}</p>` : ''}
        </div>
        <div class="summary-actions">
          <button class="btn btn-primary btn-gradient" id="confirmReservation">
            <span class="btn-text">Rezervasyonu Onayla</span>
            <span class="btn-icon"><i class="custom-icon icon-check"></i></span>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    gsap.fromTo(modal.querySelector(".modal-content"), 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out" }
    );
    
    document.getElementById("closeSummary").addEventListener("click", () => this.closeSummaryModal(modal, form));
    document.getElementById("confirmReservation").addEventListener("click", () => this.confirmReservation(modal, form));
  }

  closeSummaryModal(modal, form) {
    gsap.to(modal.querySelector(".modal-content"), {
      y: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.remove();
      }
    });
  }

  confirmReservation(modal, form) {
    const content = modal.querySelector(".summary-content");
    content.innerHTML = `
      <div class="success-message">
        <div class="check-animation">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <p>Rezervasyonunuz başarıyla alındı!</p>
        <p>Rezervasyon detayları e-posta adresinize gönderilecektir.</p>
      </div>
    `;
    
    modal.querySelector(".summary-actions").innerHTML = `
      <button class="btn btn-primary btn-gradient" id="closeConfirmation">
        <span class="btn-text">Kapat</span>
      </button>
    `;
    
    this.animateSuccessCheck();
    
    document.getElementById("closeConfirmation").addEventListener("click", () => {
      this.closeSummaryModal(modal, form);
      form.reset();
      
      // Reset dates to today and tomorrow
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      form.querySelector("#checkIn").value = today;
      form.querySelector("#checkOut").value = tomorrow.toISOString().split('T')[0];
    });
  }

  animateSuccessCheck() {
    const circle = document.querySelector('.checkmark__circle');
    const check = document.querySelector('.checkmark__check');
    
    if (!circle || !check) return;
    
    gsap.fromTo(circle, 
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 1, ease: "power2.inOut" }
    );
    
    gsap.fromTo(check, 
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.5, delay: 0.7, ease: "power2.inOut" }
    );
  }

  simulateFormSubmission(form, alertElement) {
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="loading-spinner"></span> Gönderiliyor...`;
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = `<i class="fas fa-check"></i> Gönderildi!`;
      
      if (alertElement) {
        alertElement.style.display = "block";
        alertElement.classList.add("show");
        
        gsap.fromTo(alertElement, 
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
      
      form.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        if (alertElement) {
          gsap.to(alertElement, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              alertElement.style.display = "none";
              alertElement.classList.remove("show");
            }
          });
        }
      }, 3000);
    }, 1500);
  }

  formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  }

  getRoomName(roomType) {
    const names = {
      'standard': 'Standart Oda',
      'deluxe': 'Deluxe Oda',
      'suite': 'Suite'
    };
    return names[roomType] || roomType;
  }

  enhanceFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('input', () => this.validateInput(input));
        input.addEventListener('blur', () => this.validateInput(input));
      });
      
      form.addEventListener('submit', (e) => {
        let isValid = true;
        
        inputs.forEach(input => {
          if (!this.validateInput(input)) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          form.querySelector('.input-error')?.focus();
        }
      });
    });
  }

  validateInput(input) {
    const errorElement = input.parentElement.querySelector('.error-message') || 
                         document.createElement('span');
    
    if (!errorElement.classList.contains('error-message')) {
      errorElement.classList.add('error-message');
      input.parentElement.appendChild(errorElement);
    }
    
    const isValid = input.checkValidity();
    
    if (!isValid) {
      errorElement.textContent = this.getErrorMessage(input);
      errorElement.style.display = 'block';
      input.classList.add('input-error');
      
      gsap.fromTo(errorElement, 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    } else {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      input.classList.remove('input-error');
    }
    
    return isValid;
  }

  getErrorMessage(input) {
    if (input.validity.valueMissing) return 'Bu alan gereklidir';
    if (input.validity.typeMismatch) {
      if (input.type === 'email') return 'Geçerli bir e-posta adresi giriniz';
      if (input.type === 'url') return 'Geçerli bir URL giriniz';
    }
    if (input.validity.tooShort) return `En az ${input.minLength} karakter giriniz`;
    if (input.validity.tooLong) return `En fazla ${input.maxLength} karakter giriniz`;
    if (input.validity.patternMismatch) return input.dataset.errorPattern || 'Geçersiz format';
    
    return 'Geçersiz değer';
  }
}

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new HotelApp();
  app.init();
});