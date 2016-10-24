(function (window, document, $) {
    "use strict";
    
    if (!window.Wyssi) {
        throw new Error('Wyssi.tools MUST be initialized BEFORE loading extensions!');
        return false;
    }
    
    var extension = {},
        extension_options = {
            name: 'GetSettings',
            dependancies: []
        };
    
    extension = {
        getSettings: function (property) {
            if (property && typeof property === 'string')
                return this.settings[property];
            else
                return this.settings;
        }
    };
    
    window.Wyssi.registerExtension(extension, extension_options);
    
})(window, document, jQuery);