import React, { useState, useEffect  } from 'react'
import {  Stack, Text, Box, Heading } from "@chakra-ui/core"
import { FaStar } from 'react-icons/fa'
import { IconContext } from "react-icons";
import ReadMoreAndLess from 'react-read-more-less';
import { makeStyles } from '@material-ui/core/styles';
import {  Container,  Grid, } from '@material-ui/core';
import Player from '../Player'
import './Card.css'
import ProductionCompanies from './ProductionCompanies'
import Loading from '../Loading'
// icons
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import BtnGenerate from '../ButtonGenerate'

import { useSelector, useDispatch } from 'react-redux'
import { setPlayerState, randomShowCategory, loadMostPopularShows, getFullInfo } from '../../actions'

export default function Card({ info, showType }) {
  //Cast : https://api.themoviedb.org/3/movie/338762/credits?api_key=<API_KEY>

  const BASE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/w1280/'
  //const BASE_URL_LOGO_SIZE_92 = 'https://image.tmdb.org/t/p/w92/'
  const BASE_URL_LOGO_SIZE_45 = 'https://image.tmdb.org/t/p/w45/'
  // More Sizes on: https://www.themoviedb.org/talk/5a5bf3860e0a260d9d0013c5

  const [show, setShow] = useState(showType.name);
  const dispatch = useDispatch();
  const playerStatus = useSelector(state => state.videoPlayer)
  const offers = useSelector(state => state.offers)
  const fullInfoShow = useSelector(state => state.fullInfoShow.data)
  const InfoShowData = useSelector(state => state.fullInfoShow.data.data)
  const [inf, setInfo] = useState(InfoShowData);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      setShow(fullInfoShow.show)
      setInfo(fullInfoShow.data)
    }, [fullInfoShow.show,fullInfoShow.data]);

  const name = "Generate";
  const useStyles = makeStyles((theme) => ({
    /*  background: `url(${BASE_URL_ORIGINAL+inf.backdrop_path}), url(${inf.posters.posters[1].link}) #000 no-repeat `, */
      mainContainer:{
        background: `url(${BASE_URL_ORIGINAL+inf.backdrop_path}) #000 no-repeat `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        position: 'relative',
        zIndex: '0'
      },
      twoColumns:{
        gridTemplateColumns: 'repeat(auto-fit, minmax(50%, 1fr))',
        alignItems: 'center',
      },
      playIcon: {
        height: 250,
        width: 250,
        color: '#e833409e',
        transition: 'all .5s',
        '&:hover': {
            color: '#e83340',
            borderRadius: '100%',
            backgroundColor: 'rgb(0 0 0 / 0.10)',
            boxShadow: '0 0 20px 15px rgb(0 0 0 / 0.10)',

          },
      },
}));

    const classes = useStyles();
    const handleOpen = () => {
      dispatch(setPlayerState(!playerStatus));
    }

/* https://chakra-ui.com/simplegrid*/
  const listGenres = inf.genres.map((genre,index) =>
    <React.Fragment key={genre.id}>{genre.name} {index !== inf.genres.length-1 ? ',' : ''} </React.Fragment>
  );

  const genre = inf.number_of_seasons ? (inf.number_of_seasons.length === 1 ? <React.Fragment>{inf.number_of_seasons} Season</React.Fragment> : <React.Fragment>{inf.number_of_seasons} Seasons</React.Fragment>): '';

  const title = inf.original_name ? inf.original_name : inf.original_title;
  const year = inf.release_date ? inf.release_date.split('-')[0] : '';

   function generateNewMovie(){
    try{
      const showType = randomShowCategory()
      loadMostPopularShows(showType.name)
      const showList =  dispatch( loadMostPopularShows(showType.name) )
      dispatch( getFullInfo(showList.payload,showType.name) )
    }catch (err) {
      console.error("Something went wrong:", err);
   }
  }



  return (
    <>
    {offers.offerList.loading  ? <Loading /> :''}
    <Grid container className={classes.mainContainer}>
        <Grid container item xs={12} className='info-movie--container' style={{height: '100vh'}}>
          <Grid item lg={6} sm={6} xs={12} className='Card--grid'>
            <Box gridArea='elem'>
              <Stack className="info--Card">
                <Box className="show-info-above-title"><Text fontSize="xl">{listGenres}</Text></Box>
                <Box><Heading as="h1" fontSize="6xl">{title}</Heading></Box>
                <Grid item className="show-info-below-title">
                  <Text fontSize="xl">
                    <IconContext.Provider value={{color:'orange', className:'rating-star'}}><FaStar/></IconContext.Provider>
                    {inf.vote_average}
                    </Text>
                  <Text>
                      {inf.first_air_date ? inf.first_air_date.split('-')[0].split('-')[0]  : ''}
                      {year}
                    </Text>
                  <Text>{inf.runtimeStr}</Text>
                  <Text>{genre}</Text>
                  <Text style={{ textTransform: 'uppercase' }}>{show}</Text>
                </Grid>
                <Box>
                  <Container style={{padding: '5px', fontSize:'1.15rem'}}>
                    <ReadMoreAndLess className="read-more"  charLimit={300} readMoreText=" Read more" readLessText=" Read less">
                      {inf.overview}
                    </ReadMoreAndLess>
                  </Container>
                </Box>
                <ProductionCompanies companies={inf.production_companies} baseUrl={BASE_URL_LOGO_SIZE_45} />
                <Grid item xs={12}><BtnGenerate id='button-fill--card' _onClick={ () =>{ generateNewMovie() }} name={name} _class='bottom-center'/></Grid>

              </Stack>
            </Box>
          </Grid>

          <Grid item lg={6} sm={6} xs={12} className="player">
            <IconButton aria-label="play/pause"  type="button" onClick={() => handleOpen()}>
                  <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          </Grid>

        </Grid>
        { playerStatus.status ? <Player name={title} year={year} showType={show} thumbnail={BASE_URL_ORIGINAL+inf.backdrop_path}/> : ''}
    </Grid>
  </>
  )

}


