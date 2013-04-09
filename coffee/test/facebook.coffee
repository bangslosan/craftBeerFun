describe 'facebook', ->

    
  it 'should be true', ->
    Facebook = require('model/facebook')
    facebook = new Facebook()

    expect(facebook.login()).toBe true