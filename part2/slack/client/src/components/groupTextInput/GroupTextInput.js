import { css } from "@emotion/react";
import {
  groupTextContainerCss,
  titleCss,
  inputCss,
  groupFormCss,
  nameBoxCss,
  tagCss,
  joinBtnCss,
} from "./GroupTextInput.style";

// 1
const GroupTextInput = ({
  groupText,
  onChangeGroupTextHandler,
  onGroupSendHandler,
  groupChatUserList,
  groupChatUserCloseClick,
  onJoinClick,
}) => {
  return (
    <div css={groupTextContainerCss}>
      <span css={titleCss}>to:</span>
      <ul css={nameBoxCss}>
        {
          // 2
          groupChatUserList.map((v, i) => (
            <li css={tagCss} key={`${i}-${v}`}>
              {v}
              <span
                className="close"
                data-id={v}
                onClick={groupChatUserCloseClick}
              >
                X
              </span>
            </li>
          ))
        }
      </ul>
      <form onSubmit={onGroupSendHandler} css={groupFormCss}>
        <input
          type="text"
          value={groupText}
          css={inputCss}
          onChange={onChangeGroupTextHandler}
          onChangeGroupTextHandler={onChangeGroupTextHandler}
        />
      </form>
      <button css={joinBtnCss} onClick={onJoinClick}>
        Join
      </button>
    </div>
  );
};

export default GroupTextInput;
