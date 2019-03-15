<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-100" style="padding-top:0; margin-top:-30px !important">
        <v-textarea
          color="green"
          background-color="green"
          outline
          counter
          maxlength="120"
          :value="COMMENT"
          @input.native="updateComment($event.target.value)"
        >
          <div slot="label">
            Mensaje
            <small>(Al {{($route.name == 'Outcome') ? 'Vendedor': 'Comprador'}})</small>
          </div>
        </v-textarea>
        <!-- <md-field>
          <md-input
            :value="COMMENT"
            @input.native="updateComment($event.target.value)"
            type="text"
            :placeholder="'Escribe tu mensaje...'"
          ></md-input>
        </md-field>-->
      </div>
    </div>

    <div class="md-layout" v-if="!loading">
      <div
        class="md-layout-item md-size-100"
        style="padding:0;font-family: tahoma;word-wrap: break-word;"
        v-if="COMMENTS.length > 0"
      >
        <v-list three-line>
          <template v-for="(comment, index) in COMMENTS">
            <v-list-tile :key="comment._id" avatar>
              <v-list-tile-avatar>
                <img :src="(comment.creator)?comment.creator.imgUrl:''" alt="People">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="comment.creator.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="comment.text"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :inset="true" :key="index"></v-divider>
          </template>
        </v-list>
      </div>

      <div v-else>
        <md-empty-state
          class="md-success"
          md-icon="message"
          md-label="¡Ningun mensaje aun!"
          md-description="¿Que te parecio este movimiento?, hazle saber a tu cliente/proveedor"
        ></md-empty-state>
      </div>
    </div>
    <div v-else>
      <center>
        <small>Cargando comentarios...</small>
      </center>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    movement: ''
  },

  components: {},

  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions({
      postComment: 'comments/postComment',
      getAllComments: 'comments/getAllComments'
    }),
    ...mapMutations({
      setComment: 'comments/SET_COMMENT'
    }),
    updateComment(event) {
      this.setComment(event);
    }
  },

  created() {
    let params = {
      parent: this.getIncome._id,
      type: 'movement'
    };
    if (this.movement._id) {
      this.loading = true;
      this.getAllComments(params).then(res => {
        this.loading = false;
        console.log(res);
      });
    }
  },

  computed: {
    ...mapGetters({
      getComments: 'comments/getComments',
      getComment: 'comments/getComment',
      getIncome: 'incomes/getIncome'
    }),

    COMMENTS: function(val) {
      return this.getComments;
    },
    COMMENT: function(val) {
      return this.getComment;
    }
  }
};
</script>
<style>
.md-list-item-content {
  padding: 0 !important;
}
.md-content {
  max-width: 500px;
  max-height: 460px;
  overflow: auto;
}
.break-word {
  -ms-word-break: break-all;
  word-break: break-all;

  word-break: break-word;

  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}
</style>
