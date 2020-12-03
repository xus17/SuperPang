class Bola {

  constructor(radio, color, x, y){
    this.r = radio;
    this.color = color;
    this.x = x;
    this.y = y;
    this.velX=0;
    this.velY=0;

    this.circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.circ.setAttributeNS(null,"cx",this.x);
    this.circ.setAttributeNS(null,"cy",this.y);
    this.circ.setAttributeNS(null,"r",this.r);
    this.circ.setAttributeNS(null,"fill",this.color);
    this.velX = Math.round(Math.random()*(10-1)+1);
    this.velY = Math.round(Math.random()* (10-1)+1);
    document.getElementsByTagName("svg")[0].appendChild(this.circ);

  }

  dibuja(){

    let radio = parseInt(this.circ.getAttribute("r"));
    let posXact = parseInt(this.circ.getAttribute("cx"))+ parseInt(this.velX);
    let posYact = parseInt(this.circ.getAttribute("cy"))+ parseInt(this.velY);
    let tamanoSvg = document.getElementById("svg").getBoundingClientRect();


    this.circ.setAttribute("cx",posXact);
    this.circ.setAttribute("cy",posYact);


    this.x += this.velX;
    this.y += this.velY;


    this.circ.setAttribute("fill",this.color);

  if(posXact<=0+this.r ||posXact >= tamanoSvg.width-this.r){
    this.velX *=-1;
  }

  if(posYact<=0+this.r || posYact >= tamanoSvg.height-this.r){
    this.velY*=-1;
  }
  }

}
class Jugador {
  constructor(radio,x){
    this.r = radio;
    this.x = x;
    this.y = document.getElementById("svg").getBoundingClientRect().height -105;
    this.velX=20;

    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "image");
    this.rect.setAttributeNS(null,"x",this.x);
    this.rect.setAttributeNS(null,"y",document.getElementById("svg").getBoundingClientRect().height-105);
    this.rect.setAttributeNS(null,"width",100);
    this.rect.setAttributeNS(null,"height",100);
    this.rect.setAttributeNS("http://www.w3.org/1999/xlink","href","./Img/mario.gif")
    document.getElementsByTagName("svg")[0].appendChild(this.rect);
  }

  mover(tecla,bolas) {
         if ((tecla.keyCode === 97 && this.x - this.velX >= 0 ) || (tecla.keyCode === 65 && this.x - this.velX >= 0 )) {
             this.x = this.x - this.velX;
             this.rect.setAttribute("x", this.x);
             this.rect.setAttributeNS("http://www.w3.org/1999/xlink","href","./Img/marioizda.gif")
         }
         if ((tecla.keyCode === 100 && this.x + this.velX <= document.getElementById("svg").getBoundingClientRect().width - 50) || (tecla.keyCode === 68 && this.x + this.velX <= document.getElementById("svg").getBoundingClientRect().width - 50)) {
             this.x = this.x + this.velX;
             this.rect.setAttribute("x", this.x);
             this.rect.setAttributeNS("http://www.w3.org/1999/xlink","href","./Img/marioderecha.gif")
         }
         if (tecla.keyCode === 32 ) {
           this.rect.setAttributeNS("http://www.w3.org/1999/xlink","href","./Img/mario.gif")
           if(disparos.length<10){
             var bola = new Bola(10,"black",this.x+25,this.y);
             disparos.push(bola);
           }
           document.getElementById("audio").src="./Musica/disparo.mp3";
           document.getElementById("audio").play();
         }

     }

}

var bolas = [];
var disparos = [];
var jugador;

window.onload = () =>{
  jugador = new Jugador(90,document.getElementById("svg").getBoundingClientRect().height);
  window.addEventListener("keypress", (tecla) => {
            jugador.mover(tecla,bolas);
            document.getElementById("audio2").play();
  });
  var x=Math.random() * (100 - 50) + 50;
  for(let  i=0;i<2;i++){
    bolas.push(new Bola(50,"red",x,70));
    x+=document.getElementById("svg").getBoundingClientRect().width-200;
  }

  setInterval(bucleprincipal,30);

}

