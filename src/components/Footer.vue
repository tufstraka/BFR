<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{name:'home'} ">Biased Film Review</router-link>
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
                        <router-link class="link" :to="{ name: 'home'}" >Film</router-link>
                        <router-link class="link" :to="{ name: 'reviews'}" >Books</router-link>
                        <router-link class="link" :to="{ name: 'home'}" >News</router-link>
                        <router-link class="link" :to="{ name: 'home'}" >Games</router-link>
                    </ul>
                </div>
            </div>
            <div class="right">
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
        flex-direction: column;
        gap: 12px;
        @media(min-width: 800px){
            flex-direction: row;
            
        }
        > div{
            display: flex;
            flex: 1;
        }
        .left{
            gap: 12px;
            color: #fff;
            display: flex;
            flex-direction: column;
            
            align-items: center;
            @media(min-width: 800px){
                flex-direction: row;
                align-items: initial;
                
            }
            .header{
                
                font-size: 24px;
                color: #fff;
                text-decoration: none;
                font-weight: 600;
                &:hover{
                    transition: all 2s ease;
                    color: red;
                }
            }
            ul{
                gap: 16px;
                list-style: none;
                display: flex;
                
            }
            .col-1,
            .col-2{
                gap: 22px;
                display: flex;
                flex: 1;
            }
            .col-1{
                
                flex-direction: column;
                ul{
                    margin-top:auto;
                    gap: 50px;
                    li{
                        display: flex;
                        align-items:center;
                        .svg-icon{
                            width: 20px;                        
                            height:auto;                            
                            color: #fff
                        }
                    }
                }
            }
            .col-2{
                display: flex;
                justify-content: center;
                ul{
                height: 100%;
                justify-content: center;
                flex-direction: row;
                flex-wrap: wrap;
                @media(min-width:800px){
                   // flex-direction: column
                }
                .link{
                    font-size: 16px;
                    font-weight: 500;
                    text-decoration: none;
                    color: #fff;
                }
                }
            }
           
        }
    }
     .right{
                gap: 2px;
                align-items: center;
                flex-direction: column;
                text-align: center;
                margin-bottom: 65px;
                
                @media(min-width:800px){
                    //align-items: flex-end;
                    gap:0;
                }
                p{
                    margin-top: auto;
                    color: #fff
                     
                }
                a{
                    text-decoration: none;
                    color: blue;
                }
            }
}
</style>




