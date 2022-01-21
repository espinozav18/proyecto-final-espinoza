<template>
  <v-card 
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico
        <div class="my-2 text-subtitle-1">
        $ 25
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
    
    export default {
        name:"Productos",
        props:{
            lista:{type:Object}
        }
    }
</script>

<style lang="scss" scoped>

</style>
