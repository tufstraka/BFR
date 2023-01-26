<template>
    <footer>
        <div class="container">
                <div class="col-1">
                    <router-link class="header" :to="{name:'home'} ">Biased Film Reviews</router-link>
                    <ul>
                        <li>
                            <a href="#"><youTube class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><twitter class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><instagram class="svg-icon"/></a>
                        </li>
                        <li>
                            <a href="#"><linkedin class="svg-icon"/></a>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul>
                        <router-link class="link" :to="{ name: 'home'}" >Home</router-link>
                        <router-link class="link" :to="{ name: 'reviews'}" >Reviews</router-link>
                        <router-link class="link" :to="{ name: 'home'}" >News</router-link>
                        <router-link class="link" :to="{ name: 'home'}" >Blog</router-link>
                    </ul>
                </div>
            <div class="col-3">
               <p><span id="date">{{ this.addDate() }}</span> &#169; | All Rights Reserved</p> <br>
                <p>Made with ❤️ by <a href='#'>Kadima</a></p> 
            </div>
        </div>   
       
    </footer>
     
</template>

<script>
    import youTube from '../assets/Icons/youtube-brands.svg';
    import twitter from '../assets/Icons/twitter-brands.svg';
    import instagram from '../assets/Icons/instagram-brands.svg';
    import linkedin from '../assets/Icons/linkedin-brands.svg';

    export default{
        name:'footer-vue',
        components:{
            youTube,
            twitter,
            instagram,
            linkedin
        },

        methods: {
            addDate(){

            const today = new Date();
            const year = today.getFullYear();
            return year;

            },
        },
    }
</script>

<style  scoped>
.container{
    display: flex
}
.col-1, col-2, col-3{
    display: flex;
    flex-direction: column;
}
</style>

