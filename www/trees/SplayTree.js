// generated by VivioJS 22.02 build 0 : 14-Feb-22 14:28:25

"use strict"

function SplayTree(vplayer) {

	// preload fonts
	let font = new FontFace('Open Sans', 'url("../fonts/open-sans-v18-latin-regular.woff")', {weight:400})
	font.load()
	document.fonts.add(font)

	// const imports
	const ABSOLUTE = vplayer.ABSOLUTE
	const ARROW60_END = vplayer.ARROW60_END
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

	function SplayTree() {
		VObj.call(this)
		this.$root=0
	}
	SplayTree.prototype = Object.create(VObj.prototype)

	SplayTree.prototype.$Node = function($parent, $grp, _key) {
		this.parent = $parent
		Group.call(this, $grp, 0, ((0) | EXTENDEDGOBJ), W/2, VSPACE, -SZ/2, -SZ/2, SZ, SZ)
		this.$key=_key
		this.$left=0
		this.$right=0
		this.$parent=0
		this.$x=0
		this.$y=0
		this.$arrow=new Line(this, 0, 0, $g[33], 0, 0, 0, 0, 0, -SZ/2)
		this.$arrow.setOpacity(0)
		this.$body=new Ellipse(this, $g[31], 0, $g[1], $g[18], 0, 0, -SZ/2, -SZ/2, SZ, SZ, $g[2], $g[39], "%d", this.$key)
		this.$body.setOpacity(0)
		this.addEventHandler("eventUPDATED", this, this.$eh2)
		this.$body.addEventHandler("eventMB", this, this.$eh3)
	}
	SplayTree.prototype.$Node.prototype = Object.create(Group.prototype)

	SplayTree.prototype.$Node.prototype.$eh2 = function() {
		if (this.$parent) {
			this.$arrow.setPt(0, this.$parent.getPosX(1)-this.getPosX(1), this.$parent.getPosY(1)-this.getPosY(1))
		}
	}

	SplayTree.prototype.$Node.prototype.$eh3 = function(down, flags, $2, $3) {
		if (down&&(flags&MB_LEFT)) {
			$g[56]=this.$key
			$g[57].setTxt("%d", $g[56])
		}
	}

	SplayTree.prototype.$setxy = function(n, parent, dx, x, y) {
		if (n==0)
		return
		n.$parent=parent
		if (parent==0) {
			n.$x=x
		} else {
			n.$x=x+(n.$key<parent.$key ? -dx : dx)
		}
		n.$y=y
		this.$setxy(n.$left, n, dx/2, n.$x, y+VSPACE)
		this.$setxy(n.$right, n, dx/2, n.$x, y+VSPACE)
	}

	SplayTree.prototype.$set = function(n, imm) {
		if (n==0)
		return
		n.$body.setOpacity(1, TICKS, 0)
		n.$arrow.setOpacity(n.$parent ? 1 : 0)
		if (imm) {
			n.setPos(n.$x, n.$y)
		} else {
			n.setPos(n.$x, n.$y, TICKS, 0)
		}
		this.$set(n.$left, imm)
		this.$set(n.$right, imm)
	}

	SplayTree.prototype.$dump = function(n) {
		debug("key=%d left.key=%d right.key=%d", n.$key, (n.$left) ? n.$left.$key : -1, (n.$right) ? n.$right.$key : -1)
		if (n.$left)
		this.$dump(n.$left)
		if (n.$right)
		this.$dump(n.$right)
	}

	SplayTree.prototype.$checkHelper = function(n) {
		if (n) {
			$g[61]+=n.$left&&n.$left.$key>n.$key
			$g[61]+=n.$right&&n.$right.$key<n.$key
			this.$checkHelper(n.$left)
			this.$checkHelper(n.$right)
		}
	}

	SplayTree.prototype.$check = function() {
		$g[61]=0
		this.$checkHelper(this.$root)
		if ($g[61]) {
			$g[61]++
			debug("errors=%d", $g[61])
		}
	}

	function $eh9(down, flags, $2, $3) {
		if (down&&(flags&MB_LEFT)&&($g[60]==0)) {
			$g[60]=1
			start()
			$g[60]=0
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
				$g[33]=new SolidPen(0, 1, BLACK, ARROW60_END, 8, 8)
				$g[34]=new SolidPen(0, 2, GRAY64, ROUND_END)
				$g[35]=new SolidBrush(rgba(0, 0.5, 0))
				$g[36]=new SolidBrush(rgba(0, 0.56000000000000005, 0.16))
				$g[37]=new Font("Open Sans", 14, 0)
				$g[38]=new Font("Open Sans", 12, 0)
				$g[39]=new Font("Open Sans", 16, 0)
				$g[40]=new Font("Open Sans", 16, 0)
				$g[41]=new Font("Open Sans", 24, 0)
				$g[42]=new Font("Open Sans", 32, 0)
				$g[43]=new Ellipse($g[0], $g[32], 0, $g[1], $g[18], 0, 0, -BALLSZ/2, -BALLSZ/2, BALLSZ, BALLSZ, $g[1], $g[39])
				$g[43].setOpacity(0)
				$g[44]=new Rectangle2($g[0], 0, 0, 0, $g[36], 5, 5, W/2, TITLEH, $g[2], $g[42], "Splay Tree")
				$g[44].setRounded(5, 5)
				$g[44].setTxtOff(0, 2)
				$g[44].setPt(1, $g[44].getTxtW()+16, TITLEH)
				$g[45]=new Line2($g[0], 0, ABSOLUTE, $g[1], W/2-4, 20, W/2+4, 20)
				$g[46]=new Line2($g[0], 0, ABSOLUTE, $g[33], W/2, 20, W/2, VSPACE-SZ/2)
				$g[47]=new Txt($g[0], 0, HLEFT|VTOP, 5, H-100, $g[1], $g[41])
				$g[48]=new Txt($g[0], 0, HLEFT|VTOP, 5, H-70, $g[1], $g[41])
				$g[49]=new Txt($g[0], 0, HLEFT|VTOP, 5, H-40, $g[1], $g[41])
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
				$g[59]=new Txt($g[0], 0, HLEFT|VTOP, W/2, H-80, $g[1], $g[40], $g[58])
				$g[60]=0
				$g[61]=0
				setTPS(TICKS)
				$g[0].addEventHandler("eventKEY", 0, 73)
				$g[53].addEventHandler("eventMB", $obj, 84)
				$g[54].addEventHandler("eventMB", $obj, 87)
				$g[55].addEventHandler("eventMB", $obj, 90)
				$g[50].addEventHandler("eventMB", $obj, 100)
				$g[51].addEventHandler("eventMB", $obj, $eh9)
				$g[52].addEventHandler("eventMB", $obj, 103)
				$g[62]=new SplayTree()
				if (!(getArgAsNum("selfTest", 0))) {
					$pc = 2
					continue
				}
				$call(93, $obj)
				continue
			case 1:
				debug("FINISHED tick=%d errors=%d", getTick(), $g[61])
				$pc = 2
			case 2:
				$return(0)
				continue
			case 3:
				$enter(0);	// redraw
				$obj.$setxy($obj.$root, 0, W/2, W/2, VSPACE)
				$obj.$set($obj.$root, $stack[$fp-3])
				$pc = 4
				if (wait(TICKS)) {
					return
				}
			case 4:
				$return(1)
				continue
			case 5:
				$enter(0);	// trackBallStart
				$g[43].setBrush($stack[$fp-4]==0 ? $g[35] : $stack[$fp-4]==1 ? $g[18] : $g[16])
				$g[43].setTxtPen($stack[$fp-4]==0 ? $g[2] : $stack[$fp-4]==1 ? $g[1] : $g[2])
				$g[43].setTxt("%d", $stack[$fp-3])
				$g[43].setPos(W/2, 20)
				$g[43].setOpacity(1)
				$pc = 6
				if ($g[43].setPos(W/2, VSPACE-BALLSZ, TICKS, 1)) {
					return
				}
			case 6:
				$return(2)
				continue
			case 7:
				$enter(0);	// trackBall
				if (!($stack[$fp-4]==0||$stack[$fp-5]==0)) {
					$pc = 8
					continue
				}
				$return(4)
				continue
			case 8:
				$stack[$fp-3].setOpacity(1)
				$stack[$fp-3].setPos($stack[$fp-4].$x, $stack[$fp-4].$y)
				$pc = 9
				if ($stack[$fp-3].setPos($stack[$fp-5].$x, $stack[$fp-5].$y-SZ/2, TICKS, $stack[$fp-6])) {
					return
				}
			case 9:
				$return(4)
				continue
			case 10:
				$enter(1);	// rotateLeft
				$stack[$fp+1]=$stack[$fp-5].$right
				$stack[$fp-5].$right=$stack[$fp-4]
				$stack[$fp-4].$left=$stack[$fp+1]
				$stack[$fp-3].o[$stack[$fp-3].a]=$stack[$fp-5]
				$call(3, $obj, 0)
				continue
			case 11:
				$pc = 12
				if (wait(TICKS)) {
					return
				}
			case 12:
				$return(3)
				continue
			case 13:
				$enter(1);	// rotateRight
				$stack[$fp+1]=$stack[$fp-5].$left
				$stack[$fp-5].$left=$stack[$fp-4]
				$stack[$fp-4].$right=$stack[$fp+1]
				$stack[$fp-3].o[$stack[$fp-3].a]=$stack[$fp-5]
				$call(3, $obj, 0)
				continue
			case 14:
				$pc = 15
				if (wait(TICKS)) {
					return
				}
			case 15:
				$return(3)
				continue
			case 16:
				$enter(4);	// splay
				if (!($obj.$root)) {
					$pc = 41
					continue
				}
				$pc = 17
			case 17:
				if (!(1)) {
					$pc = 40
					continue
				}
				$stack[$fp+1]=$obj.$root
				$stack[$fp+2]=$stack[$fp-3]<$stack[$fp+1].$key ? -1 : $stack[$fp-3]==$stack[$fp+1].$key ? 0 : 1
				if (!($stack[$fp+2]==0)) {
					$pc = 18
					continue
				}
				$return(1)
				continue
			case 18:
				$stack[$fp+3]=($stack[$fp+2]<0) ? $stack[$fp+1].$left : $stack[$fp+1].$right
				if (!($stack[$fp+3]==0)) {
					$pc = 19
					continue
				}
				$return(1)
				continue
			case 19:
				$stack[$fp+4]=$stack[$fp-3]<$stack[$fp+3].$key ? -1 : $stack[$fp-3]==$stack[$fp+3].$key ? 0 : 1
				if (!($stack[$fp+4]==0||($stack[$fp+4]<0&&$stack[$fp+3].$left==0)||($stack[$fp+4]>0&&$stack[$fp+3].$right==0))) {
					$pc = 24
					continue
				}
				if (!($stack[$fp+2]<0)) {
					$pc = 21
					continue
				}
				$call(10, $obj, {o:$obj, a:"$root"}, $stack[$fp+1], $stack[$fp+3])
				continue
			case 20:
				$pc = 23
				continue
			case 21:
				$call(13, $obj, {o:$obj, a:"$root"}, $stack[$fp+1], $stack[$fp+3])
				continue
			case 22:
				$pc = 23
			case 23:
				$return(1)
				continue
			case 24:
				if (!($stack[$fp+2]<0&&$stack[$fp+4]<0)) {
					$pc = 27
					continue
				}
				$call(10, $obj, {o:$stack[$fp+1], a:"$left"}, $stack[$fp+3], $stack[$fp+3].$left)
				continue
			case 25:
				$call(10, $obj, {o:$obj, a:"$root"}, $stack[$fp+1], $stack[$fp+1].$left)
				continue
			case 26:
				$pc = 39
				continue
			case 27:
				if (!($stack[$fp+2]>0&&$stack[$fp+4]>0)) {
					$pc = 30
					continue
				}
				$call(13, $obj, {o:$stack[$fp+1], a:"$right"}, $stack[$fp+3], $stack[$fp+3].$right)
				continue
			case 28:
				$call(13, $obj, {o:$obj, a:"$root"}, $stack[$fp+1], $stack[$fp+1].$right)
				continue
			case 29:
				$pc = 38
				continue
			case 30:
				if (!($stack[$fp+2]<0&&$stack[$fp+4]>0)) {
					$pc = 33
					continue
				}
				$call(13, $obj, {o:$stack[$fp+1], a:"$left"}, $stack[$fp+3], $stack[$fp+3].$right)
				continue
			case 31:
				$call(10, $obj, {o:$obj, a:"$root"}, $stack[$fp+1], $stack[$fp+1].$left)
				continue
			case 32:
				$pc = 37
				continue
			case 33:
				if (!($stack[$fp+2]>0&&$stack[$fp+4]<0)) {
					$pc = 36
					continue
				}
				$call(10, $obj, {o:$stack[$fp+1], a:"$right"}, $stack[$fp+3], $stack[$fp+3].$left)
				continue
			case 34:
				$call(13, $obj, {o:$obj, a:"$root"}, $stack[$fp+1], $stack[$fp+1].$right)
				continue
			case 35:
				$pc = 36
			case 36:
				$pc = 37
			case 37:
				$pc = 38
			case 38:
				$pc = 39
			case 39:
				$pc = 17
				continue
			case 40:
				$pc = 41
			case 41:
				$return(1)
				continue
			case 42:
				$enter(0);	// find
				$g[47].setTxt("find(%d)", $stack[$fp-3])
				$g[48].setTxt("")
				$g[49].setTxt("")
				$call(5, $obj, $stack[$fp-3], 0)
				continue
			case 43:
				$call(16, $obj, $stack[$fp-3])
				continue
			case 44:
				$call(3, $obj, 0)
				continue
			case 45:
				if (!($obj.$root&&$obj.$root.$key==$stack[$fp-3])) {
					$pc = 46
					continue
				}
				$g[48].setTxt("FOUND")
				$pc = 47
				continue
			case 46:
				$g[48].setTxt("NOT found")
				$pc = 47
			case 47:
				$pc = 48
				if ($g[43].setOpacity(0, TICKS, 1)) {
					return
				}
			case 48:
				$pc = 49
				if (wait(1)) {
					return
				}
			case 49:
				checkPoint()
				$return(1)
				continue
			case 50:
				$enter(2);	// add
				$g[47].setTxt("add(%d)", $stack[$fp-3])
				$g[48].setTxt("")
				$g[49].setTxt("")
				$call(5, $obj, $stack[$fp-3], 1)
				continue
			case 51:
				$call(16, $obj, $stack[$fp-3])
				continue
			case 52:
				$stack[$fp+1]=$obj.$root ? ($stack[$fp-3]<$obj.$root.$key ? -1 : $stack[$fp-3]==$obj.$root.$key ? 0 : 1) : 0
				if (!($obj.$root&&$stack[$fp+1]==0)) {
					$pc = 53
					continue
				}
				$g[48].setTxt("FOUND - already in tree")
				$pc = 58
				continue
			case 53:
				$stack[$fp+2]=new $obj.$Node($obj, $g[0], $stack[$fp-3])
				if (!($stack[$fp+1]<0)) {
					$pc = 54
					continue
				}
				$stack[$fp+2].$right=$obj.$root
				$stack[$fp+2].$left=$stack[$fp+2].$right.$left
				$stack[$fp+2].$right.$left=0
				$pc = 56
				continue
			case 54:
				if (!($stack[$fp+1]>0)) {
					$pc = 55
					continue
				}
				$stack[$fp+2].$left=$obj.$root
				$stack[$fp+2].$right=$stack[$fp+2].$left.$right
				$stack[$fp+2].$left.$right=0
				$pc = 55
			case 55:
				$pc = 56
			case 56:
				$obj.$root=$stack[$fp+2]
				$call(3, $obj, 0)
				continue
			case 57:
				$pc = 58
			case 58:
				$pc = 59
				if (wait(1)) {
					return
				}
			case 59:
				checkPoint()
				$obj.$check()
				$return(1)
				continue
			case 60:
				$enter(3);	// remove
				$g[47].setTxt("remove(%d)", $stack[$fp-3])
				$g[48].setTxt("")
				$g[49].setTxt("")
				$call(5, $obj, $stack[$fp-3], 2)
				continue
			case 61:
				$call(16, $obj, $stack[$fp-3])
				continue
			case 62:
				if (!($obj.$root&&$stack[$fp-3]==$obj.$root.$key)) {
					$pc = 69
					continue
				}
				$stack[$fp+1]=$obj.$root
				$stack[$fp+2]=$obj.$root.$left
				$stack[$fp+3]=$obj.$root.$right
				if (!($stack[$fp+2])) {
					$pc = 66
					continue
				}
				$obj.$root=$stack[$fp+2]
				if (!($stack[$fp+3])) {
					$pc = 65
					continue
				}
				$pc = 63
			case 63:
				if (!($stack[$fp+2].$right)) {
					$pc = 64
					continue
				}
				$stack[$fp+2]=$stack[$fp+2].$right
				$pc = 63
				continue
			case 64:
				$stack[$fp+2].$right=$stack[$fp+3]
				$pc = 65
			case 65:
				$pc = 67
				continue
			case 66:
				$obj.$root=$stack[$fp+3]
				$pc = 67
			case 67:
				$stack[$fp+1].setOpacity(0)
				$call(3, $obj, 0)
				continue
			case 68:
				$pc = 70
				continue
			case 69:
				$g[48].setTxt("NOT found")
				$pc = 70
			case 70:
				$pc = 71
				if ($g[43].setOpacity(0, TICKS, 1)) {
					return
				}
			case 71:
				$obj.$check()
				$pc = 72
				if (wait(1)) {
					return
				}
			case 72:
				checkPoint()
				$return(1)
				continue
			case 73:
				$enter(0);	// $eh4
				if (!($stack[$fp-4]==0)) {
					$pc = 83
					continue
				}
				if (!($stack[$fp-3]==8)) {
					$pc = 74
					continue
				}
				$g[56]=$g[56]/10|0
				$g[57].setTxt("%d", $g[56])
				$pc = 82
				continue
			case 74:
				if (!(($stack[$fp-3]>=48)&&($stack[$fp-3]<=57))) {
					$pc = 75
					continue
				}
				$g[56]=($g[56]*10+$stack[$fp-3]-48)%1000
				$g[57].setTxt("%d", $g[56])
				$pc = 81
				continue
			case 75:
				if (!(($stack[$fp-3]==13)&&($g[60]==0))) {
					$pc = 77
					continue
				}
				$g[60]=1
				start()
				$call(50, $g[62], $g[56])
				continue
			case 76:
				$g[60]=0
				$pc = 80
				continue
			case 77:
				if (!(($stack[$fp-3]==127)&&($g[60]==0))) {
					$pc = 79
					continue
				}
				$g[60]=1
				start()
				$call(60, $g[62], $g[56])
				continue
			case 78:
				$g[60]=0
				$pc = 79
			case 79:
				$pc = 80
			case 80:
				$pc = 81
			case 81:
				$pc = 82
			case 82:
				$pc = 83
			case 83:
				$return(4)
				continue
			case 84:
				$enter(0);	// $eh5
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[60]==0))) {
					$pc = 86
					continue
				}
				$g[60]=1
				start()
				$call(42, $g[62], $g[56])
				continue
			case 85:
				$g[60]=0
				$pc = 86
			case 86:
				$return(4)
				continue
			case 87:
				$enter(0);	// $eh6
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[60]==0))) {
					$pc = 89
					continue
				}
				$g[60]=1
				start()
				$call(50, $g[62], $g[56])
				continue
			case 88:
				$g[60]=0
				$pc = 89
			case 89:
				$return(4)
				continue
			case 90:
				$enter(0);	// $eh7
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[60]==0))) {
					$pc = 92
					continue
				}
				$g[60]=1
				start()
				$call(60, $g[62], $g[56])
				continue
			case 91:
				$g[60]=0
				$pc = 92
			case 92:
				$return(4)
				continue
			case 93:
				$enter(0);	// seq1
				$g[60]=1
				start()
				$call(50, $g[62], 1)
				continue
			case 94:
				$call(50, $g[62], 2)
				continue
			case 95:
				$call(50, $g[62], 3)
				continue
			case 96:
				$call(50, $g[62], 4)
				continue
			case 97:
				$call(42, $g[62], 4)
				continue
			case 98:
				$call(60, $g[62], 1)
				continue
			case 99:
				$g[60]=0
				$return(0)
				continue
			case 100:
				$enter(0);	// $eh8
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT)&&($g[60]==0))) {
					$pc = 102
					continue
				}
				$call(93, $obj)
				continue
			case 101:
				$pc = 102
			case 102:
				$return(4)
				continue
			case 103:
				$enter(0);	// $eh10
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT))) {
					$pc = 104
					continue
				}
				reset()
				return
			case 104:
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
