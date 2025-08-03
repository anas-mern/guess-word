let words = ["accept", "access", "action", "animal", "banana", "bottle", "button", "camera", "carbon", "castle",
    "charge", "circle", "cookie", "cotton", "danger", "demand", "direct", "double", "driver", "energy",
    "family", "farmer", "forest", "friend", "garden", "gentle", "golden", "growth", "hunter", "island",
    "jacket", "jungle", "little", "logger", "market", "matter", "memory", "motion", "nature", "orange",
    "packet", "parker", "person", "pencil", "planet", "police", "poster", "prince", "public", "purple",
    "radius", "return", "rocket", "school", "silver", "simple", "spider", "spring", "square", "stable",
    "string", "strong", "switch", "tablet", "ticket", "timber", "tissue", "travel", "useful", "vessel",
    "victim", "vision", "wallet", "window", "winner", "winter", "wonder", "yellow", "animal", "artist",
    "battle", "beacon", "better", "bitter", "breeze", "bridge", "broken", "burden", "butter", "candle"]

let the_word = words[Math.floor(Math.random() * 100)]
console.log(the_word)

let inputs = document.getElementById("inputs")
let checker = document.querySelector(".checker")
let hinter = document.querySelector(".hinter")
let hints = 2


function generate_input() {
    let input = document.createElement("input")
    input.setAttribute("type","text")
    input.style.width = "25px"
    input.style.fontSize = "20px"
    input.style.borderWidth = "0px"
    input.style.borderBottom = "3px solid black"
    input.style.caretColor = "red"
    input.style.fontWeight = "bold"
    input.style.textAlign = "center"
    input.style.backgroundColor = "#eee"
    input.setAttribute("disabled","true")
    return input
}
function generate_try(num) {
    let el_try = document.createElement("div")
    el_try.style.display = "flex"
    el_try.style.gap = "10px" 
    el_try.style.margin = "10px 0"
    el_try.style.alignItems = "center" 
    let p = document.createElement("p")
    p.textContent = "Try " + num
    p.style.opacity = "0.6"
    p.style.fontSize = "20px"
    p.style.fontWeight = "bold"
    el_try.appendChild(p)
    for (let i = 0; i < 6; i++) {
        el_try.appendChild(generate_input())
    }
    return el_try;
}


function add_tries(num_of_tries) {
    for (let i = num_of_tries; i > 0; i--) {
        let the_try = generate_try(i)
        if(i==1){
            the_try.id = "active"
            the_try.firstChild.style.opacity = "1"
            for (let i = 1; i < the_try.children.length; i++) {
                the_try.children[i].removeAttribute("disabled")
                the_try.children[i].style.backgroundColor = "#fff"
            }
        }
        inputs.prepend(the_try);
    }
}
add_tries(8);

checker.onclick = function () {
    let the_input_try
    let next
    for (let i = 0; i < inputs.children.length; i++) {
        if(inputs.children[i].id=="active"){
            the_input_try = inputs.children[i].children
            next = inputs.children[i+1]
        }
    }
    for (let i = 1; i < the_input_try.length; i++) {
        if(the_input_try[i].value.toLowerCase()==the_word[i-1]){
            the_input_try[i].style.backgroundColor = "#982"
        }else if(the_word.includes(the_input_try[i].value.toLowerCase())){
            the_input_try[i].style.backgroundColor = "#298"
        }else{
            the_input_try[i].style.backgroundColor = "#222"
        }
        the_input_try[i].setAttribute("disabled","true")
        the_input_try[i].style.color = "#fff"
    }
    the_input_try[0].style.opacity = "0.6"
    next.id="active"
    for (let i = 1; i < next.children.length; i++){
        next.children[i].removeAttribute("disabled")
        next.children[i].style.backgroundColor = "#fff"
        next.firstChild.style.opacity = "1"
    }
}

hinter.onclick = function () {
    if(hints>0){
        hints--
        hinter.textContent = hints + " hints"
        let active
        for (let i = 0; i < inputs.children.length; i++) {
            if(inputs.children[i].id=="active"){
                active = inputs.children[i].children
            }
        }
        let ind = Math.floor(Math.random() * 6) + 1
        active[ind].value=the_word[ind-1]
        console.log(ind)
        if(hints==0){
            hinter.style.backgroundColor = "#666"
        }
    }
}