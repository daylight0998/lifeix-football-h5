//工具集
let Toolkit = function(){
    var toolkit = {
        isLog: !1,
        log: function () {
            this.isLog && console.log(arguments)
        },
        now: function () {
            return +new Date
        },
        getCookie: function (e) {
            for (var t = e + "=", o = document.cookie.split(";"), n = 0; n < o.length; n++) {
                for (var r = o[n]; " " == r.charAt(0);)
                    r = r.substring(1);
                if (-1 != r.indexOf(t))
                    return r.substring(t.length, r.length)
            }
            return ""
        },
        setCookie: function (name:string, value:string, day?:any) {
            let expires = '';
            if(typeof day == 'number'){
                let date;
                date = new Date();
                date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = [name, '=', value, expires].join('');
        },
        clearCookie: function () {
            for (var e = document.cookie.split(";"), t = 0; t < e.length; t++) {
                var o = e[t]
                    , n = o.indexOf("=")
                    , r = n > -1 ? o.substr(0, n) : o;
                document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
            }
        },
        getLocalStorage: function () {
            return window.localStorage || {
                    getItem: function () {
                        return void 0
                    },
                    setItem: function () {
                    },
                    removeItem: function () {
                    },
                    key: function () {
                        return ""
                    }
                }
        },
        isApp: function () {
          var ua = window.navigator.userAgent;
          if ((ua).indexOf("LiFangSport") == -1 ) {
            return false;
          } else {
            return true;
          }
        }
    };
    return toolkit
}();
export {Toolkit};
