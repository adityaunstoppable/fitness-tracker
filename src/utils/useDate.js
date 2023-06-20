import React from 'react'
import { convertEpochToFormattedDate } from './constants'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const useDate = ({type}) => {
  
  let date = useSelector(state => state.date.selectedDate)
  let parts = date?.split("-")
  date  = `${parts[1]}-${parts[0]}-${parts[2]}`    
  return (
    <div style={{marginTop:"20px", marginLeft:"12px" }}>
        <Typography variant="h6" color="primary">{`Track ${type} -> ${date}`}</Typography>
    </div>
  )
}

export default useDate