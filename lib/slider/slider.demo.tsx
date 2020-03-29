import Demo from "../../deom";
import SliderExample from "./slider.example";
import React from "react";
import SliderExample2 from "./slider.example2";

console.log(require('!!raw-loader!./slider.example.tsx'));

const SliderDemo = () => {
    return (
        <>
        <h1>Slider轮播</h1>
        <Demo code={require('!!raw-loader!./slider.example.tsx').default} >
           <SliderExample/>
        </Demo>
        <Demo code={require('!!raw-loader!./slider.example2.tsx').default}>
            <SliderExample2/>
        </Demo>
        </>
    )
}

export default SliderDemo
