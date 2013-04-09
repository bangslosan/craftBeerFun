var Coedo, CraftBeerTokyo, Facebook, NappSlideMenu, SanktGallen, coedo, craftBeerTokyo, createCenterNavWindow, facebook, mainTable, mainWindow, maintable, moment, momentja, navController, results, rootWindow, sanktGallen, tableView, testsEnabled, webView, webViewContents, webViewHeader, webWindow, webview, winLeft;

moment = require('lib/moment.min');

momentja = require('lib/momentja');

testsEnabled = true;

if (testsEnabled === false) {
  require('test/tests');
} else {
  Facebook = require('model/facebook');
  facebook = new Facebook();
  maintable = require("ui/maintable");
  tableView = new maintable();
  mainTable = tableView.getTable();
  webView = require("ui/webView");
  webview = new webView();
  CraftBeerTokyo = require("model/craftBeerTokyo");
  craftBeerTokyo = new CraftBeerTokyo();
  Coedo = require("model/coedoBrewery");
  coedo = new Coedo();
  SanktGallen = require("model/sanktGallen");
  sanktGallen = new SanktGallen();
  mainWindow = Ti.UI.createWindow({
    title: "クラフトビール東京",
    barColor: "#DD9F00",
    backgroundColor: "#343434"
  });
  webWindow = Ti.UI.createWindow({
    title: "",
    barColor: "#DD9F00",
    backgroundColor: "#343434"
  });
  webViewHeader = webview.retreiveWebViewHeader();
  webViewContents = webview.retreiveWebView();
  webWindow.add(webViewHeader);
  webWindow.add(webViewContents);
  createCenterNavWindow = function() {
    var leftBtn, navController;
    leftBtn = Ti.UI.createButton({
      title: "Menu"
    });
    leftBtn.addEventListener("click", function() {
      rootWindow.toggleLeftView();
      rootWindow.setCenterhiddenInteractivity("TouchDisabledWithTapToCloseBouncing");
      return rootWindow.setPanningMode("NavigationBarPanning");
    });
    mainWindow.leftNavButton = leftBtn;
    mainWindow.add(mainTable);
    navController = Ti.UI.iPhone.createNavigationGroup({
      window: mainWindow
    });
    return navController;
  };
  winLeft = Ti.UI.createWindow({
    backgroundColor: "white"
  });
  navController = createCenterNavWindow();
  NappSlideMenu = require("dk.napp.slidemenu");
  rootWindow = NappSlideMenu.createSlideMenuWindow({
    centerWindow: navController,
    leftWindow: winLeft,
    leftLedge: 200
  });
  rootWindow.open();
  results = [];
  craftBeerTokyo.getFeedFromLocal(function(entries) {
    var entry, result, tableData, _i, _j, _len, _len1;
    for (_i = 0, _len = entries.length; _i < _len; _i++) {
      entry = entries[_i];
      results.push(entry);
    }
    coedo.getFeedFromLocal(function(entries) {
      var _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = entries.length; _j < _len1; _j++) {
        entry = entries[_j];
        _results.push(results.push(entry));
      }
      return _results;
    });
    sanktGallen.getFeedFromLocal(function(entries) {
      var _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = entries.length; _j < _len1; _j++) {
        entry = entries[_j];
        _results.push(results.push(entry));
      }
      return _results;
    });
    results.sort(function(a, b) {
      Ti.API.info("TITLE:" + a.title + " Date: " + (moment(a.publishedDate).format('YYYYMMDDHHmm')));
      if (moment(a.publishedDate).format("YYYYMMDDHHmm") > moment(b.publishedDate).format("YYYYMMDDHHmm")) {
        return -1;
      } else {
        return 1;
      }
    });
    tableData = [];
    for (_j = 0, _len1 = results.length; _j < _len1; _j++) {
      result = results[_j];
      tableData.push(tableView.createRow(result));
    }
    mainTable.setData(tableData);
    return mainWindow.open();
  });
}
