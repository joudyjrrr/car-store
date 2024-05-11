import React, { FC } from "react";

const Status: FC<{
  variant: string;
}> = ({ variant }) => {
  return (
    <span
      className={`text-sm rounded-xl px-6 py-2   text-white ${
        variant === "Completed"
          ? "bg-[#00B69B]/60 ]"
          : variant === "Processing"
          ? "bg-[#6226EF]/60 "
          : variant === "Rejected"
          ? "bg-[#EF3826]/60 "
          : variant === "On Hold"
          ? "bg-[#FFA756]/60 "
          : variant === "In Transit" && "bg-[#BA29FF]/60"
      }`}
    >
      {variant}
    </span>
  );
};

export default Status;
