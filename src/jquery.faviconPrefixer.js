(function($, window, document, undefined) {
    var pluginName = "faviconPrefixer",
        defaults = {
            apiURL: "http://favicon.yandex.net/favicon/",
            linkFilter: function(anchor) {
                var url = anchor.host;
                if (!url || url === "") {
                    return;
                }
                // Return the hostname
                return url;
            },
            paddingLeft: "20px"
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

            console.log("urls", this.urls);
            console.log(this.urlMap);
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

        setFavicons: function() {
            var that = this;
            $.each(this.$anchors, function(e, anchor) {
                var offset = that.getFaviconSpriteOffset(anchor);
                $(anchor).css({
                    backgroundImage: "url(" + that.spriteUrl + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 " + offset,
                    paddingLeft: that.options.paddingLeft
                });
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