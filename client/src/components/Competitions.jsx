import React, { useState, useEffect } from 'react';
import "../styles/Competitions.css";

function App() {
    // const filters = ['Клас', 'Година', 'Статут', 'Видове задачи'];
    const filtered_competitions = ['КМС', 'ВМС', 'НОМ'];

    const [clickedLabels, setClickedLabels] = useState({});

    const [filters, setFilters] = useState([]);

    const [competitions , setCompetitions] = useState([]);


    const handleClick = (filter) => {
        setClickedLabels(prevState => ({
            ...prevState,
            [filter]: !prevState[filter]
        }));
    };

    useEffect(() => {
        fetch('http://localhost:3001/home/filters.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                const filtersFromFile = text.split('\n').filter(Boolean);
                setFilters(filtersFromFile);
            })
            .catch(error => {
                console.error('There was an error fetching the filters:', error);
            });

        
        fetch('http://localhost:3001/home/competitions.txt')
            .then(response => response.text())
            .then(text => {
                let text_data = text.split('--------------------------------------------------------');
                let obj = [];
                for(const text of text_data){
                    const comp_data = text.split('\r\n');
                    comp_data.pop();
                    comp_data.shift();
                    const competition_data = comp_data[0].split(": ")[1].split(" | ");
                    const competition_name = competition_data[0];
                    const competition_key = competition_data[1];
                    const filters = {};
                    filters.key = competition_key;
                    filters.name = competition_name;
                    for(let i = 1; i < comp_data.length;i++){
                        const row = comp_data[i].split(": ");

                        filters[row[0]] = row[1].split(" , ");
                    }

                    obj.push(filters);
                    // console.log(filters);
                }
                setCompetitions(obj);

                console.log(obj)
            })
            .catch(error => {
                console.error('There was an error fetching the filters:', error);
            });
    }, []);

    return (
        <div className="competitions">
            <label>Всички Състезания</label>
            <div className="filter-box">
                <label className="filter-text">Филтри</label>
                <div className="filters-wrapper">
                    {filters.map((filter, index) => (
                        <label key={index} className={`filter`} onClick={() => handleClick(filter)} style={{ background: clickedLabels[filter] ? '#0066CC' : '#A9A9A9' }}>{filter}</label>
                    ))}
                </div>
            </div>
            <div className="filter-results">
                {competitions.map((competition, index) => (
                    <label key={competition.key}>{competition.name}</label>
                ))}
            </div>
        </div>
    );
}

export default App;
