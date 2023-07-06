const letter = document.getElementById('letter');
const inputs = document.getElementsByClassName('inputs');

// const modelOutputs = [
//     [1, -1, -1, -1, -1, -1, -1],
//     [-1, 1, -1, -1, -1, -1, -1],
//     [-1, -1, 1, -1, -1, -1, -1],
//     [-1, -1, -1, 1, -1, -1, -1],
//     [-1, -1, -1, -1, 1, -1, -1],
//     [-1, -1, -1, -1, -1, 1, -1],
//     [-1, -1, -1, -1, -1, -1, 1]
// ]

// const outputs = {
//     '0': 'A',
//     '1': 'B',
//     '2': 'C',
//     '3': 'D',
//     '4': 'E',
//     '5': 'J',
//     '6': 'K',
//     '-1': 'Desconocido'
// }

const outputs = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'J',
    7: 'K',
    0: 'Desconocida'
}


// Declaracion de variables
const inputArr = Array(63) // Arreglo de entrada, El arreglo de las letras entradas por el usuario
const output = [] // Arreglo de la salida final que determinara el tipo de letra
let epoch = 0 // Las epocas que se tarda el algoritmo en aprender
// const cont = 0

// Data de entrenamiento
const trainingDataList = data; // Data de entrenamiento

// Funcion de activacion
const activationFunc = (y_in, tetta = 1.2) => {
    if (y_in > tetta) {
        return 1
    } else if (tetta >= y_in && y_in >= -tetta) {
        return 0
    } else if (y_in < -tetta) {
        return -1
    }
}

// Establecer pesos y biases en 0 
const setWeight = (num) => {
    weights = []
    for (let i = 0; i < num; i++) {
        // weights[i] = Array(64).fill(Math.random())
        weights[i] = Array(64).fill(0)
    }
    return weights
}

// Inicializamos los pesos y biases en 0
const arrWeights = setWeight(5)
let errors = [true]

// ***** TRAINING PHASE *****
const entrenar = () => {
    while (errors.includes(true)) {
        // errors.length = 0 // Vaciamos el array de errores
        errors.length = 0

        epoch += 1 // Aumentamos en 1 las epocas

        // Recorremos la data de entrenamiento
        for (let data of trainingDataList) {
            // Separamos los primeros 63 elementos de la matriz que conforman cada letra y la ultima posicion pertenece al bias
            x = data.slice(0, 64)
            // Data esperada o t
            let expected = data.slice(-5)

            // Recorremos la matriz de pesos que es de 7 * 63
            for (let i = 0; i < arrWeights.length; i++) {
                const weight = arrWeights[i] // Obtenemos cada peso por individual de la matriz de pesos (Obtendra un nuevo arreglo de 63 elementos)
                const t = expected[i] // Cada item de t que es el valor esperado
                let result = 0 // La sumatoria de los pesos por x que es la entrada, inicialmente sera 0

                // Recorremos cada elemento de el arreglo de pesos (los 63 pesos individuales)
                for (let j = 0; j < weight.length; j++) {
                    const w = weight[j]  // Cada peso se asigna a una variable x
                    const s = x[j] 

                    result += w * s // Va almacenando la sumatoria
                }

                // result += weight[63] // A la sumatoria se le suma el bias
                

                // La funcion de activacion en este caso es la que determina el valor de y_in
                if (activationFunc(result) !== t) {
                    for (let pos = 0; pos < 63; pos++) {
                        weight[pos] += t * x[pos] // Actualizar el peso
                    }

                    weight[63] += t // Actualizar bias

                    errors.push(true)
                } else {
                    errors.push(false)
                }
            }
        }
    }
    console.log({epoch})
    letter.innerHTML = 'Entrenamiento exitoso 🎊'
}

const conv = (arr) => {
    const arrOut = []
    for(let i in arr){
        console.log(arr[i], arr[i] == -1)
        arrOut[i] = (arr[i] == -1 || arr[i] == 0 ? 0 : 1)
    }
    
    const letter = arrOut[2] * 1 + arrOut[1] * 2 + arrOut[0] * 4
    const typography = arrOut[4] * 1 + arrOut[3] * 2 
    return [letter, typography]
}

// Repite el mismo procedimiento de aprendizaje omitiendo los pasos de actualizacion de los pesos y el biass
const evaluar = () => {
    output.length = 0
    inputArr.length = []

    for (let i of inputs) {
        (i.value ==='#' || i.value === '@') ? inputArr.push(1) : inputArr.push(-1);
    }
    
    for (let i = 0; i < arrWeights.length; i++){
        let result = 0
        for(let j = 0; j < inputArr.length; j++){
            result +=  inputArr[j] * arrWeights[i][j];
        }
        
        // console.log({result})
        let y = activationFunc(result);
        output.push(y)
        // console.log(inputArr)
        console.log({arrWeights})
        console.log({inputArr})
        console.log(output)
    }

    const letterType = outputs[conv(output)[0]]
    const typographyType = conv(output)[1]

    letter.innerHTML = (conv(output)[0] !== 0 && typographyType !== 0) ? (`Letra ${letterType} Tipografia ${typographyType}`) : 'Desconocido'
    // letter.innerHTML = outputs[conv(output)[0]] + (conv(output)[1] == 0 ? ' ' : ' Tipografia: ' + conv(output)[1])
}
