
# CookieOptIn
Sitegeist | CookieOptIn Example

**Please dont require this package into your projects directly. Make a copy instead, change the namespace and adapt it to your needs!**

(For namespace changes have at look at: https://github.com/sitegeist/Sitegeist.Chantalle) 
___________________________________________________________

This package can manage GoogleTagManager OptIn feature. Basic trigger handling is described here: http://www.wrel.de/google-analytics-opt-out-google-tag-manager/

To be DSGVO valid we decided to change the behaivior and switched to OptIn mechanism. The variables will only be set if the user has accepted cookie storage.
___________________________________________________________

The **statistic-opt-in** trigger

This cookie will be set "true" if the user accept statistics cookies

The **marketing-opt-in** trigger

This cookie will be set "true" if the user accept marketing cookies

___________________________________________________________


## HomePageMixin

To use editable explanation feature you have to add the HomePageMixin to your NodeTypes.yaml

```
'Neos.NodeTypes:Page':
  superTypes:
    'Sitegeist.CookieOptIn:HomePageMixin': true
```

To disable editable feature change your Settings.yaml

```
Sitegeist:
  CookieOptIn:
    editable: false
```

___________________________________________________________

## Urls overwrite

You can overwrite the urls displayed in the cookie overlay by fusion:

```
prototype(Sitegeist.CookieOptIn:Overlay.Component) {
    dataprivacyUrl = Neos.Neos:NodeUri {
        node = ${q(site).children('[uriPathSegment="privacy"]').get(0)}
    }
    imprintUrl = Neos.Neos:NodeUri {
        node = ${q(site).children('[uriPathSegment="imprint"]').get(0)}
    }
    cookieOverviewUrl = Neos.Neos:NodeUri {
        node = ${q(site).children('[uriPathSegment="cookie"]').get(0)}
    }
}
```

___________________________________________________________

## Include js and css in your build process

It is possible to stop the automatically include of js and css files. Just overwrite the page fusion part in you site package. Please check the required packages in you composer.json so that you can be sure that your changes will be affected:

```
prototype(Neos.Neos:Page) {
    optInOverlayStyles = null
    optInOverlay = null
    optInOverlayScript = null
}
```


It is also possible to overwrite Settings.yaml by your site package:

```

Sitegeist:
  CookieOptIn:
    path:
      dataprivacyUrl: '/'
      imprintUrl:  '/'
      cookieOverviewUrl:  ''

```

___________________________________________________________

## Review cookie settings link

You can review your settings with this link. This element is also part of this package but you could also use this html code directly somewhere in your templates, if you need it somewhere else. 

Open the settings by keypress (ctrl+q) is also possible.

```
<a href="#" onclick="document.dispatchEvent(new KeyboardEvent('keydown',{'code':'KeyQ', 'ctrlKey' : true})); return false;">
    View cookie settings
</a>

```


___________________________________________________________

## Overlay properties

Here is a list of properties including a description, which will be used in the overlay.
(Resource/Private/Fusion/Overlay/Overlay.fusion)

**introductionText**

This is a little introduction as html

Example:
```
<h1>Cookie</h1>
<p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
</p>
```

**imprintOrPrivacyUrl**

Set "true" if the actual page is imprint, data pravacy or cookie overview. The cookie optin overlay will not open on page load, therefore it is still possible to read these important pages.

**allOptInText**

Button text "Accept all cookies"


**statisticOptInText**

Button text "Accept statistic cookies"


**statisticOptInText**

Button text "Accept statistic cookies"

**necessaryOptInText**

Button text "Accept necessary cookies"

**necessaryDescriptionText**

A little description below the necessary Button

**detailsText**

Button text "Show details" for the following explainations text

**explainationsText**

Details text as html 
```
<h5>Cookies for statistics</h5>
<p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
</p>

<h5>Cookies for marketing</h5>
<p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
</p>
```

**dataprivacyLink**

Link element to the dataprivacy page as html. 

Example:
```
<a href="/dataprivacy.html">Data privacy</a>
```

**imprintLink**

Link element to the imprint page as html. 

Example:
```
<a href="/imprint.html">Imprint</a>
```

**cookieOverviewLink**

Link element to the cookies overview page as html. 

Example:
```
<a href="/dataprivacy.html#cookies">Overview of our cookies</a>
```
