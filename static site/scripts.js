
// Alerts users to the menu if they don't select an equation type
function infoChoose() {
    let topic = document.getElementById("topic-name");
    topic.setAttribute("class", "shake");
    let menuIcon = document.getElementById("menu-icon");
    menuIcon.setAttribute("class", "blur-focus");
    let button = document.getElementById("next-button");
    button.disabled = true;
    setTimeout(function() {
        topic.classList.remove("shake");
        menuIcon.classList.remove("blur-focus");
        button.disabled = false;
    }, 2000);
}

// Changes the type of equation shown to the one clicked in the menu
// Updates the gradient
function updateTopic(event) {
    document.getElementById("topic-name").innerHTML = event.target.innerHTML;
    let topic = event.target.innerHTML;
    let dispatch = {
        "choose an equation": 'linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)',
        "one-step": 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
        "two-step": 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
        "multi-step": 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
        "v.o.b.s.": 'linear-gradient(to top, #09203f 0%, #537895 100%)',
    };
    document.body.style.backgroundImage = dispatch[topic];
}

// Depending on the type of equation selected, calls a function
// That function calls updateProblem to change the problem and answer
// Shown on screen
function replaceEquation(event) {
    let topic = document.getElementById("topic-name").innerHTML;
    let dispatch = {
        "choose an equation": infoChoose,
        "one-step": createOneStep,
        "two-step": createTwoStep,
        "multi-step": createMultiStep,
        "v.o.b.s.": createVobs,
    };
    dispatch[topic]();
}

// Updates the inner HTML of the problem and answer shown
function updateProblem(equation, answer) {
    let currentEquation = document.getElementById("current-equation");
    currentEquation.style.opacity = "0";
    currentEquation.innerHTML = equation;
    let updateProblemTimer = setTimeout(function() {
        currentEquation.style.opacity = "1";
    }, 200);
    let currentAnswer = document.getElementById("current-answer");
    currentAnswer.innerHTML = answer;
    MathJax.typeset();
    closeMenu();
}

// Randomly chooses from a list of function that create different
// Types of one-step equations. Calls the chosen function.
function createOneStep() {
    let toggle = randInt(1, 5);
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
    let a = randInt(2,10);
    let b = randInt(2,5);
    let equation = `\\(${a}x = ${a*b}\\)`;
    let answer = `\\(x=${b}\\)`;
    updateProblem(equation, answer);
}

function oneMultiplication() {
    let a = randInt(2,10);
    let b = randInt(-10, 11);
    let equation = `\\(\\frac{x}{${a}} = ${b}\\)`;
    let answer = `\\(x=${a*b}\\)`;
    updateProblem(equation, answer);
}

function oneSubtraction() {
    let a = randInt(-10, 20);
    let b = randInt(-20, 30);
    let equation = `\\(x-${a} = ${b}\\)`;
    let answer = `\\(x=${b+a}\\)`
    updateProblem(equation, answer);
}

function oneAddition() {
    let a = randInt(-10, 20);
    let b = randInt(-20, 30);
    let equation = `\\(x+${a} = ${b}\\)`;
    let answer = `\\(x=${b-a}\\)`
    updateProblem(equation, answer);
}

// Randomly chooses from a list of function that create different
// Types of two-step equations. Calls the chosen function.
function createTwoStep() {
    let toggle = randInt(1, 4);
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
    let a = randInt(2, 10);
    let b = randInt(-10, 15);
    let c = randInt(-10, 15);
    let equation = `\\(${a}x+${b} = ${a*c+b}\\)`;
    let answer = `\\(x=${c}\\)`;
    updateProblem(equation, answer);
}


function twoMultiplication() {
    let a = randInt(2, 10);
    let b = randInt(2,10);
    let c = randInt(-10, 11);
    let equation = `\\(\\frac{x}{${a}} - ${b} = ${c}\\)`;
    let answer = `\\(x=${a*(c+b)}\\)`;
    updateProblem(equation, answer);
}

function twoDivision() {
    let a = randInt(2, 10);
    let b = randInt(2, 10);
    let c = randInt(-5, 5);
    let equation = `\\(${a}(x + ${b}) = ${a*c}\\)`;
    let answer = `\\(x=${c-b}\\)`;
    updateProblem(equation, answer);
}

// Calls the function that creates a multi-step equation
// In later development can add more sub functions that will
// Increase the variety of multi-step equations shown to users
function createMultiStep() {
    multiDistribute();
}

function multiDistribute() {
    let a = randInt(2, 11);
    let b = randInt(2, 6);
    let c = randInt(2, 6);
    let d = randInt(-10, 10)
    let equation = `\\(${a}(${b}x+${c}) = ${d}\\)`;

    let numerator = d-a*c;
    let denominator = a*b;

    let answer = simplifyFraction(numerator, denominator);
    updateProblem(equation, answer);
}

