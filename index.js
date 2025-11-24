 const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('#carousel-dots .dot');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        const carousel = document.getElementById('carousel');
        let current = 0;
        let intervalMs = 4000;
        let autoPlay;

        function showSlide(idx) {
            slides.forEach((s, i) => {
                const isActive = i === idx;
                s.classList.toggle('opacity-100', isActive);
                s.classList.toggle('opacity-0', !isActive);
                s.classList.toggle('pointer-events-none', !isActive);
                s.setAttribute('aria-hidden', (!isActive).toString());
            });
            dots.forEach((d, i) => {
                d.classList.toggle('bg-pink-500', i === idx);
                d.classList.toggle('bg-pink-300/80', i !== idx);
                d.setAttribute('aria-current', (i === idx).toString());
            });
            current = idx;
        }

        prevBtn.addEventListener('click', () => showSlide((current - 1 + slides.length) % slides.length));
        nextBtn.addEventListener('click', () => showSlide((current + 1) % slides.length));

        dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

        // Auto play with pause on hover/focus
        function startAutoPlay() {
            stopAutoPlay();
            autoPlay = setInterval(() => showSlide((current + 1) % slides.length), intervalMs);
        }
        function stopAutoPlay() { if (autoPlay) clearInterval(autoPlay); }

        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        carousel.addEventListener('focusin', stopAutoPlay);
        carousel.addEventListener('focusout', startAutoPlay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        });

        // Initialize
        showSlide(0);
        startAutoPlay();