import { Outlet } from "react-router"
import Footer from "./Footer"
import Header from "./header/Header"

const IndexLayout = () => {

  return (

    <>
        <Header/>

        <Outlet/>

        <Footer/>
    </>

  )

}

export default IndexLayout