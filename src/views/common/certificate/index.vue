<template>
  <BScroll class="certificate">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <!--<li></li>-->
      <li></li>
    </ul>
  </BScroll>
</template>

<script>
import BScroll from '@/components/BScroll/BScroll'

export default {
  name: 'certificate',
  components: {
    BScroll
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/mixins';

.certificate {
  padding: 0.16rem 0.16rem 0.16rem 0.15rem;
  height: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 1.62rem;
      height: 2rem;
      background-size: 100% 100%;
      margin-bottom: 0.16rem;
      &:nth-child(1) {
        @include bg-image('1');
      }
      &:nth-child(2) {
        @include bg-image('2');
      }
      &:nth-child(3) {
        @include bg-image('3');
      }
      &:nth-child(4) {
        @include bg-image('5');
      }
      /* &:nth-child(5) {
        @include bg-image('5');
      }*/
      &:nth-child(odd) {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
