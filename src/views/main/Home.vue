<template>
  <div>
    <a-layout>
      <a-layout-sider style="height:100%; background:whitesmoke;">
      </a-layout-sider>
      <a-layout-content>
        <a-list  size="small" bordered style="width:540px; float:left; margin-top:50px;" :pagination="pagination_program" :dataSource="program">
          <a-list-item  slot="renderItem" slot-scope="item" @click="click_(item)" style="cursor:pointer; ">
            <a-list-item-meta :description='item.xm_name'>
            </a-list-item-meta>
            {{item.created_at}}
            </a-list-item>
          <div slot="header" >最近项目</div>
        </a-list>
        <a-list  size="small" bordered style="width:540px; float:right; margin-top:50px;" :pagination="pagination_contract" :dataSource="contract">
          <a-list-item slot="renderItem" slot-scope="item" @click="click_(item)" style="cursor:pointer;">
            <a-list-item-meta :description='item.ht_name'>
            </a-list-item-meta>
            {{item.created_at}}
          </a-list-item>
          <div slot="header" >最近合同</div>
        </a-list>
      </a-layout-content>
      <a-layout-sider style="height:100%; background:whitesmoke;">
      </a-layout-sider>
      <a-modal
            :visible="visible"
            @cancel="handlecancel"
            :footer="null"
            centered
            :width="500"
            :closable="false"
        >   
          <a-table v-if="table" :dataSource="data_p" :columns="columns" size="middle" :showHeader="false" :pagination="false">
              <template slot="title">项目信息</template>
          </a-table>
          <a-table v-else :dataSource="data_c" :columns="columns" size="middle" :showHeader="false" :pagination="false">
              <template slot="title">合同信息</template>
          </a-table>
        </a-modal>
    </a-layout>
  </div>
</template>
<script>
import { home_program } from "../../request/api/api_XG";
import { home_contract } from "../../request/api/api_HT";
export default {
  data(){
    return{
      pagination_program:false,
      pagination_contract:false,
      program:[],
      contract:[],
      data:[],
      columns:[
        {dataIndex:'key'},
        {dataIndex:'content'},
      ],
      data_p:[
        {key:'项目编号',name:'xm_id'},
        {key:'项目名称',name:'xm_name'},
        {key:'所属部门', name:'department'},
        {key:'项目负责人',name:'xm_op'},
        {key:'项目状态',name:'xm_state'},
        {key:'立项日期',name:'xm_date_start'},
        {key:'结项日期',name:'xm_date_finish'}
      ],
      data_c:[
        {key:'合同编号',name:'ht_id'},
        {key:'合同名称',name:'ht_name'},
        {key:'所属部门',name:'department'},
        {key:'合同甲方',name:'ht_firstop'},
        {key:'合同乙方',name:'ht_secondop'},
        {key:'合同金额',name:'ht_money'},
        {key:'签订日期',name:'ht_date_start'},
        {key:'验收日期日期',name:'ht_date_finish'}
      ],
      visible:false,
      table:true,
    }
  },
  methods:{
    data_format(res){
        if(this.$store.state.department!='项目运营部'){
            console.log(this.$store.state.department)
            var re=res.filter(item=>{
                if(item.department==this.$store.state.department){
                    return true;
                }
            })
            res=re; 
        }
        
        for(var i=1;i<res.length+1;i++){
          res[i-1].key=i;
        }
        if(res[0].xm_id!=undefined){
          if(res.length>8){
            // //console.log(res.length)
            this.pagination_program={pageSize:8,}
          }
          this.program=res;
          // //console.log(res);
          // //console.log("请求"+this.$store.state.department);
        }
        else{
          if(res.length>8){
            // //console.log(res.length)
            this.pagination_contract={pageSize:8,}
          }
          this.contract=res;
          // //console.log(res);
          // //console.log("请求"+this.$store.state.department);
        }
        
    },
    async program_(){
      await home_program().then(res=>{
        this.data_format(res)
      })
    },
    async contract_(){
      await home_contract().then(res=>{
        // //console.log('contract ')
        // //console.log(res)
        this.data_format(res)
      })
    },
    click_(item){
      if(item.xm_id!=undefined){
        this.program_click(item);
      }
      else{
        this.contract_click(item);
      }
      this.visible=true;
      // //console.log(item)
      
    },
    program_click(item){
      this.table=true;
      this.data_p[0].content=item.xm_id;
      this.data_p[1].content=item.xm_name;
      this.data_p[2].content=item.department;
      this.data_p[3].content=item.xm_op;
      this.data_p[4].content=item.xm_state;
      this.data_p[5].content=item.xm_date_start;
      this.data_p[6].content=item.xm_date_finish;

    },
    contract_click(item){
      this.table=false;
      this.data_c[0].content=item.ht_id;
      this.data_c[1].content=item.ht_name;
      this.data_c[2].content=item.department;
      this.data_c[3].content=item.ht_firstop;
      this.data_c[4].content=item.ht_secondop;
      this.data_c[5].content=item.ht_money;
      this.data_c[6].content=item.ht_date_start;
      this.data_c[7].content=item.ht_date_finish;
    },
    handlecancel(){
      this.visible=false;
    }
  },
  mounted(){
    // //console.log('1111111111111')
    this.program_();
    this.contract_();
  },

}
</script>
<style scoped> 
</style>
