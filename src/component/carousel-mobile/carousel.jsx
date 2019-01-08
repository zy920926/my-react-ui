import React,{Component} from "react"
import style from "./carousel.module.css"
class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            x:0,//滑动时，实时的x
            transition:"0s",
        }
        this.itemNum = this.props.children.length;//item个数
        this.timer = null;


        this.touchStart = this.touchStart.bind(this); 
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }
    touchStart(e){

    }

    touchMove(e){

    }

    touchEnd(e){

    }

    toRight(){
        console.log("right")
    }

    toLeft(){

    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            this.toRight()
        },2000)
    }


    render(){
        return(
            <div className={style.out} >
                <div className={style.conainer}>
                    <ul 
                        style={{width:`${this.itemNum*100}%`,transform:`translateX(${this.state.x}px)`,transitionDuration: this.state.transition}} 
                        onTouchStart={this.touchStart}
                        onTouchEnd={this.touchEnd}
                        onTouchMove={this.touchMove}
                        
                    >
                        {this.props.children.map((item,i)=>(
                            <li key={i} style={{width:`${1/this.itemNum*100}%`}}>{item}</li>
                        ))}

                    </ul>
                </div>
            </div>
        )
    }
}



const Item = (props) =>{
    return props.children
}

const Carousel = {
    Container,
    Item
}

export default Carousel;
