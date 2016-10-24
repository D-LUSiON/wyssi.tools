/**
 * TITLE: jQuery Wyssi front-end framework
 * AUTHOR: D-LUSiON
 * VERSION: v0.0.1 - alpha
 * COPYRIGHT:
 *      (2016) D-LUSiON;
 *      Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 * 
 * @param {function} factory
 * @returns {undefined}
 */

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
    
    var CONST = {
        LANG: {
            EN: 'en-US',
            DE: 'de-DE',
            ES: 'es-ES',
            BG: 'bg-BG'
        },
        CHAR: {
            DASH: '-'
        },
        KEYCODE: {
            ENTER: 13,
            ESCAPE: 27,
            SEMICOLON: 186,
            COMMA: 188
        },
        EVENTS: {
            CLICK: 'click',
            KEYUP: 'keyup',
            KEYDOWN: 'keydown',
            FOCUS: 'focus',
            BLUR: 'blur'
        },
        DATA_TYPE: {
            UNDEFINED: 'undefined',
            FUNCTION: 'function',
            STRING: 'string',
            OBJECT: 'object',
            BOOLEAN: 'boolean',
            NUMBER: 'number',
            DATE: 'date',
            IMAGE: 'image',
            VIDEO: 'video'
        },
        EMPTY_STRING: ''
    };

    var Wyssi = function () {
        var _this = this;

        var _ = {
            self: $('<div/>')
        };

        this.extensions = {};

        this.plugins = {};
        
        this.extensions = {};
        
        this.PageClass;
        
        this.Application;
        
        function __construct() {
            __startEventListeners();
        }
        
        this.trigger = function(event){
            _.self.trigger(event, arguments);
        };
        
        this.on = function(event, callback){
            _.self.on(event, callback);
        };
        
        this.registerExtension = function(extension, extension_options){
            if (!this.extensions[extension_options.name])
                this.extensions[extension_options.name] = extension;
            
        };
        
        this.registerPlugin = function(PluginClass, plugin_options){
            if (!this.plugins[plugin_options.name]) {
                this.plugins[plugin_options.name] = PluginClass;
                
                for (var key in this.extensions) {
                    this.plugins[plugin_options.name].prototype = $.extend(true, {}, this.extensions[key], this.plugins[plugin_options.name].prototype);
                }
                
                __registerJqueryPlugin(this.plugins[plugin_options.name], plugin_options);
            }
        };
        
        function __registerJqueryPlugin(PluginClass, plugin_options){
            
            if (!$.fn[plugin_options.name]) {
                $.fn[plugin_options.name] = function (options) {
                    var all_dependancies_loaded = true,
                        missing_dependancies = [];

                    if (plugin_options.dependancies.length > 0) {
                        $.each(plugin_options.dependancies, function (i, val) {
                            if ($.fn[val] === undefined &&
                                    $[val] === undefined &&
                                    window[val] === undefined) {
                                all_dependancies_loaded = false;
                                missing_dependancies.push(val);
                            }
                        });
                    }

                    if (all_dependancies_loaded) {
                        var args = arguments,
                            result;

                        this.each(function () {
                            var $this = $(this),
                                data = $this.data(plugin_options.name);

                            if (!data || typeof data === CONST.DATA_TYPE.UNDEFINED) {
                                var instance = new PluginClass(this, plugin_options);
                                $this.data(plugin_options.name, instance);
                            } else {
                                if (typeof options === CONST.DATA_TYPE.STRING && typeof data[options] === CONST.DATA_TYPE.FUNCTION)
                                    result = data[options].apply(data, Array.prototype.slice.call(args, 1));
                                else if (typeof options === CONST.DATA_TYPE.STRING && typeof data[options] !== CONST.DATA_TYPE.FUNCTION) {
                                    if (window.console && console.error)
                                        console.error(data.renderTemplate(window.Localization.global.method_not_found, { pluginName: plugin_options.name, method: options }));
                                } else if (typeof options === CONST.DATA_TYPE.STRING)
                                    data.setSettings(options, args);
                                else if (typeof options === CONST.DATA_TYPE.UNDEFINED)
                                    if (window.console && console.error)
                                        console.error(data.renderTemplate(window.Localization.global.already_initialized, { pluginName: plugin_options.name }));
                            }
                        });

                        return result || this;
                    } else {
                        throw new Error(plugin_options.name + window.Localization.global.plugins_needed + missing_dependancies.join(',\n'));
                    }
                };
            } else
                if (window.console && console.error)
                    console.error('Plugin with the name "' + plugin_options.name + '" is already initialized as part of jQuery!');
        }
        
        this.registerGeneralPlugin = function(PluginClass, plugin_options){
            if (!this.plugins[plugin_options.name]) {
                this.plugins[plugin_options.name] = PluginClass;
                
                for (var key in this.extensions) {
                    this.plugins[plugin_options.name].prototype = $.extend(true, {}, this.extensions[key], this.plugins[plugin_options.name].prototype);
                }
                
                __registerJqueryGeneralPlugin(this.plugins[plugin_options.name], plugin_options);
            }
        };
        
        function __registerJqueryGeneralPlugin(PluginClass, plugin_options){
            if (!$[plugin_options.name])
                $[plugin_options.name] = function (options) {

                    var all_dependancies_loaded = true,
                        missing_dependancies = [];

                    if (plugin_options.dependancies.length > 0) {
                        $.each(plugin_options.dependancies, function (i, val) {
                            if (typeof $.fn[val] === CONST.DATA_TYPE.UNDEFINED &&
                                    typeof $[val] === CONST.DATA_TYPE.UNDEFINED &&
                                    typeof window[val] === CONST.DATA_TYPE.UNDEFINED) {
                                all_dependancies_loaded = false;
                                missing_dependancies.push(val);
                            }
                        });
                    }

                    if (all_dependancies_loaded) {
                        var args = arguments,
                            result;

                        var $body = $(CONST.SELECTOR.BODY),
                            data = $body.data(plugin_options.name);

                        if (!data || typeof data === CONST.DATA_TYPE.UNDEFINED) {
                            data = new PluginClass(options);
                            $body.data(plugin_options.name, data);
                        } else {
                            if (typeof options === CONST.DATA_TYPE.STRING && typeof data[options] === CONST.FUNCTION)
                                result = data[options].apply(data, Array.prototype.slice.call(args, 1));
                            else if (typeof options === CONST.DATA_TYPE.STRING && typeof data[options] !== CONST.FUNCTION) {
                                if (window.console && console.error)
                                    console.error(data.renderTemplate(window.Localization.global.method_not_found, { pluginName: plugin_options.name, method: options }));
                            } else if (typeof options === CONST.DATA_TYPE.STRING)
                                data.setSettings(options, args);
                            else if (typeof options === CONST.DATA_TYPE.UNDEFINED)
                                if (window.console && console.error)
                                    console.error(data.renderTemplate(window.Localization.global.already_initialized, { pluginName: plugin_options.name }));
                        }

                        return result || data;
                    } else {
                        throw new Error(pluginName + window.Localization.global.plugins_needed + missing_dependancies.join(',\n'));
                    }
                };
            else
                throw new Error('Plugin with the name "' + pluginName + '" is already initialized as part of jQuery!');
        }
        
        this.initPage = function(PageClass){
            this.PageClass = PageClass;
        };
        
        function __startEventListeners(){
            $(function(){
                if (_this.PageClass)
                    _this.Application = new _this.PageClass();
                else
                    console.error('Please, create page initialization script!');
            });
        }

        __construct();
    };

    if (window.Wyssi) {
        if (window.console && console.error)
            console.error('Wyssi tools already initialized!');
        return;
    }

    window.Wyssi = new Wyssi();
    
}));