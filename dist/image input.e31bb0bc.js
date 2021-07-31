// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"sourse/uploader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = upload;
console.log('upload');

function upload(selector) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  console.log(options);
  var input = document.querySelector(selector);
  var open = document.createElement('button');
  var $window = document.getElementById('up');
  open.classList.add('uploader-head__open');
  open.textContent = options.b1Text || 'Open';
  if (options.multi) input.setAttribute('multiple', true);
  input.insertAdjacentElement("afterend", open);

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','));
  }

  var changeHandler = function changeHandler(event) {
    if (event.target.files.lenght == 0) {
      return;
    }

    ;
    var files = Array.from(event.target.files);
    var $output = input.parentNode.parentNode.nextElementSibling;

    var _loop = function _loop(i) {
      var item = document.createElement('div');
      item.classList.add('uploader-item');
      var reader = new FileReader();

      reader.onload = function (ev) {
        console.log(ev);
        $output.insertAdjacentHTML("afterbegin", "<div class=\"uploader-item\">\n        <img src=\"".concat(ev.target.result, "\" class=\"uploader-item__img\" alt=\"\">\n        <div class=\"uploader-item__inform\">\n        <div class=\"uploader-item__delete\"><span data-btn=\"delete\">&times;<span></div>\n            <div class=\"uploader-item__footer\">\n                <span class=\"uploader-item__name\">").concat(files[i].name, "</span>\n                <span class=\"uploader-item__size\">").concat(kb(ev.loaded), " KB</span>\n            </div>\n        <div class=\"uploader-item__loading\">\n        <div class=\"uploader-item__loadbar\" data-load></div>\n        <span class=\"uploader-item__percent\" data-percent>0%</span> \n     </div>\n\n  </div>\n    </div>"));
      };

      reader.readAsDataURL(files[i]);
    };

    for (var i = 0; i < files.length; i++) {
      _loop(i);
    }

    var $uploader = $output.parentNode.querySelector('[data-btn="upload"]');
    var items;
    setTimeout(function () {
      items = document.getElementById('space').querySelectorAll('.uploader-item');
      console.log(items, $output, $uploader);
      items.lenght !== 0 ? $uploader.style.display = 'block' : $uploader.style.display = 'none';
      $uploader.addEventListener('click', arrload(items));
    }, 500);
    $window.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.dataset.btn == "upload") {
        loadItems(items, files);
      }

      if (e.target.dataset.btn == "delete") {
        var y = e.target.closest('.uploader-item');
        y.style.width = '0px';
        y.style.height = '0px';
        setTimeout(function () {
          return y.remove();
        }, 300);
      }
    });
  };

  function arrload(arr) {
    var delay = 0;

    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      delay += 3;
      element.querySelector('.uploader-item__img').classList.add('uploaded');
      element.querySelector('.uploader-item__img').style.animationDelay = delay / 10 + 's';
    }
  }

  function loadItems(items, files) {
    var _loop2 = function _loop2(i) {
      var element = items[i];
      element.classList.add('loading');
      var loadbar = element.querySelector('[data-load]');
      loadbar.style.animationDuration = files[i].size / 18000 + 's';
      loadbar.addEventListener('animationend', function () {
        numLoading(loadbar);
        var al = document.getElementById('alerts');
        al.insertAdjacentHTML("beforeend", alertLoading(files[i]));
        al.children ? al.classList.add('appear') : al.classList.remove('appear');
      });
    };

    for (var i = 0; i < items.length; i++) {
      _loop2(i);
    }
  }

  function numLoading(elem) {
    var num = elem.nextElementSibling;
    num.textContent = Math.floor(elem.offsetWidth / 1.5) + '%';
  }

  function alertLoading(element) {
    var template = "\n    <div class=\"upload-alerts__item appeared\">\n          <span> \u0412\u0430\u0448\u043E\u0433\u043E \u043A\u0430\u043D\u0434\u0438\u0434\u0430\u0442\u0430 \u043F\u0456\u0434 \u0456\u043C\u0435\u043D\u0435\u043C <a href=\"\">".concat(element.name, "</a>\n            \u0431\u0443\u043B\u043E \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0437\u0430\u043D\u0435\u0441\u0435\u043D\u043E \u0434\u043E \u0431\u0430\u0437\u0438 \u0434\u0430\u043D\u0438\u0445 </span> \n            <a href=\"\" class=\"croos\">&times;</a>\n        </div>\n    ");
    return template;
  }

  function kb(num) {
    return Math.floor(num / 1000);
  }

  open.addEventListener('click', function () {
    input.click();
  });
  input.addEventListener('change', changeHandler);
}
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sourse/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _uploader = require("./sourse/uploader.js");

require("./sourse/style.scss");

(0, _uploader.upload)('#input', {
  multi: true,
  b1Text: 'opening',
  b2Text: 'uploading',
  accept: ['.png', '.jpeg', '.jpg', '.psd']
});
},{"./sourse/uploader.js":"sourse/uploader.js","./sourse/style.scss":"sourse/style.scss"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59396" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/image%20input.e31bb0bc.js.map