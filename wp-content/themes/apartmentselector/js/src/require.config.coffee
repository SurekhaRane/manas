requirejs.config
   urlArgs : "?ver=#{Math.random()}"
   baseUrl : '../wp-content/themes/apartmentselector/js'
   paths :
      jquery : 'src/bower_components/jquery/dist/jquery'
      jqueryvalidate : 'src/bower_components/jquery.validation/dist/jquery.validate'
      bootstrap : 'src/bower_components/bootstrap/dist/js/bootstrap.min'
      jasmineajax : 'src/bower_components/jasmine-ajax/lib/mock-ajax'
      jasminejquery : 'src/bower_components/jasmine-jquery/lib/jasmine-jquery'
   shim :
      jqueryvalidate : [ 'jquery' ]
      bootstrap : [ 'jquery' ]