import HomePage from "./components/home/HomePage"
import { Route, Routes } from "react-router"
import { useDB } from "./components/store"
import { useEffect } from "react"

const App = () => {

  const DB = useDB()

  useEffect(() => {
    DB.fetchReviews()
  }, [])

  return (

    <div>

      {DB.reviews && <HomePage reviews={DB.reviews}/>}

    </div>

  )

}

export default App