// Preloader ve sayfa yüklenmesi
document.addEventListener("DOMContentLoaded", () => {
    // Preloader animasyonu
    const preloader = document.getElementById("preloader");
    const progress = document.querySelector(".loading-progress");
    
    // Yapay yükleme simülasyonu
    let loadingProgress = 0;
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 10;
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
            
            // Preloader'ı kaldır
            gsap.to(progress, {
                width: "100%",
                duration: 0.5,
                onComplete: () => {
                    gsap.to(preloader, {
                        opacity: 0,
                        duration: 0.8,
                        delay: 0.3,
                        onComplete: () => {
                            preloader.style.display = "none";
                            // Sayfa içeriğini canlandır
                            animatePageContent();
                        }
                    });
                }
            });
        } else {
            progress.style.width = `${loadingProgress}%`;
        }
    }, 200);
    
    // AOS animasyonlarını başlat
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false
    });
    
    // Sayfa başlatma fonksiyonlarını çağır
    initializeCustomCursor();
    initializeScrollEffects();
    initializeParallaxEffects();
    initializeGallery();
    initializeFormAnimations();
    initializeCinemagraphs();
    initializeContactForm();
    initializeReservationForm();
});


// Özel cursor işlevi
function initializeCustomCursor() {
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
    
    // Tıklama animasyonu
    document.addEventListener("mousedown", () => {
        cursor.classList.add("click");
        cursorCircle.classList.add("click");
    });
    
    document.addEventListener("mouseup", () => {
        cursor.classList.remove("click");
        cursorCircle.classList.remove("click");
    });
    
    // Bağlantılar ve düğmeler üzerinde hover efekti
    const links = document.querySelectorAll("a, button, [data-cursor-class]");
    
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            const cursorClass = link.getAttribute("data-cursor-class");
            if (cursorClass) {
                cursor.classList.add(cursorClass);
                cursorCircle.classList.add(cursorClass);
            } else {
                cursor.classList.add("hover");
                cursorCircle.classList.add("hover");
            }
        });
        
        link.addEventListener("mouseleave", () => {
            cursor.className = "cursor-dot";
            cursorCircle.className = "cursor-circle";
        });
    });
}

// Scroll efektleri
function initializeScrollEffects() {
    // Sayfa kaydırıldığında headerın glassmorphism efektini artır
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Scroll indikatörü animasyonu
        const scrollIndicator = document.querySelector(".scroll-indicator");
        if (scrollIndicator) {
            scrollIndicator.style.opacity = Math.max(1 - scrollY / 400, 0);
        }
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Hero bölümündeki kinetik metin animasyonu
    const textElements = document.querySelectorAll(".text-animate");
    if (textElements.length) {
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
    

    
    // Navigasyon link izleme
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
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

        // Görünüm alanı dışındaki animasyonları askıya alma
        document.querySelectorAll('[data-aos]').forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: "top bottom+=100",
                onEnter: () => element.setAttribute('data-aos-animate', ''),
                onLeave: () => element.removeAttribute('data-aos-animate')
            });
        });
}

// Parallax efektleri
function initializeParallaxEffects() {
    // Hero bölümünde parallax efekti
    const parallaxBg = document.querySelector(".parallax-bg");
    if (parallaxBg) {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }
    
    // ScrollTrigger ile gelişmiş parallax
    gsap.registerPlugin(ScrollTrigger);
    
    // Dekor elemanları için parallax
    gsap.utils.toArray(".abstract-decor").forEach(decor => {
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
    
    // Texture katmanları için parallax
    gsap.utils.toArray(".texture-overlay").forEach(texture => {
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

// Galeri yönetimi için sınıf tabanlı yaklaşım
class ImageGallery {
    constructor(options = {}) {
      // Varsayılan ayarlar
      this.settings = {
        gallerySelector: ".gallery-item",
        modalId: "imageModal",
        modalImageId: "modalImage",
        closeModalId: "closeModal",
        hoverScale: 1.03,
        maxZoomScale: 2.5, // Maksimum zoom seviyesi
        ...options
      };
      
      // DOM elementleri
      this.galleryItems = [];
      this.modal = null;
      this.modalImage = null;
      this.closeModal = null;
      
      // Zoom durumu
      this.isZoomed = false;
      this.currentZoom = 1;
      
      // Sınıf içi binding
      this.openImageModal = this.openImageModal.bind(this);
      this.closeGalleryModal = this.closeGalleryModal.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.toggleImageZoom = this.toggleImageZoom.bind(this);
      this.resetZoom = this.resetZoom.bind(this);
      this.handleModalClick = this.handleModalClick.bind(this);
      
      // Galeriyi başlat
      this.init();
    }
    
    // Galeriyi başlat
    init() {
      this.fetchElements();
      
      if (!this.validateElements()) {
        console.warn("Galeri başlatılamadı: Gerekli DOM elementleri bulunamadı.");
        return false;
      }
      
      console.log(`${this.galleryItems.length} adet galeri öğesi bulundu.`);
      
      this.setupGalleryItems();
      this.setupModalControls();
      return true;
    }
    
    // DOM elementlerini seç
    fetchElements() {
      this.galleryItems = [...document.querySelectorAll(this.settings.gallerySelector)];
      this.modal = document.getElementById(this.settings.modalId);
      this.modalImage = document.getElementById(this.settings.modalImageId);
      this.closeModal = document.getElementById(this.settings.closeModalId);
    }
    
    // Elementlerin varlığını kontrol et
    validateElements() {
      return this.galleryItems.length > 0 && this.modal && this.modalImage && this.closeModal;
    }
    
    // Galeri öğelerini ayarla
    setupGalleryItems() {
      this.galleryItems.forEach((item, index) => {
        const imgSrc = item.getAttribute("data-img");
        
        if (imgSrc) {
          this.loadImage(item, imgSrc, index);
        } else {
          console.warn(`Galeri öğesi ${index} için data-img özniteliği bulunamadı`);
          this.setupPlaceholder(item);
        }
        
        // Etkileşimleri ayarla
        this.setupItemInteractions(item, index);
      });
    }
    
    // Resim yükleme fonksiyonu
    loadImage(item, imgSrc, index) {
      // Resim önce yüklensin
      const img = new Image();
      
      img.onload = () => {
        // Resim yüklendikten sonra arka planı ayarla
        item.style.backgroundImage = `url(${imgSrc})`;
        item.style.backgroundSize = "cover";
        item.style.backgroundPosition = "center";
        item.style.backgroundRepeat = "no-repeat";
        item.style.opacity = "1"; // Direkt görünür yap
        
        console.log(`Galeri öğesi ${index} resmi başarıyla yüklendi`);
      };
      
      img.onerror = () => {
        console.error(`Resim yüklenemedi: ${imgSrc}`);
        this.setupPlaceholder(item, true);
      };
      
      img.src = imgSrc;
    }
    
    // Hata durumunda placeholder göster
    setupPlaceholder(item, isError = false) {
      item.style.backgroundColor = "#f0f0f0";
      if (isError) {
        item.innerHTML = '<div class="error-placeholder">Resim Yüklenemedi</div>';
      }
    }
    
    // Galeri öğesi etkileşimlerini ayarla
    setupItemInteractions(item, index) {
      // Tıklama olayı
      item.addEventListener("click", () => {
        const imgSrc = item.getAttribute("data-img");
        if (imgSrc) {
          this.openImageModal(imgSrc, item.getAttribute("aria-label") || "Galeri görseli");
        } else {
          console.warn(`Tıklanan öğe ${index} için data-img bulunamadı`);
        }
      });
      
      // Erişilebilirlik
      this.setupAccessibility(item);
    }
    
    // Erişilebilirlik ayarları
    setupAccessibility(item) {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      
      item.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.click();
        }
      });
    }
    
    // Modal kontrolleri
    setupModalControls() {
      this.closeModal.addEventListener("click", this.closeGalleryModal);
      
      this.modal.addEventListener("click", this.handleModalClick);
      
      // Resime tıklama ile zoom
      this.modalImage.addEventListener("click", (e) => {
        e.stopPropagation(); // Modal kapanmasını engelle
        this.toggleImageZoom();
      });
      
      // Zoom durumunda ekranı kaydırmaya izin ver
      this.modalImage.addEventListener("mousedown", this.startDrag.bind(this));
      
      // ESC tuşu ile kapatma
      document.addEventListener("keydown", this.handleKeyPress);
      
      // Zoom için mouse wheel desteği
      this.modal.addEventListener("wheel", this.handleWheel.bind(this));
      
      // Zoom durumuna göre imleç stilini ayarla
      this.modalImage.style.cursor = "zoom-in";
    }
    
    // Modal dışına tıklama işleyicisi
    handleModalClick(e) {
      if (e.target === this.modal) {
        // Eğer zoom yapılmışsa önce zoom'u resetle
        if (this.isZoomed) {
          this.resetZoom();
        } else {
          this.closeGalleryModal();
        }
      }
    }
    
    // Mouse wheel ile zoom yapma
    handleWheel(e) {
      e.preventDefault();
      
      // Çarkı aşağı kaydırma = küçültme, yukarı kaydırma = büyütme
      if (e.deltaY > 0) {
        // Zoom out
        this.zoomImage(Math.max(this.currentZoom - 0.2, 1));
      } else {
        // Zoom in
        this.zoomImage(Math.min(this.currentZoom + 0.2, this.settings.maxZoomScale));
      }
    }
    
    // Resmi yakınlaştır/uzaklaştır
    toggleImageZoom() {
      if (this.isZoomed) {
        this.resetZoom();
      } else {
        this.zoomImage(this.settings.maxZoomScale);
      }
    }
    
    // Belirli bir oranda yakınlaştır
    zoomImage(scale) {
      this.currentZoom = scale;
      
      // GSAP olmadan direkt stil değişikliği
      this.modalImage.style.transform = `scale(${scale})`;
      
      // Zoom durumunu güncelle
      this.isZoomed = scale > 1;
      
      // İmleç stilini güncelle
      this.modalImage.style.cursor = this.isZoomed ? "move" : "zoom-in";
      
      // Zoom durumunda yeni bir sınıf ekle (CSS için)
      if (this.isZoomed) {
        this.modal.classList.add("zoomed");
      } else {
        this.modal.classList.remove("zoomed");
      }
    }
    
    // Zoom'u sıfırla
    resetZoom() {
      // GSAP olmadan direkt stil değişikliği
      this.modalImage.style.transform = "scale(1)";
      this.modalImage.style.left = "0";
      this.modalImage.style.top = "0";
      
      this.currentZoom = 1;
      this.isZoomed = false;
      
      // İmleç stilini güncelle
      this.modalImage.style.cursor = "zoom-in";
      
      // Zoom sınıfını kaldır
      this.modal.classList.remove("zoomed");
    }
    
    // Büyütülmüş resmi sürükleme
    startDrag(e) {
      if (!this.isZoomed) return;
      
      e.preventDefault();
      
      const startX = e.clientX;
      const startY = e.clientY;
      
      // Başlangıç pozisyonu
      const startPosX = this.modalImage.offsetLeft || 0;
      const startPosY = this.modalImage.offsetTop || 0;
      
      // Mouse hareketini izle
      const handleMouseMove = (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        // Yeni pozisyonu hesapla ve direkt uygula
        this.modalImage.style.left = `${startPosX + dx}px`;
        this.modalImage.style.top = `${startPosY + dy}px`;
      };
      
      // Mouse bırakıldığında temizle
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    
    // Klavye olayı işleyicisi
    handleKeyPress(e) {
      if (e.key === "Escape") {
        if (this.modal.style.display === "flex") {
          if (this.isZoomed) {
            this.resetZoom();
          } else {
            this.closeGalleryModal();
          }
        }
      } else if (e.key === "+" || e.key === "=") {
        if (this.modal.style.display === "flex") {
          // + tuşu ile yakınlaştır
          this.zoomImage(Math.min(this.currentZoom + 0.2, this.settings.maxZoomScale));
        }
      } else if (e.key === "-") {
        if (this.modal.style.display === "flex") {
          // - tuşu ile uzaklaştır
          this.zoomImage(Math.max(this.currentZoom - 0.2, 1));
        }
      }
    }
    
    // Resmi modal'da aç
    openImageModal(imgSrc, imgAlt) {
      console.log(`Modal'da resim açılıyor: ${imgSrc}`);
      
      // Modal resmi ayarla
      this.modalImage.src = imgSrc;
      this.modalImage.alt = imgAlt;
      
      // Zoom durumunu sıfırla
      this.resetZoom();
      
      // Modal'ı göster
      this.modal.style.display = "flex";
      this.modal.style.opacity = "1";
      this.modalImage.style.opacity = "1";
    }
    
    // Modal'ı kapat
    closeGalleryModal() {
      this.modal.style.display = "none";
      // Zoom durumunu sıfırla
      this.resetZoom();
    }
    
    // Resim yollarını kontrol et
    checkImagePaths() {
      console.log("Resim yolları kontrol ediliyor:");
      
      this.galleryItems.forEach((item, index) => {
        const imgSrc = item.getAttribute("data-img");
        console.log(`Öğe ${index}: data-img="${imgSrc}"`);
        
        if (imgSrc) {
          fetch(imgSrc, { method: 'HEAD' })
            .then(response => {
              console.log(`Öğe ${index} resim kontrolü: ${response.ok ? 'Başarılı' : 'Başarısız'} (${response.status})`);
            })
            .catch(error => {
              console.error(`Öğe ${index} resim yolu kontrol hatası:`, error);
            });
        }
      });
    }
    
    // Temizleme - event listener'ları kaldır
    destroy() {
      // Modal event listener'ları kaldır
      this.closeModal.removeEventListener("click", this.closeGalleryModal);
      this.modal.removeEventListener("click", this.handleModalClick);
      this.modalImage.removeEventListener("click", this.toggleImageZoom);
      this.modal.removeEventListener("wheel", this.handleWheel);
      document.removeEventListener("keydown", this.handleKeyPress);
      
      // Galeri öğeleri event listener'larını kaldır
      this.galleryItems.forEach(item => {
        // Hover event listener'ları zaten yok
        item.removeEventListener("click", this.handleItemClick);
        item.removeEventListener("keypress", this.handleItemKeypress);
      });
      
      console.log("Galeri kaynakları temizlendi");
    }
  }
  
  // Sayfa yüklendiğinde galeriyi başlat
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM yüklendi, galeri başlatılıyor...");
    
    // Galeri örneği oluştur
    const gallery = new ImageGallery({
      // İsteğe bağlı özel ayarlar buraya eklenebilir
      // gallerySelector: ".custom-gallery-item",
      maxZoomScale: 2.5 // Maksimum zoom seviyesi
    });
    
    // Geliştirme için global erişim sağla
    window.imageGallery = gallery;
    
    // Bazı CSS eklemeleri
    const style = document.createElement('style');
    style.innerHTML = `
      #imageModal.zoomed #modalImage {
        cursor: move !important;
      }
    `;
    document.head.appendChild(style);
  });
// Form animasyonları
function initializeFormAnimations() {
    // Form input animasyonları
    const animatedInputs = document.querySelectorAll(".animated-input input, .animated-input textarea, .animated-input select");
    
    animatedInputs.forEach(input => {
        // Başlangıçta içeriği varsa label'ı aktif et
        if (input.value.trim() !== "") {
            input.parentElement.classList.add("active");
        }
        
        // Focus olayları
        input.addEventListener("focus", () => {
            input.parentElement.classList.add("active");
            
            // Input efekti animasyonu
            const effect = input.nextElementSibling;
            if (effect && effect.classList.contains("input-effect")) {
                gsap.fromTo(effect, 
                    { width: "0%" },
                    { width: "100%", duration: 0.5, ease: "power2.out" }
                );
            }
        });
        
        input.addEventListener("blur", () => {
            if (input.value.trim() === "") {
                input.parentElement.classList.remove("active");
            }
        });
    });
    
    // Buton hover animasyonları
    const buttons = document.querySelectorAll(".btn");
    
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power1.out"
            });
            
            // İkon animasyonu
            const icon = btn.querySelector(".btn-icon");
            if (icon) {
                gsap.to(icon, {
                    x: 5,
                    duration: 0.3,
                    ease: "power1.out"
                });
            }
        });
        
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power1.in"
            });
            
            // İkon animasyonu
            const icon = btn.querySelector(".btn-icon");
            if (icon) {
                gsap.to(icon, {
                    x: 0,
                    duration: 0.3,
                    ease: "power1.in"
                });
            }
        });
    });
}

