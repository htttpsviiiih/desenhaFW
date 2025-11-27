const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");


const quadrado = {
x: canvas.width/2-25,
y: canvas.height/2-25,
tamanho: 50
}

const circulo = {
x: 50,
y: 50,
raio: 20
}

function desenhar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.rect(quadrado.x,quadrado.y,quadrado.tamanho,quadrado.tamanho);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(circulo.x,circulo.y,circulo.raio,0,Math.PI*2);
    ctx.fill();

    atualizarDistancia();
}

function calcularDistancia(x1,y1,x2,y2){

    const dx = x2-x1;
    const dy = y2-y1;
return Math.sqrt(dx*dx+dy*dy);
}

function atualizarDistancia(){
    const centroQuadradoX = quadrado.x+quadrado.tamanho/2;
    const centroQuadradoY = quadrado.y + quadrado.tamanho/2;

    const d = calcularDistancia(circulo.x,circulo.y,centroQuadradoX,centroQuadradoY);
    if (d<=(circulo.raio+quadrado.tamanho/2)) {
        identificarColisao();
    }else
    document.getElementById("distancia").textContent = "Distância: " + d.toFixed(2);
}

function identificarColisao(){
    document.getElementById("distancia").textContent = "Colidiu ";
    if ((circulo.y+circulo.raio)>quadrado.y && circulo.y<quadrado.y) {
        document.getElementById("distancia").textContent +="acima ";
        circulo.y-=10;
    }
 
     if ((circulo.x+circulo.raio)>quadrado.x && circulo.x<quadrado.x) {
        document.getElementById("distancia").textContent +="a esquerda ";
        circulo.x-=10;
    }
        if ((circulo.x-circulo.raio)<quadrado.x + quadrado.tamanho && circulo.x > quadrado.x + quadrado.tamanho) {
        document.getElementById("distancia").textContent +="a direita ";
        circulo.x+=10;
    }
     if ((circulo.y-circulo.raio)<quadrado.y + quadrado.tamanho && circulo.y > quadrado.y + quadrado.tamanho) {
        document.getElementById("distancia").textContent +="abaixo ";
        circulo.y+=10;
    }
   
      

    
}

document.addEventListener("keydown", function(event){
    const passo = 10;
    if(event.key === "ArrowUp") circulo.y -=passo;
    if(event.key === "ArrowDown") circulo.y +=passo;
    if(event.key === "ArrowLeft") circulo.x -=passo;
    if(event.key === "ArrowRight") circulo.x +=passo;

    desenhar();
    
})


desenhar();