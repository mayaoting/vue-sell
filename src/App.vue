<template>
  <div id="app">
    <vheader :seller='seller'></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vheader from './components/header/header.vue'
export default {
  name: 'app',
  data(){
    return{
      seller:{},
    }
  },
  components: {
    vheader,
  },
  created(){
     this.axios.get('/goods/list')
      .then((res) =>{
        this.seller = res.data.seller;
        
      })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 #app
  .tab
    display:flex
    width:100%
    height: 40px
    line-height : 40px
    border-bottom :1px solid rgba(7,17,27,0.1)
    .tab-item
      flex: 1
      text-align : center
      & > a 
        display: block
        font-size: 14px
        color:rgb(77,85,93)
        &.active
          color:red     
</style>
