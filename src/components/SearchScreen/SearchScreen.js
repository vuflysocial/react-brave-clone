import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import WebResults from './WebResults';
import { ReactComponent as LogoSmall } from "../../images/brave-small-logo.svg";
import "./_searchScreen.scss";
import { Link } from 'react-router-dom';
import ImageResults from './ImageResults';
import { API_KEY, ENGINE_ID, BASE_URL } from "../../config";

const Searchscreen = ({ data, setData, searchTerm }) => {
    const [resultsWebType, setResultsWebType] = useState(true);
    const webResultsElements = (data.items).map((item) => {
        return <WebResults item={item} key={item.cacheId} />
    })
    const handleClick = (e) => {
        if (resultsWebType && e.target.id === "web") return;
        if (!resultsWebType && e.target.id === "img") return;
        setResultsWebType((prevState) => !prevState)
    }
    /**
     * Issue 1: As useEffect runs twice, during initial render and when values in array change/components all get rendered, so the api call is made twice. So fix it.
     * Issue 2: when buttons below are clicked "resultsWebType" state is updated however, useEffect is not triggered even with resultsWebType in dependency array. As useEffect is not triggred, api call for images is not made and that breaks the imageResults component as the {data} is different
     */
    useEffect(() => {
        console.log("useEffect");
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
        }
        fetchResults();
    }, [searchTerm, setData, resultsWebType]);
    return (
        <div className="searchScreen">
            <header>
                <Link to="/">
                    <LogoSmall className="searchScreen__logo" />
                </Link>
                <SearchBar />
            </header>
            <div className="searchScreen__tabs">
                <button className={resultsWebType ? "active" : ''} id="web" onClick={(e) => handleClick(e)}>All</button>
                <button className={!resultsWebType ? "active" : ''} id="img" onClick={(e) => handleClick(e)}>Images</button>
            </div>
            <p>{data.totalResults}</p>
            <p>{!resultsWebType && console.log("its is changed")}</p>
            {resultsWebType ?
                <div className="searchScreen__webResults">{webResultsElements}</div>
                : <ImageResults data={data} />
            }
        </div>
    )
}

export default Searchscreen