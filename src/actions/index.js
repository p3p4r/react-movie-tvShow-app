import axios from 'axios';

// offers
export const FETCH_OFFERS = 'FETCH_OFFERS';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_FAILURE = 'FETCH_OFFERS_FAILURE';
export const RESET_OFFERS = 'RESET_OFFERS';
export const GET_POPULAR_SHOW_INFO = 'GET_POPULAR_SHOW_INFO';
export const GET_MOST_POPULAR_SHOWS = 'GET_MOST_POPULAR_SHOWS';
// offer
export const FETCH_OFFER = 'FETCH_OFFER';
export const FETCH_OFFER_SUCCESS = 'FETCH_OFFER_SUCCESS';
export const FETCH_OFFER_FAILURE = 'FETCH_OFFER_FAILURE';
export const RESET_OFFER = 'RESET_OFFER';

export const VIDEO_PLAYER = 'VIDEO_PLAYER';
export const CARD_STATE = 'CARD_STATE';

const api_key = process.env.REACT_APP_API_KEY
const url = "https://api.themoviedb.org/3";

const days = 1;
const today = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
const cachedLimitDate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(); // keep storage for x days

// Check if reach the limit time
function reachedLimitTime(now){
    let limitDate = new Date(cachedLimitDate)
    now = new Date(now);

    if(now > limitDate)
        return true

    return false
}

// store cache
function getCache(name){
    const today = new Date();
    const now = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    const localName = name+"_data";

    if(reachedLimitTime(now)){
        localStorage.removeItem(name+"_data")
        localStorage.removeItem(localName)
        return false
    }

    if(localStorage.getItem(localName)) { //if not exist or not in time
        //console.log('Cached data')
        return JSON.parse(localStorage.getItem(localName))
    }

    return false
}

function storeCache(name, value="", time) {
    if(name === ""){
        console.error(`${name} is required in function storeCache. `)
        return false
    }

    localStorage.setItem(name+"_data",JSON.stringify(value)); // data
    localStorage.setItem(name,time);    // time

    return true
}

export function randomShowCategory(){
    const show = {
        type:'CATEGORY',
        name: ''
    }
    let shows = ['movie','tv'];
    // Random movie or tv
    let r = Math.floor(Math.random() * 2);
    let rShow = shows[r]
    show.name = rShow;
    return show;
}


export function loadMostPopularShows(show = ""){
    // gerenarate random show
    if(!show)
        show = randomShowCategory();

    if(getCache(show))
        return fetchOffersSuccess(getCache(show))

    return function action(dispatch) {
        dispatch({ type: FETCH_OFFERS })

    let totalPagesToSeach = 5;
    let r = Math.floor(Math.random() * totalPagesToSeach);

    const request = axios({
        method: 'GET',
        redirect: 'follow',
        url:`${url}/${show}/popular?api_key=${api_key}&language=en-US&page=${r}`,
        headers: []
      });

      return request.then(res => {
            console.log("Getting from APi: "+ show)

            if( res.status !== 200 ){
                console.log(res.statusText)
                dispatch(fetchOffersError(res.statusText))
            }

            storeCache(show,res.data.results,cachedLimitDate)
            dispatch(setFullListPopular(res.data.results))
            dispatch(fetchOffersSuccess(res.data.results))

        },
        err => dispatch(fetchOffersError(err))
      );
    }
}

export function getFullInfo(data,show) {

    if(data === undefined)
        return fetchOffersError("Data undefiend")
    // obtain random id
    let randNum = Math.floor(Math.random() * data.length);
    let randShowbyID = data[randNum].id

    return function action(dispatch) {
        dispatch({ type: FETCH_OFFERS })

    const request = axios({
        method: 'GET',
        redirect: 'follow',
        url: `${url}/${show}/${randShowbyID}?api_key=${api_key}&language=en-US`,
        headers: {
            'Content-Type': 'application/json'
        }
      });

      return request.then(res => {
            console.log("Getting from APi: "+ randShowbyID)

            if( res.status !== 200 ){
                dispatch(fetchOffersError(res.statusText))
            }
            dispatch(setFullInfo({data:res.data,showType: show}))
            dispatch(fetchOffersSuccess(res.data))

        },
        err => dispatch(fetchOffersError(err))
      );
    }
}

export function setFullInfo(value){
    return {
        type: GET_POPULAR_SHOW_INFO,
        data: {
            data: value.data,
            show: value.showType
        },

    }
}

export function setFullListPopular(value){
    return {
        type: GET_MOST_POPULAR_SHOWS,
        data: value,
    }
}


export function setCardState(value) {
    return{
        type: CARD_STATE,
        status: value
    }
}

export function setPlayerState(value) {
    return {
		type: VIDEO_PLAYER,
		status: value
	}
}

export function fetchOffersSuccess(offers) {
	return {
		type: FETCH_OFFERS_SUCCESS,
		payload: offers
	}
}

export function fetchOffersError(error) {
	return {
		type: FETCH_OFFERS_FAILURE,
		payload: error
	}
}