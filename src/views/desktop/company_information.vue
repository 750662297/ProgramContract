<template>
    <div style="background-color：white">
        <div style="padding-top:10px">
            <router-link to="/company_drawer"><a-button size="large" :disabled="disable" @click="plus"><a-icon type="plus"></a-icon></a-button></router-link>
            <a-input-search size="large"  style="width: 200px;margin-left:10px" @search="onSearch" allowClear enterButton/>
        </div>   
        <div style="padding:5px">
            <template v-for=" tag in tags" >
                <a-checkable-tag
                    :key="tag"
                    :checked="selectedTags.indexOf(tag) > -1"
                    @change="(checked) => handleChange(tag, checked)"
                >
                    {{tag}}
                </a-checkable-tag>
            </template>
        </div> 
        
        <div style="background-color: #ececec;padding:10px">
            <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }" :dataSource="data" :pagination="pagination">
                <a-list-item slot="renderItem" slot-scope="item">
                <a-card :title="item.com_name" style="width:260px">
                    <template slot="extra">
                        <a-tag color="pink">{{item.com_att}}</a-tag>     
                    </template>
                            
                    <template class="ant-card-actions" slot="actions">
                        <a-icon type="layout" @click="layout_(item)" />
                        <a-icon   v-if="disable"/>
                        <a-icon type="edit"  @click="edit_(item)" v-else/>
                        <a-icon   v-if="disable"/>
                        <a-icon type="delete" @click="delete_(item.id)" v-else/>
                        
                    </template>
                    <a-card-meta  :description="item.description">
                        
                    </a-card-meta>
                </a-card>
                </a-list-item>
            </a-list>
        </div>
        
        <a-modal
            :visible="layout_visible"
            @cancel="handlecancel_layout"
            :footer="null"
            :closable="false"
            centered
            
            :width="800"
            :height="600"
        >   
            <div>
                <div style="width:48%;float:left">
                    <a-table :dataSource="company" :columns="columns_company" size="middle" :showHeader="false" :pagination="false">
                        <template slot="title">单位信息</template>
                    </a-table>
                </div> 
                <div style="width:48%;float:right">
                    <a-table :dataSource="contract" :columns="columns_contract" size="middle" rowkey="ht_name" :pagination="pagination_contract">
                        <template slot="title">相关合同</template>
                    </a-table>
                </div>  
                <div style="clear:both"></div>

            </div>
        </a-modal>
        <a-drawer 
            title="单位信息" 
            placement="left" 
            :closable="false" 
            @close="onClose"
            :visible="edit_visible"
            :width="600">
            <a-form v-bind:key="index" :form="form" @submit="hand" v-for="(companys,index) in company">
                <a-form-item :label="companys.key" :label-col="{span:4}" :wrapper-col="{span: 14,offset: 2}">
                    <a-input style="width:300px" v-decorator="[companys.name,{initialValue:companys.content},{ rules: [{ required: true, message: '请输入' }] }]"/>
                </a-form-item>
            </a-form>
            <div
                :style="{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
                }"
            >

                <a-button :style="{marginRight: '8px'}" @click="handleCancel">取消</a-button>
                <a-button @click="handleOK" type="primary">确认</a-button>
            </div>
        </a-drawer>
        <a-modal 
            title="添加单位"
            :visible="visible"
            :footer="null"
            @cancel="handlecancel_plus"
            :closable="false"
            centered
            :width="600"
            :height="600"
        >
            <router-view ref="child"/>
            <div
                :style="{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
                }"
            >
                <a-button :style="{marginRight: '8px'}" @click="handlecancel_plus">取消</a-button>
                <a-popconfirm
                    title="该单位为"
                    @confirm="handleOk_plus_j"
                    @cancel="handleOk_plus_y"
                    okText="甲方"
                    cancelText="乙方"
                >
                <a-button type="primary">确认</a-button>
                </a-popconfirm>
            </div>
            
        </a-modal>
    </div>
