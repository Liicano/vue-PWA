<template>
  <div>
    <!-- <div>
      <label>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <button class="green btn btn-success" @click="addMarker">Add</button>
      </label>
      <br>
    </div>
    <br>-->
    <v-card>
      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 200px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{currentAddress.principal}}</div>
          <span class="grey--text">{{currentAddress.secondary}}</span>
        </div>
      </v-card-title>

      <v-card-actions></v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <div class="md-layout">
            <div class="md-layout-item md-size-80 md-small-size-100">
              <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
            </div>

            <div class="md-layout-item md-size-20"></div>
          </div>
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
import isMobile from '../../../assets/js/isMobile.js';

export default {
  name: 'GoogleMap',
  props: {
    initial: null,
    res_name: null,
    res_second_level: null
  },
  data() {
    return {
      // default to Montreal to keep it simple
      center: { lat: null, lng: null },
      markers: [],
      places: [],
      currentPlace: null,
      isMobile: isMobile,
      show: true,
      addressValue: null,
      currentAddress: {
        principal: null,
        secondary: null
      }
    };
  },

  mounted() {
    this.geolocate();
    this.getInitialValue();
    console.log('this.addressValue -> ', this.addressValue);
    console.log('this.initial -> ', this.initial);
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      console.log(place);
      this.currentPlace = place;
    },
    addMarker(current) {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };

        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        // this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    getInitialValue() {
      if (this.addressValue != null) {
        this.currentAddress.principal =
          this.addressValue[0] + ', ' + this.addressValue[1];
        this.currentAddress.secondary =
          this.addressValue[2] + ', ' + this.addressValue[3];
      } else {
        if (this.initial != null) {
          this.address = this.initial.split(',');
          console.log(this.address);

          this.currentAddress.principal =
            this.address[0] + ', ' + this.address[1];
          this.currentAddress.secondary =
            this.address[2] + ', ' + this.address[3];
        }
      }
    }
  },
  watch: {
    currentPlace: function(val) {
      this.addressValue = val.formatted_address.split(',');
      this.addMarker();
      this.getInitialValue();
      this.$emit('setAddress', {
        name: this.res_name,
        second_level: this.res_second_level,
        value: val.formatted_address
      });
    }
  }
};
</script>