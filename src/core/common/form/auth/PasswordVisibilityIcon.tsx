type PasswordVisibilityIconProps = {
  isVisible: boolean;
};

export default function PasswordVisibilityIcon({ isVisible }: PasswordVisibilityIconProps) {
  if (isVisible) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M2.5 10C3.75 6.25 6.75 3.75 10 3.75C13.25 3.75 16.25 6.25 17.5 10C16.25 13.75 13.25 16.25 10 16.25C6.75 16.25 3.75 13.75 2.5 10Z"
          stroke="#666666"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="10" r="2.5" stroke="#666666" strokeWidth="1.25" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 3L17 17M8.25 8.58C7.92 8.96 7.75 9.47 7.75 10C7.75 11.24 8.76 12.25 10 12.25C10.53 12.25 11.04 12.08 11.42 11.75M14.7 14.12C13.55 14.92 12.17 15.42 10.75 15.58M6.12 6.27C4.58 7.28 3.35 8.75 2.5 10C3.75 13.75 6.75 16.25 10 16.25C11.28 16.25 12.47 15.86 13.5 15.2M10 6.75C12.9 6.75 15.25 9.1 15.25 12"
        stroke="#666666"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
