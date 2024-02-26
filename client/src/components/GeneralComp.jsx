import React, { Component } from 'react';

import '../styles/GeneralComp.css';

import Logo from './Logo';
import Competitions from './Competitions';
import CompetitionsMobile from './CompetitionsMobile';
import CompTable from './CompTable';

import Ad from './Ad';
import Klasirane from './Klasirane';
import Sicademy from './Sicademy';
import CompNew from './CompNew';
import Banner from './Banner';
export default class GeneralComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isWideScreen: window.innerWidth >= 1161,
            seasons: [],
            selectedSeason: null,
            years: [],
            classes: [],
            main_data: [],
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.fetchSeasons(); 
        fetch('http://localhost:3001/competitions/OMT/main/get-names/')
            .then(response => response.text())
            .then(names => {
                console.log(names);
                this.setData(JSON.parse(names));
            })
            .catch(error => {
                console.error('Error fetching last problems:', error);
        });
        // console.log(this.state.seasons);
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
                const filteredSeasons = data.filter(season => season !== "Main");
                this.setState({ 
                seasons: filteredSeasons,
                }, () => {
                    if (filteredSeasons.length > 0) {
                        this.selectSeason(filteredSeasons[0]);
                    }
                });
                console.log(data);
             })
            .catch(error => console.error('Error fetching seasons:', error));
    };

    selectSeason = (selectedSeason) => {
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

    handleSeasonChange = (event) => {
        const selectedSeason = event.target.value;
        this.selectSeason(selectedSeason);
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
                        {this.state.main_data.map((data , index) => {
                            switch(data.type){
                                case "sicademy":
                                    return <Sicademy key = {index} path = {data.url}/>
                                
                                case "ad":
                                    return <Ad key = {index} path = {data.url}/>

                                case "klasirane":
                                    return <Klasirane key = {index} path = {data.url}/>
                                
                                case "new":
                                    return <CompNew key = {index} path = {data.url}/>
                                
                                case "banner":
                                    return <Banner key = {index} path = {data.url}/>

                                default:
                                    return <div></div>;
                            }
                        })}
                    </div>
                </div>
                <div id="gencomp-radio-field">
                    {seasons.filter(season => season !== "All").map((season, index) => (
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