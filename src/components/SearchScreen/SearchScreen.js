import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import WebResults from './WebResults';
import { ReactComponent as LogoSmall } from "../../images/brave-small-logo.svg";
import "./_searchScreen.scss";
import { Link } from 'react-router-dom';
import ImageResults from './ImageResults';
import { API_KEY, ENGINE_ID, BASE_URL } from "../../config";
import Spinner from '../Spinner';
import { SearchTermContext } from '../../App';

const Searchscreen = ({ data, setData, searchTerm }) => {
    const [resultsWebType, setResultsWebType] = useState(true);
    const [loading, setLoading] = useState(false);
    const { setSearchTerm } = useContext(SearchTermContext);
    const webResultsElements = (data.items).map((item) => {
        return <WebResults item={item} key={item.cacheId} />
    })
    const handleClick = (e) => {
        if (resultsWebType && e.target.id === "web") return;
        if (!resultsWebType && e.target.id === "img") return;
        setResultsWebType((prevState) => !prevState)
        setLoading(true);
    }
    useEffect(() => {
        if (!searchTerm) return;
        const fetchResults = async () => {
            const searchUrl = resultsWebType ? `${BASE_URL}key=${API_KEY}&cx=${ENGINE_ID}&q=${searchTerm}` : `${BASE_URL}key=${API_KEY}&cx=${ENGINE_ID}&q=${searchTerm}&searchType=image`
            const response = await fetch(searchUrl);
            const data = await response.json();
            setData((prevState) => {
                return {
                    ...prevState,
                    items: data.items,
                    totalResults: data.searchInformation.formattedTotalResults
                }
            })
            setLoading(false);
        }
        fetchResults();
    }, [searchTerm, setData, resultsWebType]);
    return (
        <div className="searchScreen">
            <header>
                <Link to="/" onClick={() => setSearchTerm('')}>
                    <LogoSmall className="searchScreen__logo" />
                </Link>
                <SearchBar />
            </header>
            <div className="searchScreen__tabs">
                <button className={resultsWebType ? "active" : ''} id="web" onClick={(e) => handleClick(e)}>All</button>
                <button className={!resultsWebType ? "active" : ''} id="img" onClick={(e) => handleClick(e)}>Images</button>
            </div>
            {loading && <Spinner />}
            {(!loading && resultsWebType) && <div className="searchScreen__webResults">{webResultsElements}</div>}
            {(!loading && !resultsWebType) && <ImageResults data={data} />}
        </div>
    )
}

export default Searchscreen