function ie() {
  if(typeof document === 'undefined')
    return false;

  for( var v = 3,
           el = document.createElement('b'),
           // empty array as loop breaker (and exception-avoider) for non-IE and IE10+
           all = el.all || [];
       // i tag not well-formed since we know that IE5-IE9 won't mind
       el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->',
       all[0];
     );
  // return the documentMode for IE10+ compatibility
  // non-IE will get undefined
  return v > 4 ? v : document.documentMode;
}


var ieVersion = ie();

function with_query_strings (request) {
    request._query = [Date.now().toString()]
    return request
}

module.exports = function _superagentNoCache (request, mockIE) {
    request.set('X-Requested-With', 'XMLHttpRequest')
    request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1')

    if (ieVersion || mockIE) {
        with_query_strings(request)
    }

    return request
}
