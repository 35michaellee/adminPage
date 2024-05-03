import React from 'react'
import {Create, CreateButton, List} from'@refinedev/antd'
import {useGo} from'@refinedev/antd'
import {Table} from 'antd'
export const CompanyList = () => {

  const go =useGo(); //used to navigate to a path 
  return (
    
    <List
      breadcrumb ={false}
      headerButtons={()=>(
        <CreateButton
        onCLick ={()=>
            go({
              to: {
                resource : 'companies', //navigate to the create page  
                action: 'create'
              },
              options:{
                keepQuery :true
              },
              type: 'replace' //replaces the current entry on the history stack on the browser
            })
          }
         />
      )}
      >
         <Table>
     </Table>
      </List>
  )
}

