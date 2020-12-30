import * as React from "react";

function Show(props) {
  return (
    <svg
      data-name="Group 681"
      width="1em"
      height="1em"
      viewBox="0 0 32.125 22"
      {...props}
    >
      <path
        data-name="Path 337"
        d="M16.383 15.553a4.522 4.522 0 114.223-4.223 4.515 4.515 0 01-4.223 4.223z"
        fill="#bdbdbd"
      />
      <path
        data-name="Path 338"
        d="M16.09 0A17.29 17.29 0 000 10.974C1.522 16.125 8.165 22 16.09 22s14.234-5.582 16.035-11.085C30.608 6.214 24.678 0 16.09 0zm.432 17.664a6.634 6.634 0 116.188-6.188 6.638 6.638 0 01-6.188 6.188z"
        fill="#bdbdbd"
      />
    </svg>
  );
}

const MemoShow = React.memo(Show);
export default MemoShow;
