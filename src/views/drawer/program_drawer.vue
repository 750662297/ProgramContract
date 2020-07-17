<template>
    <div>
        <a-form :form="form" @submit="hand" >
            <a-form-item label="项目编号" :label-col="{span:8}" :wrapper-col="{span:10,offset:2}">
                <a-input style="230px" autocomplete="off" v-decorator="['xm_id',rule.xm_id]"/>
            </a-form-item>
            <a-form-item label="项目名称" :label-col="{span:8}" :wrapper-col="{span:10,offset:2}">
                <a-input style="230px" autocomplete="off" v-decorator="['xm_name',rule.xm_name]"/>
            </a-form-item>
            <a-form-item label="所属部门" :label-col="{span:8 }" :wrapper-col="{span:10,offset:2}">
                <a-select  style="width:230px" v-decorator="['department',rule.department]" labelInValue>
                    <a-select-option value="1">软件系统部</a-select-option>
                    <a-select-option value="2">智能设备部</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="项目负责人" :label-col="{span:8 }" :wrapper-col="{span:10,offset:2}">
                <a-input style="230px" autocomplete="off" v-decorator="['xm_op',rule.xm_op]"/>
            </a-form-item>
            <a-form-item label="项目状态" :label-col="{span:8 }" :wrapper-col="{span:10,offset:2}">
                <a-select labelInValue style="width:230px" v-decorator="['xm_state',rule.xm_state]" >
                    <a-select-option value="1">已立项</a-select-option>
                    <a-select-option value="2">进行中</a-select-option>
                    <a-select-option value="3">已完成</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="立项、结项日期" :label-col="{span:8 }" :wrapper-col="{span:10,offset:2}">
                <a-range-picker @change='OnChange' style="width:230px" v-decorator="['xm_date',rule.xm_date]"/>
            </a-form-item>
        </a-form>
        
    </div>
</template>
<script>


export default {
    data(){
        return{
            form: this.$form.createForm(this),
            rule:{
                xm_id:{
                    rules:[{required:true,message:'项目编号不可为空'}]
                },
                xm_name:{
                    rules:[{required:true,message:'项目名称不可为空'}]
                },
                department:{
                    rules:[{required:true,message:'所属部门不可为空'}]
                },
                xm_op:{
                    rules:[{required:true,message:'项目负责人不可为空'}]
                },
                xm_state:{
                    rules:[{required:true,message:'项目状态'}]
                },
                xm_date:{
                    rules:[{required:true,message:'立项、结项日期不可为空'}]
                }

            }

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
       form_value_format(value){
           // //console.log('form_value_format')
           // //console.log(value)
           value.xm_date_start=value.xm_date[0].format('YYYY-MM-DD');
           value.xm_date_finish=value.xm_date[1].format('YYYY-MM-DD');

           value.department=value.department.label;
           value.xm_state=value.xm_state.label;
           delete value.xm_date;
           return value;
       },
       validate_(){
           var self=this;
           var form=this.form;
            // //console.log('validate_')
            form.validateFields(function(err,values){
                if(!err){
                    // //console.log('validate success');
                    // //console.log(values)
                    const value=self.form_value_format(values);
                    self.$store.dispatch('form_variable_s',value);
                }
            })
       },
       
       
    }
    
}
</script>
<style>

</style>