'use client'
import Script from "next/script"

const Test = () => {
    return <html>
        <head>
            <Script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></Script>
        </head>
        <body>

            <Script id="test" strategy="beforeInteractive" async>
                {
                    `var AppBridge = window['app-bridge'];
            var actions = AppBridge.actions;
            var TitleBar = actions.TitleBar;
            var app = AppBridge.createApp({
                apiKey: 'a4dcc3265352dea96cefdaed3ee330dd',
                shopOrigin: 'rx-demo.myshopify.com'
            });
            var titleBar = TitleBar.create(app, {
                title: 'Bubble App Integration',
            });
            titleBar.subscribe(TitleBar.Action.PRIMARY, function() {
                app.dispatch(Redirect.toApp({ path: '/partner' }));
            });`}
            </Script>
            <h1>H1</h1>
        </body>
    </html>
}

export default Test