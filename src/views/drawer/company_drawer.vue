<template>
    <div>
        <a-form v-bind:key="index" :form="form" @submit="hand" v-for="(companys,index) in company">
            <a-form-item  :label="companys.key" :label-col="{span:5,offset:1}" :wrapper-col="{span: 14,offset: 2}">
                <a-input style="width:300px;" v-decorator="[companys.name,{ rules: [{ required: true, message: '请输入' }] }]"/>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>


export default {
    data(){
        return{
            form: this.$form.createForm(this),
            company:[
                {key:'单位名称',name:'com_name'},
                {key:'单位地址',name:'com_address'},
                {key:'单位电话',name:'com_phone'},
                {key:'开户行',name:'bank_name'},
                {key:'银行账号',name:'b_code'},
                {key:'纳税人识别码',name:'c_op_code'},
                {key:'备注',name:'description'}
            ],
        }
    },
    methods:{
       setFormValue(){
            this.form.resetFields();
            // //console.log('setFormValue')
            
       },
       getFormValue(){
           this.validate_();

       },
       validate_(){
           var self=this;
           var form=this.form;
            // //console.log('validate_')
            form.validateFields(function(err,values){
                if(!err){
                    // //console.log('validate success');
                    // //console.log(values)

                    self.$store.dispatch('form_variable_s',values);
                }
            })
       },
       
       
    }
    
}
</script>
<style>
</style>