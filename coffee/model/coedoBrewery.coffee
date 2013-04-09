class coedoBrewery
  constructor:() ->
  getFeedFromLocal:(callback) ->
    feedSample = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'model/coedoBreweryFeedSample.js')
    file = feedSample.read().toString()
    json = JSON.parse(file)
    entries = json.responseData.feed.entries
    callback(entries)
    
  getFeed:(callback) ->    
    url = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.coedobrewery.com/blog/feed/atom/&num=10"
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
module.exports = coedoBrewery    