<template>
  <div class="cart-control">
    <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">-</div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click="addCart">+</div>
  </div>
</template>
<script>
export default {
  props:{
    food:{
      type:Object,
    },
  },
  methods:{
    decreaseCart(){
      if(!this.food.count) {
        return;
      } else {
        this.food.count--;
      }
    },
    addCart(){
      console.log("click");
      if(!this.food.count) {
        this.$set(this.food,'count',1)
        this.food.count = 1;
      } else {
        this.food.count++;
      }
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
    line-height: 10px;
    font-size: 24px;
    width: 14px;
    height: 14px;
    background: #00a00d;
    border-radius: 50%;
    text-align: center;
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

