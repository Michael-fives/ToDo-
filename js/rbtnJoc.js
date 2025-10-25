// Espera a que el HTML esté listo antes de correr el script
document.addEventListener('DOMContentLoaded', () => {

    const rbtnJoin = document.querySelector('input[value="unirse"]');
    const rbtnCreate = document.querySelector('input[value="crear"]');
    const tableroId = document.getElementById('tableroId');
    const confirmPassword = document.getElementById('confirmPassword');

    function toggleReadOnly() {
        if (rbtnCreate.checked) {
            // Crear tablero: bloquear tableroId, habilitar confirmPassword
            tableroId.readOnly = true;
            confirmPassword.readOnly = false;

            tableroId.placeholder = "No necesario al crear";
            confirmPassword.placeholder = "Confirmar contraseña";

            tableroId.value = ""; // Usar .value para inputs
            confirmPassword.value = ""; // Usar .value para inputs

        } else if (rbtnJoin.checked) {
            // Unirse: bloquear confirmPassword, habilitar tableroId
            confirmPassword.readOnly = true;
            tableroId.readOnly = false;

            confirmPassword.placeholder = "No necesario al unirse";
            tableroId.placeholder = "Número de tablero";

            tableroId.value = ""; // Usar .value para inputs
            confirmPassword.value = ""; // Usar .value para inputs
        }
    }

    // Ejecutar al cargar la página (opcional)
    toggleReadOnly();

    // Ejecutar cada vez que cambie la selección
    rbtnCreate.addEventListener('change', toggleReadOnly);
    rbtnJoin.addEventListener('change', toggleReadOnly);

}); // <== Cierra el listener del DOMContentLoaded