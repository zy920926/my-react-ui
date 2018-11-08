import React,{Component} from "react"
import style from "./carousel.module.css"
class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            x:0,//滑动时，实时的x
            transition:"0s",
        }

        this.container = null;//轮播图容器（ref）
        this.content = null;//轮播图列表（ref）

        this.itemNum = this.props.children.length;//item个数
        this.lastX = 0;//每次更新轮播图时记录上一次的x
        this.startX = 0;//touch起始x
        this.offset = 0;//单次滑动的距离,有正负
        this.startTime = 0;//touch起始时间
        this.endTime = 0;//touch结束时间
        this.threshold = 0;//允许轮播图改变的阈值

        this.touchStart = this.touchStart.bind(this); 
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }
    touchStart(e){
        this.slideSidesReset();
        this.offset = 0;//清除上次滑动的offset
        this.startTime = e.timeStamp;
        this.startX = e.touches[0].clientX;
        this.setState({transition:"0s"});
    }

    touchMove(e){
        let offsetIncrement = e.touches[0].clientX - this.startX - this.offset;
        this.offset += offsetIncrement;//记录总共的offset
        this.setState((prevState)=>({
            x: prevState.x + offsetIncrement
        }))
    }

    touchEnd(e){
        this.endTime = e.timeStamp;
        if(this.endTime - this.startTime <= 200 ){
            //快速滑动时,较小阈值允许滑动
            this.threshold = 0.1;
        }else{
            //慢速滑动时,达到较大阈值才允许滑动
            this.threshold = 0.3;
        }
        this.updateCarousel();//根据touch的3个事件获取的数据来更新轮播图
    }

    updateCarousel(){
        let carouselW = this.container.offsetWidth;
        let nextX = 0;
        let index = 0;
        if(Math.abs(this.offset)/carouselW >= this.threshold){
            //滑动大于阈值，则进入下一个
            if(this.offset > 0){
                //right
                nextX = this.lastX + carouselW;
            }
            if(this.offset < 0){
                //left
                nextX = this.lastX - carouselW;
            }
        }else{
            //滑动小于阈值，返回上一个
            nextX = this.lastX;
        }

        this.setState({
            x:nextX,
            transition:"0.2s",
        })
    }

    slideSidesReset(){
        //在touchStart调用，
        //记录上一次的x值，
        //如果已经在轮播图两侧就重新设置轮播图的位置，并设置lastX为相应值
        let carouselW = this.container.offsetWidth;
        if(this.state.x === carouselW){
            this.lastX = -(this.itemNum-1)*carouselW;
            this.setState({
                x:-(this.itemNum-1)*carouselW,
            })
        } else if(this.state.x === -this.itemNum*carouselW){
            this.lastX = 0;
            this.setState({
                x:0,
            })
        } else {
            this.lastX = this.state.x;//记录上一次x
        }
    }

    render(){
        return(
            <div className={style.out} style={{height:this.props.style.height,width:this.props.style.width}}>
                <div className={style.conainer} ref={(node)=>{this.container = node}}>
                    <ul 
                        style={{width:`${this.itemNum*100}%`,transform:`translateX(${this.state.x}px)`,transitionDuration: this.state.transition}} 
                        ref={(node)=>{this.content = node}}
                        onTouchStart={this.touchStart}
                        onTouchEnd={this.touchEnd}
                        onTouchMove={this.touchMove}
                        
                    >
                        <li style={{width:`${1/this.itemNum*100}%`,marginLeft:`-${1/this.itemNum*100}%`}}>{this.props.children[this.itemNum - 1]}</li>
                        {/* 增加最后一个item放在最前面*/}
                        {this.props.children.map((item,i)=>(
                            <li key={i} style={{width:`${1/this.itemNum*100}%`}}>{item}</li>
                        ))}
                        <li style={{width:`${1/this.itemNum*100}%`,marginRight:`-${1/this.itemNum*100}%`}}>{this.props.children[0]}</li>
                        {/* 增加第一个item放在最后面*/}
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
