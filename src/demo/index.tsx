import * as React from "react"
import * as ReactDOM from "react-dom"
import { Action, observable, inject } from 'dob'
import { Connect, Provider, startDebug } from 'dob-react'
import '../'

import Layout from './layout/layout.component'

import { stores } from './stores'

startDebug()

ReactDOM.render(
    <Provider {...stores}>
        <Layout />
    </Provider>
    , document.getElementById("react-dom"))
