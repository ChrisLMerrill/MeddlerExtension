/**
 * ©2018 Web Performance, Inc
 */

function sendMessage(header, payload)
    {
    var message = JSON.stringify(header);
    if (payload !== null)
        message = message + "|" + JSON.stringify(payload);
    if (socket === null)
        console.log("Socket is not open yet. Cannot send message: " + message);
    else if (closed)
        console.log("Socket was closed. Cannot send message: " + message);
    else
        socket.send(message);
    }

function createMessageHeader(type)
    {
    return { "type" : type };
    }

function messageReceived(event)
    {
    // TODO route the message
    console.log("WebSocket message received: " + event.data + " from " + event.origin);
    }

function socketError(event)
    {
    console.log("WebSocket error: " + event.type);
    }

function socketClose(event)
    {
    closed = true;
    console.log("WebSocket closed: " + event.reason);
    }

var config = null;
var socket = null;
var closed = false;

function getWebsocketUrl()
    {
    return 'ws://' + config.host + ':' + config.port + config.path;
    }

function cookieChanged(change)
    {
    if (change.cookie.name === 'meddler-bootstrap')
        {
        console.log('Meddler: Received bootstrap: ' + change.cookie.value);
        config = JSON.parse(change.cookie.value);
        socket = new WebSocket(getWebsocketUrl());
        socket.onmessage = messageReceived;
        socket.onerror = socketError;
        socket.onclose = socketClose;
        socket.onopen = function()
            {
            console.log("Meddler: Socket is open, sending connector id.");
            socket.send("ConnectTo:" + config.id);
            };
        }
    }

function listenForMessagingBootstrap()
    {
    browser.cookies.onChanged.addListener(cookieChanged);
    console.log("Meddler: listening for bootstrap cookie.");
    }
