import {AnimatePresence, motion} from 'motion/react'
import HomePage from "./components/pages/home/HomePage"
import ReviewPage from "./components/pages/review/ReviewPage"
import { Route, Routes, useLocation } from "react-router"
import { useDB, useFilter, useSort, useTheme } from "./store"
import { useEffect } from "react"
import IndexLayout from "./components/layout/IndexLayout"

const App = () => {

  const DB = useDB()
  const theme = useTheme()
  const sort = useSort()
  const filter = useFilter()

  const location = useLocation()

  const locationArr = location.pathname?.split('/') ?? [];

  useEffect(() => {
    DB.fetchReviews()
    setInterval(() => {DB.fetchReviews()}, 5000);
  }, [])

  useEffect(() => {
    sort.setSortedReviews(sort.sortReviews(DB.reviews!))
    filter.setFilteredReviews(sort.sorterdReviews)
  }, [DB.reviews])

  const containerVar ={
    show: {transition: {staggerChildren: .3}}
  }

  return (

    <motion.div className={'flex flex-col justify-between w-screen min-h-screen overflow-x-hidden text-[.7rem] lg:text-[1rem]' + theme.mainColor()}
      variants={containerVar}
      initial='hide' 
      animate='show'
    >
    <IndexLayout>
    <AnimatePresence mode='wait'>
      <Routes location={location} key={locationArr[1]}>

          <Route index element={DB.reviews && <HomePage reviews={filter.filteredReviews}/>} />

          <Route path='review/:reviewId' element={DB.reviews && <ReviewPage />} />

          <Route path={'*'} element={<div className='flex justify-center items-center h-screen w-screen'>Page not found</div>}/>

      </Routes>
    </AnimatePresence>
    </IndexLayout>



    </motion.div>

  )

}

export default App