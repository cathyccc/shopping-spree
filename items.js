document.addEventListener("DOMContentLoaded",function(event){
  var playing = false;
  var score = 0;

  // create items worth 5 to 20 points
  function low(){

    // generate random images for low scoring items
    var src = [
      "http://image.flaticon.com/icons/svg/135/135739.svg",
      "http://image.flaticon.com/icons/svg/290/290406.svg",
      "http://image.flaticon.com/icons/svg/135/135559.svg",
      "http://image.flaticon.com/icons/svg/186/186151.svg"
    ];
    var imageRandom = Math.round(Math.random() * 3);

    // points
    var pointRandom = pointGenerate(5,20);

    // mounting image onto gameboard
    var image = imageDiv(pointRandom);
    image.setAttribute('src',src[imageRandom]);
    image.setAttribute('class','item-low');

    return image;
  };

  // points generator
  function pointGenerate(minPts,maxPts){
    var points = Math.round(Math.random() * (maxPts - minPts) + 5);
    return points
  };

  // mount image
  function imageDiv(pointRandom){
    var image = document.createElement('img');
    image.setAttribute('data-point',pointRandom);
    image.style.height = '60px';
    return image;
  };

  // setting up the game
  function startGame(){
    for (var i=1; i<=20; i++){
      addNewItem();
    };
  };

  // adding a single item
  function addNewItem(){
    var newItem = low();

    var x = Math.ceil(Math.random()* 87);
    var y = Math.ceil(Math.random()* 87);

    while (x < 14 && y < 6){
      var x = Math.ceil(Math.random()* 87);
      var y = Math.ceil(Math.random()* 78);
    };

    newItem.style.left = x + '%';
    newItem.style.top = y + '%';

    document.getElementById('app').append(newItem);
    newItem.addEventListener('click',removeItem);
  };

  // logic when object removed
  function removeItem(){
    score += parseInt(this.dataset.point);
    displayScore();
    this.remove();
    addNewItem();
  };

  // update score
  function displayScore(){
    if (!document.getElementById('currentScore')){
      var scoreDiv = document.createElement('div');
      scoreDiv.setAttribute('id','currentScore')
      scoreDiv.append("Score: " + score);
      document.getElementById('app').append(scoreDiv);
    } else {
      var scoreDiv = document.getElementById('currentScore');
      scoreDiv.innerHTML = "Score: " + score;
    }
  };

  // start game
  document.getElementById('item-maker').addEventListener('click',function(){
    playing = true;
    displayScore();
    startGame();
  });
})
