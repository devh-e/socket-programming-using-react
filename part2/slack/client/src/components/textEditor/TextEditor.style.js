import { css } from "@emotion/react";

export const containerCss = css`
    position: relative;
    width: 800px;
    .quill {
        margin: 20px;
        background-color: #fff;
        border: 1px solid #cecece;
        border-radius: 15px;
    }
    .ql-container.ql-snow {
        border: none;
        display: flex;
    }
    .ql-container .ql-editor {
        width: 100%;
    }
    .ql-toolbar.ql-snow {
        width: calc(100% - 30px);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        display: flex;
        position: sticky;
        top: 0;
        z-index: 1;
        border: none;
    }
`;
export const sendCss = css`
    position: absolute;
    right: 30px;
    top: 30px;
    height: 25px;
    width: 25px;
    color: #29ac76;
    cursor: pointer;
`;
