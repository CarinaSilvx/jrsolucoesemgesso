document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');

    mobileMenuBtn.addEventListener('click', function () {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ativar link ativo na navegação
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // Animação ao rolar
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.about-image, .service-card, .gallery-item, .info-item, .contact-map');
        elements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight / 1.2) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Definir propriedades iniciais para animação
    const animatables = [
        { selector: '.about-image', delay: '0s' },
        { selector: '.service-card', delay: null },
        { selector: '.gallery-item', delay: null },
        { selector: '.info-item', delay: null },
    ];

    animatables.forEach(({ selector, delay }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = `all 0.6s ease ${delay !== null ? delay : i * 0.1 + 's'}`;
        });
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ---- Carrossel de Avaliações ----
    const track = document.getElementById('reviewTrack');
    const dotsContainer = document.getElementById('carouselDots');
    if (track && dotsContainer) {
        const cards = track.querySelectorAll('.review-card');
        let current = 0;
        let autoplay;

        // Criar dots
        cards.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            cards[current].classList.remove('active');
            dotsContainer.querySelectorAll('.dot')[current].classList.remove('active');
            current = (index + cards.length) % cards.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dotsContainer.querySelectorAll('.dot')[current].classList.add('active');
            resetAutoplay();
        }

        function resetAutoplay() {
            clearInterval(autoplay);
            autoplay = setInterval(() => goTo(current + 1), 3000);
        }

        resetAutoplay();
    }
});
