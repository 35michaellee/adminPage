import React from "react";
import { CompanyList } from "./list";
import { Modal } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";
import {Form, Input,Select} from "antd";
import { useSelect } from "@refinedev/antd";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { SelectOptionAvatar } from "@/components/select-option-with-avatar";
import { UsersSelectQuery } from "@/graphql/types";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
export const Create = () => {
    const go = useGo();

    const goToListPage =() =>{
        go({
            to: {resource: 'companies', action: 'list'},
            options : {keepQuery: true},
            type: 'replace',
        })
    }
 const {formProps,modalProps} = useModalForm(
    {
    action: 'create',
    defaultVisible: true,
    resource: 'companies',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta:{
        gqlMutation: CREATE_COMPANY_MUTATION,
    }
})

const {selectProps,queryResult} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users',
    optionLabel: 'name',
    meta:{
        gqlQuery: USERS_SELECT_QUERY,
    }
})
console.log("queryResult: " + queryResult);
console.log(selectProps);
    return (    
           
            <CompanyList>
                <Modal
                {...modalProps}
                mask={true}
                onCancel={goToListPage}
                width={512}>
                 <Form {...formProps} layout='vertical'>
                <Form.Item
                    label='Company Name'
                    name='name'
                    rules={[{required: true, message: 'Company Name is required'}]}
                >
                    <Input placeholder="Please enter a Company Name" />
                </Form.Item>
                <Form.Item
                    label='Sales Owner'
                    name='salesOwnerId'
                    rules={[{required: true}]}
                >
                    <Select 
                        {...selectProps} 
                        placeholder="Please select a Sales Owner" 
                        options={
                            queryResult.data?.data?.map((user) => ({
                                value: user.id,
                                label: (
                                    <SelectOptionAvatar
                                        name={user.name}
                                        avatarUrl={user.avatarUrl ?? undefined}
                                    />
                                )
                            })) ?? []
    
                        }
                        
                    />
                </Form.Item>
                </Form>
                </Modal>
            </CompanyList>
        )

}