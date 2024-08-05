const cells = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const winningScreen = document.getElementById('winningMessage')
const RestartButton = document.getElementById('restartButton')
const Winning_message = document.querySelector('.winning-message-text')
const initScreen = document.querySelector('#initdiv')
const initButton = document.querySelector('#init')

let o_turn = false;

const x_class = 'x'
const o_class = 'o'
const SHOW_WINNER = "show"
const winning_array = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


let x = ['x', 'x'];
let o = ['o', 'o'];





const placeMark = (cell, current) => {
    cell.classList.add(current)
    console.log("placed")
}


function checkWin(current) {
    return winning_array.some(combination => {
        return combination.every(index => {
            // it checks whether the cells are making same class combination or not
            return cells[index].classList.contains(current)
        })
    })
}


let setBoardHoverclass = (current) => {
    board.classList.remove(current)



    let addToHover;
    if (current === x_class) {
        addToHover = o_class
    }
    else {
        addToHover = x_class
    }

    board.classList.add(addToHover)

    console.log("Hover effect applied")

}


function swapturns() {
    o_turn = !o_turn
    console.log("swaped")
}


const checklimits = () => {
    let limit = 0;
    cells.forEach(cell => {
        if (cell.classList.contains(o_class) || cell.classList.contains(x_class)) limit++;
    })
    if (limit == 9) {

        // auto restart
        setTimeout(() => {
            restartGame()
        }, 10000)
       
        winningScreen.classList.add(SHOW_WINNER)
    }
}

const handleclick = (e) => {
    console.log('clicked')
    const cell = e.target
    const currentClass = o_turn ? o_class : x_class
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        console.log(`${currentClass} is winner`)

        if (currentClass === x[0]) Winning_message.innerText = `Winner is: ${x[1]}`
        if (currentClass === o[0]) Winning_message.innerText = `Winner is: ${o[1]}`


        winningScreen.classList.add(SHOW_WINNER)

    }
    else {
        checklimits()
    }

    setBoardHoverclass(currentClass)
    swapturns()

}




function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleclick, { once: true })
    })

    RestartButton.addEventListener('click', restartGame, { once: true })
}




const restartGame = () => {
    cells.forEach(cell => {// clean up the placemarks
        cell.classList.remove(o_class)
        cell.classList.remove(x_class)
    })

    // make the X to have turn first 
    const currentClass = o_turn ? o_class : x_class
    let addToHover;
    if (currentClass === x_class) {
        addToHover = x_class;
    }
    else {
        addToHover = o_class;
    }
    // to make sure that the x hover effect raise the first 
    board.classList.remove(addToHover)

    // here now we have remove all the hover effects 
    // lets apply the desired one 
    board.classList.add(x_class)



    // to make sure that the x click effect raise the first 
    o_turn = null


    winningScreen.classList.remove(SHOW_WINNER)



    // this is the very crucial function which is reqiured to a succesfull restart of the game 
    startGame()
}






initButton.addEventListener("click", () => {


    const user1 = document.querySelector('#user1').value
    const user2 = document.querySelector('#user2').value
    if (user1) x[1] = user1;
    if (user2) o[1] = user2;


    initScreen.style.top = "-100vh"
    startGame()


})



