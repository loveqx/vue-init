<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{food}}</span>
  </div>
</template>
<script>
  export  default {
    props: {
      food: {
        type: String,
        default: 'apple'
      }
    }
  }
</script>
