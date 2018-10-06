<template>
  <div id="search">
    <div class="card">
      <input class="search--autocomplete" v-model="query" v-on:input="queryMade">
    </div>
    <transition-group tag="div" id="group" name="list">
      <div v-for="(result, key) in search_result.results" :key="key+'-r'"
           class="card card--place card--column"
           v-bind:favorited=" listHas(preferences, result.name)  " >
        <p class="card--place_legend">Recherche</p>
        <p class="card--place_name">{{ result.name }}</p>
        <div class="button-list">
            <button class="btn" v-on:click="viewMeteo(result.lat, result.lon)">Voir</button>
            <button v-if="!listHas(preferences, result.name)" class="btn" v-on:click="addToFavorite(result)">Ajouter favoris</button>
        </div>
      </div>

      <div v-for="(preference, key) in preferences" :key="key" class="card card--place card--column card--favorite">
        <p class="card--place_legend">Lieu favori</p>
        <p class="card--place_name">{{ preference.name }}</p>
        <div class="button-list">
          <button class="btn" v-on:click="viewMeteo(preference.lat, preference.long)">Voir</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import Search from '../classes/Search'

    export default {
        name: 'search',
        created: function () {
        },
        data: function() {
            return {
                search_result: new Search(),
                query: "",
                last_input : 0,
            };
        },
        watch: {
        },
        components: {
        },
        computed:{
            ...mapState(['preferences']),
        },
        methods:{
            ...mapMutations([ 'addToFavorite','setCurrentMeteo']),
            queryMade () {
                let $lenght =  this.query.length;
                if($lenght <= 3)
                    return ;

                let $now = Date.now();

                if($now - this.last_input >= 150)
                    this.search_result.init(this.query);

                this.last_input =$now;
            },

            viewMeteo(lat,long) {
                this.$router.push('/');
                this.setCurrentMeteo(lat + ',' + long);
            },

            listHas : (list, name) => {
                let has = false;
                list.forEach((e) => {
                    if(e.name == name) {
                        has = true;
                    }
                });
                return has;
            }
        }
    }
</script>
