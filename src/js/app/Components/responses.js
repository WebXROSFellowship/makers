
console.log("HELLO WORLD");
AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'red'}
    },
    init: function() {
      console.log("INIT");
      var data = this.data;
      var el = this.el;  // <a-box>
      el.addEventListener('mouseenter', function() {
        console.log("MOUSE ENTER");
        el.setAttribute('material', 'color', data.color);
      });
      el.addEventListener('mouseleave', function() {
        console.log("MOUSE LEAVE");
        el.setAttribute('material', 'color', 'pink');
      });

    }
});
