import Vue from 'vue'
import Vuex from 'vuex'
import MeteoFavorite from './classes/MeteoFavorite';
import MeteoItem from './classes/MeteoItem';
import LocalStore from './tools/LocalStore';
import STORAGE_KEYS from './tools/LocalStoreKeys';
import LANG from './tools/Lang'

Vue.use(Vuex);

var cache = LocalStore.pull(STORAGE_KEYS.CACHED_WEATHER, {});
var cached_data= {};

let i = 0;
for (i in cache) {
    if(cache[i].date == new Date().getDay() + "-" + new Date().getMonth() + "-"+new Date().getFullYear()) {
        let Item = new MeteoItem();
        Item.fromCache(cache[i]);
        cached_data[i] = Item;
    }
}

export default new Vuex.Store({
  state: {
      preferences :  LocalStore.pull(STORAGE_KEYS.FAVORITES, []),
      cached_weather:  cached_data,
      current_meteo_selector: LocalStore.pull(STORAGE_KEYS.CURRENT_WEATHER, ""),
      language_line: LANG[LocalStore.pull(STORAGE_KEYS.LANG, "fr")]
  },
    getters: {
        preferences : state => state.preferences,
        current_meteo_selector : state => state.current_meteo_selector,
        cache: state => state.cached_weather,
        cached_weather: state => state.cached_weather,
        language_line : state => state.language_line
    },
  mutations: {
      /**
       * Add a location to favorites
       * @param state
       * @param data
       */
    addToFavorite(state, data) {
        state.preferences.push(new MeteoFavorite(data.name, data.lat, data.lon));
        LocalStore.push(STORAGE_KEYS.FAVORITES, state.preferences);
    },
      /**
       * Delete location from favorites
       * @param state
       * @param key
       */
    deleteFromFavorites(state, key) {
        state.preferences.splice(key, 1);
        LocalStore.push(STORAGE_KEYS.FAVORITES, state.preferences);
    },
      /**
       * Change language of application
       * @param state
       * @param new_language
       */
    chooseLanguage(state, new_language) {
        if(LANG[new_language] !== undefined) {
            state.language_line = LANG[new_language];
            LocalStore.push(STORAGE_KEYS.LANG, new_language);
        }
    },
      /**
       * Add meteo to cache
       * @param state
       * @param data
       */
    addCache(state, data) {
        if(data.coords && data.meteo) {
            state.cached_weather[data.coords] = data.meteo;
            LocalStore.push(STORAGE_KEYS.CACHED_WEATHER, state.cached_weather);
        }
    },
      /**
       * Set current meteo selector
       * @param state
       * @param coords
       */
    setCurrentMeteo(state, coords) {
        state.current_meteo_selector = coords;
        LocalStore.push(STORAGE_KEYS.CURRENT_WEATHER, state.current_meteo_selector);
    },
      /**
       * Reset current meteo selector
       */
    resetCurrentMeteo(state) {
        state.current_meteo_selector = "";
          LocalStore.delete(STORAGE_KEYS.CURRENT_WEATHER);
      }
  },
  actions: {

  }
})
