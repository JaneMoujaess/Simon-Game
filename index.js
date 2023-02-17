let colors=["green","red","yellow","blue"];

let tiles = [];
let level = 0;

let temp = [];
let tempLevel = 0;

let defaultHeaderText = $("#level-title").text();
let header = $("#level-title");

$(document).on("keydown", function() {
  if (tiles.length === 0) {
    addLevel();
  }
});

$(".btn").on("click", function() {
  animate(this.id);
  playSound(this.id);
  temp.push(this.id);

  if (temp[temp.length - 1] === tiles[temp.length - 1]) {
    tempLevel++;
  } else { //Game over -> Reset
    level = 0;
    tempLevel = 0;
    temp=[];
    tiles = [];
    let audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    header.text("GAME OVER");
    setTimeout(function() {
      $("body").removeClass("game-over");
      header.text(defaultHeaderText);
    }, 1000);
    return;
  }
  if (tempLevel === level) {
    tempLevel = 0;
    temp=[];
    setTimeout(function(){
        addLevel();
    },1000);
  }
});

function addLevel() {
  level++;
  header.text("Level " + level);
  let newColor = randomColorSelector();
  animate(newColor);
  playSound(newColor);
  tiles.push(newColor);
}

function animate(color) {
  let button=$("#"+color);
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 300);
}

function playSound(color) {
  let audio = new Audio("sounds/" + $("#"+color).attr("id") + ".mp3");
  audio.play();
}

function randomColorSelector() {
  let chosenColor = Math.floor(Math.random() * 4);
  return colors[chosenColor];
}
