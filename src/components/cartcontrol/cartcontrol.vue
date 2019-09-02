<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
        <span class="inner">-</span></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart">+</div>
  </div>
</template>
<script>
export default {
  props:{
    food:{
      type:Object,
    },
  },
  data(){
    return{

    }
  },
  methods:{
    decreaseCart(event){
      if(!this.food.count) {
        return;
      } else {
        this.food.count--;
      }
    },
    addCart(event){
      if(!event._constructed){
        return;
      }
      if(!this.food.count) {
        this.$set(this.food,'count',1)
        this.food.count = 1;
      } else {
        this.food.count++;
      }
      this.$emit('cartadd',event.target);
    },
  },

  created(){
  }
}
</script>
<style lang="scss" scoped>
.cart-control{
  font-size: 0px;
  .cart-decrease, .cart-add{
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
    &.move-transition{
      opacity: 1;
      transform: translate3d(0,0,0);
    } 
    &.move-enter,&.move-leave{
      opacity: 0;
      // transform: translate3d(24px 0,0);
      .inner{
        transform: rotate(180deg);
      }
    }
    line-height: 10px;
    font-size: 24px;
    width: 14px;
    height: 14px;
    background: #00a00d;
    border-radius: 50%;
    text-align: center;
    .inner{
      display: inline-block;
      line-height: 10px;
      font-size: 24px;
      transition: all 0.4s linear;
      transform: rotate(0);
    }
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);

  }
  .cart-add{
    display: inline-block;
  }

}
</style>

