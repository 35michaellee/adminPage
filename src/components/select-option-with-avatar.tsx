import React from 'react';
import CustomAvatar from './custom-avatar';
import { Text } from './text';

export type Props = {
    avatarUrl?: string;
    name: string;
    shape?: 'circle' | 'square';
};

export const SelectOptionAvatar: React.FC<Props> = ({ avatarUrl, name, shape }: Props) => {
    return (
        <div
        style={

            {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
            }
        
        }>
            <CustomAvatar shape ={shape} name={name} src={avatarUrl} />
            <Text>{name}</Text>
          
        </div>
    );
};

