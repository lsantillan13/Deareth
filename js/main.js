// ========== CONFIGURACIÓN INICIAL ==========
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar efectos de entrada
    initScrollAnimations();
    
    // Crear corazones de fondo
    createBackgroundHearts();
    
    // Inicializar todas las funcionalidades
    initCarousel();
    initPhrases();
    initTimeTogether();
    initNotes();
    initMusicPlayer();
    
    // Lanzar corazones flotantes periódicamente
    setInterval(launchHearts, 2000);
});

// ========== ANIMACIONES AL SCROLL ==========
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos con clase para animación
    document.querySelectorAll('.romantic-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// ========== CORAZONES DE FONDO ==========
function createBackgroundHearts() {
    const container = document.getElementById('background-hearts');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'absolute text-pink-200 opacity-20';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (20 + Math.random() * 30) + 'px';
        heart.style.animation = `floating ${10 + Math.random() * 10}s infinite ease-in-out`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(heart);
    }
}

// ========== CARRUSEL MEJORADO ==========
function initCarousel() {
    const assetImages = [
        "8992778191_110570058234582_1759045749789.png",
        "8992778191_110570058234582_1759048680721.png",
        "8992778191_110570058234582_1760160435329.png",
        "8992778191_110570058234582_1760160719513.png",
        "8992778191_110570058234582_1760160776555.png",
        "8992778191_110570058234582_1760766778886.png",
        "8992778191_110570058234582_1760770383273.png",
        "8992778191_110570058234582_1760770389511.png",
        "8992778191_110570058234582_1761983586542.png",
        "8992778191_110570058234582_1761983683903.png",
        "8992778191_110570058234582_1761983907189.png",
        "8992778191_110570058234582_1761984041738.png",
        "8992778191_110570058234582_1761984073759.png",
        "8992778191_110570058234582_1761984180142.png",
        "8992778191_110570058234582_1761984299512.png",
        "8992778191_110570058234582_1761984320610.png",
        "8992778191_110570058234582_1761984353123.png"
    ];
    
    const carouselViewport = document.getElementById('carousel-viewport');
    const carouselDots = document.getElementById('carousel-dots');
    let current = 0;
    let autoPlayInterval;

    // Generar slides
    carouselViewport.innerHTML = assetImages.map((img, i) => `
        <figure class="slide absolute inset-0 transition-opacity duration-700 ease-out ${i === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}" data-index="${i}" aria-hidden="${i !== 0}">
            <img src="assets/pictures/${img}" alt="Nuestro momento ${i+1}" class="w-full h-full object-cover rounded-xl">
            <figcaption class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 pointer-events-none rounded-xl">
                <div class="text-white mb-6 ml-6">
                    <p class="text-lg romantic-font">Nuestro momento #${i+1}</p>
                </div>
            </figcaption>
        </figure>
    `).join('');

    // Generar dots
    carouselDots.innerHTML = assetImages.map((_, i) => `
        <button class="dot w-3 h-3 rounded-full transition-all ${i === 0 ? 'bg-pink-500 active' : 'bg-pink-300/80'}" aria-label="Ir a la imagen ${i+1}" aria-current="${i === 0}"></button>
    `).join('');

    // Lógica de navegación
    const slides = carouselViewport.querySelectorAll('.slide');
    const dots = carouselDots.querySelectorAll('.dot');
    
    document.getElementById('prev').onclick = () => {
        resetAutoPlay();
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    };
    
    document.getElementById('next').onclick = () => {
        resetAutoPlay();
        current = (current + 1) % slides.length;
        showSlide(current);
    };
    
    dots.forEach((dot, i) => {
        dot.onclick = () => {
            resetAutoPlay();
            current = i;
            showSlide(current);
        };
    });
    
    function showSlide(idx) {
        slides.forEach((s, i) => {
            s.classList.toggle('opacity-100', i === idx);
            s.classList.toggle('opacity-0', i !== idx);
            s.classList.toggle('pointer-events-none', i !== idx);
            s.setAttribute('aria-hidden', (i !== idx).toString());
        });
        
        dots.forEach((d, i) => {
            d.classList.toggle('bg-pink-500', i === idx);
            d.classList.toggle('bg-pink-300/80', i !== idx);
            d.classList.toggle('active', i === idx);
            d.setAttribute('aria-current', (i === idx).toString());
        });
        
        current = idx;
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Iniciar autoplay
    startAutoPlay();
    
    // Pausar autoplay al hacer hover
    carouselViewport.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carouselViewport.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// ========== FRASES ROMÁNTICAS MEJORADAS ==========
function initPhrases() {
    const phrases = [
        {
            es: "Te amo más que a mi propia vida.",
            en: "I love you more than my own life.",
            lunfardo: "Te re amo más que a mi propia vida, che."
        },
        {
            es: "Eres mi razón de sonreír cada día.",
            en: "You are my reason to smile every day.",
            lunfardo: "Sos mi motivo de alegría cada día, bombón."
        },
        {
            es: "Contigo, cada momento es eterno.",
            en: "With you, every moment is eternal.",
            lunfardo: "Con vos, cada momento es para siempre, mi reina."
        },
        {
            es: "No hay distancia que apague este amor.",
            en: "No distance can extinguish this love.",
            lunfardo: "No hay distancia que apague este amor, mi corazón."
        },
        {
            es: "Eres mi sueño hecho realidad.",
            en: "You are my dream come true.",
            lunfardo: "Sos mi sueño hecho realidad, mi vida."
        },
        {
            en: "You are the light in my darkest days.",
            es: "Eres la luz en mis días más oscuros.",
            lunfardo: "Sos la luz en mis días más grises, mi sol."
        },
        {
            en: "My heart beats only for you.",
            es: "Mi corazón late solo por ti.",
            lunfardo: "Mi corazón late solo por vos, mi amor."
        },
        {
            en: "You are my forever and always.",
            es: "Eres mi siempre y para siempre.",
            lunfardo: "Sos mi siempre y para siempre, mi cielo."
        }
    ];
    
    let phraseIdx = 0;
    
    function showPhrase(idx) {
        const p = phrases[idx];
        const isSpanish = !!p.es && (!p.en || p.es.length >= p.en.length);
        document.getElementById('romantic-phrase').textContent = isSpanish ? p.es : p.en;
        document.getElementById('romantic-translation').textContent = isSpanish ? p.en : p.lunfardo;
        
        // Efecto de animación
        anime({
            targets: '#romantic-phrase, #romantic-translation',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
        
        // Lanzar fuegos artificiales
        launchFireworks();
        
        // Efecto de confeti ocasional
        if (Math.random() > 0.7) {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ec4899', '#f472b6', '#fbbf24']
            });
        }
    }
    
    document.getElementById('next-phrase').onclick = function() {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        showPhrase(phraseIdx);
    };
    
    // Cambiar frase automáticamente cada 10 segundos
    setInterval(() => {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        showPhrase(phraseIdx);
    }, 10000);
    
    showPhrase(phraseIdx);
}

// ========== FUEGOS ARTIFICIALES MEJORADOS ==========
function launchFireworks() {
    const fw = document.getElementById('fireworks');
    
    for(let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = 30 + Math.random() * 50;
            const color = ['#ec4899', '#f472b6', '#f87171', '#fbbf24', '#a7f3d0'][Math.floor(Math.random() * 5)];
            
            const el = document.createElement('div');
            el.className = 'firework';
            el.style.left = x + '%';
            el.style.top = y + '%';
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.background = `radial-gradient(circle, ${color} 40%, transparent 70%)`;
            el.style.boxShadow = `0 0 20px ${color}`;
            el.style.opacity = '0';
            
            fw.appendChild(el);
            
            // Animación de entrada y salida
            anime({
                targets: el,
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                duration: 1500,
                easing: 'easeOutQuad',
                complete: () => el.remove()
            });
        }, i * 200);
    }
}

