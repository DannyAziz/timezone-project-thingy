import citiesToCoords from "lib/citiesToCoordsMap.json";

const { find } = require("geo-tz");

export default function handler(req, res) {
  const { city } = req.query;
  const cityObj = citiesToCoords[city];
  if (!cityObj) {
    res.status(200).json([]);
    return;
  }
  res.status(200).json(find(cityObj.lat, cityObj.lng));
}
