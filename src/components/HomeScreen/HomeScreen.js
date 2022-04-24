import React from 'react';
import { ReactComponent as Logo } from "../../images/brave-logo.svg";
import SearchBar from '../SearchBar/SearchBar';
import "./_homeScreen.scss";

const HomeScreen = () => {
    return (
        <div className="search__container">
            <Logo className="search__logo" />
            <SearchBar />
        </div>
    )
}

export default HomeScreen