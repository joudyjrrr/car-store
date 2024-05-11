const SettingsIcons = ({ ...props }) => {
  return (
    <svg
      width={18}
      {...props}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width={18} height={18} fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_1380_32730" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_1380_32730"
          width={100}
          height={100}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

const Logo = ({ ...props }) => {
  return (
    <svg
      width={101}
      {...props}
      height={100}
      viewBox="0 0 101 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect x="0.5" width={100} height={100} fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_771_43663" transform="scale(0.000244141)" />
        </pattern>
        <image
          id="image0_771_43663"
          width={4096}
          height={4096}
        />
      </defs>
    </svg>
  );
};

const BottomShapeLogin = ({ ...props }) => {
  return (
    <svg
      width={180}
      height={171}
      {...props}
      viewBox="0 0 180 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={1}
        y={1}
        width={178}
        height="168.667"
        rx={19}
        stroke="#7367F0"
        strokeOpacity="0.16"
        strokeWidth={2}
        strokeDasharray="8 8"
      />
      <rect
        x="22.5"
        y="21.3334"
        width={135}
        height={128}
        rx={10}
        fill="#7367F0"
        fillOpacity="0.08"
      />
    </svg>
  );
};
const TopShapeLogin = ({ ...props }) => {
  return (
    <svg
      {...props}
      width={238}
      height={222}
      viewBox="0 0 238 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="87.9395"
        y="0.5"
        width={149}
        height="141.222"
        rx="19.5"
        stroke="#7367F0"
        strokeOpacity="0.16"
      />
      <rect
        y="31.8207"
        width={200}
        height="189.63"
        rx={10}
        fill="#7367F0"
        fillOpacity="0.08"
      />
    </svg>
  );
};
export { Logo, BottomShapeLogin, TopShapeLogin, SettingsIcons };