<template>
  <div id="about">
    <ProessDesigner :flowEntryInfo="formFlowEntryData" @save="onSaveFlowEntry" @cancel="handleCancel" />
  </div>
</template>

<script>
import ProessDesigner from './workflow/components/ProcessDesigner.vue'
import axios from 'axios'
import Qs from 'qs'
import { getIsAdd  } from './comm'
export default {
  name: 'About',
  components: {
    ProessDesigner
  },
  data () {
    return {
      formFlowEntryData: {
        entryId: undefined,
        processDefinitionName: undefined,
        processDefinitionKey: undefined,
        categoryId: undefined,
        bindFormType: '',
        pageId: undefined,
        defaultFormId: undefined,
        defaultRouterName: undefined,
        bpmnXml: undefined
      }
    }
  },
  mounted() {
    if (!getIsAdd().bol) {
        this.getModelDetail(getIsAdd().id)
    }
  },
  methods: {
    getModelDetail(id) {
      axios({
          method: 'get',
          url: `/api/rest/models/${id}/editor/json`
      }).then(res => {
        this.formFlowEntryData.processDefinitionKey = res.data.modelId
        this.formFlowEntryData.processDefinitionName = res.data.name
        const { model, lastUpdated } = res.data
        this.formFlowEntryData.bpmnXml = model.xml
        this.lastUpdated = lastUpdated
      })
    },
    // 验证xml格式是否正确
    vaildationXml(data) {
      return new Promise(function(resolve, reject){
          axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: '/api/flowable/api/validationXml',
            data: Qs.stringify({xmlStr: data})
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      });
      
    },
    saveModeler(data) {
      // console.log(this.$x2js.xml2js(data.json_xml.xml))
      this.vaildationXml(data.json_xml.xml).then(res => {
        if (res.length === 0) {
          if (!getIsAdd().bol) {
              data.id = getIsAdd().id
              data.lastUpdated = this.lastUpdated
          }
          data.json_xml = JSON.stringify(data.json_xml)
          axios({
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'post',
              url: '/api/rest/workflow/models/saveModel',
              data: Qs.stringify(data)
          }).then((res) => {
            this.$router.push({name: 'home'})
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    onSaveFlowEntry (data) {
      this.vaildationXml(data.json_xml.xml).then(res => {
        if (res.length === 0) {
          if (!getIsAdd().bol) {
              data.id = getIsAdd().id
              data.lastUpdated = this.lastUpdated
          }
          data.json_xml = JSON.stringify(data.json_xml)
          axios({
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'post',
              url: '/api/rest/workflow/models/saveModel',
              data: Qs.stringify(data)
          }).then((res) => {
            console.log(res)
            this.$router.push({name: 'Home'})
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    handleCancel() {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style lang="scss">
#about {
  width: 100%;height: 100%;
  background: #fff;
}
</style>