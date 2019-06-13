/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import WrappedMap from './map';
import socketIOClient from "socket.io-client";
require('dotenv').config();
import hdLogo from './hdlogo.png'

const ENDPOINT =  "http://127.0.0.1:5000/";     //global variable where its looking for input from producer 

const storeStyles = css`
    @keyframes rotate {
        0% {
            transform: rotatey(0deg);
            opacity: 1;
        }

        30% {
            transform: rotatey(0deg);
            opacity: 1;
        }
        
        60% {
            transform: rotatey(180deg);
            opacity: 0;
        }
        
        80% {
            transform: rotatey(360deg);
        }

        100% {
            transform: rotatey(360deg);
            opacity: 1;
        }
    }

    .makeSpin {
        position: absolute;
        animation: rotate 4.3s ease-out 0s infinite;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        display: inline-block;
        top: 40%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
    }
`;

class Stores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            jsonResult: [],
            response: [],
        }
    }

    
    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on("stores", data => {
            this.setState(
                { response: data },
                () =>this.fetchStoreData(data)
            )
        });
    }

    fetchStoreData(storeNumber){
        fetch(`https://store-info-service--store-info-production.pr-hdqc.io/api/v2/store/${storeNumber}`)
        .then((result) => result.json())
        .then(
            (resultAc) => {
                const newResults = this.state.jsonResult;
                newResults.push(resultAc);
                this.setState({
                    isLoaded: true,
                    jsonResult: newResults,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    render() {
        const { error, isLoaded } = this.state;
        if(error) {
            return <div>Error: {error.message}</div>;
        }else if (!isLoaded){
            return (
                <div css={storeStyles}>
                    <img className="makeSpin" src={hdLogo} alt="Logo"></img> 
                </div>
            );
        } else {
            return(
                <WrappedMap 
                googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `1100px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                stores={this.state.jsonResult} 
                />
            )
        }
    }
}

export default Stores;