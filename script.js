const canvas = document.getElementById("heatCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let intensity = 150;

// Draw heatmap
function drawHeat() {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {

            let dx = x - 250;
            let dy = y - 250;

            let dist = Math.sqrt(dx*dx + dy*dy);

            let temp = intensity * Math.exp(-dist / 100);

            ctx.fillStyle = `rgb(${temp}, ${temp/2}, 0)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

// Draw arrows (vector field)
function drawArrows() {
    ctx.strokeStyle = "blue";

    for (let x = 50; x < 500; x += 50) {
        for (let y = 50; y < 500; y += 50) {

            let dx = x - 250;
            let dy = y - 250;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + dx * 0.2, y + dy * 0.2);
            ctx.stroke();
        }
    }
}

// Animation loop
function animate() {
    drawHeat();
    drawArrows();
    requestAnimationFrame(animate);
}

// Slider control
document.getElementById("slider").addEventListener("input", function(e){
    intensity = e.target.value;
});

animate();