// ========== CONTADOR DE TIEMPO JUNTOS ==========
function initTimeTogether() {
    // Definimos la fecha exacta de su encuentro en la zona horaria local de Argentina (GMT-3)
    // 1 de septiembre de 2015, 12:31:00 hs
    // En JS, los meses van de 0 (Enero) a 11 (Diciembre), por eso Septiembre es 8.
    const startDate = new Date(2025, 8, 1, 12, 31, 0); 
    
    function updateTimeTogether() {
        const now = new Date();
        // La diferencia en milisegundos
        const diff = now - startDate;
        
        // Si la fecha es futura, manejar el caso
        if (diff <= 0) {
            // Se limpian los campos y se muestra un mensaje de inicio
            document.getElementById('days-together').textContent = '0000';
            document.getElementById('hours-together').textContent = '00000';
            document.getElementById('time-together').textContent = 'Nuestro viaje comienza pronto';
            document.getElementById('memories-together').textContent = 'Pronto comenzaremos a crear recuerdos';
            return;
        }
        
        // 1. Cálculo del tiempo en diferentes unidades
        
        // Días totales (Math.floor es esencial)
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Horas totales acumuladas (el total de días convertido a horas)
        // Se calcula la diferencia total en milisegundos y se divide por milisegundos en una hora.
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        
        // Tiempo restante de la última hora/minuto/segundo
        const remainingMinutes = Math.floor((diff / (1000 * 60)) % 60);
        const remainingSeconds = Math.floor((diff / 1000) % 60);
        
        // 2. Actualización del DOM
        
        // Muestra el total de DÍAS (days-together)
        const daysElement = document.getElementById('days-together');
        // daysElement.textContent = totalDays.toString().padStart(4, '0');
        daysElement.textContent = totalDays.toString();
        
        // Muestra el total de HORAS (hours-together)
        const hoursElement = document.getElementById('hours-together');
        hoursElement.textContent = totalHours.toString(); // Dejar sin padding para números grandes
        
        // Muestra el tiempo en formato largo para el usuario
        document.getElementById('time-together').textContent = 
            `Llevamos ${totalDays} días, ${totalHours} horas, ${remainingMinutes} minutos y ${remainingSeconds} segundos juntos.`;
        
        document.getElementById('memories-together').textContent = `Cada momento contigo es especial`;
        
        // 3. Lógica de animación
        
        // La animación solo debería ocurrir cuando cambian los días (o la unidad más grande)
        if (totalDays > parseInt(daysElement.getAttribute('data-prev') || 0)) {
             // Asume que la función anime está definida globalmente
             if (typeof anime !== 'undefined') {
                animateNumberChange(daysElement);
             }
        }
        
        daysElement.setAttribute('data-prev', totalDays);
    }
    
    // Función de animación (se asume que usa la librería anime.js)
    function animateNumberChange(element) {
        if (typeof anime === 'undefined') return;
        anime({
            targets: element,
            scale: [1, 1.2, 1],
            color: ['#be185d', '#ec4899', '#be185d'],
            duration: 600,
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    // Inicia la actualización y la repite cada segundo
    setInterval(updateTimeTogether, 1000);
    updateTimeTogether(); // Llamada inicial para evitar el retraso de 1s
}
// ========== BITÁCORA ROMÁNTICA MEJORADA ==========
function initNotes() {
    function getNotes() {
        return JSON.parse(localStorage.getItem('romanticNotes') || '[]');
    }
    
    function saveNotes(notes) {
        localStorage.setItem('romanticNotes', JSON.stringify(notes));
    }
    
    function renderNotes() {
        const notes = getNotes();
        const container = document.getElementById('notes-container');
        container.innerHTML = '';
        
        if (notes.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="w-16 h-16 text-pink-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <p class="text-pink-500 elegant-font text-xl">Aún no hay cartitas</p>
                    <p class="text-pink-400 mt-2">¡Comienza escribiendo tu primer mensaje de amor!</p>
                </div>
            `;
            return;
        }
        
        notes.forEach((note, i) => {
            const theme = note.theme;
            let themeClass = '';
            
            if (theme === 'amor') themeClass = 'note-amor';
            else if (theme === 'romantico') themeClass = 'note-romantico';
            else themeClass = 'note-sticky';
            
            const el = document.createElement('div');
            el.className = `romantic-card p-4 h-full flex flex-col ${themeClass} fade-in`;
            el.innerHTML = `
                <div class="flex-1 mb-4 elegant-font">${note.text}</div>
                <div class="flex justify-between items-center text-sm text-pink-500">
                    <span class="bg-pink-100 px-2 py-1 rounded-full">${getThemeName(theme)}</span>
                    <div class="flex gap-2">
                        <button class="edit-note text-pink-600 hover:text-pink-800 transition" title="Editar">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="delete-note text-pink-600 hover:text-pink-800 transition" title="Eliminar">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            el.querySelector('.edit-note').onclick = () => {
                document.getElementById('note-input').value = note.text;
                document.getElementById('note-theme').value = note.theme;
                document.getElementById('add-note').textContent = 'Guardar Cambios';
                window.editingNote = i;
                
                // Scroll suave al formulario
                document.getElementById('note-input').scrollIntoView({ behavior: 'smooth' });
                document.getElementById('note-input').focus();
            };
            
            el.querySelector('.delete-note').onclick = () => {
                if (confirm('¿Estás seguro de que quieres eliminar esta cartita?')) {
                    notes.splice(i, 1);
                    saveNotes(notes);
                    renderNotes();
                    
                    // Mostrar notificación
                    showNotification('Cartita eliminada', 'error');
                }
            };
            
            container.appendChild(el);
        });
        
        window.editingNote = null;
        document.getElementById('add-note').textContent = 'Agregar';
    }
    
    function getThemeName(theme) {
        const themes = {
            'amor': 'Amor',
            'romantico': 'Romántico',
            'sticky': 'Nota'
        };
        return themes[theme] || 'Nota';
    }
    
    function showNotification(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 romantic-card p-4 z-50 transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
        }`;
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <svg class="w-5 h-5 ${type === 'success' ? 'text-green-500' : 'text-red-500'}" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-pink-700">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 10);
        
        // Animación de salida después de 3 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    document.getElementById('add-note').onclick = function() {
        const text = document.getElementById('note-input').value.trim();
        const theme = document.getElementById('note-theme').value;
        
        if (!text) {
            showNotification('Por favor, escribe un mensaje', 'error');
            return;
        }
        
        let notes = getNotes();
        
        if (window.editingNote != null) {
            notes[window.editingNote] = { text, theme };
            showNotification('Cartita actualizada');
        } else {
            notes.push({ text, theme });
            showNotification('Cartita agregada');
        }
        
        saveNotes(notes);
        renderNotes();
        document.getElementById('note-input').value = '';
        document.getElementById('note-theme').value = 'amor';
    };
    
    renderNotes();
}

// ========== REPRODUCTOR DE MÚSICA MEJORADO CON PLAYER FIJO ==========
function getMusicFiles() {
    return [
        {
            src: 'assets/music/Elvis Presley - Can\'t Help Falling In Love (Official Audio).mp3',
            title: "Can't Help Falling In Love",
            artist: "Elvis Presley",
            cover: 'assets/cover.jpg',
            duration: '3:02'
        },
        {
            src: 'assets/music/Cold Hart & Lil Peep - Me and You.mp3',
            title: "Me and You",
            artist: "Cold Hart & Lil Peep",
            cover: 'assets/cover.jpg',
            duration: '2:44'
        },
        {
            src: 'assets/music/Mac Miller - Surf (Subtitulado en español).mp3',
            title: "Surf",
            artist: "Mac Miller",
            cover: 'assets/cover.jpg',
            duration: '5:30'
        },
        {
            src: 'assets/music/KHEA - Sigue Lloviendo  LETRA.mp3',
            title: "Sigue Lloviendo",
            artist: "KHEA",
            cover: 'assets/cover.jpg',
            duration: '3:00'
        },
        {
            src: 'assets/music/Benson Boone - Beautiful Things (Official Music Video).mp3',
            title: "Beautiful Things",
            artist: "Benson Boone",
            cover: 'assets/cover.jpg',
            duration: '3:15'
        }
    ];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initMusicPlayer() {
    const audio = document.getElementById('audio-player');
    const fixedPlayer = document.getElementById('fixed-player');
    
    // Elementos del player fijo - NUEVOS SELECTORES
    const fixedPlayPauseBtns = document.querySelectorAll('#fixed-play-pause, #fixed-play-pause-desktop');
    const fixedPrevBtns = document.querySelectorAll('#fixed-prev, #fixed-prev-desktop');
    const fixedNextBtns = document.querySelectorAll('#fixed-next, #fixed-next-desktop');
    const fixedCurrentTimeElements = document.querySelectorAll('#fixed-current-time, #fixed-current-time-desktop');
    const fixedDurationElements = document.querySelectorAll('#fixed-duration, #fixed-duration-desktop');
    const fixedProgressElements = document.querySelectorAll('#fixed-progress, #fixed-progress-desktop');
    const fixedVolume = document.getElementById('fixed-volume');
    const fixedCover = document.getElementById('fixed-cover');
    const fixedCoverDesktop = document.getElementById('fixed-cover-desktop');
    const fixedSongTitle = document.getElementById('fixed-song-title');
    const fixedSongTitleDesktop = document.getElementById('fixed-song-title-desktop');
    const fixedSongArtist = document.getElementById('fixed-song-artist');
    const fixedSongArtistDesktop = document.getElementById('fixed-song-artist-desktop');
    const progressBars = document.querySelectorAll('.progress-bar');
    const mobileVolumeToggle = document.getElementById('mobile-volume-toggle');

    let songs = shuffleArray(getMusicFiles());
    let currentSongIndex = 0;
    let isPlaying = false;
    let volumeOn = true;

    // Función para formatear tiempo
    function formatTime(sec) {
        if (isNaN(sec)) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    // Función para cargar canción
    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        
        // Actualizar información en ambos layouts
        fixedSongTitle.textContent = song.title;
        fixedSongTitleDesktop.textContent = song.title;
        fixedSongArtist.textContent = song.artist;
        fixedSongArtistDesktop.textContent = song.artist;
        
        if (fixedCover) fixedCover.src = song.cover;
        if (fixedCoverDesktop) fixedCoverDesktop.src = song.cover;
        
        currentSongIndex = index;
        
        // Cargar metadatos para mostrar duración
        audio.addEventListener('loadedmetadata', () => {
            const duration = formatTime(audio.duration);
            fixedDurationElements.forEach(el => {
                el.textContent = duration;
            });
        }, { once: true });

        // Resetear progreso
        fixedProgressElements.forEach(el => {
            el.style.width = '0%';
        });
        fixedCurrentTimeElements.forEach(el => {
            el.textContent = '0:00';
        });
    }

    // Función para reproducir
    function playSong() {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                fixedPlayer.classList.remove('paused');
                fixedPlayer.classList.add('playing');
                isPlaying = true;
            }).catch(error => {
                console.log('Play failed:', error);
                // Si falla, mostrar estado pausado
                fixedPlayer.classList.remove('playing');
                fixedPlayer.classList.add('paused');
                isPlaying = false;
            });
        }
    }

    // Función para pausar
    function pauseSong() {
        audio.pause();
        fixedPlayer.classList.remove('playing');
        fixedPlayer.classList.add('paused');
        isPlaying = false;
    }

    // Función para toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Inicializar player
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);

    // Intentar autoplay inmediatamente
    setTimeout(() => {
        playSong();
    }, 500);

    // Event listeners para botones de play/pause
    fixedPlayPauseBtns.forEach(btn => {
        btn.addEventListener('click', togglePlayPause);
    });

    // Event listeners para botones anteriores
    fixedPrevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            if (isPlaying) playSong();
        });
    });

    // Event listeners para botones siguientes
    fixedNextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            if (isPlaying) playSong();
        });
    });

    // Timeline - actualizar tiempo y progreso
    audio.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audio.currentTime);
        fixedCurrentTimeElements.forEach(el => {
            el.textContent = currentTime;
        });
        
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            fixedProgressElements.forEach(el => {
                el.style.width = `${progressPercent}%`;
            });
        }
    });

    // Click en timeline para buscar
    progressBars.forEach(bar => {
        bar.addEventListener('click', (e) => {
            const rect = bar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    });

    // Control de volumen para desktop
    if (fixedVolume) {
        fixedVolume.addEventListener('input', () => {
            audio.volume = fixedVolume.value;
        });
    }

    // Control de volumen para móviles (toggle)
    if (mobileVolumeToggle) {
        mobileVolumeToggle.addEventListener('click', function() {
            volumeOn = !volumeOn;
            if (volumeOn) {
                audio.volume = 1;
                this.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 012.728-2.728"></path>
                </svg>`;
            } else {
                audio.volume = 0;
                this.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15.536a5 5 0 01-.707-.707m10.728 0a5 5 0 01.707.707M7 10.414V14a1 1 0 01-1 1H3a1 1 0 01-1-1V10a1 1 0 011-1h3.414l4.293-4.293a1 1 0 011.414 0L15 8.586a1 1 0 010 1.414L10.707 14.293a1 1 0 01-1.414 0L7 11.414z"></path>
                </svg>`;
            }
        });
    }

    // Cambio de canción automático
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    });

    // Hacer que el player sea responsive
    function updatePlayerLayout() {
        if (window.innerWidth < 768) {
            fixedPlayer.classList.add('mobile-layout');
        } else {
            fixedPlayer.classList.remove('mobile-layout');
        }
    }

    window.addEventListener('resize', updatePlayerLayout);
    updatePlayerLayout();

    // Tooltip para la barra de progreso
    progressBars.forEach(bar => {
        bar.addEventListener('mousemove', function(e) {
            if (!audio.duration) return;
            
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const time = percent * audio.duration;
            
            const tooltip = this.querySelector('.time-tooltip');
            if (tooltip) {
                tooltip.textContent = formatTime(time);
                tooltip.style.left = `${e.clientX - rect.left}px`;
            }
        });
    });
}
// ========== CORAZONES FLOTANTES ==========
function launchHearts() {
    const fh = document.getElementById('floating-hearts');
    const heartCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < heartCount; i++) {
        const el = document.createElement('div');
        el.className = 'floating-heart';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (20 + Math.random() * 30) + 'px';
        el.style.color = ['#ec4899', '#f472b6', '#f87171', '#fbbf24'][Math.floor(Math.random() * 4)];
        el.style.opacity = '0.7';
        el.textContent = Math.random() > 0.5 ? '❤' : '💖';
        el.style.animationDuration = (3 + Math.random() * 4) + 's';
        fh.appendChild(el);
        
        setTimeout(() => el.remove(), 5000);
    }
}

// Crear campo de estrellas
function createStarfield(containerId, starCount = 200) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.7 + 0.3;
    
    star.className = 'absolute rounded-full bg-white star';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.opacity = opacity;
    star.style.animationDelay = `${Math.random() * 4}s`;
    
    // Algunas estrellas más brillantes (raras)
    if (Math.random() > 0.9) {
      star.style.boxShadow = '0 0 8px 1px white';
      star.style.animationDuration = '2s';
    }
    
    container.appendChild(star);
  }
}

// Crear constelaciones adicionales
function createConstellations() {
  const constellations = [
    { name: 'love', points: [[20, 20], [30, 15], [40, 20], [35, 30], [25, 30]] },
    { name: 'eternity', points: [[80, 25], [85, 35], [75, 40], [70, 30]] }
  ];
  
  constellations.forEach(constellation => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'absolute inset-0 w-full h-full text-blue-300 opacity-30');
    svg.innerHTML = `<polyline points="${constellation.points.map(p => p.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="0.5"/>`;
    document.querySelector('.relative').appendChild(svg);
  });
}

