//import jsonweb token
const { use } = require('express/lib/application')
const jwt = require('jsonwebtoken')

//import User
const db = require('./db')


database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 50000, transaction: [] },
  1001: { acno: 1001, uname: "ammu", password: 1001, balance: 55000, transaction: [] },
  1002: { acno: 1002, uname: "appu", password: 1002, balance: 60000, transaction: [] }
}



//rester fuction

const register = (acno, password, uname) => {

  //asyncronous
  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "already exist"
        }
      }
      else {
        const newUser = new db.User({
          acno,
          uname,
          password,
          balance: 0,
          transaction: []
        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "succsefully registerdd"
        }

      }
    })

}






// login
const login = (acno, password) => {
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {
        currentAcno = acno

        currentUname = user.uname

        // token genaration
        const token = jwt.sign({
          currentAcno: acno
        }, 'supersecretkey123')

        return {
          statusCode: 200,
          status: true,
          message: "succsefully login",
          currentAcno,
          currentUname,
          token
        }

      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorect password or account nmbr"
        }

      }


    })


}



// deposite function
const deposite = (acno, password, amt) => {
  var amount = parseInt(amt)

  //asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {

        user.balance += amount
        user.transaction.push({
          amount: amount,
          type: "CREDIT"
        })
        user.save()
        return {
          statusCode: 200,
          status: true,
          message: amount + ` succesfully deposited and new balance is ` + user.balance

        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorect password/account number!!!!"
        }

      }
    })

}




//withdrow
const withdrow = (req, acno, password, amt) => {
  var amount = parseInt(amt)
  var currentAcno = req.currentAcno
  //asyncronous


  return db.User.findOne({ acno, password })
    .then(user => {

      if (user) {
        if (currentAcno != acno) {
          return {
            statusCode: 422,
            status: false,
            message: "operation deneid!!!!"
          }

        }
        if (user.balance > amount) {
          user.balance -= amount
          user.transaction.push({
            amount: amount,
            type: "DEBIT"
          })
          user.save()
          return {
            statusCode: 200,
            status: true,
            message: amount + ` succesfully debited and new balance is ` + user.balance

          }

        }
        else {
          return {
            statusCode: 422,
            status: false,
            message: "insufficient balance!!!!"
          }

        }


      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorect password/account number!!!!"
        }

      }
    })

}






//getTransaction
const getTransaction = (acno) => {

  //asyncronous
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        statusCode: 200,
        status: true,
        transaction: user.transaction
  
      }

    }
    else{
      return {
        statusCode: 422,
        status: false,
        message: "invalid user!!!!"
      }
  

    }
  })

}

const deleteAcc = (acno)=>{
return db.User.deleteOne({acno})
.then(user=>{
  if(!user){
return{
  statusCode: 422,
  status: false,
  message: "operation faild ..!!!!"
    }
  }
return{
  statusCode: 200,
  status: true,
  message: "user "+acno+" deleted"

}
})
}


module.exports = {
  register,
  login,
  deposite,
  withdrow,
  getTransaction,
  deleteAcc
}