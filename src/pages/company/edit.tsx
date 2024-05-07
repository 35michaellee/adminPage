import CustomAvatar from '@/components/custom-avatar';
import { SelectOptionAvatar } from '@/components/select-option-with-avatar';
import { companySizeOptions, industryOptions,businessTypeOptions,countryOptions, } from '@/constants';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { UsersSelectQuery } from '@/graphql/types';
import { getNameInitials } from '@/utilities';
import { Edit } from '@refinedev/antd';
import { useForm } from '@refinedev/antd';
import { useSelect } from '@refinedev/antd';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Avatar, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React from 'react';

export const EditPage = () => {
    const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
        redirect: false,
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION
        }
    });

    const { avatarUrl, name } = queryResult?.data?.data || {};
    const {selectProps,queryResult:queryResultUsers} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        pagination: {
            mode: 'off',
        },
        meta:{
            gqlQuery: USERS_SELECT_QUERY,
        }
    })

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col xs={24} xl={12}>
                    <Edit 
                        isLoading={formLoading} 
                        saveButtonProps={saveButtonProps} 
                        breadcrumb={false}>
                        <Form {...formProps} layout="vertical">
                            <CustomAvatar 
                                shape="square" 
                                src={avatarUrl} 
                                name={getNameInitials(name || '')}
                                style={{ width: 96, height: 96, marginBottom: '24px' }}
                            />
                            <Form.Item
                                label='Sales Owner'
                                name='salesOwnerId'
                                initialValue={formProps?.initialValues?.salesOwnerId?.id}
                            >
                                <Select 
                                    {...selectProps} 
                                    placeholder="Please select a Sales Owner" 
                                    options={(queryResultUsers?.data?.data || []).map((user) => ({
                                        value: user.id,
                                        label: (
                                            <SelectOptionAvatar
                                                name={user.name}
                                                avatarUrl={user.avatarUrl ?? undefined}
                                            />
                                        )
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    options={
                                        companySizeOptions
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <InputNumber autoFocus addonBefore="$" 
                                 min={0}
                                 placeholder='0.00'/>
                            </Form.Item>
                            <Form.Item  label="industry">
                                <Select
                                    options={
                                        industryOptions 
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="business type">
                                <Select
                                    options={
                                     businessTypeOptions
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Country" name="country">
                                <Input placeholder="Country" />
                            </Form.Item>
                            <Form.Item label="Website">
                                <Input placeholder="Website" name="website" />
                            </Form.Item>
                        </Form>  
                    </Edit>
                </Col>
            </Row>
        </div>
    );
};