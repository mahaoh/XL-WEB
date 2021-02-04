<template>
  <div class="hello">
      <div class="imgBox">
          <img src="../../public/img/logo.jpg" alt="">
      </div>
      
      <van-cell-group class="mm">
  <van-field v-model="value"   placeholder="请输入快递单号" />
 

</van-cell-group>
<van-field
  readonly
  
  clickable
  :value="value3"
  placeholder="选择快递"
  @click="showPicker = true"
/>
<van-button type="primary" @click="cz">查找</van-button>
   <van-steps class="sss" direction="vertical" :active="list.length" >
    <van-step v-for="(item,index) in list" :key="index">
        <h3>{{item.AcceptStation}}</h3>
        <p>{{item.AcceptTime}}</p>
    </van-step>
    
    
    </van-steps>
<!-- <van-empty v-else description="描述文字" /> -->

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
        Url : 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
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
    if(this.value ==""){
         this.$toast.fail('请输入快递单号');
         return false
    }
    if(this.val3 ==""){
        this.$toast.fail('请选择快递公司');
         return false
    } else {
            console.log( this.val3,this.value )
         this.post(this.Url,this.getParams( this.val3,this.value)).then(res=>{
             if(res.data.Traces.length == 0 || !res.data.Traces){
                  this.$toast.fail('查询错误！请联系客服');
                  this.list = [];
             } else {
                 this.list = res.data.Traces
             }
          
   
})
    }

}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
    width: 90%;
    margin: 0 auto;
    div.mm{
        margin-bottom: 20px;
    }
    button{
        width: 100%;
        margin-bottom: 20px;
    }
}
.imgBox{
    margin:  0 auto;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    overflow: hidden;
    margin-top: 1rem;
    margin-bottom: 1rem;
    img{
        width: 3rem;
        height: 3rem;
    }
}
.sss{
    width: 90%;
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
