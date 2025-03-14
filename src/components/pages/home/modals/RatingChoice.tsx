import {motion} from 'motion/react'
import { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

interface props {
  register: any;
  value?: number
}

const RatingChoice: React.FC<props> = ({register, value = 0}) => {

  const [rating, setRating] = useState<number>(value)

  return (

    <motion.div className='flex w-full px-4 justify-around text-[2em]'>

      <label className='' onClick={() => setRating(1)}><input className='hidden' type="radio" name='rating' value='1' {...register('rating')}/>{rating > 0 ? <FaStar/> : <FaRegStar/>}</label> 

      <label className='' onClick={() => setRating(2)}><input className='hidden' type="radio" name='rating' value='2' {...register('rating')}/>{rating > 1 ? <FaStar/> : <FaRegStar/>}</label> 

      <label className='' onClick={() => setRating(3)}><input className='hidden' type="radio" name='rating' value='3' {...register('rating')}/>{rating > 2 ? <FaStar/> : <FaRegStar/>}</label> 

      <label className='' onClick={() => setRating(4)}><input className='hidden' type="radio" name='rating' value='4' {...register('rating')}/>{rating > 3 ? <FaStar/> : <FaRegStar/>}</label> 

      <label className='' onClick={() => setRating(5)}><input className='hidden' type="radio" name='rating' value='5' {...register('rating')}/>{rating > 4 ? <FaStar/> : <FaRegStar/>}</label> 

    </motion.div>

  )

}

export default RatingChoice