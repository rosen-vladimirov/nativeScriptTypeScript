"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var observable = require("data/observable");
function sampleDecorator(methodName) {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log("Decorator replaced method!");
            this.set("message", methodName + " from decorator, counter =  " + (this.counter--));
        };
        return descriptor;
    };
}
exports.sampleDecorator = sampleDecorator;
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        // Initialize default values.
        this.counter = 42;
        this.set("message", this.counter + " taps left");
    }
    HelloWorldModel.prototype.tapAction = function () {
        this.counter--;
        if (this.counter <= 0) {
            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
        }
        else {
            this.set("message", this.counter + " taps left");
        }
    };
    __decorate([
        sampleDecorator("message")
    ], HelloWorldModel.prototype, "tapAction", null);
    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
// Equivalent JS code:
//var observable = require("data/observable");
//
//var counter = 42;
//
//var mainViewModel = new observable.Observable();
//mainViewModel.set("message", counter + " taps left");
//mainViewModel.tapAction = function () {
//    counter--;
//    if (counter <= 0) {
//        mainViewModel.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
//    }
//    else {
//        mainViewModel.set("message", counter + " taps left");
//    }
//};
//exports.mainViewModel = mainViewModel; 
//# sourceMappingURL=main-view-model.js.map