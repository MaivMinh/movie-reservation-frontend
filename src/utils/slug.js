const toASCIISlug = (str) => {
  return str
    .normalize("NFD") // Chuẩn hóa chuỗi Unicode
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Loại bỏ các ký tự không phải ASCII
    .trim() // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
    .toLowerCase(); // Chuyển thành chữ thường
};

export default toASCIISlug;