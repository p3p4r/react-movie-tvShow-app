import {
    FETCH_OFFERS, FETCH_OFFERS_SUCCESS, FETCH_OFFERS_FAILURE, RESET_OFFERS,
    FETCH_OFFER, FETCH_OFFER_SUCCESS, FETCH_OFFER_FAILURE, RESET_OFFER
} from '../actions';

const INITIAL_STATE = {
    offerList: {
        offers: [],
        error: null,
        loading: false
    },
    selectedOffer: {
        offer: null,
        error: null,
        loading: false
    }
};

export default function (state = INITIAL_STATE, action) {

    switch(action.type) {
        case FETCH_OFFERS:
            return {
                ...state, offerList: {
                    offers: [],
                    error: null,
                    loading: true
                }
            };
        case FETCH_OFFERS_SUCCESS:
            return {
                ...state, offerList: {
                    offers: action.payload,
                    error: null,
                    loading: false
                }
            };
        case FETCH_OFFERS_FAILURE:
            let error1 = action.payload || {message: action.payload.message}
            return {
                ...state, offerList: {
                    offers: [],
                    error: error1,
                    loading: false
                }
            };
        case RESET_OFFERS:
            return {
                ...state, offerList: {
                    offers: [],
                    error: null,
                    loading: false
                }
            };
        case FETCH_OFFER:
            return {
                ...state, selectedOffer: {
                    ...state.selectedOffer,
                    loading: true
                }
            };
        case FETCH_OFFER_SUCCESS:
            return {
                ...state, selectedOffer: {
                    offer: action.payload,
                    error: null,
                    loading: false
                }
            };
        case FETCH_OFFER_FAILURE:
            let error2 = action.payload || {message: action.payload.message}
            return {
                ...state, selectedOffer: {
                    offer: null,
                    error: error2,
                    loading: false
                }
            };
        case RESET_OFFER:
            return {
                ...state, selectedOffer: {
                    offer: null,
                    error: null,
                    loading: false
                }
            };
        default:
            return state;
    }
}
