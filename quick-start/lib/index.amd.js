define(['exports'], function (exports) { 'use strict';

    function test1() {
      console.log('test1');
    }

    exports.test1 = test1;

    Object.defineProperty(exports, '__esModule', { value: true });

});
