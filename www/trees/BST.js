// generated by VivioJS 22.02 build 0 : 14-Feb-22 14:28:17

"use strict"

function BST(vplayer) {

	// preload fonts
	let font = new FontFace('Open Sans', 'url("../fonts/open-sans-v18-latin-regular.woff")', {weight:400})
	font.load()
	document.fonts.add(font)

	// const imports
	const ABSOLUTE = vplayer.ABSOLUTE
	const ARROW40_END = vplayer.ARROW40_END
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
	const MAGENTA = vplayer.MAGENTA
	const MB_LEFT = vplayer.MB_LEFT
	const PROPAGATE = vplayer.PROPAGATE
	const RED = vplayer.RED
	const ROUND_END = vplayer.ROUND_END
	const VCENTRE = vplayer.VCENTRE
	const VTOP = vplayer.VTOP
	const WHITE = vplayer.WHITE
	const YELLOW = vplayer.YELLOW

	// var imports
	var $addWaitToEventQ = vplayer.$addWaitToEventQ
	var $g = vplayer.$g
	var $terminateThread = vplayer.$terminateThread
	var checkPoint = vplayer.checkPoint
	var debug = vplayer.debug
	var Ellipse = vplayer.Ellipse
	var EXTENDEDGOBJ = vplayer.EXTENDEDGOBJ
	var Font = vplayer.Font
	var getArgAsNum = vplayer.getArgAsNum
	var getTick = vplayer.getTick
	var getTPS = vplayer.getTPS
	var Group = vplayer.Group
	var Layer = vplayer.Layer
	var Line = vplayer.Line
	var Line2 = vplayer.Line2
	var Rectangle2 = vplayer.Rectangle2
	var reset = vplayer.reset
	var rgba = vplayer.rgba
	var setBgBrush = vplayer.setBgBrush
	var setTPS = vplayer.setTPS
	var setVirtualWindow = vplayer.setVirtualWindow
	var SolidBrush = vplayer.SolidBrush
	var SolidPen = vplayer.SolidPen
	var start = vplayer.start
	var Txt = vplayer.Txt
	var VObj = vplayer.VObj

	// const declarations
	const W=1024
	const H=640
	const TITLEH=48
	const SZ=44
	const VSPACE=100
	const BALLSZ=30
	const TICKS=50

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

	function SimpleButton($grp, x, y, w, h, _b0, _b1, p0, _p1, txtpen, _f1, _f2, txt) {
		Group.call(this, $grp, 0, ((0) | EXTENDEDGOBJ), x, y, 0, 0, w, h)
		this.$b0=_b0
		this.$b1=_b1
		this.$p1=_p1
		this.$f1=_f1
		this.$f2=_f2
		this.$enabled=1
		this.setPen(p0)
		this.setBrush(this.$b0)
		this.setTxtPen(txtpen)
		this.setFont(this.$f1)
		this.setTxt(txt)
		this.setRounded(4, 4)
		this.$buttonFG=new Rectangle2(this, 0, 0, 0, 0, 1, 1, w-2, h-2)
		this.$buttonFG.setRounded(4, 4)
		this.addEventHandler("eventEE", this, this.$eh0)
		this.addEventHandler("eventMB", this, this.$eh1)
	}
	SimpleButton.prototype = Object.create(Group.prototype)

	SimpleButton.prototype.$eh0 = function(enter, $1, $2) {
		this.setBrush(enter ? this.$b1 : this.$b0)
		return PROPAGATE
	}

	SimpleButton.prototype.$eh1 = function(down, $1, $2, $3) {
		if (this.$enabled) {
			this.setFont(down ? this.$f2 : this.$f1)
			this.$buttonFG.setPen(down ? this.$p1 : 0)
		}
		return PROPAGATE
	}

	function BST() {
		VObj.call(this)
		this.$root=0
		this.$err
	}
	BST.prototype = Object.create(VObj.prototype)

	BST.prototype.$Node = function($parent, $grp, _key) {
		this.parent = $parent
		Group.call(this, $grp, 0, ((0) | EXTENDEDGOBJ), 0, 0, -SZ/2, -SZ/2, SZ, SZ)
		this.$key=_key
		this.$left=0
		this.$right=0
		this.$parent=0
		this.$x=0
		this.$y=0
		this.$arrow=new Line(this, 0, 0, $g[33], 0, 0, 0, 0, 0, -SZ/2)
		this.$arrow.setOpacity(0)
		this.$body=new Ellipse(this, $g[31], 0, $g[1], $g[18], 0, 0, -SZ/2, -SZ/2, SZ, SZ, $g[1], $g[39], "%d", this.$key)
		this.$body.setOpacity(0)
		this.addEventHandler("eventUPDATED", this, this.$eh2)
		this.$body.addEventHandler("eventMB", this, this.$eh3)
	}
	BST.prototype.$Node.prototype = Object.create(Group.prototype)

	BST.prototype.$Node.prototype.$eh2 = function() {
		if (this.$parent)
		this.$arrow.setPt(0, this.$parent.getPosX(1)-this.getPosX(1), this.$parent.getPosY(1)-this.getPosY(1))
	}

	BST.prototype.$Node.prototype.$eh3 = function(down, flags, $2, $3) {
		if (down&&(flags&MB_LEFT)) {
			$g[56]=this.$key
			$g[57].setTxt("%d", $g[56])
		}
	}

	BST.prototype.$setxy = function(n, parent, dx, x, y) {
		if (n==0)
		return
		n.$parent=parent
		n.$x=parent ? x+(n.$key<parent.$key ? -dx : dx) : x
		n.$y=y
		this.$setxy(n.$left, n, dx/2, n.$x, y+VSPACE)
		this.$setxy(n.$right, n, dx/2, n.$x, y+VSPACE)
	}

	BST.prototype.$set = function(n, imm) {
		if (n==0)
		return
		n.$body.setOpacity(1, TICKS, 0)
		n.$arrow.setOpacity(n.$parent ? 1 : 0, n.$parent ? TICKS : 0, 0)
		n.setPos(n.$x, n.$y, imm ? 0 : TICKS, 0)
		this.$set(n.$left, imm)
		this.$set(n.$right, imm)
	}

	BST.prototype.$redraw = function(imm) {
		this.$setxy(this.$root, 0, W/2, W/2, VSPACE)
		this.$set(this.$root, imm)
	}

	BST.prototype.$checkHelper = function(n) {
		if (n) {
			this.$err+=n.$left&&n.$left.$key>n.$key
			this.$err+=n.$right&&n.$right.$key<n.$key
			this.$checkHelper(n.$left)
			this.$checkHelper(n.$right)
		}
	}

	BST.prototype.$check = function() {
		this.$err=0
		this.$checkHelper(this.$root)
		if (this.$err) {
			debug("err=%d", this.$err)
			$g[60]++
		}
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
				$g[31]=new Layer(1)
				$g[32]=new Layer(2)
				setBgBrush($g[30])
				$g[33]=new SolidPen(0, 1, BLACK, ARROW40_END, 8, 8)
				$g[34]=new SolidPen(0, 2, GRAY64, ROUND_END)
				$g[35]=new SolidBrush(rgba(0, 0.5, 0))
				$g[36]=new SolidBrush(rgba(0, 0.56000000000000005, 0.16))
				$g[37]=new Font("Open Sans", 14, 0)
				$g[38]=new Font("Open Sans", 12, 0)
				$g[39]=new Font("Open Sans", 18, 0)
				$g[40]=new Font("Open Sans", 14, 0)
				$g[41]=new Font("Open Sans", 24, 0)
				$g[42]=new Font("Open Sans", 32, 0)
				$g[43]=new Ellipse($g[0], $g[32], 0, $g[1], $g[18], 0, 0, -BALLSZ/2, -BALLSZ/2, BALLSZ, BALLSZ, $g[1], $g[39])
				$g[43].setOpacity(0)
				$g[44]=new Ellipse($g[0], $g[32], 0, 0, $g[16], 0, 0, -BALLSZ/4, -BALLSZ/4, BALLSZ/2, BALLSZ/2)
				$g[44].setOpacity(0)
				$g[45]=new Ellipse($g[0], $g[32], 0, $g[1], $g[18], 0, 0, -SZ/2, -SZ/2, SZ, SZ, $g[1], $g[39])
				$g[45].setOpacity(0)
				$g[46]=new Rectangle2($g[0], 0, VCENTRE, 0, $g[36], 5, 5, W/2, TITLEH, $g[2], $g[42], "Binary Search Tree (BST)")
				$g[46].setRounded(5, 5)
				$g[46].setTxtOff(0, 2)
				$g[46].setPt(1, $g[46].getTxtW()+16, TITLEH)
				$g[47]=new Line2($g[0], 0, ABSOLUTE, $g[1], W/2-4, 20, W/2+4, 20)
				$g[48]=new Line2($g[0], 0, ABSOLUTE, $g[33], W/2, 20, W/2, VSPACE-SZ/2)
				$g[49]=new Txt($g[0], 0, HLEFT|VTOP, 5, H-40, $g[1], $g[41], "Press button to start animation.")
				$g[50]=new SimpleButton($g[0], 760, 10, 90, 25, $g[17], $g[30], $g[34], $g[12], $g[1], $g[37], $g[38], "sequence 1")
				$g[51]=new SimpleButton($g[0], 760, 40, 90, 25, $g[17], $g[30], $g[34], $g[12], $g[1], $g[37], $g[38], "sequence 2")
				$g[52]=new SimpleButton($g[0], 760, 70, 90, 25, $g[17], $g[30], $g[34], $g[12], $g[1], $g[37], $g[38], "reset")
				$g[53]=new SimpleButton($g[0], 860, 10, 90, 25, $g[17], $g[30], $g[34], $g[12], $g[1], $g[37], $g[38], "find")
				$g[54]=new SimpleButton($g[0], 860, 40, 90, 25, $g[17], $g[30], $g[34], $g[12], $g[1], $g[37], $g[38], "add")
				$g[55]=new SimpleButton($g[0], 860, 70, 90, 25, $g[17], $g[30], $g[34], $g[12], $g[1], $g[37], $g[38], "remove")
				$g[56]=50
				$g[57]=new Rectangle2($g[0], 0, 0, $g[1], $g[18], W-10-45, 5+(95-45)/2, 45, 45, $g[1], $g[39], "%d", $g[56])
				$g[57].setRounded(5, 5)
				$g[58]="Press sequence 1 or 2 to run a preset sequence of add and remove operations.\n\n"
				$g[58]+="You can also update the binary tree by pressing the add or remove buttons\n"
				$g[58]+="AFTER selecting an existing node or entering a value [0..999] in the red box."
				new Txt($g[0], 0, HLEFT|VTOP, W/2, H-80, $g[1], $g[40], $g[58])
				$g[59]=0
				$g[60]=0
				setTPS(TICKS)
				$g[0].addEventHandler("eventKEY", 0, 59)
				$g[53].addEventHandler("eventMB", $obj, 70)
				$g[54].addEventHandler("eventMB", $obj, 73)
				$g[55].addEventHandler("eventMB", $obj, 76)
				$g[50].addEventHandler("eventMB", $obj, 98)
				$g[51].addEventHandler("eventMB", $obj, 123)
				$g[52].addEventHandler("eventMB", $obj, 126)
				$g[61]=new BST()
				if (!(getArgAsNum("selfTest", 0))) {
					$pc = 3
					continue
				}
				start()
				$call(101, $obj)
				continue
			case 1:
				$call(79, $obj)
				continue
			case 2:
				debug("FINISHED tick=%d errors=%d", getTick(), $g[60])
				$pc = 3
			case 3:
				$return(0)
				continue
			case 4:
				$enter(0);	// trackBallStart
				$g[43].setBrush($stack[$fp-4]==0 ? $g[35] : $stack[$fp-4]==1 ? $g[18] : $g[16])
				$g[43].setTxtPen($stack[$fp-4]==0 ? $g[2] : $stack[$fp-4]==1 ? $g[1] : $g[2])
				$g[43].setTxt("%d", $stack[$fp-3])
				$g[43].setOpacity(1)
				$g[43].setPos(W/2, 20)
				$pc = 5
				if ($g[43].setPos(W/2, VSPACE-BALLSZ, TICKS, 1)) {
					return
				}
			case 5:
				$return(2)
				continue
			case 6:
				$enter(0);	// trackBall
				if (!($stack[$fp-4]==0||$stack[$fp-5]==0)) {
					$pc = 7
					continue
				}
				$return(4)
				continue
			case 7:
				$stack[$fp-3].setOpacity(1)
				$stack[$fp-3].setPos($stack[$fp-4].$x, $stack[$fp-4].$y)
				$pc = 8
				if ($stack[$fp-3].setPos($stack[$fp-5].$x, $stack[$fp-5].$y-SZ/2, TICKS, $stack[$fp-6])) {
					return
				}
			case 8:
				$return(4)
				continue
			case 9:
				$enter(2);	// find
				$stack[$fp+1]=$obj.$root
				$stack[$fp+2]={o:$obj, a:"$root"}
				$g[49].setTxt("find(%d)", $stack[$fp-3])
				$call(4, $obj, $stack[$fp-3], 0)
				continue
			case 10:
				$pc = 11
			case 11:
				if (!($stack[$fp+1])) {
					$pc = 18
					continue
				}
				$pc = 12
				if ($stack[$fp+1].$body.toggleBrushAndPens($g[17], $g[1], $stack[$fp+1].$body.getTxtPen(), 4, getTPS()/4, 1)) {
					return
				}
			case 12:
				if (!($stack[$fp-3]<$stack[$fp+1].$key)) {
					$pc = 13
					continue
				}
				$stack[$fp+2]={o:$stack[$fp+1], a:"$left"}
				$pc = 16
				continue
			case 13:
				if (!($stack[$fp-3]>$stack[$fp+1].$key)) {
					$pc = 14
					continue
				}
				$stack[$fp+2]={o:$stack[$fp+1], a:"$right"}
				$pc = 15
				continue
			case 14:
				$pc = 18
				continue
			case 15:
				$pc = 16
			case 16:
				$call(6, $obj, $g[43], $stack[$fp+1], $stack[$fp+2].o[$stack[$fp+2].a], 1)
				continue
			case 17:
				$stack[$fp+1]=$stack[$fp+2].o[$stack[$fp+2].a]
				$pc = 11
				continue
			case 18:
				$g[49].setTxt(($stack[$fp+1]==0) ? "NOT found" : "FOUND")
				$pc = 19
				if ($g[43].setOpacity(0, TICKS, 1)) {
					return
				}
			case 19:
				checkPoint()
				$return(1)
				continue
			case 20:
				$enter(2);	// add
				$g[49].setTxt("add(%d)", $stack[$fp-3])
				$stack[$fp+1]=$obj.$root
				$stack[$fp+2]={o:$obj, a:"$root"}
				$call(4, $obj, $stack[$fp-3], 1)
				continue
			case 21:
				$pc = 22
			case 22:
				if (!($stack[$fp+1])) {
					$pc = 29
					continue
				}
				$pc = 23
				if ($stack[$fp+1].$body.toggleBrushAndPens($g[17], $g[1], $stack[$fp+1].$body.getTxtPen(), 4, getTPS()/4, 1)) {
					return
				}
			case 23:
				if (!($stack[$fp-3]<$stack[$fp+1].$key)) {
					$pc = 24
					continue
				}
				$stack[$fp+2]={o:$stack[$fp+1], a:"$left"}
				$pc = 27
				continue
			case 24:
				if (!($stack[$fp-3]>$stack[$fp+1].$key)) {
					$pc = 25
					continue
				}
				$stack[$fp+2]={o:$stack[$fp+1], a:"$right"}
				$pc = 26
				continue
			case 25:
				$pc = 29
				continue
			case 26:
				$pc = 27
			case 27:
				$call(6, $obj, $g[43], $stack[$fp+1], $stack[$fp+2].o[$stack[$fp+2].a], 1)
				continue
			case 28:
				$stack[$fp+1]=$stack[$fp+2].o[$stack[$fp+2].a]
				$pc = 22
				continue
			case 29:
				if (!($stack[$fp+1]==0)) {
					$pc = 30
					continue
				}
				$stack[$fp+2].o[$stack[$fp+2].a]=new $obj.$Node($obj, $g[0], $stack[$fp-3])
				$obj.$redraw(1)
				$pc = 30
			case 30:
				$pc = 31
				if ($g[43].setOpacity(0, TICKS, 1)) {
					return
				}
			case 31:
				$pc = 32
				if (wait(TICKS)) {
					return
				}
			case 32:
				$obj.$check()
				checkPoint()
				$return(1)
				continue
			case 33:
				$enter(3);	// remove
				$g[49].setTxt("remove(%d)", $stack[$fp-3])
				$stack[$fp+1]=$obj.$root
				$stack[$fp+2]={o:$obj, a:"$root"}
				$call(4, $obj, $stack[$fp-3], 2)
				continue
			case 34:
				$pc = 35
			case 35:
				if (!($stack[$fp+1])) {
					$pc = 42
					continue
				}
				$pc = 36
				if ($stack[$fp+1].$body.toggleBrushAndPens($g[17], $g[1], $stack[$fp+1].$body.getTxtPen(), 4, getTPS()/4, 1)) {
					return
				}
			case 36:
				if (!($stack[$fp-3]<$stack[$fp+1].$key)) {
					$pc = 37
					continue
				}
				$stack[$fp+2]={o:$stack[$fp+1], a:"$left"}
				$pc = 40
				continue
			case 37:
				if (!($stack[$fp-3]>$stack[$fp+1].$key)) {
					$pc = 38
					continue
				}
				$stack[$fp+2]={o:$stack[$fp+1], a:"$right"}
				$pc = 39
				continue
			case 38:
				$pc = 42
				continue
			case 39:
				$pc = 40
			case 40:
				$call(6, $obj, $g[43], $stack[$fp+1], $stack[$fp+2].o[$stack[$fp+2].a], 1)
				continue
			case 41:
				$stack[$fp+1]=$stack[$fp+2].o[$stack[$fp+2].a]
				$pc = 35
				continue
			case 42:
				if (!($stack[$fp+1])) {
					$pc = 56
					continue
				}
				$stack[$fp+1].$body.setBrush($g[16])
				$stack[$fp+1].$body.setTxtPen($g[2])
				if (!(($stack[$fp+1].$left==0)&&($stack[$fp+1].$right==0))) {
					$pc = 43
					continue
				}
				$stack[$fp+2].o[$stack[$fp+2].a]=0
				$stack[$fp+1].setOpacity(0, TICKS, 0)
				$obj.$redraw(1)
				$pc = 55
				continue
			case 43:
				if (!($stack[$fp+1].$left==0)) {
					$pc = 44
					continue
				}
				$stack[$fp+2].o[$stack[$fp+2].a]=$stack[$fp+1].$right
				$pc = 54
				continue
			case 44:
				if (!($stack[$fp+1].$right==0)) {
					$pc = 45
					continue
				}
				$stack[$fp+2].o[$stack[$fp+2].a]=$stack[$fp+1].$left
				$pc = 53
				continue
			case 45:
				$call(6, $obj, $g[44], $stack[$fp+1], $stack[$fp+1].$left, 1)
				continue
			case 46:
				$stack[$fp+3]=$stack[$fp+1].$left
				$stack[$fp+2]={o:$stack[$fp+1], a:"$left"}
				$pc = 47
			case 47:
				if (!($stack[$fp+3].$right)) {
					$pc = 50
					continue
				}
				$pc = 48
				if (wait(20)) {
					return
				}
			case 48:
				$call(6, $obj, $g[44], $stack[$fp+3], $stack[$fp+3].$right, 1)
				continue
			case 49:
				$stack[$fp+2]={o:$stack[$fp+3], a:"$right"}
				$stack[$fp+3]=$stack[$fp+3].$right
				$pc = 47
				continue
			case 50:
				$g[45].setPos($stack[$fp+3].getPosX(1), $stack[$fp+3].getPosY(1))
				$g[45].setTxt("%d", $stack[$fp+3].$key)
				$g[45].setOpacity(1)
				$pc = 51
				if ($g[45].setPos($stack[$fp+1].getPosX(1), $stack[$fp+1].getPosY(1), TICKS, 1)) {
					return
				}
			case 51:
				$stack[$fp+1].$key=$stack[$fp+3].$key
				$pc = 52
				if ($g[45].setOpacity(1, TICKS, 1)) {
					return
				}
			case 52:
				$stack[$fp+1].$body.setBrush($g[18])
				$stack[$fp+1].$body.setTxtPen($g[1])
				$stack[$fp+1].$body.setTxt("%d", $stack[$fp+3].$key)
				$g[45].setOpacity(0, TICKS, 0)
				$stack[$fp+2].o[$stack[$fp+2].a]=$stack[$fp+3].$left
				$stack[$fp+1]=$stack[$fp+3]
				$g[44].setOpacity(0, TICKS, 0)
				$pc = 53
			case 53:
				$pc = 54
			case 54:
				$pc = 55
			case 55:
				$stack[$fp+1].setOpacity(0, TICKS, 0)
				$stack[$fp+1].$arrow.setOpacity(0)
				$obj.$redraw(0)
				$pc = 56
			case 56:
				$pc = 57
				if ($g[43].setOpacity(0, TICKS, 1)) {
					return
				}
			case 57:
				$pc = 58
				if (wait(TICKS)) {
					return
				}
			case 58:
				$obj.$check()
				checkPoint()
				$return(1)
				continue
			case 59:
				$enter(0);	// $eh4
				if (!($stack[$fp-4]==0)) {
					$pc = 69
					continue
				}
				if (!($stack[$fp-3]==8)) {
					$pc = 60
					continue
				}
				$g[56]=$g[56]/10|0
				$g[57].setTxt("%d", $g[56])
				$pc = 68
				continue
			case 60:
				if (!(($stack[$fp-3]>=48)&&($stack[$fp-3]<=57))) {
					$pc = 61
					continue
				}
				$g[56]=($g[56]*10+$stack[$fp-3]-48)%1000
				$g[57].setTxt("%d", $g[56])
				$pc = 67
				continue
			case 61:
				if (!(($stack[$fp-3]==13)&&($g[59]==0))) {
					$pc = 63
					continue
				}
				$g[59]=1
				start()
				$call(20, $g[61], $g[56])
				continue
			case 62:
				$g[59]=0
				$pc = 66
				continue
			case 63:
				if (!(($stack[$fp-3]==127)&&($g[59]==0))) {
					$pc = 65
					continue
				}
				$g[59]=1
				start()
				$call(33, $g[61], $g[56])
				continue
			case 64:
				$g[59]=0
				$pc = 65
			case 65:
				$pc = 66
			case 66:
				$pc = 67
			case 67:
				$pc = 68
			case 68:
				$pc = 69
			case 69:
				$return(4)
				continue
			case 70:
				$enter(0);	// $eh5
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[59]==0))) {
					$pc = 72
					continue
				}
				$g[59]=1
				start()
				$call(9, $g[61], $g[56])
				continue
			case 71:
				$g[59]=0
				$pc = 72
			case 72:
				$return(4)
				continue
			case 73:
				$enter(0);	// $eh6
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[59]==0))) {
					$pc = 75
					continue
				}
				$g[59]=1
				start()
				$call(20, $g[61], $g[56])
				continue
			case 74:
				$g[59]=0
				$pc = 75
			case 75:
				$return(4)
				continue
			case 76:
				$enter(0);	// $eh7
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[59]==0))) {
					$pc = 78
					continue
				}
				$g[59]=1
				start()
				$call(33, $g[61], $g[56])
				continue
			case 77:
				$g[59]=0
				$pc = 78
			case 78:
				$return(4)
				continue
			case 79:
				$enter(0);	// seq1
				$call(20, $g[61], 50)
				continue
			case 80:
				$call(20, $g[61], 30)
				continue
			case 81:
				$call(20, $g[61], 10)
				continue
			case 82:
				$call(20, $g[61], 0)
				continue
			case 83:
				$call(20, $g[61], 20)
				continue
			case 84:
				$call(20, $g[61], 40)
				continue
			case 85:
				$call(20, $g[61], 60)
				continue
			case 86:
				$call(33, $g[61], 40)
				continue
			case 87:
				$call(33, $g[61], 30)
				continue
			case 88:
				$call(20, $g[61], 15)
				continue
			case 89:
				$call(33, $g[61], 50)
				continue
			case 90:
				$call(20, $g[61], 12)
				continue
			case 91:
				$call(20, $g[61], 11)
				continue
			case 92:
				$call(20, $g[61], 14)
				continue
			case 93:
				$call(33, $g[61], 20)
				continue
			case 94:
				$call(33, $g[61], 10)
				continue
			case 95:
				$call(33, $g[61], 60)
				continue
			case 96:
				$call(33, $g[61], 0)
				continue
			case 97:
				$return(0)
				continue
			case 98:
				$enter(0);	// $eh8
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[59]==0))) {
					$pc = 100
					continue
				}
				$g[59]=1
				start()
				$call(79, $obj)
				continue
			case 99:
				$g[59]=0
				$pc = 100
			case 100:
				$return(4)
				continue
			case 101:
				$enter(0);	// seq2
				$call(20, $g[61], 10)
				continue
			case 102:
				$call(20, $g[61], 5)
				continue
			case 103:
				$call(20, $g[61], 15)
				continue
			case 104:
				$call(20, $g[61], 3)
				continue
			case 105:
				$call(20, $g[61], 8)
				continue
			case 106:
				$call(20, $g[61], 6)
				continue
			case 107:
				$call(20, $g[61], 7)
				continue
			case 108:
				$call(20, $g[61], 13)
				continue
			case 109:
				$call(20, $g[61], 18)
				continue
			case 110:
				$call(9, $g[61], 6)
				continue
			case 111:
				$call(9, $g[61], 7)
				continue
			case 112:
				$call(9, $g[61], 14)
				continue
			case 113:
				$call(33, $g[61], 13)
				continue
			case 114:
				$call(33, $g[61], 15)
				continue
			case 115:
				$call(33, $g[61], 5)
				continue
			case 116:
				$call(33, $g[61], 10)
				continue
			case 117:
				$call(33, $g[61], 8)
				continue
			case 118:
				$call(33, $g[61], 7)
				continue
			case 119:
				$call(33, $g[61], 6)
				continue
			case 120:
				$call(33, $g[61], 3)
				continue
			case 121:
				$call(33, $g[61], 18)
				continue
			case 122:
				$return(0)
				continue
			case 123:
				$enter(0);	// $eh9
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[59]==0))) {
					$pc = 125
					continue
				}
				$g[59]=1
				start()
				$call(101, $obj)
				continue
			case 124:
				$g[59]=0
				$pc = 125
			case 125:
				$return(4)
				continue
			case 126:
				$enter(0);	// $eh10
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT))) {
					$pc = 127
					continue
				}
				reset()
				return
			case 127:
				$return(4)
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
