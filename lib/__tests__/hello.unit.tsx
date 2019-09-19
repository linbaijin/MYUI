import render from 'react-test-renderer'
import React from 'react'
import Button from '../button/button'

// function add (a:number,b:number):number{
//     return a + b
// }

describe('button',()=>{
    it('is a div?',()=>{
        const json = render.create(<Button/>).toJSON()
        expect(json).toMatchSnapshot()
    })
})