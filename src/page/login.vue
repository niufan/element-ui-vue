<template>
    <div>
        <el-container>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登陆</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-container>
    </div>
</template>

<script>
    import { mapState, mapActions } from '~/vendor'
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapState({
                lang: state => state.lang,
                theme: state => state.theme
            })
        },
        methods: {
            ...mapActions({
                login: 'oauth2/login',
                loadLang: 'loadLang'
            }),
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.login({
                            username: this.form.username,
                            password: this.form.password
                        }).then(res => {
                            if (res) {
                                this.$router.push('home')
                            }
                        }, error => {
                            console.log(error);
                        })
                    } else {
                        return false
                    }
                });
            }
        }
    }
</script>