// Efecto de parallax para el movimiento de estrellas
function initParallax() {
  document.addEventListener('mousemove', (e) => {
    const stars = document.querySelectorAll('.star');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
      const speed = (index % 3) * 0.5;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      
      star.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  createStarfield('starfield', 250);
  createConstellations();
  initParallax();
  
  // Para las versiones alternativas (descomentar si las usas)
   createStarfield('starfield-alternative', 200);
   createStarfield('starfield-romantic', 180);
});


 // REASONS WHY I LOVE YOU

 // script.js
// Interactive logic for the "50 Reasons Why I Love You" component.
// Written in English + Taglish phrases in the reasons array.

const reasons = [
  "You laugh like sunshine — you light up my days.",
  "Kasi kapag tumatawa ka, tumitigil ang mundo ko. (When you laugh, my world stops.)",
  "You make ordinary moments feel like movie scenes.",
  "Mahal mo ang kahit simpleng bagay — and that's beautiful.",
  "You listen when I talk like I'm the only person in the room.",
  "Your gentleness teaches me patience.",
  "You support my dreams kahit minsan mukhang wild idea lang.",
  "You're my safe place — ikaw yung tahanan ko.",
  "You dance like no one's watching (and I love that confidence).",
  "Nakakainspire ka to be kinder every single day.",
  "You remember small details I forget.",
  "Your hand fits perfectly with mine.",
  "You challenge me to be better — but still love my flaws.",
  "You send the cheesiest messages and I read them a hundred times.",
  "You care for people around you with a big heart.",
  "You make stupid jokes and I still laugh — lalo na kapag corny ka.",
  "Your eyes tell stories I always want to read.",
  "Kapag kasama kita, ang saya ng simpleng araw.",
  "You forgive quickly and teach me the same.",
  "You smell like home.",
  "You try new things just to make me happy.",
  "We make plans and then change them and still have the best time.",
  "You understand my silence and my noise.",
  "You hug like you mean it, every single time.",
  "You have that stubborn kindness.",
  "You call me out when I need it — lovingly.",
  "You get excited like a kid over the little things.",
  "You hold my dreams like they're yours too.",
  "Your voice calms me even on loud days.",
  "You believe in me at times I don't even believe in myself.",
  "You make me feel proud just by being you.",
  "You teach me Tagalog words with patience — salamat, love.",
  "You bring food and more love — perfect combo.",
  "When we fight, we never forget we're a team.",
  "You keep secrets safe, like a vault of trust.",
  "You try to say my name in that accent and it's adorable.",
  "You make me want to write better songs and love better verses.",
  "You celebrate my small wins like they're your own.",
  "Nakikinig ka kahit paulit-ulit kong kwento.",
  "You plan surprises that feel so 'us'.",
  "You have a curious heart that I adore.",
  "You honor my family, which means everything to me.",
  "You teach me to slow down and enjoy the rice and coffee mornings.",
  "You care how my day went — every single day.",
  "You laugh at my worst puns (or at least pretend to).",
  "You make me braver than I thought I'd be.",
  "Your hugs fix storms in my head.",
  "You love me in a way that's true, steady, and kind."
];

let idx = 0;
let typing = false;
let autoplay = false;
let autoplayTimer = null;

const reasonText = document.getElementById('reasonText');
const indexDisplay = document.getElementById('indexDisplay');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const autoplayToggle = document.getElementById('autoplayToggle');
const floatingHearts = document.getElementById('floating-hearts');

function clamp(i) {
  if (i < 0) return 0;
  if (i >= reasons.length) return reasons.length - 1;
  return i;
}

function showReason(i, opts = {}) {
  i = clamp(i);
  idx = i;
  indexDisplay.textContent = `${idx+1}`;
  // typewriter effect
  const text = reasons[idx];
  typeWriter(text, reasonText, opts.onComplete);
  // celebration: hearts + confetti
  burstHearts();
}

function typeWriter(text, el, callback) {
  if (typing) return;
  typing = true;
  el.classList.add('type-caret');
  el.textContent = '';
  let i = 0;
  const speed = 28 + Math.random() * 18; // ms per char
  function step() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(step, speed);
    } else {
      el.classList.remove('type-caret');
      typing = false;
      if (typeof callback === 'function') callback();
    }
  }
  step();
}

prevBtn.addEventListener('click', () => {
  if (typing) return;
  const next = clamp(idx - 1);
  showReason(next);
  stopAutoplayIfRunning();
});

nextBtn.addEventListener('click', () => {
  if (typing) return;
  const next = clamp(idx + 1);
  showReason(next);
  stopAutoplayIfRunning();
});

surpriseBtn.addEventListener('click', () => {
  if (typing) return;
  const randomIndex = Math.floor(Math.random() * reasons.length);
  showReason(randomIndex);
  stopAutoplayIfRunning();
});

autoplayToggle.addEventListener('change', (e) => {
  autoplay = e.target.checked;
  if (autoplay) startAutoplay();
  else stopAutoplay();
});

function startAutoplay() {
  stopAutoplayIfRunning();
  autoplayTimer = setInterval(() => {
    const next = (idx + 1) % reasons.length;
    showReason(next);
    if (next === reasons.length - 1) {
      // stop after reaching last, unless you want loop
      // To loop, comment out the following line.
      // stopAutoplay();
    }
  }, 3500 + Math.random() * 1200);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function stopAutoplayIfRunning() {
  if (autoplay) {
    autoplay = false;
    autoplayToggle.checked = false;
    stopAutoplay();
  }
}

// Visual celebration: hearts and confetti
function burstHearts() {
  // small heart SVG
  const heartSVG = (color='rgba(244,63,94,0.95)') => {
    const s = document.createElement('div');
    s.className = 'heart';
    s.innerHTML = `
      <svg viewBox="0 0 24 24" width="26" height="26" fill="${color}" aria-hidden="true">
        <path d="M12 21s-7.5-4.9-10-8.1C-0.1 8.9 3.3 4 7.8 5.2 9.6 5.7 11 7 12 8.1c1-1.1 2.4-2.4 4.2-2.9 4.5-1.2 7.9 3.7 5.8 7.7-2.5 3.8-10 8-10 8z"></path>
      </svg>
    `;
    return s;
  };

  // create 4 hearts around the center with subtle random positions
  for (let i = 0; i < 6; i++) {
    const h = heartSVG();
    const x = 50 + (Math.random() - 0.5) * 60; // percent
    const y = 35 + (Math.random() - 0.5) * 40;
    h.style.left = x + '%';
    h.style.top = y + '%';
    floatingHearts.appendChild(h);
    // trigger show after insertion
    requestAnimationFrame(() => h.classList.add('show'));
    // remove later
    setTimeout(() => {
      h.classList.remove('show');
      setTimeout(() => h.remove(), 700);
    }, 700 + Math.random() * 500);
  }

  // confetti pieces
  const colors = ['#F43F5E','#FB7185','#FDE68A','#60A5FA','#C084FC'];
  for (let i = 0; i < 12; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = (10 + Math.random() * 80) + '%';
    c.style.top = (5 + Math.random() * 20) + '%';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
    floatingHearts.appendChild(c);
    // remove after animation
    setTimeout(() => c.remove(), 1400 + Math.random()*600);
  }
}

// Init with first reason
showReason(0);

// keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key.toLowerCase() === 's') surpriseBtn.click();
});
