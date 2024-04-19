import React, { useState } from 'react'
import { Badge, Card, List } from 'antd' 
import { CalendarOutlined } from '@ant-design/icons'
import { Text } from '../text'
import UpcomingEventsSkeleton from '../skeleton/upcoming-events'


export const UpcomingEvents = () => {
  const [isLoading,setIsLoading]=useState(false)
  return (
    <Card 
      style={{hight:"100%"}} 
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
            dataSource={[]}
            renderItem={(item) => {
              const renderDate =getDate(item.startDate, item.endDate)
              return(
              <List.Item>
                <List.Item.Meta
                avatar ={<Badge color ={item.color}/>}
                title={<Text size="sm">renderDate</Text>}
                description={<Text ellipsis={{tooltip:true}} strong size="sm">{item.title}</Text>}
                />
              </List.Item>
              )
            }}
            >
       
            </List>
          )}
      </Card>
  )
}
