import HomePage from "./components/home/HomePage"
import ReviewPage from "./components/review/ReviewPage"
import { Route, Routes } from "react-router"
import { useDB } from "./store"
import { useEffect } from "react"

const App = () => {

  const DB = useDB()

  useEffect(() => {
    DB.fetchReviews()
  }, [])

  return (

    <div className='w-screen h-screen overflow-x-hidden'>

      <Routes>

        <Route path='/' element={DB.reviews && <HomePage reviews={DB.reviews}/>} />

        <Route path='/review'>
          <Route path=':reviewId' element={<ReviewPage/>} />
        </Route> 

      </Routes>

    </div>

  )

}

export default App