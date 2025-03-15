import { FaStar, FaRegStar} from 'react-icons/fa'
import {motion} from 'motion/react'
import { useTheme } from '../../../../store';

interface props {
    rating: number;
}

const Rating: React.FC<props> = ({rating}) => {

    const theme = useTheme()

    const containerVar = {
        show: {transition: {staggerChildren: .2, delayChildren: 1}}
    }

    const starVar = {
        hide: {scale: 0, rotateZ: -180},
        show: {scale: 1, rotateZ: 0, transition: {duration: 1, type: 'spring', stiffness: 100}}
    }

  return (

    <motion.div className='flex items-center'
        variants={containerVar} 
        initial='hide'
        animate='show'
    >
      <motion.div className={'' + theme.textColor()} variants={starVar}>{rating > 0 ? <FaStar/> : <FaRegStar/>}</motion.div>
      <motion.div className={'' + theme.textColor()} variants={starVar}>{rating > 1 ? <FaStar/> : <FaRegStar/>}</motion.div>
      <motion.div className={'' + theme.textColor()} variants={starVar}>{rating > 2 ? <FaStar/> : <FaRegStar/>}</motion.div>
      <motion.div className={'' + theme.textColor()} variants={starVar}>{rating > 3 ? <FaStar/> : <FaRegStar/>}</motion.div>
      <motion.div className={'' + theme.textColor()} variants={starVar}>{rating > 4 ? <FaStar/> : <FaRegStar/>}</motion.div>
    </motion.div>

  )

}

export default Rating