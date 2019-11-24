import { months } from 'global/enums';

export const getDateString = timeStamp => {
  if (!timeStamp) return null;
  const date = new Date(Number(timeStamp));
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};
