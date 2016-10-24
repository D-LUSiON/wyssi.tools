(function (window, document, $) {
    "use strict";
    
    if (!window.Wyssi) {
        throw new Error('Wyssi.tools MUST be initialized BEFORE loading extensions!');
        return false;
    }
    
    var CONST = {
        EMPTY_STRING: '',
        EVERY_TRANSLATABLE_TEXT: /\|\%(.+?)\%\|/gi,
        EVERY_VALUE: /\[\[(.+?)\]\]/gi,
        GLOBAL_IGNORE_CASE: 'gi',
        TEXT_OPEN: '|%',
        TEXT_CLOSE: '%|',
        VALUE_OPEN: '[[',
        VALUE_CLOSE: ']]'
    };
    
    var extension = {},
        extension_options = {
            name: 'renderTemplate',
            dependancies: ['Translate']
        };
    
    extension = {
        renderTemplate: function (template, data) {
            if (template && data) {
                return this.translate(
                            template.replace(CONST.EVERY_VALUE, function ($0, $1) {
                                return data[$1] || CONST.EMPTY_STRING;
                            })
                        );
            }

            if (window.console && console.error)
                console.error(window.Localization.global.no_template_and_data);
            return false;
        }
    };
    
    window.Wyssi.registerExtension(extension, extension_options);
    
})(window, document, jQuery);