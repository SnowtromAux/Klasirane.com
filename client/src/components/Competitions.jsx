import React, { useState } from 'react';
import "../styles/Competitions.css";

function App() {
    const filters = ['Клас', 'Година', 'Статут', 'Видове задачи'];
    const filtered_competitions = ['КМС', 'ВМС', 'НОМ'];

    const [clickedLabels, setClickedLabels] = useState({});

    const handleClick = (filter) => {
        setClickedLabels(prevState => ({
            ...prevState,
            [filter]: !prevState[filter]
        }));
    };

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
