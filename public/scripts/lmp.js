! function () {
  var d = "STATSCOREWidgetsEmbederScript";
  if (!window.document.getElementById(d)) {
    window.STATSCOREWidgets = {}, window.STATSCOREWidgets.onLoadCallbacks = [], window.STATSCOREWidgets.onLoad = function (d) {
      window.STATSCOREWidgets.onLoadCallbacks.push(d)
    };
    var n = window.document.createElement("script");
    n.src = "https://wgt-s3-cdn.statscore.com/bundle/Embeder.js", n.async = !0, n.id = d, n.addEventListener("error", function (d) {
      for (var n = 0; n < window.STATSCOREWidgets.onLoadCallbacks.length; n++) window.STATSCOREWidgets.onLoadCallbacks[n](d)
    }), window.document.body.appendChild(n)
  }
}();
