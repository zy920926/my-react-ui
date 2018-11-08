import React from "react"
import Carousel from "../component/carousel-mobile/carousel.jsx"
const Mycarousel = ()=> {
    return(
        <Carousel.Container style={{width:"100%",height:"200px"}}>
            <Carousel.Item>
                <a href=".." style={{background:"#7ddbff",color:"#fff"}}>1</a>
            </Carousel.Item>
            <Carousel.Item>
                <a href=".." style={{background:"#7ddbff",color:"#fff"}}>2</a>
            </Carousel.Item>
            <Carousel.Item>
                <a href=".." style={{background:"#7ddbff",color:"#fff"}}>3</a>
            </Carousel.Item>
        </Carousel.Container>
    )
}

export default Mycarousel;