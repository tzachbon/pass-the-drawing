import '@testing-library/jest-dom/extend-expect'
import { render, Renderer, renderer } from './render'
import { v4 as uuid } from 'uuid'

export * from '@testing-library/react'
export * from './e2e-utils'
export * from './create-router-mock-provider'
export * from './constants'
export * from './test-utils'
export * from './mocks'
export * from './driver'
export { render, Renderer, renderer, uuid }