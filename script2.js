


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













        // Элементы
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    const closeSuccessStateBtn = document.getElementById('closeSuccessStateBtn');
    const formState = document.getElementById('formState');
    const successState = document.getElementById('successState');
    const form = document.getElementById('applicationForm');
    const submitBtn = document.getElementById('submitFormBtn');

    // Поля формы
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');
    const agreeCheckbox = document.getElementById('agreeCheckbox');

    // Ошибки
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');

    // Открытие модального окна
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Сброс к форме, если было успешное состояние
        if (successState.style.display === 'block') {
            successState.style.display = 'none';
            formState.style.display = 'block';
        }
        // Сброс ошибок и полей (опционально, можно оставить)
        resetErrors();
    }

    // Закрытие модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // Сброс формы к исходному состоянию
        resetForm();
    }

    // Сброс ошибок
    function resetErrors() {
        nameError.classList.remove('show');
        phoneError.classList.remove('show');
        emailError.classList.remove('show');
        nameInput.classList.remove('error');
        phoneInput.classList.remove('error');
        emailInput.classList.remove('error');
    }

    // Сброс формы
    function resetForm() {
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        document.getElementById('cityInput').value = '';
        document.getElementById('tariffSelect').value = 'Профессиональный — 19 900 ₽';
        document.getElementById('commentInput').value = '';
        agreeCheckbox.checked = false;
        resetErrors();
    }

    // Валидация телефона (базовая)
    function validatePhone(phone) {
        const phoneRegex = /^[\+][0-9\s\-\(\)]{10,20}$|^[0-9\s\-\(\)]{10,18}$/;
        return phone.replace(/\s/g, '').length >= 10;
    }

    // Валидация email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Валидация формы
    function validateForm() {
        let isValid = true;

        // Имя
        if (!nameInput.value.trim()) {
            nameError.classList.add('show');
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameError.classList.remove('show');
            nameInput.classList.remove('error');
        }

        // Телефон
        if (!validatePhone(phoneInput.value)) {
            phoneError.classList.add('show');
            phoneInput.classList.add('error');
            isValid = false;
        } else {
            phoneError.classList.remove('show');
            phoneInput.classList.remove('error');
        }

        // Email
        if (!validateEmail(emailInput.value)) {
            emailError.classList.add('show');
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailError.classList.remove('show');
            emailInput.classList.remove('error');
        }

        // Чекбокс согласия
        if (!agreeCheckbox.checked) {
            alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
            isValid = false;
        }

        return isValid;
    }

    // Отправка формы
    function submitForm(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Имитация отправки на сервер
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';

        // Собираем данные
        const formData = {
            name: nameInput.value.trim(),
            city: document.getElementById('cityInput').value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            tariff: document.getElementById('tariffSelect').value,
            comment: document.getElementById('commentInput').value,
            date: new Date().toISOString()
        };

        console.log('Отправка данных:', formData);

        // Симуляция задержки сервера
        setTimeout(() => {
            // Показываем состояние успеха
            formState.style.display = 'none';
            successState.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
            
            // Опционально: реальная отправка через fetch
            // fetch('/api/application', { method: 'POST', body: JSON.stringify(formData), headers: {'Content-Type': 'application/json'} });
        }, 800);
    }

    // Закрытие из состояния успеха
    function closeSuccessAndModal() {
        closeModal();
    }

    // Обработчики событий
    
    closeModalBtn.addEventListener('click', closeModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccessAndModal);
    if (closeSuccessStateBtn) closeSuccessStateBtn.addEventListener('click', closeSuccessAndModal);
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    form.addEventListener('submit', submitForm);

    // Маска для телефона (простая, для удобства)
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        let formatted = '';
        if (value.length > 0) {
            formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.slice(1, 4);
            if (value.length >= 5) formatted += ') ' + value.slice(4, 7);
            if (value.length >= 8) formatted += '-' + value.slice(7, 9);
            if (value.length >= 10) formatted += '-' + value.slice(9, 11);
            e.target.value = formatted;
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });








    document.addEventListener('DOMContentLoaded', function() {
    // Находим модальное окно
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Если модального окна нет на странице — выходим
    if (!modalOverlay) {
        console.error('Модальное окно не найдено! Добавьте HTML модального окна на страницу.');
        return;
    }
    
    // Находим все кнопки "Записаться на курс" в хедере и мобильном меню
    const openModalButtons = document.querySelectorAll('.desktop-btn, .mobile-application-btn');
    
    // Находим элементы закрытия внутри модального окна
    const closeModalBtn = modalOverlay.querySelector('.modal-close');
    const closeSuccessBtn = modalOverlay.querySelector('#closeSuccessBtn');
    const closeSuccessStateBtn = modalOverlay.querySelector('#closeSuccessStateBtn');
    
    // Состояния формы и успеха
    const formState = document.getElementById('formState');
    const successState = document.getElementById('successState');
    
    // Функция открытия модального окна
    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Сбрасываем к форме, если было открыто сообщение об успехе
        if (successState && successState.style.display === 'block') {
            successState.style.display = 'none';
            if (formState) formState.style.display = 'block';
        }
    }
    
    // Функция закрытия модального окна
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Вешаем обработчики на все кнопки открытия
    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    // Вешаем обработчики на кнопки закрытия
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', closeModal);
    }
    
    if (closeSuccessStateBtn) {
        closeSuccessStateBtn.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику на фон (оверлей)
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('Модальное окно подключено! Кнопок найдено:', openModalButtons.length);
});









// Универсальное подключение — все кнопки с data-modal-open открывают модалку
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalOverlay');
    if (!modal) return;
    
    // Все кнопки с атрибутом data-modal-open
    const allOpenButtons = document.querySelectorAll('[data-modal-open]');
    
    // Кнопки закрытия
    const closeButtons = modal.querySelectorAll('.modal-close, #closeSuccessBtn, #closeSuccessStateBtn');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Открытие по атрибуту
    allOpenButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    // Закрытие
    closeButtons.forEach(btn => {
        if (btn) btn.addEventListener('click', closeModal);
    });
    
    // Закрытие по фону
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});




