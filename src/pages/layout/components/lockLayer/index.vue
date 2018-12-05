<template>
  <div class="lock-container">
    <div class="lock-form animated bounceInDown">
      <div class="animated" :class="{'shake':passwdError,'bounceOut':pass}">
        <h3 class="title">{{name}}</h3>
        <el-input
            :placeholder="$t('lockLayer.placeholder')"
            type="password"
            class="input-with-select animated"
            v-model="passwd"
            @keyup.enter.native="handleLogin">
          <el-button slot="append" @click="handleLogin"><svg-icon icon-class="lock" /></el-button>
          <el-button slot="append" @click="handleLogout"><svg-icon icon-class="exit" /></el-button>
        </el-input>
      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LockLayer',
  data() {
    return {
      passwd: '',
      passwdError: false,
      pass: false
    }
  },
  created() { },
  mounted() { },
  computed: {
    ...mapGetters(['name', 'lock'])
  },
  props: [],
  methods: {
    handleLogout() {
      this.$confirm(this.$t('lockLayer.exitConfirmMsg'), this.$t('lockLayer.exitTitle'), {
        confirmButtonText: this.$t('system.ok'),
        cancelButtonText: this.$t('system.cancel'),
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    },
    handleLogin() {
      if (this.passwd !== this.lock.pwd) {
        this.passwd = ''
        this.$message({
          message: this.$t('lockLayer.lockPasswordErrorMsg'),
          type: 'error'
        })
        this.passwdError = true
        setTimeout(() => {
          this.passwdError = false
        }, 1000)
        return
      }
      this.pass = true
      setTimeout(() => {
        this.$store.commit('CLEAR_LOCK')
      }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="scss">
.lock-container {
       height: 100%;
       width: 100%;
    overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1002;
  .title {
    margin-bottom: 8px;
    color: #333;
    text-align: center;
  }
}
.lock-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../../../assets/login.png');
  background-size: cover;
}
.lock-form {
  width: 300px;margin-top: -200px;
}
</style>
