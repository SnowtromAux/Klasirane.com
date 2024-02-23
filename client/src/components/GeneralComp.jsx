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
            isWideScreen: window.innerWidth >= 1161,
            seasons: [],
            selectedSeason: null,
            years: [],
            classes: [],
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.fetchSeasons(); 
        // console.log(this.state.seasons);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isWideScreen: window.innerWidth >= 1161 });
    };

    fetchSeasons = () => {
        // Replace 'http://localhost:3001' with your actual server address
        fetch('http://localhost:3001/competitions/OMT/seasons')
            .then(response => response.json())
            .then(data => {
                this.setState({ seasons: data });
                console.log(data);
            })
            .catch(error => console.error('Error fetching seasons:', error));
    };

    handleSeasonChange = (event) => {
        const selectedSeason = event.target.value;
        this.setState({ selectedSeason: selectedSeason });
    
        this.fetchYearsForSeason(selectedSeason).then((years) => {
            
            if (years.length > 0) {
                const firstYear = years[0]; 
                this.fetchClassesForYear(selectedSeason, firstYear);
            }
        }).catch(error => {
            console.error('Error in sequence:', error);
        });
    };

    fetchYearsForSeason = (season) => {
        const competitionName = "OMT";
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/competitions/${competitionName}/${season}/years`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ years: data }, () => resolve(data)); 
                })
                .catch((error) => {
                    console.error('Error fetching years:', error);
                    this.setState({ years: [] }, reject); 
                });
        });
    };
    

    fetchClassesForYear = async (season, year) => {
        const competitionName = "OMT"; 
        try {
            this.setState({ isLoadingClasses: true }); // Assuming you add this to your state
            const response = await fetch(`http://localhost:3001/competitions/${competitionName}/${season}/${year}/classes`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Throw an error for non-2xx responses
            }
            const data = await response.json();
            this.setState({ classes: data, isLoadingClasses: false });
        } catch (error) {
            console.error('Error fetching classes:', error);
            this.setState({ classes: [], isLoadingClasses: false }); // Reset to empty if there's an error
            
        }
    };
    
    

    render() {
        const { isWideScreen, seasons, selectedSeason, years, classes } = this.state;
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
                <div id="gencomp-radio-field">
                    {seasons.map((season, index) => (
                        <div id='gencomp-radio-field-content' key={index}>
                            <input
                                type="radio"
                                id={`season-${index}`}
                                name="season"
                                value={season}
                                checked={selectedSeason === season}
                                onChange={this.handleSeasonChange}
                            />
                            <div id='gencomp-radio-field-text' key={index}>{season}</div>
                        </div>
                    ))}
                </div>
                <CompTable years={years} classes={classes} selectedSeason={selectedSeason}/>
            </div>
        );
    }
}