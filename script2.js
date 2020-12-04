var num=0;

window.onload= ()=>{
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  if(isNaN(document.getElementById("bot"))){
  document.getElementById("bot").style.backgroundColor = "#"+ randomColor;
  setTimeout(cambiarcolor,1000);
}
}

function cambiarcolor(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.getElementById("bot").style.backgroundColor = "#"+ randomColor;
  setTimeout(cambiarcolor,1000);
}

function pulsacion(){
      document.getElementById("bot").style.visibility = "hidden";
      document.body.style.backgroundImage = "url('./Img/mamamia.gif')";
      document.getElementById("audio").play();
      setTimeout(function(){ location.assign("ptJuego.html"); },2000);}
