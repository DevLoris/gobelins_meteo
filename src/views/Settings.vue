<template>
  <div class="about">
    <p>
      <div v-for="(preference, key) in preferences" :key="key" class="card card--place card--column card--favorite">
      <p class="card--place_legend">Lieu favori</p>
      <p class="card--place_name">{{ preference.name }}</p>
    <div class="button-list">
      <button class="btn" v-on:click="viewMeteo(preference.lat, preference.long)">Voir</button>
      <button class="btn" v-on:click="deletePreferences(key)">Supprimer</button></div>
    </div>
    </p>
  </div>
</template>


<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name:'Profile',
        computed:{
            ...mapState(['preferences'])
            // Now you can read the name by using this.name
        },
        methods:{
            ...mapMutations(['deletePreferences','setCurrentMeteo']),
            viewMeteo(lat,long) {
                this.$router.push('/');
                this.setCurrentMeteo(lat + ',' + long);
            }
        }
    };

</script>