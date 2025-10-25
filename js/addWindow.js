const showModalBtn = document.getElementById('showModal');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');

showModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});