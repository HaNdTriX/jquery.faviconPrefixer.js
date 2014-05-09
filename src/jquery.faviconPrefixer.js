;(function($, window, document, undefined) {
    "use strict";

    var pluginName = "faviconPrefixer",
        defaults = {
            apiURL: "//favicon.yandex.net/favicon/",
            iconClassName: "fp-icon",
            iconSoloClassName: "fp-solo",
            glueMethod: "prepend",
            targetSelector: "a, i[data-host]",
            linkFilter: function(node) {
                var url = node.host || (node.dataset ? node.dataset.host : "");
                if (!url || url === "") {
                    return;
                }
                // Return the hostname
                return url;
            }
        };

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.$anchors = this.$element.find(this.options.targetSelector);
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

        getFaviconSpriteOffset: function(anchor) {
            var name = this.options.linkFilter(anchor),
                pos = this.urls.indexOf(name);
            return pos === -1 ? "16px" : ("-" + pos * 16 + "px");
        },

        setFaviconNode: function(anchor) {
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

            if(anchor.nodeName === "I"){
                $(anchor).replaceWith($favicon.addClass(this.options.iconSoloClassName));
            }else{
                $(anchor)[this.options.glueMethod]($favicon);
            }
        },

        setFavicons: function() {
            var that = this;
            $.each(this.$anchors, function(i, anchor) {
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