

 var gameModule = (function(document, $) {
  "use strict";

  //全域變數      module 

  var timeoutVar,
      counter = 0,

      ballX,
      ballY,
      ballR,

      scores;



 function touchEvent(evt) {
                var x = evt.clientX,
                    y = evt.clientY,
                    tmp = (ballX - x) * (ballX - x) + (ballY - y) * (ballY - y);

                console.log("Clicked: " + x + " , " + y);

                

                if(tmp < ballR * ballR){

                 scores = scores + (100 - ballR);
                 console.log("Hit ! Your scores: " + scores);
                }
        }



function start(){

  scores = 0;
  document.getElementById("main").addEventListener("click",touchEvent,false);
  startGame();
  }



  function startGame(){
        var canvas = document.getElementById('game'),
            ctx = canvas.getContext('2d');


           ballX = Math.floor(Math.random() * 600); // 0..300
           ballY = Math.floor(Math.random() * 450);
           ballR = Math.floor(Math.random() * 80);

        canvas.width = 640;
        canvas.height = 480;

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2 , true);
        ctx.fill();

     
if(counter >= 10){
  gameOver();

}else{

  timeoutVar = setTimeout(startGame, 2000);
  counter = counter + 1;


}

        }


function gameOver(){

   console.log("Final: " + scores);

// API: http://127.0.0.1:3000/scores?scores=500
        var api = "http://127.0.0.1:3000/scores?scores=" + scores;

        $.ajax({ url: api});

}

        return {

          ball: start
          
        }
}) (document, $);

 gameModule.ball();
 
