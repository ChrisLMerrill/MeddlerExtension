/**
 * ©2018 Web Performance, Inc
 */

var pending_txns = {};
var must_include_filters = [];
must_include_filters.push({type:"urlstart", value:"http"});
var must_exclude_filters = [];

function mustInclude(request_info)
    {
    for (index = 0; index < must_include_filters.length; index++)
        {
        var filter = must_include_filters[index];
        switch(filter.type)
            {
            case "urlstart":
                if (!request_info.url.startsWith(filter.value))
                    return false;
            }
        }
    return true;
    }

function mustNotInclude(request_info)
    {
    for (index = 0; index < must_exclude_filters.length; index++)
        {
        var filter = must_exclude_filters[index];
        switch(filter.type)
            {
            case "urlstart":
                if (request_info.url.startsWith(filter.value))
                    return true;
            }
        }
    return false;
    }

function startRequest(request_info)
    {
    if (mustInclude(request_info) && !mustNotInclude(request_info))
        {
        var txn = {};
        txn.url = request_info.url;
        txn.started = request_info.timeStamp;
        pending_txns[request_info.requestId] = txn;
        }
    }

function startResponse(request_info)
    {
    var txn = pending_txns[request_info.requestId];
    if (typeof txn !== 'undefined')
        txn.responseStarted = request_info.timeStamp;
    }

function recordCompletedTransaction(transaction)
    {
    sendMessage(createMessageHeader("transaction_summary"), transaction);
    }

function completeResponse(request_info)
    {
    var txn = pending_txns[request_info.requestId];
    if (typeof txn !== 'undefined')
        {
        delete pending_txns[request_info.requestId];
        txn.responseCompleted = request_info.timeStamp;
        txn.statusCode = request_info.statusCode;
        txn.fromCache = request_info.fromCache;
        recordCompletedTransaction(txn);
        }
    }

browser.webRequest.onBeforeRequest.addListener(startRequest, {urls: ["<all_urls>"]});
browser.webRequest.onResponseStarted.addListener(startResponse, {urls: ["<all_urls>"]});
browser.webRequest.onCompleted.addListener(completeResponse, {urls: ["<all_urls>"]});
