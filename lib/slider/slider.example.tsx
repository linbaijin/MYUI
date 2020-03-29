import React from "react";
import Slider from "./slider";
import './slider.demo.scss'

export const SliderExample1 = () => {
    return (
        <div style={{width: 500,marginBottom:10}}>
            <h2>基本使用</h2>
            <Slider>
                <div className="slider-demo">1</div>
                <div className="slider-demo">2</div>
                <div className="slider-demo">3</div>
                <div className="slider-demo">4</div>
            </Slider>
        </div>

    )
}



export default SliderExample1

