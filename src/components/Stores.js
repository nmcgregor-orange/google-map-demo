/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import WrappedMap from './map';
import socketIOClient from "socket.io-client";
require('dotenv').config();
import hdLogo from './hdlogo.png'
import qcLogo from './qclogo.png'

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

        50% {
            opacity: 0;
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
            opacity: 0;
        }
    }

    @keyframes rotateOff {
        0% {
            transform: rotatey(180deg);
            opacity: 0;
        }

        22% {
            transform: rotatey(180deg);
            opacity: 0;
        }
        
        60% {
            transform: rotatey(360deg);
            opacity: 1;
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
        animation: rotate 4s ease-out 0s infinite alternate-reverse;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        display: inline-block;
        top: 40%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
    }

    .makeSpinOff {
        position: absolute;
        animation: rotateOff 4s linear 0s infinite alternate-reverse;
        width: 450px;
        height: 600px;
        margin: 0 auto;
        display: inline-block;
        top: 25%;
        left: 45%;
        margin-top: -50px;
        margin-left: -50px;
    }
`;

function Stores() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [jsonResult, setJsonResult] = useState([])
    const [response, setResponse] = useState([])

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("stores", data => {
            (
                setResponse(data),
                fetchStoreData(data)
            )
        });
    });

    function fetchStoreData(storeNumber){
        fetch(`https://store-info-service--store-info-production.pr-hdqc.io/api/v2/store/${storeNumber}`)
        .then((result) => result.json())
        .then(
            (resultAc) => {
                const newResults = jsonResult;
                newResults.push(resultAc);
                setIsLoaded(true);
                setJsonResult(newResults);
            },
            (error) => {
                setIsLoaded(true);
                error;
            }
        )
    }

    if(error) {
        return <div>Error: {error.message}</div>;
    }else if (!isLoaded){
        return (
            <div css={storeStyles}>
                <img className="makeSpin" src={hdLogo} alt="Logo"></img> 
                <img className="makeSpinOff" src={qcLogo} alt="Logo"></img> 
            </div>
        );
    } else {
        return(
            <WrappedMap 
            googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `1100px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            stores={jsonResult} 
            />
        )
    }
}

export default Stores;