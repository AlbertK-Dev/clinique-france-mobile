import React from "react";
import {
  Skeleton
} from "native-base";

export const Skelette = ({ last }) => {
  return (
    <Skeleton
      style={{
        height: last ? 100 : 180,
        width: "100%",
        padding: 5,
        marginTop: 0,
        borderRadius: 30,
        alignItems: "center",
        // backgroundColor:'white'
      }}
    />);
};
