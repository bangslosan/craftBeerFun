var Cloud, Coedo, CraftBeerTokyo, Facebook, MenuTable, SanktGallen, coedo, craftBeerTokyo, facebook, mainTable, mainWindow, maintable, mapView, mapWindow, menu, menuTable, moment, momentja, results, sanktGallen, tab1, tab2, tabGroup, tableView, testsEnabled, ticustomtab, webView, webViewContents, webViewHeader, webWindow, webview;

moment = require('lib/moment.min');

momentja = require('lib/momentja');

Cloud = require('ti.cloud');

ticustomtab = require('de.marcelpociot.ticustomtab');

ticustomtab.customText({
  textColor: '#dddddd',
  font: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

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
  mapView = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {
      latitude: 35.676564,
      longitude: 139.765076,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    },
    animate: true,
    regionFit: true,
    userLocation: true
  });
  mapView.addEventListener('regionChanged', function(e) {
    Ti.API.info("" + e.latitude + " and " + e.longitude);
    return Cloud.Places.query({
      page: 1,
      per_page: 20,
      where: {
        lnglat: {
          $nearSphere: [e.longitude, e.latitude],
          $maxDistance: 0.00126
        }
      }
    }, function(e) {
      var annotation, i, _results;
      if (e.success) {
        i = 0;
        _results = [];
        while (i < e.places.length) {
          annotation = Titanium.Map.createAnnotation({
            latitude: e.places[i].latitude,
            longitude: e.places[i].longitude,
            title: e.places[i].name,
            subtitle: "",
            pincolor: Titanium.Map.ANNOTATION_PURPLE,
            animate: false,
            leftButton: "images/atlanta.jpg",
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
          });
          mapView.addAnnotation(annotation);
          _results.push(i++);
        }
        return _results;
      } else {
        return Ti.API.info("no data");
      }
    });
  });
  mapWindow.add(mapView);
  webViewHeader = webview.retreiveWebViewHeader();
  webViewContents = webview.retreiveWebView();
  webWindow.add(webViewHeader);
  webWindow.add(webViewContents);
  tabGroup = Ti.UI.createTabGroup({
    tabsBackgroundColor: "#DD9F00"
  });
  tab1 = Ti.UI.createTab({
    window: mainWindow,
    title: '最新ニュース',
    icon: "ui/image/light_doc@2x.png"
  });
  mainWindow.hideNavBar();
  webWindow.showNavBar();
  mapWindow.hideNavBar();
  tab2 = Ti.UI.createTab({
    window: mapWindow,
    title: '探す',
    icon: "ui/image/light_locate@2x.png"
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
