<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-menu-item, .el-submenu__title{
		height: 60px;
		line-height: 60px;
	}
	
	.el-menu{
		border-right: none;
	}
	
		.el-table::before{
		width: 0;
	}
</style>
