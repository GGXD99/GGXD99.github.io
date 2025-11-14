// max speed (ใช้สำหรับคำนวณวงกลม)
const MAX_SPEED = 200;
const MAX_RPM = 8000;

function setSpeed(v) {
    v = Math.min(v, MAX_SPEED);
    document.getElementById("speedValue").textContent = Math.floor(v);

    const circle = document.getElementById("spd");
    const total = 565; // stroke length
    const offset = total - (v / MAX_SPEED) * total;
    circle.style.strokeDashoffset = offset;
}

function setGear(g) {
    document.getElementById("gearValue").textContent = g;
}

function setRPM(r) {
    document.getElementById("rpmValue").textContent = r;
}

// รับ event จาก Pawn
cef.on("speedo:update", (speed, gear, rpm) => {
    setSpeed(speed);
    setGear(gear);
    setRPM(rpm);
});
