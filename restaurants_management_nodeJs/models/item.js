
var mongoose = require('mongoose');
var optionSchema = new mongoose.Schema({  
                  name:String,
                  price:Number,
                  selected :{
                     type :  Boolean , 
                     default : false
                  },
               }) ;
var customizationSchema = new mongoose.Schema({  
        label:String,
        type: String,
        max : Number, 
        min : Number,
        pricing : {
         type : Number , 
         default : 0,
        },
        disabled : {
         type : Boolean , 
         default : false ,
        }, 
        options:[ optionSchema]
         }) ;
// var taxesSchema = new mongoose.Schema({
//         type : String , 
//         percent : Number ,
//         fixed : Number ,
//         name : String 
//       });
var itemSchema = new mongoose.Schema({
      restaurantId : mongoose.Types.ObjectId ,
      cuisineId : mongoose.Types.ObjectId , 
      cuisineName :String ,
      name : String ,
      price : Number ,
      description : String ,
      taxes : [{ type: mongoose.Schema.ObjectId, ref: 'Taxes' }],
      customization : [customizationSchema]
});

var Items = [  
   {  
      "id":1,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":2,
      "cuisineName":"Starters",
      "name":"Starter 1",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ],
      "customization":[  
         {  
            "label":"Choose size",
            "type":"select",
            "pricing":0,
            "options":[  
               {  
                  "id":253,
                  "name":"Regular",
                  "price":90
               },  
               {  
                  "id":2543,
                  "name":"Large",
                  "price":140
               }
            ]
         },
         {  
            "label":"Choose Add ons",
            "type":"checkbox",
            "pricing":0,
            "options":[  
               {  
                  "id":32,
                  "name":"Tomatoes",
                  "price":20
               },
               {  
                  "id":29,
                  "name":"Onions",
                  "price":10
               }
            ]
         }
      ]
   },
   {  
      "id":2,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":2,
      "cuisineName":"Starters",
      "name":"Starter 2",
      "price":90,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":3,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":2,
      "cuisineName":"Starter",
      "name":"Starter 3",
      "price":10,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":4,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":2,
      "cuisineName":"Starters",
      "name":"Starter 4",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":5,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":2,
      "cuisineName":"Starters",
      "name":"Starter 5",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":6,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 1",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":7,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 2",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":8,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 3",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":9,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 4",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":10,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 5",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":11,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 6",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":12,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 7",
      "price":100,
      "description":"brief description",
      "taxes":[  
        {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
   },
   {  
      "id":13,
      "restaurantId":"5c8f78577c5731117276cdb7",
      "cuisineId":1,
      "cuisineName":"Burgers",
      "name":"Chicken Tikka burger 8",
      "price":100,
      "description":"brief description",
      "taxes":[  
         {  
            "id":234,
            "type":"percent",
            "percent":2.5,
            "name":"CGST"
         },
         {  
            "id":254,
            "type":"percent",
            "percent":2.5,
            "name":"SGST"
         },
         {  
            "id":439,
            "type":"fixed",
            "fixed":500,
            "name":"fixed"
         }
      ]
    }
] ;
var item = mongoose.model('item',itemSchema);
item.find({},function(err,result){
  // console.log(result);
  if(err){
    console.log(err);
  }
  else if(!result[0]){
    item.insertMany(Items,function(err,docs){
      if(err)
        console.log(err);
      else
        console.log(docs);
    })
  }
    
})

module.exports = item ; 
