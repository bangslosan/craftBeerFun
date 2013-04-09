var sanktGallen;

sanktGallen = (function() {

  function sanktGallen() {}

  sanktGallen.prototype.getFeedFromLocal = function(callback) {
    var entries, feedSample, file, json;
    feedSample = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'model/sanktGallenFeedSample.js');
    file = feedSample.read().toString();
    json = JSON.parse(file);
    entries = json.responseData.feed.entries;
    return callback(entries);
  };

  sanktGallen.prototype.getFeed = function(callback) {
    var url, xhr;
    url = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.sanktgallenbrewery.com/usr-data/modules/extMdlBlogMngr/units/extMdlBlogMngrRssReader/getRssFeed.php?blog_id=1&num=10";
    xhr = Ti.Network.createHTTPClient();
    xhr.open('GET', url);
    xhr.onload = function() {
      var entries, json;
      Ti.API.info(this.status);
      if (this.status === 200) {
        json = JSON.parse(this.responseText);
        entries = json.responseData.feed.entries;
        return callback(entries);
      } else {
        return Ti.API.info("Server seems to be down. status code is " + this.status);
      }
    };
    xhr.onerror = function(e) {
      var error;
      error = JSON.parse(this.responseText);
      return Ti.API.info(error);
    };
    xhr.send();
    return true;
  };

  return sanktGallen;

})();

module.exports = sanktGallen;
