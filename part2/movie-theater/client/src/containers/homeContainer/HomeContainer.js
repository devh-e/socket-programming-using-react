import React, { useEffect } from "react";
import styles from "./homeContainer.module.css";
import classNames from "classnames/bind";
import avatar from "../../images/avatar.png";
import antman from "../../images/antman.png";
import cat from "../../images/cat.png";
import { socket } from "../../socket";
import { Link } from "react-router-dom";

// 1
const cx = classNames.bind(styles);

const HomeContainer = () => {
    useEffect(() => {
        socket.connect();
    }, []);
    return (
        <div className={cx("home_container")}>
            <h2 className={cx("title")}>Movie Chart</h2>
            <ul className={cx("wrap_movies")}>
                <li className={cx("movie")}>
                    <Link
                        to={`/seat/1/Avatar: The Way of Water`}
                        style={{ textDecoration: "none" }}
                    >
                        <div className={cx("img_wrap")}>
                            <img
                                src={avatar}
                                width="250px"
                                height="300px"
                                className={cx("img")}
                                alt="aa"
                            />
                            <h3 className={cx("number")}>1</h3>
                        </div>
                        <div className={cx("movie_title")}>
                            Avatar: The Way of Water
                        </div>
                    </Link>
                </li>
                <li className={cx("movie")}>
                    <Link
                        to={`/seat/2/Ant-Man and the Wasp:Quantumania`}
                        style={{ textDecoration: "none" }}
                    >
                        <div className={cx("img_wrap")}>
                            <img
                                src={antman}
                                width="250px"
                                height="300px"
                                className={cx("img")}
                                alt="aa"
                            />
                            <h3 className={cx("number")}>2</h3>
                        </div>
                        <div className={cx("movie_title")}>
                            Ant-Man and the Wasp:
                            <br /> Quantumania
                        </div>
                    </Link>
                </li>
                <li className={cx("movie")}>
                    <Link
                        to={`/seat/3/Puss in Boots: The Last Wish`}
                        style={{ textDecoration: "none" }}
                    >
                        <div className={cx("img_wrap")}>
                            <img
                                src={cat}
                                width="250px"
                                height="300px"
                                className={cx("img")}
                                alt="aa"
                            />
                            <h3 className={cx("number")}>3</h3>
                        </div>
                        <div className={cx("movie_title")}>
                            Puss in Boots: The Last Wish
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
export default HomeContainer;
