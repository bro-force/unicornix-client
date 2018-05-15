import React from "react"

const Star = ({
  success,
  ...props
}) => (
  <svg viewBox="0 0 501.28 501.28" width="1em" height="1em" {...props}>
    <path
      fill={success ? "#ffcd00" : "#8a1d9c"}
      d="M501.28 194.37l-166.02-35.04-84.62-147.06v407.5l154.9 69.24-17.98-168.72z"
    />
    <path
      fill={success ? "#ffda44" : "#8a1d9c"}
      d="M166.02 159.33L0 194.37l113.72 125.92-17.98 168.72 154.9-69.24V12.27z"
    />
  </svg>
)

Star.defaultProps = {
  success: true
}

export default Star

