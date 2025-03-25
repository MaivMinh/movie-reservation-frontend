import React, { useContext, useEffect, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);
  const { movie, showtime, seats, data } = useContext(BookingContext);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 1000);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Thanh toán thành công!");
    }, 2000);
  };

  const selectedMap = new Map();
  seats.forEach((seatId) => {
    if (data?.seats?.find((seat) => seat.id === seatId)) {
      const seat = data?.seats?.find((seat) => seat.id === seatId);
      if (!selectedMap.has(seat.type)) {
        selectedMap.set(seat.type, []);
      }
      selectedMap.set(seat.type, [...selectedMap.get(seat.type), seat]);
    }
  });

  const warning = (title, content) => { 
    Modal.warning({
      title: title,
      content: content,
    });
  };

  useEffect(() => {
    // Kiểm tra hết thời gian

    // Tạo interval
    const intervalId = setInterval(async () => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalId);
          /// Thực hiện gửi request tới phía Server để giải phóng ghế.
          apiClient.post("/api/bookings/queues/remove")
          warning("Hết thời gian giữ ghế", "Vui lòng chọn ghế lại");
          window.history.back();
        }
        return prevTime - 1000;
      });
    }, 1000);

    // Dọn dẹp interval khi component unmount hoặc timeLeft thay đổi
    return () => clearInterval(intervalId);
  }, []); // Bỏ timeLeft khỏi dependency để tránh tạo nhiều interval

  // Sửa lại - Đổi từ mili giây sang phút:giây
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="w-full max-w-[90%] mx-auto overflow-hidden mt-12">
      <div className="md:grid md:grid-cols-10 gap-x-10">
        {/* Payment Methods Section */}
        <div className="md:col-span-7 p-8 bg-white rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Phương thức thanh toán
          </h2>

          {/* Payment Method Selection */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <PaymentOption
              id="credit"
              name="Thẻ tín dụng"
              icon="https://cdn-icons-png.flaticon.com/512/179/179431.png"
              selected={paymentMethod === "credit"}
              onClick={() => setPaymentMethod("credit")}
            />
            <PaymentOption
              id="momo"
              name="MoMo"
              icon="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
              selected={paymentMethod === "momo"}
              onClick={() => setPaymentMethod("momo")}
            />
            <PaymentOption
              id="vnpay"
              name="VNPay"
              icon="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
              selected={paymentMethod === "vnpay"}
              onClick={() => setPaymentMethod("vnpay")}
            />
          </div>

          {/* Payment Form */}
          <div className="mb-8">
            {paymentMethod === "credit" && <CreditCardForm />}

            {paymentMethod === "momo" && <MomoPayment />}

            {paymentMethod === "vnpay" && <VNPayPayment />}
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center cursor-pointer"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              `Thanh toán ${
                seats.length &&
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  [...selectedMap.values()]
                    .flat()
                    .map((seat) => seat.price)
                    .reduce((a, b) => a + b)
                )
              }`
            )}
          </button>
        </div>

        {/* Order Summary Section */}
        <div className="md:col-span-3 bg-white p-8 text-black rounded-2xl">
          <div className="w-full mx-auto px-4 py-2 flex flex-row justify-center items-center gap-x-4">
            <p>Thời gian giữ ghế:</p>
            <div
              className={`text-lg font-bold ${
                minutes <= 1 ? "text-red-500 animate-pulse" : "text-orange-500"
              }`}
            >
              {formattedTime}
            </div>
          </div>
          <div className="w-full grid grid-cols-10 gap-x-4">
            <div className="col-span-4">
              <img
                src={movie?.poster}
                className="rounded-sm object-cover w-full"
              />
            </div>
            <div className="col-span-6 flex flex-col items-start justify-start">
              <p className="font-semibold text-lg">{movie?.name}</p>
            </div>
          </div>
          {seats.length > 0 && (
            <div className="border-dashed border-b-[0.5px] border-b-gray-800 mt-10 flex flex-col items-start justify-start gap-y-4 text-black">
              {/* Chứa danh sách ghế ngồi đã chọn theo loại REGULAR hoặc PREMIUM */}
              {[...selectedMap.entries()].map(([type, seats]) => (
                <div
                  key={type}
                  className="flex flex-col items-start justify-start mb-4 gap-y-3 w-full"
                >
                  <p className="w-full flex flex-row items-center justify-between">
                    <span>
                      <span className="font-semibold text-sm">{`${seats.length}x `}</span>
                      <span>{type}</span>
                    </span>
                    <span className="text-sm font-semibold">
                      {seats.map((seat) => seat.price).reduce((a, b) => a + b)}
                      <span class="inline-block font-bold text-primary ">
                        &nbsp;₫
                      </span>
                    </span>
                  </p>
                  <p className="text-sm font-semibold">
                    <span className="text-sm">Ghế: </span>
                    {seats
                      .map((seat) => seat.seatRow + "" + seat.seatNumber)
                      .join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="w-full">
            <p className="w-full flex flex-row items-center justify-between mt-4">
              <span className="font-semibold text-md">Tổng cộng</span>
              <span className="text-md font-semibold text-[#f06312]">
                {seats.length &&
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    [...selectedMap.values()]
                      .flat()
                      .map((seat) => seat.price)
                      .reduce((a, b) => a + b)
                  )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentOption = ({ id, name, icon, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
      selected
        ? "border-orange-500 bg-orange-50"
        : "border-gray-200 hover:border-gray-300"
    }`}
  >
    <img src={icon} alt={name} className="h-10 object-contain mb-2" />
    <span
      className={`text-sm ${
        selected ? "font-medium text-orange-600" : "text-gray-700"
      }`}
    >
      {name}
    </span>
  </div>
);

const CreditCardForm = () => (
  <form className="space-y-4">
    <div>
      <label
        htmlFor="cardNumber"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Số thẻ
      </label>
      <input
        type="text"
        id="cardNumber"
        placeholder="1234 5678 9012 3456"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
      />
    </div>

    <div className="flex space-x-4">
      <div className="flex-1">
        <label
          htmlFor="expDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ngày hết hạn
        </label>
        <input
          type="text"
          id="expDate"
          placeholder="MM/YY"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div className="flex-1">
        <label
          htmlFor="cvv"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          placeholder="123"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </div>

    <div>
      <label
        htmlFor="cardName"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Tên chủ thẻ
      </label>
      <input
        type="text"
        id="cardName"
        placeholder="NGUYEN VAN A"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
      />
    </div>
  </form>
);

const MomoPayment = () => (
  <div className="text-center py-6">
    <img
      src="https://i.imgur.com/cUYO4B9.png"
      alt="Momo QR Code"
      className="w-48 h-48 mx-auto mb-4"
    />
    <p className="text-gray-700">Sử dụng app MoMo để quét mã QR</p>
    <p className="text-gray-700 text-sm mt-2">
      Hoặc chuyển khoản đến số điện thoại:{" "}
      <span className="font-medium">0987654321</span>
    </p>
  </div>
);

const VNPayPayment = () => (
  <div className="text-center py-6">
    <img
      src="https://i.imgur.com/5UiWbk2.png"
      alt="VNPay QR Code"
      className="w-48 h-48 mx-auto mb-4"
    />
    <p className="text-gray-700">
      Sử dụng app Ngân hàng hoặc VNPay để quét mã QR
    </p>
    <p className="text-gray-700 text-sm mt-2">
      Thanh toán sẽ được xử lý tự động sau khi hoàn tất
    </p>
  </div>
);

export default Payment;
