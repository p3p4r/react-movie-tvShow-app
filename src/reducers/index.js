import listPopular from './listPopular';
import fullInfo from './fullInfo';
import cardState from './cardState';
import offers from './offers';
import playerState from './playerState';

import { combineReducers } from 'redux';

 const allReducers = combineReducers({
    listShows        : listPopular,
    fullInfoShow     : fullInfo,
    offers           : offers,
    cardVisibility   : cardState,
    videoPlayer      : playerState,
 });

export default allReducers;
