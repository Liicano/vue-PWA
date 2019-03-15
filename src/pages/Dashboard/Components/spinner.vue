<template>
  <div>
    <div style="margin-top: 50%;" v-if="inMobile">
      <center>
        <breeding-rhombus-spinner :animation-duration="500" :size="120" color="#01C73E"/>
        <!-- <small>Cargando...</small> -->
      </center>
    </div>

    <div v-else style="margin-top: 15%;">
      <center>
        <breeding-rhombus-spinner :animation-duration="500" :size="120" color="#01C73E"/>
        <!-- <small>Cargando...</small> -->
      </center>
    </div>
  </div>
</template>

<script>
import { BreedingRhombusSpinner } from 'epic-spinners';
import isMobile from '../../../assets/js/isMobile.js';

export default {
  data() {
    return {
      inMobile: null
    };
  },
  components: {
    BreedingRhombusSpinner
  },
  mounted() {
    this.inMobile = isMobile;
  }
};
</script>

<style>
#loading {
  -webkit-animation: rotation 0.5s infinite linear;
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}

#spin {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30em;
  height: 18em;
  margin-top: -9em; /*set to a negative number 1/2 of your height*/
  margin-left: -15em; /*set to a negative number 1/2 of your width*/
}
</style>
