import './_App.scss';
import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import SearchScreen from './components/SearchScreen/SearchScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';

export const SearchTermContext = createContext({
  searchTerm: '',
  setSearchTerm: () => { },
  setTermAndRedirect: () => { }
})
const initialResultsState = {
  items: [],
  totalResults: "",
}
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialResultsState);
  const history = useNavigate();
  const setTermAndRedirect = (term) => {
    if (!term) return;
    setSearchTerm(term);
    history('/search')
  }
  // useEffect(() => {
  //   if (!searchTerm) return;
  //   const fetchResults = async () => {
  //     const searchUrl = resultsWebType ? `${BASE_URL}key=${API_KEY}&cx=${ENGINE_ID}&q=${searchTerm}` : `${BASE_URL}key=${API_KEY}&cx=${ENGINE_ID}&q=${searchTerm}&searchType=image`
  //     const response = await fetch(searchUrl);
  //     const data = await response.json();
  //     setData((prevState) => {
  //       return {
  //         ...prevState,
  //         items: data.items,
  //         totalResults: data.searchInformation.formattedTotalResults
  //       }
  //     })
  //   }
  //   fetchResults();
  // }, [resultsWebType, searchTerm]);

  const propsSearchScreen = {
    data: data,
    setData: setData,
    searchTerm: searchTerm
  }
  return (
    <SearchTermContext.Provider value={{ searchTerm, setSearchTerm, setTermAndRedirect }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen {...propsSearchScreen} />} />
      </Routes>
    </SearchTermContext.Provider>
  );
}

export default App;



/**
 * Components:
 * 1. Homepage
 * 2. Search
 * 3. Header
 * 4. Searchbar
 * 5. All
 * 6. Images
 * 
 * Page-1: Home page with Brave Image and <Searchbar />
 * Page-2: Search page 
 *      - with <Header>logo and <Searchbar/></Header>
 *      - links All and Images which redirect to All results and Image results
 *      - <All/> for web results
 *      - <Images/> for Image results
 * 
 * State: In App.js
 *      - for search query from search bar
 *      - for fetched results
 */