var player1 = {id: 1, lives: 3, score: 0, name:"PLAYER 1"};
var player2 = {id: 2, lives: 3, score: 0, name:"PLAYER 2"};
var currentPlayer;
 

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
      player.lives --;
      updatePlayerInfo(player);
      mole.off();
      play(player);
    }, 1000);

    mole.on("click", function(){
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

// function resetGame () {

// }

var gameOver = function() {

    score1 = player1.score;
    score2 = player2.score;

    console.log("PLAYER 1 SCORE: " + score1);
    console.log("PLAYER 2 SCORE: " + score2);

    if (score1 > score2){
      console.log("PLAYER ONE WINS!");
      $("#gameOver").html("GAME OVER<br>PLAYER ONE WINS!")
    }
    else if(score1 < score2){
      // Player 2 Wins
      console.log("PLAYER TWO WINS!");
      $("#gameOver").html("GAME OVER<br>PLAYER TWO WINS!")
    }
    else {
      // tie
      console.log("TIE!");
      $("#gameOver").html("GAME OVER<br>TIE!")

    }

    //  if (score1 > score2) {
    //   player1 = winner;
    //   console.log("player1Win");
    // } else if (score1 = score2) {
    //   console.log(tie);
    // } else {
    //   player2 = winner;
    // }
  }

$(function(){
  currentPlayer = player1;
  showPlayerTurn(currentPlayer);
  updatePlayerInfo(currentPlayer);
  $("#play").on("click", function(){
    currentPlayer.lives = 3;
    currentPlayer.score = 0;
    updatePlayerInfo(currentPlayer);
    play(currentPlayer);

  });

  //A partir de aqui es lo nuevo para añadir la informacion en la pantalla de game over







});


