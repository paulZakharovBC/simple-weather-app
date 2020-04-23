import React from 'react'
import './CitiesSearch.css'

const CitiesSearch = (props) => {
    return (
        <div className='listOfCities-box'>
            <ul>
                {/* <li>Москва</li>
                <li>СПБ</li>
                <li>Минск</li>
                <li>Минск</li>
                <li>Минск</li> */}
                
                {props.cities.map(function (item) {
                    return (
                        <li onClick={(event) => {props.confirmCity(item, event) }}>
                            {item.city}, {item.country}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default CitiesSearch