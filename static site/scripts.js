
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

function updateProblem(equation, answer) {
    element = document.getElementById("current-equation");
    element.innerHTML = equation;
    element = document.getElementById("current-answer");
    element.innerHTML = answer;
    MathJax.typeset();
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
    var answer = `\\(x=${b}\\)`;
    updateProblem(equation, answer);
}

function oneMultiplication() {
    var a = randInt(2,10);
    var b = randInt(-10, 11);
    var equation = `\\(\\frac{x}{${a}} = ${b}\\)`;
    var answer = `\\(x=${a*b}\\)`;
    updateProblem(equation, answer);
}

function oneSubtraction() {
    var a = randInt(-10, 20);
    var b = randInt(-20, 30);
    var equation = `\\(x-${a} = ${b}\\)`;
    var answer = `\\(x=${b+a}\\)`
    updateProblem(equation, answer);
}

function oneAddition() {
    var a = randInt(-10, 20);
    var b = randInt(-20, 30);
    var equation = `\\(x+${a} = ${b}\\)`;
    var answer = `\\(x=${b-a}\\)`
    updateProblem(equation, answer);
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
    var answer = `\\(x=${c}\\)`;
    updateProblem(equation, answer);
}


function twoMultiplication() {
    var a = randInt(2, 10);
    var b = randInt(2,10);
    var c = randInt(-10, 11);
    var equation = `\\(\\frac{x}{${a}} - ${b} = ${c}\\)`;
    var answer = `\\(x=${a*(c+b)}\\)`;
    updateProblem(equation, answer);
}

function twoDivision() {
    var a = randInt(2, 10);
    var b = randInt(2, 10);
    var c = randInt(-5, 5);
    var equation = `\\(${a}(x + ${b}) = ${a*c}\\)`;
    var answer = `\\(x=${c-b}\\)`;
    updateProblem(equation, answer);
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
    var answer = `\\(x=\\frac{${(d-(a*c))}}{${(a*b)}}\\)`;
    updateProblem(equation, answer);
}

function createVobs() {
    var a = randInt(2, 11);
    var b = randInt(2, 6);
    var c = randInt(2, 11);
    var d = randInt(2, 6)
    var equation = `\\(${a}x+${b}=${c}x+${d}\\)`;
    if (a == c && b == d) {
        var answer = `\\(x=\\mathbb{R}\\)`;
    } else if (a == c) {
        var answer = 'x = No Solution';
    } else {
        var answer = `\\(x = ${d-b}/${a-c}\\)`; //this does not handle negatives well and will not simplify. Also, does not show 0 as solution.
    };
    updateProblem(equation, answer);
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
      document.getElementsByClassName('center-box')[0].style.filter = "opacity(.25)";
  }

  function closeMenu() {
      document.getElementById('menu').style.display = "none";
      document.getElementById('menu-icon').style.display = "block";
      document.getElementsByClassName('center-box')[0].style.filter = "opacity(1)";
  }

  function toggleMenu() {
    if (document.getElementById('menu').style.display == "none") {
        openMenu();
    } else {
        closeMenu();
    }
}

function showAnswer() {
    document.getElementById("current-answer").style.opacity = "1";
}

function hideAnswer() {
    document.getElementById("current-answer").style.opacity = "0";
}

function timeAnswer() {
    if (1==1) {
        var speed = 2000; //slowest speed update to 30000 when ready to ship.
    } else if (0==1) {
        var speed = 60000; //medium speed
    } else {
        var speed = 30000; //fastest speed
    };

    setTimeout(function() {
        showAnswer();
    }, speed);
}