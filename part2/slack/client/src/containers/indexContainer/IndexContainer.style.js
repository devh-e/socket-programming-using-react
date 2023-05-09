import { css } from "@emotion/react";

export const indexContainerCss = css`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const loginWrapCss = css`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

export const headerCss = css`
  text-align: center;
`;

export const loginFormCss = css`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
`;

export const inputCss = css`
  width: calc(100% - 22px);
  border: 1px solid #cecece;
  padding: 10px;
  border-radius: 5px;
`;
export const btnCss = css`
  width: 100%;
  border: 0;
  padding: 10px;
  border-radius: 5px;
  background-color: #4a154b;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
