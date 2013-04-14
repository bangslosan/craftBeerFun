# 外部のライブラリ読み込み 
moment = require('lib/moment.min')
momentja = require('lib/momentja')
Cloud = require('ti.cloud')
ticustomtab = require('de.marcelpociot.ticustomtab')
ticustomtab.customText
  textColor:      '#dddddd'
  font:
    fontSize:   14
    fontWeight: 'bold'

testsEnabled = true

if testsEnabled is false
  require('test/tests')
else
  Facebook = require('model/facebook')
  facebook = new Facebook()
  
  ColorConverter = require("ui/colorConverter")
  colorConverter = new ColorConverter()

  Ti.API.info colorConverter.paleAleColor()
  
  
  maintable = require("ui/maintable")
  tableView = new maintable()
  mainTable = tableView.getTable()

  MenuTable = require('ui/menuTable')
  menuTable = new MenuTable()
  menu = menuTable.getMenu()
  
  webView = require("ui/webView")
  webview = new webView()
  
  CraftBeerTokyo = require("model/craftBeerTokyo")
  craftBeerTokyo = new CraftBeerTokyo()

  Coedo = require("model/coedoBrewery")
  coedo = new Coedo()
  SanktGallen = require("model/sanktGallen")
  sanktGallen = new SanktGallen()

  mainWindow = Ti.UI.createWindow
    title: "クラフトビール東京"
    barColor:"#DD9F00"
    backgroundColor: "#fff"


  webWindow = Ti.UI.createWindow
    title: ""
    barColor:"#DD9F00"
    backgroundColor: "#fff"
    
  mapWindow = Ti.UI.createWindow
    title: "お店の情報"
    barColor:"#DD9F00"
    backgroundColor: "#343434"

  mapView = Titanium.Map.createView
    mapType: Titanium.Map.STANDARD_TYPE
    region: 
      latitude:35.676564
      longitude:139.765076
      # 1.0から0.001の間で縮尺尺度を示している。
      # 数値が大きい方が広域な地図になる。donayamaさんの書籍P.179の解説がわかりやすい
      latitudeDelta:0.01
      longitudeDelta:0.01
    animate:true
    regionFit:true
    userLocation:true
    
  mapView.addEventListener('regionChanged',(e)->
    Ti.API.info "#{ e.latitude} and #{e.longitude}"
    Cloud.Places.query
      page: 1
      per_page: 20
      where:
        lnglat:
          $nearSphere: [e.longitude, e.latitude] # [longitude latitude]
          $maxDistance: 0.00126
    , (e) ->
      if e.success
        i = 0
        while i < e.places.length
            
          annotation = Titanium.Map.createAnnotation(
            latitude: e.places[i].latitude
            longitude: e.places[i].longitude
            title: e.places[i].name
            subtitle: ""
            pincolor: Titanium.Map.ANNOTATION_PURPLE
            animate: false
            leftButton: "images/atlanta.jpg"
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
          )
          mapView.addAnnotation annotation
          
          i++          
          
      else
        Ti.API.info "no data"
    

  )

  mapWindow.add mapView

    
  webViewHeader = webview.retreiveWebViewHeader()
  webViewContents = webview.retreiveWebView()
  webWindow.add webViewHeader
  webWindow.add webViewContents

  tabGroup = Ti.UI.createTabGroup
    tabsBackgroundColor:"#DD9F00"
    tabsBackgroundFocusedColor:"#DD9F00"
    tabsBackgroundSelectedColor:"DD9933"
    
  tab1 = Ti.UI.createTab
    window:mainWindow
    title:'最新ニュース'
    icon:"ui/image/radio-tower.png"

    
  # mainWindow.hideNavBar()
  webWindow.showNavBar()
  mapWindow.hideNavBar()
  
  tab2 = Ti.UI.createTab
    window:mapWindow
    title:'探す'
    icon:"ui/image/marker.png"

    
  tabGroup.addTab tab1
  tabGroup.addTab tab2
  tabGroup.open()
  
  results = []
  craftBeerTokyo.getFeedFromLocal((entries)->
    for entry in entries
      results.push entry

    coedo.getFeedFromLocal((entries)->
      for entry in entries
        results.push entry
    )
    
    sanktGallen.getFeedFromLocal((entries)->
      for entry in entries
        results.push entry

    )        
    
    # 各エントリがマージされているのでpublishedDateにて最新投稿日順にソート。
    # http://d.hatena.ne.jp/yatemmma/20110723/1311534794を参考に実装
    # なお比較した結果、1を最初に返すと更新日古い順番にソートされる
    results.sort( (a, b) ->

      (if moment(a.publishedDate).format("YYYYMMDDHHmm") > moment(b.publishedDate).format("YYYYMMDDHHmm") then -1 else 1)
    )
    tableData = []

    for result in results
      tableData.push tableView.createRow(result)
    
    mainTable.setData tableData
    mainWindow.add mainTable

  )
  
