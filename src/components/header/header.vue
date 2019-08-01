<template>
    <div class="header">
        <div class="content-wrapper">
                <div class="avatar">
                    <img width="64px" height="64px" :src="seller.avatar" alt="">
                </div>
                <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name"> {{seller.name}}</span>
                    </div>
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分钟送达
                    </div>
                    <div v-if="seller.supports" class="supports" @click="showDetail">
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <div v-if="seller.supports" class="support-count" @click="showDetail">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i>></i>
                </div>    
            </div>
            <div class="bulletin-wrapper">
                    <span class="bullentin-title"></span><span class="bullentin-text">{{seller.bulletin}}</span>
                    <span  class="icon-keyboard-arrow-right">></span>
            </div>
            <div class="background-img">
                <img :src="seller.avatar" width="100%" height="100%">
            </div>
            <transition name="fade">
                <div class="detail" v-show="detailshow">
                    <div class="detail-wrapper clearfix">
                        <div class="detail-main">
                            <h1 class="name">{{seller.name}}</h1>
                            <div class="star-wrapper">
                                <star :size="48" :score="seller.score"/>
                            </div>
                            <div class="title">
                                <div class="line"></div>
                                <div class="text">
                                    优惠信息
                                </div>
                                <div class="line">
                                </div>
                            </div>
                            <ul v-if="seller.supports" class="supports">
                                <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                    <span class="text">{{seller.supports[index].description}}</span>
                                </li>
                            </ul>
                            <div class="title">
                                <div class="line"></div>
                                <div class="text">
                                    商家公告
                                </div>
                                <div class="line">
                                </div>
                            </div>
                            <div class="bulletin-content">
                                {{seller.bulletin}}
                            </div>
                        </div>
                        
                    </div>
                    <div class="detail-close" @click="closeDetail">
                        <i class="icon-close">X</i>

                    </div>
                </div>
            </transition>

    </div>
</template>

<script>
import star from '../../components/star/star';

export default {
    props:{
        seller:{
            type:Object,
        }
    },
    components:{
        star,
    },
    data(){
        return{
            detailshow:false,
        }
    },
    methods:{
        showDetail(){
            this.detailshow = true;
        },
        closeDetail(){
            this.detailshow = false;
        }
    },
    created(){
        this.classMap = ["decrease","discount","special","invoice","guarantee"];
    },

}
</script>
<style lang="scss" scoped>
 .header{
     color:#fff;
     position: relative;
     background-color: rgba(7,17,27,0.5);
     .content-wrapper{
         position: relative;
         padding: 24px 12px 18px 24px;
         font-size:0px;
         .avatar{
             display: inline-block;
             vertical-align: top;
             img{
                 border-radius: 2px;
             }
         }
         .content{
             display: inline-block;
             margin-left: 16px;
             font-size:14px;
             .title{
                 margin:2px 0 8px 0;
                 .brand{
                     display: inline-block;
                     vertical-align: top;
                     width:30px;
                     height:18px;
                     background-image: url('../../../resource/img/brand@2x.png');
                     background-size: 30px 18px;
                     background-repeat: no-repeat;
                 }
                 .name{
                     margin-left: 6px;
                     font-size:16px;
                     line-height: 18px;
                     font-weight:bold;
                 }
             }
             .description{
                 margin-bottom: 10px;
                 line-height: 12px;
                 font-size: 12px;
             }
             .supports{
                 .icon{
                     display: inline-block;
                     width: 12px;
                     height:12px;
                     margin-right: 4px;
                     background-size:12px 12px;
                     background-repeat:no-repeat;
                     &.decrease{     
                        background-image: url('../../../resource/img/decrease_1@3x.png')
                     }
                     &.discount{
                        background-image: url('../../../resource/img/discount_1@3x.png')
                     }
                     &.special{
                        background-image: url('../../../resource/img/special_1@3x.png')
                     }
                     &.invoice{
                        background-image: url('../../../resource/img/invoice_1@3x.png')
                     }
                     &.guarantee{
                        background-image: url('../../../resource/img/guarantee_1@3x.png')
                     }

                 }
             }
         }
         .support-count{
             position: absolute;
             right:12px;
             bottom: 14px;
             padding: 0 8px;
             height:24px;
             line-height: 24px;
             border-radius: 14px;
             background: rgba(0,0,0, $alpha: 0.2);
             text-align: center;
             .count{
                 vertical-align: top;
                 font-size: 12px;
             }
             i{
                 font-size: 10px;
                 margin-left: 2px;  
             }
         }
         
     }
     .bulletin-wrapper{
             position: relative;
             height: 28px;
             line-height: 28px;
             padding: 0 22px 0 12px;
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
            //  background: rgba(7,17,27,0.5);
             .bullentin-title{
                 display: inline-block;
                 width: 22px;
                 height: 12px;
                 background-image:url('');
                 background:green; 
             }
             .bullentin-text{
                 font-size: 10px;
                 margin: 0 4px;
             }
             .icon-keyboard-arrow-right{
                 position:absolute;
                 font-size: 10px;
                 right: 8px;
                 top:1px;
             }
         }
         .background-img{
             position:absolute;
             top:0;
             left:0;
             width: 100%;
             height: 100%;
             z-index: -1;
             filter: blur(10);
             transition: all .5s;
         }
         .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
            }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transition: .5s;
        }
         .detail{
             position: fixed;
             top: 0px;
             left: 0px;
             z-index: 100;
             width: 100%;
             height: 100%;
             overflow: hidden;
             background: rgba(7,17,27,0.8); 
             .detail-wrapper{
                 min-height: 100%;
                 .detail-main{
                     margin-top: 64px;
                     padding-bottom: 64px;
                     .name{
                         line-height: 22px;
                         font-size: 22px;
                         font-weight: 400;
                         color: rgb(255,255,255);
                         text-align: center;
                     }
                     .star-wrapper{
                     margin-top: 22px;
                     text-align: center;
                    }
                    .title{
                        display: flex;
                        width: 80%;
                        margin: 30px auto 24px auto;
                        .line{
                            flex:1;
                            position: relative;
                            top: -6px;
                            border-bottom: 1px solid rgba(255,255,255,0.2);
                        }
                        .text{
                            padding: 0 12px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    } 
                    .supports{
                        width: 80%;
                        margin: 0 auto;
                        .supports-item{
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child{
                                margin-bottom: 0;
                            }
                            .icon{
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                vertical-align: top;
                                margin-right: 6px;
                                background-size:16px 16px;
                                background-repeat: no-repeat;
                                &.decrease{     
                                    background-image: url('../../../resource/img/decrease_1@3x.png')
                                }
                                &.discount{
                                    background-image: url('../../../resource/img/discount_1@3x.png')
                                }
                                &.special{
                                    background-image: url('../../../resource/img/special_1@3x.png')
                                }
                                &.invoice{
                                    background-image: url('../../../resource/img/invoice_1@3x.png')
                                }
                                &.guarantee{
                                    background-image: url('../../../resource/img/guarantee_1@3x.png')
                                }
                            }
                            .text{
                                line-height: 12px;
                                font-size: 14px;
                            }
                        }
                    }
                    .bulletin-content{
                        width: 80%;
                        margin: 0 auto;
                        padding: 0 48px;
                        font-size:16px;
                        font-weight: 200;
                        color:rgb(255,255,255);
                        line-height: 24px; 
                    } 
                 }
                 
             }
             .detail-close{
                 position: relative;
                 width: 100px;
                 height: 32px;
                 text-align: center;
                 margin: -100px auto 0 auto;
                 clear: both;
                 font-size: 32px;
             }
         }
         
 }
</style>

