// script.js - communicates with CEF (samp.cef) and sends events to Pawn
el.onclick = () => selectIndex(i);
listEl.appendChild(el);
});
}


function selectIndex(i){
selectedIndex = i;
document.querySelectorAll('.skin-item').forEach((el, idx) => el.classList.toggle('active', idx === i));
const skinid = skins[i];
selIdEl.textContent = skinid;
// send preview request to server
if (typeof cef !== 'undefined' && cef.emit) cef.emit('skinshop:preview', skinid);
}


buyBtn.onclick = () => {
if (selectedIndex < 0) return alert('Select a skin first');
const skinid = skins[selectedIndex];
if (typeof cef !== 'undefined' && cef.emit) cef.emit('skinshop:buy', skinid);
}


closeBtn.onclick = () => { if (typeof cef !== 'undefined' && cef.emit) cef.emit('skinshop:close'); }


// Rotate gestures - emit delta to server which will change facing angle
canvas.addEventListener('mousedown', (e)=>{ rotating = true; lastX = e.clientX; });
window.addEventListener('mouseup', ()=> rotating = false);
window.addEventListener('mousemove', (e)=>{ if(!rotating) return; const dx = e.clientX - lastX; lastX = e.clientX; if (typeof cef !== 'undefined' && cef.emit) cef.emit('skinshop:rotate', dx); });


// mouse wheel -> zoom
canvas.addEventListener('wheel', (e)=>{ e.preventDefault(); zoom += e.deltaY * -0.001; zoom = Math.max(0.5, Math.min(2.2, zoom)); renderPreview(); });


// Simple placeholder render
function renderPreview(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = '#071017';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = '#ffffff22';
ctx.fillRect(20,20,canvas.width-40,canvas.height-40);


ctx.save();
ctx.translate(canvas.width/2, canvas.height/2);
ctx.scale(zoom, zoom);
ctx.fillStyle = '#222';
ctx.beginPath();
ctx.arc(0,0,120,0,Math.PI*2);
ctx.fill();
ctx.fillStyle = '#fff';
ctx.font = '36px Arial';
ctx.textAlign = 'center';
ctx.fillText(selectedIndex >=0 ? `Skin ${skins[selectedIndex]}` : 'No preview', 0, 10);
ctx.restore();
}


// initial render
renderPreview();


// Periodically re-render (for zoom/placeholder visuals)
setInterval(renderPreview, 60);
