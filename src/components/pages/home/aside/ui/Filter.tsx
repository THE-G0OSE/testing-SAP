import {motion} from 'motion/react'
import { filter, useFilter, useTheme } from '../../../../../store'
import FilterOption from './FilterOption'
import { useState } from 'react'

const Filter = () => {

  const filter = useFilter()
  const theme = useTheme()

  const [ratingFilter, setRatingFilter] = useState<filter>({type: 'none', value: null})
  const [categoryFilter, setCategoryFilter] = useState<filter>({type: 'none', value: null})

  return (

    <motion.div className='flex flex-col gap-8'

    >

        <span className='text-[1.3em] font-bold mb-2'>Filters:</span> 

        <FilterOption name='rating' setFilter={setRatingFilter} filter={ratingFilter}/>
        <FilterOption name='category' setFilter={setCategoryFilter} filter={categoryFilter}/>

        <div className='flex justify-end pr-10'>

        <button className={'px-4 py-2 max-w-50 rounded-lg ' + theme.accentColor()} onClick={() => {
          if(ratingFilter){filter.setFilter('rating', ratingFilter)}
          if(categoryFilter){filter.setFilter('category', categoryFilter)}
          }}>Apply</button>
        </div>
    </motion.div>

  )

}

export default Filter