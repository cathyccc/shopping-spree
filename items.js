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

    return image;
  };

  function fillItems(){
      var windowWidth = 600;
      var windowHeight = 600;

      for (var i=0; i<=2; i++){
        var x = Math.ceil(Math.random()* windowWidth);
        var y = Math.ceil(Math.random()* windowHeight);

        var lowItems = low();
        console.log(lowItems);

        lowItems.style.top = x+'px';
        lowItems.style.left = y+'px';

        document.getElementById('app').append(lowItems);
      };
      return lowItems;
  };


  function removeItem(){
    alert('you clicked an item');
  };

  document.getElementById('item-maker').addEventListener('click',function(){
    fillItems();
    var items = document.getElementsByClassName('item-low');

    var itemArray = [];
    for (var i=0; i<items.length; i++){
      itemArray.push(items[i]);
    };

    itemArray.forEach(x => x.addEventListener('click',removeItem));

    console.log(itemArray);

  });



})
