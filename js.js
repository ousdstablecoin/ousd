
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Generador de Estrellas Titilantes en el Menú ---
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(button => {
        const starCount = parseInt(button.getAttribute('data-stars')) || 5;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('menu-star');
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            const duration = Math.random() * 2 + 1.5;
            const delay = Math.random() * 3;
            star.style.animation = `starTwinkle ${duration}s infinite ease-in-out ${delay}s`;
            
            if (Math.random() > 0.6) {
                star.style.backgroundColor = '#00e5ff';
            }

            button.appendChild(star);
        }
    });

    // --- 2. Motor de Simulación de Asteroides (HTML5 Canvas) ---
    const canvas = document.getElementById('asteroidCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Asteroid {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
        }

        reset() {
            this.x = -50;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1.5;
            this.speedX = Math.random() * 1.2 + 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(160, 180, 200, ${this.opacity})`;
            ctx.shadowBlur = this.size * 2;
            ctx.shadowColor = "rgba(0, 229, 255, 0.2)";
            ctx.fill();
            ctx.closePath();
        }
    }

    const isMobile = window.innerWidth <= 768;
    const asteroidCount = isMobile ? 15 : 35;
    
    const asteroidBelt = [];
    for (let i = 0; i < asteroidCount; i++) {
        asteroidBelt.push(new Asteroid());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        asteroidBelt.forEach(asteroid => {
            asteroid.update();
            asteroid.draw();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
});
