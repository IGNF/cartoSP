var _paq = window._paq = window._paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u = 'https://qlf-matomo.ign.fr/';
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', '2']);
  _paq.push(['HeatmapSessionRecording::disable']);
  var g = document.createElement('script');
  g.async = true;
  g.src = u + 'matomo.js';
  document.head.appendChild(g);
})();
