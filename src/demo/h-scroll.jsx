import React from 'react';
import HorizontalScroll from "../component/horizontal-scroll/horizontalscroll.jsx";


const Item = ({id })=>{
    return(
        <li style={{
            background:"#1d87b1",
            color:"#fff",
            width:"120px",
            height:"60px",
            margin:"10px",
            borderRadius:"6px",
            textAlign:"center",
            lineHeight:"60px"
        }} >
            {id}
        </li>
    )
}

const HScroll = ()=> {
    let data = [
        {id:"001"},
        {id:"002"},
        {id:"003"},
        {id:"004"},
        {id:"005"}
    ]
    return(
        <div >
            <h2 style={{textAlign:"center"}}>水平滚动条</h2>
            <h3 style={{textAlign:"center"}}>请在小屏幕下左右拖动小方块</h3>
            <HorizontalScroll style={{background: "#fff"}}>
                {data.map( (v) => (
                    <Item 
                        key={ v.id }
                        id={v.id}
                    />
                ))}
            </HorizontalScroll>
        </div>
        
    )
}

export default HScroll;
