const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let painting = false;
let size = 3;
let color = 'black';


canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

function startPosition(e) {
    painting = true;
    // console.log(e);
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath(); // we need this here so that the line doesent connect to itself once we stop/start
}

function draw(e) {
    if (!painting) return // or (painting === false) if true the line will start whith no click/action 
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(e.offsetX, e.offsetY); // with e.clientX & Y line is off from cursor because of the nav bar ?!
    ctx.stroke();
    ctx.beginPath(); // added just for smoothness
    ctx.moveTo(e.offsetX, e.offsetY); // added just for smoothness
}

decreaseBtn.addEventListener('click', () => {
    size--;
    // console.log(size);
    if (size < 1) {
    size = 1;
    }
    showSize();
});

increaseBtn.addEventListener('click', () => {
    size++;
    if (size > 30) {
        size = 30;
    }
    showSize();
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

clearEl.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function showSize() {
    sizeEl.innerText = size;
}