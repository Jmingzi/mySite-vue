<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',

    components: {
      // Message
    }
  }
</script>

<style lang="scss">
  html,body,#app {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  @font-face {
    font-family: interface;
    src: url('./assets/font/interface.ttf');
  }
  .w200 {
    width: 200px;
  }
  .hover-color:hover {
    color: #333;
  }
  .hover-bg {
    transition: background-color .3s;
    &:hover {
      background-color: #f1f1f1;
    }
  }
  .font-bold {
    font-weight: bold;
  }
  .w650 {
    width: 650px;
  }
  .disable-mask {
    overflow: hidden;
    background-color: rgba(0, 0, 0, .1);
  }
  .btn.px-btn {
    padding: 4px 15px;
    border-radius: 2px;
  }
  input:disabled {
    background-color: #fff;
  }

  .panel-title {
    color: #666;
    background-color: #f9f9f9;
  }
  .line-wrap {
    position: absolute;
    width: 1px;
    height: 100px;
    margin-top: 5px;

    &:hover {
      z-index: 100;
    }

    $lineR: 5px;
    $ligent: 10px;

    .progress-text {
      width: 60px;
      line-height: 1;
      margin-top: 10px;
      background-color: #fff;
      padding: 2px 5px;
      color: #999;
      cursor: pointer;

      &.start {
        margin-left: -10px;
      }
      &.end {

      }
    }

    .line {
      display: inline-block;
      border-right: 1px #ccc dashed;
      position: relative;

      &.start {
        width: 0;
        text-align: left;
      }

      &.middle {
        width: 30px;
        text-align: center;
        &:after,
        &:before {
          left: -$lineR/2 + 29px;
        }
      }

      &.end {
        width: 60px;
        text-align: right;
        &:after,
        &:before {
          left: $lineR/2 + 54px;
        }
      }

      &.l {
        height: 50px;
      }

      &.s {
        height: 10px;
      }

      &:after,
      &:before {
        position: absolute;
        content: '';
        width: $lineR;
        height: $lineR;
        border: 1px #ccc solid;
        bottom: -$lineR - 5px;
        left: -$lineR/2;
        border-radius: $lineR*3;
        box-sizing: content-box;
      }
      &:after {
        animation: ligent 1s linear infinite;
      }
    }

    @keyframes ligent {
      from {
      }
      to {
        width: $ligent;
        height: $ligent;
        transform: translate(-($ligent - $lineR) / 2, ($ligent - $lineR) / 2);
      }
    }
  }
</style>
