
function updateTopic(event) {
    document.getElementById("topic-name").innerHTML = event.target.innerHTML;
}

// on page load, center text will read "choose an equation"
// create onClick function replaceEquation
// this function will read the innerHTML of topic-name
// use that as a key a dispatch table
// the table will call a function that returns a new equation
// replace equation will add that new equation to the screen
// to implement will need to learn how to force mathJax ro rerender

function moveEquation(event) {
    var element = document.getElementById("current-equation");
    element.style.animation = "from-left 1s reverse";
    setTimeout(function(){ element.style.visibility = "hidden"; }, 500);
    setTimeout(function(){ element.style.animation = "from-left 1s";
                            element.style.animationDelay = ".8s"; 
                            element.style.visibility = "visible"; }, 900);
}

function blinkEquation(event) {
    var element = document.getElementById("current-equation");
    element.style.visibility = "hidden";
    setTimeout(function(){ element.style.visibility = "visible"; }, 1000);
}

// function replaceEquation(event) {

//     let element = document.getElementById("current-equation");
//     while (element.firstChild) {
//         element.removeChild(element.firstChild);
//     }

//     var math = document.createElement("math");
//     math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
//     math.setAttribute("id", "render-equation");
//     var row = document.createElement("mrow");
//     var sup = document.createElement("msup");
//     var num = document.createElement("mn");
//     num.innerHTML = "4";
//     sup.appendChild(num);
//     row.appendChild(sup);
//     math.appendChild(row);
//     var test = document.createElement("H2");
//     test.innerHTML = "This worked!";

//     element.appendChild(math);
//     MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'render-equation']);

// }

function replaceEquation(event) {
    topic = document.getElementById("topic-name").innerHTML
    var dispatch = {
        "choose an equation": infoChoose,
        "one-step": createOneStep,
        "two-step": createTwoStep,
        "multi-step": createMultiStep,
        "v.o.b.s.": createVobs,
    };
    dispatch[topic]();
    
}

function infoChoose() {
    topic = document.getElementById("topic-name");
    topic.setAttribute("class", "shake")
    setTimeout(function() {
        topic.classList.remove("shake");
    }, 500);
}

function createOneStep() {
    document.getElementById("current-equation").innerHTML = "\\(2x=4\\)";
    MathJax.typeset();
    document.body.style.backgroundImage = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
}

function createTwoStep() {
    document.getElementById("current-equation").innerHTML = "\\(2x-4=4\\)";
    MathJax.typeset();
    document.body.style.backgroundImage = "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)";
}

function createMultiStep() {
    document.getElementById("current-equation").innerHTML = "\\(2(2x+3)=4\\)";
    MathJax.typeset();
    document.body.style.backgroundImage = "linear-gradient(to top, #0ba360 0%, #3cba92 100%)";
}

function createVobs() {
    document.getElementById("current-equation").innerHTML = "\\(2x=4x-2\\)";
    MathJax.typeset();
    document.body.style.backgroundImage = "linear-gradient(45deg, #874da2 0%, #c43a30 100%)";
}