//html items
const label = document.querySelector("#Label-input")
const inputNumber = document.querySelector("#inputNumber")
const btn = document.querySelector("#submit")
const feedback = document.querySelector("#feedback")
const section = document.querySelector("#section")
//previous guesses array
let previousGuesses = []

//random number
const random = ()=>{
    return Math.round(Math.random()*100)
}
const randomNumber = random()

//chanses
let Counter = 5

const guessNumber = (event) => {
    event.preventDefault()
    const userNumber = inputNumber.value
    //rules
    if (userNumber == "" ){
        Swal.fire({
            icon : "error",
            title : "لطفا فیلد را خالی نگذارید"
        })
    }
    else if (userNumber > 100 || userNumber < 1){
        Swal.fire({
            icon : "error",
            title : "لطفا اعداد بین 1 تا 100 را انتخاب نمایید"
        })
    }
    else if (previousGuesses.includes(userNumber)){
        Swal.fire({
            icon : "warning",
            title : "این مقدار قبلا انتخاب شده"
        })
    }
    else if (isNaN (Number (userNumber))){
        Swal.fire({
            icon : "error",
            title : "مقدار وارد شده عدد نمیباشد"
        })
    }
    //game
    else {
        //win
        if (randomNumber == userNumber){
            feedback.textContent = "you won :)"
            //feedback part
            if (feedback.className.includes("text-warning")){
                feedback.classList.replace("text-warning","text-success")
            }
            else{
                feedback.classList.replace("text-danger","text-success")
            }
            //disabling game
            inputNumber.setAttribute("disabled","")
            btn.setAttribute("disabled","")
            //styles
            label.remove()
            document.querySelector("h5").outerHTML = `<h1 class="text-center text-success mb-5 mt-3 w-100">Congratulations !</h1>`
            document.querySelector("h6").textContent = "Your guesses"
            document.querySelector("body").classList.add("bg-success")
            document.querySelector("#restart").classList.replace("d-none","d-block")
            document.querySelector("#restart").classList.replace("btn-danger","btn-success")
            //list of previous guesses
            const list = `<li class="list-group-item list-group-item-action list-group-item-secondary">
            ${userNumber}
            <span class="text-success float-end">Currect</span>
            </li>`
            document.querySelector("ul").innerHTML += list
            section.classList.replace("d-none","d-block")
            ///////////////////////////////////////////////////////////////
            inputNumber.value = ""
            //losing one chance
            Counter--
        
        }
        //user guess lower
        else if (randomNumber > userNumber){
            //feedback part
            feedback.textContent = "Low"
            feedback.classList.replace("text-danger","text-warning")
            //list of previous guesses
            const list = `<li class="list-group-item list-group-item-action list-group-item-secondary">
            ${userNumber}
            <span class="text-warning float-end">${feedback.textContent}</span>
            </li>`
            document.querySelector("ul").innerHTML += list
            section.classList.replace("d-none","d-block")

            inputNumber.value = ""
            //losing one chance
            Counter--
        }
        //user guess higher
        else if (randomNumber < userNumber){
            //feedback part
            feedback.textContent = "High"
            feedback.classList.replace("text-warning","text-danger")
            //list of previous guesses
            const list = `<li class="list-group-item list-group-item-action list-group-item-secondary">
            ${userNumber}
            <span class="text-danger float-end">${feedback.textContent}</span>
            </li>`
            document.querySelector("ul").innerHTML += list
            section.classList.replace("d-none","d-block")

            inputNumber.value = ""
            //losing one chance
            Counter--
        }
        //error
        else {
            alert("مقدار وارد شده صحیح نمیباشد")
        }
        //lost
        if (Counter < 1 && !document.querySelector("body").className.includes("bg-success")){
            //feedback part
            feedback.classList.replace("text-warning","text-danger")
            feedback.textContent = `Number : ${randomNumber}`
            //disabling game
            inputNumber.setAttribute("disabled","")
            btn.setAttribute("disabled","")
            /////////////////////////////////////////
            //saying true number
            document.querySelector("h5").outerHTML = `<h1 class="text-center text-danger mb-5 mt-3 w-100">you Lost:(</h1>`
            //styles
            label.remove()
            document.querySelector("body").classList.add("bg-danger")
            document.querySelector("h6").textContent = "your guesses"
            document.querySelector("#restart").classList.replace("d-none","d-block")
        }
        previousGuesses.push(userNumber)
    }
}
//restart button 
const reloadGame = () => {
    window.location.reload()
}
