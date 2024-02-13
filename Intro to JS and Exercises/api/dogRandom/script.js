const button = document.querySelector("button")
const img = document.querySelector("img")

const getNewDog = async() => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(json => {
            img.src=json.message 
            img.height=300 
            img.width=300
        })
    }
    
button.addEventListener("click", getNewDog)