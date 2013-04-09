
describe('facebook', function() {
  return it('should be true', function() {
    var Facebook, facebook;
    Facebook = require('model/facebook');
    facebook = new Facebook();
    return expect(facebook.login()).toBe(true);
  });
});
