import './index.scss';
import { Layout, Menu, Icon } from 'ant-design-vue';
import "./js/particles";
import "./css/login.css"
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const Index = {
    data() {
        return {
            option:{},
            msg:""
        };
    },
    mounted() {
        particlesJS('particles-js',
            {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true,
                "config_demo": {
                    "hide_card": false,
                    "background_color": "#b61924",
                    "background_image": "",
                    "background_position": "50% 50%",
                    "background_repeat": "no-repeat",
                    "background_size": "cover"
                }
            }
        );
    },
    methods: {
        changeValue(key,e){
            var value = e.target.value;
            this.option[key]=value;
        },
        login(){
            if(!this.option.username||!this.option.password){
                this.msg="用户名和密码不能为空"
            }else{
                $ajax({
                    url:"/user/login",
                    data:this.option
                }).then(data=>{
                    if(data.code==1){
                        localStorage.setItem("user",JSON.stringify(data.data));
                        this.$router.push("/system");
                    }else{
                        this.msg = data.msg;
                    }
                })
            }
        }
    },
    render() {
        return <div>
            <div id="particles-js" style="display: flex;align-items: center;justify-content: center">
            </div>
            <div class="login-page">
                <div class="logo"><img src={require("./img/logo.png")}/></div>
                <div class="login-content">
                    <div class="login-tit">一个神奇的网上书店</div>
                    <div class="login-input">
                        <input type="text" placeholder="用户名/手机号" onInput={this.changeValue.bind(this,"username")}/>
                    </div>
                    <div class="login-input">
                        <input type="password" placeholder="密码" onInput={this.changeValue.bind(this,"password")}/>
                    </div>
                    <div style="line-height:30px;text-align:center;color:red;height:30px;">
                        {this.msg}
                    </div>
                    <div class="login-btn">
                        <div class="login-btn-left">
                            <span onClick={this.login}>登录</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
};
export default Index;


