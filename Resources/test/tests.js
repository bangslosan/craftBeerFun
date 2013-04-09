
(function() {});
if (testsEnabled) {
  Ti.include('lib/jasmine-1.3.1.js');
  Ti.include('lib/jasmine.async.min.js');
  require('lib/jasmine-titanium-console');
  require('test/facebook');
  jasmine.getEnv().addReporter(new jasmine.TitaniumReporter());
  jasmine.getEnv().execute();
}
