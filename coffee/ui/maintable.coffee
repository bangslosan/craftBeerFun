class mainTable
  constructor: () ->
    @table = Ti.UI.createTableView
      backgroundColor:'#fff3c8'
      # separatorColor: '#ccc'
      separatorStyle:"NONE"
      zIndex:2
      width:320
      left:0
      top:0
    @arrow = Ti.UI.createView
      backgroundImage:"ui/image/arrow.png"
      width:30
      height:30
      bottom:20
      left:20

      
    @statusMessage = Ti.UI.createLabel
      text:"引っ張って更新"
      left:55,
      width:220,
      bottom:35,
      height:"auto",
      color:"#000"
      textAlign:"center",
      font:{fontSize:13,fontWeight:"bold"}


    pullToRefresh = @._createPullToRefresh(
      backgroundColor: "#CCC"
      action: ->
        setTimeout (->
          refresh()
        ), 500
    )
    
    @pulling = false
    
    @table.headerPullView = pullToRefresh
    
    @table.addEventListener("scroll",(e) =>

      offset = e.contentOffset.y

      if offset <= -65.0 and not @pulling
        t = Ti.UI.create2DMatrix().scale(1)
        t = t.rotate(-180)
        @pulling = true
        @arrow.animate
          transform: t
          duration: 180
          
        @statusMessage.text = "指を離して更新"

      else if @pulling and offset > -65.0 and offset < 0
        @pulling = false
        t = Ti.UI.create2DMatrix().scale(1)
        @arrow.animate
          transform: t
          duration: 180
        mainContoroller.loadEntry()    
        @statusMessage.text = "引っ張って更新"
        
      else

    )

    
    
    @table.addEventListener('click',(e) =>
      # webview.contentsUpdate(e.rowData.data.encoded)
      webview.contentsUpdate(e.rowData.data.content)      
      webview.headerUpdate(e.rowData.data)
      tabGroup.activeTab.open(webWindow)

    )
    
  getTable: ()->
    return @table
  insertRow: (index,row)->
    @table.insertRowAfter(index,row,{animated:true})
    return true
    
  hideLastRow: () ->
    #以前の投稿が存在しない場合には、読み込むボタンを配置した
    # rowを非表示にしたいのでそのためのメソッド
    lastRow = @table.data[0].rows.length-1
    @table.deleteRow lastRow
    
  lastRowIndex: () ->
    # TableViewの行から2を引くことで最後のRowのindexを取得してるが
    # 理由は下記２点のため
    # 1.Rowの一番下にボタンとなるものを配置しているのでその分のRowを無視するためマイナス１する
    # 2.Rowの先頭は0から始まっているので、そのためにマイナス１する。

    return @table.data[0].rows.length-2
  createRow: (entry) ->
    row = Ti.UI.createTableViewRow
      # backgroundGradient:
      #   type: 'linear'
      #   startPoint:
      #     x:'0%'
      #     y:'0%'
      #   endPoint:
      #     x:'0%'
      #     y:'100%'
      #   colors: [
      #     color: '#fff3c8'
      #     position: 0.0
      #   ,      
      #     color: '#fff3b8'
      #     position: 0.7
      #   ,      
      #     color: '#fff3a8'
      #     position: 1.0
      #   ]
      width:320
      borderWidth:0
      # color:'#fff3c8'
      backgroundImage:"ui/image/bg.jpg"
      borderColor:'#fff3a8'
      height:350
      

    pubDate = moment(entry.publishedDate).fromNow()
    updateTime = Ti.UI.createLabel
      font:
        fontSize:10
      color:'#666'
      right:5
      top:230
      width:100
      textAlign:2
      height:15
      text:pubDate

    imagePath = @_retrevieImagePath(entry.content)
    
    
    pictImage = Ti.UI.createImageView
      image:imagePath
      # image: "http://craftbeer-tokyo.info/wp/wp-content/uploads/2013/03/IMG_4208_2.jpg"
      width:320
      height:420
      left:0
      top:0

    blob = pictImage.toBlob()
    blob.imageAsCropped
      height:200
      width:200
      x:-100
      y:-100


    imageView = Titanium.UI.createImageView
      image:blob
      top:2
      left:5

    pictImageContainer = Ti.UI.createImageView
      width:200
      height:200
      left:5
      top:5
      backgroundGradient:
        type: 'linear'
        startPoint:
          x:'0%'
          y:'0%'
        endPoint:
          x:'0%'
          y:'100%'
        colors: [
          color: '#fff'
          position: 0.0
        ,      
          color: '#fefefe'
          position: 0.7
        ,      
          color: '#eee'
          position: 1.0
        ]

    pictImageContainer.add imageView



    textLabel = Ti.UI.createLabel
      width:200
      height:20
      top:210
      left:20
      # color:'#DD9F00'
      color:'#224422'
      font:
        fontSize:14
        fontWeight:'bold'
      text:entry.title

      
    bodySummary = Ti.UI.createLabel
      width:220
      height:60
      left:25
      top:10
      color:"#444"
      borderRadius:3
      font:
        fontSize:12
      text:entry.content.replace(/<\/?[^>]+>/gi, "")

    container = Ti.UI.createView
      width:220
      height:250
      left:50
      top:5
      borderWidth:1
      borderColor:"#ccc"
      backgroundGradient:
        type: 'linear'
        startPoint:
          x:'0%'
          y:'0%'
        endPoint:
          x:'0%'
          y:'100%'
        colors: [
          color: '#fff'
          position: 0.0
        ,      
          color: '#fefefe'
          position: 0.8
        ,      
          color: '#eee'
          position: 1.0
        ]
    triangleImage = Ti.UI.createImageView
      width:15
      height:15
      left:60
      top:260
      borderRadius:3
      transform : Ti.UI.create2DMatrix().rotate(45)
      borderColor:"#bbb"
      borderWidth:1
      zIndex:0      
      backgroundColor:"#fff"
      
    breakLine = Ti.UI.createImageView
      width:15
      height:1
      left:60
      top:265
      zIndex:10
      backgroundColor:"#fff"
      
    messageBoxContainer = Ti.UI.createView
      width:270
      height:80
      left:25
      top:265
      zIndex:5            
      borderColor:"#bbb"
      borderWidth:1
      borderRadius:5
      backgroundGradient:
        type: 'linear'
        startPoint:
          x:'0%'
          y:'0%'
        endPoint:
          x:'0%'
          y:'100%'
        colors: [
          color: '#fff'
          position: 0.0
        ,      
          color: '#fefefe'
          position: 0.3
        ,      
          color: '#eee'
          position: 1.0
        ]
      
      
    pictImageContainer.add imageView
    container.add pictImageContainer
    container.add textLabel
    container.add updateTime
    
    messageBoxContainer.add bodySummary
    mainImage = container.toImage()
    imagedContainer = Ti.UI.createImageView
      image:mainImage
      width:220
      height:250
      left:50
      top:5
      
    verticalLine = Ti.UI.createImageView
      width:1
      height:350
      left:30
      top:0
      zIndex:1
      backgroundColor:"#ffdf88"
      


    row.add imagedContainer
    row.add triangleImage
    row.add breakLine
    row.add verticalLine
    
    row.add messageBoxContainer
    
    row.data = entry
    row.className = 'entry'

    return row
  createRowForLoadOldEntry: (storedTo) ->
    row = Ti.UI.createTableViewRow
      touchEnabled:false
      width:320
      height:50
      borderWidth:2
      backgroundColor:'#222',
      borderColor:'#ededed',
      selectedBackgroundColor:'#59BB0C'
    textLabel = Ti.UI.createLabel
      width:320
      height:50
      top:0
      left:0
      color:'#fff'
      font:
        fontSize:16
        fontWeight:'bold'
      text:'以前の投稿を読み込む',
      textAlign:1
    row.add(textLabel)
    row.className = 'loadOldEntry'
    row.storedTo = storedTo
    return row
    
  _createPullToRefresh: (parameters) ->
    loadingCallback = parameters.action
    
    view = Ti.UI.createView
      backgroundColor:parameters.backgroundColor
      width:320
      height:60

    
    view.add @arrow
    view.add @statusMessage
    
    return view
  _retrevieImagePath:(htmlElement) ->
    # url 全てを抜き出す
    urlList = htmlElement.match(/http[s]?\:\/\/[\w\+\$\;\?\.\%\,\!\#\~\*\/\:\@\&\\\=\_\-]+/g)
    _list =[]
    if urlList?
      for url in urlList
        # pngの画像ファイルを持つ物のみ取得
        if url.match(/.jpg/)
          _list.push(url)

    if _list.length is 0
      path = "ui/image/site-logo-80.png"
    else
      path = _list[0]
    return path
      
module.exports = mainTable


