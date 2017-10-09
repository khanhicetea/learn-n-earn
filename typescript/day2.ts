// Data types in TypeScript
let a: boolean = false;
let b: number = 42;
let c: string = "Helo";
let d: any = "this is anything but not `never`"
let e: never; // Can not assign to never type

// Function Interface
let f: Function = function f() {};

// Ommit data type (TypeScript auto detect it if it can)
let g = "YOLO, Who needs type ?"

// Array or Collections
let h: number[] = [1,2,3]; // Short syntax
let i: Array<number> = [4,5,6]; // Array type

// Emum
enum Gender { MALE, FEMALE } // Start from MALE = 0
let gender: Gender = Gender.FEMALE;
enum Ranking { FIRST = 1, SECOND, THIRD } // Specify a custom start number
let ranking: Ranking = Ranking.SECOND; // 2
enum OrderStatus { WAITING = "waiting", PROCESSING = "processing", COMPLETED = "completed"}
let orderStatus : OrderStatus = OrderStatus.PROCESSING; // processing

// Typehint on parameters and returned value
function sum(a: number, b: number): number {
    return a + b;
}

// void : mean no returning a value
function hello(name: string): void {
    console.log("Hello " + name);
}

// Fat arrow
let func1 = (x: number) => { return x * 2; } // return type inferred
let func2 = (x: number) : number => { return x * 2; } // explicit return type
let func3 = (x: number) => x * 2; // return type inferred without braces

// Interface : contract for properties, methods of class
interface Field {
    name: string;
    data_type: string;
}
interface Model {
    name: string; // property
    primary_key?: string; // ? marked for optional
    fields: Array<Field>; // Nested another interface
    save(): Model; // return itself
}

// Object implements interface
let userModel: Model = {
    name: "user",
    fields: [
        { name: "id", data_type: "number"},
        { name: "username", data_type: "string"},
        { name: "password", data_type: "string"},
    ],
    save: function () {
        return this;
    }
}

// Interface for function
interface EasingFunction {
    (currentTime: number, startValue: number, endValue: number, duration: number): number
}

let cubicEasing: EasingFunction;
cubicEasing = function(currentTime: number, startValue: number, endValue: number, duration: number): number {
    const t = currentTime / duration;
    const distance = endValue - startValue;
	return distance*t*t*t + startValue;
}

// Short interface for function
let f5: (x: number) => void = (x: number) => { console.log(x) }
f5(123);
let f6 = (x: number) => { console.log(x) }
f6(456);
let f7 = () => { console.log('Inferred interface') }
f7();

// Classes
class Point {
    // property
    x: number;

    constructor(x: number, public y: number = 0) { // can declare "y" in constructor
        this.x = x;
    }

    // method
    dist(): number { return Math.sqrt(this.x * this.x + this.y * this.y); }

    // static
    static origin = new Point(0, 0);
}

let p1: Point = new Point(1, 2); // (1; 2)
let p2: Point = new Point(10); // (10; 0)

class Point3D extends Point {
    constructor(x: number, public y: number = 0, public z: number = 0) {
        super(x, y); // overide constructor must use `super`
    }

    dist(): number {
        const d = super.dist();
        return Math.sqrt(d * d + this.z * this.z);
    }

    static origin = new Point3D(0, 0, 0);
}

// Module
module Database {
    export class Connection {
        user: string;
        passwd: string;

        constructor(
            user: string,
            passwd: string,
            public host: string = "127.0.0.1",
            public port: number = 3306
        ) {
            this.user = user;
            this.passwd = passwd;
        }
        connect(): void {
            // do something to connect
        }
    }
}

const dbConnection = new Database.Connection("root", "hardtoguessme");
dbConnection.connect();

// Generics
class List<T> {
    protected items: T[] = [];
    push(item: T) {
        this.items.push(item);
    }
}

const listOfPoint = new List<Point>();
listOfPoint.push(new Point(1, 4));
listOfPoint.push(Point.origin);

// String Interpolation with Template Strings
let myName: string = "KhanhIceTea";
let helloString = `Hello ${myName},
how is it going ? :))`; // Multiline is supported
console.log(helloString);

// WELL DONE
console.log("Well done !!!! WELCOME TO TYPESCRIPT !!!");