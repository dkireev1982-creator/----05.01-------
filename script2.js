


    // Хедер
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 24) {
    header.classList.add('stuck');
  } else {
    header.classList.remove('stuck');
  }
});

// Бургер меню
 document.addEventListener('DOMContentLoaded', function() {
            // Обработчик бургер-меню
            const burgerButton = document.querySelector('.burger-button');
            const mobileMenu = document.querySelector('.mobile-menu');
            const header = document.querySelector('.header');
            
            if (burgerButton && mobileMenu && header) {
                burgerButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    mobileMenu.classList.toggle('active');
                    burgerButton.classList.toggle('active');
                    header.classList.toggle('menu-opened');
                    
                    // Синхронизируем класс scrolled с мобильным меню
                    if (header.classList.contains('scrolled')) {
                        mobileMenu.classList.add('scrolled');
                    } else {
                        mobileMenu.classList.remove('scrolled');
                    }
                });
                
                // Закрытие меню при клике на ссылки
                document.querySelectorAll('.mobile-nav-link, .mobile-application-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        closeMenu();
                    });
                });
                
                // Закрытие меню при клике вне области
                document.addEventListener('click', function(event) {
                    if (!event.target.closest('.burger-button') && 
                        !event.target.closest('.mobile-menu') &&
                        mobileMenu.classList.contains('active')) {
                        closeMenu();
                    }
                });
                
                function closeMenu() {
                    mobileMenu.classList.remove('active');
                    burgerButton.classList.remove('active');
                    header.classList.remove('menu-opened');
                    mobileMenu.classList.remove('scrolled');
                }
            }

            // Функция для обработки прокрутки
            function handleHeaderScroll() {
                const header = document.querySelector('.first-section header');
                const mobileMenu = document.querySelector('.mobile-menu');
                if (!header) return;
                
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) {
                    header.classList.add('scrolled');
                    // Если меню открыто, добавляем класс scrolled к мобильному меню
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.add('scrolled');
                    }
                } else {
                    header.classList.remove('scrolled');
                    mobileMenu.classList.remove('scrolled');
                }
            }

            // Оптимизация производительности с помощью requestAnimationFrame
            let ticking = false;
            function updateHeader() {
                handleHeaderScroll();
                ticking = false;
            }

            function onScroll() {
                if (!ticking) {
                    requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            }

            // Добавляем обработчик прокрутки
            window.addEventListener('scroll', onScroll, { passive: true });
            
            // Инициализируем состояние при загрузке
            handleHeaderScroll();
        });

        function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}




// ========== ВСЕ СКРИПТЫ ДЛЯ НОВЫХ БЛОКОВ ==========

document.addEventListener('DOMContentLoaded', function() {
            // 1. Плавающие элементы для hero
            const floatingContainer = document.getElementById('floatingElements');
            if (floatingContainer) {
                for (let i = 0; i < 15; i++) {
                    const div = document.createElement('div');
                    div.className = 'float-item';
                    const size = Math.random() * 100 + 20;
                    div.style.width = size + 'px';
                    div.style.height = size + 'px';
                    div.style.left = Math.random() * 100 + '%';
                    div.style.top = Math.random() * 100 + '%';
                    div.style.animationDelay = Math.random() * 10 + 's';
                    div.style.animationDuration = Math.random() * 15 + 10 + 's';
                    div.style.opacity = Math.random() * 0.3;
                    floatingContainer.appendChild(div);
                }
            }
            // 2. Счетчики
            const counters = document.querySelectorAll('.stat-enhanced__number');
            const animateCounter = (el) => {
                const target = parseFloat(el.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 30);
            };
            const observerCounters = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); observerCounters.unobserve(entry.target); } });
            }, { threshold: 0.5 });
            counters.forEach(counter => observerCounters.observe(counter));
            
            // 3. Таймлайн
            const timelineItems = document.querySelectorAll('.timeline-item');
            const observerTimeline = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
            }, { threshold: 0.3 });
            timelineItems.forEach(item => observerTimeline.observe(item));
            
            // 4. FAQ
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => item.classList.toggle('active'));
            });
            if (faqItems[0]) faqItems[0].classList.add('active');
            
            // 5. Карусель
            const track = document.getElementById('testimonialsTrack');
            const prevBtn = document.getElementById('prevTestimonial');
            const nextBtn = document.getElementById('nextTestimonial');
            if (track && prevBtn && nextBtn) {
                let currentIndex = 0;
                const cards = document.querySelectorAll('.testimonial-card');
                let cardsPerView = 3;
                const updateCardsPerView = () => {
                    if (window.innerWidth <= 748) cardsPerView = 1;
                    else if (window.innerWidth <= 1024) cardsPerView = 2;
                    else cardsPerView = 3;
                    updateCarousel();
                };
                const updateCarousel = () => {
                    const cardWidth = track.offsetWidth / cardsPerView;
                    cards.forEach(card => { card.style.flex = `0 0 ${cardWidth - 16}px`; });
                    track.style.transform = `translateX(-${currentIndex * (cardWidth + 24)}px)`;
                };
                nextBtn.addEventListener('click', () => { if (currentIndex < cards.length - cardsPerView) { currentIndex++; updateCarousel(); } });
                prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateCarousel(); } });
                window.addEventListener('resize', updateCardsPerView);
                updateCardsPerView();
            }
            
            // 6. Форма + прогресс
            const form = document.getElementById('consultForm');
            const progressFill = document.getElementById('progressFill');
            const nameInput = document.getElementById('name');
            const contactInput = document.getElementById('contact');
            const messageArea = document.getElementById('message');
            const updateProgress = () => {
                let filled = 0;
                if (nameInput.value.trim() !== '') filled++;
                if (contactInput.value.trim() !== '') filled++;
                if (messageArea.value.trim() !== '') filled++;
                const percent = (filled / 3) * 100;
                progressFill.style.width = percent + '%';
            };
            const validateForm = () => {
                let isValid = true;
                if (nameInput.value.trim() === '') {
                    nameInput.classList.add('error');
                    document.getElementById('nameError').style.display = 'block';
                    isValid = false;
                } else {
                    nameInput.classList.remove('error');
                    document.getElementById('nameError').style.display = 'none';
                }
                if (contactInput.value.trim() === '') {
                    contactInput.classList.add('error');
                    document.getElementById('contactError').style.display = 'block';
                    isValid = false;
                } else {
                    contactInput.classList.remove('error');
                    document.getElementById('contactError').style.display = 'none';
                }
                return isValid;
            };
            [nameInput, contactInput, messageArea].forEach(input => { if (input) input.addEventListener('input', updateProgress); });
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (validateForm()) {
                        alert('🎉 Спасибо! Наш специалист свяжется с вами в ближайшее время.');
                        form.reset();
                        updateProgress();
                    }
                });
            }
            
            // 7. 3D наклон для карточек
            const cards3d = document.querySelectorAll('.card-3d');
            cards3d.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-0.5rem) scale(1.02)`;
                });
                card.addEventListener('mouseleave', () => { card.style.transform = ''; });
            });
        });