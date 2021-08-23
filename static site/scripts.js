
// on page load, center text will read "choose an equation"
// create onClick function replaceEquation
// this function will read the innerHTML of topic-name
// use that as a key a dispatch table
// the table will call a function that returns a new equation
// replace equation will add that new equation to the screen
// to implement will need to learn how to force mathJax ro rerender

function updateTopic(event) {
    document.getElementById("topic-name").innerHTML = event.target.innerHTML;
}

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

//chooses and calls from a list of functions that create one step equations
function createOneStep() {
    document.body.style.backgroundImage = "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
    var toggle = randInt(1, 5);
    switch (toggle) {
        case 1:
            return oneDivision();
        case 2:
            return oneMultiplication();
        case 3:
            return oneAddition();
        case 4:
            return oneSubtraction();
    }
}

function oneDivision() {
    var a = randInt(2,10);
    var b = randInt(2,5);
    var equation = `\\(${a}x = ${a*b}\\)`;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${b}`);
    MathJax.typeset();
}

function oneMultiplication() {
    var a = randInt(2,10);
    var b = randInt(-10, 11);
    var equation = `\\(\\frac{x}{${a}} = ${b}\\)`;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${a*b}`);
    MathJax.typeset();
}

function oneSubtraction() {
    var a = randInt(-10, 20);
    var b = randInt(-20, 30);
    var equation = `\\(x-${a} = ${b}\\)`;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${b+a}`);
    MathJax.typeset();
}

function oneAddition() {
    var a = randInt(-10, 20);
    var b = randInt(-20, 30);
    var equation = `\\(x+${a} = ${b}\\)`;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${b-a}`);
    MathJax.typeset();
}

//chooses and calls from a list of functions that create two step equations
function createTwoStep() {
    document.body.style.backgroundImage = "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)";
    var toggle = randInt(1, 4);
    switch (toggle) {
        case 1:
            return twoAddition();
        case 2:
            return twoMultiplication();
        case 3:
            return twoDivision();
    }
}

function twoAddition() {
    var a = randInt(2, 10);
    var b = randInt(-10, 15);
    var c = randInt(-10, 15);
    var equation = `\\(${a}x+${b} = ${a*c+b}\\)`;
    document.getElementById("current-equation").innerHTML = equation;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${c}`);
    MathJax.typeset();
}


function twoMultiplication() {
    var a = randInt(2, 10);
    var b = randInt(2,10);
    var c = randInt(-10, 11);
    var equation = `\\(\\frac{x}{${a}} - ${b} = ${c}\\)`;
    document.getElementById("current-equation").innerHTML = equation;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${a*(c+b)}`);
    MathJax.typeset();
}

function twoDivision() {
    var a = randInt(2, 10);
    var b = randInt(2, 10);
    var c = randInt(-5, 5);
    var equation = `\\(${a}(x + ${b}) = ${a*c}\\)`;
    document.getElementById("current-equation").innerHTML = equation;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${c-b}`);
    MathJax.typeset();
}

//chooses and calls from a list of functions that returns multi-step
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

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  //not called
  function updateBackground() {
      let colors = ["linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(45deg, #874da2 0%, #c43a30 100%)", "linear-gradient(to top, #0ba360 0%, #3cba92 100%)", "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)"];
      let i = randInt(0, colors.length - 1);
      document.body.style.backgroundImage = colors[i];
  }
  
  function toggleMenu() {
      if (document.getElementById('menu').style.display == "none") {
          document.getElementById('menu').style.display = "flex";
          document.getElementById('menu-icon').style.display = "none";
      } else {
          document.getElementById('menu').style.display = "none";
          document.getElementById('menu-icon').style.display = "block";
      }
  }