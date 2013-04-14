var colorConverter;

colorConverter = (function() {

  function colorConverter() {
    this.rgbR = 239;
    this.rgbG = 239;
    this.rgbB = 0;
    this.baseColor = [239, 239, 0];
  }

  colorConverter.prototype.paleAleColor = function() {
    var _blue, _green, _red;
    _red = this.rgbR.toString(16);
    _green = (this.baseColor[1] - 48).toString(16);
    _blue = this.rgbB.toString(16);
    if (_red === "0") {
      _red = "00";
    }
    if (_green === "0") {
      _green = "00";
    }
    if (_blue === "0") {
      _blue = "00";
    }
    return "#" + _red + _green + _blue;
  };

  colorConverter.prototype.run = function(x) {
    var y;
    y = "000000" + x.toString(16);
    y = "#" + y.substr(y.length - 6, 6);
    return y;
  };

  colorConverter.prototype.toDEC = function(x) {
    var i, m, n;
    n = 0;
    i = 1;
    while (i < 7) {
      m = x.substr(i, 1);
      n = n * 16 + this.DEC(m);
      i++;
    }
    return n;
  };

  colorConverter.prototype.DEC = function(x) {
    var HEX, j, onoff, y;
    onoff = 0;
    HEX = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    y = 0;
    j = 0;
    while (j < 16 && onoff === 0) {
      if (x === HEX[j]) {
        y = j;
        onoff = 1;
      }
      j++;
    }
    return y;
  };

  return colorConverter;

})();

module.exports = colorConverter;
