/*
 *  jQuery faviconPrefixer - v0.0.1
 *  Puts a favicon next to each link.
 *  http://jqueryboilerplate.com
 *
 *  Made by Henrik Wenz
 *  Under MIT License
 */
(function($, window, document, undefined) {
    "use strict";

    var pluginName = "faviconPrefixer",
        defaults = {
            apiURL: "http://favicon.yandex.net/favicon/",
            iconClassName: "favicon-icon",
            glueMethod: "prepend",
            linkFilter: function(anchor) {
                var url = anchor.host;
                if (!url || url === "") {
                    return;
                }
                // Return the hostname
                return url;
            }
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.$anchors = this.$element.find("a");
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
            this.urls = $.map(this.$anchors, this.options.linkFilter);
            this.urls = $.unique(this.urls);
        },

        createSpriteUrl: function() {
            // Get all favicons in one request!
            this.spriteUrl = this.options.apiURL + this.urls.join("/");
        },

        getFaviconSpriteOffset: function(url) {
            var name = this.options.linkFilter(url),
                pos = this.urls.indexOf(name);
            return pos === -1 ? "16px" : ("-" + pos * 16 + "px");
        },

        addFaviconNode: function(anchor) {
            var offset = this.getFaviconSpriteOffset(anchor),
                // TODO: move css to seperate file
                $favicon = $("<i>")
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
            $(anchor)[this.options.glueMethod]($favicon);
        },

        setFavicons: function() {
            var that = this;
            $.each(this.$anchors, function(i, anchor) {
                that.addFaviconNode(anchor);
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