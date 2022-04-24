import React, { useContext, useEffect, useState } from 'react';
import { SearchTermContext } from '../../App';
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";
import "./_searchBar.scss";

const SearchBar = () => {
    const [term, setTerm] = useState('');
    const { searchTerm, setTermAndRedirect } = useContext(SearchTermContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        setTermAndRedirect(term);
    }

    useEffect(() => {
        setTerm(searchTerm);
    }, [searchTerm]);

    return (
        <div className="searchBar">
            <form className="searchBar__form" onSubmit={handleSubmit}>
                <div className="searchBar__form-wrapper">
                    <input type="text" name="Search box" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search the web privately..." />
                    <button className="search-button"><SearchIcon /></button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar