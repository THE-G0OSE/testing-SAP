import {motion, useInView} from 'motion/react'
import { review, useDB, useExitAnimation, useModal, useTheme } from '../../../../store'
import { useEffect, useRef, useState } from 'react'
import Rating from './Rating'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate} from 'react-router'

interface props {
  review: review
}

const Review: React.FC<props> = ({review}) => {

  const theme = useTheme()
  const modal = useModal()
  const DB = useDB()
  const {exitType, setExitType} = useExitAnimation()
  const nav = useNavigate()

  const reviewRef = useRef<HTMLDivElement | null>(null)

  const isInView = useInView(reviewRef, {once: true})
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isChoosen, setIsChoosen] = useState<boolean>(false)

  useEffect(() => setIsShow(isInView), [isInView])

  const reviewVar = { 
    hide: {y: 50, opacity: 0},
    show: {y: 0, opacity: 1, transition: {duration: 2, type: 'spring', stiffness: 70, delay: .3}},
    delete: {scale: 0, rotateZ: 90, transition: {duration: .5, ease: 'easeIn'}},
    leave: {y: 50, opacity: 0, transition: {duration: .8, ease: 'easeInOut'}},
    choosen: {y: -700, rotateY: 180, transition: {duration: 1.5, ease: 'easeInOut'}}
  }

  return (

    <motion.div ref={reviewRef} className={'w-80 lg:w-120 h-50 lg:h-75 rounded-2xl flex flex-col justify-between p-4' + theme.secondColorAccent()}
      onClick={() => {
        setExitType('leave')
        setIsChoosen(true)
        DB.changeReview(Number(review.id), {...review, views: review.views + 1})
        nav(`/review/${review.id}`)
      }} 
      variants={reviewVar}
      initial='hide'
      animate={isShow ? 'show' : 'hide'}
      exit={isChoosen ? 'choosen' : exitType}
      whileHover={{
        scale: 1.1,
        boxShadow: 'black 10px 10px 40px',
        transition: {duration: .8, type: 'spring', stiffness: 100}
      }}
    >
      <motion.div className='flex justify-between w-full'>
        <p className={'text-[1.5em]'}>{review.username}</p>
        <p className={'text-[1.3em]' + theme.textSecondColor()}>{review.categorie}</p>
        <section className='flex items-center gap-6'>

          <button className='text-[1.4em]' onClick={(e) => {
            e.stopPropagation() 
            modal.setEditing(review)
            modal.setIsEditing(true)
          }}>
            <FaEdit/>
          </button>

          <button className='text-red-500 text-[1.4em]' onClick={(e) => {
            e.stopPropagation()
            setExitType('delete')
            DB.deleteReview(Number(review.id))
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