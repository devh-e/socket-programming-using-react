import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./seatContainer.module.css";
import classNames from "classnames/bind";
import { socket } from "../../socket";

const cx = classNames.bind(styles);

const SeatContainer = () => {
    // 1
    const { id, title } = useParams();
    const [booked, setBooked] = useState("");
    const [seats, setSeats] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    // 2
    useEffect(() => {
        socket.emit("join", id);
        return () => {
            socket.disconnect();
        };
    }, []);

    // 3
    useEffect(() => {
        function setSeat(data) {
            setSeats(data);
        }
        socket.on("sSeatMessage", setSeat);
        return () => {
            socket.off("sSeatMessage", setSeat);
        };
    }, []);

    // 4
    const onClickHandler = (e) => {
        if (isDisabled) return;
        const { id, status } = e.target.dataset;
        if (status === "3" || status === "0") return;
        setBooked(id);
        const tempSeats = seats.map((s) => {
            return s.map((i) => {
                let temp = { ...i };
                if (i.seatNumber === id) {
                    temp = { ...i, status: 2 };
                } else {
                    temp = { ...i, status: i.status === 2 ? 1 : i.status };
                }
                return temp;
            });
        });
        setSeats(tempSeats);
    };

    // 5
    const onConfirmHandler = () => {
        if (!booked) return;
        socket.emit("addSeat", booked);
        setIsDisabled(true);
    };
    return (
        <div className={cx("seat_container")}>
            <h2 className={cx("title")}>{title}</h2>
            <div className={cx("screen")}>screen</div>
            <ul className={cx("wrap_seats")}>
                // 7
                {seats.map((v) => {
                    return v.map((i, idx) => (
                        <li
                            key={`seat_${idx}`}
                            data-id={i.seatNumber}
                            data-status={i.status}
                            className={cx(
                                "seat",
                                i.status === 0 && "empty",
                                i.status === 1 && "default",
                                i.status === 2 && "active",
                                i.status === 3 && "soldout"
                            )}
                            onClick={onClickHandler}
                        ></li>
                    ));
                })}
            </ul>
            <div className={cx("r_wrap")}>
                <h4 className={cx("r_title")}>{booked}</h4>
                {!isDisabled && (
                    <button
                        className={cx("r_confirm")}
                        onClick={onConfirmHandler}
                    >
                        Confirm
                    </button>
                )}
            </div>
        </div>
    );
};
export default SeatContainer;
