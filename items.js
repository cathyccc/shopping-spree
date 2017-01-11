document.addEventListener("DOMContentLoaded",function(event){
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

    return image
  };

  function fillItems(){
      var windowWidth = 600;
      var windowHeight = 600;

      for (var i=0; i<40; i++){
        var x = Math.ceil(Math.random()* windowWidth);
        var y = Math.ceil(Math.random()* windowHeight);
        console.log(x);
        console.log(y);

        var lowItems = low();
        console.log(lowItems);

        lowItems.style.top = x+'px';
        lowItems.style.left = y+'px';
        document.getElementById('app').append(lowItems);
      }
  };

  document.getElementById('item-maker').addEventListener('click',fillItems);
  document.getElementsByClassName('item-low').addEventListener('click', removeItem);

})
