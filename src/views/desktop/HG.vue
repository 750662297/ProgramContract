<template>
  <div style="margin:5px;">  
    <a-table bordered :dataSource="dataSource" :columns="columns"  :scroll="{ x:1400 }"> -->
      <template slot="title">
        
        合同编号:
        <a-input size="large" style="width:180px; margin-left:10px;" v-model="ht_id" > 
        </a-input>
        合同名称:
        <a-input size="large" style="width:180px; margin-left:10px;" v-model="ht_name">
        </a-input>
        所属项目:
        <a-input size="large" style="width:180px; margin-left:10px;" v-model="xm_ht" >
        </a-input>
        <a-button size="large" @click="bt()" style="margin-left:20px;">搜索</a-button>
        <router-link to="/HT_drawer"><a-button @click="showDrawer" :disabled="disable" size="large" style="margin-left:30px;" ><a-icon type="plus"></a-icon>添加合同</a-button></router-link>
      </template>
      
      
     
      <template slot="ht_name" slot-scope="text, record">
        <editable-cell
                :ref="`ht_name_${record.key}`"
                :defaultEditable="record.editable"
                :autoSave=true
                :required="true"
                :decoratorOptions="rules.ht_name"
                placeholder='请输入'
                :value="text"
                :text="text"
                @valueChange="onCellChange(record.key, 'ht_name', $event)"/>
      </template>

      <a-tag
        slot="tag"
        slot-scope="text,record"
        :color="'#108ee9'"
        :key="tag"
      >
      {{record.tag}}
      </a-tag>

      
      <template slot="ht_firstop" slot-scope="text, record">
        <editable-cell
                :ref="`ht_firstop_${record.key}`"
                :defaultEditable="record.editable"
                :autoSave=true
                :required="true"
                :decoratorOptions="rules.ht_firstop"
                placeholder='请输入'
                :value="text"
                :text="text"
                @valueChange="onCellChange(record.key, 'ht_firstop', $event)"/>
      </template>
      <template slot="ht_firstopman" slot-scope="text, record">
        <editable-cell
                :ref="`ht_firstopman_${record.key}`"
                :defaultEditable="record.editable"
                :autoSave=true
                :required="true"
                :decoratorOptions="rules.ht_firstopman"
                placeholder='请输入'
                :value="text"
                :text="text"
                @valueChange="onCellChange(record.key, 'ht_firstopman', $event)"/>
      </template>
      <template slot="ht_secondop" slot-scope="text, record">
        <editable-cell
                :ref="`ht_secondop_${record.key}`"
                :defaultEditable="record.editable"
                :autoSave=true
                :required="true"
                :decoratorOptions="rules.ht_secondop"
                placeholder='请输入'
                :value="text"
                :text="text"
                @valueChange="onCellChange(record.key, 'ht_secondop', $event)"/>
      </template>
      <template slot="ht_secondopman" slot-scope="text, record">
        <editable-cell
                :ref="`ht_secondopman_${record.key}`"
                :defaultEditable="record.editable"
                :autoSave=true
                :required="true"
                :decoratorOptions="rules.ht_secondopman"
                placeholder='请输入'
                :value="text"
                :text="text"
                @valueChange="onCellChange(record.key, 'ht_secondopman', $event)"/>
      </template>
       <template slot="ht_date_finish" slot-scope="text, record">
        <editable-cell
                :ref="`ht_date_finish_${record.key}`"
                formType="datePicker"
                :defaultEditable="record.editable"
                :required="true"
                placeholder='请输入日期'
                :value="record.ht_date_finish!==''?moment(record.ht_date_finish, dateFormat):''"
                :text="text"/>
      </template>
      <template slot="file_operation" slot-scope="text, record">
        <div class='editable-row-file_operations'>

          <span>
            <a @click="() =>download_(record.key)">下载</a>
              <a-divider type="vertical" />
          
            <a-popconfirm title="您确认要上传新的文件吗？之前的文件将被覆盖" @confirm="() => onupload(record.key)" okText="确认" cancelText="取消">
              <span>
                <a href="javascript:;" :disabled='disable'>上传</a>
              </span>
            </a-popconfirm>
          </span>
        </div>
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

     

    <a-drawer
      title="添加合同"
      :width="850"
      @close="onClose"
      :visible="visible"
      :closable="false"
      placement="left"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <router-view ref="child"/>
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
        
        <a-popconfirm
          title="您确认要取消吗？此次确认后已输入内容将自动清空"
          @confirm="handleCancel"
          @cancel="hand_cancel"
          okText="确认"
          cancelText="取消"
        >
          <a-button :style="{marginRight: '8px'}" >
            取消
          </a-button>
        </a-popconfirm>
        
        <a-button @click="handleOK" type="primary">确认</a-button>
      </div>
    </a-drawer>
    <a-modal
      :visible="file_visiable"
      @cancel="handlecancel_file"
      :footer="null"
      :closable="false"
      centered
      :width="600"
      :height="700"
    >
        <a-upload-dragger :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击此处上传合同文件</p>
          <p class="ant-upload-text">合同文件必须上传</p>
        </a-upload-dragger> 

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
          <a-button :style="{marginRight: '8px'}" @click="handlecancel_file">取消</a-button>
          <a-button
              type="primary"
              @click="handleUpload"
              :disabled="fileList.length === 0"
              :loading="uploading"
              style="margin-top: 16px"
          >
              {{uploading ? '添加中' : '添加' }}
          </a-button>
        </div>
    </a-modal>
  </div>
