import {motion} from 'motion/react'
import { review } from '../../store';

interface props {
    reviews: review[];
}

const HomePage: React.FC<props> = ({reviews}) => {

  return (

    <motion.div>
        {reviews.map(review => <div>{`${review.id} ${review.categorie} ${review.rating} ${review.text} ${review.date} ${review.username} ${review.views}`}</div>)}
    </motion.div>

  )

}

export default HomePage