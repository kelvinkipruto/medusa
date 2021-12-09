import React from "react"
import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "react-query"
import { MedusaProvider } from "../src"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 1,
    },
  },
})
const medusaClient = new Medusa({ baseUrl: "" })

const DefaultMedusaProvider = (props) => (
  <MedusaProvider
    queryClientProviderProps={{ client: queryClient }}
    medusaClient={medusaClient}
    {...props}
  />
)

export default DefaultMedusaProvider
