<template>
    <div :class="{'hot-list':true,'hide':isHide}">
        <div class="list-box">
          <p>最近热搜</p>
            <ul >
              <li @click="sendKeyword(item.first)" v-for="(item,index) in List" :key="index">
                <span>{{index+1}}</span>{{item.first}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    List: {
      type: Array
    },
    isHide: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  methods: {
    sendKeyword (keyword) {
      this.$emit('get-keyword', keyword)
    }
  }
}
</script>

<style lang="less" scoped >
@red:#d64f44;
.hot-list{
    overflow: hidden;
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
    top: 1.2rem;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    height: 100%;
    transition: all 0.7s;
    &.hide{
      transition: all 0.7s;
      height: 0;
    }
    .list-box{
        transition: all 0.7s;
        background-color: #fff;
        border-radius:  0 0 8px 8px;
        padding: 0.5rem .08rem;
        p{
          color: @red;
          text-align: center;
          font-size: .5rem;
        }
        ul{
          padding: .2rem 1.5rem;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          li{
            display: inline-block;
            width: 40%;
            margin: .2rem;
            font-size: .35rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span{
              color: @red;
              width: 0.4rem;
              display: inline-block;
              font-size: .30rem;
            }
          }
        }
    }
}
</style>
