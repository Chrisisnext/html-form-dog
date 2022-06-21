"use strict"

function showValue() {
    temperamentText.textContent = temperamentInput.value
}

function saveButton() {
    dogs.push(createDogFromForm())
    localStorage.setItem("dogs", JSON.stringify(dogs))
    drawDogs(dogs)
}

function clearButton() {
    dogs = []
    localStorage.removeItem("dogs")
    drawDogs(dogs)
}

function createDogFromForm() {
    return {
        "name": document.getElementById("name").value,
        "gender": document.getElementById("gender").value,
        "age": document.getElementById("age").value,
        "color": document.getElementById("color").value,
        "available": document.getElementById("available").value,
        "neutered": document.getElementById("neutered").checked,
        "chipped": document.getElementById("chipped").checked,
        "breed": document.getElementById("breed").value,
        "temperament": document.getElementById("temperament").value,
        // "image": document.getElementById("image").files[0]
    }
}

function drawDogs(dogs) {
    //Emptys the dogsContainer div and fills it up using the dogs array
    let dogsContainer = document.getElementById("dogsContainer")
    dogsContainer.innerHTML=""
    for (let i=0; i<dogs.length; i++) {
        let dog = dogs[i]
        let dogDiv = document.createElement("div")
        dogDiv.className="dogDiv"
        dogDiv.style.borderColor=dog.color
        
        for (let attribute in dog) {
            let dogAttribute = document.createElement("p")
            dogAttribute.innerText += `${attribute}: ${dog[attribute]}`
            dogDiv.appendChild(dogAttribute)
        }

        let updateButton = document.createElement("button")
        updateButton.innerText = "Update"
        updateButton.onclick = () => {
            dogs[i] = createDogFromForm()
            localStorage.setItem("dogs", JSON.stringify(dogs))
            drawDogs(dogs)
        }

        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        deleteButton.onclick = () => {
            dogs.splice(i, 1)
            localStorage.setItem("dogs", JSON.stringify(dogs))
            drawDogs(dogs)
        }

        dogDiv.appendChild(updateButton)
        dogDiv.appendChild(deleteButton)
        // let img = document.createElement("img")
        // img.src = URL.createObjectURL(dog.image)
        // digDiv.appendChild(img)
        dogsContainer.appendChild(dogDiv)
    }
}

function loadDogs() {
    let dogsString = localStorage.getItem("dogs")
    if (dogsString == null) {
        return []
    } else {
        return JSON.parse(dogsString)
    }
}

let temperamentInput = document.getElementById("temperament")
let temperamentText = document.getElementById("temperamentValue")

let dogs = loadDogs()
drawDogs(dogs)

temperamentInput.addEventListener("input", showValue)
