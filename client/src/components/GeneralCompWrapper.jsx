import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralComp from './GeneralComp'; // Adjust the import path as necessary

const GeneralCompWrapper = () => {
    const navigate = useNavigate();
    const { competitionName, season } = useParams();
    return <GeneralComp competitionName={competitionName} season={season} navigate={navigate} />;
};

export default GeneralCompWrapper;