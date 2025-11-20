const tela = document.getElementsByTagName("tela")[0];
const canvas = document.createElement("canvas");
tela.appendChild(canvas);
canvas.width = tela.getAttribute("largura")
canvas.height = tela.getAttribute("altura")
canvas.style = "border:1px solid black";
const ctx = canvas.getContext('2d');

desenhar();

function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (const arc of document.getElementsByTagName("arco")) {
        let x = parseFloat(arc.getAttribute("px"));
        let y = parseFloat(arc.getAttribute("py"));
        let r = parseFloat(arc.getAttribute("raio"));
        let angIni = parseFloat(arc.getAttribute("angIni"));
        let angFim = parseFloat(arc.getAttribute("angFim"));
        let cor = arc.getAttribute("cor");

        ctx.beginPath();
        ctx.arc(x, y, r, angIni, angFim);
        ctx.fillStyle = cor;
        ctx.fill();
        ctx.stroke();
    }


    for (const ret of document.getElementsByTagName("retangulo")) {

        let x = parseFloat(ret.getAttribute("px"));
        let y = parseFloat(ret.getAttribute("py"));
        let w = parseFloat(ret.getAttribute("largura"));
        let h = parseFloat(ret.getAttribute("altura"));
        let cor = ret.getAttribute("cor");

        ctx.fillStyle = cor;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);
    }


    for (const poly of document.getElementsByTagName("poligono")) {

        ctx.beginPath();

        let i = 1;
        let x = parseFloat(poly.getAttribute("px1"));
        let y = parseFloat(poly.getAttribute("py1"));
        ctx.moveTo(x, y);

        while (poly.hasAttribute("px" + i)) {
            let px = parseFloat(poly.getAttribute("px" + i));
            let py = parseFloat(poly.getAttribute("py" + i));
            ctx.lineTo(px, py);
            i++;
        }

        ctx.closePath();
        ctx.fillStyle = poly.getAttribute("cor");
        ctx.fill();
        ctx.stroke();
    }
}

function atualizar() {
    let vel = 2;

    const W = canvas.width;
    const H = canvas.height;


    for (const arc of document.getElementsByTagName("arco")) {

        let movH = arc.getAttribute("moverH");
        if (movH) {
            let x = parseInt(arc.getAttribute("px")) || 0;
            movH === "direita" ? x += vel : x -= vel;


            if (x > W) x = 0;
            if (x < 0) x = W;
            arc.setAttribute("px", x);
        }

        let movV = arc.getAttribute("moverV");
        if (movV) {
            let y = parseInt(arc.getAttribute("py")) || 0;
            movV === "abaixo" ? y += vel : y -= vel;

            if (y > H) y = 0;
            if (y < 0) y = H;
            arc.setAttribute("py", y);
        }
    }


    for (const ret of document.getElementsByTagName("retangulo")) {

        let movH = ret.getAttribute("moverH");
        let movV = ret.getAttribute("moverV");

        if (movH) {
            let x = parseInt(ret.getAttribute("px")) || 0;
            movH === "direita" ? x += vel : x -= vel;


            if (x > W) x = 0;
            if (x < 0) x = W;
            ret.setAttribute("px", x);
        }
        if (movV) {
            let y = parseInt(ret.getAttribute("py")) || 0;
            movV === "abaixo" ? y += vel : y -= vel;

            if (y > H) y = 0;
            if (y < 0) y = H;
            ret.setAttribute("py", y);
        }
    }
    for (const poly of document.getElementsByTagName("poligono")) {

        let movH = poly.getAttribute("moverH");
        let movV = poly.getAttribute("moverV");

        if (!movH && !movV) continue;

        let i = 1;
        while (poly.hasAttribute("px" + i)) {

            let px = parseInt(poly.getAttribute("px" + i)) || 0;
            let py = parseInt(poly.getAttribute("py" + i)) || 0;

            if (movH) movH === "direita" ? px += vel : px -= vel;
            if (movV) movV === "abaixo" ? py += vel : py -= vel;


            if (px > W) px = 0;
            if (px < 0) px = W;
            if (py > H) py = 0;
            if (py < 0) py = H;

            poly.setAttribute("px" + i, px);
            poly.setAttribute("py" + i, py);

            i++;
        }
    }
}

function animar() {
    desenhar();
    atualizar();
    requestAnimationFrame(animar);
}

animar();