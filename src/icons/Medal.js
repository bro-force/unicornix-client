import React from "react"

import Gold from './Gold'
import Silver from './Silver'
import Bronze from './Bronze'

const Medal = ({
  position,
  ...props
}) => {
  switch (position) {
    case 1:
      return <Gold {...props} />
    case 2:
      return <Silver {...props} />
    case 3:
      return <Bronze {...props} />
    default:
      return position
  }
}

export default Medal
