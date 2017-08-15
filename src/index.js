import "babel-polyfill"
import React from "react"
import {BrowserRouter as Router,Route} from "react-router-dom"
import {createBrowserHistory} from "history"
import {syncHistoryWithStore,routerReducer} from "react-router-redux"
import {Provider} from "react-redux"
import {render} from "react-dom"
import config from "config"
import UIkit from "uikit"
import Icons from "uikit/dist/js/uikit-icons"
import "uikit/dist/css/uikit.min.css"

import App from "./app"
import Api from "utils/api"
import Redux from "utils/redux"
import LoggerFactory from "utils/logger"

import {Hoverio} from "common"

let Logger = new LoggerFactory("main")

/****************************************************************
* App Bootstrap
****************************************************************/
function bootstrap() {
    let logger = Logger.create("bootstrap")
    logger.info("enter", {config})

    // Setup UIKit
    UIkit.use(Icons)

    // components can be called from the imported UIkit reference
    UIkit.notification("Hello world.")

    // Instantiate api
    new Api({shared:true})

    // Instantiate redux
    // Create redux store with app reducers
    new Redux({
        routing: routerReducer,
        hoverio: Hoverio.reducer
    }, {shared: true})

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(createBrowserHistory(), Redux.shared.store)
    
    // Specify the main route
    let routes = (
        <Provider store={Redux.shared.store}>
            <Router history={history}>
                <Route path="/" component={App} />
            </Router>
        </Provider>
    )

    // Render routes
    render(routes, document.getElementById("main"))
}


/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap()