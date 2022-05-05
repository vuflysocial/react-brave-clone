import './_App.scss';
import { Routes, Route, useNavigate } from "react-router-dom";
import { createContext, useState } from 'react';
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