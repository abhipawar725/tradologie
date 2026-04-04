import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Test from "../test/Test"

const queryClient = new QueryClient()
const Dashboard = () => {
  return (
    <>
    <div>Dashboard</div>
    <QueryClientProvider client={queryClient}>
      <Test />
    </QueryClientProvider>
    </>
  )
}

export default Dashboard