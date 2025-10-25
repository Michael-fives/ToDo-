document.addEventListener('DOMContentLoaded', () => {

    // --- 1. OBTENER EL ID DEL TABLERO ---
    const boardId = localStorage.getItem('boardId');

    // Si no hay ID, no se ha iniciado sesión. Redirigir a "unirse".
    if (!boardId) {
        alert('No has seleccionado un tablero. Serás redirigido.');
        window.location.href = '/join'; // Usa la ruta amigable
        return; // Detiene la ejecución del script
    }

    // URL de la API específica para ESTE tablero
    const API_CARDS_URL = `/api/cards/${boardId}`;

    const addCardForm = document.getElementById('addCardForm');
    const modal = document.getElementById('modal');

    const colHecho = document.getElementById('column1');
    const colHaciendo = document.getElementById('column2');
    const colPendiente = document.getElementById('column3');
    const colIdeas = document.getElementById('column4');

    // --- 2. FUNCIÓN PARA OBTENER Y PINTAR TARJETAS ---
    async function fetchAndRenderCards() {
        colHecho.innerHTML = '';
        colHaciendo.innerHTML = '';
        colPendiente.innerHTML = '';
        colIdeas.innerHTML = '';

        try {
            // Llama a la API para obtener tarjetas de este tablero
            const response = await fetch(API_CARDS_URL);
            if (!response.ok) throw new Error('Error al cargar tarjetas');

            const cards = await response.json();

            cards.forEach(card => {
                const cardElement = createCardElement(card);
                switch (card.status) {
                    case 'hecho': colHecho.appendChild(cardElement); break;
                    case 'haciendo': colHaciendo.appendChild(cardElement); break;
                    case 'pendiente': colPendiente.appendChild(cardElement); break;
                    case 'ideas': colIdeas.appendChild(cardElement); break;
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    // --- 3. FUNCIÓN PARA CREAR EL HTML DE UNA TARJETA ---
    function createCardElement(card) {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.id = card._id; // ID único de la tarjeta

        div.innerHTML = `
            <h2>${card.title}</h2>
            <p>${card.description}</p>
        `;

        const buttonContainer = document.createElement('div');

        // Botones de movimiento
        if (card.status === 'ideas') {
            buttonContainer.appendChild(createMoveButton(card._id, 'pendiente', '&#8592;')); // Flecha izq
        } else if (card.status === 'pendiente') {
            buttonContainer.appendChild(createMoveButton(card._id, 'haciendo', '&#8592;')); // Flecha izq
        } else if (card.status === 'haciendo') {
            buttonContainer.appendChild(createMoveButton(card._id, 'hecho', '&#10003;')); // Check
        }

        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => deleteCard(card._id));
        buttonContainer.appendChild(deleteBtn);

        div.appendChild(buttonContainer);
        return div;
    }

    // --- 4. FUNCIÓN PARA CREAR BOTONES DE MOVIMIENTO ---
    function createMoveButton(cardId, newStatus, text) {
        const moveBtn = document.createElement('button');
        moveBtn.innerHTML = text;
        moveBtn.className = (text === '&#10003;') ? 'done' : 'next';
        moveBtn.addEventListener('click', () => moveCard(cardId, newStatus));
        return moveBtn;
    }

    // --- 5. FUNCIÓN PARA CREAR NUEVA TARJETA (POST) ---
    async function addNewCard(e) {
        e.preventDefault();
        const title = document.getElementById('cardTitle').value;
        const description = document.getElementById('cardDescription').value;

        try {
            // Llama a la API para CREAR una tarjeta en este tablero
            const response = await fetch(API_CARDS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }) // El status y boardId se asignan en el backend
            });
            if (!response.ok) throw new Error('Error al crear la tarjeta');

            addCardForm.reset();
            modal.style.display = 'none';
            fetchAndRenderCards(); // Recargar
        } catch (error) {
            console.error(error);
        }
    }

    // --- 6. FUNCIÓN PARA MOVER TARJETA (PUT) ---
    async function moveCard(cardId, newStatus) {
        try {
            // La URL de PUT usa el ID específico de la tarjeta
            const response = await fetch(`/api/cards/${cardId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error('Error al mover la tarjeta');
            fetchAndRenderCards();
        } catch (error)
        {
            console.error(error);
        }
    }

    // --- 7. FUNCIÓN PARA ELIMINAR TARJETA (DELETE) ---
    async function deleteCard(cardId) {
        if (!confirm('¿Seguro que quieres eliminar esta tarjeta?')) return;

        try {
            // La URL de DELETE usa el ID específico de la tarjeta
            const response = await fetch(`/api/cards/${cardId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar la tarjeta');
            fetchAndRenderCards();
        } catch (error) {
            console.error(error);
        }
    }

    // --- INICIALIZACIÓN ---
    addCardForm.addEventListener('submit', addNewCard);
    fetchAndRenderCards(); // Cargar tarjetas del tablero actual al iniciar
});