import { css } from "@emotion/react";

export const userCss = css`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    color: #cecece;
    font-size: 14px;
    padding: 7px 20px;
    cursor: pointer;

    &:hover {
        background-color: rgba(234, 234, 234, 0.2);
    }

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
