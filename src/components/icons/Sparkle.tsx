import { SVGProps } from 'react';

export const SparkleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
      fill="currentColor"
    />
    <path
      d="M19 4L20.18 6.82L23 8L20.18 9.18L19 12L17.82 9.18L15 8L17.82 6.82L19 4Z"
      fill="currentColor"
    />
  </svg>
);
