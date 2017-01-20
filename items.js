document.addEventListener("DOMContentLoaded",function(event){
  var playing = false;
  var score = 0;
  var time;
  var timerCountdown;

  // create items worth 5 to 10 points
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
    var pointRandom = pointGenerate(5,10);

    // mounting image onto gameboard
    var image = imageDiv(pointRandom);
    image.setAttribute('src',src[imageRandom]);
    image.className = 'draggable item-low';
    image.style.height = '60px';
    return image;
  };

  // create items worth 15 to 20 points
  function medium(){
    var src = [
      "http://image.flaticon.com/icons/svg/214/214344.svg",
      "http://image.flaticon.com/icons/svg/169/169752.svg",
      "http://image.flaticon.com/icons/svg/289/289008.svg",
      "http://image.flaticon.com/icons/svg/196/196526.svg"
    ];
    var imageRandom = Math.round(Math.random() * 3);
    var pointRandom = pointGenerate(15,20);

    var image = imageDiv(pointRandom);
    image.setAttribute('src',src[imageRandom]);
    image.className = 'draggable item-med';
    image.style.height = '50px';
    return image;
  };

  // create items worth 30 to 50 points
  function high(){
    var src = [
      "http://image.flaticon.com/icons/svg/307/307579.svg",
      "http://image.flaticon.com/icons/svg/124/124097.svg",
      "http://image.flaticon.com/icons/svg/141/141064.svg",
      "http://image.flaticon.com/icons/svg/141/141087.svg"
    ];
    var imageRandom = Math.round(Math.random() * 3);
    var pointRandom = pointGenerate(30,50);

    var image = imageDiv(pointRandom);
    image.setAttribute('src',src[imageRandom]);
    image.className = 'draggable item-high';
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
    image.setAttribute('id','item');
    return image;
  };

  // setting up the game
  function startGame(){
    var playTime = 10;
    time = playTime;
    playing = true;
    removeStart();
    displayScore();
    displayCart();
    displayQuit();
    displayTime();
    countdown();
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

    var x = Math.round(Math.random() * (97 + 3) - 3);
    var y = Math.round(Math.random() * (75));

    while (x < 14 && y < 6){
      var x = Math.round(Math.random() * (97 + 3) - 3);
      var y = Math.ceil(Math.random()* 75);
    };

    newItem.style.left = x + '%';
    newItem.style.top = y + '%';

    document.getElementById('app').append(newItem);

    dragItem();
    setDropZone();
  };

  function dragItem(){
    interact('.draggable').draggable({
      inertia: true,
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: {top:0, left:0, bottom: 1, right: 1}
      },
      onmove: dragMoveListener
    })
  };

  function setDropZone(){
    interact('#cartArea').dropzone({
      accept: '#item',
      overlap: 0.75, //percentage of element overlap
      ondragenter: function(event){
        var cart = event.target;
        cart.classList.add('insidecart');
      },
      ondragleave: function (event) {
        var cart = event.target;
        cart.classList.remove('insidecart');
      },
      ondrop: function(event){
        var droppedItem = event.relatedTarget;
        score += parseInt(droppedItem.dataset.point);
        displayScore();
        droppedItem.remove();
        addNewItem();
      }
    });
  };

  function dragMoveListener(event){
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px,${y}px)`;
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  // logic when object removed
  // function removeItem(){
  //   score += parseInt(this.dataset.point);
  //   console.log(this.dataset.point);
  //   displayScore();
  //   this.remove();
  //   addNewItem();
  // };

  // update score
  function displayScore(){
    if (!document.getElementById('currentScore')){
      var scoreDiv = document.createElement('div');
      scoreDiv.setAttribute('id','currentScore')
      scoreDiv.append(`score: ${score}`);
      document.getElementById('app').append(scoreDiv);
    } else {
      var scoreDiv = document.getElementById('currentScore');
      scoreDiv.innerHTML = `score: ${score}`;
    }
  };

  // show timer
  function displayTime(){
    var timer = document.createElement('div');
    timer.setAttribute('id',"timer");
    timer.append(`time: ${time}`);
    document.getElementById('app').append(timer);
  };


  // create shopping cart
  function displayCart(){
    var cartDiv = document.createElement('div');
    cartDiv.setAttribute('id','cartArea');
    var imgCart = document.createElement('img');
    imgCart.className = "outsidecart";
    imgCart.setAttribute('src',"http://image.flaticon.com/icons/svg/116/116383.svg");
    cartDiv.append(imgCart);

    document.getElementById('app').append(cartDiv);
  };

  // display start button
  function displayStart(){
    var link = document.createElement('a');
    var button = document.createElement('div');
    link.setAttribute("href","#");
    link.className = "start-button";
    link.setAttribute("id","item-maker");
    button.innerHTML = "start";
    link.append(button);
    link.addEventListener('click', startGame);

    document.getElementById('app').append(link);
  }

  // remove start button on play
  function removeStart(){
    var button = document.getElementById('item-maker');
    if (playing = true){
      button.style.display = "none";
    }
  };

  // quit button
  function displayQuit(){
    var link = document.createElement('a');
    var button = document.createElement('div');
    link.setAttribute("href","#");
    link.className = "exit-button";
    link.setAttribute("id","exitButton");
    button.innerHTML = "exit";
    link.append(button);
    link.addEventListener('click',endGame);
    document.getElementById('app').append(link);
  }

  function countdown(){
    timerCountdown = setInterval(updateTime,1000);
  };

  function updateTime(){
    var timeDiv = document.getElementById('timer');
    var newTime = time-1;
    time = newTime;
    document.getElementById('timer').innerHTML = `time: ${time}`;

    if (time == 0){
      endGame();
    }
  };

  function endGame(){
    var clear = clearInterval(timerCountdown);
    console.log(timerCountdown);
    document.getElementById('app').innerHTML = "";
    displayStart();
  }

  // append start button
  displayStart();
});
