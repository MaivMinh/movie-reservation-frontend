const getDayOfWeek = (date) => {
  if (!date) return "";
  const result = new Date(date);
  return result.toLocaleDateString('vi-VN', { weekday: 'long' }); // 'Thứ Bảy'
};
export default getDayOfWeek;