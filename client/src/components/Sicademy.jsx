import React, { Component } from 'react';

import '../styles/Sicademy.css';


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
        );
    }
}
