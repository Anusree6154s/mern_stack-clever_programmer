const input = document.querySelector("input")
const search = document.querySelector(".search")
const random = document.querySelector(".random")
const h2 = document.querySelector(".h2")
const img = document.querySelector("img")
const paras = document.querySelectorAll(".p")
const div = document.querySelector("div")

const emoji = [`🧠`, `💪`, `⚡`, `🏋️‍♂️`, `📊`, `⚔️`]
const stat = [`INTELLIGENCE`, `STRENGTH`, `SPEED`, `DURABILITY`, `POWER`, `COMBAT`]

const fetchAPI = (params)=>{
    fetch(`https://superheroapi.com/api.php/10223569763528853/${params}`)
        .then(response => response.json())
        .then(json => {
            if (params>=0){
                console.log(json)
                fillInfo(json)
            }else{
                fillInfo(json.results[0])
            }
        })
}

const fillInfo = (info) => {
    div.style = "display: block"
    h2.textContent = info.name
    img.src = info.image.url
    img.height = 300
    img.width = 300

    const dataArray = Object.values(info.powerstats)

    paras.forEach((para, i) => {
        para.textContent = `${emoji[i]} ${stat[i]}: ${dataArray[i]}`
    })
}

const getRandomHero = () => {
    const id = Math.floor(Math.random() * 731)
    fetchAPI(id)
}

const getHero = () => {
    const name = input.value
    fetchAPI(`search/${name}`)
}

random.addEventListener("click", getRandomHero)
search.addEventListener("click", getHero)