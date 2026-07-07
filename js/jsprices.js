<script>
    // Carga centralizada y segura de componentes HTML
    fetch('incluye/criptoprices.html')
        .then(response => {
            if (!response.ok) throw new Error("Fallo en la comunicación con el módulo de precios.");
            return response.text();
        })
        .then(htmlContent => {
            const container = document.getElementById('ticker-container');
            container.innerHTML = htmlContent;
            
            // Fuerza al navegador a recalcular las animaciones del ticker inyectado
            const moveElement = container.querySelector('.ticker-move');
            if(moveElement) {
                moveElement.style.animation = 'none';
                moveElement.offsetHeight; // Truco de reflujo de renderizado
                moveElement.style.animation = '';
            }
        })
        .catch(err => console.error('Consola de Control Orbital:', err));
</script>
