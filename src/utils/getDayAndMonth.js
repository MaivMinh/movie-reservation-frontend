const getDayAndMonth = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  return `${day}/${month}`;
};

export default getDayAndMonth;
