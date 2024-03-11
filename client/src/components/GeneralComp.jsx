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
            height_updated: false,
            competitionData: null, 
            loading: true, // To track the loading state
            error: null, // To store any potential error
        };
    }
    
    componentDidMount() {
        this.state.height_updated = false;
        this.fetchData();
        console.log(this.state.main_data);
        this.fetchCompetitionData();
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.checkAndFixElement);
    }

    fetchCompetitionData = () => {
        fetch(`http://15.188.118.216:3001/competitions/${this.props.competitionName}/alldata`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            this.setState({ competitionData: data, loading: false }, () => {
                this.setSeasons();
                let firstSeason;
                if(this.props.season){
                    firstSeason = this.props.season;
                }
                else{
                    firstSeason = Object.keys(data)[0]; 
                }
                if (firstSeason) {
                    this.selectSeason(firstSeason); 
                }
            });
          })
          .catch((error) => {
            this.setState({ error: error.toString(), loading: false });
          });
    };

    fetchData(){
        this.setState({main_data: []});
        fetch(`http://15.188.118.216:3001/competitions/dir/get-names/${this.props.competitionName}`)
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


    setSeasons = () => {
        if (this.state.competitionData) {
          const seasonsArray = Object.keys(this.state.competitionData);
          this.setState({ seasons: seasonsArray });
        }
    };

    setYearsAndClasses = (selectedSeason) => {
        const years = Object.keys(this.state.competitionData[selectedSeason]);
        let classes = [];
        if (years.length > 0) {
            const firstYear = years[0];
            classes = Object.keys(this.state.competitionData[selectedSeason][firstYear]);
        }
        this.setState({ years, classes });
    };
      
    componentDidUpdate(prevProps) {

        if (this.props.competitionName !== prevProps.competitionName) {
            this.props.onKeyChange(this.props.competitionName); // Update the key in the wrapper
            this.fetchData();
            this.fetchCompetitionData();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.checkAndFixElement);
    }

    handleResize = () => {
        this.setState({ isWideScreen: window.innerWidth >= 1161 });
    };

    selectSeason = (selectedSeason) => {
        this.setState({ selectedSeason: selectedSeason });
        this.setYearsAndClasses(selectedSeason);

        const path = `/competitions/${this.props.competitionName}/${selectedSeason}`;
        this.props.navigate(path);
    };

    handleSeasonChange = (event) => {
        const selectedSeason = event.target.value;
        this.selectSeason(selectedSeason);
    };
    

    render() {
        const {seasons, selectedSeason, years, classes , competitionData, loading} = this.state;
        
        if (loading) {
            return <div>Loading...</div>;
        }
        else if (!competitionData) {
            return <div>Data is loading...</div>;
        }

        const selectedSeasonData = competitionData && selectedSeason ? competitionData[selectedSeason] : {};
        return (
            <div id="gencomp-wrapper">
                <header>
                    <Logo />
                </header>

                <div id="gencomp-main">

                    {this.state.isWideScreen ? (
                        <div id="gencomp-main-left" style = {{position: "absolute"}}>
                            <Competitions />
                        </div>
                    ) : (
                        <div id="gencomp-main-left" style = {{position: "relative"}}>
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
                            <div className='gencomp-radio-field-content' key={index}>
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
                                <label htmlFor={`season-${index}`}></label>
                                <div className='gencomp-radio-field-text' key={index}>{seasonName}</div>
                            </div>
                        );
                    })}
                </div>
                <CompTable compName={`${this.props.competitionName}`} compTable={selectedSeasonData} years={years} classes={classes} selectedSeason={selectedSeason}/>
            </div>
        );
    }
}