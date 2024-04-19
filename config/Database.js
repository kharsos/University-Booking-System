const {Sequelize}= require('sequelize')


const sequelize=new Sequelize('Booking-system.db','user','pass',{
    dialect:'sqlite',
    host:'./dev.sqlite'
})
module.exports=sequelize;





// let db = new sqlite3.Database(dbname,(err)=>{
//     if(err)
//     throw err
//     console.log('Database stated on '+dbname)
// });

// db.close(err=>{
//     if(err)
//     throw err 
// console.log('Database closed .')
// });