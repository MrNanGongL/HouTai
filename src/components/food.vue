<template>
	<div class="food">
		<el-form>
			<el-input v-model="search" placeholder="输入搜索信息" class="search"></el-input>
			<el-button type="primary" style="margin: 20px;">搜索</el-button>
		</el-form>

		<el-table :data="foodData" style="width: 90%;margin-left: 5%;">
			<el-table-column prop="foodName" label="名称" width="300"></el-table-column>
			<el-table-column prop="typeName" label="分类" width="300"></el-table-column>
			<el-table-column prop="desc" label="描述" width="600"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary">编辑</el-button>
					<el-button type="danger" @click="fooddelete(scope.$index+1)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--食物列表-->
		<el-pagination background layout="prev, pager, next" :total="1460" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
		<!--分页序号-->
		<el-form>
			<el-form-item>
				<el-button type="primary" style="margin: 20px;width: 10%;" @click="addpage">添加</el-button>
				<el-button type="primary" style="margin: 20px;width: 10%;" @click="update()">更新</el-button>
			</el-form-item>
		</el-form>
		<!--添加，更新按钮-->

	</div>
</template>

<script>
	export default {
		name: 'food',
		data() {
			return {
				search: '',
				foodData: [],
				currentPage:1
			}
		},
		
		created(){
				this.update();
			}, 
		
		methods: {
			handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
      		
      		handleCurrentChange(val) {
        		console.log(`当前页: ${val}`);
        		this.currentPage=val;
        		console.log("currentPage的值"+this.currentPage);
        		this.update();
      		},
			//当前页面
			update: function() {
				let user = JSON.parse(localStorage.getItem('user'));
				this.$axios({
					headers: {
						contentType: "application/json;charset=utf-8",
						sec: this.getsec(),
						aut: user.aut,
						nonce: user.nonce,
						timestamp: (new Date()).getTime()
					},
					method: 'get',
					url: "/manager/food/list",
					params: {
						pageNum: this.currentPage,  //第几页的数据
						pageSize: 10    //每一页的数量
					},
					baseURL: "https://2jk1880143.iask.in"
				}).then(response => {
					if(response.data.code===200){
						
					this.foodData=[];
					console.log(response.data);
					
					for(let i = 0; i < response.data.result.length; i++) {
						this.foodData.push({
							foodName: response.data.result[i].foodName,
							typeName: response.data.result[i].typeName,
							desc: response.data.result[i].desc,
							id:response.data.result[i].id
						});
					};
						}

				}).catch(error => {
					console.log(error);
				});
			},
			//更新
			getsec: function() {
				let user = JSON.parse(localStorage.getItem('user'));
				console.log(user);
				let sec = (new Date()).getTime().toString() + user.nonce.toString() + user.password.toString();
				console.log(sec);
				sec = this.$md5(sec);
				return sec;
			},
			//		获得加密sec
			addpage:function(){
				this.$router.push({path:'/add'});
			},
			//跳转到添加食材页面
			fooddelete:function(fstr){
				console.log(this.foodData[fstr].id);
				let user=JSON.parse(localStorage.getItem('user'));
				this.$axios({
					headers:{
						contentType:"application/json;charset=utf-8",
						sec:this.sec(),
						aut:user.aut,
						nonce:user.nonce,
						timestamp: (new Date()).getTime()
					},
					method:"post",
					url:"/manager/food/remove",
					data:{
						id:this.foodData[fstr].id
					},
					baseURL:"https://2jk1880143.iask.in"
				})
				.then(response=>{
					console.log(response.data);
					this.update();
				})
				.catch(error=>{
					console.log(error)
					});
			},
			//删除食材

		},


	}
</script>

<style>
	.food{
		text-align: center;
	}
	.search {
		width: 20%;
		margin-left: -62%;
		margin-bottom: 30px;
	}
	
	.el-pagination{
		padding: 40px;
	}
</style>