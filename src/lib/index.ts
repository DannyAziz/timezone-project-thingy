import moment from "moment-timezone";

const allTimeZones = moment.tz.names();

const returnAcceptableTimeZones = (
  timeZone: string,
  startHour: string,
  endHour: string,
  startHour2: string,
  endHour2: string
) => {
  const startHourObj = moment.tz(startHour, "hh:mm A", timeZone);
  const endHourObj = moment.tz(endHour, "hh:mm A", timeZone);

  const startHourObjUtc = startHourObj.clone().utc().dayOfYear(1);
  const endHourObjUtc = endHourObj.clone().utc().dayOfYear(1);

  // Loop through all timezones and check if they are within the range of hours
  const acceptableTimeZones = allTimeZones.filter((iterTimeZone) => {
    const startHourObj2 = moment.tz(startHour2, "hh:mm A", iterTimeZone);
    const endHourObj2 = moment.tz(endHour2, "hh:mm A", iterTimeZone);

    const startHourObj2UTC = startHourObj2.clone().utc().dayOfYear(1);
    const endHourObj2UTC = endHourObj2.clone().utc().dayOfYear(1);

    if (
      startHourObj2UTC.isBetween(
        startHourObjUtc,
        endHourObjUtc,
        undefined,
        "[]"
      ) ||
      endHourObj2UTC.isBetween(startHourObjUtc, endHourObjUtc, undefined, "[]")
    ) {
      return timeZone;
    }
  });

  return acceptableTimeZones;
};

export { returnAcceptableTimeZones };
