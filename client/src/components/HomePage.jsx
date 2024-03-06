import React, { Component } from 'react';

import '../styles/HomePage.css';

import Logo from './Logo';
import Competitions from './Competitions';
import CompetitionsMobile from './CompetitionsMobile';

import Ad from './Ad';
import Klasirane from './Klasirane';
import Sicademy from './Sicademy';
import New from './New';
import Banner from './Banner';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            next_comp: [],
            last_problems: [],
            links: [],
            main_data: [],
            isWideScreen: window.innerWidth >= 1161
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        fetch('http://15.188.118.216:3001/home/next-comp.txt')
            .then(response => response.text())
            .then(text => {
                const nextCompFromFile = text.split('\n').filter(Boolean);
                this.setState({ next_comp: nextCompFromFile });
            })
            .catch(error => {
                console.error('There was an error fetching the next competitions:', error);
            });

        fetch('http://15.188.118.216:3001/home/last-problems.txt')
            .then(response => response.text())
            .then(text => {
                const lastProblemsFromFile = text.split('\n').filter(Boolean);
                this.setState({ last_problems: lastProblemsFromFile });
            })
            .catch(error => {
                console.error('Error fetching last problems:', error);
            });

            
        fetch('http://15.188.118.216:3001/home/dir/get-names')
            .then(response => response.text())
            .then(names => {
                this.setData(JSON.parse(names));
            })
            .catch(error => {
                console.error('Error fetching last problems:', error);
            });

        
    }

    setData(folder_names){
        for(const name of folder_names){
            const obj = {};

            obj.id = name.split("-")[0].toLowerCase();
            obj.type = name.split("-")[1].toLowerCase();
            obj.url = name;


            const copy_main_data = this.state.main_data;
            copy_main_data[obj.id - 1] = obj;
            this.setState({main_data: copy_main_data});
        }
    }

    componentDidUpdate() {
        console.log("updated")
        setTimeout(() => {
            this.adjustLeftBlockHeight();
        } , 2000)
    }

    adjustLeftBlockHeight() {
        const leftBlock = document.getElementById('home-main-left');
        const rightBlock = document.getElementById('home-main-right');

        if (leftBlock && rightBlock) {
            const rightBlockHeight = rightBlock.offsetHeight;
            leftBlock.style.maxHeight = `${rightBlockHeight}px`;

            console.log(rightBlockHeight)
        }
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
                                <label key={index} className='home-next-comp-label' onClick={() => {window.location.href = `/${comp.split(" | ")[1]}`}}>{comp.split(" | ")[0]}</label>
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
                                    <label key={index} className='problems' onClick={() => {window.location.href = `/${problem.split(" | ")[1]}`}}>{problem.split( " | ")[0]}</label>
                                ))}
                            </div>
                        </div>
                        {/* <div> */}
                            {this.state.main_data.map((data , index) => {
                                switch(data.type){
                                    case "sicademy":
                                        return <Sicademy key = {index} path = {data.url} page = {"home"}/>
                                    
                                    case "ad":
                                        return <Ad key = {index} path = {data.url} page = {"home"}/>

                                    case "klasirane":
                                        return <Klasirane key = {index} path = {data.url} page = {"home"}/>
                                    
                                    case "new":
                                        return <New key = {index} path = {data.url} page = {"home"}/>
                                    
                                    case "banner":
                                        return <Banner key = {index} path = {data.url} page = {"home"}/>

                                    default:
                                        return <div></div>;
                                }
                            })}
                        {/* </div>                   */}
                    </div>
                </div>
            </div>
        );
    }
}