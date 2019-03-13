import React,{Component} from 'react';
import style from  "./h_scroll.module.css"
class HorizontalScroll extends Component {
    constructor(){
        super();
        this.state = {
            x:0,
            duration:"0s"
        }
        this.container = null;//容器，ref引用
        this.content = null;//内容，ref引用
        this.startX = null;//滑到边界，记录当前手指x坐标为起始位置
        this.touchStart = this.touchStart.bind(this)
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this)
    }

    isArrivedRight(){
        const containerWidth = this.container.getBoundingClientRect().width;
        const contentWidth = this.content.getBoundingClientRect().width;
        const d = this.container.scrollLeft + containerWidth - contentWidth;
        return Math.abs(d)< 0.5;// 靠近右边0.5内就算到达
    }

    isArrivedLeft(){
        return this.container.scrollLeft === 0
    }

    touchStart(){
        this.setState({duration:"0s"})//清除css变换过渡，防止拖动到边界出错
        //不能设置为0，否则setState并不会引起更新，估计是与react更新时对新的state判断造成的。所以我们设置成“0s”
    }

    touchMove(e){
        if( !this.isArrivedLeft() && !this.isArrivedRight()){
            return;// 滚动条未滑到两边，不作任何处理
        }

        // 下面是滚动到了两边的逻辑（开始位移container），
        if(!this.startX){
            // touchMove第一次触发时记录当前touch的x为起始位置
            this.startX = e.touches[0].clientX;
            return;
        }

        // 下面是第二次touchMove第二次及以后的逻辑
        
        let offset = e.touches[0].clientX - this.startX;// 计算手指滑动的位置

        if(this.isArrivedLeft() && offset < 0){
            // 滑倒最左时,接下来往右滑动不松开再往左滑动至起始位置左侧时
            offset = 0;
        }

        if( this.isArrivedRight() && offset > 0){
            offset = 0
        }
        
        this.setState({x:offset*0.1});// 滚动条尽头，移动滚动条容器，限制距离为手指滑动的0.2倍
    }

    touchEnd(){
        this.startX = null;//清除起始位置，以防下次touchMove出错
        this.setState({//滚动条容器位置回弹，回弹过渡为0.4s。
            x:0,
            duration:"0.2s"
        })
    }

    render(){
        return(
            <div    
                className={style.out} 
                style={{background:this.props.style.background}}
            >
                <div 
                    className={style.container} 
                    ref={(node)=>{this.container = node}}
                    onTouchStart={this.touchStart}
                    onTouchMove={this.touchMove}
                    onTouchEnd={this.touchEnd}
                    style={{transform: `translateX(${this.state.x}px)`,transitionDuration:this.state.duration}}
                >
                    <ul ref={(node)=>{this.content = node}} >
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }
}

export default HorizontalScroll;