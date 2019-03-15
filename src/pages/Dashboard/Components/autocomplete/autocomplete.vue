<template>
  <div class="Typeahead">
    <md-snackbar
      style="height: 2%;"
      md-position="center"
      :md-duration="99999"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <div class="md-layout">
        <div class="md-layout-item md-size-50" style="padding:0">
          <span style="color: white">Deseas agregar a
            <br>
            <b>{{query}}</b>?
          </span>
        </div>
        <div class="md-layout-item md-size-25">
          <center>
            <v-btn flat small color="red" @click="showSnackbar = false">NO</v-btn>
          </center>
        </div>
        <div class="md-layout-item md-size-25">
          <center>
            <v-btn flat small color="green" @click="onEmpty()">SI</v-btn>
          </center>
        </div>
      </div>
    </md-snackbar>
    <!-- <input
      type="text"
      md-inline
      class="autocompleteE"
      :placeholder="config.placeholder_value"
      autocomplete="off"
      v-model="query"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.esc="reset"
      @blur="reset"
      @keyup="update($event.target)"
    >-->
    <div v-if="config.itemType == 'items'" style="display:contents">
      <v-text-field
        id="noMaterialize"
        solo
        color="green"
        background-color="grey lighten-2"
        :label="config.placeholder_value"
        append-icon="search"
        autocomplete="off"
        v-model="query"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.esc="reset"
        @blur="reset"
        @keyup="update($event.target)"
      ></v-text-field>
    </div>
    <div v-else style="display:contents">
      <v-text-field
        id="noMaterialize"
        outline
        color="green"
        background-color="grey lighten-2"
        :label="config.placeholder_value"
        prepend-inner-icon
        autocomplete="off"
        v-model="query"
        @keydown.down="down"
        @keydown.up="up"
        @keydown.esc="reset"
        @blur="reset"
        @keyup="update($event.target)"
      ></v-text-field>
    </div>

    <ul v-if="hasItems" style="color:black; min-width: 90%;" :md-duration="500">
      <li
        v-for="(item, index) in items"
        :key="item._id"
        :class="activeClass(index)"
        @mousemove="setActive(index)"
        @mousedown="hit"
      >
        <div align="left" v-if="items.length > 0">
          <small>{{(item)?item[config.principalAtribute]: 'sin registros'}}</small>

          <br v-if="config.secondaryAtribute != ''">
          <small
            v-if="config.secondaryAtribute != ''"
            style="color:blue;"
          >{{(item[config.secondaryAtribute])?item[config.secondaryAtribute]: ''}}</small>
          
          <small
            v-if="config.optionalMultipleAtribute != ''"
            class="pull-right"
            style="color:gray;"
          >{{(item[config.optionalMultipleAtribute[1]] && item[config.optionalMultipleAtribute[1]][config.optionalMultipleAtribute[2]])?item[config.optionalMultipleAtribute[1]][config.optionalMultipleAtribute[2]]:''}}</small>
        </div>
      </li>
    </ul>

    <ul
      v-if="(!hasItems) && (typeCheck) && (isDirty)"
      v-show="showEmpty"
      style="color:black; min-width: 90%;"
    >
      <li v-if="loading">
        <center>
          <md-progress-spinner
            class="md-accent"
            style="color: #fafafa !important;"
            md-mode="indeterminate"
            :md-stroke="3"
          ></md-progress-spinner>
          <br>
          <small>Buscando...</small>
        </center>
      </li>
      <!-- <li v-if=" !loading && !isMobile" @mousedown="onEmpty">
        <span>
          <center>
            <small>Sin registros para "{{query}}"</small>
            <br>
            <small style="color:blue;">¿Crear como nuevo?</small>
          </center>
        </span>
      </li>-->
    </ul>
  </div>
</template>

<script>
import VueTypeahead from './main.js';
import isMobile from '../../../../assets/js/isMobile.js';

export default {
  extends: VueTypeahead,

  props: {
    config: {}
  },

  data() {
    return {
      showSnackbar: false,
      isMobile: false,
      src: '',
      limit: 5,
      minChars: 2,
      showEmpty: true,
      valueName: null,
      local_data: null,
      selectedOpt: null,
      inCreator: null,
      pp: null
    };
  },

  methods: {
    onHit(item) {
      let params = {
        name: this.config.res_name,
        value: item,
        second_level_res: this.config.second_level_res
          ? this.config.second_level_res
          : null,

        isClick: true
      };

      this.showEmpty = false;
      this.$emit('clickOnItem', params);
      this.selectedOpt = item.name;
      this.query = this.selectedOpt;

      // console.log('AQUI TERMINA EL ONHIT');
    },
    onEmpty() {
      this.showEmpty = false;
      this.$emit('clickOnCreate', this.query);
      this.selectedOpt = this.query;
      this.showSnackbar = false;
    }
  },

  mounted() {
    this.pp = this.$props;
    this.local_data = this.config;
    this.src = this.config.searchRoute;
    this.query = this.config.initialValue;
    this.isMobile = isMobile;
  },

  computed: {},

  // watch: {
  //   local_data: function(val, oldVal) {
  //     console.log('cambio dentro del AUTOCOMPLETEEEEEEEEEEE -> ', val);
  //     this.query = this.local_data.initialValue;
  //   },
  //   selectedOpt(val) {
  //     this.query = val;
  //   },
  //   deep: true,
  //   immediate: true
  // }

  watch: {
    config: {
      handler(val) {
        // console.log('cambio dentro del AUTOCOMPLETEEEEEEEEEEE -> ', val);
        this.query = this.local_data.initialValue;
      },
      deep: true
    },
    selectedOpt(val) {
      this.query = val;
    }
  }
};
</script>



<style scoped>
.Typeahead {
  position: relative;
}

.fa-times {
  cursor: pointer;
}

i {
  float: right;
  position: relative;
  top: 30px;
  right: 29px;
  opacity: 0.4;
}

ul {
  position: absolute;
  padding: 0;
  margin-top: 8px;
  min-width: 100%;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
}

li {
  padding: 10px 16px;
  /* border-bottom: 1px solid #ccc; */
  cursor: pointer;
}

li:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

li:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
}

span {
  display: block;
  color: #2c3e50;
}

.active {
  background-color: #3aa373;
}

.active span {
  color: white;
}

.name {
  font-weight: 700;
  font-size: 18px;
}

.screen-name {
  font-style: italic;
}
</style>
