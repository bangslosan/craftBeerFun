# 外部のライブラリ読み込み 
moment = require('lib/moment.min')
momentja = require('lib/momentja')

testsEnabled = true

if testsEnabled is false
  require('test/tests')
else
  Facebook = require('model/facebook')
  facebook = new Facebook()
  
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

  mapTitle = Ti.UI.createLabel
    text:'map'
    left:5
    top:5
    font:
      fontSize:16
      fontWeight:'bold'


  mapWindow.add mapTitle

    
  webViewHeader = webview.retreiveWebViewHeader()
  webViewContents = webview.retreiveWebView()
  webWindow.add webViewHeader
  webWindow.add webViewContents

  tabGroup = Ti.UI.createTabGroup
    tabsBackgroundColor:"#DD9F00"
    
  tab1 = Ti.UI.createTab
    window:mainWindow
    title:'最新ニュース'
    
  mainWindow.hideNavBar()
  mapWindow.hideNavBar()
  
  tab2 = Ti.UI.createTab
    window:mapWindow
    title:'探す'
    
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
  
