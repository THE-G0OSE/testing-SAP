import {motion} from 'motion/react'
import { useRef, useState } from 'react'
import { filter, useTheme } from '../../../../../store'

interface props {
    name: 'category' | 'rating',
    setFilter: (filter: filter) => void,
    filter: filter 
}

const FilterOption: React.FC<props> = ({name, setFilter, filter}) => {

  const [type, setType] = useState<'value' | 'interval'>('value')

  const typeInputRef = useRef<HTMLInputElement | null>(null)
  const input1 = useRef<HTMLInputElement | null>(null)
  const input2 = useRef<HTMLInputElement | null>(null)

  const theme = useTheme()

  const typeVar = {
    inactive: {scale: 1  , transition: {duration: .4, ease: 'easeInOut'}},
    active:   {scale: 1.3, transition: {duration: .4, ease: 'easeInOut'}}
  }

  return (

    <motion.div className='flex-col flex gap-4 pl-4'>

        <span className='text-[1.2em]'>{name}:</span>

        {name == 'rating' && <div className='flex justify-around'>

          <motion.span onClick={() => {setType('value'); setFilter({...filter, type: 'value'})}}
            variants={typeVar} 
            initial='inactive'
            animate={type == 'value' ? 'active' : 'inactive'}
          >value</motion.span> 

          <motion.span onClick={() => {setType('interval'); setFilter({...filter, type: 'interval'})}}
            variants={typeVar} 
            initial='inactive'
            animate={type == 'interval' ? 'active' : 'inactive'}
          >interval</motion.span>

        </div>
        }

        <div>
          
          {type == 'value' && <>
            <input ref={typeInputRef} onInput={() => setFilter({...filter, value: typeInputRef.current!.value})} className={'rounded-lg px-3 py-1' + theme.accentColor()} type="text" />
          </>}
          {type == 'interval' && <>
            <input ref={input1} onInput={() => setFilter({...filter, value: [Number(input1.current!.value), Number(input2.current!.value)]})} type="number" className={"rounded-lg px-3 py-1" + theme.accentColor()} />
            <input ref={input2} onInput={() => setFilter({...filter, value: [Number(input1.current!.value), Number(input2.current!.value)]})} type="number" className={"rounded-lg px-3 py-1" + theme.accentColor()} />
          </>}

        </div>

    </motion.div>

  )

}

export default FilterOption