// Cinemagraph efektleri
function initializeCinemagraphs() {
    const cinemagraphs = document.querySelectorAll(".cinemagraph");
    
    cinemagraphs.forEach(cinemagraph => {
        const element = cinemagraph.querySelector(".room-cinemagraph-element");
        if (!element) return;
        
        const roomType = cinemagraph.getAttribute("data-room-type");
        
        // Her oda tipi için farklı bir cinemagraph animasyonu
        switch(roomType) {
            case "standart":
                animateStandardRoom(element);
                break;
            case "deluxe":
                animateDeluxeRoom(element);
                break;
            case "suite":
                animateSuiteRoom(element);
                break;
        }
    });
    
    function animateStandardRoom(element) {
        // Perdelerin hafif dalgalanması
        gsap.to(element, {
            backgroundPosition: "center calc(50% + 10px)",
            repeat: -1,
            yoyo: true,
            duration: 8,
            ease: "sine.inOut"
        });
    }
    
    function animateDeluxeRoom(element) {
        // Deniz manzarası ve martı geçişi
        gsap.to(element, {
            opacity: 0.9,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: "sine.inOut"
        });
        
        // Random martı animasyonu
        setInterval(() => {
            const bird = document.createElement("div");
            bird.className = "bird-animation";
            element.appendChild(bird);
            
            gsap.fromTo(bird, 
                { left: "-10%", top: Math.random() * 50 + 10 + "%" },
                { 
                    left: "110%", 
                    duration: 8, 
                    ease: "power1.inOut",
                    onComplete: () => bird.remove()
                }
            );
        }, 10000);
    }
    
    function animateSuiteRoom(element) {
        // Şömine ateşi efekti
        gsap.to(element, {
            filter: "brightness(1.1)",
            repeat: -1,
            yoyo: true,
            duration: 0.8,
            ease: "sine.inOut",
            repeatDelay: 0.2
        });
    }
}

// İletişim formu işlemleri
function initializeContactForm() {
    const contactForm = document.getElementById("contactForm");
    const contactAlert = document.getElementById("contactAlert");
    
    if (!contactForm || !contactAlert) return;
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        // Formun gönderildiğini simüle et
        simulateFormSubmission(contactForm, contactAlert);
    });
}

