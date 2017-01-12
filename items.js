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
    image.style.height = '60px';
    return image;
  };

  // create items worth 21 to 35 points
  function medium(){
    var src = [
      "http://image.flaticon.com/icons/svg/214/214344.svg",
      "http://image.flaticon.com/icons/svg/169/169752.svg",
      "http://image.flaticon.com/icons/svg/289/289008.svg",
      "http://image.flaticon.com/icons/svg/196/196526.svg"
    ];
    var imageRandom = Math.round(Math.random() * 3);
    var pointRandom = pointGenerate(21,35);

    var image = imageDiv(pointRandom);
    image.setAttribute('src',src[imageRandom]);
    image.setAttribute('class','item-med');
    image.style.height = '50px';
    return image;
  };

  // create items worth 36 to 40 points
  function high(){
    var src = [
      "http://image.flaticon.com/icons/svg/307/307579.svg",
      "http://image.flaticon.com/icons/svg/124/124097.svg",
      "http://image.flaticon.com/icons/svg/141/141064.svg",
      "http://image.flaticon.com/icons/svg/141/141087.svg"
    ];
    var imageRandom = Math.round(Math.random() * 3);
    var pointRandom = pointGenerate(26,40);

    var image = imageDiv(pointRandom);
    image.setAttribute('src',src[imageRandom]);
    image.setAttribute('class','item-high');
    image.style.height = '40px';
    return image;
  };

  // points generator
  function pointGenerate(minPts,maxPts){
    var points = Math.round(Math.random() * (maxPts - minPts) + minPts);
    return points
  };

  // mount image
  function imageDiv(pointRandom){
    var image = document.createElement('img');
    image.setAttribute('data-point',pointRandom);
    return image;
  };

  // setting up the game
  function startGame(){
    for (var i=1; i<=60; i++){
      addNewItem();
    };
  };

  // randomly generate number from 0-5 (med = 0,1 / low = 2,3,4,5 / high = 6)
  function occurance(){
    var occurance = Math.round(Math.random() * 6);
    if (occurance <= 1){
      var newItem = medium();
    } else if (occurance === 6){
      var newItem = high();
    } else {
      var newItem = low();
    };
    return newItem;
  };

  // adding a single item
  function addNewItem(){
    var newItem = occurance();

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
    console.log(this.dataset.point);
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
