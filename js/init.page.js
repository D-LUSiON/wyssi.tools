;(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([
            'jQuery',
            'jQuery.ui'
        ], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";
    
    if (!window.Wyssi) {
        throw new Error('Wyssi.tools MUST be initialized BEFORE loading plugins!');
        return false;
    }
        
    var NS = {};
    
    function Page() {
        var self = this;
        
        var options = {
            selectors: {
                blank_plugin: '.mySelector'
            }
        };
        
        function __contruct(){
            _buildHTML();
            console.log('page initialized!');
            return self;
        }
        
        function _buildHTML(){
            initBlankPlugin();
        }
        
        function initBlankPlugin(){
            $(options.selectors.blank_plugin).blank_plugin();
        };
        
        return __contruct();
    };
    
    window.Wyssi.initPage(Page);
}));