// Rezervasyon formu işlemleri
function initializeReservationForm() {
    const reservationForm = document.getElementById("reservationForm");
    
    if (!reservationForm) return;
    
    // Tarih girişleri için minimum bugünün tarihi
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");
    
    if (checkInInput && checkOutInput) {
        checkInInput.min = today;
        checkInInput.value = today;
        
        // Çıkış tarihi minimum giriş tarihinden bir gün sonra
        checkInInput.addEventListener("change", () => {
            const checkInDate = new Date(checkInInput.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            const minCheckOutDate = checkInDate.toISOString().split('T')[0];
            
            checkOutInput.min = minCheckOutDate;
            
            // Eğer çıkış tarihi giriş tarihinden önceyse güncelle
            if (checkOutInput.value < minCheckOutDate) {
                checkOutInput.value = minCheckOutDate;
            }
        });
        
        // Başlangıçta çıkış tarihini ayarla
        const initCheckOutDate = new Date();
        initCheckOutDate.setDate(initCheckOutDate.getDate() + 1);
        checkOutInput.min = initCheckOutDate.toISOString().split('T')[0];
        checkOutInput.value = initCheckOutDate.toISOString().split('T')[0];
    }
    
    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(reservationForm);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        // Rezervasyon özeti oluştur
        createReservationSummary(data);
    });
    
    function createReservationSummary(data) {
        // Var olan özet modalini kaldır
        const existingSummary = document.getElementById("reservationSummary");
        if (existingSummary) {
            existingSummary.remove();
        }
        
        // Rezervasyon özeti modalini oluştur
        const summaryModal = document.createElement("div");
        summaryModal.id = "reservationSummary";
        summaryModal.className = "modal";
        summaryModal.style.display = "flex";
        summaryModal.innerHTML = `
            <div class="modal-content glassmorphism">
                <span class="close-modal" id="closeSummary">&times;</span>
                <h2 class="fancy-title">Rezervasyon Özeti</h2>
                <div class="summary-content">
                    <p><strong>Ad Soyad:</strong> ${data.fullName}</p>
                    <p><strong>E-posta:</strong> ${data.email}</p>
                    <p><strong>Telefon:</strong> ${data.phone}</p>
                    <p><strong>Giriş Tarihi:</strong> ${formatDate(data.checkIn)}</p>
                    <p><strong>Çıkış Tarihi:</strong> ${formatDate(data.checkOut)}</p>
                    <p><strong>Oda Tipi:</strong> ${getOdaTipi(data.roomType)}</p>
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
        
        // Modalı DOM'a ekle
        document.body.appendChild(summaryModal);
        
        // Modal animasyonu
        gsap.fromTo(summaryModal.querySelector(".modal-content"), 
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "back.out" }
        );
        
        // Kapatma olayı
        document.getElementById("closeSummary").addEventListener("click", () => {
            gsap.to(summaryModal.querySelector(".modal-content"), {
                y: -50,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    summaryModal.remove();
                }
            });
        });
        
        // Rezervasyon onaylama
        document.getElementById("confirmReservation").addEventListener("click", () => {
            summaryModal.querySelector(".summary-content").innerHTML = `
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
            
            summaryModal.querySelector(".summary-actions").innerHTML = `
                <button class="btn btn-primary btn-gradient" id="closeConfirmation">
                    <span class="btn-text">Kapat</span>
                </button>
            `;
            
            // Animasyon ve başarı sesi efekti
            animateSuccessCheck();
            
            document.getElementById("closeConfirmation").addEventListener("click", () => {
                gsap.to(summaryModal.querySelector(".modal-content"), {
                    y: -50,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        summaryModal.remove();
                        
                        // Formu sıfırla
                        reservationForm.reset();
                        // Bugünün tarihiyle yeniden doldur
                        if (checkInInput && checkOutInput) {
                            checkInInput.value = today;
                            const tmr = new Date();
                            tmr.setDate(tmr.getDate() + 1);
                            checkOutInput.value = tmr.toISOString().split('T')[0];
                        }
                    }
                });
            });
        });
    }
    
    function getOdaTipi(type) {
        switch(type) {
            case "standard": return "Standart Oda";
            case "deluxe": return "Deluxe Oda";
            case "suite": return "Suite";
            default: return type;
        }
    }
    
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    }
}

