<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class='header' :to="{name:'Home'} " >Biased Film Reviews</router-link>
            </div>
            <div class="nav-links">
                <ul v-show='!mobile'>
                    <router-links class='link' to='#'>Home</router-links>
                    <router-links class='link' to='#'>Film Reviews</router-links>
                    <router-links class='link' to='#'>News</router-links>
                    <router-links class='link' to='#'>Categories</router-links>
                    <router-links class='link' to='#'>Create Review</router-links>
                    <router-links class='link' to='#'>Login/Register</router-links>
                </ul>
            </div>
        </nav>
        <menuIcon @click='toggleMobileNav' class='menu-icon' v-show='mobile'/>
        <transition name='mobile-nav'>
            <ul class='mobile-nav' v-show='mobileNav'>
                <router-links class='link' to='#'>Home</router-links>
                <router-links class='link' to='#'>Film Reviews</router-links>
                <router-links class='link' to='#'>Create Review</router-links>
                <router-links class='link' to='#'>Login/Register</router-links>
            </ul>
        </transition>     

    </header>
</template>

<script>
    import menuIcon from '../assets/Icons/bars-regular.svg';

    export default{
        name:'Navigation',
        components:{
           menuIcon
        },
        data() {
        return{
            mobile: null,
            mobileNav: null,
            windowWidth: null, 
        };
    },
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods:{
        checkScreen(){
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 770){
                this.mobile = true;
                return
            }
            this.mobile = false;
            this.mobileNav = false;
            return
        },
        toggleMobileNav(){
            this.mobileNav = !this.mobileNav;
        }
    }
    };
    
</script>

<style lang='scss' scoped>
header{
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);
    z-index: 99;
}
.link{
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
}
.link:hover{
    color:red
}
nav{
    display:flex;
    padding:15px 0;
    .branding{
        display: flex;
        align-items: center;
        .header{
            font-weight: 600;
            font-size: 20px;
            text-decoration: none;
            color: red
        }
    }
    .nav-links{
        position: relative;
        display: flex;
        flex: 1;
        align-items:center;
        justify-content: flex-end;
        ul{
            margin-right: 32px;
            
            .link{
                margin-right: 32px;
            }
            .link:last-child{
                margin-right: 0;
            }
        }
    }
}
.menu-icon{
    cursor: pointer;
    position: absolute;
    top:20px;
    right:30px;
    height:25px;
    width:auto;
    }
.mobile-nav{
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top:0;
    left: 0;

    .link{
    padding: 15px 0;
    color: #fff;
    &:hover{
        color: red;
    }
}
}    

.mobile-nav-enter-active,
.mobile-nav-leave-active{
    transition: all 2s ease;
}
.mobile-nav-enter{
    transform: translateX(-250px);
}
.mobile-nav-enter-to{
    transform: translateX(0px);
    
}
.mobile-nav-leave-to{
    transform: translateX(-250px);
}

</style>