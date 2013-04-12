var mainTable;

mainTable = (function() {

  function mainTable() {
    var pullToRefresh,
      _this = this;
    this.table = Ti.UI.createTableView({
      backgroundColor: '#ededed',
      separatorColor: '#ccc',
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
    var blob, bodySummary, breakLine, container, imagePath, imageView, imagedContainer, mainImage, messageBoxContainer, pictImage, pictImageContainer, pubDate, row, textLabel, triangleImage, updateTime;
    row = Ti.UI.createTableViewRow({
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
            color: '#eeeeee',
            position: 0.0
          }, {
            color: '#dddddd',
            position: 0.7
          }, {
            color: '#dcdcdc',
            position: 1.0
          }
        ]
      },
      width: 320,
      height: 350
    });
    pubDate = moment(entry.publishedDate).fromNow();
    updateTime = Ti.UI.createLabel({
      font: {
        fontSize: 10
      },
      color: '#666',
      right: 5,
      top: 230,
      width: 100,
      textAlign: 2,
      height: 15,
      text: pubDate
    });
    row.add(updateTime);
    imagePath = this._retrevieImagePath(entry.content);
    pictImage = Ti.UI.createImageView({
      image: imagePath,
      width: 320,
      height: 420,
      left: 0,
      top: 0
    });
    blob = pictImage.toBlob();
    blob.imageAsCropped({
      height: 200,
      width: 200,
      x: -100,
      y: -100
    });
    imageView = Titanium.UI.createImageView({
      image: blob,
      top: 2,
      left: 5
    });
    pictImageContainer = Ti.UI.createImageView({
      width: 210,
      height: 210,
      left: 5,
      top: 5,
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
            position: 0.7
          }, {
            color: '#eee',
            position: 1.0
          }
        ]
      }
    });
    pictImageContainer.add(imageView);
    textLabel = Ti.UI.createLabel({
      width: 200,
      height: 20,
      top: 210,
      left: 20,
      color: '#DD9F00',
      font: {
        fontSize: 14,
        fontWeight: 'bold'
      },
      text: entry.title
    });
    bodySummary = Ti.UI.createLabel({
      width: 220,
      height: 60,
      left: 25,
      top: 10,
      color: "#444",
      borderRadius: 3,
      font: {
        fontSize: 12
      },
      text: entry.content.replace(/<\/?[^>]+>/gi, "")
    });
    container = Ti.UI.createView({
      width: 220,
      height: 250,
      left: 50,
      top: 5,
      borderWidth: 1,
      borderColor: "#ccc",
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
            position: 0.8
          }, {
            color: '#eee',
            position: 1.0
          }
        ]
      }
    });
    triangleImage = Ti.UI.createImageView({
      width: 15,
      height: 15,
      left: 60,
      top: 260,
      borderRadius: 3,
      transform: Ti.UI.create2DMatrix().rotate(45),
      borderColor: "#bbb",
      borderWidth: 1,
      zIndex: 0,
      backgroundColor: "#fff"
    });
    breakLine = Ti.UI.createImageView({
      width: 15,
      height: 1,
      left: 60,
      top: 265,
      zIndex: 10,
      backgroundColor: "#fff"
    });
    messageBoxContainer = Ti.UI.createView({
      width: 270,
      height: 80,
      left: 25,
      top: 265,
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
    pictImageContainer.add(imageView);
    container.add(pictImageContainer);
    container.add(textLabel);
    container.add(updateTime);
    messageBoxContainer.add(bodySummary);
    mainImage = container.toImage();
    imagedContainer = Ti.UI.createImageView({
      image: mainImage,
      width: 220,
      height: 250,
      left: 50,
      top: 5
    });
    row.add(imagedContainer);
    row.add(triangleImage);
    row.add(breakLine);
    row.add(messageBoxContainer);
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
