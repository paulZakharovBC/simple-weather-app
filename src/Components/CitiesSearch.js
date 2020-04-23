import React from 'react'
import './CitiesSearch.css'


const CitiesSearch = (props) => {
    if (props.searchingCitiesList.length > 0) {
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

    } else {
        return (
            <div className='listOfCities-box'>
                <div className='no-results'>
                <i class="fas fa-search"></i>
                <h2>Sorry, No Cities Found</h2>
                <p>Try another city name</p>
                </div>
            </div>
        )
    }




    // if (props.searchingCitiesList.length > 0) {
    //     return (
        
    //         <div className='listOfCities-box'>
    //             <ul>
    //                 {/* <li>Москва</li>
    //                 <li>СПБ</li>
    //                 <li>Минск</li>
    //                 <li>Минск</li>
    //                 <li>Минск</li> */}
                    
    //                 {props.cities.map(function (item) {
    //                     return (
    //                         <li onClick={(event) => {props.confirmCity(item, event) }}>
    //                             {item.city}, {item.country}
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //     )

    // } else {
    //     return (
    //         <div className='listOfCities-box'>
    //             <div className='no-results'>
    //             <i class="fas fa-search"></i>
    //             <h2>Sorry, No Cities Found</h2>
    //             <p>Try another city name</p>
    //             </div>
    //         </div>
    //     )
    // }
    
}

export default CitiesSearch