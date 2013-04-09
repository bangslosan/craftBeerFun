var Facebook;

Facebook = (function() {

  function Facebook() {
    var configJSON, file;
    configJSON = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'config/facebook.json');
    file = configJSON.read().toString();
    this.config = JSON.parse(file);
  }

  Facebook.prototype.login = function() {
    return true;
  };

  Facebook.prototype.loginButton = function() {
    var button;
    Ti.Facebook.appid = this.config.AppID;
    Ti.Facebook.permissions = ['publish_stream'];
    button = Ti.Facebook.createLoginButton();
    return button;
  };

  return Facebook;

})();

module.exports = Facebook;
