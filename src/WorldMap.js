import React, { Component } from 'react'
import './App.css'
import worlddata from './world'
import { geoMercator, geoPath } from 'd3-geo'

const getCountryISO3 = require("country-iso-2-to-3");
const mapWorldData = (countries, data) => {
    var filteredData = countries;
    data.forEach(dato => {
        countries.forEach((country, i) => {
            if (country.id === dato.segment) {
                filteredData.splice(i, 1, { ...country, level: dato.level, puntos: dato.nb_uniq_actions_searchkeyword });
            }
        })
    })
    return filteredData;
}
const parseMapData = (data) => {
    let parsedData = data.map(item => {
        let itemId = item.segment.replace('countryCode==', '');
        item.segment = getCountryISO3(itemId.toUpperCase());
        return { ...item }
    })
    return parsedData;
}
class WorldMap extends Component {
    render() {
        let finalData = parseMapData(this.props.data);
        let finalMap = mapWorldData(worlddata.features, finalData);
        const projection = geoMercator().scale(120)
            .translate([430, 250])
        const pathGenerator = geoPath().projection(projection)
        console.log('-----');
        console.log(worlddata.features);
        console.log(finalMap);
        console.log(getCountryISO3("ES"));
        console.log('-----');
        const countries = finalMap
            .map((d, i) => <path
                key={'path' + i}
                d={pathGenerator(d)}
                //onMouseEnter={() => { this.props.onHover(d) }}
                style={{
                    fill: d.puntos > 5 ? "#FCBC34" : this.props.colorScale(d.launchday),
                    stroke: "black", strokeOpacity: 0.5,
                }}
                className='countries'
            />)
        return <svg height={750}>
            {countries}
        </svg>
    }
}
export default WorldMap