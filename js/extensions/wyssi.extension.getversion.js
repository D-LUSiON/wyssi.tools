(function (window, document, $) {
    "use strict";
    
    if (!window.Wyssi) {
        throw new Error('Wyssi.tools MUST be initialized BEFORE loading extensions!');
        return false;
    }
    
    var extension = {},
        extension_options = {
            name: 'GetVersion',
            dependancies: []
        };
    
    extension = {
        getVersion: function (text, custom_values, lang) {
            return this.version || 'No version defined!';
        }
    };
    
    window.Wyssi.registerExtension(extension, extension_options);
    
})(window, document, jQuery);