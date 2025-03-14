import {motion} from 'motion/react'
import { review, useDB, useTheme } from '../../../store'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'

const PostPage = () => {

  const {reviewId} = useParams()

  const DB = useDB()
  const theme = useTheme()

  const  [review, setReview] = useState<review | null>(DB.getReviewById(Number(reviewId)))

  useEffect(() => {setTimeout(() => {
    if (!review) {
      DB.fetchReviews()
      console.log('fetching data')
      const result = DB.getReviewById(Number(reviewId))
      console.log('searching in ', DB.reviews)
      console.log('result for id', reviewId, 'is: ', result )
      if (result){
        setReview(DB.getReviewById(Number(reviewId)))
        console.log('seting new review')
      }
    }
  }, 2000)}, [])

  const containerVar = {
    hide: {y: -700, rotateY: -180},
    show: {y: 0, rotateY: 0, transition: {duration: 2, ease: 'easeInOut'}},
    exit: {y: 1000, opacity: 0, transition: {duration: 1, ese: 'easeIn'}}
  }

  return (

    <motion.div key='home' className={'min-h-[80vh] flex justify-center items-center w-full' + theme.textColor()}
    >
      {review &&
      <motion.div key={review!.id}
        className={'rounded-xl w-100 h-100' + theme.accentColor()}
        variants={containerVar}
        initial='hide'
        animate='show'
        exit='exit'
      >
      </motion.div>
      }
    </motion.div>

  )

}

export default PostPage