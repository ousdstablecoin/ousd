// DOCUMENTO DE LÓGICA ESPACIAL - PROTOCOLO OUSD

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Generador de Estrellas Titilantes en el Menú ---
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(button => {
        const starCount = parseInt(button.getAttribute('data-stars')) || 5;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('menu-star');
            
            // Posicionamiento espacial pseudoaleatorio dentro de los límites del botón
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Variación física de diámetros
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Asincronía de centelleo mediante desfases aleatorios en la animación CSS
            const duration = Math.random() * 2 + 1.5;
            const delay = Math.random() * 3;
            star.style.animation = `starTwinkle ${duration}s infinite ease-in-out ${delay}s`;
            
            // Probabilidad de espectro de luz cian neón para emular radiación estelar
            if (Math.random() > 0.6) {
                star.style.backgroundColor = '#00e5ff';
            }

            button.appendChild(star);
        }
    });

    // --- 2. Motor de Simulación de Asteroides (HTML5 Canvas) ---
    const canvas = document.getElementById('asteroidCanvas');
    const ctx = canvas.getContext('2d');

    // Adaptación del viewport dinámico
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clase constructora para partículas de asteroides
    class Asteroid {
        constructor() {
            this.reset();
            // Dispersión inicial homogénea en la pantalla al arrancar el hilo
            this.x = Math.random() * canvas.width;
        }

        reset() {
            this.x = -50; // Punto de generación fuera del cuadrante izquierdo
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 6 + 2;
            this.speedX = Math.random() * 1.5 + 0.5; // Velocidad de avance de órbita
            this.speedY = (Math.random() - 0.5) * 0.5; // Deriva gravitacional
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reciclaje de objetos al traspasar el límite fronterizo del canvas
            if (this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150, 170, 190, ${this.opacity})`;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = "rgba(0, 229, 255, 0.3)"; // Aura de energía azul tenue
            ctx.fill();
            ctx.closePath();
        }
    }

    // Inicialización del buffer del cinturón de asteroides (40 partículas estables)
    const asteroidBelt = [];
    for (let i = 0; i < 40; i++) {
        asteroidBelt.push(new Asteroid());
    }

    // Bucle continuo de renderizado a refresco nativo de GPU
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        asteroidBelt.forEach(asteroid => {
            asteroid.update();
            asteroid.draw();
        });
        
        requestAnimationFrame(animate);
    }
    animate();

    // --- 3. Físicas de Inercia Parallax (Interacción Astronauta - Cursor) ---
    const astronaut = document.querySelector('.astronaut');
    
    document.addEventListener('mousemove', (e) => {
        // Cálculo del desfase vectorial respecto al centro de masa de la ventana
        const xAxis = (window.innerWidth / 2 - e.clientX) / 45;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 45;
        
        // Desplazamiento amortiguado por la propiedad transición de CSS
        astronaut.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });
});