// Form gönderim simulasyonu
function simulateFormSubmission(form, alertElement) {
    // Yükleniyor göster
    const submitBtn = form.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="loading-spinner"></span> Gönderiliyor...`;
    submitBtn.disabled = true;
    
    // Yapay gecikme
    setTimeout(() => {
        // Başarılı gönderim
        submitBtn.innerHTML = `<i class="fas fa-check"></i> Gönderildi!`;
        
        if (alertElement) {
            alertElement.style.display = "block";
            alertElement.classList.add("show");
            
            // Alert animasyonu
            gsap.fromTo(alertElement, 
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        }
        
        // Form verileri sıfırla
        form.reset();
        
        // 3 saniye sonra butonu eski haline getir ve alertı gizle
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

// Logo animasyonları
function animatePageContent() {
    // Logo animasyonu
    animateLogo();
    
    // Hero bölümü animasyonları
    animateHero();
    
    // Kinetik text hover animasyonu
    const kineticTexts = document.querySelectorAll(".kinetic-text, .fancy-title");
    kineticTexts.forEach(text => {
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

// Logo animasyonları
function animateLogo() {
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
    
    // Logo hover animasyonu
    const logoLinks = document.querySelectorAll(".kinetic-logo, .animated-logo");
    
    logoLinks.forEach(logo => {
        logo.addEventListener("mouseenter", () => {
            gsap.to(logo.querySelectorAll(".logo-text, .logo-symbol"), {
                y: -5,
                stagger: 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        logo.addEventListener("mouseleave", () => {
            gsap.to(logo.querySelectorAll(".logo-text, .logo-symbol"), {
                y: 0,
                stagger: 0.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}


// Başarılı işlem check animasyonu
function animateSuccessCheck() {
    const checkmark = document.querySelector('.checkmark');
    const circle = document.querySelector('.checkmark__circle');
    const check = document.querySelector('.checkmark__check');
    
    if (!checkmark || !circle || !check) return;
    
    gsap.fromTo(circle, {
        drawSVG: "0%"
    }, {
        drawSVG: "100%",
        duration: 1,
        ease: "power2.inOut"
    });
    
    gsap.fromTo(check, {
        drawSVG: "0%"
    }, {
        drawSVG: "100%",
        duration: 0.5,
        delay: 0.7,
        ease: "power2.inOut"
    });
}

// Erişilebilirlik geliştirmeleri - yeni fonksiyon
function enhanceAccessibility() {
    // Klavye navigasyonu için focus göstergelerini iyileştir
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('focus-visible');
        });
    });
    
}

// DOM yüklendikten sonra çağrılacak fonksiyonlar listesine ekleyin
document.addEventListener("DOMContentLoaded", () => {
    // Kritik öğelerin yüklenmesini bekleyelim
    const criticalImages = document.querySelectorAll('img[loading="eager"], .hero-bg img');
    
    // Tüm kritik kaynakların yüklenme durumunu izle
    const loadPromises = [...criticalImages].map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // Hata olsa da devam et
        });
    });
    
    // Önceki preloader kodunuzu aşağıdaki ile değiştirin
    const preloader = document.getElementById("preloader");
    const progress = document.querySelector(".loading-progress");
    
    // Daha doğal yükleme simülasyonu
    let loadingProgress = 0;
    const loadingInterval = setInterval(() => {
        // İlk %70'e hızlı ulaş
        if (loadingProgress < 70) {
            loadingProgress += (Math.random() * 10);
        } else {
            // Kalan %30 için daha yavaş artış
            loadingProgress += (Math.random() * 2);
        }
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(loadingInterval);
        }
        
        progress.style.width = `${Math.min(loadingProgress, 99)}%`;
    }, 150);
    
    // Tüm kritik kaynaklar yüklendiğinde preloader'ı kaldır
    Promise.all(loadPromises).then(() => {
        loadingProgress = 100;
        progress.style.width = "100%";
        
        // Preloader'ı kaldır
        setTimeout(() => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    preloader.style.display = "none";
                    // Sayfa içeriğini canlandır
                    animatePageContent();
                }
            });
        }, 500);
    });
    enhanceAccessibility();
});


// Form doğrulama iyileştirmeleri - yeni fonksiyon
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Gerçek zamanlı doğrulama
            input.addEventListener('input', () => {
                validateInput(input);
            });
            
            // Blur olayında doğrulama
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });
        
        form.addEventListener('submit', (e) => {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // İlk hatalı input'a odaklan
                form.querySelector('.input-error')?.focus();
            }
        });
    });
    
    function validateInput(input) {
        const errorElement = input.parentElement.querySelector('.error-message') || 
                             document.createElement('span');
        
        if (!errorElement.classList.contains('error-message')) {
            errorElement.classList.add('error-message');
            input.parentElement.appendChild(errorElement);
        }
        
        let isValid = input.checkValidity();
        
        if (!isValid) {
            const errorMessage = getErrorMessage(input);
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            input.classList.add('input-error');
            
            // Animasyon
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
    
    function getErrorMessage(input) {
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

// DOM yüklendikten sonra çağrılacak fonksiyonlar listesine ekleyin
document.addEventListener("DOMContentLoaded", () => {
    // ... mevcut çağrılar ...
    enhanceFormValidation();
});

// Mobil deneyim iyileştirmeleri - yeni fonksiyon
function enhanceMobileExperience() {
    // Dokunmatik cihazlarda hover durumu düzeltmeleri
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
        
        // Dokunmatik cihazlarda özel imleç devre dışı bırak
        const cursor = document.getElementById("cursor-dot");
        const cursorCircle = document.getElementById("cursor-circle");
        
        if (cursor && cursorCircle) {
            cursor.style.display = "none";
            cursorCircle.style.display = "none";
        }
        
        // Mobil menü kaydırma davranışını iyileştir
        const navLinks = document.getElementById("navLinks");
        if (navLinks) {
            navLinks.addEventListener("touchstart", (e) => {
                // Menü içinde kaydırma olduğunda sayfanın kaydırılmasını engelleme
                e.stopPropagation();
            });
        }
    }
    
    // Ekran boyutu değişikliklerini izle
    const resizeObserver = new ResizeObserver(throttle(adjustLayoutForScreenSize, 200));
    resizeObserver.observe(document.body);
    
    // İlk yükleme için ekran boyutunu ayarla
    adjustLayoutForScreenSize();
    
    function adjustLayoutForScreenSize() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-tablet', isTablet);
        
        // Mobilde bazı animasyonları basitleştir
        if (isMobile) {
            document.querySelectorAll('[data-mobile-simplified]').forEach(element => {
                // Basitleştirilmiş animasyon için sınıf ekle
                element.classList.add('mobile-simplified');
            });
        } else {
            document.querySelectorAll('.mobile-simplified').forEach(element => {
                element.classList.remove('mobile-simplified');
            });
        }
    }
    
    // Throttle fonksiyonu
    function throttle(func, limit) {
        let lastCall;
        return function(...args) {
            const now = Date.now();
            if (!lastCall || now - lastCall >= limit) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    }
}

// DOM yüklendikten sonra çağrılacak fonksiyonlar listesine ekleyin
document.addEventListener("DOMContentLoaded", () => {
    // ... mevcut çağrılar ...
    enhanceMobileExperience();
});


// Görsel optimizasyonu - yeni fonksiyon
function optimizeImages() {
    // Görüntüleri yalnızca görünür olduklarında yükle
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    lazyImages.forEach(img => {
        // Native lazy loading desteği
        img.setAttribute('loading', 'lazy');
        
        // Eski tarayıcılar için IntersectionObserver ile lazy loading
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        // Yükleme sonrası görüntü görünümünü canlandır
                        img.addEventListener('load', () => {
                            gsap.fromTo(img, 
                                { opacity: 0 },
                                { opacity: 1, duration: 0.5 }
                            );
                        });
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            observer.observe(img);
        }
    });
    
    // WebP formatı kontrolü ve otomatik değiştirme
    function supportsWebP() {
        const elem = document.createElement('canvas');
        if (elem.getContext && elem.getContext('2d')) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    }
    
    if (supportsWebP()) {
        document.body.classList.add('webp-support');
        
        // CSS arka plan resimlerinde WebP kullanımı için class ekle
        document.querySelectorAll('[data-webp-bg]').forEach(element => {
            const webpUrl = element.getAttribute('data-webp-bg');
            if (webpUrl) {
                element.style.backgroundImage = `url(${webpUrl})`;
            }
        });
    }
}

// DOM yüklendikten sonra çağrılacak fonksiyonlar listesine ekleyin
document.addEventListener("DOMContentLoaded", () => {
    // ... mevcut çağrılar ...
    optimizeImages();
});

// Rezervasyon Formu İşlevselliği
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeSelect = document.getElementById('roomType');
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const roomPriceElement = document.getElementById('roomPrice');
    const totalNightsElement = document.getElementById('totalNights');
    const grandTotalElement = document.getElementById('grandTotal');
    
    // Oda fiyatları
    const roomPrices = {
        'standart': 1200,
        'deluxe': 1800,
        'suite': 2500
    };
    
    // Bugünün tarihini ayarla
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    checkInInput.value = today;
    
    // Çıkış tarihi minimum giriş tarihinden bir gün sonra
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOutInput.min = tomorrow.toISOString().split('T')[0];
    checkOutInput.value = tomorrow.toISOString().split('T')[0];
    
    // Giriş tarihi değiştiğinde çıkış tarihini güncelle
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const minCheckOutDate = new Date(checkInDate);
        minCheckOutDate.setDate(checkInDate.getDate() + 1);
        
        checkOutInput.min = minCheckOutDate.toISOString().split('T')[0];
        
        // Eğer çıkış tarihi girişten önceyse güncelle
        if (new Date(checkOutInput.value) < minCheckOutDate) {
            checkOutInput.value = minCheckOutDate.toISOString().split('T')[0];
        }
        
        updatePriceSummary();
    });
    
    // Çıkış tarihi değiştiğinde fiyatı güncelle
    checkOutInput.addEventListener('change', updatePriceSummary);
    
    // Oda tipi değiştiğinde fiyatı güncelle
    roomTypeSelect.addEventListener('change', updatePriceSummary);
    
    // Misafir sayısı butonları
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const input = document.getElementById(target);
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                if (value > (target === 'adults' ? 1 : 0)) {
                    input.value = value - 1;
                }
            } else {
                if (value < (target === 'adults' ? 4 : 2)) {
                    input.value = value + 1;
                }
            }
            
            updatePriceSummary();
        });
    });
    
    // Fiyat özetini güncelle
    function updatePriceSummary() {
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
        
        const roomType = roomTypeSelect.value;
        const roomPrice = roomPrices[roomType] || 0;
        const totalPrice = roomPrice * nights;
        
        roomPriceElement.textContent = `₺${roomPrice.toLocaleString('tr-TR')}`;
        totalNightsElement.textContent = `${nights} gece`;
        grandTotalElement.textContent = `₺${totalPrice.toLocaleString('tr-TR')}`;
    }
    
    // İlk yüklemede fiyatı güncelle
    updatePriceSummary();
    
    // Form gönderimi
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini topla
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Gece sayısını hesapla
        const checkIn = new Date(data.checkIn);
        const checkOut = new Date(data.checkOut);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
        
        // Toplam fiyatı hesapla
        const roomPrice = roomPrices[data.roomType] || 0;
        const totalPrice = roomPrice * nights;
        
        // Rezervasyon özetini göster
        showReservationSummary(data, nights, totalPrice);
    });
    
    // Rezervasyon özeti modalı
    function showReservationSummary(data, nights, totalPrice) {
        const modal = document.createElement('div');
        modal.className = 'reservation-summary-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Rezervasyon Özeti</h2>
                
                <div class="summary-section">
                    <h3>Kişi Bilgileri</h3>
                    <p><strong>Ad Soyad:</strong> ${data.fullName}</p>
                    <p><strong>E-posta:</strong> ${data.email}</p>
                    <p><strong>Telefon:</strong> ${data.phone}</p>
                </div>
                
                <div class="summary-section">
                    <h3>Konaklama Bilgileri</h3>
                    <p><strong>Giriş:</strong> ${formatDate(data.checkIn)}</p>
                    <p><strong>Çıkış:</strong> ${formatDate(data.checkOut)}</p>
                    <p><strong>Oda Tipi:</strong> ${getRoomName(data.roomType)}</p>
                    <p><strong>Gece Sayısı:</strong> ${nights} gece</p>
                    <p><strong>Misafirler:</strong> ${data.adults} Yetişkin, ${data.children} Çocuk</p>
                    ${data.specialRequests ? `<p><strong>Özel İstekler:</strong> ${data.specialRequests}</p>` : ''}
                </div>
                
                <div class="summary-section">
                    <h3>Toplam Ücret</h3>
                    <p class="total-price">₺${totalPrice.toLocaleString('tr-TR')}</p>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-outline" id="editReservation">Düzenle</button>
                    <button class="btn btn-primary" id="confirmReservation">Rezervasyonu Onayla</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animasyon
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3 }
        );
        
        // Kapatma butonu
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        
        // Düzenle butonu
        modal.querySelector('#editReservation').addEventListener('click', closeModal);
        
        // Onayla butonu
        modal.querySelector('#confirmReservation').addEventListener('click', function() {
            processReservation(data, totalPrice, modal);
        });
        
        function closeModal() {
            gsap.to(modal.querySelector('.modal-content'), {
                y: 50,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Rezervasyon işleme
    function processReservation(data, totalPrice, modal) {
        const content = modal.querySelector('.modal-content');
        
        // Yükleme göstergesi
        content.innerHTML = `
            <div class="processing">
                <div class="spinner"></div>
                <p>Rezervasyonunuz işleniyor...</p>
            </div>
        `;
        
        // Simüle edilmiş API isteği
        setTimeout(() => {
            // Başarılı yanıt simülasyonu
            content.innerHTML = `
                <div class="success-message">
                    <svg class="checkmark" viewBox="0 0 52 52">
                        <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <h3>Rezervasyonunuz Tamamlandı!</h3>
                    <p>Rezervasyon numaranız: <strong>${Math.floor(100000 + Math.random() * 900000)}</strong></p>
                    <p>Detaylar e-posta adresinize gönderilmiştir.</p>
                    <button class="btn btn-primary" id="closeSuccess">Tamam</button>
                </div>
            `;
            
            // Animasyon
            animateCheckmark();
            
            // Kapat butonu
            document.getElementById('closeSuccess').addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
                reservationForm.reset();
                
                // Bugünün tarihiyle yeniden doldur
                checkInInput.value = today;
                const tmr = new Date();
                tmr.setDate(tmr.getDate() + 1);
                checkOutInput.value = tmr.toISOString().split('T')[0];
                
                updatePriceSummary();
            });
        }, 2000);
    }
    
    // Checkmark animasyonu
    function animateCheckmark() {
        const checkmark = document.querySelector('.checkmark');
        const circle = document.querySelector('.checkmark-circle');
        const check = document.querySelector('.checkmark-check');
        
        if (!checkmark || !circle || !check) return;
        
        // Animasyon için GSAP kullanımı
        gsap.set([circle, check], { strokeDashoffset: 0 });
        
        gsap.fromTo(circle, 
            { strokeDasharray: '0, 158' },
            { strokeDasharray: '158, 158', duration: 0.8, ease: "power2.out" }
        );
        
        gsap.fromTo(check, 
            { strokeDasharray: '0, 48' },
            { strokeDasharray: '48, 48', duration: 0.4, delay: 0.6, ease: "power2.out" }
        );
    }
    
    // Tarih formatlama
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    }
    
    // Oda adını getirme
    function getRoomName(roomType) {
        const names = {
            'standart': 'Standart Oda',
            'deluxe': 'Deluxe Oda',
            'suite': 'Suite'
        };
        return names[roomType] || roomType;
    }
});

// Rezervasyon Modal Stilleri
const style = document.createElement('style');
style.textContent = `
.reservation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

.modal-content {
    background-color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    overflow: hidden;
    transform: translateY(-50px);
    animation: slideUp 0.3s 0.3s forwards;
}

@keyframes slideUp {
    to { transform: translateY(0); }
}

.modal-header {
    padding: 1.5rem;
    background-color: var(--primary-color);
    color: white;
    position: relative;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
}

.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-body {
    padding: 1.5rem;
}

.summary-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
}

