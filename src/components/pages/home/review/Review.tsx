import {motion, useInView} from 'motion/react'
import { review, useDB, useModal, useTheme } from '../../../../store'
import { useEffect, useRef, useState } from 'react'
import Rating from './Rating'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface props {
  review: review
}

const Review: React.FC<props> = ({review}) => {

  const theme = useTheme()
  const modal = useModal()
  const DB = useDB()

  const reviewRef = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(reviewRef, {once: true})
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => setIsShow(isInView), [isInView])

  const reviewVar = { 
    hide: {y: 50, opacity: 0},
    show: {y: 0, opacity: 1, transition: {duration: 2, type: 'spring', stiffness: 70, delay: .3}},
    exit: {scale: 0, rotateZ: 180, transition: {duration: .6, type: 'spring', stiffness: 40}}
  }

  return (

    <motion.div ref={reviewRef} className={'w-80 lg:w-120 h-50 lg:h-75 rounded-2xl flex flex-col justify-between p-4 blur-back' + theme.secondColorAccent(true)} 
      variants={reviewVar}
      initial='hide'
      animate={isShow ? 'show' : 'hide'}
      exit='exit'
      whileHover={{
        translateZ: 60,
        rotateX: -5,
        boxShadow: 'black 10px 10px 40px',
        transition: {duration: .8, type: 'spring', stiffness: 100}
      }}
    >
      <motion.div className='flex justify-between w-full'>
        <p className={'text-[1.5em]'}>{review.username}</p>
        <p className={'text-[1.3em]' + theme.textSecondColor()}>{review.categorie}</p>
        <section className='flex items-center gap-6'>

          <button className='text-[1.4em]' onClick={() => {
            modal.setEditing(review)
            modal.setIsEditing(true)
          }}>
            <FaEdit/>
          </button>

          <button className='text-red-500 text-[1.4em]' onClick={() => {
            DB.deleteReview(review.id)
            DB.fetchReviews()
          }}>
            <FaTrash/> 
          </button>

        </section>
      </motion.div>

      <motion.div className='flex items-center justify-center w-full'>
        <p className='text-[1.3em]'>{review.text.length > 170 ? review.text.slice(0, 170) + '...' : review.text}</p>
      </motion.div>

      <motion.div className='flex justify-between w-full'>
        <Rating rating={review.rating}/>
        <p className={'' + theme.textSecondColor()}>{review.date}</p>
      </motion.div>
      
    </motion.div>

  )

}

export default Review