document.addEventListener('DOMContentLoaded', () => {
    const boardForm = document.getElementById('boardForm');
    const rbtnJoin = document.querySelector('input[value="unirse"]');
    const rbtnCreate = document.querySelector('input[value="crear"]');

    boardForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(boardForm);
        const data = Object.fromEntries(formData.entries());

        if (rbtnCreate.checked) {
            // --- Lógica para CREAR tablero ---
            try {
                const response = await fetch('/api/board/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        password: data.password,
                        confirmPassword: data.confirmPassword
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(`Error: ${result.message}`);
                } else {
                    alert(`¡Tablero creado! Tu ID es: ${result.id_tablero}\nGuárdalo bien.`);
                    // Guardamos el ID en el navegador y redirigimos
                    localStorage.setItem('boardId', result.id_tablero);
                    window.location.href = '/board'; // Redirige a la página del tablero
                }

            } catch (err) {
                alert('Error de conexión al crear tablero.');
            }

        } else if (rbtnJoin.checked) {
            // --- Lógica para UNIRSE a tablero ---
            try {
                const response = await fetch('/api/board/join', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_tablero: data.tableroId,
                        password: data.password
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(`Error: ${result.message}`);
                } else {
                    // Guardamos el ID en el navegador y redirigimos
                    localStorage.setItem('boardId', result.id_tablero);
                    window.location.href = '/board'; // Redirige a la página del tablero
                }
            } catch (err) {
                alert('Error de conexión al unirse al tablero.');
            }
        }
    });
});