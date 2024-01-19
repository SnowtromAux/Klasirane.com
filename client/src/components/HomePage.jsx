import React, { Component } from 'react';

import '../styles/HomePage.css';

import Logo from './Logo';
import Competitions from './Competitions';
import Ad from './Ad';
import HomeNew from './HomeNew';


import logo from '../assets/sicademy-logo.png'

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            next_comp: ['Австралийско Кенгуру - Australian Mathematics Competition - AMC', 'Академик Кирил Попов, Шумен'],
            last_problems: ['JBMO - МБОМ - Младежка Балканска Олимпиада по Математика']
        };
    }
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

                    <div id="home-main-left">
                        <Competitions />
                    </div>

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