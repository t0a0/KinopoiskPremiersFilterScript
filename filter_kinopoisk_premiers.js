// ==UserScript==
// @name         Kinopoisk filter premiers
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blends out premier items with rating under the specified
// @author       Igor Fedotov
// @match        https://www.kinopoisk.ru/premiere/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const MIN_RATING = 7

    function remove() {
        var all = $(".premier_item").get();

        all.forEach(function(item) {
            item.childNodes.forEach(function(childNode) {
                if (childNode.className == "ajax_rating") {
                    var ratingText = childNode.children[0].children[0].innerText.split(" ")[0];
                    if (parseFloat(ratingText) < MIN_RATING || ratingText.includes("—")) {
                        item.remove();
                    }
                }
            })
        });
    }

    remove();

    $(document).bind("DOMNodeInserted", remove);

})();