.summary-section h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary-dark);
}

.total-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
}

.modal-footer {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    background-color: #f9f9f9;
}

.success-message {
    text-align: center;
    padding: 2rem 0;
}

.checkmark {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    display: block;
}

.checkmark-circle {
    stroke: var(--primary-color);
    stroke-width: 2;
    stroke-dasharray: 158;
    stroke-dashoffset: 158;
}

.checkmark-check {
    stroke: var(--primary-color);
    stroke-width: 2;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
}

.success-message h4 {
    color: var(--primary-dark);
    margin-bottom: 0.5rem;
}

.success-message p {
    color: var(--text-light);
}

/* Loading animasyonu */
.loading {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.loading:before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    border: 2px solid #ccc;
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

// Form alanlarına animasyon ekleme
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check if the parent has the 'animated-input' class used by the old form
    // to avoid applying the new logic to the old reservation form if it's still partially present.
    // Also check if it's inside the contact form specifically.
    if (input.closest('#contactForm') && !input.closest('.animated-input')) {
        input.addEventListener('focus', function() {
            // Use :valid pseudo-class for check, so no need to add 'active' class manually
            // Ensure the label exists before trying to access it
            const label = this.parentNode.querySelector('label');
            if (label) {
                // label.classList.add('active'); // Removed, relies on CSS :valid
            }
            // Ensure the input-bar exists
            const inputBar = this.parentNode.querySelector('.input-bar');
            if (inputBar) {
                inputBar.style.width = '100%';
            }
        });
        
        input.addEventListener('blur', function() {
            // Label movement is handled by :valid in CSS
            // Only reset the bar if the input is empty
            if (this.value === '') {
                 // Ensure the label exists before trying to access it
                const label = this.parentNode.querySelector('label');
                // if (label) {
                //    label.classList.remove('active'); // Removed, relies on CSS :valid
                // }
                // Ensure the input-bar exists
                 const inputBar = this.parentNode.querySelector('.input-bar');
                if (inputBar) {
                    inputBar.style.width = '0';
                }
            }
        });
        
        // Sayfa yüklendiğinde dolu alanları kontrol et (CSS :valid bunu halleder)
        // if (input.value !== '') {
        //     const label = input.parentNode.querySelector('label');
        //     if (label) {
        //        label.classList.add('active');
        //     }
        // }
    }
});

