let temperamentInput = document.getElementById("temperament")
let temperamentText = document.getElementById("temperamentValue")

temperamentInput.addEventListener("input", showValue)

function showValue() {
    temperamentText.textContent = temperamentInput.value
}