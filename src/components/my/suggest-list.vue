<template>
    <div :class="{'suggest-list':true,hide:isHide}">
           <ul>
               <li @click="sendKeyword(item.keyword)" v-for="(item,index) in suggestList" :key="index" >
                   {{item.keyword}}
               </li>
           </ul>
    </div>
</template>

<script>
export default {
  props: {
    isHide: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    suggestList: {
      type: Array
    }
  },
  methods: {
    sendKeyword (keyword) {
      this.$emit('load-keyword', keyword)
    }
  }
}
</script>

<style lang="less" scoped>
@red:#d64f44;
.suggest-list{
    border: 1px solid #DCDFE6;
    overflow: hidden;
    position: absolute;
    left:15%;
    right: 0;
    top: 1.2rem;
    z-index: 9999;
    background-color: #fff;
    display: block;
    transition: all 0.7s;
    z-index: 9999;
    &.hide{
      border: 1px solid transparent;
      transition: all 0.7s;
      display: none;
    }
    ul{
        li{
            padding: .2rem .1rem;
            font-size: .4rem;
            border-bottom: 1px solid #EBEEF5;
            &:hover{
                color: @red;
            }
        }
    }
}
</style>
