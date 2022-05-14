import { useEffect, useState, useMemo } from "react";

import { returnAcceptableTimeZones } from "lib";

import Select from "react-select";

import moment from "moment-timezone";

import timezoneToCitiesMap from "lib/timezoneToCitiesMap.json";

import Map, { Source, Layer, Marker } from "react-map-gl";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

const allTimeZones = moment.tz.names();
const allTimeZonesArr = allTimeZones.map((tz) => ({ value: tz, label: tz }));

const cities = [
  { label: "New York", value: "New York", timezone: "America/New_York" },
  { label: "Austin", value: "Austin", timezone: "America/Chicago" },
  {
    label: "San Francisco",
    value: "San Francisco",
    timezone: "America/Los_Angeles",
  },
  { label: "Seattle", value: "Seattle", timezone: "America/Los_Angeles" },
  { label: "Denver", value: "Denver", timezone: "America/Denver" },
  { label: "Chicago", value: "Chicago", timezone: "America/Chicago" },
  {
    label: "Los Angeles",
    value: "Los Angeles",
    timezone: "America/Los_Angeles",
  },
  { label: "Boston", value: "Boston", timezone: "America/New_York" },
  { label: "Miami", value: "Miami", timezone: "America/New_York" },
  { label: "Atlanta", value: "Atlanta", timezone: "America/New_York" },
  { label: "London", value: "London", timezone: "Europe/London" },
  { label: "Paris", value: "Paris", timezone: "Europe/Paris" },
  { label: "Berlin", value: "Berlin", timezone: "Europe/Berlin" },
  { label: "Madrid", value: "Madrid", timezone: "Europe/Madrid" },
  { label: "Rome", value: "Rome", timezone: "Europe/Rome" },
  { label: "India", value: "India", timezone: "Asia/Kolkata" },
  { label: "Tokyo", value: "Tokyo", timezone: "Asia/Tokyo" },
  { label: "Shanghai", value: "Shanghai", timezone: "Asia/Shanghai" },
  { label: "Sydney", value: "Sydney", timezone: "Australia/Sydney" },
  { label: "Melbourne", value: "Melbourne", timezone: "Australia/Melbourne" },
  { label: "Cairo", value: "Cairo", timezone: "Africa/Cairo" },
  { label: "Moscow", value: "Moscow", timezone: "Europe/Moscow" },
  { label: "Beijing", value: "Beijing", timezone: "Asia/Shanghai" },
  { label: "Seoul", value: "Seoul", timezone: "Asia/Seoul" },
  { label: "Bangkok", value: "Bangkok", timezone: "Asia/Bangkok" },
  { label: "Jakarta", value: "Jakarta", timezone: "Asia/Jakarta" },
  { label: "Hong Kong", value: "Hong Kong", timezone: "Asia/Hong_Kong" },
  { label: "Singapore", value: "Singapore", timezone: "Asia/Singapore" },
  { label: "Taipei", value: "Taipei", timezone: "Asia/Taipei" },
  ...allTimeZonesArr,
];

const hours = [
  { label: "12:00 AM", value: "12:00 AM" },
  { label: "1:00 AM", value: "1:00 AM" },
  { label: "2:00 AM", value: "2:00 AM" },
  { label: "3:00 AM", value: "3:00 AM" },
  { label: "4:00 AM", value: "4:00 AM" },
  { label: "5:00 AM", value: "5:00 AM" },
  { label: "6:00 AM", value: "6:00 AM" },
  { label: "7:00 AM", value: "7:00 AM" },
  { label: "8:00 AM", value: "8:00 AM" },
  { label: "9:00 AM", value: "9:00 AM" },
  { label: "10:00 AM", value: "10:00 AM" },
  { label: "11:00 AM", value: "11:00 AM" },
  { label: "12:00 PM", value: "12:00 PM" },
  { label: "1:00 PM", value: "1:00 PM" },
  { label: "2:00 PM", value: "2:00 PM" },
  { label: "3:00 PM", value: "3:00 PM" },
  { label: "4:00 PM", value: "4:00 PM" },
  { label: "5:00 PM", value: "5:00 PM" },
  { label: "6:00 PM", value: "6:00 PM" },
  { label: "7:00 PM", value: "7:00 PM" },
  { label: "8:00 PM", value: "8:00 PM" },
  { label: "9:00 PM", value: "9:00 PM" },
  { label: "10:00 PM", value: "10:00 PM" },
  { label: "11:00 PM", value: "11:00 PM" },
];

const Home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);

  const [startHour2, setStartHour2] = useState(null);
  const [endHour2, setEndHour2] = useState(null);

  const [potentialCities, setPotentialCities] = useState([]);

  const [geoJson, setGeoJson] = useState(null);

  useEffect(() => {
    if (startHour && endHour && startHour2 && endHour2) {
      const results = returnAcceptableTimeZones(
        selectedOption.timezone,
        startHour.value,
        endHour.value,
        startHour2.value,
        endHour2.value
      );
      const iterPotentialCities = [];
      results.forEach((timezone) => {
        const cities = timezoneToCitiesMap[timezone];
        if (cities) {
          iterPotentialCities.push(...cities);
        }
      });
      setPotentialCities(iterPotentialCities);
    }
  }, [selectedOption, startHour, endHour, startHour2, endHour2]);

  useEffect(() => {
    setGeoJson({
      type: "FeatureCollection",
      features: potentialCities.map((city) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [city.lng, city.lat],
        },
      })),
    });
  }, [potentialCities]);

  return (
    <div className="p-12 flex flex-col gap-y-12">
      <div>What timezone or city do your meetings take place in?</div>
      <div>
        <Select options={cities} isClearable onChange={setSelectedOption} />
      </div>
      {selectedOption && (
        <>
          <div>
            Between what time in {selectedOption.label} are your meetings
            typically in?
          </div>
          <div>
            <Select options={hours} isClearable onChange={setStartHour} />
            <Select options={hours} isClearable onChange={setEndHour} />
            <span>
              Between {startHour?.label} and {endHour?.label}
            </span>
          </div>
          <div>
            Between what time do you want to take meetings in your new city?
          </div>
          <div>
            <Select options={hours} isClearable onChange={setStartHour2} />
            <Select options={hours} isClearable onChange={setEndHour2} />
            <span>
              Between {startHour2?.label} and {endHour2?.label}
            </span>
          </div>
          <div>
            <Map
              initialViewState={{
                longitude: 0,
                latitude: 0,
                zoom: 0,
              }}
              style={{ width: 600, height: 400 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken="pk.eyJ1Ijoic2hpdGxpc3QiLCJhIjoiY2ptenl0ZnVnMTBmcjNrcGxpMTBlanpyciJ9.2uF-xfHatr2NU985_Euhbg"
            >
              <Source id="my-data" type="geojson" data={geoJson}>
                <Layer {...layerStyle} />
              </Source>
            </Map>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
