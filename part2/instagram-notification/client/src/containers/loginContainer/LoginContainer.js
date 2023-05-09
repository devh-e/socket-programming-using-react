import { useEffect, useState, useContext } from "react";
import styles from "./LoginContainer.module.css";
// 1
import { socket } from "../../socket";
import { Context } from "../../context";
import { AUTH_INFO } from "../../context/action";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
const LoginContainer = () => {
    // 2
    const navigate = useNavigate();
    // 3
    const {
        dispatch,
    } = useContext(Context);
    const [user, setUser] = useState("");

    // 4
    useEffect(() => {
        socket.on("connect_error", (err) => {
            if (err.message === "invalid username") {
                console.log("err");
            }
        });
    }, []);

    const setUserNameHandler = (e) => {
        setUser(e.target.value);
    };
    // 5
    const onLoginHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: AUTH_INFO,
            payload: user,
        });
        socket.auth = { userName: user };
        socket.connect();
        navigate("/post");
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login}>
                <img src={logo} width="200px" alt="logo" />
                <form className={styles.loginForm} onSubmit={onLoginHandler}>
                    <input
                        className={styles.input}
                        type="text"
                        value={user}
                        placeholder="Enter your name"
                        onChange={setUserNameHandler}
                    />
                    <button onClick={onLoginHandler} className={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginContainer;
