type Props = {
  width: string;
  className?: string;
};

export const HeartIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M64 288L39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8L256 96l24.2-24.2c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 256 480 64 288z"
    />
  </svg>
);

export const SwordIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M400 16L166.6 249.4l96 96L496 112 512 0 400 16zM0 416l96 96 32-32-16-32 56-56 88 56 32-32L96 224 64 256l56 88L64 400 32 384 0 416z"
    />
  </svg>
);

export const ShieldIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M256 5.7l11.5 4.4L475 90.2l19.2 7.4 1.2 20.6c2.9 49.7-4.9 125.6-37.3 199.8C425.4 392.8 367 467.1 268.6 509.4L256 514.8l-12.6-5.4C145 467.1 86.6 392.8 53.9 318C21.4 243.7 13.6 167.8 16.6 118.1l1.2-20.6L37 90.2l207.5-80L256 5.7zM80 142.2c.3 23.4 3.2 51.7 10.1 81.8H256V74.3L80 142.2zM256 444.8c72.9-35.3 117.3-92.6 143.5-152.5c10-23 17.3-46.1 22.4-68.3H256V444.8z"
    />
  </svg>
);

export const WarningIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M256 32L0 480H512L256 32zm24 160v24V328v24H232V328 216 192h48zM232 384h48v48H232V384z"
    />
  </svg>
);

export const PlayerAttackIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M448 256L256 64l-32 0 0 128L0 192 0 320l224 0 0 128 32 0L448 256z"
    />
  </svg>
);

export const EnemyAttackIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l160-160c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 96 184 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-184 0 0 96c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-160-160z"
    />
  </svg>
);

export const PlayIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
    />
  </svg>
);

export const ForwardIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"
    />
  </svg>
);

export const FastForwardIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M18.4 445c11.2 5.3 24.5 3.6 34.1-4.4L224 297.7V416c0 12.4 7.2 23.7 18.4 29s24.5 3.6 34.1-4.4L448 297.7V416c0 17.7 14.3 32 32 32s32-14.3 32-32V96c0-17.7-14.3-32-32-32s-32 14.3-32 32V214.3L276.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S224 83.6 224 96V214.3L52.5 71.4c-9.5-7.9-22.8-9.7-34.1-4.4S0 83.6 0 96V416c0 12.4 7.2 23.7 18.4 29z"
    />
  </svg>
);

export const SpinnerIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M256 64c106 0 192 86 192 192h64C512 114.6 397.4 0 256 0V64zM448 256c0 35-9.4 67.8-25.7 96L477.7 384c21.8-37.7 34.3-81.5 34.3-128H448z"
    />
  </svg>
);

export const BattleIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M96 329.4l50.7-50.7 86.6 86.6L182.6 416l20.7 20.7c6.2 6.2 6.2 16.4 0 22.6l-16 16c-4.7 4.7-11.8 6-17.8 3.3l-62-27.5L51.3 507.3c-6.2 6.2-16.4 6.2-22.6 0l-24-24c-6.2-6.2-6.2-16.4 0-22.6l56.2-56.2-27.5-62c-2.7-6.1-1.4-13.1 3.3-17.8l16-16c6.2-6.2 16.4-6.2 22.6 0L96 329.4zM484.5 114.2L365.3 233.4l-86.6-86.6L397.8 27.5c6.7-6.7 15.2-11.3 24.5-13.1L492.9 .3c5.2-1 10.7 .6 14.5 4.4s5.4 9.2 4.4 14.5L497.6 89.6c-1.9 9.3-6.4 17.8-13.1 24.5zM4.7 4.7C8.5 .9 13.9-.7 19.1 .3L89.6 14.4c9.3 1.9 17.8 6.4 24.5 13.1L393.4 306.7l-86.6 86.6L27.5 114.2c-6.7-6.7-11.3-15.2-13.1-24.5L.3 19.1C-.7 13.9 .9 8.5 4.7 4.7zm454.6 304l16 16c4.7 4.7 6 11.8 3.3 17.8l-27.5 62 56.2 56.2c6.2 6.2 6.2 16.4 0 22.6l-24 24c-6.2 6.2-16.4 6.2-22.6 0l-56.2-56.2-62 27.5c-6.1 2.7-13.1 1.4-17.8-3.3l-16-16c-6.2-6.2-6.2-16.4 0-22.6l128-128c6.2-6.2 16.4-6.2 22.6 0z"
    />
  </svg>
);

export const UpArrowIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M192 32L0 224v32H128V480H256V256H384V224L192 32z"
    />
  </svg>
);

export const DownArrowIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M214.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l96 0 0-184c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 184 96 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-160 160z"
    />
  </svg>
);
