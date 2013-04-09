class craftBeerTokyo
  constructor:() ->
  getFeedFromLocal:(callback) ->
    feedSample = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'model/craftBeerTokyoFeedSample.js')
    file = feedSample.read().toString()
    json = JSON.parse(file)
    entries = json.responseData.feed.entries
    callback(entries)
    
  getFeed:(callback) ->
    url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://craftbeer-tokyo.info/feed/&num=50"
    xhr = Ti.Network.createHTTPClient()
    xhr.open('GET',url)
    xhr.onload = ->
      Ti.API.info @.status
      if @.status is 200
        json = JSON.parse(@responseText)
        entries = json.responseData.feed.entries
        callback(entries)
      else
        Ti.API.info "Server seems to be down. status code is #{@.status}"
        
    xhr.onerror = (e) ->
      error = JSON.parse(@.responseText)
      Ti.API.info error
      
    xhr.send()
    return true  
module.exports = craftBeerTokyo  