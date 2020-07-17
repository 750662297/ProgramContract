<template>
  <div style="margin:5px;">  
    <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="pagination">
      <template slot="title" >
          项目编号:
          <a-input size="large" style="width:180px; margin-left:10px;" v-model="XM_id"> 
          </a-input>
          项目名称:
          <a-input size="large" style="width:180px; margin-left:10px;" v-model="XM_name">
          </a-input>
          项目负责人:
          <a-input size="large" style="width:180px; margin-left:10px;" v-model="XM_op" >
          </a-input>
          <a-button size="large" @click="bt()" style="margin-left:20px;" >搜索</a-button>
          <router-link to="/program_drawer"><a-button size="large" :disabled="disable" @click="add()" style="margin-left:30px;"><a-icon type="plus"/>添加项目</a-button></router-link>     
      </template>
      <template slot="xm_name" slot-scope="text, record">
        <editable-cell
            :ref="`xm_name_${record.key}`"
            :defaultEditable="record.editable"
            :autoSave=true
            :required="true"
            :decoratorOptions="rules.xm_name"
            placeholder='请输入'
            :value="text"
            :text="text"
            @valueChange="onCellChange(record.key, 'xm_name', $event)"/>
      </template>
      <template slot="xm_op" slot-scope="text, record">
        <editable-cell
                :ref="`xm_op_${record.key}`"
                :defaultEditable="record.editable"
                :autoSave=true
                :required="true"
                :decoratorOptions="rules.xm_op"
                placeholder='请输入'
                :value="text"
                :text="text"
                @valueChange="onCellChange(record.key, 'xm_op', $event)"/>
      </template>
      <template slot="xm_state" slot-scope="text, record">
        <editable-cell :ref="`xm_state_${record.key}`" formType="select" :defaultEditable="record.editable" :required="true" message='请选择国籍' :value="record.xm_state" :text="record.xm_state" >
          <a-select-option value="已立项">
            已立项
          </a-select-option>
          <a-select-option value="进行中">
            进行中
          </a-select-option>
          <a-select-option value="已完成">
            已完成
          </a-select-option>
        </editable-cell>
      </template>
      <template slot="xm_date_finish" slot-scope="text, record">
        <editable-cell
                :ref="`xm_date_finish_${record.key}`"
                formType="datePicker"
                :defaultEditable="record.editable"
                :required="true"
                placeholder='请输入日期'
                :value="record.xm_date_finish!==''?moment(record.xm_date_finish, dateFormat):''"
                :text="text"/>
      </template>

      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>

          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
              <a-divider type="vertical" />
            <a-popconfirm title='您确认要取消修改吗?' @confirm="() => cancel(record.key)" okText="确认" cancelText="取消">
              <a>取消</a>
              <a-divider type="vertical" />
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)" :disabled='disable'>编辑</a>
              <a-divider type="vertical" />
          
            <a-popconfirm v-if="dataSource.length" title="您确认要删除吗" @confirm="() => onDelete(record.key)" okText="确认" cancelText="取消">
              <span>
                <a href="javascript:;" :disabled='disable'>删除</a>
              </span>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
    <a-modal
            title="添加项目"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            :width="600"
            :closable="false"
        >
        <router-view ref="child"/>
      </a-modal>

    


  </div>
