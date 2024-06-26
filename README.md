# SFCC + Builder.io Composable Storefront 

This example is an isomorphic JavaScript storefront and [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) built using [React](https://reactjs.org/) and [Express](https://expressjs.com/) connected with [Builder.io](https://builder.io). It uses a modern headless architecture that enables developers to decouple front-end code from back-end systems. It leverages popular open-source libraries in the React ecosystem, such as [Chakra UI](https://chakra-ui.com/) components, [Emotion](https://emotion.sh/docs/introduction) (CSS-in-JS), [Webpack](https://webpack.js.org/), and many more.

Developers don’t have to worry about the underlying infrastructure, whether they’re developing their app locally, deploying it to a [Managed Runtime](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/mrt-overview.html) environment, or testing the app live.

## Requirements

Before you begin, ensure that you have the following accounts set up:

-   [Salesforce Commerce API client](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/setting-up-api-access.html)
-   [Builder.io Account](https://builder.io)
-   Node 14
-   npm 6.14.4 or later


### Getting started with Builder.io :
  - [1: Create an account for Builder.io](#1-create-an-account-for-builderio)
  - [2: Your Builder.io private key](#2-your-builderio-private-key)
  - [3: Clone this repository and initialize a Builder.io space](#3-clone-this-repository-and-initialize-a-builderio-space)

#### 1: Create an account for Builder.io

Before we start, head over to Builder.io and [create an account](https://builder.io/signup).

#### 2: Your Builder.io private key

Head over to your [organization settings page](https://builder.io/account/organization?root=true) fint your organization private key and copy it for the next step.

- Visit the [organization settings page](https://builder.io/account/organization?root=true), or select
  an organization from the list 

- Click the edit icon for the "Private keys" row

![Example of how to get your private key](https://cdn.builder.io/api/v1/image/assets%2F1f3cfad3ba4047d3aeb1f6935d1f650f%2F222bbf272a2f47dca2420e5931f4bd82)

- Copy the value of the auto-generated key, or create a new one with a name that's meaningful to you

![Example of how to get your private key](https://cdn.builder.io/api/v1/image/assets%2F1f3cfad3ba4047d3aeb1f6935d1f650f%2Ffcea43185bc44f8db9afc56477569688)

#### 3: Clone this repository and initialize a Builder.io space

First, we'll need to install Builder's CLI:
```
npm install -g @builder.io/cli
```
Next, we'll create a copy of the starter project, and create a new
[space](https://www.builder.io/c/docs/spaces) for it's content to live
in.

In the example below, replace `<private-key>` with the key you copied
in the previous step, and change `<space-name>` to something that's
meaningful to you -- don't worry, you can change it later!

```
builder create --key "<private-key>" --name "<space-name>" --debug
```


If this was a success you should be greeted with a message that
includes a public API key for your newly minted Builder.io space.

*Note: This command will also publish some starter builder.io cms
content from the ./builder directory to your new space when it's
created.*

``` bash
  ____            _   _       _                     _                    _   _ 
| __ )   _   _  (_) | |   __| |   ___   _ __      (_)   ___       ___  | | (_)
|  _ \  | | | | | | | |  / _` |  / _ \ | '__|     | |  / _ \     / __| | | | |
| |_) | | |_| | | | | | | (_| | |  __/ | |     _  | | | (_) |   | (__  | | | |
|____/   \__,_| |_| |_|  \__,_|  \___| |_|    (_) |_|  \___/     \___| |_| |_|

|████████████████████████████████████████| product-footer writing schema.json | 1/1
|████████████████████████████████████████| announcement-bar: writing schema.json | 1/1
|████████████████████████████████████████| category-hero: writing schema.json | 1/1
|████████████████████████████████████████| page: writing schema.json | 2/2


Your new space "sfcc pwa kit starter" public API Key: d1ed12c3338144da8dd6b63b35d14c30
```

Copy the public API key ("d1ed12c3338144da8dd6b63b35d14c30" in the example above) for the next step.

This starter project uses a configuration file to set the builder api key.
Open the file [builder.js](./app/utils/builder.js) and
set the value you just copied from your terminal to 'apiKey' property.

```
export default {
    apiKey: 'YOUR API KEY GOES HERE',
    announcementBarModel: 'announcement-bar',
    categoryHeroModel: 'category-hero',
    productFooterModel: 'product-footer',
    pageModel: 'page',
    cartUpsellModel: 'cart-modal-upsell'
}
```

## Up and Running

To start your web server for local development, run the following command in your project directory:

```bash
npm start
```

Now that the development server is running, you can open a browser and preview your commerce app:

-   Go to http://localhost:3000/

## Localization

See the [Localization README.md](./app/translations/README.md) for important setup instructions for localization.

## Configuration Files

The Retail React App's configuration files are located in the `app/config` folder. For more details, see [Configuration Files](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html) in the documentation.

## Documentation

The full documentation for PWA Kit is hosted on the [Salesforce Developers](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/overview) portal.

### Useful Links for SFCC:

-   [Getting Started](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/getting-started.html)
-   [Setting Up API Access](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/setting-up-api-access.html)
-   [Configuration Files](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html)
-   [Pushing and Deploying Bundles](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html)
-   [The Retail React App](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/retail-react-app.html)
-   [Proxying Requests](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/proxying-requests.html)
