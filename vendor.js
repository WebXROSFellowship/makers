/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/js/vendor/vendor.js ***!
  \*********************************/
var vendorz = {
  "ad": '345'
};
console.log(vendorz);
function mandelbrot(cX, cY, maxIter) {
  var zX = 0;
  var zY = 0;
  var n = 0;
  while (zX * zX + zY * zY <= 4 && n < maxIter) {
    var tempX = zX * zX - zY * zY + cX;
    zY = 2 * zX * zY + cY;
    zX = tempX;
    n++;
  }
  return n;
}
/******/ })()
;