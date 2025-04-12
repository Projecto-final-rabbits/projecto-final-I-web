const dateToStringFormat = (date: Date): string => {
  if (!date) return "";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return new Intl.DateTimeFormat("es-ES", options).format(date);
};

const isoDateToDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date;
};

const dateToIsoString = (date: Date) => {
  if (!date) return null;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return new Intl.DateTimeFormat("es-ES", options).format(date);
};

export { dateToStringFormat, isoDateToDate, dateToIsoString };
