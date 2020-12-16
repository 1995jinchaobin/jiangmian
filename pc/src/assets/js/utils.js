// utils/utils.js
let loading=false;
/***
 * 滑动事件
 * @param callback 触底回掉函数
 */
const scrollBottom =(callback)=>{
    let t=document.documentElement.scrollTop;
    let h=document.documentElement.clientHeight;
    let v=document.body.scrollHeight;
    if(t+h>=v-50&&!loading){ // -50 即是距离底部50px开始执行 回掉函数 可根据需要自己设置
        loading=true;
        callback().then(()=>{
            //当前页加载完毕
            loading=false;
        }).catch(()=>{
            //没有更多数据了..
            loading=true;
        })
    }
}
/**
 * 监听滚动事件
 * @param callback loading函数
 */
const registerAddEventListener=(callback)=>{
    window.addEventListener("scroll", scrollBottom.bind(this, callback), false);
}
/**
* 移除监听
*/
const removeEventListener=()=>{
    window.removeEventListener('scroll', scrollBottom,false);
}
//导出
export {registerAddEventListener,removeEventListener};