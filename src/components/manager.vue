<template>
	<div class="main">
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="3">
						<p class="usual-p">模拟后台管理系统</p>
					</el-col>
					<el-col :span="3" :push="18">

						<el-link v-if="show=='unlogin'" class="login" @click="loginpage()">登录</el-link>

						<el-menu background-color="#4682b4" text-color="#ffffff" v-if="show=='login'">
							<el-submenu index="1">
								<template slot="title">{{name}}</template>
								<el-menu-item index="1-1">个人中心</el-menu-item>
								<el-menu-item index="1-2" @click="loginpage()">退出登录</el-menu-item>
							</el-submenu>
						</el-menu>
						<!--管理员-->
						
					</el-col>
				</el-row>
			</el-header>
			<!--顶头界面-->

			<el-container>
				<el-aside>
					<nav>
						<router-link class="aside-nav" to="/food">食材</router-link>
						<router-link class="aside-nav" to="/NutritionLabel">营养标签</router-link>
					</nav>
				</el-aside>
				<!--左边导航-->
				<el-main style="overflow-y: scroll;height: 900px;">
						<router-view></router-view>
				</el-main>
				<!--内容展示区-->
			</el-container>
		</el-container>
		
		<div v-on:keydown.enter="login">
		<el-row class="loginpage" type="flex" justify="center" v-if="showlogin=='logining'" v-on:keydown.enter="login">
			<el-col :span="8" >
				<el-form class="LoginForm" >
					
					<el-image :src="logurl" style="width: 20%;height: auto;padding: 20px;"></el-image>
					
					<el-form-item>
						<el-input type="text" placeholder="请输入账号" style="width: 70%;" v-model="mnumble"></el-input>
					</el-form-item>
					
					<el-form-item>
						<el-input type="password" placeholder="请输入密码" style="width: 70%;"  v-model="mpassword"></el-input>
					</el-form-item>
					
					 <el-form-item >
    				<el-button type="primary" @click="login()" >登录</el-button>
    				<el-button type="primary" @click="exit()">取消</el-button>
 					 </el-form-item>

				</el-form>
			</el-col>
			
		</el-row>
		</div>
		<!--登录页面-->
	</div>
</template>

<script>
	export default {
		id: '#main',
		data: () => ({
			show: 'unlogin',
			showlogin:' ',
			logurl:require('../img/maqueniao.png'),
			mpassword:'',
			mnumble:'',
			name:''
		}),

		methods: {
			exit:function(){
				alert('不登录你就想操作页面吗，想得美');
			},
//			退出登录界面
			loginpage:function(){
				this.showlogin='logining';
				this.show='unlogin';
			},
//			进入登录界面
			login:function(){
				this.$axios({
					headers:{
						contentType:"application/json;charset=utf-8",
						
					},
					method:'post',
					url: "/manager/manager/loginByMobile",
					data:{
						mobile:this.mnumble,
						password:this.$md5(this.mpassword)
					},
					baseURL:"https://2jk1880143.iask.in"
				})
				.then(response=>{
					
					if(response.data.code===200){
						this.showlogin='';
						this.show='login';
						this.name=response.data.result.name;
						console.log(response.data);
						
						let user={};
						user={
							aut:response.data.result.id,
							password:response.data.result.password,
							nonce:Math.ceil(Math.random() * 100000000)
							
						};
						user=JSON.stringify(user);
						window.localStorage.setItem('user',user);
						
					}
					if(response.data.code==201){
						console.log("账号密码错误");
						alert('账号密码错误啦，快想想，是不是记混了');
					}
				})
				.catch(error=>{
					console.log(error);
				});
			},
//			登录功能

		
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
	.el-header {
		background-color: steelblue;
		height: 100px;
		width: 100%;
		margin-top: -58px;
	}
	
	.el-aside {
		background-color: black;
		width: 10%;
		height:900px;
	}
	
	.usual-p {
		color: white;
		font-size: 18px;
		font-weight: bolder;
	}
	
	.login {
		color: white;
		font: 15px;
		line-height: 60px;
		text-align: center;
	}
	
	.aside-nav {
		display: block;
		list-style: none;
		padding: 50px;
		font-size: 15px;
		color: white;
		text-decoration: none;
		
	}
	
	.router-link-active,.aside-nav:hover {
		background-color: rgb(255, 255, 255, 0.1);
		border-left: 5px solid deepskyblue;
	}
	
	.el-link.is-underline:hover:after {
		border: none;
	}
	
	.loginpage{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0, 0.8);
	}
	
	.LoginForm{
		height: 400px;
		background-color: white;
		border-radius: 10px;
		margin-top: 200px;
	}
	

</style>