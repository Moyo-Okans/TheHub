import React from 'react'
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';

function NoNotification() {
  return (
    <div className='newGroupContainer'>
      <NotificationsOffOutlinedIcon
      sx={{
        fontSize: '150px',
        color: '#262626',
      }}
      />
      No Notifications for now
    </div>
  )
}

export default NoNotification