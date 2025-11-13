const tela = document.getElementsByTagName("tela")[0];
const canvas = document.createElement("canvas");
tela.appendChild(canvas);
canvas.width = tela.getAttribute("largura")
canvas.height = tela.getAttribute("altura")
canvas.style = "border:1px solid black";
const ctx = canvas.getContext('2d');

desenhar();

function desenhar() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const arc of document.getElementsByTagName("arco")) {
   
        let x = arc.getAttribute("px") || 20;
        let y = arc.getAttribute("py") || 20;
        let r = arc.getAttribute("raio") || 20;
        let angIni = parseFloat(arc.getAttribute("angIni") || 0);
        let angFim = parseFloat(arc.getAttribute("angFim") || Math.PI * 2);
        let cor = arc.getAttribute("cor") || "green";
        ctx.beginPath();
        ctx.arc(x, y, r, angIni, angFim, false);
        ctx.fillStyle = cor;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    }
}

function atualizar() {
    let vel = 5;
    for (const arc of document.getElementsByTagName("arco")) {
        let arcoH = arc.getAttribute("moverH");
        if(arcoH){
            let n = parseInt(arc.getAttribute("px"));
            arcoH === "direita"?n+=vel:n-=vel;
            if (n>canvas.width) n = 0;
            if (n<0) n = canvas.width;
            arc.setAttribute("px",n);
        }
        let arcoV = arc.getAttribute("moverV");
        if (arcoV) {
            let n = parseInt(arc.getAttribute("py"));
            arcoV === "acima"?n-=vel:n+=vel;
            if (n>canvas.height) n = 0;
            if (n<0) n = canvas.height;
            arc.setAttribute("py",n)
        }
    }
}
function animar(){
    desenhar();
    atualizar();
    requestAnimationFrame(animar);
}
animar();




