(function(){
'use strict';
angular.module("ShoppingList",[])
.controller("BuyController",BuyControllerFunction)
.controller("BoughtController", BoughtControllerFunction)
.service("BuyService", BuyService);

BuyControllerFunction.$inject = ['BuyService'];
function BuyControllerFunction(BuyService)
  {
    var controller = this;
    //initialize array
    controller.BuyList = BuyService.GetBuyList();
    //Buyitem method
    controller.Buyitem = function(index){
       BuyService.Buy(index);
    };
  }

  BoughtControllerFunction.$inject = ['BuyService'];
  function BoughtControllerFunction(BuyService)
  {
    var controller2 = this;
    controller2.BoughtList = BuyService.GetBoughtList();
  }

 // buy service with basic Get Buylist, BoughtList and Buy Item
  function BuyService()
  {
      var service = this;
      service.buylist =[{item:"Cookie", quantity:4},
                      {item:"Chips", quantity:12},
                      {item:"Soda", quantity:18},
                      {item:"Chocolates", quantity:20},
                      {item:"Ice Cream", quantity:15},
                      {item:"Donuts", quantity:10}];
      service.boughtlist = [];
      service.GetBoughtList = function(){
      return service.boughtlist;
      }
      service.GetBuyList = function(){
      return service.buylist;
      }
      service.Buy= function(index){
        var item = service.buylist[index];//Get the item from buy list
        service.buylist.splice(index,1); //remove item from buylist
        service.boughtlist.push(item); // add item to boughtlist
      };
  }
})();
