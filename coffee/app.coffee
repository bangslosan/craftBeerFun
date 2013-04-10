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
    backgroundColor: "#343434"


  webWindow = Ti.UI.createWindow
    title: ""
    barColor:"#DD9F00"
    backgroundColor: "#343434"
    
  webViewHeader = webview.retreiveWebViewHeader()
  webViewContents = webview.retreiveWebView()
  webWindow.add webViewHeader
  webWindow.add webViewContents

  createCenterNavWindow = ->
    leftBtn = Ti.UI.createButton(title: "Menu")
    leftBtn.addEventListener "click", ->
      rootWindow.toggleLeftView()
      rootWindow.setCenterhiddenInteractivity "TouchDisabledWithTapToCloseBouncing"
      rootWindow.setPanningMode "NavigationBarPanning"

    mainWindow.leftNavButton = leftBtn
    mainWindow.add mainTable

    navController = Ti.UI.iPhone.createNavigationGroup(window: mainWindow)
    return navController
    
  
  winLeft = Ti.UI.createWindow(backgroundColor: "white")
  winLeft.add menu
  navController = createCenterNavWindow()
  

  # NappSlideMenu WINDOW
  NappSlideMenu = require("dk.napp.slidemenu")
  rootWindow = NappSlideMenu.createSlideMenuWindow(
    centerWindow: navController
    leftWindow: winLeft
    leftLedge:200
  )

  rootWindow.open()    
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
      Ti.API.info "TITLE:#{a.title} Date: #{moment(a.publishedDate).format('YYYYMMDDHHmm')}"

      (if moment(a.publishedDate).format("YYYYMMDDHHmm") > moment(b.publishedDate).format("YYYYMMDDHHmm") then -1 else 1)
    )
    tableData = []

    for result in results
      tableData.push tableView.createRow(result)
    
    mainTable.setData tableData
    
    mainWindow.open()
  )
  
