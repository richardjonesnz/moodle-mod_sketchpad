// Original code: https://www.udemy.com/course/50-projects-50-days/
// Modified for Moodle 4.0
import Selectors from './local/selectors';

let size = 5;
let isPressed = false;
let color = 'black';
let x;
let y;

const sizeLabel = document.getElementById('mod_sketchpad_size');
const canvas = document.getElementById('mod_sketchpad_canvas');
const ctx = canvas.getContext('2d');

const registerEventListeners = () => {
    document.addEventListener('click', e => {
        // Increase size.
        if (e.target.closest(Selectors.actions.increaseButton)) {
            size = (size < 40) ? (size + 5) : 40;
            sizeLabel.innerText = size;
        }
        // Descrease size.
        if (e.target.closest(Selectors.actions.decreaseButton)) {
            size = (size > 5) ? (size - 5) : 5;
            sizeLabel.innerText = size;
        }
        // Clear canvas.
        if (e.target.closest(Selectors.actions.clearButton)) {
            clearCanvas();
        }
    });
    document.addEventListener('change', e => {
        // Change color.
        if (e.target.closest(Selectors.actions.colorButton)) {
            setColor(e.target.value);
        }
    });
    canvas.addEventListener('mousedown', (e) => {
        isPressed = true;
        x = e.offsetX;
        y = e.offsetY;
    });
    canvas.addEventListener('mouseup', () => {
        isPressed = false;
        x = undefined;
        y = undefined;
    });
    canvas.addEventListener('mousemove', (e) => {
        if(isPressed) {
            const x2 = e.offsetX;
            const y2 = e.offsetY;

            drawCircle(x2, y2);
            drawLine(x, y, x2, y2);

            x = x2;
            y = y2;
        }
    });
    canvas.addEventListener('mousedown', (e) => {
        isPressed = true;
        x = e.offsetX;
        y = e.offsetY;
    });
};

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI *2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(thecolor) {
    color = thecolor;
}

export const init = () => {
    registerEventListeners();
};