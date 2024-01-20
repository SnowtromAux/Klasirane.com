import React, { useState, useEffect } from 'react';
import "../styles/CompetitionsMobile.css";
import arrow from "../assets/filter-arrow.png";
import exit from "../assets/exit.png";
import remove from "../assets/remove.png";

function App() {
    const [isArrowRotated, setIsArrowRotated] = useState(false);
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const filtered_competitions = ['КМС', 'ВМС', 'НОМ'];

    useEffect(() => {
        fetch('http://localhost:3001/filters.txt')
            .then(response => response.text())
            .then(text => {
                const filtersFromFile = text.split('\n').filter(Boolean);
                setFilters(filtersFromFile);
            })
            .catch(error => {
                console.error('There was an error fetching the filters:', error);
            });


        if (isArrowRotated) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isArrowRotated]);

    const handleArrowClick = () => {
        setIsArrowRotated(!isArrowRotated);
    };

    const handleCloseClick = () => {
        setIsArrowRotated(false);
    };

    const handleFilterClick = (filter) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filter]: !prevFilters[filter]
        }));
    };

    const handleRemoveFilters = () => {
        const resetFilters = filters.reduce((acc, filter) => {
            acc[filter] = false;
            return acc;
        }, {});
        setSelectedFilters(resetFilters);
    };

    return (
        <div className="competitions-mobile">
            <label>Всички Състезания</label>
            <div className="filter-box-mobile">
                <label className="filter-text-mobile">Филтри</label>
                <div className="filters-wrapper-mobile">
                    {filters.map((filter, index) => (
                        <label key={index} className={`filter-mobile`} onClick={() => handleFilterClick(filter)} style={{ background: selectedFilters[filter] ? '#0066CC' : '#A9A9A9' }}>{filter}</label>
                    ))}
                </div>
            </div>
            <div className="filter-result-button" onClick={handleArrowClick}>
                <label>Покажи съзтезания</label>
                <img src={arrow} alt="Arrow" style={{ transform: isArrowRotated ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}></img>
            </div>
            {isArrowRotated && (
                <div className="filter-results-mobile">
                    <div className='filter-result-mobile-top'>
                        <div className='filter-result-mobile-top-text'>Филтри</div>
                        {filters.filter(filter => selectedFilters[filter]).map((filter, index) => (
                            <label key={index} className={`filter-result-mobile-top-search`}>{filter}</label>
                        ))}
                    </div>
                    <div className='filter-result-mobile-exit' onClick={handleCloseClick}>
                        <img src={exit} alt="Exit"></img>
                    </div>
                    <div className='filter-result-mobile-remove' onClick={handleRemoveFilters}>
                        <img src={remove} alt="Remove"></img>
                        <label>Премахни филтри</label>
                    </div>
                    <div className='filter-result-mobile-comp'>
                        {filtered_competitions.map((competition, index) => (
                            <div className='filter-result-mobile-comp-text' key={index}>{competition}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
