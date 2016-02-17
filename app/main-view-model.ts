"use strict";

import observable = require("data/observable");

export function sampleDecorator(methodName: string): any {
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
		let originalMethod = descriptor.value;
		descriptor.value = function(...args: any[]) {
			console.log("Decorator replaced method!")
			this.set("message", methodName + " from decorator, counter =  " + (this.counter--));
		};
		return descriptor;
	};
}

export class HelloWorldModel extends observable.Observable {
    private counter: number;
    constructor() {
        super();

        // Initialize default values.
        this.counter = 42;
        this.set("message", this.counter + " taps left");
    }

	@sampleDecorator("message")
    public tapAction() {
        this.counter--;
        if (this.counter <= 0) {
            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
        }
        else {
            this.set("message", this.counter + " taps left");
        }
    }
}
export var mainViewModel = new HelloWorldModel();

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