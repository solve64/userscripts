// ==UserScript==
// @name         wyzant.com tutor link
// @namespace    https://github.com/solve64/userscripts
// @version      0.1
// @license      MIT; https://opensource.org/licenses/MIT
// @description  fix tutor links in Wyzant tutor forums
// @author       solve64
// @match        https://www.wyzant.com/resources/forums/*
// @grant        none
// ==/UserScript==

(function(){
    let as=document.getElementsByTagName('a');
    for(let i=0; i<as.length; i++)
    {
        const href=as[i].getAttribute('href');
        if(href!=null && href.startsWith('/resources/forums/users/'))
        {
            as[i].setAttribute('href','/match/tutor/'+href.substring(24));
        }
    }
})();