</template>
<script>
  import EditableCell from '../../components/cell';
  import moment from 'moment';
  import { apiIndex,apiupdate,apidelete,apiadd,apisearch} from "../../request/api/api_HT";
 import { down_ } from "../../request/api/api_HT";
 import axios from 'axios'
  export default {
    components: {
      EditableCell
    },
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        dataSource: [],
        ModalText:'',
        visible:false,
        file_visiable:false,
        confirmLoading:false,
        fileList:[],
        file_key:'',
        uploading:false,
        formLayout:'horizontal',
        form:this.$form.createForm(this,{name:'coordinated'}),
        a:false,
        disable:this.$store.state.disable,
        ht_id:'',
        ht_name:'',
        xm_ht:'',
        number_key:'0',
        columns: [
          {
            title: '序号',
            dataIndex: 'key',
            fixed:'left',
            width:50

          },
          {
            title:'合同编号',
            dataIndex:'ht_id',
            scopedSlots: { customRender: 'ht_id' },
            fixed:'left',
            width:100
          },
          {
            title:'合同名称',
            dataIndex:'ht_name',
            scopedSlots: { customRender: 'ht_name' },
            fixed:'left',
            width:100
          },
          {
            title:'所属项目',
            dataIndex:'xm_ht',

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
            title:'合同归属方',
            dataIndex:'tag',
            key:'tag',
            scopedSlots: { customRender: 'tag' },
            filters: [
              {
              text: '甲',
              value: '甲',
              },
              {
              text: '乙',
              value: '乙',
              },
            ],
            onFilter: (value, record) => record.tag.indexOf(value) === 0,
          },
          {
            title:'合同甲方',
            dataIndex:'ht_firstop',
            scopedSlots: { customRender: 'ht_firstop' },
          },
          {
            title:'甲方经手人',
            dataIndex:'ht_firstopman',
            scopedSlots: { customRender: 'ht_firstopman' },
          },
          {
            title:'合同乙方',
            dataIndex:'ht_secondop',
            scopedSlots: { customRender: 'ht_secondop' },
          },
          {
            title:'乙方经手人',
            dataIndex:'ht_secondopman',
            scopedSlots: { customRender: 'ht_secondopman' },
          },
          {
            title:'签订日期',
            dataIndex:'ht_date_start',
            scopedSlots: { customRender: 'ht_date_start' },
          },
          {
            title:'验收日期',
            dataIndex:'ht_date_finish',
            scopedSlots: { customRender: 'ht_date_finish' },
          },
          {
            title:'文件操作',
            width: 120,
            fixed:'right',
            scopedSlots: { customRender: 'file_operation' },
          },
          {
            title: '操作',
            width: 130,
            fixed:'right',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        fields:['ht_name','ht_firstop','ht_firstopman','ht_secondop','ht_secondopman','ht_date_finish'],
       rules: {
          ht_name: {
            rules: [{
              required: true,
              message: '请输入合同名称',
            }],
          },
          ht_firstop: {
            rules: [{
              required: true,
              message: '请输入合同甲方',
            }],
          },
          ht_firstopman: {
            rules: [{
              required: true,
              message: '请输入甲方经手人',
            }],
          },
          ht_secondop: {
            rules: [{
              required: true,
              message: '请输入合同乙方',
            }],
          },
          ht_secondopman: {
            rules: [{
              required: true,
              message: '请输入乙方经手人',
            }],
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
        apiIndex().then(function(res){
          
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

        this.validateRow(key, this.fields, (err, values) => {

          if (!err) {

            values.ht_date_finish=values.ht_date_finish.format('YYYY-MM-DD');
            const newData = [...this.dataSource];
            const row = newData.find(item => key === item.key);
            if (row) {

              const params={
                id:row.id,
                ht_id:row.ht_id,
                ht_name:values.ht_name,

                ht_firstop:values.ht_firstop,
                ht_firstopman:values.ht_firstopman,
                ht_secondop:values.ht_secondop,
                ht_secondopman:values.ht_secondopman,
                ht_date_finish:values.ht_date_finish,
              }
              apiupdate(params).then(()=>{

                this.showall();
              })
              delete row.editable;
              // delete row.key;

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

      download_(key){
        const dataSource = [...this.dataSource];
        const row= dataSource.find(item => item.key === key);
        down_({id:row.id}).then(res=>{
          const re=res;
          var null_='null'
          if(re.includes(null_)){
            this.$message.warning('该合同未上传文件')
          }
          else{
            let url = res
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href=url;
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) // 下载完成移除元素     
          }
            
        }) 
      },



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
      onupload(key){

        const dataSource = [...this.dataSource];
        const row= dataSource.find(item => item.key === key);
        this.file_key=row.id;
        this.file_visiable=true;

      },
      async handleUpload() {
        const data=this.file_key;
        const { fileList } = this;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files[]', file);
        });
        let headers={headers:{"Content-Type":"multipart/form-data",data:data}}
        await axios.post('http://127.0.0.1:7001/api/HG/file',formData,headers).then(res=>{
            this.fileList = [];   
            this.$message.success(res.data.message);
            this.file_visiable=false;
            this.file_key='';
        }).catch(()=>{
            this.$message.error('文件上传失败');
        })
      },
      handlecancel_file(){
        this.file_visiable=false;
      },
      handleOK(){
        this.$store.dispatch('a_d');
        this.$store.dispatch('form_variable_d');
        this.$refs.child.getFormValue();
        if(this.$store.state.a==''){
            this.$store.dispatch('a_d');
            this.$message.warning('分期金额与合同总金额不符,请检查');
        }
        else{
          this.HTadd(this.$store.state.form_variable);
          this.visible = false;
          this.$refs.child.setFormValue();
        }
        
      },
      async HTadd(value){
          await apiadd(value).then(res=>{
              this.$refs.child.handleUpload(res.id);
              this.$store.dispatch('form_variable_d');
              this.showall();
              this.$message.success('添加成功');

          }).catch(()=>{
              this.$message.error('添加失败');
          })

      },
      showDrawer(){
          this.visible=true;
      },
      
        handleCancel() {
            this.$refs.child.setFormValue();
            this.visible = false;
        },
        hand_cancel(){
            this.visible = false;
        },
        onClose() {
          this.visible = false;
        },



        async bt(){
          const v={
            ht_id:this.ht_id,
            ht_name:this.ht_name,
            xm_ht:this.xm_ht
          }
          await apisearch(v).then(res=>{
            this.data_format(res);
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

