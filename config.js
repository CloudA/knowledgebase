var config = {

	// Your site title (format: page_title - site_title)
	site_title: 'Docs',

	// The base URL of your site (can use %base_url% in Markdown files)
	base_url: '',

	// Used for the "Get in touch" page footer link
	support_email: 'support@clouda.ca',

	// Footer copyright content
	copyright: 'Copyright Cloud-A &copy; '+ new Date().getFullYear() +' - <a href="http://raneto.com">Powered by Raneto</a>',

	// Excerpt length (used in search)
	excerpt_length: 400,

	// The meta value by which to sort pages (value should be an integer)
	// If this option is blank pages will be sorted alphabetically
	page_sort_meta: 'sort',

	// Should categories be sorted numerically (true) or alphabetically (false)
	// If true category folders need to contain a "sort" file with an integer value
	category_sort: true,

	// The base URL of your images folder (can use %image_url% in Markdown files)
	image_url: '/images',

	// Specify the path of your content folder where all your '.md' files are located
	content_dir: './content/',

	// Add your analytics tracking code (including script tags)
	analytics: "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-40744416-1', 'auto'); ga('send', 'pageview'); </script>"

};

module.exports = config;
