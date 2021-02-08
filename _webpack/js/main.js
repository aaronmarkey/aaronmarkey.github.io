import "@stimulus/polyfills"
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

import "chota"
import "../css/main.scss"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
