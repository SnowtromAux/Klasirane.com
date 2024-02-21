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
        fetch('http://localhost:3001/competitions/SOM/seasons')
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
        this.fetchYearsForSeason(selectedSeason); // Fetch years for the selected season
        this.fetchClassesForYear(selectedSeason, "2015");
    };
    

    fetchYearsForSeason = (season) => {
        // Assuming the name of your competition is static as "SOM". If it's dynamic, adjust accordingly.
        const competitionName = "SOM";
    
        fetch(`http://localhost:3001/competitions/${competitionName}/${season}/years`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ years: data });
            })
            .catch((error) => {
                console.error('Error fetching years:', error);
                this.setState({ years: [] }); // Reset to empty if there's an error
            });
    };

    fetchClassesForYear = (season, year) => {
        const competitionName = "SOM"; // Adjust if your competition name is dynamic
    
        fetch(`http://localhost:3001/competitions/${competitionName}/${season}/${year}/classes`)
            .then(response => response.json())
            .then(data => {
                this.setState({ classes: data });
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
                this.setState({ classes: [] }); // Reset to empty if there's an error
            });
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
                <CompTable years={years} classes={classes}/>
            </div>
        );
    }
}