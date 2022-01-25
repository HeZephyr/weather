(function() {
  let count = 1;
  const API_HOST = 'http://open.iot.10086.cn';

  function noop() {}

  function jsonp(url, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts;
      opts = {};
    }
    if (!opts) opts = {};

    const prefix = opts.prefix || 'callback';

    // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.
    const id = opts.name || prefix + count++;

    const param = opts.param || 'callback';
    const timeout = opts.timeout != null ? opts.timeout : 60000;
    const enc = encodeURIComponent;
    const target = document.getElementsByTagName('script')[0] || document.head;
    // eslint-disable-next-line prefer-const
    let script;
    let timer;

    if (timeout) {
      timer = setTimeout(function() {
        cleanup();
        if (fn) fn(new Error('Timeout'));
      }, timeout);
    }

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      window[id] = noop;
      if (timer) clearTimeout(timer);
    }

    function cancel() {
      if (window[id]) {
        cleanup();
      }
    }

    window[id] = function(data) {
      cleanup();
      if (fn) fn(null, data);
    };

    // add qs component
    url +=
      (~url.indexOf('?') ? '&' : '?') +
      param +
      '=' +
      enc(id) +
      '&_=' +
      new Date().getTime();
    url = url.replace('?&', '?');

    // create script
    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);

    return cancel;
  }

  function OneNetApi(apiKey) {
    if (!apiKey) {
      alert('初始化OneNetApi时必须传入apiKey！');
    }
    this._apiKey = encodeURIComponent(apiKey);
  }

  OneNetApi.prototype = {
    /**
     * 读取设备多个数据流
     * */
    getDataStreams: function(deviceId) {
      let doneCallBack;
      jsonp(
        API_HOST +
          '/api/jsonpresend?key=' +
          this._apiKey +
          '&method=GET&uri=devices/' +
          deviceId +
          '/datastreams',
        function(error, res) {
          // eslint-disable-next-line no-prototype-builtins
          if (error || !res.hasOwnProperty('data')) {
            res = {
              errno: 100,
              error: 'timeout'
            };
          }

          doneCallBack && doneCallBack(res);
        }
      );
      return {
        done: function(func) {
          doneCallBack = func;
        }
      };
    },
    /**
     * 获取数据点 cmds
     * */
    getDataPoints: function(deviceId, parameter) {
      let doneCallBack;
      let uri = 'devices/' + deviceId + '/datapoints';
      let uriComponent = '';
      if (parameter) {
        for (const i in parameter) {
          if (uriComponent) {
            uriComponent += encodeURIComponent('&');
          }
          uriComponent += i + '=' + encodeURIComponent(parameter[i]);
        }
        uri += encodeURIComponent('?') + uriComponent;
      }
      jsonp(
        API_HOST +
          '/api/jsonpresend?key=' +
          this._apiKey +
          '&method=GET&uri=' +
          uri,
        function(error, res) {
          // eslint-disable-next-line no-prototype-builtins
          if (error || !res.hasOwnProperty('data')) {
            res = {
              errno: 100,
              error: 'timeout'
            };
          }

          doneCallBack && doneCallBack(res);
        });
      return {
        done: function(func) {
          doneCallBack = func;
        }
      };
    },
    /**
      * 发送命令 /api/jsonpresend?callback=callback1&_=1&uri=cmds&method=cmds&key={APIkey}&device_id={设备ID}&sms={要发的指令
      * 
		*/
    sendCommand: function(deviceId, command) {
      let doneCallBack;
      jsonp(API_HOST + '/api/jsonpresend?key=' + this._apiKey + '&method=cmds&uri=cmds&device_id=' + deviceId + '&sms=' + encodeURIComponent(command), function(error, res) {
        if (error || !res.hasOwnProperty('errno')) {
          res = {
            errno: 100,
            error: 'timeout'
          };
        }

        doneCallBack && doneCallBack(res);
      });
      return {
        done: function(func) {
          doneCallBack = func;
        }
      };
    }
  };

  window.OneNetApi = OneNetApi;
})();

