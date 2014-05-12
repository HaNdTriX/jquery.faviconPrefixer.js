/*
 *  jQuery faviconPrefixer - v0.0.8
 *  Puts a favicon next to each link.
 *  https://github.com/handtrix/jquery.faviconPrefixer
 *
 *  Made by HaNdTriX
 *  Under MIT License
 */
;(function($, window, document, undefined) {
    "use strict";

    var pluginName = "faviconPrefixer",
        defaults = {
            apiURL: "//favicon.yandex.net/favicon/",
            iconClassName: "fp-icon",
            glueMethod: "prepend",
            backgroundImage: "images/default-favicon.png",
            linkFilter: function(node) {
                var host = node.host || (node.dataset ? node.dataset.host : "");
                if (!host || host === "") {
                    return;
                }
                // Return the hostname
                return host;
            }
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            this.findUrls();
            this.createSpriteUrl();
            this.setFavicons();
        },

        findUrls: function() {
            this.urls = $.map(this.$element, this.options.linkFilter);
            this.urls = $.unique(this.urls);
        },

        createSpriteUrl: function() {
            // Get all favicons in one request!
            this.spriteUrl = this.options.apiURL + this.urls.join("/");
        },

        getFaviconSpriteOffset: function(anchor) {
            var name = this.options.linkFilter(anchor),
                pos = this.urls.indexOf(name);
            return pos === -1 ? "16px" : ("-" + pos * 16 + "px");
        },

        setFaviconNode: function(anchor) {
            var offset = this.getFaviconSpriteOffset(anchor),
                isIconNode = anchor.nodeName === "I",
                // TODO: move css to seperate file
                $favicon = $(isIconNode ? anchor : "<i>")
                    .addClass(this.options.iconClassName)
                    .css({
                        height: "16px",
                        width: "16px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        backgroundImage: "url(" + this.spriteUrl + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "0 " + offset
                    });

            if(anchor.nodeName === "I"){
                $(anchor).replaceWith($favicon.addClass(this.options.iconSoloClassName));
            }else{
                $(anchor)[this.options.glueMethod]($favicon);
            }
        },

        setFavicons: function() {
            var that = this;
            $.each(this.$element, function(i, anchor) {
                that.setFaviconNode(anchor);
            });
        }

    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);