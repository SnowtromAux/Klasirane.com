import React, { Component } from 'react';

import '../styles/GeneralComp.css';

import Logo from './Logo';
import Competitions from './Competitions';
import CompetitionsMobile from './CompetitionsMobile';
import New from './New';
import CompTable from './CompTable';


import logo from '../assets/sicademy-logo.png'

export default class GeneralComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWideScreen: window.innerWidth >= 1161
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isWideScreen: window.innerWidth >= 1161 });
    };

    render() {
        const { isWideScreen } = this.state;
        const seasons = ["Зима", "Лято", "Есен"];
        return (
            <div id="gencomp-wrapper">
                <header>
                    <Logo />
                </header>

                <div id="gencomp-main">

                    {this.state.isWideScreen ? (
                        <div id="gencomp-main-left">
                            <Competitions />
                        </div>
                    ) : (
                        <div id="gencomp-main-left">
                            <CompetitionsMobile />
                        </div>
                    )}

                    <div id="gencomp-main-right">
                        {/* <Ad /> */}
                        <New />
                    </div>
                </div>
                <div id="gencomp-radio">
                        
                </div>
                <CompTable />
            </div>
        );
    }
}