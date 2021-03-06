import '_/logger'
import React from 'react'
import ReactDOM from 'react-dom'
import { dashboardPlaceToken } from './constants'
import getPluginApi from './plugin-api'
import { msg } from './intl-messages'
import appInit from './services/app-init'
import DashboardDataProvider from './dashboard/DashboardDataProvider'
import GlobalDashboard from './dashboard/GlobalDashboard'

import 'patternfly/dist/css/patternfly.min.css'
import 'patternfly/dist/css/patternfly-additions.min.css'
import 'patternfly-react/dist/css/patternfly-react.css'

// TODO(vs): Move component-specific CSS next to the relevant React component and
// have that React component import the CSS. Once we update our code to use only
// patternfly-react components, remove dependency on PatternFly as well as related
// dependencies like jQuery and C3/D3.
import '../static/css/dashboard.css'

// TODO(vs): For now, we use Bootstrap JavaScript library providing interactive
// components via jQuery plugins. Eventually, we should use only patternfly-react
// components and remove Bootstrap & jQuery dependencies. (Note: jQuery is loaded
// automatically through webpack ProvidePlugin, no explicit import needed here.)
import 'bootstrap'

// Bootstrap 3.3.7 Tooltip.getPosition() function has a bug, this override fixes
// the problem.
import './bootstrap-overrides/tooltip-fix'

const appRoot = document.getElementById('app')

appInit.run().then(() => {
  const loadingPlaceholder = (
    <div className='text-center'>
      <h2>{msg.dashboardDataLoading()}</h2>
      <div className='spinner spinner-lg' />
    </div>
  )

  const errorPlaceholder = (
    <div className='text-center'>
      <h2>{msg.dashboardDataError()}</h2>
      <span style={{ fontSize: 15 }}>
        {msg.dashboardDataErrorDetail()}
      </span>
    </div>
  )

  ReactDOM.render(
    <DashboardDataProvider loading={loadingPlaceholder} error={errorPlaceholder}>
      <GlobalDashboard />
    </DashboardDataProvider>,
    appRoot
  )
})

getPluginApi().setPlaceUnloadHandler(dashboardPlaceToken, function () {
  ReactDOM.unmountComponentAtNode(appRoot)
})
