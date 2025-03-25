import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Seat from "../components/Seat";
import getDayOfWeek from "../utils/dayOfWeek";
import getDayAndMonth from "../utils/getDayAndMonth";
import { Button, message, Modal } from "antd";
import { SoundTwoTone, SyncOutlined } from "@ant-design/icons";
import client from "../services/bookingWs";
import { BookingContext } from "../context/BookingContext";
import { AppContext } from "../context/AppContext";
import apiClient from "../services/apiClient";

const Booking = () => {
  const [searchParams] = useSearchParams(); // Gets query parameters
  const { movieName } = useParams();
  const showtimeId = searchParams.get("showtime"); // Gets the movieId query parameter
  const [data, setData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(new Set());
  const navigate = useNavigate();
  const { updateMovie, updateShowtime, updateSeats, updateData } =
    useContext(BookingContext);
  const [loading, setLoading] = useState(false);
  const { accountId } = useContext(AppContext);

  useEffect(() => {
    /// Thực hiện request yêu cầu tạo queue mới tương ứng cho Client.
    const removeExistingQueue = async () => {
      try {
        // Thử xóa queue cũ nếu có
        await apiClient.post("/api/bookings/queues/remove", { accountId: accountId });
      } catch (error) {
        console.error("Connection setup failed:", error);
      }
    };
    removeExistingQueue();

    apiClient
      .post("/api/bookings/queues/declare", { accountId: accountId })
      .then((response) => {
        if (response.data.status === 200 || response.data.status === 201) {
          client.onConnect = (frame) => {
            console.log(frame);
            client.subscribe(
              `/queue/holding.${accountId}`,
              (message) => {
                console.log(message);
                try {
                  const payload = JSON.parse(message.body);
                  const { seats } = payload;
                  if (payload.showtimeId == showtimeId) {
                    /// use functional updates with stable references.
                    setData((prev) => {
                      const newSeats = prev.seats.map((seat) => {
                        const updatedSeat = seats.find(
                          (s) => s.seatId === seat.id
                        );
                        if (updatedSeat) {
                          return { ...seat, isReserved: updatedSeat.reserved };
                        }
                        return seat;
                      });
                      return { ...prev, seats: newSeats };
                    });
                  }
                } catch (error) {
                  console.log(
                    "Error processing message: ",
                    error,
                    message.body
                  );
                }
              },
              {
                "auto-delete": true,
                durable: true,
                exclusive: false,
              }
            );
          };
          client.activate();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      apiClient
        .post("/api/bookings/queues/remove", { accountId: accountId })
        .then((response) => {
          console.log("Queue removed successfully:", response.data);
        })
        .catch((error) => {
          console.error("Failed to remove queue:", error);
        });

      client.deactivate();
      console.log("WebSocket connection deactivated");
    };
  }, [showtimeId]); /// Add showtime as a dependency

  const enterLoading = async () => {
    if (accountId === null) return;
    if (loading) return; // Prevents infinite loop
    if (selectedSeat.size === 0) {
      warning("Vui lòng chọn ghế muốn đặt!");
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.post("/api/bookings/seats/hold", {
        showtimeId: showtimeId,
        seats: [...selectedSeat],
      });
      setSelectedSeat(new Set());
      if (response.data.status == 200) {
        /// Lưu thông tin booking vào trong context.
        updateMovie(movie);
        updateShowtime(showtime);
        updateSeats([...selectedSeat]);
        updateData(data);
        navigate(`/booking/${movieName}/payment`);
      } else {
        warning(response.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setSelectedSeat(new Set());
    }
  };

  const warning = (message) => {
    Modal.warning({
      title: "Thông báo",
      content: (
        <div className="w-full">
          <p className="font-semibold">
            {message === undefined
              ? "Bạn chỉ có thể chọn tối đa 5 ghế"
              : message}
          </p>
        </div>
      ),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get(`/api/bookings/${showtimeId}`);
      if (response.data.status === 200) {
        setData(response.data.data);
      } else {
        console.log(response.data.message);
      }
    };
    fetchData();
  }, []);

  const handleSeatSelection = (seat) => {
    if (loading) return; // Prevents selecting seats while loading
    setSelectedSeat((prev) => {
      const newSet = new Set(prev); // Create a new Set from the previous one
      if (newSet.has(seat.id)) {
        newSet.delete(seat.id);
      } else {
        if (selectedSeat.size >= 5) {
          warning();
          return prev;
        }
        newSet.add(seat.id);
      }
      return newSet; // Return the new Set
    });
  };
  const movie = data?.movie;
  const showtime = data?.showtime;

  /// Thực hiện lọc danh sách seat ra theo row.
  const map = new Map();
  data?.seats?.forEach((seat) => {
    if (!map.has(seat.seatRow)) {
      map.set(seat.seatRow, []);
    }
    map.set(seat.seatRow, [...map.get(seat.seatRow), seat]);
  });

  const selectedMap = new Map();
  selectedSeat.forEach((seatId) => {
    if (data?.seats?.find((seat) => seat.id === seatId)) {
      const seat = data?.seats?.find((seat) => seat.id === seatId);
      if (!selectedMap.has(seat.type)) {
        selectedMap.set(seat.type, []);
      }
      selectedMap.set(seat.type, [...selectedMap.get(seat.type), seat]);
    }
  });

  return (
    <div className="text-black w-[98%] mx-auto bg-[#f5f5f5af] min-h-screen">
      <div className="w-full mx-auto grid grid-cols-10 gap-4">
        <div className="col-span-7">
          <div className="w-full mx-auto">
            <div className="w-full h-12 flex flex-row gap-x-10 items-center justify-start bg-white rounded-md px-3 py-8 mb-10">
              <h1 className="text-lg font-semibold text-nowrap">Suất chiếu</h1>
              <div className="w-full flex flex-row items-center justify-start h-full">
                <p className="ml-4 text-sm">
                  <span className="font-semibold text-md">Phim:</span>{" "}
                  {data?.movie?.name}
                </p>
                <p className="ml-4 text-sm">
                  <span className="font-semibold text-md">Rạp:</span>{" "}
                  {data?.showtime?.room?.cinema?.name}{" "}
                  {`(${data?.showtime?.room?.cinema?.province?.name})`}
                </p>
                <p className="ml-4 text-sm">
                  <span className="font-semibold text-md">Thời gian:</span>{" "}
                  {getDayOfWeek(data?.showtime?.date) +
                    ", ngày " +
                    getDayAndMonth(data?.showtime?.date)}
                </p>
              </div>
            </div>
            <div className="px-3 py-10 rounded-md bg-white border-b-[1px] border-amber-300">
              {[...map.entries()]
                .sort(([rowA], [rowB]) => rowA.localeCompare(rowB))
                .map(([row, seats]) => (
                  <div
                    key={row}
                    className="flex w-full h-full items-center justify-between mb-2"
                  >
                    <div className="w-8 font-bold text-center">{row}</div>
                    <div className="flex flex-1 flex-wrap justify-center">
                      {seats
                        .sort((a, b) => a.seatNumber - b.seatNumber) // Sort seats by number
                        .map((seat) => (
                          <Seat
                            key={seat.id}
                            seat={seat}
                            onClick={handleSeatSelection}
                            isSelected={selectedSeat.has(seat.id)}
                          />
                        ))}
                    </div>
                    <div className="w-8 font-bold text-center">{row}</div>
                  </div>
                ))}
              <div className="mt-6 text-center font-semibold text-gray-500">
                Màn hình
              </div>
              <div className="mx-auto mt-2 w-1/2 h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        <div className="col-span-3 rounded-xl bg-white p-4 pt-6 border-t-6 border-amber-500">
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
          {selectedSeat.size > 0 && (
            <div className="border-dashed border-b-[0.5px] border-b-gray-800 mt-10 flex flex-col items-start justify-start gap-y-4">
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
                {selectedSeat.size > 0
                  ? [...selectedMap.values()]
                      .flat()
                      .map((seat) => seat.price)
                      .reduce((a, b) => a + b)
                  : 0}
                <span class="inline-block font-bold text-primary ">
                  &nbsp;₫
                </span>
              </span>
            </p>
          </div>
          <div>
            <Button
              type="primary"
              style={{
                backgroundColor: "#f06312",
                borderColor: "#f06312",
                minWidth: "100%",
                marginTop: "20px",
                fontSize: "20px",
                fontWeight: "500",
                padding: "20px 0",
                lineHeight: "1",
              }}
              onClick={() => enterLoading()}
            >
              {loading ? <SyncOutlined spin /> : "Đặt vé"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
