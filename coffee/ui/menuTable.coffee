class menuTable
  constructor: () ->
    backgroundColorBase = '#222'
    @backgroundColorSub = '#333'

    @qiitaColor = '#59BB0C'
    @fontThemeWhite =
      top: 5
      left: 5
      color: "#fff"
      font:
        fontSize: 12
        fontWeight: "bold"
        
    @rowColorTheme = 
      width:255
      left:1
      opacity:0.8
      borderColor:'#ededed'
      height:40
      backgroundColor:@backgroundColorSub
      selectedBackgroundColor:@qiitaColor
    
    @menuTable = Ti.UI.createTableView
      backgroundColor:backgroundColorBase
      separatorStyle:1
      separatorColor:backgroundColorBase
      zIndex:1
      width:320
      left:0
      top:0
      
    @menuTable.addEventListener('click',(e) =>
      rootWindow.toggleLeftView()
      curretRowIndex = e.index
      @.resetBackGroundColor(@menuTable.data[0].rows)
      # クリックされたrowの色を'#59BB0C'に設定
      @menuTable.data[0].rows[curretRowIndex].backgroundColor = @qiitaColor      

    )
    
    rows = [@makeAllLabelRow()]

    @menuTable.setData rows

    
  getMenu:() ->
    return @menuTable
    
  makeAllLabelRow:() ->
    allLabelRow = Ti.UI.createTableViewRow(@rowColorTheme)
    allLabelRow.backgroundColor = @qiitaColor
    allLabelRow.selectedBackgroundColor = @backgroundColorSub

    allLabelRow.addEventListener('click',(e) =>
      

    )
    
    allStockBtn = Ti.UI.createImageView
      image:"ui/image/light_list.png"
      left:5
      top:8
      backgroundColor:"transparent"
    
    allLabel = Ti.UI.createLabel
      width:255
      height:40
      top:0
      left:35
      wordWrap:true
      color:'#fff'
      font:
        fontSize:12
        fontWeight:'bold'
      text:"投稿一覧"
      
    allLabelRow.className = "storedStocks"
    allLabelRow.add allStockBtn
    allLabelRow.add allLabel
    return allLabelRow
    
  makeConfigRow:() ->
    configRow = Ti.UI.createTableViewRow(@rowColorTheme)    
    configBtn = Ti.UI.createImageView
      image:"ui/image/light_gear.png"
      left:5
      top:5
      backgroundColor:"transparent"
      
    configAccountLabel = Ti.UI.createLabel(@fontThemeWhite)
      
    configAccountLabel.text = "アカウント設定"
    configAccountLabel.top = 8
    configAccountLabel.left = 35


      
    configRow.addEventListener('click',(e) =>

      @.slideEvent(e.rowData.className)
    )
  
    configRow.className = "config"
    configRow.add configBtn
    configRow.add configAccountLabel
    return configRow

  makeStockRow:() ->
    stockBtn = Ti.UI.createImageView
      image:"ui/image/light_list.png"
      left:5
      top:5
      backgroundColor:"transparent"
      
    stockLabel = Ti.UI.createLabel(@fontThemeWhite)
      
    stockLabel.text = "ストック一覧"
    stockLabel.top = 8
    stockLabel.left = 35

    stockRow = Ti.UI.createTableViewRow(@rowColorTheme)
    stockRow.addEventListener('click',(e) =>
      @.slideEvent(e.rowData.className)
    )
    stockRow.className = "storedMyStocks"
    stockRow.add stockBtn
    stockRow.add stockLabel

    return stockRow


  resetBackGroundColor: (menuRows) ->
    menuRows = @menuTable.data[0].rows
    for menuRow in menuRows
      if menuRow.backgroundColor isnt @backgroundColorSub
        menuRow.backgroundColor = @backgroundColorSub

        
    
module.exports = menuTable