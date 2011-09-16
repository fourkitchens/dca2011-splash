var Daywalker = function(opts) {
  this.init(opts);
};

Daywalker.prototype = {

  init: function(opts) {
    var self = this;

    dwTypes = new Array();
    dwTypes[0] = 'truck';
    dwTypes[1] = 'bicycle';
    dwTypes[2] = 'pennyfarthing';
    dwTypes[3] = 'motorcycle';
    dwTypes[4] = 'unicycle';
    dwTypes[5] = 'jogger';
    dwTypes[6] = 'segway';
    dwTypes[7] = 'horse';
    dwTypes[8] = 'tractor';
    dwTypes[9] = 'cannon';

    this.image = new Image();
    this.image.src = '/img/'+ dwTypes[Math.round(Math.random() * 9)] +'.png';

    this.image.onload = function() {
      self.width = Math.round(self.image.width);
      self.height = Math.round(self.width * (self.image.height / self.image.width));

      self.rate = Math.ceil(self.height * .3 / 12);
    };

    this.rate = Math.round(Math.random() + 1 * 4);
    this.x = 0;
    this.y = 0;
  }

};
;

(function($, undefined) {

$(function() {
  var canvas = $("<canvas />").addClass("daywalkers").prependTo("body"),
      WIDTH = canvas.width(),
      HEIGHT = canvas.height();

  if (!canvas.get(0).getContext) {
    throw "Aaron Forsander will track you down and give " +
      "you the most epic of high fives if you download Chrome " +
      "right now! http://www.google.com/chrome";
  }

  // Have to set the width/height attrs of the canvas
  // element or images won't know how big to be!  CrAzY DaYwalKeRz!!
  canvas.attr("width", WIDTH).attr("height", HEIGHT);

  // Create some daywalkers!!
  var daywalkers = [];
  for (var x = 0; x < 5; x++) {
    var daywalker = new Daywalker();
    daywalker.x = Math.round(WIDTH / 2 * Math.random());
    daywalker.y = Math.round(HEIGHT / 2 * Math.random());
    daywalkers.push(daywalker);
  };

  // Start the rendering loopty loop.
  setInterval(function() {
    var context = canvas.get(0).getContext("2d");
    context.clearRect(0, 0, WIDTH, HEIGHT);

    for (var x = 0; x < daywalkers.length; x++) {
      daywalkers[x].x += daywalkers[x].rate;
      context.drawImage(daywalkers[x].image, daywalkers[x].x, daywalkers[x].y, daywalkers[x].width, daywalkers[x].height);

      // That old daywalker just flew off the screen!  Like WTF?!
      // Let's make a new daywalker!  Woo!!  Yay!!!!!!
      if (daywalkers[x].x > WIDTH) {
        var daywalker = new Daywalker();
        daywalker.x = -daywalker.image.width;
        daywalker.y = Math.round(HEIGHT / 2 * Math.random());
        daywalkers[x] = daywalker;
      }
    }
  }, 40);

});

})(jQuery);
;
