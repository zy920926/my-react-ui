# 移动端可回弹的水平滚动条
这是一个可以装任意宽度的元素的水平滚动条，并能像原生app一样在滚动条滑动到边界时有拖拽并回弹效果。

使用演示
```jsx
import React from "react";
import HorizontalScroll from "./horizontalscroll.jsx"

const Item = ({id })=>{
    let style = {
            background:"#1d87b1",
            color:"#fff",
            width:"120px",
            height:"60px",
            margin:"10px",
            borderRadius:"6px",
            textAlign:"center",
            lineHeight:"60px"
        }
        
    return(
        <li style={style} >
            {id}
        </li>
    )
}

const List = ()=> {
    let data = [
        {id:"001"},
        {id:"002"},
        {id:"003"},
        {id:"004"},
        {id:"005"}
    ]
    return(
        <HorizontalScroll style={{background: "#fff"}}>
            {data.map( (v) => (
                <Item 
                    key={ v.id }
                    id={v.id}
                />
            ))}
        </HorizontalScroll>
    )
}
export default List;
```