// Galeri Filtreleme Fonksiyonu (Güncellenmiş)
function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Varsayılan olarak sadece odaları göster
    galleryItems.forEach(item => {
        if (item.getAttribute('data-category') !== 'odalar') {
            item.style.display = 'none';
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Tüm butonlardan 'active' sınıfını kaldır
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Tıklanan butona 'active' sınıfını ekle
            button.classList.add('active');

            // Galeri öğelerini filtrele
            galleryItems.forEach(item => {
                if (item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Animasyon ekle
                    gsap.fromTo(item, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Galeri Modal Fonksiyonu
function initializeGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="" class="modal-image">
            <div class="modal-caption"></div>
            <button class="nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
            <button class="nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    document.body.appendChild(modal);
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').getAttribute('data-src'),
        alt: item.querySelector('img').getAttribute('alt'),
        title: item.querySelector('h3')?.textContent || ''
    }));
    
    function openModal(index) {
        currentIndex = index;
        const image = images[currentIndex];
        
        modal.querySelector('.modal-image').src = image.src;
        modal.querySelector('.modal-image').alt = image.alt;
        modal.querySelector('.modal-caption').textContent = image.title;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animasyon
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.3 }
        );
    }
    
    function closeModal() {
        gsap.to(modal.querySelector('.modal-content'), {
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
            onComplete: () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    function navigate(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;
        
        const image = images[currentIndex];
        const modalImg = modal.querySelector('.modal-image');
        const modalCaption = modal.querySelector('.modal-caption');
        
        // Yeni resim yüklenirken yükleme göstergesi
        modalCaption.textContent = 'Yükleniyor...';
        modalImg.style.opacity = '0';
        
        const img = new Image();
        img.onload = () => {
            modalImg.src = image.src;
            modalImg.alt = image.alt;
            modalCaption.textContent = image.title;
            
            gsap.to(modalImg, {
                opacity: 1,
                duration: 0.3
            });
        };
        img.src = image.src;
    }
    
    // Galeri öğelerine tıklama
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
    
    // Modal kapatma
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Navigasyon butonları
    modal.querySelector('.prev-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(-1);
    });
    
    modal.querySelector('.next-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        navigate(1);
    });
    
    // Klavye navigasyonu
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
    });
}

// Video Kontrolleri
function initializeVideoControls() {
    const videos = document.querySelectorAll('.video-wrapper video');
    
    videos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');
        
        // Video yüklendiğinde posterı kaldır
        video.addEventListener('loadeddata', () => {
            video.removeAttribute('poster');
        });
        
        // Video oynatma/duraklatma için tıklama
        wrapper.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                wrapper.classList.add('playing');
            } else {
                video.pause();
                wrapper.classList.remove('playing');
            }
        });
    });
}

