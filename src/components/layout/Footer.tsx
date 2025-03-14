import {motion} from 'motion/react'
import { useTheme } from '../../store'

const Footer = () => {

  const theme = useTheme()

  const footerVar = {
    hide: {opacity: 0},
    show: {opacity: 1, transition: {duration: .8, ease: 'easeOut'}}
  }

  return (

    <motion.div className={'h-40 w-screen z-10 ' + theme.secondColor()}
      variants={footerVar}
    >

    </motion.div>
    
  )

}

export default Footer