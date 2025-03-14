import {motion} from 'motion/react'

interface props {
    className?: string; 
    children: React.ReactNode;
    onClick: () => void
}

const Button: React.FC<props> = ({children, className='', onClick}) => {

  const buttonVar = {
    hide: {y: '-100%'},
    show: {y: 0, transition: {duration: .6, type: 'spring', stiffness: 70}}
  }

  return (

    <motion.button onClick={onClick} className={className + ' h-16 aspect-square lg:h-19 flex justify-center items-center '}
        variants={buttonVar} 
        whileHover={{scale: 1.1, rotateZ: 10,  transition: {duration: .2, type: 'spring', stiffness: 100}}}
        whileTap={{scale: 0.95, rotateZ: -5, transition: {duration: .2, type: 'sping', stiffness: 100}}}
    >

        {children}

    </motion.button>

  )

}

export default Button