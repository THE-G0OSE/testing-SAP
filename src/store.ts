import {create} from 'zustand'

export type review = {
    id: string;
    username: string;
    text: string;
    rating: number;
    categorie: string;
    date: string;
    views: number; 
} 

type color = (blur? : boolean) => string;

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

interface ITheme {
    theme: 'light' | 'dark',
    changeTheme: () => void,
    mainColor: color,
    secondColor: color,
    accentColor: color,
    secondColorAccent: color,
    textColor: color,
    textSecondColor: color,
}

interface IModal {
    isShow: boolean;
    isEditing: boolean;
    editingReview: review | null;
    setIsShow: (arg: boolean) => void;
    setIsEditing: (arg: boolean) => void;
    setEditing: (review: review) => void;
}

interface IExit {
    exitType: string;
    choosenReviewId: null | string;
    setChoosen: (id: string) => void;
    setExitType: (type: string) => void;
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
        get().fetchReviews()
    },
    getReviewById: (id) => {
        const result = get().reviews!.find((review) => review.id == String(id));
        if (result) {
            return result
        } else {
            return null
        }
    },
    changeReview: (id, newReview) => {
        fetch(`${url}/${id}`,
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
        set({reviews: get().reviews!.filter((review) => review.id != String(id))})
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            return res.json()
        })
        .then(data => console.log(data))
    }
}))

export const useTheme = create<ITheme>((set, get) => ({
    theme: 'dark',
    changeTheme: () => set({theme: get().theme == 'light' ? 'dark' : 'light'}),
    mainColor:         () => get().theme == 'light' ? ' bg-cyan-200 ' : ' bg-gradient-to-br from-teal-950 to-cyan-900', 
    secondColor:       (blur = false) => get().theme == 'light' ? (blur ? ' bg-cyan-400/20 ' : ' bg-cyan-400 ') : (blur ? ' bg-cyan-800/20 ' : ' bg-cyan-800 '),
    accentColor:       (blur = false) => get().theme == 'light' ? (blur ? ' bg-cyan-600/20 ' : ' bg-cyan-600 ') : (blur ? ' bg-cyan-600/20 ' : ' bg-cyan-600 '),
    secondColorAccent: (blur = false) => get().theme == 'light' ? (blur ? ' bg-cyan-500/20 ' : ' bg-cyan-500 ') : (blur ? ' bg-cyan-700/20 ' : ' bg-cyan-700 '),

    textColor:         (blur = false) => get().theme == 'light' ? (blur ? ' text-cyan-600/20 ' : ' text-cyan-600 ') : (blur ? ' text-cyan-200/20 ' : ' text-cyan-200 '),
    textSecondColor:   (blur = false) => get().theme == 'light' ? (blur ? ' text-cyan-400/20 ' : ' text-cyan-400 ') : (blur ? ' text-cyan-400/20 ' : ' text-cyan-400 '),
}))

export const useModal = create<IModal>((set) => ({
    isShow: false,
    isEditing: false,
    editingReview: null,
    setIsShow: (arg) => set({isShow: arg}),
    setIsEditing: (arg) => set({isEditing: arg}),
    setEditing: (review) => set({editingReview: review})

}))

export const useExitAnimation = create<IExit>((set) => ({
    exitType: 'leave',
    choosenReviewId: null,
    setChoosen: (id) => set({choosenReviewId: id}),
    setExitType: (type) => {
        set({exitType: type})
        setTimeout(() => set({exitType: 'leave'}), 1000)
    }
}))