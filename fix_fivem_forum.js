// ==UserScript==
// @name         FiveM forum cleanup
// @namespace    http://github.com/TGRHavoc
// @version      0.0.5
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
    // Code highlighting ( * Author: Nicolas LLOBERA <nllobera@gmail.com>)
    'code{background-color:#1e1e1e!important;border-radius:2px;padding:2px 4px;color:#d2d2d2!important;font-weight:400}.hljs{display:block;overflow-x:auto;padding:.5em;background:#1E1E1E;color:#DCDCDC}.hljs-addition,.hljs-deletion{display:inline-block;width:100%}.hljs-keyword,.hljs-link,.hljs-literal,.hljs-name,.hljs-symbol{color:#569CD6}.hljs-link{text-decoration:underline}.hljs-built_in,.hljs-type{color:#4EC9B0}.hljs-class,.hljs-number{color:#B8D7A3}.hljs-meta-string,.hljs-string{color:#D69D85}.hljs-regexp,.hljs-template-tag{color:#9A5334}.hljs-formula,.hljs-function,.hljs-params,.hljs-subst,.hljs-title{color:#DCDCDC}.hljs-comment,.hljs-quote{color:#57A64A;font-style:italic}.hljs-doctag{color:#608B4E}.hljs-meta,.hljs-meta-keyword,.hljs-tag{color:#9B9B9B}.hljs-template-variable,.hljs-variable{color:#BD63C5}.hljs-attr,.hljs-attribute,.hljs-builtin-name{color:#9CDCFE}.hljs-section{color:gold}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-bullet,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-selector-tag{color:#D7BA7D}.hljs-addition{background-color:#144212}.hljs-deletion{background-color:#600}',

    // topic tags
    '.discourse-tag.simple, .discourse-tag.simple:visited, .discourse-tag.simple:hover { color: #009db1; }',
    // topic backgrounds (read and unread)
    '.topic-list-item { background-color: #003940; }',
    '.topic-list-item.visited { background-color: #212121; }',
    // histroy reason text
    '.modal.history-modal span.edit-reason { background-color: #212121; color: #fff; }',
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
