import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppRoute = () => {
  return (
    <>
    <Header />
    <main>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </main>
    <Footer />
    </>
  )
}

export default AppRoute