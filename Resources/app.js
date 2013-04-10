var Coedo, CraftBeerTokyo, Facebook, MenuTable, SanktGallen, coedo, craftBeerTokyo, facebook, mainTable, mainWindow, maintable, mapTitle, mapWindow, menu, menuTable, moment, momentja, results, sanktGallen, tab1, tab2, tabGroup, tableView, testsEnabled, webView, webViewContents, webViewHeader, webWindow, webview;

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
  MenuTable = require('ui/menuTable');
  menuTable = new MenuTable();
  menu = menuTable.getMenu();
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
    backgroundColor: "#fff"
  });
  webWindow = Ti.UI.createWindow({
    title: "",
    barColor: "#DD9F00",
    backgroundColor: "#fff"
  });
  mapWindow = Ti.UI.createWindow({
    title: "お店の情報",
    barColor: "#DD9F00",
    backgroundColor: "#343434"
  });
  mapTitle = Ti.UI.createLabel({
    text: 'map',
    left: 5,
    top: 5,
    font: {
      fontSize: 16,
      fontWeight: 'bold'
    }
  });
  mapWindow.add(mapTitle);
  webViewHeader = webview.retreiveWebViewHeader();
  webViewContents = webview.retreiveWebView();
  webWindow.add(webViewHeader);
  webWindow.add(webViewContents);
  tabGroup = Ti.UI.createTabGroup({
    tabsBackgroundColor: "#DD9F00"
  });
  tab1 = Ti.UI.createTab({
    window: mainWindow,
    title: '最新ニュース'
  });
  mainWindow.hideNavBar();
  mapWindow.hideNavBar();
  tab2 = Ti.UI.createTab({
    window: mapWindow,
    title: '探す'
  });
  tabGroup.addTab(tab1);
  tabGroup.addTab(tab2);
  tabGroup.open();
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
    return mainWindow.add(mainTable);
  });
}
