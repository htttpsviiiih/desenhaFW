  const  tela=document.getElementsByTagName("tela")[0];
  const  canvas=document.createElement("canvas");
  tela.appendChild(canvas);
  canvas.width= tela.getAttribute("largura")
  canvas.height= tela.getAttribute("altura")
  canvas.style="border:1px solid black";
  const ctx = canvas.getContext('2d');

  for(const arc of document.getElementsByTagName("arco")){

      let x = arc.getAttribute("px")||20;
      let y = arc.getAttribute("py")||20;
      let r = arc.getAttribute("raio")||20;
      let angIni = parseFloat(arc.getAttribute("angIni")||0);
      let angFim = parseFloat(arc.getAttribute("angFim")||Math.PI*2);
      let cor = arc.getAttribute("cor")||"green";
      ctx.beginPath();
      ctx.arc(x, y, r, angIni, angFim, false);
      ctx.fillStyle = cor;
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.closePath();
  }


  for(const ret of document.getElementsByTagName("retangulo")){
      let x = ret.getAttribute("px") || 20;
      let y = ret.getAttribute("py") || 20;
      let l = ret.getAttribute("largura") || 50;
      let a = ret.getAttribute("altura") || 30;
      let cor = ret.getAttribute("cor") || "gray";
      ctx.beginPath();
      ctx.fillStyle = cor;
      ctx.fillRect(x, y, l, a);
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, l, a);
      ctx.closePath();
  }

  for(const pol of document.getElementsByTagName("poligono")){
      let pontos = (pol.getAttribute("pontos") || "").split(" ");
      let cor = pol.getAttribute("cor") || "purple";
      if(pontos.length < 3) continue;
      ctx.beginPath();
      let [x0, y0] = pontos[0].split(",");
      ctx.moveTo(x0, y0);
      for(let i=1; i<pontos.length; i++){
          let [x, y] = pontos[i].split(",");
          ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = cor;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
  }