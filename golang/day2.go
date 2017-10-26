package main

import (
	"fmt"
	"time"
)

func main() {
	chanChanChanChan()
	bufferedChan()
	synchronizeTask()
	pingPongGame()
	selectChannel()
	outOfTime()
	nonBlockingChannelWithSelect()
	closeChannel()
	rangeOverChannel()
	doSomethingLater()
	doInterval()
}

func chanChanChanChan() {
	chan1 := make(chan string)
	chan2 := make(chan string)

	// By default sends and receives block until both the sender and receiver are ready.
	go func() {
		fmt.Println("[1] Passing chan2 !")
		chan2 <- "Chan2"
		fmt.Println("[1] Passed chan2 !")
	}()

	go func() {
		fmt.Println("[1] Receiving chan2 !")
		chan2Msg := <-chan2
		fmt.Println("[1] Received chan2 !")

		chan2Msg += " Chan1"

		fmt.Println("[1] Passing chan1 !")
		chan1 <- chan2Msg
		fmt.Println("[1] Passed chan1 !")
	}()

	fmt.Println("[1] Waiting for chan1 message ...")
	msg := <-chan1
	fmt.Println("[1] Message from goroutines :", msg)
}

func bufferedChan() {
	chan1 := make(chan string, 2) // second parameter is number of messages the channel will handle, it creates Buffered Channel

	go func() {
		fmt.Println("[2] Passing chan2 !")
		chan1 <- "Chan2" // Buffered Chan doesn't need to wait concurrent receiving
		fmt.Println("[2] Passed chan2 !")
	}()

	go func() {
		fmt.Println("[2] Passing chan1 !")
		chan1 <- "Chan1" // Buffered Chan doesn't need to wait concurrent receiving
		fmt.Println("[2] Passed chan1 !")
	}()

	fmt.Println("[2] Waiting for chan1 message ...")
	time.Sleep(time.Second * 3) // Wait 3 seconds to wait message passing to buff chan
	msg := <-chan1
	msg += <-chan1
	fmt.Println("[2] Message from buffered chan :")
}

func synchronizeTask() {
	done := make(chan bool)

	go func(ok chan bool) {
		fmt.Println("[3] Working ...")
		time.Sleep(time.Second)
		fmt.Println("[3] Done ...")

		ok <- true
	}(done)

	<-done
	fmt.Println("[3] Lets relax !")
}

// Channel direction
func ping(rchan chan<- string, msg string) {
	rchan <- msg
}

func pong(rchan <-chan string, schan chan<- string) {
	tmp := <-rchan
	schan <- tmp
}

func pingPongGame() {
	chan1 := make(chan string, 1)
	chan2 := make(chan string, 1)

	ping(chan1, "Game over !")
	pong(chan1, chan2)
	pingPongMsg := <-chan2
	fmt.Println("[4] Ping pong message :", pingPongMsg)
}

func selectChannel() {
	c1 := make(chan string)
	c2 := make(chan string)

	go func() {
		time.Sleep(time.Second)
		c1 <- "msg1"
	}()

	go func() {
		time.Sleep(time.Second * 2)
		c2 <- "msg2"
	}()

	// Wait multi channel, whole func take ~2 seconds because of sleeping concurrently
	for i := 0; i < 2; i++ {
		select {
		case msg1 := <-c1:
			fmt.Println("[5] Received :", msg1)
		case msg2 := <-c2:
			fmt.Println("[5] Received :", msg2)
		}
	}
}

func outOfTime() { // Timeout using select channel
	chan1 := make(chan string)

	go func() {
		time.Sleep(time.Second * 2)
		chan1 <- "here result after 2 seconds"
	}()

	select {
	case msg := <-chan1:
		fmt.Println("[6] Message from chan1", msg)
	case <-time.After(time.Second):
		fmt.Println("[6] Your time is out ! You only have 1 second !")
	}
}

func nonBlockingChannelWithSelect() {
	chan1 := make(chan string)

	select {
	case msg := <-chan1:
		fmt.Println("[7] Ahh... got it !", msg)
	default:
		fmt.Println("[7] Nothing here !")
	}
}

func closeChannel() {
	jobs := make(chan string, 3)
	done := make(chan bool)

	go func() {
		for {
			j, more := <-jobs
			if more {
				fmt.Println("[8] received a job", j)
			} else {
				fmt.Println("[8] received all jobs")
				done <- true
			}
		}
	}()

	for i := 0; i < 3; i++ {
		jobs <- "hahaha"
		fmt.Println("[8] sent a job")
	}
	close(jobs)
	fmt.Println("[8] sent all jobs")

	<-done
}

func rangeOverChannel() {
	chan1 := make(chan string, 3)
	chan1 <- "1"
	chan1 <- "2"
	chan1 <- "3"

	close(chan1)
	for msg := range chan1 {
		fmt.Println("[9] range over :", msg)
	}
}

func doSomethingLater() {
	timer1 := time.NewTimer(time.Second * 2)

	<-timer1.C
	fmt.Println("[10] timer1 is expired")

	timer2 := time.NewTicker(time.Second * 2)
	go func() {
		<-timer2.C
		fmt.Println("[10] timer2 is expired")
	}()
	timer2.Stop()
	fmt.Println("[10] timer2 is stopped")
}

func doInterval() {
	ticker := time.NewTicker(time.Millisecond * 500)
	go func() {
		for t := range ticker.C {
			fmt.Println("[11] do job interval at", t)
		}
	}()
	time.Sleep(time.Second * 3)
	ticker.Stop()
	fmt.Println("[11] Ticker is stopped")
}
