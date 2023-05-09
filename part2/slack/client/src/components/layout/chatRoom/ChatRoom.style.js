import { css } from "@emotion/react";

export const chatRoomWrapCss = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const subTitleCss = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  font-size: 20px;
  height: 50px;
  font-weight: bold;
  padding: 0 20px;
  border-bottom: 1px solid #cecece;

  .active {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #29ac76;
  }
  .deactive {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid #cecece;
  }
`;
export const chatBoxGuidCss = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  height: 500px;
  gap: 20px;

  .guide {
    font-weight: bold;
    font-size: 2rem;
  }
`;
export const chatBoxCss = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 20px;
  flex: 1 1 auto;
  overflow: scroll;
  height: 400px;
  gap: 10px;
`;
export const chatCss = css`
  display: flex;
  flex-direction: column;
  padding-left: 10px;

  .userBox {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 5px;

    .user {
      font-weight: bold;
      font-size: 14px;
    }
    .date {
      color: grey;
      font-size: 10px;
    }
  }
  .textBox {
  }
`;
export const textBoxCss = css``;
