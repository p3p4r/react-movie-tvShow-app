import React, { Component } from 'react'
import Card from './Card/Card'
import {IconContext} from "react-icons";
import { FaArrowLeft } from 'react-icons/fa'
import BtnGenerate from './ButtonGenerate'
import {connect} from 'react-redux'
import * as actionsCreate from '../actions'
import Loading from './Loading'

import Alert from '@material-ui/lab/Alert';


/* Esperar: setTimeout(() => setCardState(true),1000)*/
class Generate extends Component {
    state = {
        error: false,
        shows: null,
        infoShow: null,
        show_type: '',
    }

    async generateNewMovie(){

        try{
            const show = this.props.randomShowCategory()
            this.setState({ show_type: show })

            await this.props.loadMostPopularShows(show.name)

            const showList = this.props.loadMostPopularShows(show.name)
            this.setState({ shows: showList.payload})

            const info = await this.props.getFullInfo(showList.payload,show.name)
            this.setState({ infoShow: this.props.offers.offerList.offers})

            if(this.props.offers.offerList.error !== null || showList.type === 'FETCH_OFFERS_FAILURE')
                this.setState({ error: true})

        return info

        }catch (err) {
            console.error("Something went wrong:", err);
        }


    }

    render() {
        const {cardVisibility, setCardState, setPlayerState, videoPlayer, offers} = this.props;
        const { error, show_type, infoShow } = this.state;

        const name = 'Show Me';

        const BtnGenerateHandlers = () => {
            setCardState(true)
        }

        const ArrowBackHandler = () => {
            if(videoPlayer.status){
                setPlayerState(videoPlayer.status)
            }
            setCardState(false);
        }

        return (
            <>
            {offers.offerList.loading ? <Loading /> :''}
            {error ?
            <div style={{ display: 'inline-flex' }}>
             <Alert variant="outlined" severity="error" style={{ backgroundColor: '#3b000030', color:'#fff' }}>
                It is not possible to search at the moment. Try again later.
             </Alert>
            </div>
            : ''}

            { !error  && !cardVisibility.visibility ? <BtnGenerate _onClick={async () =>{
                await this.generateNewMovie();
                BtnGenerateHandlers();
            }}  name={name}/> : ''}

            {cardVisibility.visibility ?
            <>
                <Card info={infoShow} showType={show_type} />
                <button type="button" onClick={(ArrowBackHandler)} style={{position:'absolute', top:'3%', left: '3%'}} >
                    <IconContext.Provider value={{  size:'2rem' }}>
                        <FaArrowLeft/>
                    </IconContext.Provider>
                </button>
            </> : ''}
            </>
        )
    }
}

const mapStateProps=(state) => {
    return state
}

export default connect (mapStateProps, actionsCreate) (Generate);
