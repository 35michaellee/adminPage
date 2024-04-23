import React, { useState } from 'react'
import { Badge, Card, List } from 'antd' 
import { CalendarOutlined } from '@ant-design/icons'
import { Text } from '../text'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'
import { useList } from '@refinedev/core'
import { DASHBOARD_CALENDER_UPCOMING_EVENTS_QUERY } from '@/graphql/queries'
import { getDate } from '@/utilities/helpers'
import dayjs from 'dayjs'



export const UpcomingEvents = () => {
  

  const {data,isLoading} = useList({  //useList is a hook that fetches data from the backend
    resource:"events", //name of the resource we wanna fetch
    pagination:{pageSize:5}, //pagination options
    sorters:[{field:"startDate",order:"asc"}], //sorting options
    filters:[{field:"startDate",operator:"gte",value:dayjs().format('YYYY-MM-DD')}], //filter options
    meta:{
      gqlQuery:DASHBOARD_CALENDER_UPCOMING_EVENTS_QUERY
    }
})
  
  return (
    
    <Card 
      style={{height:"100%"}} 
      headStyle={{padding:"8px 16px"}} 
      bodyStyle={{padding:"0 1rem"}}
      title={
        <div style={{
          display:"flex",
          alignItems:"center",
          gap:"8px"}}>
       <CalendarOutlined/>
       <Text size="sm" style={{marginLeft:"0.7rem"}}>
          Upcoming events
       </Text>
        </div>
      }
      >
        {isLoading ? (
          <List
          itemLayout='horizontal'
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
            // Add any other properties you need for each item
          }))}
          renderItem={() => <UpcomingEventsSkeleton/>}
           >
    
          </List>
          ):(
            <List
            itemLayout='horizontal'
            dataSource={data?.data ||[]}
            renderItem={(item) => {
              const renderDate =getDate(item.startDate, item.endDate)
              return(
              <List.Item>
                <List.Item.Meta
                avatar ={<Badge color ={item.color}/>}
                title={<Text size="sm">{renderDate}</Text>}
                description={<Text ellipsis={{tooltip:true}} strong size="sm">{item.title}</Text>}
                />
              </List.Item>
              )
            }}
            />
          )}
         {!isLoading && data?.data?.length === 0 && (
  <span style={{ display: "flex", justifyContent: "center", height: "220px" }}>
    No upcoming events
  </span>
)}
      </Card>
  )
}
