const matriz = document.getElementById('matriz-entrada');
const character = document.getElementById('type-character');

const entrada = Array(63);

for(let i = 0; i < entrada.length; i++){
    matriz.innerHTML += `
        <input type='text' class='inputs' readonly value=".">
    `
}

matriz.addEventListener('click', (e) => {
    e.target.value = (character.value === '' || '#@O.'.indexOf(character.value) === -1) ? '.' : character.value 
})

const vaciar = () => {
    for(let i of inputs) {
        i.value = '.';
    }
}