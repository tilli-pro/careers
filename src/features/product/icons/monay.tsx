import React from "react";

export const MonayIcon: React.FC<React.SVGAttributes<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0.19 4.69 29.72 20.97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="monay-logo-svg"
      {...props}
    >
      <g className="monay-logo-g">
        <path
          id="monay-logo-Vector"
          d="M29.2802 11.706C29.0402 11.406 28.7822 11.256 28.4882 11.256C27.7862 11.256 27.0962 12.048 27.0602 12.09L24.3722 15.468L24.1382 15.768V18.744C24.9062 18.204 25.8302 17.898 26.8262 17.898C27.8222 17.898 28.7462 18.204 29.5142 18.744V12.006L29.2802 11.706Z"
        />
        <path
          id="monay-logo-Vector_2"
          d="M11.8558 10.608C11.8558 10.56 11.8258 10.104 11.6398 9.66602C11.4058 9.10202 11.0458 8.82602 10.5418 8.82602H10.3078L0.75576 20.94C-0.16824 22.092 0.0657598 23.784 1.21776 24.702C2.36976 25.62 4.13976 25.392 4.97976 24.24L11.8498 15.522V10.608H11.8558Z"
        />
        <path
          id="monay-logo-Vector_3"
          d="M24.6781 5.68201L17.4541 14.826L17.5321 7.45201C17.6101 4.84201 14.3041 3.69001 12.6901 5.76001L10.5361 8.52601C12.0721 8.52601 12.1501 10.602 12.1501 10.602V22.74C12.1501 25.278 15.3781 26.43 16.9141 24.432L24.1381 15.288L26.8261 11.91C26.8261 11.91 28.3621 10.068 29.5141 11.526V7.45201C29.5201 4.75801 26.2921 3.76201 24.6781 5.68201Z"
        />
        <path
          className="monay-icon-circle"
          id="monay-logo-Vector_4"
          d="M26.985 19.818H26.751C25.1389 19.818 23.832 21.1249 23.832 22.737C23.832 24.3491 25.1389 25.656 26.751 25.656H26.985C28.5971 25.656 29.904 24.3491 29.904 22.737C29.904 21.1249 28.5972 19.818 26.985 19.818Z"
        />
      </g>
    </svg>
  );
};
