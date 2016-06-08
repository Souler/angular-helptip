# angular-helptip
Helptip is a simple floating tooltip for angular

## Instalation
First install it via bower
```
$ bower install angular-helptip
```

Include the files on your html
```html
<head>
  <!-- ... -->
  <link type="text/css" href="bower_components/angular-helptip/dist/angular-helptip.css" rel="stylesheet">
  <script type="text/javascript" src="bower_components/angular-helptip/dist/angular-helptip.js"></script>
  <!-- ... -->
</head>
```

And finally add it to your application dependencies
```js
angular.module('app', [ 'upp.helptip' ])
```

## Usage

Add it as an attribute html
```html
<div helptip="This is a helptip!"></div>
```

Also, if you are using `angular-translate` you can pass directly the translation key
insetad of using the `translate` filter
```html
<!-- These two are equivalent -->
<div helptip="tooltip.hint"></div>
<div helptip="{ 'tooltip.hint' | translate }"></div>
```

Futhermore, you can add a timeout for when the cursor leaves the element that triggered the
tooltip to show. This way, the tooltip will not disapear until the given time has passed
since the cursor left the element.
```html
<div helptip="This is a helptip!"
	 helptip-timeout="2000">
</div>
```

## Config
angular-helptip exposes a provider that allows configuring some of its internal values:
```js
angular.module('app', [ 'upp.helptip' ])
.config(function(helptipConfigProvider) {
	// Sets the class to be used
	helptipConfigProvider.className('helptip')
	// Determines if we should try to use $translate if available
	helptipConfigProvider.useTranslate(true)
	// Default timeout when using helptip-timeout config
	helptipConfigProvider.timeout(1000)
})
```