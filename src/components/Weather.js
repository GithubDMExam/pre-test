import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

function Weather({ cityData }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setData(null);
        setLoading(!loading);
        axios
        .get(
            `http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}`
        )
        .then((res) => {
            console.log(res.data[0]);
            setData(res.data[0]);
            setLoading(!loading);
        });
    }, [cityData.Key]);

    return (<>
            {
                data && <>
                    <div className='details'>
                        <p>Weather Today {moment(data.LocalObservationDateTime).format('dddd')}</p>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div className='weather-image'>
                            {data.IsDayTime ?
                                <img src='/sun.png' alt='sun' />
                                : <img src={'/moon.png'} alt='moon' />}
                        </div>
                        <div className='weather-temp'>
                            {Math.ceil(data.Temperature.Metric.Value)}
                            <sup className='deg'>&deg;{data.Temperature.Metric.Unit}</sup></div>
                        <div className='weather-text'>{data.WeatherText}</div>
                    </div><div className='weather-location'>{cityData.EnglishName} {cityData.Country.EnglishName}</div>
                </>
            }
        </>
    );
}

export default Weather;
