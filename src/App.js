import './App.css';
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/feather/search';
import Weather from './components/Weather';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [citySearch, setCitySearch] = useState('');
  const [cityData, setCityData] = useState(null);

  const fetchCity = (e) =>{
    e.preventDefault();
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&q=${citySearch}`)
    .then((res)=>{
      console.log(res)
      setCityData(res.data[0]);
      setCitySearch('');
    }).catch(err => console.log(err.message));
  }

  return (
    <div className='wrapper'>
      <div style={{ padding:'10px', width: '100%' }}>
        <main className='current-conditions-box'>
          <div className='details'>
          <form className='form-group custom-form' autoComplete='off' onSubmit={fetchCity}>
            <div className='search-box'>
              <input className='form-control' required placeholder='Search City...' value={citySearch} onChange={(e) => setCitySearch(e.target.value)} />
              <button type='submit' className='btn btn-secondary btn-sm'>
                <Icon icon={search} size={22}/>
              </button>
            </div>
          </form>
          </div>
          {cityData && <Weather cityData={cityData}/>}
        </main>
      </div>
    </div>
  );
}

export default App;