// Rezervasyon Formu Geliştirmeleri
function enhanceReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    // Tarih kontrolleri
    const checkInInput = form.querySelector('#checkIn');
    const checkOutInput = form.querySelector('#checkOut');
    
    // Bugünün tarihini ayarla
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    checkInInput.value = today;
    
    // Çıkış tarihi minimum giriş tarihinden bir gün sonra
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOutInput.min = tomorrow.toISOString().split('T')[0];
    checkOutInput.value = tomorrow.toISOString().split('T')[0];
    
    // Giriş tarihi değiştiğinde çıkış tarihini güncelle
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const minCheckOutDate = new Date(checkInDate);
        minCheckOutDate.setDate(checkInDate.getDate() + 1);
        
        checkOutInput.min = minCheckOutDate.toISOString().split('T')[0];
        
        // Eğer çıkış tarihi girişten önceyse güncelle
        if (new Date(checkOutInput.value) < minCheckOutDate) {
            checkOutInput.value = minCheckOutDate.toISOString().split('T')[0];
        }
    });

    // Oda tipi değiştiğinde fiyatı güncelle
    const roomTypeSelect = form.querySelector('#roomType');
    const roomPriceDisplay = document.createElement('div');
    roomPriceDisplay.className = 'room-price-display';
    roomTypeSelect.parentNode.appendChild(roomPriceDisplay);
    
    const roomPrices = {
        'standart': 1200,
        'deluxe': 1800,
        'suite': 2500
    };
    
    function updatePriceDisplay() {
        const selectedRoom = roomTypeSelect.value;
        const price = roomPrices[selectedRoom] || 0;
        roomPriceDisplay.textContent = `Fiyat: ₺${price.toLocaleString('tr-TR')} / gece`;
    }
    
    roomTypeSelect.addEventListener('change', updatePriceDisplay);
    updatePriceDisplay(); // İlk yüklemede fiyatı göster

    // Form gönderimi
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form verilerini topla
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Gece sayısını hesapla
        const checkIn = new Date(data.checkIn);
        const checkOut = new Date(data.checkOut);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1;
        
        // Toplam fiyatı hesapla
        const roomPrice = roomPrices[data.roomType] || 0;
        const totalPrice = roomPrice * nights;
        
        // Rezervasyon özetini göster
        showReservationSummary(data, nights, totalPrice);
    });
    
    function showReservationSummary(data, nights, totalPrice) {
        const modal = document.createElement('div');
        modal.className = 'reservation-summary-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Rezervasyon Özeti</h2>
                
                <div class="summary-section">
                    <h3>Kişi Bilgileri</h3>
                    <p><strong>Ad Soyad:</strong> ${data['full-name']}</p>
                    <p><strong>E-posta:</strong> ${data.email}</p>
                    <p><strong>Telefon:</strong> ${data.phone}</p>
                </div>
                
                <div class="summary-section">
                    <h3>Konaklama Bilgileri</h3>
                    <p><strong>Giriş:</strong> ${formatDate(data['check-in'])}</p>
                    <p><strong>Çıkış:</strong> ${formatDate(data['check-out'])}</p>
                    <p><strong>Oda Tipi:</strong> ${getRoomName(data['room-type'])}</p>
                </div>
                
                <div class="summary-section">
                    <h4>Toplam Ücret</h4>
                    <p class="total-price">₺${totalPrice.toLocaleString('tr-TR')}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animasyon
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3 }
        );
        
        // Kapatma butonu
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        
        // Düzenle butonu
        modal.querySelector('#editReservation').addEventListener('click', closeModal);
        
        // Onayla butonu
        modal.querySelector('#confirmReservation').addEventListener('click', function() {
            processReservation(data, totalPrice, modal);
        });
    }
    
    function processReservation(data, totalPrice, modal) {
        const content = modal.querySelector('.modal-content');
        
        // Yükleme göstergesi
        content.innerHTML = `
            <div class="processing">
                <div class="spinner"></div>
                <p>Rezervasyonunuz işleniyor...</p>
            </div>
        `;
        
        // Simüle edilmiş API isteği
        setTimeout(() => {
            // Başarılı yanıt simülasyonu
            content.innerHTML = `
                <div class="success-message">
                    <svg class="checkmark" viewBox="0 0 52 52">
                        <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <h3>Rezervasyonunuz Tamamlandı!</h3>
                    <p>Rezervasyon numaranız: <strong>${Math.floor(100000 + Math.random() * 900000)}</strong></p>
                    <p>Detaylar e-posta adresinize gönderilmiştir.</p>
                    <button class="btn btn-primary" id="closeSuccess">Tamam</button>
                </div>
            `;
            
            // Animasyon
            animateCheckmark();
            
            // Kapat butonu
            document.getElementById('closeSuccess').addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
                reservationForm.reset();
                
                // Bugünün tarihiyle yeniden doldur
                checkInInput.value = today;
                const tmr = new Date();
                tmr.setDate(tmr.getDate() + 1);
                checkOutInput.value = tmr.toISOString().split('T')[0];
                
                updatePriceSummary();
            });
        }, 2000);
    }
    
    function animateCheckmark() {
        const checkmark = document.querySelector('.checkmark');
        const circle = document.querySelector('.checkmark-circle');
        const check = document.querySelector('.checkmark-check');
        
        // Animasyon için GSAP kullanımı
        gsap.set([circle, check], { strokeDashoffset: 0 });
        
        gsap.fromTo(circle, 
            { strokeDasharray: '0, 158' },
            { strokeDasharray: '158, 158', duration: 0.8, ease: "power2.out" }
        );
        
        gsap.fromTo(check, 
            { strokeDasharray: '0, 48' },
            { strokeDasharray: '48, 48', duration: 0.4, delay: 0.6, ease: "power2.out" }
        );
    }
    
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    }
    
    function getRoomName(roomType) {
        const names = {
            'standart': 'Standart Oda',
            'deluxe': 'Deluxe Oda',
            'suite': 'Suite'
        };
        return names[roomType] || roomType;
    }
}

// DOM yüklendiğinde çağır
document.addEventListener('DOMContentLoaded', () => {
    initializeGalleryFilter();
    initializeGalleryModal();
    initializeVideoControls();
    enhanceReservationForm();
});

// =============================================
// Galeri için tam ekran görüntüleme fonksiyonu
// =============================================
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const imgSrc = this.closest('.gallery-item').querySelector('img').src;
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0', left: '0',
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        const img = document.createElement('img');
        img.src = imgSrc;
        Object.assign(img.style, {
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain'
        });
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '20px', right: '30px',
            fontSize: '40px', color: 'white',
            background: 'none', border: 'none',
            cursor: 'pointer'
        });
        closeBtn.addEventListener('click', () => document.body.removeChild(modal));
        modal.appendChild(img);
        modal.appendChild(closeBtn);
        modal.addEventListener('click', e => {
            if (e.target === modal) document.body.removeChild(modal);
        });
        document.body.appendChild(modal);
    });
});

// =============================================
// Video tam ekran fonksiyonu
// =============================================
document.querySelectorAll('.fullscreen-btn').forEach(button => {
    button.addEventListener('click', function() {
        const video = this.closest('.video-wrapper').querySelector('video');
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
});