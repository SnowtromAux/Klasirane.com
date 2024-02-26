import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Competitions.css';
import remove from "../assets/remove.png";

function Competitions() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selFilters, setSelFilters] = useState({});
  const [showComps, setShowComps] = useState([]);
  const [filterState , setFilterState] = useState({});

  useEffect(() => {
    fetch('http://13.51.197.59:3001/home/filters.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        const rows = text.split('\n').filter(Boolean);
        const data = [];
        const sel_filters = {};
        const filter_state = {};

        for (const row of rows) {
          const obj = {};
          const row_data = row.split(' | ');
          const filter_name = row_data[0];
          const filter_options = row_data[1].split(' , ');
          const multiple =
            row_data[2] === 'Multiple' || row_data[2] === 'Multiple\r';

          filter_state[filter_name] = false;
          sel_filters[filter_name] = [];
          obj.name = filter_name;
          obj.options = filter_options;
          obj.multiple = multiple;

          data.push(obj);
        }

        setFilterState(filter_state);
        setFilters(data);
        setSelFilters(sel_filters);
      })
      .catch((error) => {
        console.error('There was an error fetching the filters:', error);
      });

    fetch('http://13.51.197.59:3001/home/competitions.txt')
      .then((response) => response.text())
      .then((text) => {
        let text_data = text.split(
          '--------------------------------------------------------'
        );

        let obj = [];
        for (const text of text_data) {
          const comp_data = text.split('\r\n');
          comp_data.pop();
          comp_data.shift();
          const competition_data = comp_data[0].split(': ')[1].split(' | ');
          const competition_name = competition_data[0];
          const competition_key = competition_data[1];

          const filters = {};
          filters.key = competition_key;
          filters.name = competition_name;
          filters.filters = {};
          for (let i = 1; i < comp_data.length; i++) {
            const row = comp_data[i].split(': ');

            filters.filters[row[0]] = row[1].split(' , ');
          }

          obj.push(filters);
        }
        setCompetitions(obj);
        setShowComps(obj);
      })
      .catch((error) => {
        console.error('There was an error fetching the filters:', error);
      });
  }, []);

  const handleCheckboxChange = (filter_name, index, isMultiple) => {
    const id = `${filter_name}_radio_${index}`;
    const checkboxes = document.getElementsByClassName(
      `filter-group-${filter_name}`
    );

    if (!isMultiple)
      for (const checkbox of checkboxes)
        if (checkbox.id !== id) checkbox.checked = false;

    const selectedFilters = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.nextElementSibling.textContent);

    setSelFilters((prevFilters) => ({
      ...prevFilters,
      [filter_name]: selectedFilters,
    }));
  };

  const handleRemoveFilters = () => {    
    const radioButtons = document.querySelectorAll('input[type="checkbox"]');
    radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
    });
    
    for (const filterName of Object.keys(selFilters)) {
        setSelFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: [],
        }));
    }
};

  const changeDirectory = (path) => {
    navigate(`/competitions/${path}`);
  }

  const triggerFilter = (filter_name) => {
    setFilterState((prevFilterState) => {
      const updatedFilterState = { ...prevFilterState };

      // Close all filters except the clicked one
      Object.keys(updatedFilterState).forEach((filter) => {
        updatedFilterState[filter] = filter === filter_name ? !updatedFilterState[filter] : false;
      });

      return updatedFilterState;
    });
  };
  
  useEffect(() => {
    const filteredComps = competitions.filter((comp) =>
      Object.entries(selFilters).every(([filter, values]) =>
        values.length === 0 ? true : values.every((element) => comp.filters[filter].includes(element))
      )
    );

    setShowComps(filteredComps);
  }, [selFilters , competitions]);

  return (
    <div className="competitions">
      <label>Всички Състезания</label>
      <div className="filter-box">
        <div className='filter-box-top'>
          <label className="filter-text">Филтри</label>
          <div className='filter-result-desk-remove' onClick={handleRemoveFilters}>
              <img src={remove} alt="Remove"></img>
              <label>Премахни филтри</label>
          </div>
        </div>
        <div className="filters-wrapper">
          {filters.map((filter, index) => (
            <div className="filter" key={index} onClick={() => {triggerFilter(filter.name)}} style = {{borderBottomRightRadius: filterState[filter.name] ? "0px" : "20px" , borderBottomLeftRadius: filterState[filter.name] ? "0px" : "20px" , zIndex: 500 - index}}>
              <label className="filter-name">{filter.name}</label>
              {selFilters[filter.name].map((sel_data, index) => (
                <label className="selected-filters" key={index}>
                  {sel_data}
                </label>
              ))}
              <div className="filter-dropdown" style = {{visibility: filterState[filter.name] ? "visible" : "hidden"}}>
                {filter.options.map((option, index) => (
                  <div key={index} className="filter-dropdown-row">
                    <input
                      className={`filter-group-${filter.name}`}
                      type="checkbox"
                      id={`${filter.name}_radio_${index}`}
                      onChange={() =>
                        handleCheckboxChange(filter.name, index, filter.multiple)
                      }
                    ></input>
                    <label htmlFor={`${filter.name}_radio_${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-results">
        {showComps.map((competition, index) => (
          <label key={competition.key} onClick={() => changeDirectory(competition.key)}>{competition.name}</label>
        ))}
      </div>
    </div>
  );
}

export default Competitions;
