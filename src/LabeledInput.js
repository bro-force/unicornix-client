import React from 'react'

import './styles/labeled-input.css'

const LabeledInput = ({
  value,
  onChange,
  ...props
}) => (
  <div
    className="c-labeled-input"
  >
    <label className="c-labeled-input__label">
      Nickname
    </label>
    <input
      type="text"
      className="c-labeled-input__input"
      onBlur={onChange}
      defaultValue={value}
    />
  </div>
)

export default LabeledInput
