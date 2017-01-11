document.addEventListener("DOMContentLoaded",function(event){
  var windowWidth = 600;
  var windowHeight = 600;
  var playing = false;

  // create items worth 10 to 30 points
  function low(){
    var src = [
      "http://image.flaticon.com/icons/svg/135/135739.svg",
      "http://image.flaticon.com/icons/svg/290/290406.svg",
      "http://image.flaticon.com/icons/svg/135/135559.svg",
      "http://image.flaticon.com/icons/svg/186/186151.svg"
    ];

    var imageRandom = Math.round(Math.random() * 3);

    var image = document.createElement('img');
    image.setAttribute('src',src[imageRandom]);
    image.setAttribute('class','item-low');
    image.style.height = '60px';

    return image;
  };

  function fillItems(){
    for (var i=0; i<=2; i++){
      addNewItem();
    };
  };

  function addNewItem(){
    var newItem = low();

    var x = Math.ceil(Math.random()* windowWidth);
    var y = Math.ceil(Math.random()* windowHeight);

    newItem.style.top = x+'px';
    newItem.style.left = y+'px';

    document.getElementById('app').append(newItem);
    newItem.addEventListener('click',removeItem);
  };

  function removeItem(){
    // temporary code for adding points
    this.remove();
    addNewItem();
  };

  // start game
  document.getElementById('item-maker').addEventListener('click',function(){
    playing = true;
    fillItems();
  });
})
