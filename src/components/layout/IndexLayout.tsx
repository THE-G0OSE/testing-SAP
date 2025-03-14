import Footer from "./Footer"
import Header from "./header/Header"

interface props {
  children: React.ReactNode;
}

const IndexLayout: React.FC<props> = ({children}) => {

  return (

    <>
        <Header key='header'/>

          {children}

        <Footer key='footer'/>
    </>

  )

}

export default IndexLayout