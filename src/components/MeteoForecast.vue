<template>
  <div class="forecast">
    <div class="forecast--data">
      <div class="forecast--data--when">
        {{ data.getName() }}
      </div>
      <div class="forecast--data--temps">
        {{ data.condition.text }}
      </div>
    </div>
    <div class="forecast--temperature">
      {{ data.min_temperature }} -  {{ data.max_temperature }}°
    </div>
    <img v-bind:src="'img/svg/' + data.getIcon() + '.svg'" class="forecast--icon">
  </div>
</template>

<script>
export default {
  name: 'MeteoForecast',
  props: ['data']
}
</script>