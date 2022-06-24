import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBar from './Components/SearchBar';
import Gallery from './Components/Gallery';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './DataContext'
import { useState, useEffect, Suspense } from 'react'
import { createResource as fetchData } from './helper'
import Spinner from './Components/Spinner';



function App() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState(null)
  
  const renderGallery = () => {
    if(data){
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
  }

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  useEffect(() => {
    if (search) {
        setData(fetchData(search))
    }
}, [search])

  // useEffect(() => {
  //   if(search) {
  //     const fetchData = async () => {
  //       document.title = `${search} Music`
  //       const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
  //       const data = await response.json()
  //       console.log(data)
  //       if(data.results.length > 0) {
  //         setData(data.results)
  //       } else {
  //         setMessage('Not Found')
  //       }
  //     }
  //     fetchData()
  //   }
  // }, [search])

  return (
    <div>
    {message}
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <SearchBar handleSearch = {handleSearch}/>
                        {message}
                        <Gallery data={data} />
                    </>
                } />
                <Route path="/album/:id" element={<AlbumView />} />
                <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
        </Router>
      <SearchBar handleSearch = {handleSearch} />
      {message}
      <DataContext.Provider value={data} >
      <Gallery />
      </DataContext.Provider>
    </div>
)

}

export default App;