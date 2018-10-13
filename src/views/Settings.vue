<template>
  <div class="about">
    <h2>{{ language_line.language }}</h2>
    <button class="btn" v-on:click="chooseLanguage('fr')">Français</button> -
    <button class="btn" v-on:click="chooseLanguage('en')">English</button>
    <h2>{{ language_line.favorite }}</h2>
      <div v-for="(preference, key) in preferences" :key="key" class="card card--place card--column card--favorite">
      <p class="card--place_legend">{{ language_line.favorite_place }}</p>
      <p class="card--place_name">{{ preference.name }}</p>
    <div class="button-list">
      <button class="btn" v-on:click="viewMeteo(preference.lat, preference.long)">{{ language_line.view }}</button>
      <button class="btn" v-on:click="deletePreferences(key)">{{ language_line.delete }}</button></div>
    </div>
  </div>
</template>


<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name:'Settings',
        computed:{
            ...mapState(['preferences', 'language_line'])
        },
        methods:{
            ...mapMutations(['deletePreferences','setCurrentMeteo', 'chooseLanguage']),
            viewMeteo(lat,long) {
                this.$router.push('/');
                this.setCurrentMeteo(lat + ',' + long);
            }
        }
    };
</script>