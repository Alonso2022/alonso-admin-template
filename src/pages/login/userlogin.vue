<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" :placeholder="$t('login.username')">
        <svg-icon slot="prefix" icon-class="single-user" style="margin-left:8px;" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" :placeholder="$t('login.password')">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <svg-icon slot="prefix" icon-class="lock" style="margin-left:8px;" />
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input size="small" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.code')">
            <svg-icon slot="prefix" icon-class="yanzhengma" style="margin-left:8px;" />
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src" class="login-code-img" @click="refreshCode" v-else/>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">{{$t('login.logIn')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { randomLenNum } from '@/utils/common'
import { mapGetters } from 'vuex'
export default {
  name: 'Userlogin',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error(this.$t('login.rule.username')))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error(this.$t('login.rule.code3')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        redomStr: ''
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, message: this.$t('login.rule.password1'), trigger: 'blur' },
          { min: 6, message: this.$t('login.rule.password2'), trigger: 'blur' }
        ],
        code: [
          { required: true, message: this.$t('login.rule.code1'), trigger: 'blur' },
          { min: 4, max: 4, message: this.$t('login.rule.code2'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
      passwordType: 'password'
    }
  },
  created() {
    this.refreshCode()
  },
  mounted() { },
  computed: {
    ...mapGetters(['tagWel'])
  },
  props: [],
  methods: {
    refreshCode() {
      this.loginForm.redomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}/${this.loginForm.redomStr}`)
      this.loginForm.code = this.code.value
    },
    showPassword() {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$store.commit('CLEAR_LOCK')
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
