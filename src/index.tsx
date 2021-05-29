import React from 'react'
import ReactDOM from 'react-dom'
import { firebaseConfig } from './constants'
import { BrowserRouter } from 'react-router-dom'
import { App } from './pages/App'

import './styles/reset.st.css'
import './styles/globals.st.css'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.body.appendChild(document.createElement('main'))
)
