# jquery.faviconPrefixer.js

Sets favicon images next to links by doing only one Request.

## Demo

[Link](http://rawgit.com/HaNdTriX/jquery.faviconPrefixer.js/master/demo/index.html)

## Usage 

    $(".favicon-links").faviconPrefixer();

## Available options (defaults)

	{
		apiURL: 'http://favicon.yandex.net/favicon/',
		paddingLeft: '20px',
        linkFilter: function(anchor) {
            var url = anchor.host;
            if (!url || url === '') return;
        	// Return the hostname
            return url;
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

#### Have you created a plugin from our boilerplate?

[Let us know!](https://github.com/jquery-boilerplate/boilerplate/wiki/Sites) It’s interesting to see what features others have come up with.
