<template>
    <div class="main">
        <span class='username'>{{username}},欢迎你!</span>
        <span class="return">
            <router-link to='/'>返回首页</router-link>
        </span>
        <img src="./title.png" class='img'>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:this.$store.state.user.user
        }
    }
}
</script>

<style scoped>
.main{
    background: #f5f5f5;
    height: 220px;
}
.img{
    width:100%;
    height: 205px;
}
.username,.span{
    font-size:17px;
}
.username{
    color:#f00;
    position: relative;
    left:2%;
}
.return{
    position: relative;
    left:87%;
}
a{
    color:#000
}
</style>
