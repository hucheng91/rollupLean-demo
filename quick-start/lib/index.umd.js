(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Demo = {}));
}(this, function (exports) { 'use strict';

    function test1() {
      console.log('test1');
    }

    exports.test1 = test1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
