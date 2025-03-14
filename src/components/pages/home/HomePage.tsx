import {AnimatePresence, motion} from 'motion/react'
import { review, useModal, useTheme } from '../../../store';
import Aside from './aside/Aside';
import Review from './review/Review';
import PostModal from './modals/PostModal';
import EditModal from './modals/EditModal';

interface props {
    reviews: review[];
}

const HomePage: React.FC<props> = ({reviews}) => {

  const theme = useTheme()
  const modal = useModal()

  return (
    <>
      <motion.div className={'min-h-[80vh] flex justify-center items-center content-start flex-wrap gap-5 lg:gap-8 mb-3 pt-20 md:pt-30 pb-10 transform-3d perspective-distant px-5 ' + theme.textColor()}>
        <AnimatePresence>
        {reviews.map(review => <Review key={review.id} review={review}/>)}
        </AnimatePresence>
      </motion.div>
      <Aside/>
      <AnimatePresence>
        {modal.isShow && <PostModal/>}
        {modal.isEditing && <EditModal review={modal.editingReview} />}
      </AnimatePresence>
    </>
  )

}

export default HomePage