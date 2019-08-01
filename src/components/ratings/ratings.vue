<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
							<div class="overview-left">
								<h1 class="score">{{seller.score}}</h1>
								<div class="title">综合评分</div>
								<div class="rank">高于周边商家{{seller.rankRate}}</div>
							</div>
							<div class="overview-right">
								<div class="score-wrapper"> 
									<span class="title">服务态度</span>
									<star :size="36" :score="seller.serviceScore"/>
									<span class="score">{{seller.serviceScore}}</span>
								</div>
								<div class="score-wrapper"> 
									<span class="title">商品评分</span>
									<star :size="36" :score="seller.foodScore"/>
									<span class="score">{{seller.foodScore}}</span>
								</div>
								<div class="score-wrapper"> 
									<span class="title">送达时间</span>
									<span class="time">{{seller.deliveryTime}}分钟</span>
								</div>
							</div>
						</div>
            
        </div>
        
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
	}  
}
</script>
<style lang="scss" scoped>
.ratings{
	position: absolute;
	left: 0;
	top: 174px;
	width: 100%;
	overflow: hidden;
	.overview{
		display: flex;
		padding: 18px 0;
		.overview-left{
			flex: 0 0 137px;
			padding: 6px 0;
			border-right: 1px solid rgba(7,17,27,0.1);
			text-align: center;
			@media only  screen and (max-width:375px){
				flex: 0 0 120px;
				width: 120px;
			}
			.score{
				font-size: 24px;
				color: rgb(255,153,0);
				line-height: 24px;
				margin-bottom: 6px;
			}
			.title{
				font-size: 12px;
				color: rgb(7,17,27);
				line-height: 12px;
				margin-bottom: 8px;
			}
			.rank{
				font-size: 10px;
				color: rgb(7,17,27);
				line-height: 10px;
				margin-bottom: 6px;
			}
		}
		.overview-right{
			flex: 1;
			padding:6px 0 6px 24px;
			@media only  screen and (max-width:375px){
				padding-left:12px; 
			}
			.score-wrapper{
				line-height: 18px;
				margin-bottom: 8px;
				font-size: 0;
				.title{
					display:inline-block;
					font-size: 12px;
					color:rgb(7,17,27);
				}
				.star{
					display: inline-block;
					margin: 0 12px;
					vertical-align: top;
					::v-deep{
						.star-item{
							margin-right: 10px;
						}
					}
				}
				.score{
					line-height: 18px;
					font-size: 12px;
					display: inline-block;
					color:rgb(255,153,0);
				}
				.time{
					font-size: 12px;
					color:rgb(147,153,159);
					line-height: 18px;
					margin-left: 12px;
				}
			} 
		}
	}
}
</style>


