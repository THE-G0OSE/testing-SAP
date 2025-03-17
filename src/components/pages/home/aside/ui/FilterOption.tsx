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

  const filterinput = () => {
    setFilter({...filter, value: [(input1.current!.value === '') ? 0 : Number(input1.current!.value), Number(input2.current!.value == '' ? 5 : input2.current!.value)]})
  }

  return (

    <motion.div className='flex-col flex gap-4 pl-4'>

        <span className='text-[1.2em]'>{name}:</span>

        {name == 'rating' && <div className='flex justify-around'>

          <motion.span onClick={() => {setType('value'); setFilter({...filter, type: 'value', value: null})}}
            variants={typeVar} 
            initial='inactive'
            animate={type == 'value' ? 'active' : 'inactive'}
          >value</motion.span> 

          <motion.span onClick={() => {setType('interval'); setFilter({...filter, type: 'interval', value: null})}}
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
          {type == 'interval' && <div className='flex justify-around'>
            from: <input ref={input1} onInput={filterinput} type="text" className={"rounded-lg px-3 py-1 w-[20%] outline-none" + theme.accentColor()} />
            to:   <input ref={input2} onInput={filterinput} type="text" className={"rounded-lg px-3 py-1 w-[20%] outline-none" + theme.accentColor()} />
          </div>}

        </div>

    </motion.div>

  )

}

export default FilterOption