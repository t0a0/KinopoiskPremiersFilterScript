const KINOPOISK_URL = "https://www.kinopoisk.ru/premiere/ru/";

//document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('load_movies').addEventListener('click', load_movies);

// Saves options to chrome.storage
function save_options() {
    var matches = document.getElementById('block_sites_textarea').value.split("\n").filter(string => !string.isEmpty());
    chrome.storage.sync.set({
        matches: matches
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
    restore_options();
}

// Restore options from chrome.storage
function restore_options() {
    chrome.storage.sync.get({
        matches: ["quora.com"],
    }, function(storage_options) {
        document.getElementById('block_sites_textarea').value = storage_options.matches.join('\n');
    });
}

function load_movies() {
  console.log(getLinks(25));
}

function getLinks(pastMonthsCount) {
  var today = new Date();
  var month = today.getMonth() + 1; //January is 0
  var year = today.getFullYear();
  var links = [];
  while (pastMonthsCount > 0) {
    var link = KINOPOISK_URL + String(year) + "/" + String(month) + "/";
    links.push(link);
    pastMonthsCount -= 1;
    month -= 1;
    if (month == 0) {
      month = 12;
      year -= 1;
    }
  }
  return links;
}

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};
