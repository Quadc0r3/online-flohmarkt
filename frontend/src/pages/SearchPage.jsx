// import React from 'react';
import { useParams } from 'react-router-dom';

function SearchPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Search</h1>
            <p>Search sth</p>
        </div>
    );
}

export default SearchPage;
