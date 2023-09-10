
import React from 'react'
import {Button as MUIButton} from '@mui/material'

export const Button = ({onClick,children,...rest}) => {
  return (
    <MUIButton onClick={onClick}>{children}</MUIButton>
  )
}
