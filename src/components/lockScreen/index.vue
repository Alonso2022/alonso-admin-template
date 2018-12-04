<template>
  <div>
    <svg
      class="svg-icon lockscreen-svg"
      aria-hidden="true"
      @click="handleLock"
    >
      <use xlink:href="#icon-lock"></use>
    </svg>

    <el-dialog
        :title="$t('lockScreen.title')"
        :visible.sync="box"
        width="30%"
        append-to-body
        >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item :label="$t('lockScreen.lockPassword')" prop="passwd" :rules="[{ required: true, message: $t('lockScreen.lockPasswordErrorMsg')}]">
          <el-input v-model="form.passwd" :placeholder="$t('lockScreen.placeholder')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSetLock">{{$t('system.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validatenull } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  name: 'LockScreen',
  data() {
    return {
      box: false,
      form: {
        passwd: ''
      }
    }
  },
  computed: {
    ...mapGetters(['lock'])
  },
  methods: {
    handleSetLock() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store.commit('SET_LOCK_PASSWD', this.form.passwd)
          this.handleLock()
        }
      })
    },
    handleLock() {
      if (validatenull(this.lock.pwd)) {
        this.form.passwd = ''
        this.box = true
        return
      }
      this.$store.commit('SET_LOCK')
      this.box = false
    }
  }

}
</script>

<style>
.lockscreen-svg{
  cursor: pointer;
  width: 18px;
  height: 18px;
  vertical-align: -4px !important;
}
</style>
