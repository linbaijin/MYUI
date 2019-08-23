import render from 'react-test-renderer'
import React from 'react'
import Icon from '../icon'
import {mount} from 'enzyme'


describe('Icon',()=>{
    it('xxx',()=>{
        const json = render.create(<Icon name="alipay"/>).toJSON()
        expect(json).toMatchSnapshot()
    })
    it('onClick',()=>{
        const fn = jest.fn()
        const fn2 = jest.fn()
        const component = mount(<Icon name="alipay" onClick={fn2}/>)
        component.find('svg').simulate('click')
        expect(fn2).toBeCalled()
    })
})