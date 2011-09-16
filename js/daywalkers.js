var Cloud = function(opts) {
  this.init(opts);
};

Cloud.prototype = {

  init: function(opts) {
    var self = this;

    this.image = new Image();
    this.image.src = Math.round(Math.random() * 2)
      ? "people.png"
      : "people.png";

    this.image.onload = function() {
      self.width = Math.round(self.image.width * Math.random());
      self.height = Math.round(self.width * (self.image.height / self.image.width));

      self.rate = Math.ceil(self.height * .3 / 10);
    };

    this.rate = Math.round(Math.random() + 1 * 4);
    this.x = 0;
    this.y = 0;
  }

};
;

(function($, undefined) {

$(function() {
  var canvas = $("<canvas />").addClass("clouds").prependTo("body"),
      WIDTH = canvas.width(),
      HEIGHT = canvas.height();

  if (!canvas.get(0).getContext) {
    throw "Aaron Forsander will track you down and give " +
      "you the most epic of high fives if you download Chrome " +
      "right now! http://www.google.com/chrome";
  }

  // Have to set the width/height attrs of the canvas
  // element or images won't know how big to be!  CrAzY ClOuDz!!
  canvas.attr("width", WIDTH).attr("height", HEIGHT);

  // Create some clouds!  Fluffy yay happy wow!  Cumulonimbus!
  var clouds = [];
  for (var x = 0; x < 5; x++) {
    var cloud = new Cloud();
    cloud.x = Math.round(WIDTH / 2 * Math.random());
    cloud.y = Math.round(HEIGHT / 2 * Math.random());
    clouds.push(cloud);
  };

  // Start the rendering loopty loop.
  setInterval(function() {
    var context = canvas.get(0).getContext("2d");
    context.clearRect(0, 0, WIDTH, HEIGHT);

    for (var x = 0; x < clouds.length; x++) {
      clouds[x].x += clouds[x].rate;
      context.drawImage(clouds[x].image, clouds[x].x, clouds[x].y, clouds[x].width, clouds[x].height);

      // That old cloud just flew off the screen!  Like WTF?!
      // Let's make a new cloud!  Woo!!  Yay!!!!!!
      if (clouds[x].x > WIDTH) {
        var cloud = new Cloud();
        cloud.x = -cloud.image.width;
        cloud.y = Math.round(HEIGHT / 2 * Math.random());
        clouds[x] = cloud;
      }
    }
  }, 40);

});

})(jQuery);
;
