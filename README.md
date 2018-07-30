# MeddlerExtension

A Firefox extension for monitoring HTTP transactions while browsing.

When installed, it sends HTTP transaction details to a MeddlerGateway (https://github.com/ChrisLMerrill/MeddlerGateway). 
It is intended to be used alongside browser automation tools (Selenium/WebDriver) to watch for failing HTTP
transactions (where failure can be based on performance, status code, etc).