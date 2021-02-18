import React from "react";
import Loader from "react-loader-spinner";

export default function LoadingIndicator({
  type = "Puff",
  height = 80,
  width = 80,
}) {
  return (
    <Loader
      type={type}
      color="#00BFFF"
      height={height}
      width={width}
      timeout={10000}
    />
  );
}
