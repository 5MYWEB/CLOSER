import React from 'react';
import { useSelector } from 'react-redux';

import SearchBar from '../components/search/SearchBar';
import SearchedList from '../components/search/SearchedList';
import SearchedNaver from '../components/search/SearchedNaver';

function Search() {

  const { naverChecked } = useSelector((state) => state.search);

  return (
    <div>
      <SearchBar />
      { naverChecked === true &&
        <SearchedNaver/>
      }
      <SearchedList />
    </div>
  )
}

export default Search;