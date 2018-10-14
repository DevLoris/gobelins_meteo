<template>
  <div class="forecast">
    <div class="forecast--data">
      <div class="forecast--data--when">
        {{ language_line[data.getName()] }}
      </div>
      <div class="forecast--data--temps">
        {{ data.condition.text }}
      </div>
    </div>
    <div class="forecast--temperature">
      {{ data.min_temperature }} -  {{ data.max_temperature }}°
    </div>
    <img v-bind:src="'img/svg/' + data.getIcon() + '.svg'" class="forecast--icon" title="Icone de Meteo" v-bind:alt="data.getIcon()">
  </div>
</template>

<script>
    import { mapState } from 'vuex'

export default {
  name: 'MeteoForecast',
  props: ['data'],
    computed:{
        ...mapState([ 'language_line']),
    }
}
</script>