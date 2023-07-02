const matriz = document.getElementById('matriz-entrada');

const entrada = Array(63);

for(let i = 0; i < entrada.length; i++){
    matriz.innerHTML += `
        <input type='checkbox' class='inputs'>
    `
}

const vaciar = () => {
    for(let i of inputs) {
        i.checked = false;
    }
}