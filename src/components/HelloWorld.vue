<template>
  <div class="hello">
      <van-cell-group>
  <van-field v-model="value"  placeholder="请输入快递单号" />
 

</van-cell-group>
<van-field
  readonly
  clickable
  :value="value3"
  placeholder="选择快递"
  @click="showPicker = true"
/>
<van-button type="primary" @click="cz">查找</van-button>
   <van-steps class="sss" direction="vertical" :active="list.length">
    <van-step v-for="(item,index) in list" :key="index">
        <h3>{{item.AcceptStation}}</h3>
        <p>{{item.AcceptTime}}</p>
    </van-step>
   
    </van-steps>
   <van-popup v-model="showPicker" round position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>
  </div>
</template>

<script>
const axios = require('axios')
const md5Hex = require('md5-hex');
const querystring = require('querystring')

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
      return{
          value:'',
          value3:'',
       showPicker: false,
       val3:'',
      columns: [
          {
          text:"天天快递",
          val:'HHTT',
      },
      {
          text:"圆通速递",
          val:'YTO',
      },
     
      
      {
          text:"百世快递",
          val:'HTKY',
      },
      {
          text:'申通快递',
          val:'STO'
      }
      ],
        Url : 'https://api.kdniao.com/api/eorderservice',
        AppKey:'502db9f1-aa90-447d-98fc-6ab452cb2f03',
        EBusinessID:"1700273",
        list:[],
        active:''
      }
  },
  created(){
      
 
  },
  methods:{
      onConfirm(value) {
       
      this.value3 = value.text;
      this.val3 = value.val;
      this.showPicker = false;
    },
    getParams(ShipperCode,LogisticCode){
    //请求接口指令YTO  YT5221645339383
    const RequestType  = '1002';
    const RequestData = {'OrderCode': '','ShipperCode': ShipperCode, 'LogisticCode': LogisticCode}
    const DataSign = Buffer.from(md5Hex(JSON.stringify(RequestData)+this.AppKey)).toString('base64')
    const EBusinessID = this.EBusinessID;
    const reqParams = {
        RequestType,
        EBusinessID,
        DataSign,
        RequestData:JSON.stringify(RequestData),
        DataType:2
    }
    return reqParams
    },//请求参数
    async post(url,data){
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const res = await axios.post(url,querystring.stringify(data))
    return res
},
cz(){
 
    console.log( this.val3,this.value )
         this.post(this.Url,this.getParams( this.val3,this.value)).then(res=>{
          this.list = res.data.Traces
    console.log(res.data)
})
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.sss{
    width: 80%;
    background: #fff;
    margin: 0 auto;
    border-radius: 15px;
    h3{
        display: inline-block;
        text-align: left;
        width: 100%;
        margin-top: 0;
        font-size: 15px;
        padding-bottom: 10px;
    }
    p{
        text-align: left;
        font-size: 15px;
    }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
