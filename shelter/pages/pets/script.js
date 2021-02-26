// const open = document.querySelectorAll('.pet_card');
// const modal = document.getElementById('modal');

// open.forEach(card => card.addEventListener('click', () => {
//     modal.classList.add('show-modal')
// })) 

// document.getElementById('close').addEventListener('click', (e) => {
//     modal.classList.remove('show-modal')
// });

// window.addEventListener('click', (e) => {
//     e.target === modal ? modal.classList.remove('show-modal') : false
// });

document.querySelector('.burger-menu').addEventListener('click', () => {
    document.querySelector('.mobile_menu_container').classList.add('activity');
    document.body.classList.add('hide_menu');
    document.body.classList.add('noscroll');
});

document.querySelector('.second_burger').addEventListener('click', () => {
    document.querySelector('.mobile_menu_container').classList.remove('activity');
    document.body.classList.remove('hide_menu');
    document.body.classList.remove('noscroll');
});

window.addEventListener('click', (e) => {
    if(e.target === document.querySelector('.mobile_menu_container')) {
        document.querySelector('.mobile_menu_container').classList.remove('activity');
        document.body.classList.remove('hide_menu');
        document.body.classList.remove('noscroll');
    }
    return false
});