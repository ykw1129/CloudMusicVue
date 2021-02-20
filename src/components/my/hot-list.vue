<template>
    <div class="hot-list">
        <div class="list-box">

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped >
.hot-list{
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
    top: 1.2rem;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    .list-box{
        background-color: #fff;
        height: 30%;
        border-radius:  0 0 8px 8px;
    }
}
</style>
