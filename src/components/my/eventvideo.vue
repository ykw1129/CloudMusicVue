<template>
    <div id="eventvideo">
        <van-image src="https://p3.music.126.net/-jXdovptMqKbGTqNEyuSNQ==/109951164845855380.jpg" type="contain" height="45" width="45" round />
        <div class="event-main">
            <p>这是我的名字</p>
            <p>这是日期</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
#eventvideo{
    height: 300px;
    padding: 20px 16px;
    display: flex;
    flex-direction: row;
    .event-main{
        p{
            padding: 6px;
        &:nth-child(1){
            color: #666666;
            font-size: 12px;
        }
        &:nth-child(2){
            color: #999999;
            font-size: 6px;
        }
        }

    }
}

</style>
