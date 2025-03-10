import {create} from 'zustand'

export type review = {
    id: number;
    username: string;
    text: string;
    rating: number;
    categorie: string;
    date: string;
    views: number; 
} 

interface IDB {
    reviews: review[] | null;
    isPending: boolean;
    error: null | any;
    fetchReviews: () => void;
    getReviewById: (id: number) => review | null;
    postReview: (newReview: review) => void
    changeReview: (id: number, newReview: review) => void;
    deleteReview: (id: number) => void;
}

const url = 'http://192.168.1.42:3000/reviews'

export const useDB = create<IDB>((set, get) => ({
    reviews: [],
    isPending: true,
    error: null,
    fetchReviews: () => {
        setTimeout(() => 
        fetch(url).then((res) => {
            if (!res.ok) {
                throw Error('Error fetching reviews data')
            }
            return res.json()
        })
        .then(data => {
            set({
                isPending: false,
                error: null,
                reviews: data
            })
        })
        .catch(err => {
            set({
                isPending: false,
                error: err.message
            })
        }), 1000)
    },
    postReview: (newReview) => {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview)
        })
        .then(res => {
            return res.json()
        })
        .then(data => console.log(data))
    },
    getReviewById: (id) => {
        const result = get().reviews!.find((review) => review.id = id);
        if (result) {
            return result
        } else {
            return null
        }
    },
    changeReview: (id, newReview) => {
        fetch(`${url}${id}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview)
            }
        ).then(res => {
            return res.json()
        }).then(data => console.log(data))
    },
    deleteReview: (id) => {
        fetch(`${url}${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            return res.json()
        })
        .then(data => console.log(data))
    }
}))