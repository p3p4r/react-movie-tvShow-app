import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import movieTrailer from 'movie-trailer'
import Loading from '../Loading'
import {IconContext} from "react-icons";
import { FaTimes } from 'react-icons/fa'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {connect} from 'react-redux'
import * as actionsCreate from '../../actions'
import './VideoPlayer.css'

export class player extends Component {
    constructor(props) {
        super(props);
        this.handlePause =  this.handlePause.bind(this);
        this.handlePlay =  this.handlePlay.bind(this);
      }

    state = {

        loading: true,
        url: null,
        thumbnail: false,
        playing: true,
        seekTime: 0,
    }
    componentDidMount(){
        movieTrailer( this.props.name ,this.props.showType, {year: this.props.year , multi: true} )
        .then( res => {
            this.setState({url : res})
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
            this.setState({loading : false})
            this.props.setPlayerState(this.props.videoPlayer.status)
        })
    }

    handlePause = () => {
        this.setState({ thumbnail: true})
        this.setState({ playing: false})
        this.setState({ seekTime: this.getCurrentTime})
    }

    handlePlay = () => {
        this.setState({ thumbnail: false})
        this.setState({ loading: false })
        this.setState({ seekTime: this.getCurrentTime})
        this.setState({ playing: true})
    }

    isPlayerReady = () => {
        console.log('The player is ready..')
    }

    getCurrentTime = (time) => {
        return time.playedSeconds
    }

    handleSeek = () => {
        console.logo("seeking")
    }

    render() {
        const {setPlayerState, videoPlayer}  = this.props;
        const { url, loading, playing, thumbnail } = this.state;

        const setModalClose = () => {
           setPlayerState(videoPlayer.status)
        }

        return (
            <div className="player--container" style={{position:'absolute',top:'0',left:'0',zIndex:'9',background: '#00000096',width:'100vw', height:'100vh'}}>
                <button type="button" onClick={setModalClose} style={{position:'absolute', top:'3%', right: '3%',zIndex:'9'}} >
                    <IconContext.Provider value={{  size:'2rem' }}>
                        <FaTimes/>
                    </IconContext.Provider>
                </button>

                {loading ? <Loading /> : ''}
                {url !== null ? <ReactPlayer
                    ref={this.ref}
                    url={url[0]}
                    config={{
                        youtube: {
                            playerVars: { showinfo: 0, rel: 1, disablekb: 1, modestbranding: 1, iv_load_policy:0 }
                        },
                      }}
                    playing = {playing}
                    width="100%"
                    height="100%"
                    light={false}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    onError={setModalClose}
                    onEnded={setModalClose}
                    onProgress={this.getCurrentTime}
                    onReady={e => console.log('onReady', e)}
                    onSeek={e => console.log('onSeek', e)}
                    /> : 'asd'}
                { thumbnail ? <div className="full-hw player--thumb"  onClick={this.handlePlay}>
                    <IconContext.Provider value={{  size:'2rem' }} >
                        <PlayArrowIcon/>
                    </IconContext.Provider>
                    </div> : ''}

            </div>
        )
    }
}

const mapStateProps=(state) => {
    return state
}

export default connect (mapStateProps, actionsCreate) (player);
