// /*DOM Manipulation practise*/ 
// const element = document.createElement("div")
// element.innerHTML ="<h1>name</h1>"
// document.body.appendChild(element);
// console.log(element)

// const title = document.querySelector("h1")
// title.textContent="hi"
// title.id="myTitle"
// console.log(title.id)

// let message = "sweetie"
// title.textContent=`hi ${message}`

// //adding a new class from styles.css
// title.classList.add("newClass")

// /* adding a new class completely using js*/
// // Create a CSS class definition as a string
// const cssClass = `.newClass2 {background-color:yellow;}`
// // Create a new style element
// const style = document.createElement("style");
// style.appendChild(document.createTextNode(cssClass));
// // Add the style element to the document's head
// document.head.appendChild(style);
// // add the class to the desired element
// title.classList.add("newClass2")


//actual project
const boxes = document.querySelectorAll(".box")
boxes.forEach((div) => div.textContent = " ")

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
    if (box.textContent == " ") {
        box.textContent = "1"
    } else {
        console.log(box)
        const currentCount = parseInt(box.textContent);
        box.textContent = currentCount + 1;
    }
    })
})

document.querySelector("button"). box.addEventListener("click", ()=>{
    boxes.forEach((div) => div.textContent = " ")
})