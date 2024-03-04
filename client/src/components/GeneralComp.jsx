import React, { Component } from 'react';
import '../styles/GeneralComp.css';

import Logo from './Logo';
import Competitions from './Competitions';
import CompetitionsMobile from './CompetitionsMobile';
import CompData from './CompData';
import CompTable from './CompTable';

import Ad from './Ad';
import Klasirane from './Klasirane';
import Sicademy from './Sicademy';
import New from './New';
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
            main_data_height: 0,
            height_updated: false
        };
    }

    componentDidMount() {
        this.state.height_updated = false;

        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.checkAndFixElement);
        this.fetchSeasons(); 
        this.fetchData();
    }

    getSdf(){
            this.state.height_updated = true;
            const el = document.getElementById("gencomp-main-right");
            const height = el.getBoundingClientRect();

            console.log(el)
            console.log(height)

            
            this.setState({ main_data_height: height })
    }

    fetchData(){
        this.setState({main_data: []});
        fetch(`http://13.51.197.59:3001/competitions/dir/get-names/${this.props.competitionName}`)
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
            this.setState({ main_data: copy_main_data });
        }
    }

    componentDidUpdate(prevProps , prevState) {
        console.log("updated")
        if (this.props.competitionName !== prevProps.competitionName) {
            this.fetchSeasons();
            this.fetchData();
        }
        this.adjustLeftBlockHeight();
    }

    adjustLeftBlockHeight() {
        const leftBlock = document.getElementById('gencomp-main-left');
        const rightBlock = document.getElementById('gencomp-main-right');

        if (leftBlock && rightBlock) {
            const rightBlockHeight = rightBlock.offsetHeight;
            leftBlock.style.maxHeight = `${rightBlockHeight}px`;

            console.log(rightBlockHeight)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.checkAndFixElement);
    }

    handleResize = () => {
        this.setState({ isWideScreen: window.innerWidth >= 1161 });
    };

    fetchSeasons = () => {
        const competitionName = `${this.props.competitionName}`;
        fetch(`http://13.51.197.59:3001/competitions/${competitionName}/seasons`)
            .then(response => response.json())
            .then(data => {
                const filteredSeasons = data.filter(season => season !== "Main");
                this.setState({ 
                seasons: filteredSeasons,
                }, () => {
                    if (filteredSeasons.length > 0) {
                        const urlSeason = this.props.season;
                        if(urlSeason != undefined){
                            this.selectSeason(urlSeason);
                        }
                        else{
                            this.selectSeason(filteredSeasons[0]);
                        } 
                    }
                });
             })
            .catch(error => console.error('Error fetching seasons:', error));
    };

    selectSeason = (selectedSeason) => {
        this.setState({ selectedSeason: selectedSeason });

        const path = `/competitions/${this.props.competitionName}/${selectedSeason}`;
        this.props.navigate(path);
        
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
        window.location.reload();
    };

    fetchYearsForSeason = (season) => {
        const competitionName = `${this.props.competitionName}`;
        return new Promise((resolve, reject) => {
            fetch(`http://13.51.197.59:3001/competitions/${competitionName}/${season}/years`)
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
        const competitionName = `${this.props.competitionName}`; 
        try {
            this.setState({ isLoadingClasses: true });
            const response = await fetch(`http://13.51.197.59:3001/competitions/${competitionName}/${season}/${year}/classes`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ classes: data, isLoadingClasses: false });
        } catch (error) {
            console.error('Error fetching classes:', error);
            this.setState({ classes: [], isLoadingClasses: false });
            
        }
    };
    
    

    render() {
        const { seasons, selectedSeason, years, classes , main_data_height} = this.state;
        return (
            <div id="gencomp-wrapper">
                <header>
                    <Logo />
                </header>

                <div id="gencomp-main">

                    {this.state.isWideScreen ? (
                        <div id="gencomp-main-left" style ={{maxHeight: main_data_height}}>
                            <Competitions />
                        </div>
                    ) : (
                        <div id="gencomp-main-left">
                            <CompetitionsMobile />
                        </div>
                    )}

                    <div id="gencomp-main-right">
                        {this.state.main_data.map((data , index) => {
                            { 
                                switch(data.type){
                                    case "newcomp":
                                        return <CompData key = {index} path = {data.url} page = {"competitions"} compName = {this.props.competitionName}/> 
                                    
                                    case "sicademy":
                                        return <Sicademy key = {index} path = {data.url} page = {"competitions"} compName = {this.props.competitionName}/>
                                    
                                    case "ad":
                                        return <Ad key = {index} path = {data.url} page = {"competitions"} compName = {this.props.competitionName}/>

                                    case "klasirane":
                                        return <Klasirane key = {index} path = {data.url} page = {"competitions"} compName = {this.props.competitionName}/>
                                    
                                    case "new":
                                        return <New key = {index} path = {data.url} page = {"competitions"} compName = {this.props.competitionName}/>
                                    
                                    case "banner":
                                        return <Banner key = {index} path = {data.url} page = {"competitions"} compName = {this.props.competitionName}/>

                                    default:
                                        return <div key = {index}></div>;
                            }}
                        })}
                        
                    </div>
                </div>
                <div id="gencomp-radio-field">
                    {seasons.filter(season => season !== "All").map((season, index) => {
                        const seasonName = season.split('-')[1];
                        return (
                            <div id='gencomp-radio-field-content' key={index}>
                                <input
                                    type="radio"
                                    id={`season-${index}`}
                                    name="season"
                                    value={season}
                                    checked={selectedSeason === season}
                                    onChange={this.handleSeasonChange}
                                    style={{
                                        width: '23px',
                                        height: '23px'
                                    }}
                                />
                                <div id='gencomp-radio-field-text' key={index}>{seasonName}</div>
                            </div>
                        );
                    })}
                </div>
                <CompTable compName={`${this.props.competitionName}`} years={years} classes={classes} selectedSeason={selectedSeason}/>
            </div>
        );
    }
}