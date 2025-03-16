import {motion} from 'motion/react'
import { useSort, useTheme } from '../../../../../store'

interface props {
    name: string;
    type: 'property' | 'type';
}

const SortOption: React.FC<props> = ({name, type}) => {

  const sort = useSort()
  const theme = useTheme()

  const propertyVar = {
    inactive: {scale: 1  , transition: {duration: .3, ease: 'easeInOut'}},
    active:   {scale: 1.4, transition: {duration: .3, ease: 'easeInOut'}},
  }

  return (

    <motion.div className={'inline' + ((sort.choosenProperty == name || sort.choosenType == name) ? theme.textColor() : theme.textSecondColor())} onClick={() => (type == 'property') ? sort.setProperty(name) : sort.setType(name)} 
      variants={propertyVar} 
      initial='inactive'
      animate={sort.choosenProperty == name || sort.choosenType == name ? 'active' : 'inactive'}
    >

      {name}

    </motion.div>

  )

}

export default SortOption