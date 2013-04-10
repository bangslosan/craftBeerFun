var menuTable;

menuTable = (function() {

  function menuTable() {
    var backgroundColorBase, rows,
      _this = this;
    backgroundColorBase = '#222';
    this.backgroundColorSub = '#333';
    this.qiitaColor = '#59BB0C';
    this.fontThemeWhite = {
      top: 5,
      left: 5,
      color: "#fff",
      font: {
        fontSize: 12,
        fontWeight: "bold"
      }
    };
    this.rowColorTheme = {
      width: 255,
      left: 1,
      opacity: 0.8,
      borderColor: '#ededed',
      height: 40,
      backgroundColor: this.backgroundColorSub,
      selectedBackgroundColor: this.qiitaColor
    };
    this.menuTable = Ti.UI.createTableView({
      backgroundColor: backgroundColorBase,
      separatorStyle: 1,
      separatorColor: backgroundColorBase,
      zIndex: 1,
      width: 320,
      left: 0,
      top: 0
    });
    this.menuTable.addEventListener('click', function(e) {
      var curretRowIndex;
      rootWindow.toggleLeftView();
      curretRowIndex = e.index;
      _this.resetBackGroundColor(_this.menuTable.data[0].rows);
      return _this.menuTable.data[0].rows[curretRowIndex].backgroundColor = _this.qiitaColor;
    });
    rows = [this.makeAllLabelRow()];
    this.menuTable.setData(rows);
  }

  menuTable.prototype.getMenu = function() {
    return this.menuTable;
  };

  menuTable.prototype.makeAllLabelRow = function() {
    var allLabel, allLabelRow, allStockBtn,
      _this = this;
    allLabelRow = Ti.UI.createTableViewRow(this.rowColorTheme);
    allLabelRow.backgroundColor = this.qiitaColor;
    allLabelRow.selectedBackgroundColor = this.backgroundColorSub;
    allLabelRow.addEventListener('click', function(e) {
      return mainWindow.close();
    });
    allStockBtn = Ti.UI.createImageView({
      image: "ui/image/light_list.png",
      left: 5,
      top: 8,
      backgroundColor: "transparent"
    });
    allLabel = Ti.UI.createLabel({
      width: 255,
      height: 40,
      top: 0,
      left: 35,
      wordWrap: true,
      color: '#fff',
      font: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      text: "投稿一覧"
    });
    allLabelRow.className = "storedStocks";
    allLabelRow.add(allStockBtn);
    allLabelRow.add(allLabel);
    return allLabelRow;
  };

  menuTable.prototype.makeConfigRow = function() {
    var configAccountLabel, configBtn, configRow,
      _this = this;
    configRow = Ti.UI.createTableViewRow(this.rowColorTheme);
    configBtn = Ti.UI.createImageView({
      image: "ui/image/light_gear.png",
      left: 5,
      top: 5,
      backgroundColor: "transparent"
    });
    configAccountLabel = Ti.UI.createLabel(this.fontThemeWhite);
    configAccountLabel.text = "アカウント設定";
    configAccountLabel.top = 8;
    configAccountLabel.left = 35;
    configRow.addEventListener('click', function(e) {
      return _this.slideEvent(e.rowData.className);
    });
    configRow.className = "config";
    configRow.add(configBtn);
    configRow.add(configAccountLabel);
    return configRow;
  };

  menuTable.prototype.makeStockRow = function() {
    var stockBtn, stockLabel, stockRow,
      _this = this;
    stockBtn = Ti.UI.createImageView({
      image: "ui/image/light_list.png",
      left: 5,
      top: 5,
      backgroundColor: "transparent"
    });
    stockLabel = Ti.UI.createLabel(this.fontThemeWhite);
    stockLabel.text = "ストック一覧";
    stockLabel.top = 8;
    stockLabel.left = 35;
    stockRow = Ti.UI.createTableViewRow(this.rowColorTheme);
    stockRow.addEventListener('click', function(e) {
      return _this.slideEvent(e.rowData.className);
    });
    stockRow.className = "storedMyStocks";
    stockRow.add(stockBtn);
    stockRow.add(stockLabel);
    return stockRow;
  };

  menuTable.prototype.resetBackGroundColor = function(menuRows) {
    var menuRow, _i, _len, _results;
    menuRows = this.menuTable.data[0].rows;
    _results = [];
    for (_i = 0, _len = menuRows.length; _i < _len; _i++) {
      menuRow = menuRows[_i];
      if (menuRow.backgroundColor !== this.backgroundColorSub) {
        _results.push(menuRow.backgroundColor = this.backgroundColorSub);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return menuTable;

})();

module.exports = menuTable;
