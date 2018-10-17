/*
THEORY: 
Estimation of PI value by Monte Carlo Method

If we have circle with r radius and square, that is excircle then side of this square will have lenght of 2r.

Formula for circle surfaceis PI * r^2; Formula for square surface is a^2 (in this situation a = 2r so surface is 4r^2).
Ratio for circle surface to square surface is PI*r^2 / 4r^2 which we can write as PI = 4*(circleSurface/squareSurface).

So now - if we put some large number of points on square some of them will be in circle area. So we can count total number of points
and number of points that are in circle and calculate PI by given formula.

Inspiration:
https://www.youtube.com/watch?v=5cNnf_7e92Q
*/


// DOM elements
const canvas = document.querySelector("#piEstimation");
const context = canvas.getContext("2d");
const piValue = document.querySelector("#pi");

canvas.width = 400; // set width and height of canvas
canvas.height = 400;
let radius =  200; // set radius

/*
    Rectangles on canvas are drawn from top left corner so we have to calculate that corner so center of the square will be the same as center of the circle
*/
let centerX = canvas.width / 2 - radius;
let centerY = canvas.height / 2 - radius;
let total = 0; // total number of points and number of points that are in circle 
let inCircle = 0;
let pie = 0; // estimated PI value (temporaly)
let recordPi = 0; // variable for saved PI value (see further comments)

let animationId; // id for frame animation


/*
    Draw circle and excircle square with r = radius (variable above)
*/
context.beginPath();
context.arc(200, 200, radius, 0, 2*Math.PI, false);
context.rect(centerX, centerY, radius*2, radius*2);
context.lineWith = 1;
context.strokeStyle = "#000000";
context.stroke();

/*
    Function for drawing points.
    In single frame we draw 100 points at once

    We randomize x and y values of one point.
    Increace total number of points each time x and y are drawn.

    We calculate in what distance from center is given point using Pythagoras' theorem
    If point is in the circle we set color to red, else to green
    And draw point (line with 1px length)

    Now we calculate diffrence between JS PI value and saved pi value and
    difference between JS PI value and pi value we calculated after added that one point.
    Then we combere both diffrences. 
    If diffrence between JS PI and pi we just calculated is less than difference between JS PI and saved PI thah means
    that PI valuethat was just calculated is closest to real PI.
    We set recorded difference and recorded pi to present values
*/
function drawDot() {

    for(let i = 0; i< 100; i++) {
        let x = Math.random() * radius * 2;
        let y = Math.random() * radius * 2;
        total++;

        context.beginPath();
        let xDist = Math.abs(canvas.width / 2 - x);
        let yDist = Math.abs(canvas.height / 2 - y);
        let distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

        if(distance < radius) {
            context.strokeStyle = "#FF0000";
            inCircle++;
        } else {
            context.strokeStyle = "#00FF00";
        }
        context.moveTo(x, y);
        context.lineTo(x+1, y+1);
        context.stroke();
    }

    pie = 4 * (inCircle / total);
    let recordDiff = Math.abs(Math.PI - recordPi);
    let diff = Math.abs(Math.PI - pie);
    if(diff < recordDiff) {
        recordDiff = diff;
        recordPi = pie;
    }
    piValue.innerHTML = `<p>Estimetade PI value: ${recordPi}</p><p>Points total: ${total}</p>`;
    animationId = requestAnimationFrame(drawDot);
}


function stopAnimation() {
    window.cancelAnimationFrame(animationId);
}
window.onload = () =>  animationId = requestAnimationFrame(drawDot);