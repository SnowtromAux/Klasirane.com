import React, { Component } from 'react';

import '../styles/HomePage.css';

import Logo from './Logo';
import Competitions from './Competitions';
import CompetitionsMobile from './CompetitionsMobile';
import Ad from './Ad';
import HomeNew from './HomeNew';


import logo from '../assets/sicademy-logo.png'

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            next_comp: [],
            last_problems: [],
            isWideScreen: window.innerWidth >= 1161
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        fetch('http://localhost:3001/home/next-comp.txt')
            .then(response => response.text())
            .then(text => {
                const nextCompFromFile = text.split('\n').filter(Boolean);
                this.setState({ next_comp: nextCompFromFile });
            })
            .catch(error => {
                console.error('There was an error fetching the next competitions:', error);
            });

        fetch('http://localhost:3001/home/last-problems.txt')
            .then(response => response.text())
            .then(text => {
                const lastProblemsFromFile = text.split('\n').filter(Boolean);
                this.setState({ last_problems: lastProblemsFromFile });
            })
            .catch(error => {
                console.error('Error fetching last problems:', error);
            });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isWideScreen: window.innerWidth >= 1161 });
    };

    render() {
        return (
            <div id="home-wrapper">
                <header>
                    <Logo />
                    <div id="home-next-comp">
                        <h1>Предстоящи състезания</h1>
                        <div>
                            {this.state.next_comp.map((comp, index) => (
                                <label key={index} className='home-next-comp-label'>{comp}</label>
                            ))}
                        </div>
                    </div>
                </header>

                <div id="home-main">

                    {this.state.isWideScreen ? (
                        <div id="home-main-left">
                            <Competitions />
                        </div>
                    ) : (
                        <div id="home-main-left">
                            <CompetitionsMobile />
                        </div>
                    )}

                    <div id="home-main-right">
                        <div id="last-added-problems-wrapper">
                            <label>Последно добавени задачи</label>
                            <div>
                                {this.state.last_problems.map((problem, index) => (
                                    <label key={index} className='problems'>{problem}</label>
                                ))}
                            </div>
                        </div>
                        <div id="sign-up-wrapper">
                            <div id="sicademy-logo">
                                <img src={logo} alt="Sicademy Logo"></img>
                            </div>
                            <div id="sicademy-info">
                                <label>СИкадеми - иновативна подготовка по математика и информатика</label>
                                <a href="https://www.sicademy.bg" target="_blank" rel="noopener noreferrer">
                                    <button id="sicademy-link">Запиши се</button>
                                </a>
                            </div>
                        </div>
                        <Ad />
                        <HomeNew />
                    </div>

                </div>
            </div>
        );
    }
}