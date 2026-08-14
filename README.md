# gysubway.github.io
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>可变摆长单摆｜角动量守恒 RK4高精度 荡秋千模拟器</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui}
body{background:#121212;color:#eee;padding:16px}
#container{display:flex;gap:20px;max-width:1300px;margin:0 auto}
#canvasBox{
    border:2px solid #444;
    background:#000;
    border-radius:6px;
    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
}
#infoPanel{width:320px;background:#1e1e1e;padding:16px;border-radius:8px}
.data-item{display:flex;justify-content:space-between;padding:6px 0;border-bottom:#333 solid 1px}
.ctrl{margin-top:20px;display:flex;gap:8px;flex-wrap:wrap}
button{padding:8px 12px;border:none;border-radius:4px;cursor:pointer;font-size:14px}
#startBtn{background:#28a745;color:#fff}
#resetBtn{background:#dc3545;color:#fff}
#dampingBtn{background:#4172b8;color:#fff}
kbd{background:#333;padding:2px 6px;border-radius:3px;color:#8cf}
.tip{margin-top:16px;color:#aaa;font-size:14px;line-height:1.6}
.energy{color:#ffd460;font-weight:bold}
.measure{color:#7cf098;font-weight:bold}
</style>
</head>
<body>
<div id="container">
    <canvas id="canvasBox" width="820" height="496"></canvas>
    <div id="infoPanel">
        <h3>📊 实时物理数据</h3>
        <div class="data-item"><span>当前摆长 L</span><span id="dataL">0.00 m</span></div>
        <div class="data-item"><span>摆角 θ</span><span id="dataTheta">0.00 °</span></div>
        <div class="data-item"><span>瞬时速率 v</span><span id="dataV">0.00 m/s</span></div>
        <div class="data-item measure"><span>实测真实周期 T</span><span id="dataT">0.00 s</span></div>
        <div class="data-item measure"><span>实测频率 f=1/T</span><span id="dataF">0.00 Hz</span></div>
        <div class="data-item"><span>当前最大摆幅</span><span id="dataAmp">0.00 °</span></div>
        <div class="data-item energy"><span>机械能 E/m</span><span id="dataE">0.00 J/kg</span></div>

        <div class="ctrl">
            <button id="startBtn">启动 / 暂停</button>
            <button id="resetBtn">重置模拟</button>
            <button id="dampingBtn">关闭空气阻力</button>
        </div>

        <div class="tip">
            ⌨️ 键盘操作：<br>
            <kbd>W</kbd>缩短0.1m &nbsp;&nbsp; <kbd>S</kbd>增加0.1m<br>
            <kbd>E</kbd>缩短0.2m &nbsp;&nbsp; <kbd>D</kbd>增加0.2m<br>
            <kbd>↑</kbd>微小缩短0.01m(长按连续微调)<br>
            <kbd>↓</kbd>微小增加0.01m(长按连续微调)<br>
            🖱️ 画布点击：点击位置释放小球<br>
        </div>
    </div>
</div>

<script>
const canvas = document.getElementById('canvasBox');
const ctx = canvas.getContext('2d');
const g = 9.8;
const dampingWithAir = 0.998;
const dampingNoAir = 1.0;

// 物理状态
let running = false;
let useDamping = true;
let L = 2.0;
let theta = Math.PI/3;
let omega = 0;
// 当前单次摆动最高点摆幅
let currentPeakAmp = Math.abs(theta);
const anchorX = canvas.width / 2;
const anchorY = 80;
const scale = 120;
const verticalCorrection = 1.0;
const dt = 1/60;

// 周期测量
let prevTheta = theta;
let prevOmega = omega;
let lastFullCross = null;
let halfPeriod = 0;

// DOM
const dataL = document.getElementById('dataL');
const dataTheta = document.getElementById('dataTheta');
const dataV = document.getElementById('dataV');
const dataT = document.getElementById('dataT');
const dataF = document.getElementById('dataF');
const dataAmp = document.getElementById('dataAmp');
const dataE = document.getElementById('dataE');
const dampingBtn = document.getElementById('dampingBtn');

// 键盘状态管理
const keyState = {};
const continuousInterval = 80;
let continuousTimer = null;

function changeLength(delta) {
    const Lold = L;
    L = Math.max(0.3, Math.min(5.0, L + delta));
    const Lnew = L;
    omega = omega * (Lold / Lnew) ** 2;
}

window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (keyState[key]) return;
    keyState[key] = true;

    if(key === 'w') changeLength(-0.1);
    if(key === 's') changeLength(0.1);
    if(key === 'e') changeLength(-0.2);
    if(key === 'd') changeLength(0.2);

    if(key === 'arrowup'){
        changeLength(-0.01);
        startContinuous('-0.01');
    }
    if(key === 'arrowdown'){
        changeLength(0.01);
        startContinuous('0.01');
    }
});

window.addEventListener('keyup', e => {
    const key = e.key.toLowerCase();
    keyState[key] = false;
    if(key === 'arrowup' || key === 'arrowdown'){
        stopContinuous();
    }
});

function startContinuous(deltaStr){
    stopContinuous();
    continuousTimer = setInterval(()=>{
        const delta = parseFloat(deltaStr);
        changeLength(delta);
    }, continuousInterval);
}
function stopContinuous(){
    if(continuousTimer){
        clearInterval(continuousTimer);
        continuousTimer = null;
    }
}

document.getElementById('startBtn').onclick = () => running = !running;
document.getElementById('resetBtn').onclick = resetSim;
dampingBtn.onclick = () => {
    useDamping = !useDamping;
    dampingBtn.textContent = useDamping ? "关闭空气阻力" : "开启空气阻力";
};

canvas.onclick = (ev) => {
    const rect = canvas.getBoundingClientRect();
    const mx = ev.clientX - rect.left;
    const my = ev.clientY - rect.top;
    const dx = mx - anchorX;
    const dy = my - anchorY;
    theta = Math.atan2(dx, dy);
    omega = 0;
    currentPeakAmp = Math.abs(theta);
    resetTimer();
};

function resetSim() {
    L = 2.0;
    theta = Math.PI/3;
    omega = 0;
    currentPeakAmp = Math.abs(theta);
    resetTimer();
}
function resetTimer(){
    prevTheta = theta;
    prevOmega = omega;
    lastFullCross = null;
    halfPeriod = 0;
}

function getAlpha(th, len) {
    return -(g / len) * Math.sin(th);
}

function rk4Step(th, om, len, dtVal, damp) {
    const k1th = om;
    const k1om = getAlpha(th, len);
    const k2th = om + dtVal/2 * k1om;
    const k2om = getAlpha(th + dtVal/2*k1th, len);
    const k3th = om + dtVal/2 * k2om;
    const k3om = getAlpha(th + dtVal/2*k2th, len);
    const k4th = om + dtVal * k3om;
    const k4om = getAlpha(th + dtVal*k3th, len);
    let newTh = th + dtVal/6*(k1th + 2*k2th + 2*k3th + k4th);
    let newOm = om + dtVal/6*(k1om + 2*k2om + 2*k3om + k4om);
    newOm *= damp;
    return {theta: newTh, omega: newOm};
}

function physicsStep() {
    if (!running) return;
    const damping = useDamping ? dampingWithAir : dampingNoAir;
    const res = rk4Step(theta, omega, L, dt, damping);
    prevTheta = theta;
    prevOmega = omega;
    theta = res.theta;
    omega = res.omega;

    // 判断到达最高点：角速度由正变负 / 负变正（速度换向）
    if(prevOmega > 0 && omega <= 0 || prevOmega < 0 && omega >= 0){
        currentPeakAmp = Math.abs(theta);
    }

    const crossZero = (prevTheta > 0 && theta <= 0) || (prevTheta < 0 && theta >= 0);
    if(crossZero){
        const now = performance.now() / 1000.0;
        if(lastFullCross !== null){
            halfPeriod = now - lastFullCross;
        }
        lastFullCross = now;
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8cf';
    ctx.beginPath();
    ctx.arc(anchorX, anchorY, 6, 0, Math.PI*2);
    ctx.fill();

    const ballX = anchorX + L * scale * Math.sin(theta);
    const ballY = anchorY + L * scale * verticalCorrection * Math.cos(theta);

    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(anchorX, anchorY);
    ctx.lineTo(ballX, ballY);
    ctx.stroke();

    ctx.fillStyle = '#ff6347';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 14, 0, Math.PI*2);
    ctx.fill();

    const v = L * Math.abs(omega);
    const realPeriod = halfPeriod * 2;
    const fReal = realPeriod > 0 ? 1.0 / realPeriod : 0;

    const degTheta = theta * 180 / Math.PI;
    const degAmp = currentPeakAmp * 180 / Math.PI;
    const EperMass = 0.5*v*v - g * L * Math.cos(theta);

    dataL.textContent = L.toFixed(2) + ' m';
    dataTheta.textContent = degTheta.toFixed(2) + ' °';
    dataV.textContent = v.toFixed(2) + ' m/s';
    dataT.textContent = realPeriod.toFixed(3) + ' s';
    dataF.textContent = fReal.toFixed(3) + ' Hz';
    dataAmp.textContent = degAmp.toFixed(2) + ' °';
    dataE.textContent = EperMass.toFixed(2) + ' J/kg';
}

function loop() {
    physicsStep();
    render();
    requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>
