import React from 'react';
import { useParams } from 'react-router-dom';
import GeneralComp from './GeneralComp'; // Adjust the import path as necessary

const GeneralCompWrapper = () => {
    const { competitionName } = useParams();
    return <GeneralComp competitionName={competitionName} />;
};

export default GeneralCompWrapper;