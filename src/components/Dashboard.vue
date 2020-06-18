<template>
<div style="height: 100%">
  <md-app>
    <md-app-toolbar class="md-primary">
      <span class="md-title">Serasa</span>
    </md-app-toolbar>
    <div>
  </div>
    <md-app-drawer md-permanent="clipped">
      <md-list>
        <md-list-item>
          <router-link to="dashboard">Home</router-link>
        </md-list-item>
      </md-list>
    </md-app-drawer>
    <md-app-content>
      <div class="md-layout md-gutter">
        <div class="md-layout-item">
          <h2>Update company record</h2>
          <md-field style="width: 650px;">
            <label for="company">Select company</label>
            <md-select v-model="currentOption" name="company" id="company" style="width: 600px">
              <md-option v-for="company in companyInfo" :key="company.id" v-bind:value="company.name">{{company.name}}</md-option>
            </md-select>
          </md-field>
          <md-field style="width: 650px;">
            <label for="company">Records</label>
            <md-file v-model="records" id="recordId"/>
          </md-field>
          <md-button class="md-raised md-primary button-update" v-on:click="updateRecords(currentOption)">Update records</md-button>
        </div>
      </div>
    </md-app-content>
  </md-app>
</div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      actualToken: 0,
      companyInfo: [],
      name: [],
      company: [],
      currentOption: 'Select company',
      records: null
    }
  },
  mounted () {
    let vm = this
    this.actualToken = localStorage.getItem('token')
    let config = {
      headers: {
        'x-access-token': this.actualToken
      }
    }

    this.$http.get('company', config).then(function (result) {
      if (result.data) {
        vm.companyInfo = result.data
      } else {
        console.log('Error')
      }
    })
  },
  methods: {
    updateRecords (companyName) {
      this.$http.post('/company/update', {name: companyName, record: this.records}, {headers: {'x-access-token': localStorage.getItem('token')}}).then(function (res) {
        if (res) {
          console.log('Update success')
        } else {
          console.log('Error')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .button-update {
    width: 650px;
    margin-top: 20px;
  }
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
    height: 100%;
  }
  .md-app {
    max-height: 100%;
    height: 100%;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-app .md-content.md-theme-default{
    overflow: hidden !important;
  }
</style>
