<template>
  <div >
    <div id="noweather" v-if="!actual">
      <div id="wrapper">
        <svg width="100%" height="100%" viewBox="0 0 1080 1080" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path id="goute" d="M491.218,235c55.683,226.771 -107.677,303.978 -107.677,453.541c0,86.352 70.107,156.459 156.459,156.459c86.352,0 156.459,-70.107 156.459,-156.459c0,-149.563 -102.621,-305 -205.241,-453.541Z" style="fill:url(#_Linear1);"/><path id="cloud" d="M547.882,454.045c-1.064,2.474 -17.589,-32.952 -17.589,-32.952c0,0 -35.093,-81.776 -139.57,-64.516c-61.852,10.218 -81.148,74.621 -83.171,132.468c-0.083,2.377 -84.257,2.437 -95.161,64.334c-9.935,56.395 -16.822,129.048 110.491,123.621c159.193,-6.786 470,0 470,0c0,0 76.372,0.116 79.386,-63.448c3.363,-70.913 -43.182,-79.377 -79.386,-97.173c-13.516,-6.644 3.958,-76.759 -26.123,-115.747c-12.774,-16.557 -59.698,-43.402 -85.877,-44.055c-68.77,-1.717 -113.394,51.895 -133,97.468Z" style="fill:url(#_Linear2); visibility:hidden"/><defs><linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(312.917,0,0,610,383.541,540)"><stop offset="0" style="stop-color:#a8ff78;stop-opacity:1"/><stop offset="1" style="stop-color:#78ffd6;stop-opacity:1"/></linearGradient><linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(233.74,0,0,97.9144,296.552,405.088)"><stop offset="0" style="stop-color:#a8ff78;stop-opacity:1"/><stop offset="1" style="stop-color:#78ffd6;stop-opacity:1"/></linearGradient></defs></svg>
      </div>

    </div>
    <div id="weather" v-if="actual">
      <div class="card card--center">
        <div class="meteo">
          <div class="meteo--temperature">{{ actual.temperature }} °C</div>
          <div class="meteo--temps">{{ actual.condition.text  }}</div>
        </div>
        <img v-bind:src="'img/svg/' + actual.getIcon() + '.svg'" class="icon-meteo">
      </div>
      <div class="card card--right">
        <div class="location">
          {{ actual.city }} - {{ actual.country }}
        </div>
      </div>
      <a v-if="actual.getPlaylist()" v-bind:href="actual.getPlaylist().url" target="_blank"><div class="card card--spotify card--column">
        <div class="playlist">
          <span class="playlist--sub">Un temps, une playlist !</span>
          <br>
          <strong>{{ actual.getPlaylist().name }}</strong>
        </div>
      </div></a>
      <div class="card-separator"></div>
      <div class="card card--center card--column">
        <MeteoForecast v-for="(forecast, key) in actual.forecast" :key="key" v-bind:data="forecast"/>
      </div>
  </div>
  </div>
</template>

<script>
import MeteoForecast from '@/components/MeteoForecast.vue'

export default {
  name: 'Meteo',
  props: ['msg', 'actual'],
  components: {
      MeteoForecast
  }
}
</script>