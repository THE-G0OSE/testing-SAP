import {motion} from 'motion/react'
import { useDB } from '../../store'
import { useParams } from 'react-router'

const PostPage = () => {

  const {reviewId} = useParams()

  const DB = useDB()

  const review = DB.getReviewById(Number(reviewId))

  return (

    <motion.div>
      {review && `${review.id} ${review.categorie} ${review.date} ${review.rating} ${review.text}`}
    </motion.div>

  )

}

export default PostPage