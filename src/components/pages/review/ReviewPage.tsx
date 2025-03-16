import {AnimatePresence, motion} from 'motion/react'
import { review, useDB, useTheme } from '../../../store'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import Rating from '../home/review/Rating'
import { FaEye } from 'react-icons/fa'

const PostPage = () => {

  const {reviewId} = useParams()

  const DB = useDB()
  const theme = useTheme()

  const [review, setReview] = useState<review | null>(DB.getReviewById(Number(reviewId)))
  const [tooltip, setTooltip] = useState<boolean>(false)

  useEffect(() => {
    DB.fetchReviews()
    setTimeout(() => {
    if (!review) {
      console.log('fetching data')
      const result = DB.getReviewById(Number(reviewId))
      console.log('searching in ', DB.reviews)
      console.log('result for id', reviewId, 'is: ', result )
      if (result){
        setReview(result)
        console.log('seting new review')
      }
    }
  }, 2000)}, [])

  const containerVar = {
    hide: {y: '-150%', rotateY: -90},
    show: {y: 0,    rotateY: 0,    transition: {duration: 2, ease: 'easeInOut'}},
    exit: {y: '150%', opacity: 0,    transition: {duration: 1, ease: 'easeIn'   }}
  }

  const tooltipVar = {
    hide: {y: 50, opacity: 0, transition: {duration: .4, ease: 'easeInOut'}},
    show: {y: 0, opacity: 1, transition: {duration: .4, ease: 'easeInOut'}},
  }

  return (

    <motion.div key='home' className={'min-h-[80vh] flex justify-center items-center w-full py-20' + theme.textColor()}
    >
      {review &&
      <motion.div key={review.id}
        className={'rounded-xl w-200 max-w-[80vw] min-h-100 flex flex-col justify-between items-center p-4 gap-4' + theme.accentColor()}
        variants={containerVar}
        initial='hide'
        animate='show'
        exit='exit'
      >

        <div className="w-full flex justify-between items-center lg:pl-3 ">

          <span className='font-bold text-[1.5em] w-[33%] flex justify-start relative' onClick={() => setTooltip(!tooltip)}>
            {review.username.length > 8 ? review.username.slice(0,8) + '...' : review.username}
            <AnimatePresence>
              { tooltip && <motion.div className={'blur-back rounded-xl p-2 absolute top-[110%] ' + theme.secondColor(true)}
                variants={tooltipVar}
                initial='hide'
                animate='show'
                exit='hide'
              >{review.username}</motion.div>}
            </AnimatePresence>
          </span>                          
          
          <span className={'text-[1.3em] w-[33%] flex justify-center' + theme.textSecondColor()}>{review.categorie}</span>                 
          
          <span className={'text-[1.2em] w-[33%] flex justify-end' + theme.textSecondColor()}>#{review.id}</span>

        </div>
        
        <div className="w-full flex justify-center items-center">
          <p className='text-[1.5em] w-[99%] flex justify-center'>
            {review.text}
          </p>
        </div>

        <div className="w-full flex justify-between items-center">
          <div className='text-[1.3em] w-[33%] flex'><Rating rating={review.rating}/></div>    <div className='flex items-center w-[33%] justify-center text-[1.2em]'><FaEye className='inline mr-2'/><span>{review.views}</span></div>     <span className={'w-[33%] flex justify-end text-[1.1em]' + theme.textSecondColor()}>{review.date}</span>
        </div> 

      </motion.div>
      }
    </motion.div>

  )

}

export default PostPage