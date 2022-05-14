import citiesToCoords from "lib/citiesToCoordsMap.json";

const arrayOfCities = Object.keys(citiesToCoords);

export default function handler(req, res) {
  const { city } = req.query;
  const potentialCities = arrayOfCities.filter((potentialCity) =>
    potentialCity.toLowerCase().includes(city.toLowerCase())
  );

  res.status(200).json(potentialCities);
}
