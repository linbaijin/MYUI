import React from "react";
import Slider from "./slider";
import './slider.demo.scss'

const SliderExample = () => {
    return <div style={{width: 500, border: '1px solid red'}}>
        <Slider>
            <div className="slider-demo">1</div>
            <div className="slider-demo">2</div>
            <div className="slider-demo">3</div>
        </Slider>
    </div>
}

export default SliderExample