function createVobs() {
    let a = randInt(2, 11);
    let b = randInt(2, 6);
    let c = randInt(2, 11);
    let d = randInt(2, 6);
    let equation = `\\(${a}x+${b}=${c}x+${d}\\)`;
    
    if (a == c && b == d) {
        var answer = `\\(x=\\mathbb{R}\\)`;
    } else if (a == c) {
        var answer = 'No Solution';
    } else {
        var numerator = d-b;
        var denominator = a-c;
        var answer = simplifyFraction(numerator, denominator);
    }
    updateProblem(equation, answer);
}

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function gcd_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  function simplifyFraction(numerator, denominator) {
    
    let gcd = gcd_two_numbers(numerator, denominator);
    numerator = numerator/gcd;
    denominator = denominator/gcd;

    if (denominator < 0) {
        numerator = numerator *-1;
        denominator = denominator *-1;
    }

    let isNegative = 0;

    if (numerator < 0) {
        numerator = numerator *-1;
        isNegative = 1;
    }

    if (numerator == 0) {
        return '\\(x=0\\)';
    } else if (denominator == 1) {
        return `\\(x=${numerator}\\)`;
    } else if (numerator == denominator) {
        return `\\(x=1\\)`;
    } else if (denominator == 0) {
        return 'No Solution';
    } else if (isNegative == 1) {
        return `\\(x=-\\frac{${numerator}}{${denominator}}\\)`;
    } else {
        return `\\(x=\\frac{${numerator}}{${denominator}}\\)`;
    }
  }

  // Opens the menu with animation
  function openMenu() {
      document.getElementById('menu').classList.remove('closed');
      let menuIcon = document.getElementById('menu-icon');
      menuIcon.style.visibility = "hidden";
      menuIcon.classList.add('paused');
      menuIcon.classList.remove("blur-focus");
      document.getElementsByClassName('center-box')[0].style.filter = "opacity(.25)";
      document.getElementsByClassName('speed-outer')[0].style.filter = "opacity(.25)";
      document.getElementsByClassName('speed-toggle')[0].style.filter = "opacity(.25)";
  }

// Closes the menu with animation
  function closeMenu() {
      document.getElementById('menu').classList.add('closed');
      let menuIcon = document.getElementById('menu-icon');
      visibilityTimer = setTimeout( function() {
          menuIcon.style.visibility = "visible";
      }, 300);
      menuIcon.classList.add('blur-focus');
      document.getElementsByClassName('center-box')[0].style.filter = "opacity(1)";
      document.getElementsByClassName('speed-outer')[0].style.filter = "opacity(1)";
      document.getElementsByClassName('speed-toggle')[0].style.filter = "opacity(1)";
  }

function showAnswer() {
    document.getElementById("current-answer").style.opacity = "1";
}

function hideAnswer() {
    document.getElementById("current-answer").style.opacity = "0";
}

function timeAnswer() {
    clearTimeout(window.answerTimer);
    let svg = document.getElementsByClassName("speed-toggle")[0];
    let currentSpeed = svg.id;
    if (currentSpeed == "slow") {
        var speed = 45000; //slowest speed
    } else if (currentSpeed == "medium") {
        var speed = 15000; //medium speed
    } else {
        var speed = 5000; //fastest speed
    };

    window.answerTimer = setTimeout(function() {
        showAnswer();
    }, speed);
}

// Handles updating the ids and animation when a user changes the speed
function changeSpeed() {
    let svg = document.getElementsByClassName("speed-toggle")[0];
    let speed = svg.id;
    let info = document.getElementsByClassName("speed-info")[0];

    if (speed == "slow") {
        // update to medium
        clearTimeout(window.speedTimer);
        svg.setAttribute("id", "medium");
        info.innerHTML = "15 secs/answer";
        info.style.opacity = "1";
        hideSpeedInfo();
    } else if (speed == "medium") {
        // update to fast
        clearTimeout(window.speedTimer);
        svg.setAttribute("id", "fast");
        info.innerHTML = "5 secs/answer";
        info.style.opacity = "1";
        hideSpeedInfo();
    } else {
        // update to slow
        clearTimeout(window.speedTimer);
        svg.setAttribute("id", "slow");
        info.innerHTML = "45 secs/answer";
        info.style.opacity = "1";
        hideSpeedInfo();
    };
}

function hideSpeedInfo() {
    window.speedTimer = setTimeout(function() {
        document.getElementsByClassName("speed-info")[0].style.opacity = "0";
    }, 5000);
}

// Called to show the default speed but hide 5s after page load
hideSpeedInfo();
