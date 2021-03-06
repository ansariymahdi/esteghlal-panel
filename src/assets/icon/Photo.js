import * as React from "react";

function Photo(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 308.8 308.8" {...props}>
      <g xmlns="http://www.w3.org/2000/svg">
        <path
          d="M35.6 18.8h180c19.6 0 35.6 16 35.6 35.6v185.2c0 19.6-16 35.6-35.6 35.6h-180C16 275.2 0 259.2 0 239.6V54c0-19.2 16-35.2 35.6-35.2z"
          fill="#092458"
          data-original="#4a566e"
        />
        <path
          d="M116.4 186.4l-52.8-52.8L0 197.2v42c0 19.6 16 35.6 35.6 35.6h180c19.6 0 35.6-16 35.6-35.6v-68.4l-59.6-60-75.2 75.6z"
          fill="#04a9f5"
          data-original="#00b594"
        />
        <circle
          cx={114.8}
          cy={103.6}
          r={22.4}
          fill="#ffcc03"
          data-original="#ffcc03"
        />
        <circle
          cx={251.2}
          cy={232.4}
          r={57.6}
          fill="#fff"
          data-original="#ffffff"
        />
      </g>
      <g xmlns="http://www.w3.org/2000/svg">
        <path
          d="M242.8 205.6c0-4.8 3.6-8.4 8.4-8.4 4.4 0 8.4 3.6 8.4 8.4V260c0 4.8-3.6 8.4-8.4 8.4s-8.4-3.6-8.4-8.4v-54.4z"
          fill="#04a9f5"
          data-original="#00b594"
        />
        <path
          d="M245.2 211.2c-3.2-3.2-3.2-8.4 0-11.6s8.4-3.2 11.6 0l19.2 19.2c3.2 3.2 3.2 8.4 0 11.6s-8.4 3.2-11.6 0l-19.2-19.2z"
          fill="#04a9f5"
          data-original="#00b594"
        />
        <path
          d="M245.2 199.6c3.2-3.2 8.4-3.2 11.6 0s3.2 8.4 0 11.6L238 230.4c-3.2 3.2-8.4 3.2-11.6 0s-3.2-8.4 0-11.6l18.8-19.2z"
          fill="#04a9f5"
          data-original="#00b594"
        />
      </g>
    </svg>
  );
}

const MemoPhoto = React.memo(Photo);
export default MemoPhoto;
