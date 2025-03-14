import {motion} from 'motion/react'
import { useModal, useTheme } from '../../../store'
import Button from './Button'
import { useNavigate } from 'react-router'
import { IoMdHome } from 'react-icons/io'
import { FaAdjust, FaEdit } from 'react-icons/fa'

const Header = () => {

  const theme = useTheme()
  const modal = useModal()

  const navigate = useNavigate()

  const headerVar = {
    hide: {y: '-120%'},
    show: {y: '-35%', transition: {duration: 0.6, type: 'spring', stiffness: 70, staggerChildren: .3, delayChildren: .3}}
  }

  return (

    <motion.div key='header div' className={'w-screen h-25 lg:h-30 -mb-8 flex items-end jusitfy-between z-10 fixed pl-10' + theme.secondColor()}
      variants={headerVar} 
    >

      <Button className={theme.textColor() + ' text-[3.2em] lg-[2.4em]'} onClick={() => navigate('/')}>
        <IoMdHome/>
      </Button>

      <Button className={theme.textColor() + 'text-[2.6em] lg:text-[2.4em]'} onClick={() => theme.changeTheme()} >
        <FaAdjust/>
      </Button>

      <Button className={'text-[2.5em]' + theme.textColor()} onClick={() => modal.setIsShow(true)}>
        <FaEdit/>
      </Button>

    </motion.div>

  )

}

export default Header