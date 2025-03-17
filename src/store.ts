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

export type filter = {
    type: 'interval' | 'value' | 'none',
    value: string | number | number[] | null
}

enum filterNamesEnum {
    rating = 'rating',
    category = 'category'
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

interface ISort {
    choosenProperty: string,
    choosenType:     string,
    sorterdReviews:  review[],

    setProperty:      (property: string)  => void,
    setType:          (type: string)      => void,
    setSortedReviews: (reviews: review[]) => void,

    sortReviews: (reviews: review[]) => review[]
}

interface IFilter {
    filters: Record<filterNamesEnum, filter>;
    setFilter: (name: string, newValue: filter) => void;
    filteredReviews: review[];
    filterReviews: (reviews: review[]) => review[]
    setFilteredReviews: (reviews: review[]) => void
}

const url = 'http://localhost:3000/reviews'

export const useDB = create<IDB>((set, get) => ({
    reviews: [],
    isPending: true,
    error: null,
    fetchReviews:  () => {
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
            })
            if (data != get().reviews){
                set({reviews: data})
            }
        })
        .catch(err => {
            set({
                isPending: false,
                error: err.message
            })
        }), 1000)
    },
    postReview:    (newReview) => {
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
        let newReviews = get().reviews
        newReviews!.push(newReview)
        set({reviews: newReviews})
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
    changeReview:  (id, newReview) => {
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
        })
    },
    deleteReview:  (id) => {
        set({reviews: get().reviews!.filter((review) => review.id != String(id))})
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            return res.json()
        })
    }
}))

export const useTheme = create<ITheme>((set, get) => ({
    theme: 'dark',
    changeTheme: () => set({theme: get().theme == 'light' ? 'dark' : 'light'}),
    mainColor:         () => {return ((get().theme == 'light') ? ' bg-linear-to-br from-teal-500 to-cyan-500 ' : ' bg-linear-to-br from-teal-950 to-cyan-900')},
    secondColor:       (blur = false) => get().theme == 'light' ? (blur ? ' bg-cyan-400/20 ' : ' bg-cyan-400 ') : (blur ? ' bg-cyan-800/20 ' : ' bg-cyan-800 '),
    accentColor:       (blur = false) => get().theme == 'light' ? (blur ? ' bg-cyan-500/20 ' : ' bg-cyan-500 ') : (blur ? ' bg-cyan-600/20 ' : ' bg-cyan-600 '),
    secondColorAccent: (blur = false) => get().theme == 'light' ? (blur ? ' bg-cyan-400/20 ' : ' bg-cyan-400 ') : (blur ? ' bg-cyan-700/20 ' : ' bg-cyan-700 '),

    textColor:         (blur = false) => get().theme == 'light' ? (blur ? ' text-cyan-100/20 ' : ' text-cyan-100 ') : (blur ? ' text-cyan-200/20 ' : ' text-cyan-200 '),
    textSecondColor:   (blur = false) => get().theme == 'light' ? (blur ? ' text-cyan-200/20 ' : ' text-cyan-200 ') : (blur ? ' text-cyan-400/20 ' : ' text-cyan-400 '),
}))

export const useModal = create<IModal>((set) => ({
    isShow: false,
    isEditing: false,
    editingReview: null,
    setIsShow:    (arg)    => set({isShow: arg}),
    setIsEditing: (arg)    => set({isEditing: arg}),
    setEditing:   (review) => set({editingReview: review})

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

export const useSort = create<ISort>((set, get) => ({
    choosenProperty: 'date',
    choosenType:     'less to more',
    sorterdReviews:  [],
    setProperty:      (property) => set({choosenProperty: property}),
    setType:          (type)     => set({choosenType: type}),
    setSortedReviews: (reviews)  => set({sorterdReviews: reviews}),
    sortReviews: (reviews) => {
        const property: string = get().choosenProperty
        const type: string = get().choosenType
        const sorted = reviews.sort((a, b) => {
            let itemA : number = 0
            let itemB : number = 0
            switch (property){
                case 'views':
                    itemA = Number(a.views)
                    itemB = Number(b.views)
                    break;
                case 'rating':
                    itemA = Number(a.rating)
                    itemB = Number(b.rating)
                    break;
                case 'date': 
                    itemA = Number(a.id)
                    itemB = Number(b.id)
                    break;
            }
            return( (type == 'less to more') ? (itemA - itemB) : (itemB - itemA) )
        })
        return sorted
    } 
})
)

export const useFilter = create<IFilter>((set, get) => ({
    filters: {
        [filterNamesEnum.rating]: {
            type: 'none',
            value: null
        },
        [filterNamesEnum.category]: {
            type: 'none',
            value: null
        }
    },
    setFilter: (name, newValue) => {
        switch(name){
            case 'rating':
                set({filters: {...get().filters, rating: newValue}})
                break;
            case 'category':
                set({filters: {...get().filters, category: newValue}})
                break;
        }
    },
    filteredReviews: [],
    filterReviews: (reviews) => {
        const result = reviews.filter((review) => {
            let isValid: boolean = true
            const filters = get().filters

            if(filters.rating.value && isValid){switch(filters.rating.type){
                                            case 'interval':
                                                if (Array.isArray(filters.rating.value))
                                                isValid = (review.rating >= filters.rating.value[0]) && (review.rating <= filters.rating.value[1])
                                                break;
                                            case 'value':
                                                isValid = review.rating == filters.rating.value
                                                break;
                                          }}
            if(filters.category.value && isValid && typeof(filters.category.value) === 'string'){
                isValid = review.categorie.includes(filters.category.value)
            }
            return isValid
            }
        )
    return result
    },
    setFilteredReviews: (reviews) => set({filteredReviews: reviews})

}))