<template>
    <div>
        <a-form :form='form' @submit="hand" ref="collectionForm">        
        <a-row :gutter="24">
          <a-col :span="11">
            <a-form-item label="合同编号:" :label-col="{span:8}" :wrapper-col="{span:14,offset: 2}">
                <a-input style="width:230px;" autocomplete="off" v-decorator="['ht_id',rule.ht_id]"/> 
            </a-form-item>
            <a-form-item label="所属部门:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-select labelInValue v-decorator="['department',rule.department]" style="width:230px;">
                <a-select-option value="1">软件系统部</a-select-option>
                <a-select-option value="2">智能设备部</a-select-option>
              </a-select>
            </a-form-item> 
            <a-form-item label="合同归属方:" :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-select labelInValue v-decorator="['tag',rule.tag]" style="width:230px;">
                <a-select-option value="1">甲方</a-select-option>
                <a-select-option value="2">乙方</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="支付方式:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-select labelInValue v-decorator="['m_pay',rule.m_pay]" style="width:230px;">
                <a-select-option value="1">支付方式1</a-select-option>
                <a-select-option value="2">支付方式2</a-select-option>
                <a-select-option value="3">支付方式3</a-select-option>
                <a-select-option value="4">支付方式4</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="签订、验收日期:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-range-picker @change='OnChange' style="width:230px;" v-decorator="['ht_date',rule.ht_date]"/>             
            </a-form-item>
             <a-form-item label="合同甲方:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-auto-complete
                :dataSource="dataSource"
                style="width: 230px;"
                @select="onSelect"
                @search="handleSearch"

                v-decorator="['ht_firstop',rule.ht_firstop]"
              />
            </a-form-item>
             <a-form-item label="合同乙方:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-auto-complete
                :dataSource="dataSource"
                style="width: 230px;"
                @select="onSelect"
                @search="handle_Search"
                v-decorator="['ht_secondop',rule.ht_secondop]"
              />
            </a-form-item>

              <a-form-item label="首付款:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input style="width:230px;" autocomplete="off" v-decorator="['pay_first']" :disabled="pay_input[0]"/>            
              </a-form-item>  
              <a-form-item label="二次付款:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input  style="width:230px;" autocomplete="off" v-decorator="['pay_second']" :disabled="pay_input[1]"/>           
              </a-form-item> 
              <a-form-item label= "三次付款:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input style="width:230px;" autocomplete="off" v-decorator="['pay_third']" :disabled="pay_input[2]"/>           
              </a-form-item> 
              <a-form-item label= "四次付款:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input style="width:230px;" autocomplete="off" v-decorator="['pay_fourth']" :disabled="pay_input[3]"/>           
              </a-form-item> 
              <a-form-item label= "五次付款:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input style="width:230px;" autocomplete="off" v-decorator="['pay_fifth']" :disabled="pay_input[4]"/>           
              </a-form-item> 
              
          </a-col>
          <a-col :span="13">
            <a-form-item label="合同名称:" :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input   style="width:230px;" autocomplete="off" v-decorator="['ht_name',rule.ht_name]"/>    
            </a-form-item>
             <a-form-item label="所属项目:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-auto-complete
                :dataSource="dataSource"
                style="width: 230px;"
                @select="onSelect"
                @search="Onchange_xmht"
                v-decorator="['xm_ht',rule.xm_ht]"
              />
            </a-form-item>
            <a-form-item label="合同金额:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
                <a-input  style="width:230px;" autocomplete="off" @change="money_change" v-decorator="['ht_money',rule.ht_money]"/>          
            </a-form-item>  
                <a-form-item label="税率:" :label-col="{span:8}" :wrapper-col="{span:14,offset:2}">
                  <a-select labelInValue @change="rate" v-decorator="['rate']" style="width:60px;">
                    <a-select-option value="1">1</a-select-option>
                    <a-select-option value="2">2</a-select-option>
                    <a-select-option value="3">3</a-select-option>
                  </a-select>
                </a-form-item>
            <a-row>
              <a-col :span="16">
                <a-form-item label="金额分期数:" :label-col="{span:8,offset:4}" :wrapper-col="{span: 2,offset:3}">
                  <a-select @change="number_change" labelInValue style="width:60px;">
                    <a-select-option value="1">一</a-select-option>
                    <a-select-option value="2">二</a-select-option>
                    <a-select-option value="3">三</a-select-option>
                    <a-select-option value="4">四</a-select-option>
                    <a-select-option value="5">五</a-select-option>

                  </a-select>
                </a-form-item> 
              </a-col>
              <a-col :span="8">
                <a-form-item  >
                 <a-checkbox :checked="check" @change="Change_bili" :disabled="a">按比例分期</a-checkbox> 
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="甲方经手人:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-input   style="width:230px;" autocomplete="off" v-decorator="['ht_firstopman',rule.ht_firstopman]"/>  
            </a-form-item>
            <a-form-item label="乙方经手人:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-input   style="width:230px;" autocomplete="off" v-decorator="['ht_secondopman',rule.ht_secondopman]"/>            
            </a-form-item>
            <a-form-item label="首付款时间:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-date-picker @change="onChange" v-decorator="['pay_first_date']" style="width:230px;" :disabled="pay_input[0]"/>          
            </a-form-item>
            <a-form-item label= "二次付款时间:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-date-picker @change="onChange" v-decorator="['pay_second_date']" style="width:230px;" :disabled="pay_input[1]"/>           
            </a-form-item>
            <a-form-item label= "三次付款时间:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-date-picker @change="onChange" style="width:230px;" v-decorator="['pay_third_date']" :disabled="pay_input[2]"/>           
            </a-form-item>
            <a-form-item label= "四次付款时间:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-date-picker @change="onChange" style="width:230px;" v-decorator="['pay_fourth_date']" :disabled="pay_input[3]"/>           
            </a-form-item>
            <a-form-item label= "五次次付款时间:"  :label-col="{span:8}" :wrapper-col="{span: 14,offset: 2}">
              <a-date-picker @change="onChange" style="width:230px;" v-decorator="['pay_fifth_date']" :disabled="pay_input[4]"/>           
            </a-form-item>            
          </a-col>
        </a-row>
      </a-form>

      <a-upload-dragger :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击此处上传合同文件</p>
        <p class="ant-upload-text">请将所有合同相关文件压缩后上传</p>
        <p class="ant-upload-text">支持.rar,.zip格式</p>
      </a-upload-dragger> 
    </div>
