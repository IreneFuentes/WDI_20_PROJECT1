var player1 = {id: 1, lives: 5, score: 0, name:"PLAYER 1"};
var player2 = {id: 2, lives: 5, score: 0, name:"PLAYER 2"};
var currentPlayer;
// var audioMole
 

function showRandomMole() {
  // esto lo hago para asegurarme de que el topo esta escondido en todas las celdas
  $('.cell').removeClass('up'); 
  $(".cell").addClass("down");
  //Con esto lo que hago es encontrar un numero aleatorio par acad columna y cada fila, y la linea 13 me define la variable "cell" que la combinacion d columna y fila de manera aleatoria.
  var column = Math.floor((Math.random() * 8) + 1);
  var row = Math.floor((Math.random() * 4) + 1);
  var cell = $("#column" + column + "-row" + row);
  cell.removeClass("down");
  cell.addClass("up");
  return cell;
}
//cuando le doy al play, el orden que sigue es el siguiente:
function play(player){
  if (player.lives > 0 ){
    var mole = showRandomMole();

    var timeout = setTimeout(function() {
      new Audio('http://www.pachd.com/a/button/button1.wav').play();
      player.lives --;
      updatePlayerInfo(player);
      mole.off();
      play(player);
    }, 1000);

    mole.on("click", function(){
      
      new Audio("beep9.mp3").play();
      clearTimeout(timeout);
      player.score += 100;
      updatePlayerInfo(player);
      mole.off();
      play(player);

    })
  } else {
    $('.cell').removeClass('up'); 
    $(".cell").addClass("down");
    currentPlayer = player2;
    showPlayerTurn(currentPlayer);

    if (player2.lives === 0) {
      $("#gameOver").css({"display":"block"});
      gameOver();
    } 
  }
}

function updatePlayerInfo(player){
  $("#player" + player.id + "-lives").text(player.lives);
  $("#player" + player.id + "-score").text(player.score);
}
function showPlayerTurn(player) {
  $("#playerTurn").text("Turn: " + player.name);
}



var gameOver = function() {
    new Audio('Ta Da-SoundBible.com-1884170640.mp3').play();
    
    console.log(Audio);
    score1 = player1.score;
    score2 = player2.score;

    // console.log("PLAYER 1 SCORE: " + score1);
    // console.log("PLAYER 2 SCORE: " + score2);

    if (score1 > score2){
      // console.log("PLAYER ONE WINS!");
      $("#gameOver").html("GAME OVER<br><br>PLAYER ONE WINS!")
    }
    else if(score1 < score2){
      
      // console.log("PLAYER TWO WINS!");
      $("#gameOver").html("GAME OVER<br><br>PLAYER TWO WINS!")
    }
    else {
      
      // console.log("TIE!");
      $("#gameOver").html("GAME OVER<br><br>TIE!")
    }
  }

$(function(){
  currentPlayer = player1;
  showPlayerTurn(currentPlayer);
  updatePlayerInfo(currentPlayer);
  $("#play").on("click", function(){
    currentPlayer.lives = 5;
    currentPlayer.score = 0;
    updatePlayerInfo(currentPlayer);
    play(currentPlayer);

  });

});


