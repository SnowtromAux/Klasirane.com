import React, { useState, useEffect } from 'react';
import "../styles/Competitions.css";

function App() {
    // const filters = ['Клас', 'Година', 'Статут', 'Видове задачи'];
    const filtered_competitions = ['КМС', 'ВМС', 'НОМ'];

    const [clickedLabels, setClickedLabels] = useState({});

    const [filters, setFilters] = useState([]);

    const handleClick = (filter) => {
        setClickedLabels(prevState => ({
            ...prevState,
            [filter]: !prevState[filter]
        }));
    };

    useEffect(() => {
        fetch('http://localhost:3001/filters.txt')
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                const filtersFromFile = text.split('\n').filter(Boolean);
                setFilters(filtersFromFile);
                console.log(filtersFromFile);
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
                {filtered_competitions.map((competition, index) => (
                    <label key={index}>{competition}</label>
                ))}
            </div>
        </div>
    );
}

export default App;
