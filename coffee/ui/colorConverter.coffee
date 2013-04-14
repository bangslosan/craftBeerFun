class colorConverter
  constructor:()->
    @rgbR = 239
    @rgbG = 239
    @rgbB = 0
    @baseColor = [239,239,0]
    
  paleAleColor:()->
    _red   = @rgbR.toString(16)
    _green = (@baseColor[1] - 48).toString(16)
    _blue  = @rgbB.toString(16)

    if _red is "0"
      _red = "00"
      
    if _green is "0"
      _green  = "00"
      
    if _blue is "0"
      _blue = "00"

    return "#" + _red + _green + _blue # ->#efbf00
        
  run:(x)->
    # 10進の色コードを16進に直す
    y = "000000" + x.toString(16)
    y = "#"  + y.substr(y.length-6,6)
    return y
    
  toDEC:(x) ->
    # 16進表記の文字列を10進数に置き換える
    n = 0
    i = 1
    while i < 7
      m = x.substr(i, 1)
      n = n * 16 + @DEC(m)
      i++
    return n
    
  DEC:(x) ->
    onoff = 0
    HEX = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    y = 0
    j = 0
    while (j < 16 and onoff is 0)
      if x is HEX[j]
        y = j
        onoff = 1
      j++
    return y
    
module.exports = colorConverter  