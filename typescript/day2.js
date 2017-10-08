var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Data types in TypeScript
var a = false;
var b = 42;
var c = "Helo";
var d = "this is anything but not `never`";
var e; // Can not assign to never type
// Function Interface
var f = function f() { };
// Ommit data type (TypeScript auto detect it if it can)
var g = "YOLO, Who needs type ?";
// Array or Collections
var h = [1, 2, 3]; // Short syntax
var i = [4, 5, 6]; // Array type
// Emum
var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 0] = "MALE";
    Gender[Gender["FEMALE"] = 1] = "FEMALE";
})(Gender || (Gender = {})); // Start from MALE = 0
var gender = Gender.FEMALE;
var Ranking;
(function (Ranking) {
    Ranking[Ranking["FIRST"] = 1] = "FIRST";
    Ranking[Ranking["SECOND"] = 2] = "SECOND";
    Ranking[Ranking["THIRD"] = 3] = "THIRD";
})(Ranking || (Ranking = {})); // Specify a custom start number
var ranking = Ranking.SECOND; // 2
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["WAITING"] = "waiting";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["COMPLETED"] = "completed";
})(OrderStatus || (OrderStatus = {}));
var orderStatus = OrderStatus.PROCESSING; // processing
// Typehint on parameters and returned value
function sum(a, b) {
    return a + b;
}
// void : mean no returning a value
function hello(name) {
    console.log("Hello " + name);
}
// Fat arrow
var func1 = function (x) { return x * 2; }; // return type inferred
var func2 = function (x) { return x * 2; }; // explicit return type
var func3 = function (x) { return x * 2; }; // return type inferred without braces
// Object implements interface
var userModel = {
    name: "user",
    fields: [
        { name: "id", data_type: "number" },
        { name: "username", data_type: "string" },
        { name: "password", data_type: "string" },
    ],
    save: function () {
        return this;
    }
};
var cubicEasing;
cubicEasing = function (currentTime, startValue, endValue, duration) {
    var t = currentTime / duration;
    var distance = endValue - startValue;
    return distance * t * t * t + startValue;
};
// Classes
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (y === void 0) { y = 0; }
        this.y = y;
        this.x = x;
    }
    // method
    Point.prototype.dist = function () { return Math.sqrt(this.x * this.x + this.y * this.y); };
    // static
    Point.origin = new Point(0, 0);
    return Point;
}());
var p1 = new Point(1, 2); // (1; 2)
var p2 = new Point(10); // (10; 0)
var Point3D = /** @class */ (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        var _this = _super.call(this, x, y) || this;
        _this.y = y;
        _this.z = z;
        return _this;
    }
    Point3D.prototype.dist = function () {
        var d = _super.prototype.dist.call(this);
        return Math.sqrt(d * d + this.z * this.z);
    };
    Point3D.origin = new Point3D(0, 0, 0);
    return Point3D;
}(Point));
// Module
var Database;
(function (Database) {
    var Connection = /** @class */ (function () {
        function Connection(user, passwd, host, port) {
            if (host === void 0) { host = "127.0.0.1"; }
            if (port === void 0) { port = 3306; }
            this.host = host;
            this.port = port;
            this.user = user;
            this.passwd = passwd;
        }
        Connection.prototype.connect = function () {
            // do something to connect
        };
        return Connection;
    }());
    Database.Connection = Connection;
})(Database || (Database = {}));
var dbConnection = new Database.Connection("root", "hardtoguessme");
dbConnection.connect();
// Generics
var List = /** @class */ (function () {
    function List() {
        this.items = [];
    }
    List.prototype.push = function (item) {
        this.items.push(item);
    };
    return List;
}());
var listOfPoint = new List();
listOfPoint.push(new Point(1, 4));
listOfPoint.push(Point.origin);
// String Interpolation with Template Strings
var myName = "KhanhIceTea";
var helloString = "Hello " + myName + ",\nhow is it going ? :))"; // Multiline is supported
console.log(helloString);
// WELL DONE
console.log("Well done !!!! WELCOME TO TYPESCRIPT !!!");
//# sourceMappingURL=day2.js.map