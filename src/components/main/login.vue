<template>
  <div class='login'>
    <h2>欢迎登录</h2>
    <el-form :model='formBasic' ref='formText' :rules="formText">
      <el-form-item prop='username' class='el-form-item'>
        <el-input type='text' v-model='formBasic.username' auto-complete="off" placeholder='请输入用户名'>
        </el-input>
      </el-form-item>
      <el-form-item prop='password' class='el-form-item'>
        <el-input type='password' v-model='formBasic.password' auto-complete="off" placeholder='请输入密码'>
        </el-input>
      </el-form-item>
      <el-button type='primary' style='width:60%;' @click='userlogin'>登录
        <i class="el-icon-fa-sign-in el-icon--right"></i>
      </el-button>
    </el-form>
  </div>
</template>

<script>
import c from "@/custom";
import { login } from "@/api/login";
import { mapMutations } from "vuex";
export default {
  data() {
    let checkuser = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error("用户名不能小于6位"));
      } else {
        if (value.length > 14) {
          return callback(new Error("用户名不能大于14位"));
        } else {
          if (value[0] == 0) {
            return callback(new Error("用户名首位不能是0"));
          }
        }
        callback();
      }
    };
    let checkpass = (rule, value, callback) => {
      if (value.length < 8) {
        return callback(new Error("密码不能小于8位"));
      } else {
        if (value.length > 14) {
          return callback(new Error("密码不能大于14位"));
        }
        callback();
      }
    };
    return {
      formBasic: {
        username: "",
        password: ""
        // login
      },
      formText: {
        username: { required: true, trigger: "blur", validator: checkuser },
        password: { required: true, trigger: "blur", validator: checkpass }
      }
    };
  },
  methods: {
    ...mapMutations({
      setUser: "setUser",
      setToken: "setToken",
      setMoney: "setMoney"
    }),
    userlogin() {
      this.$refs.formText.validate(() => {
        login(this.formBasic)
          .then(res => {
            if (res.data == "wrong") {
              alert("用户名或密码错误！");
            } else {
              this.setToken(res.data[0]);
              this.setUser(res.data[1]);
              this.setMoney(res.data[2]);
              this.$router.push({ path: "/" });
            }
          })
          .catch(err => {
            c(err);
          });
      });
    }
  },
  mounted() {
    if (this.$store.state.user.user != null) {
      alert("登录另一个账号时，请先登出！");
      this.$router.push("/");
    }
  },
  watch: {
    $route() {
      if (this.$route.name == "login") {
        if (this.$store.state.user.user != null) {
          alert("登录另一个账号时，请先登出！");
          this.$router.push("/");
        }
      }
    }
  }
};
</script>


<style scoped>
.login {
  border: 1px solid #dcdfe6;
  width: 24%;
  min-height: 330px;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
}
.el-form-item {
  position: relative;
  left: 15%;
  width: 70%;
}
</style>
