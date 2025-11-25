// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.nav__burger');
    const navList = document.querySelector('.nav__list');
    
    if (burger && navList) {
        burger.addEventListener('click', function() {
            navList.classList.toggle('nav__list--open');
            burger.classList.toggle('nav__burger--active');
        });
    }

    // Слайдер
    initSlider();
    
    // Переключение темы
    initThemeToggle();
});

// Инициализация слайдера
function initSlider() {
    const track = document.querySelector('.slider__track');
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelectorAll('.slider__indicator');
    let currentSlide = 0;

    if (!track || slides.length === 0) return;

    function showSlide(index) {
        // Скрыть все слайды
        slides.forEach(slide => {
            slide.classList.remove('slider__slide--active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('slider__indicator--active');
        });

        // Показать текущий слайд
        slides[index].classList.add('slider__slide--active');
        indicators[index].classList.add('slider__indicator--active');
        currentSlide = index;
    }

    // Добавляем обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Автопереключение слайдов
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
}

// Переключение темы
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('theme-dark');
            document.body.classList.toggle('theme-light');
            
            // Сохраняем выбор темы
            const isDark = document.body.classList.contains('theme-dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Восстанавливаем тему при загрузке
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
    }
}

// Валидация форм
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('form__input--error');
                } else {
                    input.classList.remove('form__input--error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    });
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const phoneInput = document.getElementById('phone');
    
    // Маска для телефона
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('7') || value.startsWith('8')) {
            value = value.substring(1);
        }
        
        let formattedValue = '+7 (';
        if (value.length > 0) {
            formattedValue += value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length > 8) {
            formattedValue += '-' + value.substring(8, 10);
        }
        
        e.target.value = formattedValue;
    });
    
    // Валидация формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        if (validateForm()) {
            // Здесь отправка формы на сервер
            alert('Регистрация успешно завершена!');
            window.location.href = 'login.html';
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        // Валидация email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError('emailError', 'Введите корректный email');
            isValid = false;
        }
        
        // Валидация пароля
        const password = document.getElementById('password');
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_#!%])[A-Za-z\d_#!%]{3,}$/;
        if (!passwordRegex.test(password.value)) {
            showError('passwordError', 'Пароль должен содержать минимум 3 символа, включая заглавные и строчные буквы, цифры и спецсимволы (_#!%)');
            isValid = false;
        }
        
        // Проверка совпадения паролей
        const confirmPassword = document.getElementById('confirmPassword');
        if (password.value !== confirmPassword.value) {
            showError('confirmPasswordError', 'Пароли не совпадают');
            isValid = false;
        }
        
        // Проверка согласия
        const agree = document.getElementById('agree');
        if (!agree.checked) {
            showError('agreeError', 'Необходимо согласие на обработку персональных данных');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        inputElement.classList.add('form__input--error');
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.form__error');
        errorElements.forEach(element => {
            element.style.display = 'none';
        });
        
        const inputElements = document.querySelectorAll('.form__input');
        inputElements.forEach(element => {
            element.classList.remove('form__input--error');
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const passwordModal = document.getElementById('passwordModal');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const closeModal = document.getElementById('closeModal');
    const themeButtons = document.querySelectorAll('.theme-switcher__btn');
    
    // Управление модальным окном смены пароля
    changePasswordBtn.addEventListener('click', function() {
        passwordModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        passwordModal.style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });
    
    // Переключение темы
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Обновляем активную кнопку
            themeButtons.forEach(btn => btn.classList.remove('theme-switcher__btn--active'));
            this.classList.add('theme-switcher__btn--active');
            
            // Сохраняем выбор темы
            localStorage.setItem('theme', theme);
            
            // Перенаправляем на соответствующую страницу
            if (theme === 'light') {
                window.location.href = 'index_light.html';
            } else {
                window.location.href = 'index.html';
            }
        });
    });
    
    // Валидация формы смены пароля
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        if (newPassword !== confirmNewPassword) {
            alert('Новые пароли не совпадают');
            return;
        }
        
        // Здесь отправка на сервер
        alert('Пароль успешно изменен!');
        passwordModal.style.display = 'none';
        passwordForm.reset();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Переключение вкладок
    const tabs = document.querySelectorAll('.admin-tabs__tab');
    const contents = document.querySelectorAll('.admin-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Обновляем активную вкладку
            tabs.forEach(t => t.classList.remove('admin-tabs__tab--active'));
            this.classList.add('admin-tabs__tab--active');
            
            // Показываем соответствующий контент
            contents.forEach(content => {
                content.classList.remove('admin-content--active');
                if (content.id === tabName + 'Tab') {
                    content.classList.add('admin-content--active');
                }
            });
        });
    });
    
    // Валидация формы добавления игры
    const gameForm = document.getElementById('gameForm');
    
    gameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        
        if (validateGameForm()) {
            // Здесь отправка формы на сервер
            alert('Игра успешно добавлена!');
            gameForm.reset();
            // Обновление списка игр
        }
    });
    
    function validateGameForm() {
        let isValid = true;
        
        // Валидация названия
        const gameName = document.getElementById('gameName');
        if (gameName.value.length > 30) {
            showError('gameNameError', 'Максимум 30 символов');
            isValid = false;
        }
        
        // Валидация цены
        const gamePrice = document.getElementById('gamePrice');
        if (parseFloat(gamePrice.value) < 100) {
            showError('gamePriceError', 'Минимальная цена 100 ₽');
            isValid = false;
        }
        
        // Валидация изображения
        const gameImage = document.getElementById('gameImage');
        if (gameImage.files.length > 0) {
            const file = gameImage.files[0];
            if (file.size > 2 * 1024 * 1024) { // 2MB
                showError('gameImageError', 'Максимальный размер файла 2MB');
                isValid = false;
            }
            if (!file.type.startsWith('image/jpeg')) {
                showError('gameImageError', 'Разрешены только JPG/JPEG файлы');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.form__error');
        errorElements.forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Выход из админ-панели
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            window.location.href = 'index.html';
        }
    });
});
}