class Facebook
  constructor:() ->
    configJSON = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'config/facebook.json')
    file = configJSON.read().toString();
    @config = JSON.parse(file);
    
    
    
  login:() ->
    return true
  loginButton:() ->
    Ti.Facebook.appid = @config.AppID
    Ti.Facebook.permissions = ['publish_stream']
    button = Ti.Facebook.createLoginButton()
    return button
module.exports = Facebook  