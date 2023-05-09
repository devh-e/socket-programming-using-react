import { css } from "@emotion/react";

export const navBarWrapCss = css`
    height: 100%;
    width: 250px;
    display: flex;
    flex-direction: column;
    background-color: #4a154b;
`;
export const titleCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    font-weight: bold;
    padding: 0 20px;
    height: 50px;
    border-bottom: 1px solid rgba(234, 234, 234, 0.2);
`;
export const directMsgCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #cecece;
    font-size: 14px;
    padding: 7px 20px 7px 14px;
    cursor: pointer;
    &:hover {
        background-color: rgba(234, 234, 234, 0.2);
    }
`;
export const userListCss = css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;
