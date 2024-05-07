
import { CreateButton, FilterDropdown, List} from'@refinedev/antd'
import {getDefaultFilter, useGo} from'@refinedev/core'
import {Input, Space, Table} from 'antd'
import { useTable,EditButton,DeleteButton } from '@refinedev/antd'
import { COMPANIES_LIST_QUERY } from '@/graphql/queries'
import { SearchOutlined } from '@ant-design/icons'
import CustomAvatar from '@/components/custom-avatar'
import {Text} from '@/components/text'
import { Company } from '@/graphql/schema.types';
import  {currencyNumber}  from '@/utilities/currency-number';
import React from 'react'




export const CompanyList = ({children}: React.PropsWithChildren) => {
  const go = useGo(); // Used to navigate to a path

  const { tableProps, filters } = useTable({
    resource: 'companies',
    onSearch: (values) => {
      return [
        {
        field:'name',
        operator : 'contains',
        value : values.name
        }
       ]
    },
    pagination: {
      pageSize: 11
    },
    sorters: {
      initial:[
        {
        field:'createdAt',
        order:'desc'
        }
      ]
    },
    filters :{
      initial: [
        {
          field:'name',
          operator:'contains',
          value: undefined
        }
      ]
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    }
  });

  return (
    <div>
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() =>
            go({
              to: {
                resource: 'companies', // Navigate to the create page  
                action: 'create'
              },
              options: {
                keepQuery: true
              },
              type: 'replace' // Replaces the current entry on the history stack on the browser
            })
          }
        />
      )}
    >
      <Table
        {...tableProps}
        pagination={{ ...tableProps.pagination }}
      >
        <Table.Column
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter('id', filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Company" />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
              <Text style={{ whiteSpace: 'nowrap' }}>
                {record.name}
              </Text>
            </Space>
          )}
        />
          <Table.Column<Company>
            dataIndex={"totalRevenue"}
            title="Open deals amount"
            render={(_, company) => {
              return (
                <Text>
                  {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
                </Text>
              );
            }}
          />
          <Table.Column
            fixed="right"
            dataIndex="id"
            title="Actions"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />

                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
      </Table>
    </List>
    {children}
  </div>
  );
};