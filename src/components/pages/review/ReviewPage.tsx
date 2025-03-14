import {motion} from 'motion/react'
import { useDB, useTheme } from '../../../store'
import { useParams } from 'react-router'

const PostPage = () => {

  const {reviewId} = useParams()

  const DB = useDB()
  const theme = useTheme()

  const review = DB.getReviewById(Number(reviewId))

  return (

    <motion.div className={'min-h-[80vh]' + theme.textColor()}>
      {review && `${review.id} ${review.categorie} ${review.date} ${review.rating} ${review.text}`}
    </motion.div>

  )

}

export default PostPage