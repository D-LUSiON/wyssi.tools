(function (window, document, $) {
    "use strict";
    
    if (!window.Wyssi) {
        throw new Error('Wyssi.tools MUST be initialized BEFORE loading extensions!');
        return false;
    }
    
    var extension = {},
        extension_options = {
            name: 'Translate',
            dependancies: []
        };
    
    extension = {
        translate: function (text, custom_values, lang) {
            var that = this;
            
            return text;
        }
    };
    
    window.Wyssi.registerExtension(extension, extension_options);
    
})(window, document, jQuery);