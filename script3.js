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











 // ======================= ОФИГЕННЫЙ ФУНКЦИОНАЛ + ЗАМЕНА КАРТИНОК =======================
    (function() {
        // Утилиты
        const showToast = (message, duration = 3000) => {
            const toast = document.getElementById('toastMsg');
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), duration);
        };

        // Эмуляция загрузки для демонстрации
        const simulateAction = (btn, successMsg) => {
            if(!btn) return;
            const originalText = btn.innerText;
            btn.classList.add('btn-loading');
            btn.innerText = ' Обработка...';
            setTimeout(() => {
                btn.classList.remove('btn-loading');
                btn.innerText = originalText;
                showToast(successMsg);
            }, 700);
        };

        // 1. Динамическое описание этапов (кликабельные этапы)
        const stages = document.querySelectorAll('.stage-item');
        const stageDescContainer = document.getElementById('dynamicStageDesc');
        const stageDetailsMap = {
            '01': ' Аудит включает глубокий анализ рыночных трендов, конкурентной среды, технический SEO-аудит и UX-исследования. Результат: матрица приоритетов.',
            '02': ' Генерация гипотез на основе данных + CustDev. Формируем список экспериментов с прогнозом влияния на ROI.',
            '03': ' Детальная дорожная карта на квартал с бэклогом задач, спринтами и владельцами процессов.',
            '04': ' Запуск рекламных кампаний, интеграция CRM, настройка коллтрекинга и сквозной аналитики за 14 дней.',
            '05': ' Еженедельные спринты оптимизации: A/B тесты, корректировка ставок, улучшение LTV и Retention стратегии.'
        };
        
        stages.forEach(stage => {
            stage.addEventListener('click', (e) => {
                const stageNum = stage.getAttribute('data-stage');
                const desc = stageDetailsMap[stageNum] || ' Подробная информация появится после консультации.';
                const stageTitle = stage.querySelector('h4')?.innerText || 'этап';
                if(stageDescContainer) {
                    stageDescContainer.innerHTML = `<p> <strong>${stageTitle}</strong>: ${desc}</p><p style="margin-top:8px;"> Персональный куратор раскроет детали на стратегической сессии.</p>`;
                }
                showToast(`Подробности этапа «${stageTitle}» загружены`, 2000);
                // Небольшая анимация для выделения
                stage.style.transform = 'scale(1.02)';
                setTimeout(() => { stage.style.transform = ''; }, 300);
            });
        });

        // 2. Кнопки с разными сценариями: все data-action
        const allButtons = document.querySelectorAll('.btn-strategy');
        allButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.getAttribute('data-action');
                if(action === 'calc') {
                    simulateAction(btn, ' Спасибо! Мы подготовим персонализированный расчет стратегии и отправим на почту в течение 2 часов.');
                } 
                else if(action === 'kpiRequest') {
                    simulateAction(btn, ' Детальная презентация с KPI, прогнозом и примерами отправлена вашему менеджеру. Ожидайте звонка.');
                }
                else if(action === 'selectStrategy') {
                    simulateAction(btn, 'Отлично! Переходим к подбору стратегии. Наш специалист свяжется с вами в ближайшее время.');
                }
                else if(action === 'chatExpert') {
                    simulateAction(btn, 'Чат с экспертом открыт! Напишите ваш вопрос в Telegram/WhatsApp, ответим за 5 минут.');
                }
                else {
                    // для кнопки "Рассчитать стратегию" без data-action? в блоке 6 есть, но также явно обработаем
                    if(btn.innerText.includes('Рассчитать') || btn.innerText.includes('Подобрать')) {
                        simulateAction(btn, ' Запрос принят! Стратегия будет подготовлена под ваш бизнес.');
                    } else {
                        simulateAction(btn, ' Менеджер свяжется с вами для уточнения деталей.');
                    }
                }
            });
        });

        // 3. МОДУЛЬ ЗАМЕНЫ КАРТИНОК: ЛЕГКО ИНТЕГРИРОВАТЬ СВОИ URL
        //    Вы можете в любой момент заменить изображения через консоль или добавить интерфейс.
        //    Для удобства я создаю глобальный объект ImageUpdater, чтобы вы могли менять картинки прямо из кода или девтулзов.
        
        window.ITMarkup = window.ITMarkup || {};
        window.ITMarkup.updateImage = function(imageId, newSrc, altText = 'image') {
            const img = document.getElementById(imageId);
            if(img) {
                img.src = newSrc;
                if(altText) img.alt = altText;
                showToast(`Изображение ${imageId} обновлено!`, 1500);
            } else {
                console.warn(`Элемент с id "${imageId}" не найден`);
                showToast(` Ошибка: изображение ${imageId} не найдено`, 1500);
            }
        };
        
        // Также даём возможность обновить любую картинку через data-атрибут, но проще по ID
        // Список ID всех ключевых картинок: heroImage, imgProduct, imgMedia, imgAnalytics
        // В случае если вы хотите добавить свои картинки в другие блоки — пользуйтесь универсальной функцией
        
        // ПРИМЕР: Демо-консольное сообщение (не обязательно для пользователя)
        console.log(' Функционал загрузки картинок: window.ITMarkup.updateImage("heroImage", "https://ваш-домен/стратегия.svg")');
        console.log('Доступные ID: heroImage, imgProduct, imgMedia, imgAnalytics');
        
        // 4. Дополнительные "офигенные" фичи: счетчик кликов по карточкам с аналитикой
        const allCards = document.querySelectorAll('.strategy-card');
        allCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                // Не срабатывает если клик по кнопке внутри (защита)
                if(e.target.closest('.btn-strategy')) return;
                const cardTitle = card.querySelector('h4')?.innerText || 'карточка';
                showToast(` Интерес к направлению: ${cardTitle} — эксперт скоро подготовит кейс`, 1800);
                // Можно также отслеживать в dataLayer при интеграции
            });
        });

        // 5. Эффект live-обновления метрик (интерактив для таблицы)
        const metricsRows = document.querySelectorAll('#metricsTable tbody tr');
        metricsRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = '#eef2ff';
                row.style.transition = '0.1s';
            });
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
        
        // 6. Анимированное появление при скролле (soft)
        const blocks = document.querySelectorAll('.strategy-block');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    // чтобы при повторном показе тоже было красиво, но сбрасывать не будем для производительности
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
        blocks.forEach(block => {
            block.style.opacity = '0';
            block.style.transform = 'translateY(18px)';
            block.style.transition = 'opacity 0.5s ease, transform 0.4s ease';
            observer.observe(block);
        });
        
        // 7. умная подгрузка: если кто-то хочет заменить все картинки за раз – метод для массовой замены
        window.ITMarkup.bulkUpdateImages = function(imagesMap) {
            // imagesMap = { heroImage: 'url1', imgProduct: 'url2', ... }
            for(const [id, url] of Object.entries(imagesMap)) {
                window.ITMarkup.updateImage(id, url);
            }
        };
        
        // 8. добавление эффекта на кнопки в блоке 6 (чтобы не было путаницы)
        const chatBtn = document.querySelector('[data-action="chatExpert"]');
        if(chatBtn) {
            chatBtn.addEventListener('click', () => {
                showToast(' Эксперт онлайн! Ждём вашего сообщения в мессенджере', 2500);
            });
        }
        
        // 9. Бонус: демо-режим загрузки файлов стратегии (симуляция)
        const heroBlockBtn = document.querySelector('[data-action="calc"]');
        if(heroBlockBtn) {
            heroBlockBtn.addEventListener('click', () => {
                // эффект пульсации
                heroBlockBtn.style.transform = 'scale(0.97)';
                setTimeout(() => { heroBlockBtn.style.transform = ''; }, 200);
            });
        }

        // 10. маленький тултип для этапов (намек на кликабельность)
        const stagesHint = document.createElement('div');
        stagesHint.innerText = ' Нажмите на любой этап — получите расширенное описание';
        stagesHint.style.fontSize = '0.8rem';
        stagesHint.style.marginTop = '0.5rem';
        stagesHint.style.color = '#0019FF';
        stagesHint.style.opacity = '0.75';
        const stagesBlock = document.getElementById('blockStages');
        if(stagesBlock && document.querySelector('.stages-list')) {
            document.querySelector('.stages-list').after(stagesHint);
        }
        
        // ГОТОВО: всё сохраняет дизайн, но функционал — живой и удобный.
        showToast(' Стратегия готова! Заменяйте картинки через window.ITMarkup.updateImage', 4000);
    })();











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




