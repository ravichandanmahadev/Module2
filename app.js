(function(){
'use strict';
angular.module("ShoppingList",[])
.controller("BuyController",BuyControllerFunction)
.controller("BoughtController", BoughtControllerFunction)
.provider("BuyService", BuyServiceProvider)
.config(config);

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

//BuyServiceProvider method
function BuyServiceProvider()
{
  var provider = this;
  //initialize blank array and masterlist will be populated in config service
  provider.Default = {MasterList: []};
  provider.$get = function(){
    return new ShoppingService(provider.Default.MasterList);
  }
  return provider;
}

 // shopping service with basic Get Buylist, BoughtList and Buy Item
  function ShoppingService(list)
  {
    var service = this;
    service.buylist =list;//initialize masterlist (From Configuration)
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

// Initialize the masterlist of buy items
  function config(BuyServiceProvider)
  {
    //default buy list
     BuyServiceProvider.Default.MasterList = [
     {item:"Cookie", quantity:4},
     {item:"Chips", quantity:12},
     {item:"Soda", quantity:18},
     {item:"Chocolates", quantity:20},
     {item:"Ice Cream", quantity:15},
     {item:"Donuts", quantity:10}];
  }

})();
