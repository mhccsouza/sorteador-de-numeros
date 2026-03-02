const form = document.querySelector("form")
const inputQuantity = document.querySelector("#number-quantity")
const inputInitil = document.querySelector("#number-initil")
const inputEnd = document.querySelector("#number-end")
const checkbox = document.querySelector("#check")
const resultContainer = document.querySelector(".result-container")

const wrapperFirst = document.querySelector(".wrapper.first")
const wrapperLast = document.querySelector(".wrapper.last")

const hasCharactersRegex = /\D+/g
const inputCampos = [inputQuantity, inputInitil, inputEnd]
inputCampos.forEach((input) => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(hasCharactersRegex, "")
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    try {
        const quantity = Number(inputQuantity.value)
        const min = Number(inputInitil.value)
        const max = Number (inputEnd.value)

        if(!inputQuantity.value && !inputInitil && !inputEnd) {
            throw new Error("Por favor, preencha todos os campos antes de sortear")
        }

        if(min >= max) {
            throw new Error("O valor de início ('De') deve ser menor que o valor ('Até')")
        }

        const range = max - min + 1

        if(checkbox.checked && quantity > range) {
            throw new Error(`Impossível sortear ${quantity} números sem repetição em um intervalo de ${range} valores.`)
        }

        const results = []
        while(results.length < quantity){
            const number = Math.floor(Math.random() * range) + min

            if(checkbox.checked) {
                if(!results.includes(number)){
                    results.push(number)
                }
            }else {
                results.push(number)
            }
        }
        showResults(results)
    
    } catch (error) {
        alert(error.message)
    }
})

function showResults(results) {
    resultContainer.innerHTML = ""

    wrapperFirst.classList.add("hidden")
    wrapperLast.classList.remove("hidden")

    // Cria cada número com um delay para o efeito de suspense
    results.forEach((number, index) => {
        console.log(index, number)
        const numberElement = document.createElement("div")
        numberElement.classList.add("result-number")
        const numberSpan = document.createElement("span")
        numberSpan.textContent = number
        numberElement.append(numberSpan)
        
        // Aplica o atraso baseado na posição do número (1s entre cada um)
        numberElement.style.animationDelay = `${index * 1}s`;
        resultContainer.appendChild(numberElement)
    })
    const newRaffleCamp = document.createElement("form")
    const newRaffle = document.createElement("button")
    newRaffle.setAttribute("id", "reset")
    newRaffle.setAttribute("type", "button")
    newRaffle.innerHTML = `Sortear novamente <img src="assets/images/360.svg" alt="360"></button>`
    newRaffle.style.animationDelay = `${results.length * 1 + 1}s`
    newRaffleCamp.append(newRaffle)
    wrapperLast.appendChild(newRaffleCamp)

    newRaffle.addEventListener("click", (e) => {
        e.preventDefault()
        wrapperFirst.classList.remove("hidden")
        wrapperLast.classList.add("hidden")
        form.reset()
    })
}


