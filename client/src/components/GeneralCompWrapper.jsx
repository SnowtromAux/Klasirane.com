import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralComp from './GeneralComp'; // Adjust the import path as necessary

const GeneralCompWrapper = () => {
    const navigate = useNavigate();
    const { competitionName, season } = useParams();
    const [key, setKey] = useState(competitionName); 

    const handleKeyChange = (newKey) => {
        setKey(newKey);
    };

    return <GeneralComp key={key} competitionName={competitionName} season={season} navigate={navigate} onKeyChange={handleKeyChange}/>;
};

export default GeneralCompWrapper;