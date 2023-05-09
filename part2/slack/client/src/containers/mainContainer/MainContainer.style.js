import { css } from "@emotion/react";

export const mainContainerCss = css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const slackMainCss = css`
    display: flex;
    flex-direction: column;
    /* height: 60vh; */
    width: 100%;
    max-width: 1000px;
    border: 1px solid #4a154b;
    border-radius: 5px;
`;
export const slackHeaderCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    width: calc(100% - 40px);
    background-color: #340e36;

    .user {
        color: #fff;
        font-weight: bold;
    }
`;
export const slackWindowCss = css`
    display: flex;
    flex-direction: row;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;

    li.green {
        cursor: pointer;
        background-color: #26c840;
        border-radius: 50%;
        width: 10px;
        height: 10px;
    }
    li.red {
        cursor: pointer;
        background-color: #fe5f58;
        border-radius: 50%;
        width: 10px;
        height: 10px;
    }
    li.orange {
        cursor: pointer;
        background-color: #febc2e;
        border-radius: 50%;
        width: 10px;
        height: 10px;
    }
`;
export const mainContentCss = css`
    display: flex;
    flex-direction: row;
    height: 100%;
`;
