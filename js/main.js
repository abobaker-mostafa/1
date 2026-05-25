// ======== الانتقال السلس بين الأقسام ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // إغلاق القائمة المتحركة في الأجهزة المحمولة
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// ======== قائمة التنقل المتحركة ========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // تغيير أيقونة القائمة
    if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// ======== تغيير شكل القائمة عند التمرير ========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'rgba(30, 41, 59, 0.95)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.background = 'rgba(30, 41, 59, 0.8)';
    }

    // تحديث النشاط في الروابط
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ======== عرض شريط المهارات عند التمرير ========
const skillBars = document.querySelectorAll('.progress-bar');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const skillItem = bar.closest('.skill-item');
        const skillPosition = skillItem.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (skillPosition < screenPosition) {
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 200);
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills(); // تشغيل عند التحميل الأول

// ======== ظهور الأقسام تدريجياً ========
const revealElements = document.querySelectorAll('.reveal, .animate-fade-in, .animate-scale');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // تشغيل عند التحميل الأول

// ======== تبديل الوضع (النهار/الليل) ========
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    // تغيير أيقونة التبديل
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // حفظ الوضع في التخزين المحلي
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// تطبيق الوح المحفوظ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
});

// ======== معالجة نموذج التواصل ========
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // إظهار رسالة نجاح مؤقتة
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.';
        contactForm.appendChild(successMessage);

        // إعادة تعيين النموذج
        this.reset();

        // إخفاء الرسالة بعد 3 ثوانٍ
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);
    });
}

// ======== تأثيرات على البطاقات والمشاريع ========
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ======== تأثير التمرير على قسم البطل ========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-wrapper');

    if (hero && heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
