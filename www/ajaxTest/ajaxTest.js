// generated by VivioJS 22.02 build 0 : 14-Feb-22 14:27:33

"use strict"

function ajaxTest(vplayer) {

	// const imports
	const BLACK = vplayer.BLACK
	const BLUE = vplayer.BLUE
	const CYAN = vplayer.CYAN
	const GRAY128 = vplayer.GRAY128
	const GRAY160 = vplayer.GRAY160
	const GRAY192 = vplayer.GRAY192
	const GRAY224 = vplayer.GRAY224
	const GRAY32 = vplayer.GRAY32
	const GRAY64 = vplayer.GRAY64
	const GRAY96 = vplayer.GRAY96
	const GREEN = vplayer.GREEN
	const HLEFT = vplayer.HLEFT
	const ITALIC = vplayer.ITALIC
	const MAGENTA = vplayer.MAGENTA
	const RED = vplayer.RED
	const WHITE = vplayer.WHITE
	const YELLOW = vplayer.YELLOW

	// var imports
	var $addGlobalEventHandler = vplayer.$addGlobalEventHandler
	var $addWaitToEventQ = vplayer.$addWaitToEventQ
	var $g = vplayer.$g
	var $terminateThread = vplayer.$terminateThread
	var Font = vplayer.Font
	var Line2 = vplayer.Line2
	var newArray = vplayer.newArray
	var random = vplayer.random
	var Rectangle2 = vplayer.Rectangle2
	var setBgBrush = vplayer.setBgBrush
	var setVirtualWindow = vplayer.setVirtualWindow
	var SolidBrush = vplayer.SolidBrush
	var SolidPen = vplayer.SolidPen
	var sprintf = vplayer.sprintf
	var VObj = vplayer.VObj

	// const declarations
	const W=1024
	const H=620
	const GW=W/2
	const GH=H/2

	var $thread = 0
	var $pc = 0
	var $fp = -1
	var $sp = -1
	var $acc = 0
	var $obj = 0
	var $stack = 0
	var $testFlag = 0

	function $call(pc, obj) {
		if (obj === undefined)
			obj = 0
		let l = arguments.length - 1
		for (let i = l; i >= 2; i--)
			$stack[++$sp] = arguments[i]
		$acc = obj
		$stack[++$sp] = $pc + 1
		$pc = pc
		return $acc
	}

	function $enter(n) {	// n = # local variables
		$stack[++$sp] = $obj
		$stack[++$sp] = $fp
		$fp = $sp
		$obj = $acc
		$sp += n
	}

	function $return(n) {	// n = # parameters to pop
		$sp = $fp
		$fp = $stack[$sp--]
		$obj = $stack[$sp--]
		$pc = $stack[$sp--]
		if ($pc == -1) {
			$terminateThread($thread)
			$thread = 0
			return
		}
		$sp -= n
	}

	function $suspendThread() {
		if ($thread == 0)
			return 0;
		$thread.pc = $pc
		$thread.fp = $fp
		$thread.sp = $sp
		$thread.acc = $acc
		$thread.obj = $obj
		return $thread
	}

	function $getCurrentThread() {
		return $thread
	}

	function $resumeThread(toThread) {
		$pc = toThread.pc
		$fp = toThread.fp
		$sp = toThread.sp
		$acc = toThread.acc
		$obj = toThread.obj
		$stack = toThread.stack
		$thread = toThread
	}

	function $switchToThread(toThread) {
		if ($thread == toThread) {
			$acc = toThread.acc
			return
		}
		$suspendThread()
		$resumeThread(toThread)
	}

	function wait(ticks) {
		$suspendThread()
		$addWaitToEventQ(ticks, $thread)	// -ve ticks for a realtime wait
		return 1
	}

	function Graph(x, y, _w, _h) {
		VObj.call(this)
		this.$w=_w
		this.$h=_h
		this.$bar1=new Rectangle2($g[0], 0, 0, 0, $g[18], x, y+this.$h, this.$w/3, -this.$h)
		this.$bar2=new Rectangle2($g[0], 0, 0, 0, $g[19], x+this.$w/3, y+this.$h, this.$w/3, -this.$h)
		this.$bar3=new Rectangle2($g[0], 0, 0, 0, $g[20], x+this.$w/3*2, y+this.$h, this.$w/3, -this.$h)
		this.$bar1Txt=new Rectangle2($g[0], 0, 0, 0, 0, x, y+this.$h, this.$w/3, -this.$h/5)
		this.$bar2Txt=new Rectangle2($g[0], 0, 0, 0, 0, x+this.$w/3, y+this.$h, this.$w/3, -this.$h/5)
		this.$bar3Txt=new Rectangle2($g[0], 0, 0, 0, 0, x+2*this.$w/3, y+this.$h, this.$w/3, -this.$h/5)
		new Line2($g[0], 0, 0, $g[5], x, y, 0, this.$h+2)
		new Line2($g[0], 0, 0, $g[5], x-2, y+this.$h, this.$w+2, 0)
		this.$vTxt=new Rectangle2($g[0], 0, HLEFT, 0, 0, x, y, this.$w, this.$h/10, $g[13], $g[31])
		this.$tTxt=new Rectangle2($g[0], 0, 0, 0, 0, x, y+this.$h, this.$w, this.$h/5, $g[3])
		this.$arg=newArray(5)
		this.$update("5.2.0-8+etch7 12:34:56 1 2 3")
	}
	Graph.prototype = Object.create(VObj.prototype)

	Graph.prototype.$update = function(s) {
		this.$arg=s.split(" ")
		this.$vTxt.setTxt(" php version: "+this.$arg[0])
		this.$tTxt.setTxt(this.$arg[1])
		let v0=this.$arg[2].toNum()
		let v1=this.$arg[3].toNum()
		let v2=this.$arg[4].toNum()
		this.$bar1.setSz(this.$w/3, v0*this.$h/10)
		this.$bar1Txt.setTxt("%d", v0)
		this.$bar2.setSz(this.$w/3, v1*this.$h/10)
		this.$bar2Txt.setTxt("%d", v1)
		this.$bar3.setSz(this.$w/3, v2*this.$h/10)
		this.$bar3Txt.setTxt("%d", v2)
	}

	function $eh0(s) {
		$g[32].$update(s)
		return 0
	}

	function $execute(thread) {

		$switchToThread(thread);

		while (1) {
			switch ($pc) {
			case -1:
				return;		// catch thread termination
			case 0:
				$enter(0)	// start with a function call
				$g[1]=new SolidPen(0, 0, BLACK)
				$g[2]=new SolidPen(0, 0, WHITE)
				$g[3]=new SolidPen(0, 0, RED)
				$g[4]=new SolidPen(0, 0, GREEN)
				$g[5]=new SolidPen(0, 0, BLUE)
				$g[6]=new SolidPen(0, 0, YELLOW)
				$g[7]=new SolidPen(0, 0, MAGENTA)
				$g[8]=new SolidPen(0, 0, CYAN)
				$g[9]=new SolidPen(0, 0, GRAY32)
				$g[10]=new SolidPen(0, 0, GRAY64)
				$g[11]=new SolidPen(0, 0, GRAY96)
				$g[12]=new SolidPen(0, 0, GRAY128)
				$g[13]=new SolidPen(0, 0, GRAY160)
				$g[14]=new SolidPen(0, 0, GRAY192)
				$g[15]=new SolidPen(0, 0, GRAY224)
				$g[16]=new SolidBrush(BLACK)
				$g[17]=new SolidBrush(WHITE)
				$g[18]=new SolidBrush(RED)
				$g[19]=new SolidBrush(GREEN)
				$g[20]=new SolidBrush(BLUE)
				$g[21]=new SolidBrush(YELLOW)
				$g[22]=new SolidBrush(MAGENTA)
				$g[23]=new SolidBrush(CYAN)
				$g[24]=new SolidBrush(GRAY32)
				$g[25]=new SolidBrush(GRAY64)
				$g[26]=new SolidBrush(GRAY96)
				$g[27]=new SolidBrush(GRAY128)
				$g[28]=new SolidBrush(GRAY160)
				$g[29]=new SolidBrush(GRAY192)
				$g[30]=new SolidBrush(GRAY224)
				setVirtualWindow(0, 0, W, H, 1)
				setBgBrush($g[29])
				$g[31]=new Font("sans-serif", 14, ITALIC)
				$g[32]=new Graph((W-GW)/2, (H-GH)/2, GW, GH)
				$g[33]=0
				$pc = 1
			case 1:
				if (!($g[33]<10)) {
					$pc = 4
					continue
				}
				$pc = 2
				if (wait(1)) {
					return
				}
			case 2:
				$g[32].$update(sprintf("5.2.0-8+etch7 12:34:56 %d %d %d", (random()*10)|0, (random()*10)|0, (random()*10)|0))
				$pc = 3
			case 3:
				$g[33]++
				$pc = 1
				continue
			case 4:
				$addGlobalEventHandler("eventFire", 0, $eh0)
				$return(0)
				continue
			}
		}
	}

	this.$getCurrentThread = $getCurrentThread
	this.$execute = $execute
	this.$resumeThread = $resumeThread
	this.$suspendThread = $suspendThread
	this.$switchToThread = $switchToThread
	this.$testFlag = $testFlag

}

// eof
