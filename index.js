const canvas = document.querySelector('#my-canvas');
const form = document.querySelector('form');
let faceColor = document.getElementById("face-color").value;
let borderColor = document.getElementById("border-color").value;
let NumberLineColor = document.getElementById("number-line-color").value;
let largeHandColor = document.getElementById("large-hands-color").value;
let secondHandColor = document.getElementById("second-hands-color").value;

function clock() {
    faceColor = document.getElementById("face-color").value;
    borderColor = document.getElementById("border-color").value;
    NumberLineColor = document.getElementById("number-line-color").value;
    largeHandColor = document.getElementById("large-hands-color").value;
    secondHandColor = document.getElementById("second-hands-color").value;


    const now = new Date();
    const ctx = canvas.getContext('2d');

    // Setup canvas
    ctx.save(); // Save the default state
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.translate(250, 250); // Move origin to the center
    ctx.rotate(-Math.PI / 2); // Rotate clock -90 degrees

    // Set default styles
    ctx.strokeStyle = NumberLineColor;
    ctx.fillStyle = faceColor;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Draw clock face / border
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderColor;
    ctx.arc(0, 0, 142, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // draw hour lines
    ctx.save();
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(110,0)
        ctx.lineTo(130,0)
        ctx.stroke()
    }
    ctx.restore();

    // draw minutes lines
    ctx.save();
    ctx.lineWidth = 4;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctx.beginPath();
            ctx.moveTo(124,0)
            ctx.lineTo(130,0)
            ctx.stroke()
        }
            ctx.rotate(Math.PI / 30);

    }
    ctx.restore();

    // Get the current time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // draw hour hand
    ctx.save();
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.strokeStyle= largeHandColor;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-20, 0 )
    ctx.lineTo(80, 0)
    ctx.stroke();
    ctx.restore()

    // draw minute hand
    ctx.save();
    ctx.rotate((Math.PI / 30)  * min +  (Math.PI / 1800) * sec);
    ctx.strokeStyle= largeHandColor;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-28, 0 )
    ctx.lineTo(120, 0)
    ctx.stroke();
    ctx.restore()

    // draw second hand
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle= secondHandColor;
    ctx.fillStyle = secondHandColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-30, 0 )
    ctx.lineTo(100, 0)
    ctx.stroke();
    ctx.beginPath()
    ctx.arc(0, 0, 10,0,Math.PI * 2, true);
    ctx.fill();
    ctx.restore()

    ctx.restore(); // Restore the default state
    requestAnimationFrame(clock)
}


requestAnimationFrame(clock)


form.addEventListener('change',clock)


document.getElementById('save-btn').addEventListener('click' , () =>{
    const dataUrl = canvas.toDataURL('image/png');
    const link= document.createElement('a')
    link.download = 'clock.png'
    link.href = dataUrl;
    link.click();
})