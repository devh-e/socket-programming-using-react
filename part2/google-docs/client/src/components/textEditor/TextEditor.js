// 1
import { css } from "@emotion/react";
import QuillCursors from "quill-cursors";
import { container } from "./textEditor.style.js";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// 2
const modules = {
    cursors: true,
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        ["clean"],
    ],
};

Quill.register("modules/cursors", QuillCursors);

// 3
const TextEditor = ({
    text,
    onChangeTextHandler,
    reactQuillRef,
    onChangeSelection,
}) => {
    return (
        <div css={container}>
            <ReactQuill
                theme="snow"
                modules={modules}
                value={text}
                onChange={onChangeTextHandler}
                onChangeSelection={onChangeSelection}
                ref={(el) => {
                    reactQuillRef.current = el;
                }}
            />
        </div>
    );
};

export default TextEditor;
