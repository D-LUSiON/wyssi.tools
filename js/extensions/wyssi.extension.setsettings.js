(function (window, document, $) {
    "use strict";
    
    if (!window.Wyssi) {
        throw new Error('Wyssi.tools MUST be initialized BEFORE loading extensions!');
        return false;
    }
    
    var extension = {},
        extension_options = {
            name: 'SetSettings',
            dependancies: []
        };
    
    extension = {
        setSettings: function (option, value) {
            switch (typeof option) {
                case 'string':
                    if (option && value) {
                        var new_options = {};
                        new_options[option] = value;
                        this.settings = $.extend(true, {}, this.settings, new_options || {});
                        return this.$selectors.root;
                    } else
                        throw new Error('Please, provide valid options!');
                    break;
                case 'object':
                    this.settings = $.extend(true, {}, this.settings, option || {});
                    return this.$selectors.root;
                    break;
                default:
                    if (window.console && console.error)
                        console.error('Please, provide valid options!');
                    return false;
                    break;
            }
        }
    };
    
    window.Wyssi.registerExtension(extension, extension_options);
    
})(window, document, jQuery);