const Sequelize = require('sequelize')

var sequelize = new Sequelize('d2i2vmn17sjel5', 'zvpauaiyzjjszu', '8ddb7972546002d3e5c31234c25aa9f1787fa6f2f7615ea7bdc8d091fa40ac4c', {     
    host: 'ec2-3-231-46-238.compute-1.amazonaws.com',     
    dialect: 'postgres',     
    port: 5432,     
    dialectOptions: {         
        ssl: true     
    } 
}); 

//to make People table
var People = sequelize.define('People',{
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    city:Sequelize.STRING

})

//to make Car table
var Car = sequelize.define('Car',{
    vin: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
    },
    make: Sequelize.STRING,
    model: Sequelize.STRING,
    year:Sequelize.STRING

})

//to make Store table
var Store = sequelize.define('Store',{
    retailer:Sequelize.STRING,
    phone:Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING
})

Car.hasMany(People, {foreignKey: 'vin'});


module.exports.initialize=function(){
    return new Promise(function(resolve,reject){

        sequelize.sync()
        .then(function(){           
            resolve('Connection has been established successfully.');
        })
        .catch(()=> {         
            reject('Unable to connect to the database');
        });
    })
}

module.exports.getAllPeople=function(){
    return new Promise(function(resolve,reject){
        People.findAll().then((data)=>{
            resolve(data);
        }).catch(()=>{
            reject('no results returned')
            return;
        })       
    })
}

module.exports.getCars=function(){
    return new Promise(function(resolve,reject){
        Car.findAll().then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.getStores=function(){
    return new Promise(function(resolve,reject){
        Store.findAll().then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.getStoresByRetailer=function(retailer){
    return new Promise(function(resolve,reject){
        Store.findAll({           
            where: {
                retailer: retailer}      //searches the Store retailer with the retailer the user inputs     
        }).then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.addPeople=function(peopleData){
    return new Promise(function(resolve,reject){
        for(let i in peopleData){
            if(peopleData[i]==""){
                peopleData[i]=null;
            }
        }
        People.create(peopleData).then(()=>{ 
            resolve();
        })
        .catch((err)=>{
            reject('unable to update person')
        })
    })
}

module.exports.addStore=function(storeData){
    return new Promise(function(resolve,reject){
        for(let i in storeData){
            if(storeData[i]==""){
                storeData[i]=null;
            }
        }
        Store.create(storeData).then(()=>{ 
            resolve();
        })
        .catch((err)=>{
            reject('unable to create store')
        })
    })
}

module.exports.addCar=function(carData){
    return new Promise(function(resolve,reject){
        for(let i in carData){
            if(carData[i]==""){
                carData[i]=null;
            }
        }
        Car.create(carData).then(()=>{
        resolve();
         })
        .catch((err)=>{
            reject('unable to create car')
        })   
    })
}

module.exports.getPeopleByVin=function(vin){
    
    return new Promise(function(resolve,reject){        
        People.findAll({   
            where: {
                vin: vin
            }
        }).then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.getCarsByVin=function(vin){
    return new Promise(function(resolve,reject){
        Car.findAll({       
            where: {
                vin:vin
            }       
        }).then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        })
    })
}


module.exports.getCarsByMake=function(make){
    return new Promise(function(resolve,reject){
        Car.findAll({            
            where: {
                make: make
            }         
        }).then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        }) 
    })
}

module.exports.getCarsByYear=function(year){
    return new Promise(function(resolve,reject){
        Car.findAll({  
            where: {
                year: year
            }
        }).then(function(data){
            resolve(data)
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.updatePeople=function(peopleData){
    return new Promise(function(resolve, reject){       
        for(let i in peopleData){
            if(peopleData[i]==""){
                peopleData[i]=null;
            }
        }
        People.update(peopleData,{
            where: { id:peopleData.id }
        }).then(()=>{
            resolve();
        }).catch(()=>{
            reject('no results returned')
            return;
        })
    })
}

module.exports.updateStore=function(storeData){
    return new Promise(function(resolve, reject){       
        for(let i in storeData){
            if(storeData[i]==""){
                storeData[i]=null;
            }
        }
        People.update(storeData,{
            where: { id:storeData.id }
        }).then(()=>{
            resolve();
        }).catch(()=>{
            reject('unable to update store')
            return;
        }) 
    })
}

module.exports.updateCar=function(carData){
    return new Promise(function(resolve, reject){
        for(let i in carData){
            if(carData[i]==""){
                carData[i]=null;
            }
        }
        Car.update(carData,{
            where: {
                vin: carData.vin}
        }).then(()=>{
            resolve();
        }).catch(()=>{
            reject('unable to update car')
            return;
        })
    })
}

module.exports.getPeopleById=function(id){
    return new Promise(function(resolve, reject){
        People.findAll({     
            where: {
                id:id
            } 
        }).then(function(data){
            resolve(data[0])
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.getStoreById=function(id){
    return new Promise(function(resolve, reject){
        Store.findAll({         
            where: {
                id:id
            }     
        }).then(function(data){  
            resolve(data[0])
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.getCarByVin=function(vin){
    return new Promise(function(resolve,reject){
        Car.findAll({ 
            where: {
                vin:vin
            }
        }).then(function(data){
            resolve(data[0])
        }).catch(()=>{
            reject('no results returned')
        })
    })
}

module.exports.deleteCarByVin=function(vin){
    return new Promise(function(resolve,reject){
        Car.destroy({
            where:{
                vin:vin
            }
        }).then(function () { resolve() })
        .catch((err)=>{
            reject()
            return;
        })
    })
}

module.exports.deleteStoreById=function(id){
    return new Promise(function(resolve,reject){
        Store.destroy({
            where:{
                id: id
            }
        }).then(function () { resolve("destroyed") })
        .catch((err)=>{
            reject()
            return;
        })
    })
}

module.exports.deletePeopleById=function(id){
    return new Promise(function(resolve,reject){
        People.destroy({
            where:{
                id:id
            }
        }).then(function () { resolve("destroyed") })
        .catch((err)=>{
            reject()
            return;
        })
    })
}