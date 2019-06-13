/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
require('dotenv').config();
import axios from 'axios';
import Stores from './components/stores'
// import WrappedMap from "./components/Map.js";

const mainStyles = css`
    .storeLoad {
        background: linear-gradient(to bottom right, #ff9966 0%, #ff5050 100%);
        height: 1100px;
        width: 100%;
        display: inline-block;
    }
`

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
        // this.getItems();
    }

    render() {
        return (
            <div css={mainStyles}>
                <div className="storeLoad">
                    <Stores />
                </div>
            </div>
        );
    }
}

export default MainLayout;