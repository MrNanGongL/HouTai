<template>
	<div>

		<el-table :data="label" style="width: 90%;margin:0 5%;">
			<el-table-column prop="name" label="名称" width="400"></el-table-column>
			<el-table-column prop="desc" label="描述" width="800"></el-table-column>
			<el-table-column>
				<template slot="header" slot-scope="scope">
					<el-button type="primary" @click="addList()">添加</el-button>
				</template>
				
				<template slot-scope="scope">
				<el-button type="primary">编辑</el-button>
				<el-button type="danger" @click="labeldelete(scope.$index)">删除</el-button>
				</template>
				
			</el-table-column>
		</el-table>
		
		<el-button type="primary" @click="tagshow()" style="margin: 30px;">更新标签</el-button>

		<el-pagination background layout="prev, pager, next" :total="20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"></el-pagination>
		<!--分页序号-->
		<el-dialog title="营养标签" :visible.sync="dialoglabel">
			<el-form v-model="nlabel" class="card">
				<el-form-item label="标签名称">
					<el-input v-model="nlabel.name"></el-input>
				</el-form-item>

				<el-form-item label="标签描述">
					<el-input type="textarea" :rows="4" v-model="nlabel.desc"></el-input>
				</el-form-item>

				<div class="button-group">
					<el-button type="primary" @click="labelsave()">确定</el-button>
					<el-button type="primary" @click="labelexit()">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'NutritionLabel',
		data() {
			return {
				label: [],
				currentPage: 1,
				dialoglabel: false,
				nlabel: [{
					name: '',
					desc: ''
				}]
			}
		},
		
		created(){
			this.tagshow();
		},
		
		methods: {
			labelexit:function(){
			this.dialoglabel=false;
			},
//			退出添加页面
			addList() {
				this.dialoglabel=true;
			},
//			添加页面显示
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},

			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
				console.log("the value is:"+this.currentPage);
				this.tagshow();

			},
//			获取当前页数
			tagshow:function(){
				
				let user=JSON.parse(localStorage.getItem('user'));
				this.$axios({
					headers:{
						contentType: "application/json;charset=utf-8",
						sec: this.getsec(),
						aut: user.aut,
						nonce: user.nonce,
						timestamp: (new Date()).getTime()
					},
					method:'get',
					url:"/manager/tag/list",
					params:{
						pageNum: this.currentPage,  //第几页的数据
						pageSize: 10    //每一页的数量
					},
					baseURL:"https://2jk1880143.iask.in"
				})
				.then(response=>{
					
					if(response.data.code===200){
						this.label=[];
						console.log(response.data);
						for(let i=0;i<response.data.result.length;i++){
							this.label.push({
								name:response.data.result[i].name,
								desc:response.data.result[i].desc,
								id:response.data.result[i].id
							});
							
						
						}
					}
				})
				.catch(error=>{
					console.log(error);
				});
				
			},
//			标签显示
			getsec:function(){
				let user=JSON.parse(localStorage.getItem('user'));
				let sec=(new Date()).getTime().toString()+user.nonce.toString()+user.password.toString();
				sec=this.$md5(sec);
				return sec;
				
			},
//			获取本地存储sec加密

			labelsave:function(){
				
				let user=JSON.parse(localStorage.getItem('user'));
				this.$axios({
					headers:{
						contentType:"application/json;charset=utf-8",
						sec:this.getsec(),
						aut: user.aut,
						nonce: user.nonce,
						timestamp: (new Date()).getTime()
					},
					method:'post',
					url:"/manager/tag/save",
					data:{
						name:this.nlabel.name,
						desc:this.nlabel.desc
					},
					baseURL:"https://2jk1880143.iask.in"
				}).then(response=>{
					if(response.data.code===200){
						console.log(response.data);
						alert("保存成功");
					}
				}).catch(error=>{
					console.log(error);
				})
				this.labelexit();
			},
//			营养标签保存
			labeldelete:function(lindex){
				console.log(this.label[lindex].id);
				let user=JSON.parse(localStorage.getItem('user'));
				this.$axios({
					headers:{
						contentType: "application/json;charset=utf-8",
						sec: this.getsec(),
						aut: user.aut,
						nonce: user.nonce,
						timestamp: (new Date()).getTime()
					},
					method:'post',
					url:"/manager/tag/remove",
					data:{
						id:this.label[lindex].id
					},
					baseURL:"https://2jk1880143.iask.in"
				})
				.then(response=>{
					
					if(response.data.code===200){
							console.log(this.label[lindex].id);
							alert("删除成功");
						}
					}
				)
				.catch(error=>{
					console.log(error);
				});
				
				this.tagshow();
				
			},
//			营养标签删除


		},
	}
</script>

<style sroped>
	.card {
		margin-left: 10%;
	}
	
	.button-group {
		text-align: right;
	}
</style>