/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
require('dotenv').config();
import axios from 'axios';
import WrappedMap from "./components/Map.js";

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            stores: [],
        };
    
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        axios.get('https://store-info-service--store-info-production.pr-hdqc.io/api/v2/stores')
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    stores: Object.values(result.data).slice(0,2000),
                });
            },
        )
        .catch(
            (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            },
        );
    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        return (
            <div>
                <WrappedMap
                    googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `1100px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    stores={this.state.stores}
                />
            </div>
        );
    }
}

export default MainLayout;