</template>
<script>
import { getall,search,delete_i ,update_,com_add} from "../../request/api/api_company";
import { apishow } from "../../request/api/api_HT";
export default {
    data(){
        return{
            form: this.$form.createForm(this),
            data:[],
            id:'',
            disable:false,
            disable_edit:true,
            disable_delete:true,
            checked1: false,
            checked2: false,
            tags: ['甲方单位', '乙方单位'],
            selectedTags:[],
            pagination:{
                pageSize:12,

            },
            pagination_contract:{
                pageSize:5,
            },
            search_value:'',
            layout_visible:false,
            edit_visible:false,
            visible:false,
            columns_company:[
                {dataIndex:'key'},
                {dataIndex:'content'}
            ],
            company:[
                {key:'单位名称',name:'com_name'},
                {key:'单位地址',name:'com_address'},
                {key:'单位电话',name:'com_phone'},
                {key:'开户行',name:'bank_name'},
                {key:'银行账号',name:'b_code'},
                {key:'纳税人识别码',name:'c_op_code'},
                {key:'备注',name:'description'}
            ],
            columns_contract:[
                {title:'合同名称',dataIndex:'ht_name'},
                {title:'所属项目',dataIndex:'xm_ht'},
                {title:'所属部门',dataIndex:'department'},
                {title:'创建时间',dataIndex:'ht_date_start'},
            ],
            contract:[],
        }
    },
    methods:{
        data_format(res){
            var i=1;
            var row=res;

            row.sort(function(a,b){

                return Date.parse(b.ht_date_start) - Date.parse(a.ht_date_start)
            })
            if(this.$store.state.department!='项目运营部'){
                var re=res.filter(item=>{
                    if(item.department==this.$store.state.department){
                        return true;
                    }
                })
                for(i=1;i<re.length+1;i++){
                    re[i-1].key=i;
                }
                this.contract=re;
            }
            else{
                
                for(i=1;i<res.length+1;i++){
                    res[i-1].key=i;
                }
                this.contract=res;

            }
        },
        handleChange(tag, checked) {//tag选择
            this.selectedTags=[];

            const { selectedTags } = this;
            const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter(t => t !== tag);

            
            this.selectedTags = nextSelectedTags;

        },
        onSearch(value){//搜索
            this.search_value=value;

            const a={
                com_name:value,
                com_att:this.selectedTags[0]
            }
            search(a).then(res=>{

                this.data=res;
            })
        },
        async showall(){
            await getall().then(res=>{
                this.data=res;
            })
        },
        async layout_HT(item){
            await apishow(item).then(res=>{
                this.data_format(res)
            })
        },
        layout_format(item){
            //单位详细信息页面格式纠正
            this.company[0].content=item.com_name;
            this.company[1].content=item.com_address;
            this.company[2].content=item.com_phone;
            this.company[3].content=item.bank_name;
            this.company[4].content=item.b_code;
            this.company[5].content=item.c_op_code;
            this.company[6].content=item.description;
        },
        layout_(item){

            this.layout_format(item);
            this.layout_HT(item.com_name);
            this.layout_visible=true;
        },
        handlecancel_layout(){
            this.layout_visible=false;
        },
        edit_(item){

            this.id=item.id;
            this.layout_format(item);
            this.form.resetFields();
            this.edit_visible=true;
        },
        onClose(){
           this.edit_visible=false; 
        },
        async delete_(item){

            delete_i(item).then(()=>{


                this.$message.success('删除成功')
                this.showall();   
            }).catch(()=>{

            })
        },
        handleOK(){

            var self=this;
            var form=self.form;
            form.validateFields(function(err,values){
                if(!err){
                    values.id=self.id;
                    self.update(values);
                    this.$refs.child.setFormValue();
                }
            })

        },
        async update(p){
            await update_(p).then(res=>{
                if(res[0]==1){
                    this.$message.success('单位信息更新成功');
                    this.edit_visible=false;
                    this.showall();     
                }
            })
        },
        handleCancel(){
            this.form.resetFields();
            this.edit_visible=false;
        },
        plus(){
            this.visible=true;
        },
        handlecancel_plus(){
            this.$refs.child.setFormValue();
            this.visible=false;
        },
        handleOk_plus_j(){
            const tag='甲'
            this.handleOk_plus(tag);
        },
        handleOk_plus_y(){
            const tag='乙'
            this.handleOk_plus(tag);
        },
        handleOk_plus(tag){
            this.$store.dispatch('form_variable_d');
            this.$refs.child.getFormValue();
            const value=this.$store.state.form_variable;
            value.com_att=tag;

            com_add(value).then(res=>{
                if(res==1){
                    this.$message.success('单位添加成功')
                    this.$store.dispatch('form_variable_d');
                    this.visible=false;
                    this.showall();
                    this.$refs.child.setFormValue();
                }
            })

        }
    },
    mounted(){
        
        this.showall();   
        if(this.$store.state.department!='项目运营部'){
            this.disable_edit=false;
            this.disable_delete=false;
            this.disable=true;
        } 
    },
    watch:{
        async selectedTags(val){


                const abc={
                    com_name:this.search_value,
                    com_att:val[0]
                }
                await search(abc).then(res=>{

                    this.data=res;
                }).catch(()=>{

                })
            
        }
    }
}
</script>


<style scoped>

</style>