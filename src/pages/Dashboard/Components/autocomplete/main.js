//  import { util } from 'vue'
import isMobile from '../../../../assets/js/isMobile'

export default {
  data() {
    return {
      items: [],
      query: '',
      finded: false,
      current: -1,
      loading: false,
      selectFirst: false,
      queryParamName: '',
      typeCheck: false,
      dirty: false

    }
  },

  computed: {
    hasItems() {
      return this.items.length > 0
    },

    isEmpty() {
      return !this.query
    },

    isDirty() {
      return !!this.query
    }
  },

  methods: {
    update(event) {
      // console.log("AQUI EMPIEZA EL FETCH!!!");
      this.query = event.value;
      // console.log(this.query);


      this.cancel()

      if (this.query == '' && this.isDirty) {
        return this.reset()
      }

      if (this.minChars && this.query.length < this.minChars) {
        return
      }

      this.loading = true

      this.fetch().then((response) => {
        if (response && this.query != '') {

          let data = response.data.docs
          data = this.prepareResponseData ? this.prepareResponseData(data) : data
          this.items = this.limit ? data.slice(0, this.limit) : data
          console.log("this.items -> ", this.items);
          // console.log("this.hasItems -> ", this.hasItems);
          this.current = -1
          this.loading = false

          if (this.selectFirst) {
            this.down()
          }
        }
        if (!this.hasItems && this.isDirty && this.config.itemType != 'items') {
          this.showSnackbar = true;
        } else {
          this.showSnackbar = false;
        }
      })
      this.showEmpty = true;
      this.typeCheck = true;
      // this.dirty = true;


      if (this.config.optionalInputFunction_res) {
        this.$emit('optionalInputFunction', {
          name: this.config.optionalInputFunction_res[0],
          value: this.query
        })
      }

      // console.log('AQUI TERMINA EL UPDATE');

    },

    fetch() {
      if (!this.$http) {
        // return util.warn('You need to provide a HTTP client', this)
        alert('You need to provide a HTTP client', this);
      }

      if (!this.src) {
        // return util.warn('You need to set the `src` property', this)
        alert('You need to set the `src` property', this);
      }

      // SI HAY UN QUERY PRINCIPAL
      // const src = this.queryParamName
      //   ? this.src
      //   : this.src + this.query

      //  SI HAY UN QUERY SECUNDARIO
      const src = (this.secondaryQuery != null) ? this.src + this.query + '?' + this.secondaryQuery.name + '=' + this.secondaryQuery.value : this.src + this.query


      const params = this.queryParamName ?
        Object.assign({
          [this.queryParamName]: this.query
        }, this.data) :
        this.data

      let cancel = new Promise((resolve) => this.cancel = resolve)
      let request = this.$http.get(src, {
        params
      })

      return Promise.race([cancel, request])
    },

    cancel() {
      // used to 'cancel' previous searches
    },




    reset() {

      // if (this.config.itemType == 'items') {
      //   if (this.current == -1) {
      //     this.onEmpty();
      //   } else {
      //     console.log('Se selecciono algo (SELECCION)');
      //   }
      // }

      this.items = []
      this.loading = false

      if (!isMobile) {
        this.$emit('blurEvent', this.query)
      }
    },

    setActive(index) {
      this.current = index
    },

    activeClass(index) {
      return {
        active: this.current === index
      }
    },

    hit(index) {
      console.log("this.current -> ", this.current);
      if (this.current != -1) {
        console.log(this.items[this.current]);
        this.onHit(this.items[this.current])
      }
    },

    up() {
      if (this.current > 0) {
        this.current--
      } else if (this.current === -1) {
        this.current = this.items.length - 1
      } else {
        this.current = -1
      }
    },

    down() {
      if (this.current < this.items.length - 1) {
        this.current++
      } else {
        this.current = -1
      }
    },

    onHit() {
      // util.warn('You need to implement the `onHit` method', this)
      alert('You need to implement the `onHit` method', this);
    }
  }
}
