let dimension = 6
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
console.log(vh)

const newNumber = (event) => {
    dimension = event.target.value
    repaint()
}

const container = document.querySelector('#container')

const squareClick = (event) => {
    if (event.target.attributes.colour.value === 'white') {
        event.target.setAttribute('class', 'square black')
        event.target.setAttribute('colour', 'black')
    } else {
        event.target.setAttribute('class', 'square white')
        event.target.setAttribute('colour', 'white')
    }
}

const createSquare = (colour, editable) => {
    let square = document.createElement('div')
    square.setAttribute('class', 'square ' + colour)
    let size = Math.min(100, Math.floor((vh-(dimension*10))/dimension))
    // console.log(size)
    square.setAttribute('style', `width: ${size}px; height: ${size}px;`)
    square.setAttribute('colour', colour)
    square.onclick = squareClick
    return square
}

const repaint = () => {
    container.innerHTML = ''
    let verticals = []

    for (i = 0; i < dimension; i++) {
        verticals.push(true)
    }

    for (let i = 0; i < dimension - 1; i++) {
        let rowDiv = document.createElement('div')
        rowDiv.setAttribute('class', 'row')
        let par = true
        for (let j = 0; j < dimension - 1; j++) {
            if (Math.random() < 0.5) {
                rowDiv.appendChild(createSquare('white'))
            } else {
                rowDiv.appendChild(createSquare('black'))
                par = !par
                verticals[j] = !verticals[j]
            }
        }
        if (par) {
            rowDiv.appendChild(createSquare('white'))
        } else {
            rowDiv.appendChild(createSquare('black'))
            verticals[verticals.length - 1] = !verticals[verticals.length - 1]
        }
        container.appendChild(rowDiv)
    }

    let lastRow = document.createElement('div')
    lastRow.setAttribute('class', 'row')
    for (let k = 0; k < verticals.length; k++) {
        if (verticals[k]) {
            lastRow.appendChild(createSquare('white'))
        } else {
            lastRow.appendChild(createSquare('black'))
        }
    }
    container.appendChild(lastRow)
}

const numberInput = document.querySelector('#number')
numberInput.value = dimension
numberInput.addEventListener('change', newNumber)

repaint()