import React, {useContext, useEffect, useState} from "react";
import  './citySelector.scss';
import ReactDOM from 'react-dom';
import pinyin from 'tiny-pinyin';

interface Props {
    dataSource:string[];
    onChange:(city:string)=>void;
}

interface Context {
    cityMap:{[key:string]:string[]};
    onChange:(city:string)=>void;
}
const CitySelectorContext = React.createContext<Context>({cityMap:{},onChange:()=>{}})

const CitySelector:React.FC<Props> = (props) => {

    const [dialogVisible,setDialogVisible] = useState<boolean>(true)
    const onClick = ()=> {
        setDialogVisible(true)
    }
    const cityMap: Context["cityMap"] = {}

    props.dataSource.map((city)=>{
        const py = pinyin.convertToPinyin(city)
        const index = py[0]
        cityMap[index] = cityMap[index] || []
        cityMap[index].push(city)
    })

    console.log(cityMap);

    return (
        <CitySelectorContext.Provider value={{cityMap,onChange:props.onChange}}>
        <div onClick={onClick}>
            {props.children}
        </div>
            {dialogVisible&&<Dialog onClose={()=>setDialogVisible(false)}/>}
        </CitySelectorContext.Provider>
    )
}

const Dialog:React.FC<{onClose:()=>void}> = (props) => {
    const {cityMap,onChange} = useContext(CitySelectorContext)
    const indexList = Object.keys(cityMap).sort()
    const cityList = Object.entries(cityMap).sort((a,b)=>a[0].charCodeAt(0)-b[0].charCodeAt(0));
    return ReactDOM.createPortal(
        (<div
            className="myui-citySelector-dialog"

        >
            <header>
                <span className="icon" onClick={props.onClose}>&lt;</span>
                <span>选择城市</span>
            </header>
            <CurrentLocation onChange={onChange}/>
            <h2>全部城市</h2>
            <ol className="myui-citySelector-cityIndex">
                {indexList.map(item=>
                    item&&<li
                        key={item}
                        onClick={()=>{
                            document.querySelector(`[data-letter="${item}"]`)!.scrollIntoView()
                        }}
                    >
                    {item}
                    </li>)}
            </ol>
            <div>所有城市</div>
            <div className="cityList">
                {cityList.map(([letter,list])=>{
                    return (
                        <div key={letter} className="myui-citySelector-citySection">
                            <h4 data-letter={letter}>{letter}</h4>
                                {list.map(city=><div
                                    key={city}
                                    className="myui-citySelector-cityName"
                                    onClick={()=>{
                                        onChange(city)
                                        props.onClose()
                                    }}
                                >
                                    {city}
                                </div>)}
                        </div>
                    )
                })}
            </div>
        </div>)
        ,document.body)
}

const CurrentLocation:React.FC<{onChange:Context['onChange']}> = (props) => {
    const [city,setCity] = useState('Loading...');
    useEffect(()=>{
        const xhr = new XMLHttpRequest()
        xhr.open('get','http://ip-api.com/json/?lang=zh-CN')
        xhr.onload = () => {
            const string = xhr.responseText
            const obj = JSON.parse(string)
            const city = obj.city
            props.onChange(city)
            setCity(city)
        }
        xhr.onerror = () => {
            props.onChange('未知')
            setCity('未知')
        }
        xhr.send()
    },[])
    return (
        <div className="currentCity">
            当前城市：{city}
        </div>
    )
}

export default  CitySelector