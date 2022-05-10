// import statements
const express = require('express')
const dataService = require('./services/data.service')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//create an app using axpress
const app = express()

//use cors to specify origin
app.use(cors({
    origin:'http://localhost:4200'
}))

//to parse
app.use(express.json())

//resolve http request frm client
// get to read data
app.get('/',(req,res)=>{
    res.status(401).send('GET mehode')
})

// post to write data
app.post('/',(req,res)=>{
    res.send('POST mehode')
})

// put to update 
app.put('/',(req,res)=>{
    res.send('PUT mehode')
})

// patch partial modification
app.patch('/',(req,res)=>{
    res.send('PATCH mehode')
})

// delete to delete
app.delete('/',(req,res)=>{
    res.send('DELETE mehode')
})

//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log("application specific middleware");
    next()
}
app.use(appMiddleware)



  
//**** bank app API

//middleware creation to verify
const jwtMiddleware = (req,res,next)=>{
try{   const token = req.headers["x-access-token"]
    //verify
    const data = jwt.verify(token,'supersecretkey123')
    req.currentAcno = data.currentAcno
    next()
}
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login"

    })

}

}





//register API
app.post('/register',(req,res)=>{
dataService.register(req.body.acno,req.body.password,req.body.uname)
.then(result=>{
    res.status(result.statusCode).json(result);
})
})


//login
app.post('/login',(req,res)=>{
dataService.login(req.body.acno,req.body.password)
.then(result=>{
    res.status(result.statusCode).json(result)

})
})


//deposit
app.post('/deposite',jwtMiddleware,(req,res)=>{
result=dataService.deposite(req.body.acno,req.body.password,req.body.amt)
.then(result=>{
    res.status(result.statusCode).json(result)

})
})

//withdrow
app.post('/withdrow',jwtMiddleware,(req,res)=>{
dataService.withdrow(req,req.body.acno,req.body.password,req.body.amt)
.then(result=>{
    res.status(result.statusCode).json(result)

})   
 })

//transaction
    app.post('/transaction',jwtMiddleware,(req,res)=>{
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    
    })  
  })
//delete

  app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res)=>{
      dataService.deleteAcc(req.params.acno)
      .then(result=>{
        res.status(result.statusCode).json(result)
      })
  })

//set up the port number
app.listen(3000,()=>{
    console.log("server started at port no:3000");
})