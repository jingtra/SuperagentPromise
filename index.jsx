if(typeof Promise == 'undefined') Promise = require('bluebird');
var agentPromise = require('superagent-promise')(require('superagent'), Promise);
var noCache = require('./SuperagentNoCache.jsx');
var check = require('./SuperagentToJSON.jsx');


/**
 * Promise wrapper for superagent
 */



function checkStatus(response) {
    console.log('select thread', response);
    if (response.status >= 200 && response.status < 300) {
        return response.body;
    } else {
        var error = new Error(response.body.name||'internal error')

        console.log(response);
        error.response = response.body;
        console.log(error);
        throw error
    }
}

function wrap(){



    /**
     * Request builder with same interface as superagent.
     * It is convenient to import this as `request` in place of superagent.
     */



    var request = function(method, url) {
        var r = agentPromise.apply(this, arguments).use(noCache);
       return r;
    };

    /** Helper for making an options request */
    request.options = function(url) {
        return request('OPTIONS', url);
    }

    /** Helper for making a head request */
    request.head = function(url, data) {
        var req = request('HEAD', url);
        if (data) {
            req.send(data);
        }
        return req;
    };

    /** Helper for making a get request */
    request.get = function(url, data) {
        var req = request('GET', url);
        if (data) {
            req.query(data);
        }
        return req;
    };

    /** Helper for making a post request */
    request.post = function(url, data) {
        var req = request('POST', url);
        if (data) {
            req.send(data);
        }
        return req;
    };

    /** Helper for making a put request */
    request.put = function(url, data) {
        var req = request('PUT', url);
        if (data) {
            req.send(data);
        }
        return req;
    };

    /** Helper for making a patch request */
    request.patch = function(url, data) {
        var req = request('PATCH', url);
        if (data) {
            req.send(data);
        }
        return req;
    };

    /** Helper for making a delete request */
    request.del = function(url) {
        return request('DELETE', url);
    };



    // Export the request builder
    return request;
}

export default wrap();

