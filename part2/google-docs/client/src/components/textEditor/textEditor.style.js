// 1
import { css } from "@emotion/react";

export const container = css`
  .quill {
    height: 100vh;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
  }
  .ql-container.ql-snow {
    border: none;
    display: flex;
    justify-content: center;
  }
  .ql-container .ql-editor {
    width: 100%;
  }
  .ql-toolbar.ql-snow {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f3f3f3;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
`;
