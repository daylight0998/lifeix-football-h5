/**
 * Created by mym_ on 16/9/12.
 */
// setting
(function(win, doc) {
    var isMobile = (function(userAgent) {
        'use strict';

        return !!userAgent.match(/android|webos|ip(hone|ad|od)|opera (mini|mobi|tablet)|iemobile|windows.+(phone|touch)|mobile|fennec|kindle (Fire)|Silk|maemo|blackberry|playbook|bb10\; (touch|kbd)|Symbian(OS)|Ubuntu Touch/i);
    }(navigator.userAgent));

    // 前提条件 ip6 的高清视觉稿
    var fixScreen = function() {
        var rootFootsize;
        var dpr;
        var docEl;
        var width;

        docEl = doc.documentElement;
        dpr = win.devicePixelRatio || 1;

        // 设置 html dpr值，用于 css hack
        //alert(dpr.toFixed(0));
        docEl.setAttribute('data-dpr', dpr.toFixed(0));

        var page = doc.querySelector('.ui-page');
        var pageContent = doc.querySelector('.ui-page-content');

        var refreshRem = function() {
            // 适配屏幕宽度为 320px - 540px
            width = Math.min(docEl.clientWidth, 540);
            width = width < 320 ? 320 : width;
            if (page) {
                // 设置page的最大最小宽度
                page.style.minWidth = 320 + 'px';
                page.style.maxWidth = 540 + 'px';

                // 设置 page 宽度
                page.style.width = width*dpr + 'px';
                pageContent.style.width = width*dpr + 'px';
            }

            // 将 ip6 视觉稿 rem 的值设置为 50，其他按比例处理
            rootFootsize = width / 10;

            // 设置 html 元素的字体大小基准值
            docEl.style.fontSize = rootFootsize + "px";
        };

        // 在页面调整时更新 rem
        win.addEventListener('resize', function(e) {
            refreshRem();
        }, false);

        // 在页面显示时更新 rem
        win.addEventListener('pageshow', function(e) {
            refreshRem();
        }, false);

        refreshRem();

        // 给js调用的，某一屏幕宽度下 rem 和 px 之间的转换函数
        window.px2rem = function(px) {
            return px / rootFootsize;
        };
        window.rem2px = function(rem) {
            return rem * rootFootsize;
        };

        window.rootFootsize = rootFootsize;
    };

    if (isMobile) {
        doc.addEventListener('DOMContentLoaded', fixScreen, false);
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.documentElement.style.fontSize = '37.5px';
        }, false);
    }
})(window, document);