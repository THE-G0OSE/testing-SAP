import {motion} from 'motion/react'
import { review, useDB, useModal, useTheme } from '../../../../store'
import { SubmitHandler, useForm } from 'react-hook-form'
import RatingChoice from './RatingChoice'

interface props {
    review: review | null;
}

const EditModal: React.FC<props> = ({review}) => {

    const theme = useTheme()
    const modal = useModal()
    const DB = useDB()

    interface form {
        username: string;
        text: string;
        category: string;
        rating: string;
    }

    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<form>({defaultValues: {
        username: review ? review.username : '',
        text: review ? review.text : '',
        category: review ? review.categorie : '',
        rating: review ? String(review.rating) : '',
    }})

    const modalVar = {
        hide: {opacity: 0, transition: { duration: .4, ease: 'easeIn'}},
        show: {opacity: 1, transition: { duration: .6, ease: 'easeOut', delayChildren: .4}}
    }

    const formVar = {
        hide: {y: 200, opacity: 0, transition: {duration: .4, type: 'spring', stiffness: 70}},
        show: {y: 0,   opacity: 1, transition: {duration: .6, type: 'spring', stiffness: 70}}
    }

    const submity: SubmitHandler<form> = (data) => {
        if(!data.rating){
            setError('rating', {type: 'custom', message: 'rating is required'})
        } else if (DB.reviews?.find((review) => review.username == data.username) && review!.username != data.username) {
            setError('username', {type: 'custom', message: 'username is alredy used'})
        } else {
            const date = new Date();
            DB.changeReview(Number(review!.id), {id: review!.id, username: data.username, categorie: data.category, rating: Number(data.rating), text: data.text, views: 0, date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` })
            DB.fetchReviews()
            modal.setIsEditing(false)
        }
    }

  return (

    <motion.div className={'fixed top-0 left-0 w-screen h-screen blur-back flex justify-center items-center z-20' + theme.secondColor(true)}
      variants={modalVar} 
      initial='hide'
      animate='show'
      exit='hide'
    >

      <motion.form onSubmit={handleSubmit(submity)} className={'rounded-xl w-[90vw] max-w-140 flex flex-col py-6 px-7 text-[1.4em]' + theme.secondColorAccent() + theme.textColor()}
        variants={formVar} 
      >

        <div>
            <label className='block' htmlFor="username">Username: </label>
            <input className={'mt-2 w-full rounded-xl py-0.5 px-2 outline-none' + theme.accentColor()} type="text" id='username'   {...register('username', {minLength: {value: 4, message: 'username must be at least 4 characters'}, required: 'username is required'})} />
            <p className='h-10 text-red-500'>{errors.username && errors.username.message}</p>
        </div>

        <div>
            <label className='block' htmlFor="text">Text: </label>
            <textarea className={'w-full mt-2 resize-none min-h-40 py-0.5 px-2 rounded-xl outline-none' + theme.accentColor()} id='text'  {...register('text', {minLength: {value: 4, message: 'text must be at least 4 characters'}, required: 'text is required'})} />
            <p className='h-10 text-red-500'>{errors.text && errors.text.message}</p>
        </div>

        <div>
            <label className='block' htmlFor="category">Category: </label>
            <input className={'mt-2 w-full type="text py-0.5 px-2 rounded-xl outline-none' + theme.accentColor()} id='category'  {...register('category', {minLength: {value: 3, message: 'category must be at least 3 characters'}, required: 'category is required'})} />
            <p className='h-10 text-red-500'>{errors.category && errors.category.message}</p>
        </div>

        <div className='min-h-15 w-full'>
            <RatingChoice value={review ? review.rating : 0} register={register}/>
            <p className='h-10 text-red-500'>{errors.rating && errors.rating.message}</p>
        </div>

        <div className='flex items-center justify-between w-full '>
            <button type='button' onClick={() => modal.setIsEditing(false)} className={'rounded-xl w-[45%] py-1' + theme.secondColor()}>
                Back
            </button>
            <button type='submit' className={'rounded-xl py-1 w-[45%]' + theme.accentColor()}>
                {isSubmitting ? 'Loading...' : 'Edit'}
            </button>
        </div>

      </motion.form> 

    </motion.div>

  )

}

export default EditModal