/**
 * @origin http://onemoredigit.com/post/1527191998/extending-objects-in-node-js
 * @modify VS
 * @licence BSDLv2
 * @example
		require('object.extend');
		var default = {
			timeout: false
		  , name: 'example'
		};
		var opts = {
			name: 'blogpost'
		  , author: 'username'
		};
		default.extend(opts);

		//And the resulting object will be:
		{
			author: 'username'
		  , name: 'blogpost',
		  , timeout: false
		};

		// also
		var $extend = require('object.extend');
		$extend(default, opts, {some: param});
 *
 */
Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if ('object' == typeof from[name]
            	&& 'undefined' == typeof from[name].indexOf
            	&& 'undefined' != typeof dest[name]) {
            	var destination = dest[name].extend(from[name]);
            }
            else{
                var destination = Object.getOwnPropertyDescriptor(from, name);
            }
            Object.defineProperty(dest, name, destination);
        });
        return this;
    }
});

module.exports = function() {
	var result = new Object;
	for (var i = 0; i < arguments.length; i++) {
		result = result.extend(arguments[i]);
	};
	return result;
}