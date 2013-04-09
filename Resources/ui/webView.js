var webView;

webView = (function() {

  function webView() {
    var bootstrapCSS, file;
    this.webViewHeaderContainer = Ti.UI.createLabel({
      top: 0,
      left: 0,
      width: 320,
      height: 80,
      backgroundColor: '#141414'
    });
    file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'ui/css/bootstrap.min.css');
    this.css = file.read();
    bootstrapCSS = 'ui/css/bootstrap.min.css';
    this.htmlHeaderElement = "<html><head><meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1'><link rel='stylesheet' href='" + file + "' type='text/css'></link></head>";
    this.web = Ti.UI.createWebView({
      top: 80,
      left: 0,
      zIndex: 5,
      width: 320,
      html: "init"
    });
    this.titleLabel = Ti.UI.createLabel({
      font: {
        fontWeight: 'bold',
        fontSize: 16
      },
      color: '#fff',
      top: 10,
      left: 10,
      width: 290,
      height: 50,
      text: "no title"
    });
    this.dateLabel = Ti.UI.createLabel({
      font: {
        fontSize: 12
      },
      textAlign: 2,
      color: '#fff',
      top: 65,
      left: 80,
      width: 220,
      height: 15,
      text: "no date"
    });
  }

  webView.prototype.retreiveWebView = function() {
    return this.web;
  };

  webView.prototype.retreiveWebViewHeader = function() {
    return this.webViewHeaderContainer;
  };

  webView.prototype.headerUpdate = function(json) {
    this.titleLabel.text = json.title;
    this.dateLabel.text = '投稿日：' + json.pubDate;
    this.webViewHeaderContainer.add(this.titleLabel);
    this.webViewHeaderContainer.add(this.dateLabel);
    return true;
  };

  webView.prototype.contentsUpdate = function(body) {
    this.web.html = "" + this.htmlHeaderElement + body + "</body></html>";
    return true;
  };

  webView.prototype.show = function() {
    return this.web.show();
  };

  webView.prototype.setStockUUID = function(stockUUID) {
    this.stockUUID = stockUUID;
  };

  webView.prototype.setStockURL = function(stockURL) {
    this.stockURL = stockURL;
  };

  webView.prototype.getStockUUID = function() {
    return this.stockUUID;
  };

  webView.prototype.getStockURL = function() {
    return this.stockURL;
  };

  return webView;

})();

module.exports = webView;
