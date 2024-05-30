<template>
    <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true
        };
    },
    mounted() {
        window.addEventListener('load', () => {
            this.loading = false; 
        });
    }
};
</script>

<style>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent overlay */
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    /* Spinner border color */
    border-top: 4px solid #ffffff;
    /* Spinner top border color */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    /* Spin animation */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
