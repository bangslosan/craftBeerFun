var mainTable;

mainTable = (function() {

  function mainTable() {
    var pullToRefresh,
      _this = this;
    this.table = Ti.UI.createTableView({
      backgroundColor: '#fff3c8',
      separatorStyle: "NONE",
      zIndex: 2,
      width: 320,
      left: 0,
      top: 0
    });
    this.arrow = Ti.UI.createView({
      backgroundImage: "ui/image/arrow.png",
      width: 30,
      height: 30,
      bottom: 20,
      left: 20
    });
    this.statusMessage = Ti.UI.createLabel({
      text: "引っ張って更新",
      left: 55,
      width: 220,
      bottom: 35,
      height: "auto",
      color: "#000",
      textAlign: "center",
      font: {
        fontSize: 13,
        fontWeight: "bold"
      }
    });
    pullToRefresh = this._createPullToRefresh({
      backgroundColor: "#CCC",
      action: function() {
        return setTimeout((function() {
          return refresh();
        }), 500);
      }
    });
    this.pulling = false;
    this.table.headerPullView = pullToRefresh;
    this.table.addEventListener("scroll", function(e) {
      var offset, t;
      offset = e.contentOffset.y;
      if (offset <= -65.0 && !_this.pulling) {
        t = Ti.UI.create2DMatrix().scale(1);
        t = t.rotate(-180);
        _this.pulling = true;
        _this.arrow.animate({
          transform: t,
          duration: 180
        });
        return _this.statusMessage.text = "指を離して更新";
      } else if (_this.pulling && offset > -65.0 && offset < 0) {
        _this.pulling = false;
        t = Ti.UI.create2DMatrix().scale(1);
        _this.arrow.animate({
          transform: t,
          duration: 180
        });
        mainContoroller.loadEntry();
        return _this.statusMessage.text = "引っ張って更新";
      } else {

      }
    });
    this.table.addEventListener('click', function(e) {
      webview.contentsUpdate(e.rowData.data.content);
      webview.headerUpdate(e.rowData.data);
      return tabGroup.activeTab.open(webWindow);
    });
  }

  mainTable.prototype.getTable = function() {
    return this.table;
  };

  mainTable.prototype.insertRow = function(index, row) {
    this.table.insertRowAfter(index, row, {
      animated: true
    });
    return true;
  };

  mainTable.prototype.hideLastRow = function() {
    var lastRow;
    lastRow = this.table.data[0].rows.length - 1;
    return this.table.deleteRow(lastRow);
  };

  mainTable.prototype.lastRowIndex = function() {
    return this.table.data[0].rows.length - 2;
  };

  mainTable.prototype.createRow = function(entry) {
    var breakLine, container, imagePath, messageBoxContainer, pointer, row, triangleImage, verticalLine;
    row = Ti.UI.createTableViewRow({
      width: 320,
      borderWidth: 0,
      selectedBackgroundColor: "#ffcc66",
      backgroundImage: "ui/image/bg.jpg",
      borderColor: '#fff3a8',
      height: 200
    });
    imagePath = this._retrevieImagePath(entry.content);
    if (imagePath === "ui/image/site-logo-80.png") {
      row.height = 80;
      container = this._createContainerForTopics(entry.publishedDate, entry.title, entry.content);
    } else {
      container = this._createContainerForTopicsWithPicture(imagePath, entry.publishedDate, entry.title, entry.content);
    }
    row.add(container);
    triangleImage = Ti.UI.createImageView({
      width: 15,
      height: 15,
      left: 40,
      top: 30,
      borderRadius: 3,
      transform: Ti.UI.create2DMatrix().rotate(45),
      borderColor: "#bbb",
      borderWidth: 1,
      zIndex: 0,
      backgroundColor: "#fff"
    });
    breakLine = Ti.UI.createImageView({
      width: 1,
      height: 15,
      left: 45,
      top: 30,
      zIndex: 10,
      backgroundColor: "#fff"
    });
    messageBoxContainer = Ti.UI.createView({
      width: 270,
      height: 180,
      left: 45,
      top: 5,
      zIndex: 5,
      borderColor: "#bbb",
      borderWidth: 1,
      borderRadius: 5,
      backgroundGradient: {
        type: 'linear',
        startPoint: {
          x: '0%',
          y: '0%'
        },
        endPoint: {
          x: '0%',
          y: '100%'
        },
        colors: [
          {
            color: '#fff',
            position: 0.0
          }, {
            color: '#fefefe',
            position: 0.3
          }, {
            color: '#eee',
            position: 1.0
          }
        ]
      }
    });
    row.add(triangleImage);
    row.add(breakLine);
    verticalLine = Ti.UI.createImageView({
      width: 1,
      height: 240,
      left: 30,
      top: 0,
      zIndex: 1,
      backgroundColor: "#ffdf88"
    });
    pointer = Ti.UI.createImageView({
      width: 15,
      height: 15,
      left: 22,
      top: 33,
      zIndex: 2,
      borderWidth: 2,
      borderColor: "#ffcc66",
      backgroundColor: "#fff",
      borderRadius: 10
    });
    row.add(verticalLine);
    row.add(pointer);
    row.data = entry;
    row.className = 'entry';
    return row;
  };

  mainTable.prototype.createRowForLoadOldEntry = function(storedTo) {
    var row, textLabel;
    row = Ti.UI.createTableViewRow({
      touchEnabled: false,
      width: 320,
      height: 50,
      borderWidth: 2,
      backgroundColor: '#222',
      borderColor: '#ededed',
      selectedBackgroundColor: '#59BB0C'
    });
    textLabel = Ti.UI.createLabel({
      width: 320,
      height: 50,
      top: 0,
      left: 0,
      color: '#fff',
      font: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      text: '以前の投稿を読み込む',
      textAlign: 1
    });
    row.add(textLabel);
    row.className = 'loadOldEntry';
    row.storedTo = storedTo;
    return row;
  };

  mainTable.prototype._createContainerForTopicsWithPicture = function(imagePath, publishedDate, title, content) {
    var bodySummary, messageBoxContainer, pictContainer, pictImage, pubDate, titleLabel, updateTime;
    Ti.API.info("picture container");
    pictContainer = Ti.UI.createView({
      width: 300,
      height: 120,
      left: 0,
      top: 60,
      zIndex: 5,
      borderWidth: 0
    });
    pictImage = Ti.UI.createImageView({
      image: imagePath,
      width: 320,
      height: 480,
      left: 0,
      top: 0
    });
    pictContainer.add(pictImage);
    pubDate = moment(publishedDate).fromNow();
    updateTime = Ti.UI.createLabel({
      font: {
        fontSize: 10
      },
      color: '#666',
      left: 5,
      top: 10,
      width: 100,
      height: 15,
      text: pubDate,
      zIndex: 10
    });
    titleLabel = Ti.UI.createLabel({
      width: 250,
      height: 20,
      top: 5,
      left: 5,
      color: '#224422',
      font: {
        fontSize: 14,
        fontWeight: 'bold'
      },
      text: title
    });
    bodySummary = Ti.UI.createLabel({
      width: 220,
      height: 40,
      left: 25,
      top: 20,
      color: "#444",
      borderRadius: 3,
      font: {
        fontSize: 12
      },
      text: content.replace(/<\/?[^>]+>/gi, "")
    });
    messageBoxContainer = Ti.UI.createView({
      width: 270,
      height: 180,
      left: 45,
      top: 5,
      zIndex: 5,
      borderColor: "#bbb",
      borderWidth: 1,
      borderRadius: 5,
      backgroundGradient: {
        type: 'linear',
        startPoint: {
          x: '0%',
          y: '0%'
        },
        endPoint: {
          x: '0%',
          y: '100%'
        },
        colors: [
          {
            color: '#fff',
            position: 0.0
          }, {
            color: '#fefefe',
            position: 0.3
          }, {
            color: '#eee',
            position: 1.0
          }
        ]
      }
    });
    messageBoxContainer.add(titleLabel);
    messageBoxContainer.add(bodySummary);
    messageBoxContainer.add(pictContainer);
    return messageBoxContainer;
  };

  mainTable.prototype._createContainerForTopics = function(publishedDate, title, content) {
    var bodySummary, messageBoxContainer, pubDate, titleLabel, updateTime;
    Ti.API.info("no picture container ");
    pubDate = moment(publishedDate).fromNow();
    updateTime = Ti.UI.createLabel({
      font: {
        fontSize: 10
      },
      color: '#666',
      left: 5,
      top: 10,
      width: 100,
      height: 15,
      text: pubDate,
      zIndex: 10
    });
    titleLabel = Ti.UI.createLabel({
      width: 250,
      height: 20,
      top: 5,
      left: 5,
      color: '#224422',
      font: {
        fontSize: 14,
        fontWeight: 'bold'
      },
      text: title
    });
    bodySummary = Ti.UI.createLabel({
      width: 220,
      height: 40,
      left: 25,
      top: 20,
      color: "#444",
      borderRadius: 3,
      font: {
        fontSize: 12
      },
      text: content.replace(/<\/?[^>]+>/gi, "")
    });
    messageBoxContainer = Ti.UI.createView({
      width: 270,
      height: 60,
      left: 45,
      top: 5,
      zIndex: 5,
      borderColor: "#bbb",
      borderWidth: 1,
      borderRadius: 5,
      backgroundGradient: {
        type: 'linear',
        startPoint: {
          x: '0%',
          y: '0%'
        },
        endPoint: {
          x: '0%',
          y: '100%'
        },
        colors: [
          {
            color: '#fff',
            position: 0.0
          }, {
            color: '#fefefe',
            position: 0.3
          }, {
            color: '#eee',
            position: 1.0
          }
        ]
      }
    });
    messageBoxContainer.add(titleLabel);
    messageBoxContainer.add(bodySummary);
    return messageBoxContainer;
  };

  mainTable.prototype._createPullToRefresh = function(parameters) {
    var loadingCallback, view;
    loadingCallback = parameters.action;
    view = Ti.UI.createView({
      backgroundColor: parameters.backgroundColor,
      width: 320,
      height: 60
    });
    view.add(this.arrow);
    view.add(this.statusMessage);
    return view;
  };

  mainTable.prototype._retrevieImagePath = function(htmlElement) {
    var path, url, urlList, _i, _len, _list;
    urlList = htmlElement.match(/http[s]?\:\/\/[\w\+\$\;\?\.\%\,\!\#\~\*\/\:\@\&\\\=\_\-]+/g);
    _list = [];
    if (urlList != null) {
      for (_i = 0, _len = urlList.length; _i < _len; _i++) {
        url = urlList[_i];
        if (url.match(/.jpg/)) {
          _list.push(url);
        }
      }
    }
    if (_list.length === 0) {
      path = "ui/image/site-logo-80.png";
    } else {
      path = _list[0];
    }
    return path;
  };

  return mainTable;

})();

module.exports = mainTable;
