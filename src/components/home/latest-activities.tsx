import React from 'react'
import {Card, List} from 'antd'
import { UnderlineOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Text } from '../text'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'
import { useList } from '@refinedev/core'
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY } from '@/graphql/queries'
const DashBoardLatestActivities = () => {
    const isLoading = false
    const { data: audit, isLoading: isLoadingAudit, isError, error } = useList({
        resource: "audits",
        meta: {
            query: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
        }
    });
   console.log("audit:",audit)

  return (
    
    <Card 
    headStyle={{padding:'16px'}}
    bodyStyle={{padding:'16px'}}
    title={(
        <div style={{
            display:'flex',alignItems:'center',gap:'8px'}}>
                <UnorderedListOutlined/>    
                <Text size="sm" 
                        style={{marginLeft:'0.5rem'}}>
                Latest Activities
                </Text>
                    
        </div>
  )}>  
    {isLoading ? (
        <List
        itemLayout='horizontal'
        dataSource={Array.from({
            length: 5
        }).map((_, index) => ({
            id: index,
        }))}
        renderItem={
            (_,index) => (
                <LatestActivitiesSkeleton key={index}/>
            )
        }
        
        />

        
    ) : (
        <List>
            
        </List>  
    )}

    </Card>
  )
}

export default DashBoardLatestActivities