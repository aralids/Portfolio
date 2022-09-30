const canvas = document.getElementById("canvas");
const main = document.getElementById("main");
canvas.height = main.offsetHeight;
canvas.width = main.offsetWidth;
const ctx = canvas.getContext("2d");

// lets create a rectangle for testing purposes
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 75, 75);