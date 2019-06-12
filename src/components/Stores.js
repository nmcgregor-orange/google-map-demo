import React from 'react';
import WrappedMap from './map';
import socketIOClient from "socket.io-client";
require('dotenv').config();

const ENDPOINT =  "http://127.0.0.1:5000/";     //global variable where its looking for input from producer 

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
                <div>
                    {/* loading thing */}
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