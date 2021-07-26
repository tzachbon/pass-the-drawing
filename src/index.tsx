import React from 'react'
import ReactDOM from 'react-dom'
import { firebaseConfig } from '@constants'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@hooks/useAuth'
import { setModalRoot } from '@components/AuthModal/AuthModal'
import { App } from '@pages/App'

import './styles/reset.st.css'
import './styles/globals.st.css'
import './styles/variables.st.css'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'

setModalRoot()

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.body.appendChild(document.createElement('main')),
)
