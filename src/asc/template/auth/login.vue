<template>
    <div ref="body">
        <img src="../../../assets/bg2.jpg" width="100%" height="100%"/>
        <div ref="container">
            <el-form ref="form" :model="form" class="fan-form" label-position="top">
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
        </div>
    </div>
</template>

<style>
    .fan-form {
        width: 300px;
    }
</style>

<script>
    import { mapState, mapActions } from '~/vendor'
    export default {
        data() {
            return {
                size: '',
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        mounted(){
            // 获取浏览器可视区域高度
            this.size = `${document.documentElement.clientWidth}` + '|' + `${document.documentElement.clientHeight}`; // document.body.clientWidth, document.documentElement.clientHeight
            window.onresize = function() {
                this.size = `${document.documentElement.clientWidth}` + '|' + `${document.documentElement.clientHeight}`;
            };
        },
        watch: {
            // 如果 `clientHeight` 发生改变，这个函数就会运行
            size: function () {
                this.reSize(this.size)
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
                login: 'asc/auth/oauth2/login',
                loadLang: 'loadLang'
            }),
            reSize(size){                        //动态修改样式
                size = size.split('|');
                let width = parseFloat(size[0]), height = parseFloat(size[1]);
                this.$refs.body.style.height = height + 'px';
                this.$refs.container.style.position = 'absolute';
                this.$refs.container.style.top = height / 3 + 'px';
                this.$refs.container.style.left = (width - 300) / 2 + 'px';
            },
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