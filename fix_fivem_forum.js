// ==UserScript==
// @name         FiveM forum cleanup
// @namespace    http://github.com/TGRHavoc
// @version      0.2
// @homepage     https://github.com/TGRHavoc/fix-fivem_forum
// @supportUrl   https://github.com/TGRHavoc/fix-fivem_forum/issues
// @updateUrl    https://raw.githubusercontent.com/TGRHavoc/fix-fivem_forum/master/fix_fivem_forum.js
// @description  makes forums.fivem.net better looking when using the dark theme
// @author       Jordan Dalton
// @match        https://forum.fivem.net/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

var css = [
    // fix comic sans font
    'body { font-family: \"Roboto\", sans-serif; }',
    // make read topics daker
    '.topic-list-item.visited a.title:not(.badge-notification), .latest-topic-list-item.visited a.title:not(.badge-notification), .category-topic-link.visited a.title:not(.badge-notification) { color: #848484; }',
    // Code highlighting (thanks to Vespura)
    'code{ background-color: #1e1e1e !important; border-radius: 2px; padding: 2px 4px; color: #d2d2d2 !important; font-weight: normal; } .hljs, .hljs-title{ color: #d2d2d2; font-weight: normal; } code.hljs{ padding: 20px; } .hljs-comment{ color: #50a64a; } .hljs-string, .hljs-meta-string, .hljs-subst{ color: #cb8d71; } .hljs-keyword, .hljs-literal{ color: #3574b9; } .hljs-params{ color: #dcdcdc; } .hljs-built_in{ color: #33a6aa; } .hljs-number{ color: #a6ce9b; } .hljs-deletion{ background-color: #ca3838; padding: 2px; line-height: 1.7em; } .hljs-addition{ background-color: #169616; padding: 2px; line-height: 1.7em; }',
    '.hljs-title, .hljs-name, .coffeescript .hljs-params, .scss .hljs-meta{ color: #ff4b4b; }',
    '.hljs-attr{ color: #03c700; }',

    // topic tags
    '.discourse-tag.simple, .discourse-tag.simple:visited, .discourse-tag.simple:hover { color: #009db1; }',
    // topic backgrounds (read and unread)
    '.topic-list-item { background-color: #003940; }',
    '.topic-list-item.visited { background-color: #212121; }',
];

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function isDarkThemeEnabled(){
    // discourse_theme_key = 33d0fb65-fe48-40a6-bf38-039253bb1944
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
        if (metas[i].getAttribute("name") == "discourse_theme_key") {
            var key = metas[i].getAttribute("content");
            return key == "33d0fb65-fe48-40a6-bf38-039253bb1944";
        }
    }
    console.error("NO discourse_theme_key META TAG FOUND");
    // No meta with the name "discourse_theme_key"
    return false;

}

(function() {
    'use strict';
    // Your code here...
    console.log("LOADED FIVEM CLEANER");
    if (!isDarkThemeEnabled()){
        console.log("Not running... Not using the dark theme");
        return;
    }

    for(var i  =0; i < css.length; i++){
        addGlobalStyle(css[i]);
    }
})();
