import React from 'react'
import Layout from './layout'
import Header from './header'
import Content from './content'
// import Aside from './aside'
import Footer from './footer'
import Aside from './aside'
import './layout.example.scss'

export default function () {
    return (
        <div>
            <h1>example 1</h1>
            <Layout className="hi" style={{height:500}}>
                <Header className="example-header">header</Header>
                <Content className="example-content">content</Content>
                <Footer className="example-footer">footer</Footer>
            </Layout>

            <h1>example 2</h1>
            <Layout className="hi" style={{height:500}}>
            <Header className="example-header">header</Header>
                <Layout>
                    <Aside className="example-aside">aside</Aside>
                    <Content className="example-content">content</Content>
                </Layout>
                
                <Footer className="example-footer">footer</Footer>
            </Layout>

            <h1>example 3</h1>
            <Layout className="hi" style={{height:500}}>
                <Header className="example-header">header</Header>
                <Layout>
                    <Content className="example-content">content</Content>
                    <Aside className="example-aside">aside</Aside>
                </Layout>
                
                <Footer className="example-footer">footer</Footer>
            </Layout>

            <h1>example 4</h1>
            <Layout className="hi" style={{height:500}}>
                <Aside className="example-aside">aside</Aside>
                <Layout>
                    <Header className="example-header">header</Header>
                    <Content className="example-content">content</Content>
                    <Footer className="example-footer">footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
}