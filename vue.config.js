// module.exports = {
  
    
//   }

const mockdata = require('./mock/data.json');

module.exports={
  devServer: {
    port:4000,
    before(app){
      app.get('/goods/list',(req,res,next)=>{
        res.json(mockdata);
      })
    }
  }
}
  