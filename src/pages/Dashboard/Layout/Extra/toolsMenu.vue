<template>
  <div class="user">
    <div class="photo">
      <img src="data:image/jpeg;base64,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" alt="">
    </div>
   
    <div class="user-info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click.stop="toggleMenu" @click.capture="clicked">
           <span>
             Herramientas
             <b class="caret"></b>
          </span>
           
      </a>

        <collapse-transition>
            <div v-show="!isClosed">
              <ul class="nav" >
                <slot>
                  <li>
                    <a href="#vue">
                      <md-icon>monetization_on</md-icon>
                      <span class="sidebar-normal">Moneda</span>
                    </a>
                  </li>
                  <li>
                    <a href="#vue">
                      <md-icon>euro_symbol</md-icon>
                      <span class="sidebar-normal">Impuesto</span>
                    </a>
                  </li>
                  <li>
                    <a href="#vue">
                      <md-icon>description</md-icon>
                      <span class="sidebar-normal">Items</span>
                    </a>
                  </li>
                 
                </slot>
              </ul>
          </div>
        </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
// import { mapGetters } from 'vuex';

export default {
  components: {
    CollapseTransition
  },
  props: {
    
  },
  data() {
    return {
       isClosed: true,
    };
  },
  computed: {
    
  },
  mounted() {
    
  },
  methods: {
     clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    }
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
.photo {
  background-color: white;
}
</style>
