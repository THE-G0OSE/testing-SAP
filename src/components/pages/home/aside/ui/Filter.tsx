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

        <button className={'px-3 py-1 max-w-50' + theme.accentColor()} onClick={() => {
          if(ratingFilter){filter.setFilter('rating', ratingFilter)}
          if(categoryFilter){filter.setFilter('category', categoryFilter)}
          }}>Apply</button>

    </motion.div>

  )

}

export default Filter