</template>
<script>
  import EditableCell from '../../components/XG_cell';

  import moment from 'moment';
  import { apiXG,apiXGSHOWALL ,apiXGadd,apiupdate_,apidelete} from "../../request/api/api_XG";

  export default {
    components: {
      EditableCell
    },
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        dataSource: [],
        XM_id:'',
        XM_name:'',
        XM_op:'',
        disable:this.$store.state.disable,
        pagination:{pageSize:10},
        visible:false,
        columns: [
          {
            title: '序号',
            dataIndex: 'key',
          },
          {
            title:'项目编号',
            dataIndex:'xm_id',
            scopedSlots: { customRender: 'xm_id' },

          },
          {
            title:'项目名称',
            dataIndex:'xm_name',
            scopedSlots: { customRender: 'xm_name' },

          },
          {
            title:'所属部门',
            dataIndex:'department',
            filters: [
              {
              text: '软件系统部',
              value: '软件系统部',
              },
              {
              text: '智能设备部',
              value: '智能设备部',
              },
            ],
            onFilter: (value, record) => record.department.indexOf(value) === 0,
          },
          {
            title:'项目负责人',
            dataIndex:'xm_op',
            scopedSlots: { customRender: 'xm_op' }, 
          },
          {
            title:'项目状态',
            dataIndex:'xm_state',
            scopedSlots: { customRender: 'xm_state' }, 
            filters: [
              {
                text: '已立项',
                value: '已立项',
              },
              {
                text: '进行中',
                value: '进行中',
              },
              {
                text:'已完成',
                value:'已完成'
              }
            ],
            onFilter: (value, record) => record.xm_state.indexOf(value) === 0,
          },
          {
            title:'立项日期',
            dataIndex:'xm_date_start',
            scopedSlots: { customRender: 'xm_date_start' }, 

          },
          {
            title:'结项日期',
            dataIndex:'xm_date_finish',
            scopedSlots: { customRender: 'xm_date_finish' }, 
          },
         
          {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        fields:['xm_name','xm_op','xm_state','xm_date_finish'],
       rules: {
          xm_name: {
            rules: [{
              required: true,
              message: '请输入项目名称',
            }],
          },
          xm_op:{
            rules:[{
              required:true,
              message:'请输入项目负责人',
            }]
          },

        },

      };
    },
    methods: {
      moment,
      data_format(res){
        var i=1;
        var row=res;
        row.sort(function(a,b){
          return Date.parse(b.xm_date_start) - Date.parse(a.xm_date_start)
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
            if(re.length<10){

              this.pagination=false;
            }
            this.dataSource=re;
           

        }
        else{
            
            for(i=1;i<res.length+1;i++){
                res[i-1].key=i;
            }
            this.dataSource=res;


        }
      },
      showall(){
        var self=this;


        apiXGSHOWALL().then(res=>{
          self.data_format(res);
              
        })
        
      },
      // input Change事件
      onCellChange(key, dataIndex, value) {

        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
            target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      },
      // 删除
      onDelete(key) {


        const dataSource = [...this.dataSource];
        const row= dataSource.find(item => item.key === key);

        apidelete(row.id).then(()=>{

          this.showall();
        })
      },
      // 点击编辑
      edit(key) {
        const newData = [...this.dataSource];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.dataSource = newData;
        }
      },
      // 点击保存
      save(key) {
        // //console.log('save')
        this.validateRow(key, this.fields, (err, values) => {

          if (!err) {

            
            values.xm_date_finish=values.xm_date_finish.format('YYYY-MM-DD');
            // // //console.log(values.xm_date_finish)
            const newData = [...this.dataSource];
            const row = newData.find(item => key === item.key);
            if (row) {
              // //console.log(row)
              const params={
                id:row.id,
                ht_id:row.ht_id,
                xm_name:values.xm_name,
                xm_op:values.xm_op,
                xm_state:values.xm_state,
                xm_date_finish:values.xm_date_finish,
              }
              apiupdate_(params).then(()=>{
                // //console.log(res)
                this.showall();
              })
              delete row.editable;
              // //console.log('单行保存row', row);
            }
          }
        });
      },
      // 点击取消
      cancel() {
        this.showall();
      },
      // validateRow可以提取为公共函数
      validateRow(key, fields, callback) {
        // 查找验证是否通过
        const row = {};
        let err = false;
        // forEach 对每一个验证，可以更改为some满足一个就提醒
        fields.forEach(filed => {
          let refName = `${filed}_${key}`;
          let result = this.$refs[refName].validate();
          row[filed] = result.value;
          if (!result.success) {
            err = true;
          }
        });
        callback(err, row);
      },


      bt(){
            var self=this;
            var XM_id=self.XM_id;
            var XM_name=self.XM_name;
            var XM_op=self.XM_op;

                apiXG({
                    xm_id:XM_id,
                    xm_name : XM_name,
                    xm_op : XM_op,
                }).then(function(res){
                    self.data_format(res);
                })
        },
        add(){
            this.visible=true;
        },
        handleCancel(){
            this.visible=false;
        },
        onClose(){
            this.visible=false;
        },
        handleOk(){
            this.$store.dispatch('form_variable_d');
            this.$refs.child.getFormValue();
            this.program_add(this.$store.state.form_variable);
            this.visible=false;
            
            this.$refs.child.setFormValue();
            
        },
        async program_add(value){
            // //console.log('program_add');
            await apiXGadd(value).then(res=>{
                // //console.log('add success')
                if(res.insert=='1'){
 
                    this.$store.dispatch('form_variable_d');
                    this.showall();
                    this.$message.success('添加成功');
                }
            }).catch(()=>{
                // //console.log('项目添加失败');
                this.$message.error('添加失败');
            })

       }
     
    },
    mounted(){
      this.showall();
    },

  };
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  li {
    text-align: left;
  }
  pre {
    padding: 10px;
    background-color: rgba(0,0,0,0.65);
    color: #ccc;
  }
</style>

