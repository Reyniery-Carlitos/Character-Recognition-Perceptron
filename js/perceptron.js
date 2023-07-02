const letter = document.getElementById('letter');

// Data de entrenamiento
const trainingDataList = data;
const letters = 'ABCDEJK'

// Funcion de activacion
const activationFunc = (y_in, tetta = 0) => {
    // console.log({ y_in })
    if (y_in > tetta) {
        return 1
    } else if (-tetta <= y_in && y_in <= tetta) {
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

// Calcular error
const calcError = (error, total) => (error / total) * 100

const modelOutputs = [
    [1, -1, -1, -1, -1, -1, -1],
    [-1, 1, -1, -1, -1, -1, -1],
    [-1, -1, 1, -1, -1, -1, -1],
    [-1, -1, -1, 1, -1, -1, -1],
    [-1, -1, -1, -1, 1, -1, -1],
    [-1, -1, -1, -1, -1, 1, -1],
    [-1, -1, -1, -1, -1, -1, 1]
]

const modelOutputs2 = {
    '0': 'A',
    '1': 'B',
    '2': 'C',
    '3': 'D',
    '4': 'E',
    '5': 'J',
    '6': 'K',
    '-1': 'Desconocido'
}

// Inicializamos los pesos y biases en 0
const arrWeights = setWeight(7)
let errors = [true]
let epoch = 0

// ***** TRAINING PHASE *****
const entrenar = () => {
    while (errors.includes(true)) {
        // errors.length = 0 // Vaciamos el array de errores
        errors.length = 0

        epoch += 1 // Aumentamos en 1 las epocas

        // console.log(weights)
        for (let data of trainingDataList) {
            x = data.slice(0, 64)
            let expected = data.slice(-7)

            for (let i = 0; i < weights.length; i++) {
                const weight = weights[i]
                const t = expected[i]
                let result = 0

                // console.log("WEIGHT, X ",weight, x)
                for (let j = 0; j < weight.length; j++) {
                    const w = weight[j]
                    const s = x[j]
                    // console.log('W, S ', w, s)

                    result += w * s
                }

                result += weight[63]

                if (activationFunc(result) != t) {
                    for (let pos = 0; pos < 63; pos++) {
                        weight[pos] += t * x[pos]
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
}

const arrEntrada = Array(63)
const output = []
const cont = 0

const evaluar = () => {
    output.length = 0
    arrEntrada.length = []
    const inputs = document.getElementsByClassName('inputs');
    for (let i of inputs) {
        i.checked ? arrEntrada.push(1) : arrEntrada.push(-1)
    }
    
    for(let i = 0; i < arrWeights.length; i++){
        let result = 0
        for(let j = 0; j < arrEntrada.length; j++){
            result +=  arrEntrada[j] * arrWeights[i][j];
        }
        let y = activationFunc(result);
        output.push(y)
    }
    letter.innerHTML = modelOutputs2[output.indexOf(1).toString()]
    // console.log(arrEntrada)
    // console.log(modelOutputs2[output.indexOf(1).toString()])
    // console.log(output.indexOf(1).toString())
    // console.log(output)
}