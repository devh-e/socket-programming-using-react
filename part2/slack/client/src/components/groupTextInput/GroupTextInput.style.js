import { css } from "@emotion/react";

export const groupTextContainerCss = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  width: 100%;
`;
export const titleCss = css`
  color: grey;
  font-size: 14px;
`;
export const groupFormCss = css`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const inputCss = css`
  padding: 5px 10px;
  width: 100%;
  border: 1px solid #cecece;
  border-radius: 10px;
`;
export const nameBoxCss = css`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-content: center;
`;
export const tagCss = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  background-color: #cecece;
  padding: 5px 8px;
  font-size: 12px;
  border-radius: 5px;

  .close {
    cursor: pointer;
  }
`;
export const joinBtnCss = css`
  border: 0;
  background-color: #4a154b;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;
