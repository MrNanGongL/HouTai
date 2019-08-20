<template>
	<div @keydown.enter="add" class="add">
		<el-row>
			<el-form>
				<el-form-item label="名称">
					<el-input placeholder="请输入名称" v-model="foodName"></el-input>
				</el-form-item>
				<!--名称-->
				<el-form-item label="别名">
					<el-input placeholder="请输入别名" v-model="foodAlias"></el-input>
				</el-form-item>
				<!--别名-->
				<el-form-item label="分类">
					<el-cascader :options="options" :show-all-levels="false" :props="{expandTrigger:'hover'}"></el-cascader>
				</el-form-item>
				<!--分类-->
				<el-form-item label="编号">
					<el-input placeholder="请输入编号" v-model="code"></el-input>
				</el-form-item>
				<!--编号-->
				<el-form-item label="描述">
					<el-input placeholder="请输入描述" v-model="desc" type="textarea" :rows="4"></el-input>
				</el-form-item>
				<!--描述-->
				<template>
					<el-row class="add-button">
						滋养功效
						<el-button type="primary" class="A-add-button" @click="dialogeffect=true">添加</el-button>
					</el-row>
					<el-table :data="efficacyList">
						<el-table-column prop="name" label="名称" width="300"></el-table-column>
						<el-table-column prop="desc" label="描述"></el-table-column>
					</el-table>
				</template>
				<!--滋养功效-->
				<template>
					<el-row class="add-button">
						宜食
						<el-button type="primary" class="A-add-button" @click="dialogfitfood=true">添加</el-button>
					</el-row>
					<el-table :data="appropriateList">
						<el-table-column prop="desc"></el-table-column>
					</el-table>
				</template>
				<!--宜食-->
				<template>
					<el-row class="add-button">
						忌食
						<el-button type="primary" class="A-add-button" @click="dialognotfood=true">添加</el-button>
					</el-row>
					<el-table :data="dietList">
						<el-table-column prop="desc"></el-table-column>
					</el-table>
				</template>
				<!--忌食-->
				<el-form-item label="小贴士">
					<el-input v-model="remark" type="textarea" :rows="4"></el-input>
				</el-form-item>
				<!--小贴士-->
				<template >
					<el-form-item label="营养标签">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value" v-model="nutrlabel">
							</el-option>
						</el-select>
					</el-form-item>
				</template>
				<!--营养标签-->
				<template v-for="nutritious in composition" >
					<el-form style="margin-left: 40%;">
						{{nutritious.name}}
						<el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="100" class="label"></el-input-number>{{nutritious.label}}
						<br><br>
					</el-form>
				</template>
				<!--营养成分-->
				<el-row style="text-align: center;">
					<el-button type="primary">保存</el-button>
					<el-button type="primary">取消</el-button>
				</el-row>
				<!--保存，取消按钮-->
				<el-dialog title="滋养功效" :visible.sync="dialogeffect">
					<el-form v-model="effect" class="card">
						<el-form-item label="功效">
							<el-input v-model="effect.name"></el-input>
						</el-form-item>
						
						<el-form-item label="描述">
							<el-input type="textarea" :rows="4" v-model="effect.desc"></el-input>
						</el-form-item>
						
						<div class="button-group">
							<el-button type="primary" @click="addeffect()">确定</el-button>
							<el-button type="primary" @click="dialogeffect=false">取消</el-button>
						</div>
					</el-form>
				</el-dialog>
				<!--滋养功效弹出框-->
				
				<el-dialog title="宜食" :visible.sync="dialogfitfood">
					<el-form v-model="fit" class="card">
						<el-form-item label="宜食">
							<el-input v-model="fit.desc"></el-input>
						</el-form-item>
						
						<div class="button-group">
							<el-button type="primary" @click="addfitfood()">确定</el-button>
							<el-button type="primary" @click="dialogfitfood=false">取消</el-button>
						</div>
					</el-form>
				</el-dialog>
				<!--宜食弹出框-->
				
				<el-dialog title="忌食" :visible.sync="dialognotfood">
					<el-form v-model="notfood" class="card">
						<el-form-item label="宜食">
							<el-input v-model="notfood.desc"></el-input>
						</el-form-item>
						
						<div class="button-group">
							<el-button type="primary" @click="addnotfood()">确定</el-button>
							<el-button type="primary" @click="dialognotfood=false">取消</el-button>
						</div>
					</el-form>
				</el-dialog>
				<!--忌食弹出框-->
			</el-form>
		</el-row>

	</div>
