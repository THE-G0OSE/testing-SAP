import {motion} from 'motion/react'
import { useTheme } from '../../../../store'
import { FaAngleRight } from 'react-icons/fa'
import { useState } from 'react'
import Sorting from './ui/Sorting'
import Filter from './ui/Filter'

const Aside = () => {

  const theme = useTheme()

  const [isShow, setIsShow] = useState<boolean>(false)

  const arrowVar = {
    hide: {rotateZ: 0, transition: {duration: .8, type: 'spring', stiffness: 100}},
    show: {rotateZ: 180, transition: {duration: .8, type: 'spring', stiffness: 100}}
  }

  const sideVar ={
    hide: {x: '-90%', transition: {duration: .8, type: 'spring', stiffness: 60}},
    show: {x: '-10%', transition: {duration: .8, type: 'spring', stiffness: 60}}
  }


  return (

    <motion.div className={'w-200 max-w-[80vw] fixed left-0 h-screen top-0 z-0 flex items-center gap'}
      variants={sideVar} 
      initial='hide'
      animate={isShow ? 'show' : 'hide'}
    >

      <div className={'w-[90%] h-full blur-back flex flex-col gap-4 pl-[15%] pt-30 text-[1.3em] ' + theme.accentColor(true) + theme.textColor()}>

        <Sorting/>

        <Filter/>

      </div>

      <motion.button onClick={() => setIsShow(!isShow)} className={'text-[2em]' + theme.textColor()}
        variants={arrowVar}
        initial='hide'
        animate={isShow ? 'show' : 'hide'}
      >
        <FaAngleRight/>
      </motion.button>

    </motion.div>

  )

}

export default Aside