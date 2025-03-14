import {motion} from 'motion/react'
import HomePage from "./components/pages/home/HomePage"
import ReviewPage from "./components/pages/review/ReviewPage"
import { Route, Routes } from "react-router"
import { useDB, useTheme } from "./store"
import { useEffect } from "react"
import IndexLayout from "./components/layout/IndexLayout"

const App = () => {

  const DB = useDB()

  const theme = useTheme()

  useEffect(() => {
    DB.fetchReviews()
  }, [])

  const containerVar ={
    show: {transition: {staggerChildren: .3}}
  }

  return (

    <motion.div className={'flex flex-col justify-between w-screen min-h-screen overflow-x-hidden text-[.7rem] lg:text-[1rem]' + theme.mainColor()}
      variants={containerVar}
      initial='hide' 
      animate='show'
    >

      <Routes>

        <Route element={<IndexLayout/>}>

          <Route path='/' element={DB.reviews && <HomePage reviews={DB.reviews}/>} />

          <Route path='/review'>
            <Route path=':reviewId' element={<ReviewPage/>} />
          </Route> 

        </Route>

      </Routes>

    </motion.div>

  )

}

export default App