function bucleprincipal(){
  animaTodasBolas();
  comprobarColision();
  disparar();
}

function animaTodasBolas(){
  for(let i=0;i<bolas.length;i++){
      bolas[i].dibuja();
    }
    colision(bolas);
  }

  function colision(bolas){
    for(let i=0;i<bolas.length;i++){
      for(let j=0;j<bolas.length;j++){
        if(i!=j){ chocarBolas(bolas[i],bolas[j]); }
      }
    }
  }

  function comprobarColision(){
      for(let i =0;i<bolas.length;i++){
        var bola = bolas[i];
        if(parseInt(bola.y) >document.getElementById("svg").getBoundingClientRect().height-120){
          //if((parseInt(bola.x+25) >=jugador.x) && (parseInt(bola.x-25)<=jugador.x)){
          if(((parseInt(bola.x)<=jugador.x)&&(parseInt(bola.x)>=jugador.x-30))||((parseInt(bola.x)>=jugador.x+110)&&(parseInt(bola.x)<=jugador.x+120))||((parseInt(bola.x)>=jugador.x)&&(parseInt(bola.x)<=jugador.x+110))){
            perder();
          }
        }
      }
  }

  function chocarBolas(a,b){
    if (Math.sqrt(((a.x-b.x)**2)+((a.y-b.y)**2)) <= a.r + b.r) {

      let cambiox = 0;
      let cambioy = 0;

      cambiox = a.velX;
      a.velX = b.velX;
      b.velX = cambiox;
      cambioy = a.velY;
      a.velY = b.velY;
      b.velY = cambioy;

      a.dibuja();
      b.dibuja();

      }
}

function disparar(){
  for(let i=0;i<disparos.length;i++){
    disparos[i].y -= 10;
    disparos[i].circ.setAttribute("cy",disparos[i].y);
    if(disparos[i].y<20){
      disparos[i].circ.setAttributeNS(null,"cx",-500);
      disparos.splice(i,1);
    }
  }
    choquedisparo();
}

  function choquedisparo(){
    for (var i=0;i<bolas.length;i++){
      for(var j=0;j<disparos.length;j++){
        if (Math.sqrt(((bolas[i].x-disparos[j].x)**2)+((bolas[i].y-disparos[j].y)**2)) <= bolas[i].r + disparos[j].r) {

          if(isNaN(bolas[i])){
              disparos[j].circ.setAttributeNS(null,"cx",-500);
              bolas[i].circ.setAttributeNS(null,"cx",-500);

             if(bolas[i].r/2>10){
               let posBolx1= parseInt(bolas[i].x) ;
               let posBoly1= parseInt(bolas[i].y) ;
               bolas.push(new Bola(bolas[i].r/2,"orange",posBolx1+30,posBoly1));
               bolas.push(new Bola(bolas[i].r/2,"orange",posBolx1-30,posBoly1));
             }
             bolas.splice(i,1);
             disparos.splice(j,1);

               for(var i=0;i<bolas.length;i++){
                  bolas[i].dibuja;
              }
              if(bolas.length==0){
                  ganar();
            }
          }
      }
    }
  }
}

function ganar(){
  document.getElementById("svg").style.visibility = "hidden";
  document.body.style.backgroundImage = "url('./Img/victoria.gif')";
  document.getElementById("audio2").src="./Musica/crab-rave.mp3";
  document.getElementById("audio2").play();
  setTimeout(function(){ location.assign("index.html"); },11000);
}


function perder(){
  document.getElementById("svg").style.visibility = "hidden";
  document.body.style.backgroundImage = "url('./Img/perder.gif')";
  document.getElementById("audio2").src="./Musica/muerte.mp3";
  document.getElementById("audio2").play();
  setTimeout(function(){ location.assign("index.html"); },4000);
}
