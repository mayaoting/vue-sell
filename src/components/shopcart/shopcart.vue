<template>
<div>
  <div class="shopcart" >
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="number" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price"> 
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}
        </div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          <!-- ￥{{minPrice}}元起送 -->
          {{payDesc}}
        </div>
      </div> 
    </div>
    <div class="ball-container">
        <transition-group tag="div" name="drop"
          v-on:before-enter="beforeEnter"
          v-on:enter="dropEnter"
          v-on:after-enter="afterEnter">
          <div class="ball" v-for="(ball,index) in balls" v-show="ball.show"     :key="index">
            <div class="inners inner-hook"></div>
          </div>
        </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow" >
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for=" (food,index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="hidelist"></div>
  </transition>
</div>
  
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../../components/cartcontrol/cartcontrol'

export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return [];
        }
    },
    deliveryPrice:{
      type:Number,
      default:0,
    },
    minPrice:{
      type:Number,
      default:0,
    }
  },
  data(){
    return{
      balls: [
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        }
      ], 
      dropBall:[],
      fold:true,
    }
  },
  components:{
    cartcontrol,
  },
  computed:{
    listShow(){
      if(!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if(show){
        this.$nextTick(() => {
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.listContent,{click:true});
          } else {
            this.scroll.refresh();
          }
        })
      }
      return show;
    },
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc(){
      if(this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if( this.totalPrice < this.minPrice){
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return '去结算';
      }
    },
    payClass(){
      if(this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    }
  },
  methods:{
    drop(el) {
      for(let i = 0; i < this.balls.length; i++){
        let ball = this.balls[i];
        if(!ball.show){
          ball.show = true;
          ball.el = el;
          this.dropBall.push(ball);
          return;
        }
      }
    },
    toggleList(){
      console.log('xiansh1')
      if(!this.totalCount){
        return;
      }
      this.fold = !this.fold;
    },
    empty(){
      console.log(this.selectFoods);
      this.selectFoods.forEach((food) => {
        food.count = 0;
      })
    },
    hidelist(){
      this.fold = true;
    },
    pay(){
      if(this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice}`);
    },
    beforeEnter(el,done) {
      let count = this.balls.length;
        while(count--) {
          let ball = this.balls[count];
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropEnter(el,done) {
        // 手动触发重绘
        /*eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitioned',done);
        })
      },
      afterEnter(el) {
        el.style.display = 'none';
        let ball = this.dropBall.shift();
        ball.show = false;
        ball.el = null;
      },
  },

}
</script>
<style lang="scss" scoped>
.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content{
    display: flex;
    background:#142d27;
    .content-left{
      flex: 1;
      font-size: 0;
      .logo-wrapper{
        display: inline-block;
        position: relative;
        top:-10px;
        margin: 0 12px;
        padding: 6px;
        width:56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #142d27;
        .logo{
          width:100%;
          height:100%;
          border-radius: 50%;
          background: #2b343c;
          &.highlight{
            background: rgb(0,160,220)
          }
          .icon-shopping_cart{
            font-size: 24px;
            color: #80858a;
            line-height: 44px;
          }
        }
        .number{
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        }
      }
      .price{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin-top: 12px;
        box-sizing: border-box;
        padding-right:12px;
        border-right: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 700;
        color:rgba(255,255,255,0.4);
      }
      .desc{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        color: rgba(255,255,255,0.4);
        font-size: 10px;
      }
    }
    .content-right{
      flex:0 0 105px;
      width: 105px;
      .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        color: rgba(255,255,255,0.4);
        font-weight: 700;
        &.not-enough{
          background: #2b333b;
        }
        &.enough{
          background: #00b43c;
          color: #fff;
        }
      }

    }
  }
  .ball-container{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        .inners{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background:rgb(0,160,220);
          transition:all 1s linear;
        }
        &.drop-enter-active{
          transition:all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        }
      }
    // }
    
  }
  .shopcart-list{
    position: absolute;
    top:0px;
    left: 0;
    z-index: -1;
    width: 100%;
    &.fold-transition{
      transform: translate3d(0,-100%,0);
    }
    &.fold-enter-active{
      transform: translate3d(0,-100%,0);
      transition: all 20s linear;
    }
    &.fold-leave{
      transform: translate3d(0,0,0);
      
    }
    .list-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .title{
        float: left;
        font-size: 14px;
        color:rgb(7,17,27);
      }
      .empty{
        float: right;
        font-size: 12px;
        color:rgb(0,160,220);
      }
    }
    .list-content{
      padding: 0 18px;
      max-height: 217px;
      overflow:hidden;
      background: #fff;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border: 1px solid rgba(7,17,27,0.1);
        .name{
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .price{
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          color: red;
          font-weight: 700;
        }
        .cartcontrol-wrapper{
          position: absolute;
          bottom: 6px;
          right: 0;
        }
      }

    }

  }
  

}
.list-mask{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(5px);
  &.fade-transition{
    transition: all 0.5s;
    opacity: 1;
    background: rgba(7,17,27,0.6);
  }
  &.fade-enter,&.fade-leave{
    opacity: 0;
    background: rgba(7,17,27,0)
  }
}
</style>
