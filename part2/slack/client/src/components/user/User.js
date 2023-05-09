import { css } from "@emotion/react";
import { userCss } from "./User.style";

// 1
const User = ({ id, status, onClick, socket, type }) => {
  return (
    <div
      css={userCss}
      data-id={id}
      data-type={type}
      data-socket={socket}
      data-status={status}
      onClick={onClick}
    >
      <span className={status ? "active" : "deactive"} />
      <span
        data-type={type}
        className="user"
        data-id={id}
        data-socket={socket}
        data-status={status}
      >
        {id}
      </span>
    </div>
  );
};

export default User;