</template>

<script>
	export default {
		name: 'add',
		data() {
			return {
				foodName: '',
				foodAlias: '',
				code:'',
				remark: '',
				qname:'',
				url:'',
				desc: '',
				
				efficacyList: [],//存放滋养功效列表
				appropriateList: [],//存放宜食列表
				dietList: [],//存放忌食列表
				
				nutrlabel:'',
				value: '',
				num:1,
				dialogeffect:false,
				dialogfitfood:false,
				dialognotfood:false,
				options: [{
						value: 'guleijizhipin',
						label: '谷类及制品',
						children: [{
							value: 'xiaomai',
							label: '小麦'
						}, {
							value: 'daogu',
							label: '稻谷'
						}, {
							value: 'yumi',
							label: '玉米'
						}, {
							value: 'damai',
							label: '大麦'
						}, {
							value: 'xiaomihehuangmi',
							label: '小米/黄米'
						}, {
							value: 'else',
							label: '其他'
						}, ]
					},

					{
						value: 'shuleidianfenjizhipin',
						label: '薯类，淀粉及制品',
						children: [{
							value: 'shulei',
							label: '薯类'
						}, {
							value: 'dianfen',
							label: '淀粉类'
						}]
					},

					{
						value: 'gandouleijizhipin',
						label: '干豆类及制品',
						children: [{
							value: 'dadou',
							label: '大豆'
						}, {
							value: 'lvdou',
							label: '绿豆'
						}, {
							value: 'chidou',
							label: '赤豆'
						}, {
							value: 'yundou',
							label: '芸豆'
						}, {
							value: 'candou',
							label: '蚕豆'
						}, {
							value: 'else',
							label: '其他'
						}, ]
					},

					{
						value: 'junzaolei',
						label: '菌藻类',
						children: [{
							value: 'junlei',
							label: '菌类'
						}, {
							value: 'zaolei',
							label: '藻类'
						}]
					},

					{
						value: 'shuiguoleijizhipin',
						label: '水果类及制品',
						children: [{
							value: 'renguolei',
							label: '仁果类'
						}, {
							value: 'heguolei',
							label: '核果类'
						}, {
							value: 'jiangguolei',
							label: '浆果类'
						}, {
							value: 'ganjulei',
							label: '柑橘类'
						}, {
							value: 'redaiyaredaishuiguolei',
							label: '热带，亚热带水果类'
						}, {
							value: 'guaguolei',
							label: '瓜果类'
						}]
					},
				],
				//分类
				tagList: [{
						value: '1',
						label: '高热量'
					},
					{
						value: '2',
						label: '低热量'
					},
					{
						value: '3',
						label: '高蛋白'
					},
					{
						value: '4',
						label: '高脂肪'
					},
					{
						value: '5',
						label: '低蛋白'
					},
					{
						value: '6',
						label: '高胆固醇'
					},
					{
						value: '7',
						label: '高钠'
					},
					{
						value: '8',
						label: '低血糖'
					},
					{
						value: '9',
						label: '低胆固醇'
					},
					{
						value: '10',
						label: '低脂肪'
					}
				],
				//标签
				composition:[{
					name:'食部',
					label:'%'
				},
				{
					name:'酒精',
					label:'Vol%ml'
				},{
					name:'水分',
					label:'%'
				},{
					name:'能量',
					label:'kcal'
				},{
					name:'胆固醇',
					label:'mg'
				},{
					name:'蛋白质',
					label:'g'
				},{
					name:'脂肪',
					label:'g'
				},{
					name:'碳水化合物',
					label:'g'
				},{
					name:'不溶性纤维',
					label:'g'
				},{
					name:'灰分',
					label:'g'
				},{
					name:'总维生素A',
					label:'μgRE'
				},{
					name:'胡萝卜素',
					label:'μg'
				},{
					name:'视黄醇',
					label:'μg'
				},{
					name:'硫胺素',
					label:'mg'
				},{
					name:'核黄素',
					label:'mg'
				},{
					name:'尼克酸',
					label:'mg'
				},{
					name:'维生素C',
					label:'mg'
				},{
					name:'维生素E（Total）',
					label:'mg'
				},{
					name:'维生素E(α-E)',
					label:'mg'
				},{
					name:'维生素E((β+γ)-E)',
					label:'mg'
				},{
					name:'维生素E(δ-E)',
					label:'mg'
				},{
					name:'钙',
					label:'mg'
				},{
					name:'磷',
					label:'mg'
				},{
					name:'钾',
					label:'mg'
				},{
					name:'钠',
					label:'mg'
				},{
					name:'镁',
					label:'mg'
				},{
					name:'铁',
					label:'mg'
				},{
					name:'锌',
					label:'mg'
				},{
					name:'硒',
					label:'μg'
				},{
					name:'铜',
					label:'mg'
				},{
					name:'锰',
					label:'mg'
				}],
				//营养成分
				effect:[{
					name:'',
					desc:''
				}],
				//滋养功效
				fit:[{
					desc:''
				}],
				//宜食
				notfood:[{
					desc:''
				}],
				//忌食
				
			}
		},
		methods: {
			handleChange(value) {
        		console.log(value);
      		},
      		
      		addeffect(){
      			this.dialogeffect=false;
      			this.efficacyList.push({
      				name:this.effect.name,
      				desc:this.effect.desc
      			})
      		},
      		//添加功效
      		addfitfood(){
      			this.dialogfitfood=false;
      			this.appropriateList.push({
      				desc:this.fit.desc
      			})
      		},
      		//添加宜食
      		addnotfood(){
      			this.dialognotfood=false;
      			this.dietList.push({
      				desc:this.notfood.desc
      			})
      		},
      		//添加忌食

			add() {
				let user=JSON.parse(localStorage.getItem('user'));
				this,$axios({
					headers:{
						contentType:"application/json;charset=utf-8",
						sec:this.getsec(),
						aut:user.aut,
						nonce:user.nonce,
						timestamp:(new Date()).getTime()
					},
					method:'post',
					url:"/manager/food/save",
					data:{
						foodInfo:{
							foodName:this.foodName,
							foodAlias:this.foodAlias,
							code:this.code,
							typeId:this.options.value,
							typeName:this.options.label,
							subclassId:this.options.children.value,
							subclassName:this.options.children.label,
							remark:this.remark,
							qname:'',
							url:'',
							desc:this.desc
						},
						
						appropriateList:{
							desc:this.fit.desc
						},
						
						dietList:{
							desc:this.notfood.desc
						},
						
						tagList:{
							tid:this.tagList.value,
							name:this.tagList.label
						},
						
						efficacyList:{
							efficacy:this.effect.name,
							desc:this.effect.desc
						}
					},
					baseURL:"https://2jk1880143.iask.in"
				})
				.then(response=>{
					if(response.data.code===200){
						console.log(response.data);
						this.$router.push({path:'/food'})
					}
					
				})
				.catch(error=>{
					console.log(error);
				});

			},
		}
	}
</script>

<style scoped>
	.add{
		text-align: left;
	}
	.el-form {
		width: 80%;
		margin: 0 5%;
	}
	
	.el-cascader {
		display: block;
		width: 30%;
	}
	
	.add-button {
		margin-left: 0%;
	}
	
	.A-add-button {
		margin: 20px;
		padding: 2px 20px;
	}
	
	.el-select {
		width: 100%;
	}
	
	.label{
		padding-left: 40px;
	}
	.button-group{
		text-align: right;
	}
	.card{margin-left: 10%;}
</style>