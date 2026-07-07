<!-- LÓGICA PARA INCLUIR EL ARCHIVO CRIPTOPRICES.HTML -->
    <script>
        fetch('incluye/criptoprices.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar la barra de precios");
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('ticker-container').innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
    </script>
