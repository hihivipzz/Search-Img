import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './Component/SearchBar';
import ImageList from './Component/ImageList';
import Loader from './Component/Loader';
import axios from 'axios';

function App() {
  const accessKey = "SAMsaCNo9D_psKXRJG2jZ-2_J09vpN3D2PqjUsEeJyg";
  const [searchQuery,setSearhQuery] = useState(" ");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  
  useEffect(()=>{
    const loadImage=()=>{
      if(loading){
        return;
      }
      setLoading(true);
      axios
        .get(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchQuery}&page=${page}&per_page=12`)
        .then((response) => {
          console.log(response)
          var imgList = response.data.results.map(item=>{
            return {
              id: item.id,
              alt: item.alt_description,
              url: item.urls.small
            }
          })
          setSearchResults(prev=>[...prev,...imgList]);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Lỗi khi tải hình ảnh từ Unsplash:', error);
          setLoading(false);
        });
    }
    loadImage();
  },[page,searchQuery,setSearchResults])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10&&
        !loading
      ) {
        setPage(page=>page+1);
      }
    };

    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  
  
  const handleSearch = (query) => {
      setPage(1);
      setSearhQuery(query);
      setSearchResults([]);
  };

  
  
  return (
    <div className="app">
      <h1>Ứng dụng Tìm kiếm Hình ảnh</h1>
      <SearchBar onSearch={handleSearch} />
      <ImageList images={searchResults} />
      {loading ? <Loader /> : <p>Img loaded!</p>}
    </div>
  );
}

export default App;
