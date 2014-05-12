# jquery.faviconPrefixer.js

Sets favicon images next to links by doing only one Request.

[Demo](http://rawgit.com/HaNdTriX/jquery.faviconPrefixer.js/master/demo/index.html)

## Usage 

    $("a,  i[data-host]").faviconPrefixer();

## Available options (defaults)

    {
        // Favicon API
        apiURL: "//favicon.yandex.net/favicon/",

        // ClassName of the favicon icon
        iconClassName: "favicon-icon",

        // use any jquery append method
        glueMethod: "prepend",

        // modify the link filter to your needs
        linkFilter: function(anchor) {
            var host = node.host || (node.dataset ? node.dataset.host : "");
            if (!host || host === "") {
                return;
            }
            // Return the hostname
            return host;
        }
        
    }

## Contributing

Before sending a pull request remember to follow [jQuery Core Style Guide](http://contribute.jquery.org/style-guide/js/).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make your changes on the `src` folder, never on the `dist` folder.
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D
