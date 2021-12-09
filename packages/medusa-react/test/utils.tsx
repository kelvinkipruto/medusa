import Medusa from "@medusajs/medusa-js"
import * as React from "react"
import { QueryClient } from "react-query"
import { BagProvider, BagState, CartProvider, MedusaProvider } from "../src"
import { Cart } from "../src/types"

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const createMedusaClient = () => new Medusa({ baseUrl: "", maxRetries: 0 })

export function createWrapper() {
  const qc = createTestQueryClient()
  const mc = createMedusaClient()

  return ({ children }) => (
    <MedusaProvider queryClientProviderProps={{ client: qc }} medusaClient={mc}>
      {children}
    </MedusaProvider>
  )
}

export function createBagWrapper() {
  const qc = createTestQueryClient()
  const mc = createMedusaClient()

  return ({
    children,
    initialState,
  }: {
    initialState: BagState
    children?: React.ReactNode
  }) => {
    return (
      <MedusaProvider
        queryClientProviderProps={{ client: qc }}
        medusaClient={mc}
      >
        <BagProvider initialState={initialState}>{children}</BagProvider>
      </MedusaProvider>
    )
  }
}

export function createCartWrapper() {
  const qc = createTestQueryClient()
  const mc = createMedusaClient()

  return ({
    children,
    initialBagState,
    initialCartState,
  }: {
    initialBagState?: BagState
    initialCartState?: Cart
    children?: React.ReactNode
  }) => {
    return (
      <MedusaProvider
        queryClientProviderProps={{ client: qc }}
        medusaClient={mc}
      >
        <BagProvider initialState={initialBagState}>
          <CartProvider initialState={initialCartState}>
            {children}
          </CartProvider>
        </BagProvider>
      </MedusaProvider>
    )
  }
}
