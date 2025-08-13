export default function BusinessLogo({ height = 64 }: { height: number }) {
  return (
    <div className="flex items-center justify-center size-50 bg-background rounded-b-full rounded-tl-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.2"
        viewBox="0 0 463 193"
        height={height}
      >
        <title>WLL</title>
        <g id="Layer 1">
          <path fill="var(--primary)" d="m208.9 30l-54.7 122-31.2-122z" />
          <path fill="var(--primary)" d="m1 30.1l57.9-0.1 31.7 122h-58.7z" />
          <path fill="var(--primary)" d="m62 30.1l57.9-0.1 31.7 122h-58.7z" />
          <path
            fill="var(--primary)"
            d="m273.5 30l-13.2 122h-61.8l14.4-121.9z"
          />
          <path
            fill="var(--primary)"
            d="m332.2 92.2l-7.1 59.8h-62.4l6.4-59.8z"
          />
          <path
            fill="var(--primary)"
            d="m402.5 30l-13.2 122h-61.8l14.4-121.9z"
          />
          <path
            fill="var(--primary)"
            d="m461.2 92.2l-7.1 59.8h-62.4l6.5-59.8z"
          />
        </g>
      </svg>
    </div>
  );
}