</template>
<script>
 import { apisearch } from "../../request/api/api_XG";
  import { com_search } from "../../request/api/api_company";
 import axios from 'axios'
export default {
    data(){
        return{
            form: this.$form.createForm(this),
            check:false,
            dataSource:[],
            xm_ht_validate_status:'',
            fileList:[],

            pay_input:[true,true,true,true,true],
            rule:{
                ht_id:{
                    rules:[{required:true,message:'合同编号不可为空'}]
                },
                ht_name:{
                    rules:[{required:true,message:'合同名称不可为空'}]
                },
                department:{
                    rules:[{required:true,message:'所属部门不可为空'}]
                },
                xm_ht:{
                    rules:[{required:true,message:'所属项目不可为空'}]
                },
                tag:{
                    rules:[{required:true,message:'合同归属方不可为空'}]
                },
                ht_money:{
                    rules:[{required:true,message:'合同金额不可为空且仅可为数字',pattern: /^[0-9]+$/}]
                },
                m_pay:{
                    rules:[{required:true,message:'支付方式不可为空'}]
                },
                ht_date:{
                    rules:[{required:true,message:'签订、验收日期不可为空'}]
                },
                ht_firstop:{
                    rules:[{required:true,message:'合同甲方不可为空'}]
                },
                ht_firstopman:{
                    rules:[{required:true,message:'甲方经手人不可为空'}]
                },
                ht_secondop:{
                    rules:[{required:true,message:'合同乙方不可为空'}]
                },
                ht_secondopman:{
                    rules:[{required:true,message:'乙方经手人不可为空'}]
                },
            }
        }
    },
    methods:{
        handleRemove(file) {
          const index = this.fileList.indexOf(file);
          const newFileList = this.fileList.slice();
          newFileList.splice(index, 1);
          this.fileList = newFileList;
        },
        beforeUpload(file) {
          this.fileList = [...this.fileList, file];
          return false;
        },
        async handleUpload(data) {
          const { fileList } = this;
          const formData = new FormData();
          fileList.forEach(file => {
            formData.append('files[]', file);
          });
          let headers={headers:{"Content-Type":"multipart/form-data",data:data}}
          await axios.post('http://127.0.0.1:7001/api/HG/file',formData,headers).then(res=>{
              this.fileList = [];   
              this.$message.success(res.data.message);   
          }).catch(()=>{
              this.$message.error('文件上传失败');
          })
        },



        setFormValue(){
          this.xm_ht_validate_status='';
          this.check=false;
          this.form.resetFields();
          // //console.log('setFormValue')
          
        },
        async getFormValue(){
            this.validate_();
        },
        validate_(){
            // //console.log('validate');
            var self=this;
            var form =self.$refs.collectionForm.form;
            form.validateFields(function(err,values){
                if(!err){
                    // //console.log('validate success');
                    var value=self.value_format(values);
                    // //console.log(value);
                    self.money_format(value);
                    self.$store.dispatch('form_variable_s',value);
                }
                else{
                    // //console.log('validate error');
                }
            })

        },
        value_format(values){//表单数据整理
            // //console.log('value_format')
            const a=this.date_format(values);
            // //console.log(a)
            const b=this.tag_format(a);
            const c=this.m_pay_format(b);
            
            return c;   
        },
        date_format(values){
          // //console.log('date_format')
          values.ht_date_start=values.ht_date[0].format('YYYY-MM-DD');
          values.ht_date_finish=values.ht_date[1].format('YYYY-MM-DD');
          if(values.pay_first_date!=undefined){
              values.pay_first_date=values.pay_first_date.format('YYYY-MM-DD');
          }
          if(values.pay_second_date!=undefined){
              values.pay_second_date=values.pay_second_date.format('YYYY-MM-DD');
          }
          if(values.pay_third_date!=undefined){
              values.pay_third_date=values.pay_third_date.format('YYYY-MM-DD');
          }
          delete values.ht_date;
          return values;
      },
      tag_format(value){
        // //console.log('tag_format')
          if(value.tag.key=='1'){
            value.tag='甲';
          }
          if(value.tag.key=='2'){
            value.tag='乙';
          }
          
          value.department=value.department.label;

          return value;
      },
      m_pay_format(value){
        // //console.log('m_pay_format')
        value.m_pay=value.m_pay.label;
        value.rate=value.rate.label;
        return value;
      },
      money_format(value){
          
          // //console.log('money_format');
          var a=[Number(value.pay_first) ,Number(value.pay_second) ,Number(value.pay_third),Number(value.pay_fourth),Number(value.pay_fifth)];
          // //console.log(a);
          const num=a[0]+a[1]+a[2]+a[3]+a[4];
          // //console.log(num);
          // //console.log('money_format 1');
          if(num==value.ht_money){
              // //console.log('money_format 2');
              const b='1';
              this.$store.dispatch('a_s',b);
              
              // //console.log('money got')
          }

      },
        
        rate(){
            // //console.log(value)
        },
        pay_format(){
            const {setFieldsValue}=this.form;
            setFieldsValue({'pay_first':null})
            setFieldsValue({'pay_second':null})
            setFieldsValue({'pay_third':null})
            setFieldsValue({'pay_fourth':null})
            setFieldsValue({'pay_fifth':null})
        },
        pay_input_(a){
          for(var i=0;i<a;i++){
            this.pay_input[i]=false;
          }
        },

        async number(v){
            
            const value=this.number_key;
            const {setFieldsValue}=this.form;
            this.pay_format();
            // //console.log('else')
            const b=value;
            await this.pay_input_(b);
            
            if(this.check==true){
              let bdd;
                switch(b){
                    case '1':
                      
                      setFieldsValue({'pay_first':v});
                      break;
                    case '2':
                    bdd=v/2 ;
                    setFieldsValue({'pay_first':bdd})
                    setFieldsValue({'pay_second':bdd})
                    break;
                    case '3':
                    bdd=v/3;

                    setFieldsValue({'pay_first':bdd})
                    setFieldsValue({'pay_second':bdd})
                    setFieldsValue({'pay_third':bdd})
                    break;
                    case '4':
                    bdd=v/4;

                    setFieldsValue({'pay_first':bdd})
                    setFieldsValue({'pay_second':bdd})
                    setFieldsValue({'pay_third':bdd})
                    setFieldsValue({'pay_fourth':bdd})
                    break;
                    case '5':
                    bdd=v/5;

                    setFieldsValue({'pay_first':bdd})
                    setFieldsValue({'pay_second':bdd})
                    setFieldsValue({'pay_third':bdd})
                    setFieldsValue({'pay_fourth':bdd})
                    setFieldsValue({'pay_fifth':bdd})
                    break;
                }
            }
            

        },
        number_change(value){
            const {getFieldValue}=this.form;
            this.number_key=value.key;
            const v=getFieldValue('ht_money');
            if(v!=undefined){
                this.pay_input=[true,true,true,true,true];
                this.number(v);
            }
        },
        Change_bili(e){
          
            const {getFieldValue}=this.form;
            this.check = e.target.checked;
            const v=getFieldValue('ht_money');
            // //console.log(v);
            // //console.log(this.number_key)
            if(this.check==true&&v!=undefined&&this.number_key!='0'){
                this.pay_input=[true,true,true,true,true];
                this.number(v);
            }
            else{
                this.pay_format();
            }
        },
        money_change(money){
            // //console.log(money.target.value);

            if(this.number_key!='0'&&this.check==true){
                this.number(money.target.value);
            }
        },
        Onchange_xmht(value){
          //console.log('value 1')
          this.dataSource=[];
          var reg=new RegExp("[\\u4E00-\\u9FFF]+$","g");
          if(value!='' && reg.test(value)){
            //console.log('value 2')
            apisearch(value).then(res=>{
              this.dataSource=res;
            })
          }
        },
        handleSearch(value){
          this.dataSource=[];
          var reg=new RegExp("[\\u4E00-\\u9FFF]+$","g");
          if(value!='' && reg.test(value)){
            const v={
                com_name:value,
                com_att:'甲'
            }
            this.search(v);
          }      
        },
        async handle_Search(value){
          this.dataSource=[];
          var reg=new RegExp("[\\u4E00-\\u9FFF]+$","g");
          if(value!='' && reg.test(value)){
            // //console.log('success')
            const v={
                com_name:value,
                com_att:'乙'
            }
            this.search(v);
          }      
        },
        async search(v){
          await com_search(v).then(res=>{
              this.dataSource=res;
            })
        },
        onSelect(){
          this.dataSource=[];
        },
        plus(){
        
        },
        handleChange(info) {
          let fileList = [...info.fileList];

          // 1. Limit the number of uploaded files
          //    Only to show two recent uploaded files, and old ones will be replaced by the new
          fileList = fileList.slice(-2);

          // 2. read from response and show file link
          fileList = fileList.map(file => {
            if (file.response) {
              // Component will show file.url as link
              file.url = file.response.url;
            }
            return file;
          });

          this.fileList = fileList;
        },
    }
}
</script>
<style>
</style>