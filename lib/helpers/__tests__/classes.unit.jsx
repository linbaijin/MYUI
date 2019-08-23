import classes from '../classnames'

describe('classes',()=>{
    it('接收1个className',()=>{
        const result = classes('aaa')
        expect(result).toEqual('aaa')
    })
    it('接收2个className',()=>{
        const result = classes('a','b')
        expect(result).toEqual('a b')
    })
    it('接收undefinde',()=>{
        const result = classes('a',undefined)
        expect(result).toEqual('a')
    })
    it('接收各种奇怪的值',()=>{
        const result = classes('a',undefined,null,false)
        expect(result).toEqual('a')
    })
    it('接受0个className',()=>{
        const result = classes()
        expect(result).toEqual('')
    })
})