# Go

![golang](https://golang.org/doc/gopher/frontpage.png)

Structure is based on [Learn Go in Y Minutes](https://learnxinyminutes.com/docs/go/)

## Install Go

Follow this guide : https://golang.org/doc/install

## Compile and Run go code every 1 second

```bash
$ watch -d -t -n 1 go run day1.go
```

## Recommended editor

Use **VisualStudio Code**

## Basics

View **day1.go** file

```go
package main

import (
	"fmt" // Formatting standard library
	m "math" // Alias an imported lib
	"strconv" // String conversion lib
	"net/http"
	"io/ioutil"
)

func main() {
	fmt.Println("Hello World ! go go go")

	moveIt()
}

func moveIt() {
	var x float64 // Declare variable
	x = 3 // Assign it to a value
	y := 4. // Declare and assign in 1-line
	fmt.Println(x, y, pythagore(x, y))

	goToTypes()
	followTheFlow()
	hmmmLikeClosure()
	doItTommorow()
	smashInterfaces()
	learnVariadicParams("hello", "khanhicetea", "a human")
	oopsSomethingWrong()
	goToWWW()

	fmt.Println("\n-------- THE END --------\n")
}

func pythagore(a float64, b float64) (float64) { // func [function name]( ...paramers ) (return types)
	return m.Sqrt(a * a + b * b)
}

func goToTypes() {
	a1 := 1 // Int
	a2 := 2.3 // Float
	a3 := "ほげほげ !!!" // Japanese string, lol
	a4 := 's' // Char, alias for int32, hold unicode code
	a5 := `This is "quoted" string,
	with new line and tab`
	a6 := byte('\n') // ASCII char, uint8
	fmt.Println(a1, a2, a3, a4, a5, a6)

	// Arrays
	var a7 [3]int // declare fixed array of 3 integer items
	a7[0] = 12
	a7[1] = 23
	a7[2] = 34

	a8 := [...]int{1,1,2,3,5,8,13} // no need count array length to declare
	fmt.Println(a7, a8)

	// Slices
	a9 := []int{1,2,3}
	a10 := make([]int, 3) // Allocate slide 3 ints, 0 intial value

	var a11 [][]float64 // declare only
	a12 := []byte("hello") // convert string to slice of chars
	
	fmt.Println(a9, a10, a11, a12)

	a9 = append(a9, 4, 5, 6) // append 3 items
	fmt.Println(a9)

	a13 := []int{10, 11}
	a9 = append(a9, []int{7, 8, 9}...) // merge 2 slices with suffix ...
	a9 = append(a9, a13...)
	fmt.Println(a9)

	a14 := "ignored value"
	_ = a14 // Ignore by _ , unused variable cause error

	a15 := map[string]int{
		"one": 1,
		"two": 2,
		"there": 3,
	}
	a15["four"] = 4
	
	fmt.Println(a15, a15["two"])

	a16, a17 := memoryZoo()
	fmt.Println(*a16, a17)
}

func memoryZoo() (a, b *int) {
	s := make([]int, 5)
	s[3] = 4
	o := 123

	a = &s[3] // can assign to returned var
	b = &o // & is ref memory address, like a pointer in C

	return // no need pass returned vars here
}

func followTheFlow() {
	if 1 + 1 == 2 {
		fmt.Println("Hmm .. it must me 10 ! Ya know ;)")
	}

	if 1 > 2 {
		fmt.Println("Universe goes down !")
	} else if 42 > 24 {
		fmt.Println("node_modules size is heavier than backhole !")
	} else {
		fmt.Println("Okay, I'm drunk")
	}

	a18 := 3

	switch a18 {
	case 1:
	case 2: // cases don't fall down like C-like lang
	case 3:
		fmt.Println("Three !!")
	default:
	}

	for i := 0; i < 3; i++ {
		fmt.Println(i)
	}

	numbers := map[string]int{
		"a": 1,
		"b": 2,
		"c": 5,
	}

	for key, num := range numbers { // loop a map
		fmt.Println(key, num)
	}

	for _, num := range numbers { // loop a map, no need key
		fmt.Println(num)
	}

	if a14 := 3 * 4; a14 < 13 { // last statement is condition
		fmt.Println("3 * 4 < 13")
	}
}

func hmmmLikeClosure() {
	a15 := add(15)
	a16 := a15(5)
	fmt.Println(a16)
}

func add(x int) func(y int) int {
	return func (y int) int {
		return x + y
	}
}

func doItTommorow() {
	a17 := testMyCode()
	fmt.Println(a17)
}

func testMyCode() int {
	defer fmt.Println("456") // defer : run before return
	fmt.Println("0")
	defer fmt.Println("789") // defer : run in LIFO order.
	return 123
}

type Stringer interface {
	String() string
}

type Point struct {
	x, y int
}

func (p Point) String() string {
	return fmt.Sprintf("(%d, %d)", p.x, p.y)
}

func smashInterfaces() {
	p := Point{3, 4}
	fmt.Println(p.String())

	var i Stringer // Declare i as Stringer interface
	i = p // Point implement Stringer interface
	fmt.Println(i.String())
}

func learnVariadicParams(strings ...interface{}) {
    // Iterate each value of the variadic.
    for _, s := range strings {
        fmt.Println("param :", s)
    }

    // Pass variadic value as a variadic parameter.
    fmt.Println("params :", fmt.Sprintln(strings...))
}

func oopsSomethingWrong() {
	numbers := map[string]int{
		"a": 1,
		"b": 2,
		"c": 5,
	}

	if x, ok := numbers["d"]; !ok {
		fmt.Println("Oops something went wrong !!!")
	} else {
		fmt.Println(x)
	}

	a18 := "1.2"
	if _, err := strconv.ParseInt(a18, 10, 8); err != nil { // check if err
		fmt.Println("true === false")
	}
}

func goToWWW() {
	go func() {
		err:= http.ListenAndServe("127.0.0.1:8888", WebServer{"KhanhIceTea server"})
		fmt.Println(err)
	}()

	crawlWeb()
}

type WebServer struct {
	name string
}

func (ws WebServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from "))
	w.Write([]byte(ws.name))
}

func crawlWeb() {
	resp, err := http.Get("http://127.0.0.1:8888")
	fmt.Println(err)
	defer resp.Body.Close() // Close body stream
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println("\nWebServer said : `%s`", string(body))
}
```
