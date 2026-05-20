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


const dragCases = document.querySelectorAll('.drag-case');
    const dropZoneBlock = document.getElementById('dropZone');
    const droppedList = document.getElementById('droppedList');
    let romiBonus = 0;

    dragCases.forEach(el => {
        el.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                name: el.querySelector('span').innerText,
                romi: parseInt(el.dataset.romi)
            }));
        });
    });

    dropZoneBlock.addEventListener('dragover', e => e.preventDefault());
    dropZoneBlock.addEventListener('drop', e => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const badge = document.createElement('div');
        badge.className = 'dropped-badge';
        badge.innerHTML = data.name + ' +' + data.romi + '%';
        droppedList.appendChild(badge);
        romiBonus += data.romi;
        document.getElementById('romiValue').innerText = (215 + romiBonus) + '%';
        document.getElementById('reachValue').innerText = (124 + Math.floor(romiBonus / 2));
        document.getElementById('convValue').innerText = (4.8 + (romiBonus / 100)).toFixed(1) + '%';
    });

    // БЛОК 3: ROI Калькулятор
    function calculateROI() {
        let budget = parseFloat(document.getElementById('budgetInput').value);
        let revenue = parseFloat(document.getElementById('revenueInput').value);
        let course = parseFloat(document.getElementById('courseInput').value);
        let roiCurrent = ((revenue - budget) / budget * 100).toFixed(0);
        let roiAfter = ((revenue - budget - course) / budget * 100 + 18).toFixed(0);
        document.getElementById('roiCurrent').innerText = roiCurrent + '%';
        document.getElementById('roiAfter').innerText = roiAfter + '%';
    }
    document.getElementById('budgetInput').addEventListener('input', calculateROI);
    document.getElementById('revenueInput').addEventListener('input', calculateROI);
    document.getElementById('courseInput').addEventListener('input', calculateROI);
    calculateROI();

    // БЛОК 4: Переключение тарифов
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const priceValuesTariffs = document.querySelectorAll('.price-value');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const period = btn.dataset.period;
            priceValuesTariffs.forEach(el => {
                let val = period === 'month' ? el.dataset.month : el.dataset.year;
                el.innerText = parseInt(val).toLocaleString() + ' ₽';
            });
        });
    });

    // БЛОК 5: Roadmap прогресс
    const roadmapSlider = document.getElementById('roadmapSlider');
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const lines = ['line1', 'line2', 'line3', 'line4'];
    roadmapSlider.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        for (let i = 0; i < steps.length; i++) {
            let circle = document.getElementById(steps[i]);
            if (circle) circle.setAttribute('fill', i < val ? 'var(--primary-color)' : '#ccc');
        }
        for (let i = 0; i < lines.length; i++) {
            let line = document.getElementById(lines[i]);
            if (line) line.setAttribute('stroke', i < val ? 'var(--primary-color)' : '#ccc');
        }
    });

    // БЛОК 6: Видео модалка
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalClose = document.querySelector('.modal-close');

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            let videoUrl = card.dataset.video;
            modalIframe.src = videoUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', () => {
        videoModal.classList.remove('active');
        modalIframe.src = '';
        document.body.style.overflow = '';
    });
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalIframe.src = '';
            document.body.style.overflow = '';
        }
    });

    // БЛОК 7: Фильтрация и сортировка таблицы
    let currentTag = 'all';
    const filterChips = document.querySelectorAll('.filter-chip');
    const tableRows = document.querySelectorAll('#tableBody tr');

    function filterTable() {
        tableRows.forEach(row => {
            if (currentTag === 'all' || row.dataset.tag === currentTag) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentTag = chip.dataset.tag;
            filterTable();
        });
    });

    // Сортировка
    let sortColumn = '';
    let sortDirection = 1;
    document.querySelectorAll('.cases-table th').forEach(th => {
        th.addEventListener('click', () => {
            let sortKey = th.dataset.sort;
            if (sortColumn === sortKey) {
                sortDirection *= -1;
            } else {
                sortColumn = sortKey;
                sortDirection = 1;
            }
            let rows = Array.from(tableRows);
            rows.sort((a, b) => {
                let aVal = a.cells[sortKey === 'name' ? 0 : 1].innerText;
                let bVal = b.cells[sortKey === 'name' ? 0 : 1].innerText;
                if (sortKey === 'roi') {
                    return (parseFloat(aVal) - parseFloat(bVal)) * sortDirection;
                }
                return aVal.localeCompare(bVal) * sortDirection;
            });
            rows.forEach(row => document.getElementById('tableBody').appendChild(row));
        });
    });

    // БЛОК 8: Чат ассистент
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');

    function addMessage(text, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        let text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, true);
        chatInput.value = '';
        setTimeout(() => {
            if (text.toLowerCase().includes('лид') || text.toLowerCase().includes('трафик')) {
                addMessage('Рекомендую курс "Продвинутый PPC с разбором 25 кейсов по привлечению трафика".', false);
            } else if (text.toLowerCase().includes('seo')) {
                addMessage('Для SEO рекомендую программу "SEO-мастер 2.0" с практическими кейсами по семантике и ссылочному.', false);
            } else {
                addMessage('Посмотрите тариф "Профессиональный" — в него входит 35+ кейсов и персональный наставник.', false);
            }
        }, 600);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
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









