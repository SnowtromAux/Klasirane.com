import React, { useState, useEffect } from 'react';
import "../styles/CompetitionsMobile.css";
import arrow from "../assets/filter-arrow.png";
import exit from "../assets/exit.png";
import remove from "../assets/remove.png";

function App() {
    const [isArrowRotated, setIsArrowRotated] = useState(false)
    const filters = ['Клас', 'Година', 'Статут', 'Видове задачи'];
    const filtered_competitions = ['КМС', 'ВМС', 'НОМ'];

    useEffect(() => {
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

    return (
        <div className="competitions-mobile">
            <label>Всички Състезания</label>
            <div className="filter-box-mobile">
                <label className="filter-text-mobile">Филтри</label>
                <div className="filters-wrapper-mobile">
                    {filters.map((filter, index) => (
                        <label key={index} className={`filter-mobile`}>{filter}</label>
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
                        {filters.map((filter, index) => (
                            <label key={index} className={`filter-result-mobile-top-search`}>{filter}</label>
                        ))}
                    </div>
                    <div className='filter-result-mobile-exit' onClick={handleCloseClick}>
                        <img src={exit} alt="Exit"></img>
                    </div>
                    <div className='filter-result-mobile-remove'>
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
