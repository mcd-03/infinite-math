
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
    multiDistribute();
    document.body.style.backgroundImage = "linear-gradient(to top, #0ba360 0%, #3cba92 100%)";
}

function multiDistribute() {
    var a = randInt(2, 11);
    var b = randInt(2, 6);
    var c = randInt(2, 6);
    var d = randInt(-10, 10)
    var equation = `\\(${a}(${b}x+${c}) = ${d}\\)`;
    document.getElementById("current-equation").innerHTML = equation;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element.setAttribute("title", `x=${(d-(a*c))/(a*b)}`); //can convert to fraction if using mathjax instead of title
    MathJax.typeset();
}

function createVobs() {
    var a = randInt(2, 11);
    var b = randInt(2, 6);
    var c = randInt(2, 11);
    var d = randInt(2, 6)
    var equation = `\\(${a}x+${b}=${c}x+${d}\\)`;
    document.getElementById("current-equation").innerHTML = equation;
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    if (a == c && b == d) {
        element.setAttribute("title", 'x = Infinite Solutions/All Real Numbers');
    } else if (a == c) {
        element.setAttribute("title", 'x = No Solution');
    } else {
        element.setAttribute("title", `x = ${d-b}/${a-c}`); //this does not handle negatives well and will not simplify. Also, does not show 0 as solution.
    };
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
      let colors = ["linear-gradient(to top, #007adf 0%, #00ecbc 100%)", "linear-gradient( 109.6deg,  rgba(62,161,219,1) 11.2%, rgba(93,52,236,1) 100.2% )", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(45deg, #874da2 0%, #c43a30 100%)", "linear-gradient(to top, #0ba360 0%, #3cba92 100%)", "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)", "linear-gradient(to right, #1f4037, #99f2c8)", "linear-gradient( 135deg, #FF9D6C 10%, #BB4E75 100%)"];
      let i = randInt(0, colors.length - 1);
      document.body.style.backgroundImage = colors[i];
  }

  function openMenu() {
      document.getElementById('menu').style.display = "flex";
      document.getElementById('menu-icon').style.display = "none";
  }

  function closeMenu() {
      document.getElementById('menu').style.display = "none";
      document.getElementById('menu-icon').style.display = "block";
  }

  function toggleMenu() {
    if (document.getElementById('menu').style.display == "none") {
        openMenu();
    } else {
        closeMenu();
    }
}