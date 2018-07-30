# MeddlerExtension

A Firefox extension for monitoring HTTP transactions while browsing.

When installed, it sends HTTP transaction details to a MeddlerGateway (https://github.com/ChrisLMerrill/MeddlerGateway). 
It is intended to be used alongside browser automation tools (Selenium/WebDriver) to watch for failing HTTP
transactions (where failure can be based on performance, status code, etc).

For more information and some example code, see: https://www.webperformance.com/load-testing-tools/blog/2018/07/checking-http-status-codes-from-your-seleniumjava-tests-with-the-meddler-extension/
