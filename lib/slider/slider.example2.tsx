import Slider from "./slider";
import React from "react";

export const SliderExample2 = () => {
    return (
        <div style={{width: 500,marginBottom:10}}>
            <h2>自动播放</h2>
            <Slider duration={2}>
                <div className="slider-demo">1</div>
                <div className="slider-demo">2</div>
                <div className="slider-demo">3</div>
                <div className="slider-demo">4</div>
            </Slider>
        </div>
    )
}

export default SliderExample2
