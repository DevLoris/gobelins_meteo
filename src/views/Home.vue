<template>
  <div class="home">
    <Meteo v-bind:actual="actual"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Meteo from '@/components/Meteo.vue'
import location from '../tools/Location'
import MeteoItem from '../classes/MeteoItem'

export default {
  name: 'home',
  created: function () {
      this.location = location;
      this.location.init();

      if(this.current_meteo_selector != "") {
          this.loadMeteo(this.current_meteo_selector);
      }
  },
  data: function() {
      return {
          location: null,
          actual: null
      };
  },
    watch: {
        current_meteo_selector: {
            handler: function (val, oldval) {
                if(val != oldval)
                    this.loadMeteo(this.current_meteo_selector);
            }
        },
      location: {
          //Quand les coordonnées changent, on va faire un appel aux API pour récupérer la nouvelle météo
          handler: function (val, oldVal) {
              if(val != null && val.lat) {
                  if(this.current_meteo_selector == "") {
                      this.setCurrentMeteo(val.getPosition());
                      this.loadMeteo(val.getPosition());
                  }
              }
          },
          deep: true
      }
    },
  components: {  Meteo  },
  computed:{
      ...mapState(['current_meteo_selector', 'cache', 'cached_weather'])
  },
  methods:{
      loadMeteo(coords) {
          if(!coords)
              return;
          if(!this.cached_weather.hasOwnProperty(coords)) {
              let item = new MeteoItem();
              item.init(coords, (e) => {
                  this.addCache({coords: coords, meteo: e});
              });
              this.actual = item;
          }
          else
              this.actual = this.cached_weather[coords];
      },
      ...mapMutations(['setMeteoSelector','setCurrentMeteo', 'addCache'])
  }
}
</script>
