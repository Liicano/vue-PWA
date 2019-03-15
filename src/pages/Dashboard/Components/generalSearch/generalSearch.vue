<template>
  <div class="Typeahead" style="padding:0 !important; margin: 0 !important;">
    <input
      type="text"
      md-inline
      class
      :placeholder="placeholder_value"
      autocomplete="off"
      v-model="query"
      @keydown.down="down"
      @keydown.up="up"
      @keydown.esc="reset"
      @input="update"
    >

    <br>
    <br>
    <small style="color:black;">Resultados</small>
    <md-divider></md-divider>

    <md-list class="md-triple-line md-dense" v-if="hasItems" style="width: 100%;">
      <md-list-item
        v-for="(item, index) in items"
        :key="item._id"
        :class="activeClass(index)"
        @mousemove="setActive(index)"
        @mousedown="hit"
      >
        <md-avatar class="md-avatar-icon">
          <md-icon>compare_arrows</md-icon>
        </md-avatar>

        <div class="md-list-item-text">
          <span>{{(item)?item.name: 'sin nombre'}}</span>
          <span class="text-warning">{{(item)?item.state: 'sin state'}}</span>
          <p>{{item.createdAt | shortDate}}</p>
        </div>
        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>

    <ul
      v-if="(!hasItems) && (typeCheck) && (isDirty)"
      v-show="showEmpty"
      style="color:black; min-width: 90%;"
    >
      <li v-if="loading">
        <center>
          <small>Buscando...</small>
        </center>
      </li>
      <li v-else @mousedown="onEmpty">
        <md-empty-state md-icon="not_interested" md-label="No se encontraron resultados">
          <md-button class="md-success md-raised">Crea una nueva venta</md-button>
        </md-empty-state>
      </li>
    </ul>
  </div>
</template>



<script>
import VueTypeahead from './main.js';
import api_routes from '../../../../config/api.js';
import api from '../../../../lib/api';
import spinner from '../spinner';

export default {
  extends: VueTypeahead,

  props: {
    itemType: '',
    initialValue: '',
    principalAtribute: '',
    secondaryAtribute: '',
    optionalMultipleAtribute: '',
    secondaryQuery: null,
    placeholder_value: ''
  },
  components: {
    spinner
  },
  data() {
    return {
      src: '',
      limit: 5,
      minChars: 1,
      showEmpty: true,
      valueName: null
    };
  },

  methods: {
    onHit(item) {
      let params = null;
      this.itemType == 'items'
        ? (params = { name: 'item', value: item })
        : this.itemType == 'users'
        ? (params = { name: 'client', value: item })
        : this.itemType == 'movements'
        ? (params = item)
        : (params = null);

      this.showEmpty = false;
      this.$emit('clickOnItem', params);
    },
    onEmpty() {
      this.showEmpty = false;
      this.$emit('clickOnCreate', this.query);
    }
  },
  created() {
    switch (this.itemType) {
      case 'items':
        this.src = api_routes.item.find + '/';
        break;
      case 'users':
        this.src = api_routes.user.find + '/';
        break;

      case 'movements':
        this.src = api + '/movements/find/';
        break;
      default:
        alert('¡NO ES UN AUTOCOMPLETE CON UNA OPCION VALIDA!');
    }
  },
  mounted() {
    this.query = this.initialValue;
  },

  watch: {
    initialValue: function() {
      this.query = this.initialValue;
    }
  }
};
</script>



<style scoped>
/* .Typeahead {
  position: relative;
} */

/* .fa-times {
  cursor: pointer;
} */

/* i {
  float: right;
  position: relative;
  top: 30px;
  right: 29px;
  opacity: 0.4;
} */

/* ul {
  position: absolute;
  padding: 0;
  margin-top: 8px;
  min-width: 100%;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.25);
  z-index: 1000;
} */

/* li { */
/* padding: 10px 16px; */
/* border-bottom: 1px solid #ccc; */
/* cursor: pointer; */
/* } */

/* li:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

li:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom: 0;
} */

/* span {
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
} */
</style>
