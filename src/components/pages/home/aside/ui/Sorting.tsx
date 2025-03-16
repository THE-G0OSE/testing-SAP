import {motion} from 'motion/react'
import SortOption from './SortOptoin'
import { useDB, useSort, useTheme } from '../../../../../store'

const Sorting = () => {

  const theme = useTheme()
  const sort  = useSort()
  const DB = useDB()

  return (

    <motion.div className='flex flex-col gap-5 '>

      <span className='font-bold text-[1.3em]'>Sorting:</span> 
      <div className='flex justify-around'>
        <SortOption name='rating' type='property'/>
        <SortOption name='views'  type='property'/>
        <SortOption name='date'   type='property'/>
      </div>
      <div className='flex justify-around'>
        <SortOption name='less to more' type='type'/>
        <SortOption name='more to less' type='type'/>
      </div>
      <div className='flex justify-end pr-10'>
      <motion.button className={'rounded-xl px-4 py-2' + theme.accentColor()} onClick={() => {
        sort.setSortedReviews(sort.sortReviews(DB.reviews!))
      }}
         
      >
        Apply
      </motion.button>
      </div>

    </motion.div>

  )

}

export default Sorting