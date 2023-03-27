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
                        <router-link class="link" :to="{ name: 'home'}" >Privacy policy</router-link>
                        <router-link class="link" :to="{ name: 'home'}" >Cookie policy</router-link>
                    </ul>
                </div>
                <div class="col-3">
                    <p><span id="date">{{ this.addDate() }}</span> &#169; | All Rights Reserved</p> <br> 
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

<style lang="scss" scoped>
footer{
    margin-top: auto;
    padding: 100px 25px;
    background-color: #303030;
    .container{
        display: flex;
        gap: 12px;

        .col-, .col-2, .col-3{
            display: flex;
            flex-direction: column;
        }
    }
}

@media (max-width: 768px){
    footer{
        display: flex;
        flex-direction: column
    }
}
</style>

