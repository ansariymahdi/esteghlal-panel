

import React from 'react';
import Button from './Button'





export const ButtonComponent = () => <Button />

export default {
    title: 'Button',
    component: ButtonComponent,
    decorators: [(Story) => <div style={{ margin: '3em' }}><Story /></div>]
}