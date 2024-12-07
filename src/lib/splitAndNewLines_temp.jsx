import React from "react";

const SplitAndNewLines = (text) => {
  return text.split("\n").map((line, index) => {
    return (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    );
  });
};

export default SplitAndNewLines