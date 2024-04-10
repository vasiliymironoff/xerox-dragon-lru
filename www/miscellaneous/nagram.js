// generated by VivioJS 22.02 build 0 : 14-Feb-22 14:27:54

"use strict"

function nagram(vplayer) {

	// const imports
	const ABSOLUTE = vplayer.ABSOLUTE
	const ARROW40_END = vplayer.ARROW40_END
	const ARROW40_START = vplayer.ARROW40_START
	const BLACK = vplayer.BLACK
	const BLUE = vplayer.BLUE
	const CYAN = vplayer.CYAN
	const DOT = vplayer.DOT
	const GRAY128 = vplayer.GRAY128
	const GRAY160 = vplayer.GRAY160
	const GRAY192 = vplayer.GRAY192
	const GRAY224 = vplayer.GRAY224
	const GRAY32 = vplayer.GRAY32
	const GRAY64 = vplayer.GRAY64
	const GRAY96 = vplayer.GRAY96
	const GREEN = vplayer.GREEN
	const HCENTRE = vplayer.HCENTRE
	const HLEFT = vplayer.HLEFT
	const MAGENTA = vplayer.MAGENTA
	const MB = vplayer.MB
	const MB_LEFT = vplayer.MB_LEFT
	const PROPAGATE = vplayer.PROPAGATE
	const RED = vplayer.RED
	const VCENTRE = vplayer.VCENTRE
	const VTOP = vplayer.VTOP
	const WHITE = vplayer.WHITE
	const YELLOW = vplayer.YELLOW

	// var imports
	var $addWaitToEventQ = vplayer.$addWaitToEventQ
	var $g = vplayer.$g
	var $terminateThread = vplayer.$terminateThread
	var Arc = vplayer.Arc
	var cos = vplayer.cos
	var Ellipse = vplayer.Ellipse
	var EXTENDEDGOBJ = vplayer.EXTENDEDGOBJ
	var floor = vplayer.floor
	var Font = vplayer.Font
	var getArgAsNum = vplayer.getArgAsNum
	var Group = vplayer.Group
	var Line = vplayer.Line
	var Menu = vplayer.Menu
	var newArray = vplayer.newArray
	var Polygon = vplayer.Polygon
	var Rectangle = vplayer.Rectangle
	var Rectangle2 = vplayer.Rectangle2
	var reset = vplayer.reset
	var round = vplayer.round
	var setArgFromNum = vplayer.setArgFromNum
	var setVirtualWindow = vplayer.setVirtualWindow
	var sin = vplayer.sin
	var SolidBrush = vplayer.SolidBrush
	var SolidPen = vplayer.SolidPen
	var sprintf = vplayer.sprintf
	var tan = vplayer.tan
	var Txt = vplayer.Txt
	var VObj = vplayer.VObj

	// const declarations
	const VW=1920
	const VH=1200
	const BORDER=50
	const DEFAULTL1IN=5.5
	const DEFAULTL1CM=25
	const DEFAULTWIN=0.75
	const DEFAULTWCM=2
	const CX=VW/2
	const CY=1000/2

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

	function Slider(_x, _y, _w, _h, _min, _max, _v, f, _format) {
		VObj.call(this)
		this.$x=_x
		this.$y=_y
		this.$w=_w
		this.$h=_h
		this.$min=_min
		this.$max=_max
		this.$v=_v
		this.$format=_format
		this.$offX=0
		this.$px=round(this.$w*(this.$v-this.$min)/(this.$max-this.$min))
		new Line($g[0], 0, 0, $g[1], 0, 0, this.$x, this.$y, this.$w, 0)
		new Line($g[0], 0, 0, $g[1], 0, 0, this.$x, this.$y-this.$h/2, 0, this.$h)
		new Line($g[0], 0, 0, $g[1], 0, 0, this.$x+this.$w, this.$y-this.$h/2, 0, this.$h)
		this.$r=new Rectangle($g[0], 0, ABSOLUTE, 0, $g[18], this.$x+this.$px, this.$y, -4, -8, 8, 16, $g[1], f, this.$format, this.$v)
		this.$r.setTxtOff(0, -this.$h)
		this.$txtmin=new Txt($g[0], 0, HCENTRE|VTOP, this.$x, this.$y+this.$h, $g[1], f, this.$format, this.$min)
		this.$txtmax=new Txt($g[0], 0, HCENTRE|VTOP, this.$x+this.$w, this.$y+this.$h, $g[1], f, this.$format, this.$max)
		this.$r.addEventHandler("eventMB", this, this.$eh0)
		this.$r.addEventHandler("eventGRABBED", this, this.$eh1)
	}
	Slider.prototype = Object.create(VObj.prototype)

	Slider.prototype.$eh0 = function(down, flags, mx, my) {
		if (down&&(flags&MB_LEFT)) {
			this.$offX=round(mx-this.$x-this.$px)
			this.$r.grab()
			return PROPAGATE
		}
		return 0
	}

	Slider.prototype.$eh1 = function(eventType, p0, p1, mx, my) {
		this.$px=round(mx-this.$x-this.$offX)
		if (this.$px<0)
		this.$px=0
		if (this.$px>this.$w)
		this.$px=this.$w
		this.$v=this.$min+(this.$max-this.$min)*this.$px/this.$w
		this.$r.setTxt(this.$format, this.$v)
		this.$r.setPos(this.$x+this.$px, this.$y)
		if ((eventType==MB)&&(p0==0)&&(p1&MB_LEFT))
		this.$r.ungrab()
		return PROPAGATE
	}

	function $eh2(enter, $1, $2) {
		$g[46].setBrush(enter ? $g[29] : 0)
		return 0
	}

	function $eh4(enter, $1, $2) {
		$g[49].setBrush(enter ? $g[29] : 0)
		return 0
	}

	function $eh6($0, $1, $2, $3, $4) {
		$g[34]=$g[51].$v
		compute()
	}

	function $eh7($0, $1, $2, $3, $4) {
		$g[33]=$g[52].$v
		compute()
	}

	function $eh8($0, $1, $2, $3, $4) {
		$g[35]=$g[53].$v
		compute()
	}

	function WoodTemplate($grp, x, y) {
		Group.call(this, $grp, 0, ((0) | EXTENDEDGOBJ), x, y, 0, 0, VW, VH-y)
		new Line(this, 0, ABSOLUTE, $g[43], 0, 0, 0, 0, VW, 0)
		new Txt(this, 0, HLEFT, BORDER, 25, $g[1], 0, "template for cutting wood with mitre saw (N = %d needed) + remember to allow for thickness of saw blade", $g[31])
		this.$p0=new Polygon(this, 0, ABSOLUTE, $g[3], 0, BORDER, 90, 0, 0, 0, 0, 0, 0, 0, 0)
		this.$p1=new Polygon(this, 0, ABSOLUTE, $g[5], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
		this.$lenL1=new Line(this, 0, ABSOLUTE, $g[40], BORDER, 80, 0, 0, 0, 0)
		this.$lenL1.setFont($g[38])
		this.$lenL1.setTxtPen($g[42])
		this.$lenL1.setTxtOff(0, -10)
		this.$lenL2=new Line(this, 0, ABSOLUTE, $g[41], BORDER, 80, 0, 0, 0, 0)
		this.$lenL2.setFont($g[38])
		this.$lenL2.setTxtPen($g[41])
		this.$lenL2.setTxtOff(0, -10)
		this.$lenW=new Line(this, 0, ABSOLUTE|HLEFT, $g[40], 0, 90, 0, 0, 0, 0)
		this.$lenW.setFont($g[38])
		this.$lenW.setTxtOff(10, 0)
		this.$v0=new Line(this, 0, ABSOLUTE, $g[43], BORDER, 90, 0, -10, 0, 0)
		this.$v1=new Line(this, 0, ABSOLUTE, $g[43], BORDER, 90, 0, 0, 0, 0)
		this.$v2=new Line(this, 0, ABSOLUTE, $g[43], BORDER, 90, 0, 0, 0, 0)
		this.$v3=new Line(this, 0, ABSOLUTE, $g[43], BORDER, 90, 0, 0, 0, 0)
		this.$v4=new Line(this, 0, ABSOLUTE, $g[43], BORDER, 90, 0, 0, 0, 0)
		this.$v5=new Line(this, 0, ABSOLUTE, $g[43], BORDER, 90, 0, 0, 0, 0)
		this.$a0=new Arc(this, 0, 0, $g[3], 0, BORDER, 90, 0, 0, 20, 20, 90, 0)
		this.$a1=new Arc(this, 0, 0, $g[3], 0, 0, 0, 0, 0, 20, 20, -90, 0)
		this.$a2=new Arc(this, 0, 0, $g[5], 0, 0, 0, 0, 0, 20, 20, 90, 0)
		this.$a3=new Arc(this, 0, 0, $g[5], 0, 0, 0, 0, 0, 20, 20, -90, 0)
		this.$a4=new Arc(this, 0, 0, $g[3], 0, 0, 0, 0, 0, 20, 20, 90, 0)
		this.$a5=new Arc(this, 0, 0, $g[3], 0, 0, 0, 0, 0, 20, 20, -90, 0)
		this.$av0=new Txt(this, 0, HCENTRE, 0, 0, $g[3], $g[37])
		this.$av1=new Txt(this, 0, HCENTRE, 0, 0, $g[5], $g[37])
		this.$av2=new Txt(this, 0, HCENTRE, 0, 0, $g[3], $g[37])
		this.setBrush($g[17])
	}
	WoodTemplate.prototype = Object.create(Group.prototype)

	function Vertex($grp, angle) {
		Group.call(this, $grp, 0, ((0) | EXTENDEDGOBJ), CX, CY, 0, 0, 20, 20)
		this.$p0=new Polygon(this, 0, ABSOLUTE, $g[3], $g[18], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
		this.$p1=new Polygon(this, 0, ABSOLUTE, 0, $g[20], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
		if (angle==0) {
			this.$lenL1=new Line(this, 0, ABSOLUTE, $g[42], 0, 0, 0, 0, 0, 0)
			this.$lenL1.setFont($g[38])
			this.$lenL2=new Line(this, 0, ABSOLUTE, $g[41], 0, 0, -10, 0, 0, 0)
			this.$lenL2.setFont($g[38])
			this.$aee=new Arc(this, 0, 0, $g[44], 0, 0, 0, 0, 0, 20, 20, -180, 0, $g[7], $g[37])
			this.$aee.setTxt("%5.1f", 180*($g[31]-2)/$g[31])
			this.$aee.setTxtOff(-45, 10)
			this.$ac=new Arc(this, 0, 0, $g[1], 0, 0, 0, 0, 0, 20, 20, -90, 0, $g[1], $g[37])
			this.$ac.setTxt("%5.1f", 360/$g[31])
			this.$ac.setTxtOff(25, -25)
		}
		this.$edge=new Line(this, 0, ABSOLUTE, $g[44], 0, 0, 0, 0, 0, 0)
		this.$radius=new Line(this, 0, ABSOLUTE, $g[43], 0, 0, 0, 0, 0, 0)
		this.setAngle(angle)
	}
	Vertex.prototype = Object.create(Group.prototype)

	function compute() {
		let A2=90-((360-180*($g[31]-2)/$g[31]-(180-(90-$g[35])))/2)
		let hyp=$g[34]/cos($g[35])
		let lminus=$g[34]*tan(A2)
		let lplus=$g[34]*tan($g[35])
		let L2=$g[33]-lminus+lplus-hyp
		let ra=hyp*sin(180-(90-$g[35]))/sin((90-$g[35])/2)
		let rb=($g[33]-hyp)*cos((90-$g[35])/2)
		let rc=($g[33]-hyp)*sin((90-$g[35])/2)/tan(360/$g[31]/2)
		let r=ra+rb+rc
		let h=r+r*cos(180-floor($g[31]/2)*360/$g[31])
		let sw=$g[34]*$g[36]
		let sl1=$g[33]*$g[36]
		let sl2=L2*$g[36]
		let shyp=hyp*$g[36]
		let sr=r*$g[36]
		let sh=h*$g[36]
		let src=rc*$g[36]
		$g[59].$p0.setPt(1, sl1, 0)
		$g[59].$p0.setPt(2, sl1+sw*tan($g[35]), sw)
		$g[59].$p0.setPt(3, sw*tan(A2), sw)
		$g[59].$p1.setPos(BORDER+sl1, 90)
		$g[59].$p1.setPt(1, sl2, 0)
		$g[59].$p1.setPt(2, sl2+sw*tan(A2), sw)
		$g[59].$p1.setPt(3, sw/tan(90-$g[35]), sw)
		$g[59].$lenL1.setPt(1, sl1, 0)
		$g[59].$lenL1.setTxt($g[32] ? "L1 = %5.1f" : "L1 = %5.2f", $g[33])
		$g[59].$lenL2.setPt(0, sl1, 0)
		$g[59].$lenL2.setPt(1, sl1+sl2, 0)
		$g[59].$lenL2.setTxt($g[32] ? "L2 = %5.1f" : "L2 = %5.2f", L2)
		$g[59].$lenW.setPt(0, BORDER+sw*tan(A2)+10, 0)
		$g[59].$lenW.setPt(1, BORDER+sw*tan(A2)+10, sw)
		$g[59].$lenW.setTxt($g[32] ? "W = %5.1f" : "W = %5.2f", $g[34])
		$g[59].$v0.setPt(1, 0, sw+10)
		$g[59].$v1.setPt(0, sw*tan(A2), -10)
		$g[59].$v1.setPt(1, sw*tan(A2), sw+10)
		$g[59].$v2.setPt(0, sl1, -10)
		$g[59].$v2.setPt(1, sl1, sw+10)
		$g[59].$v3.setPt(0, sl1+sw*tan($g[35]), -10)
		$g[59].$v3.setPt(1, sl1+sw*tan($g[35]), sw+10)
		$g[59].$v4.setPt(0, sl1+sl2, -10)
		$g[59].$v4.setPt(1, sl1+sl2, sw+10)
		$g[59].$v5.setPt(0, sl1+sl2+sw*tan(A2), -10)
		$g[59].$v5.setPt(1, sl1+sl2+sw*tan(A2), sw+10)
		$g[59].$a0.setSpanAngle(-A2)
		$g[59].$a1.setPos(BORDER+sw*tan(A2), sw+90)
		$g[59].$a1.setSpanAngle(-A2)
		$g[59].$a2.setPos(BORDER+sl1, 90)
		$g[59].$a2.setSpanAngle(-$g[35])
		$g[59].$a3.setPos(BORDER+sl1+sw*tan($g[35]), sw+90)
		$g[59].$a3.setSpanAngle(-$g[35])
		$g[59].$a4.setPos(BORDER+sl1+sl2, 90)
		$g[59].$a4.setSpanAngle(-A2)
		$g[59].$a5.setPos(BORDER+sl1+sl2+sw*tan(A2), sw+90)
		$g[59].$a5.setSpanAngle(-A2)
		$g[59].$av0.setPos(BORDER+sw*tan(A2), 90+sw+20)
		$g[59].$av0.setTxt("A2 = %d", A2)
		$g[59].$av1.setPos(BORDER+sl1+sw*tan($g[35]), 90+sw+20)
		$g[59].$av1.setTxt("A1 = %d", $g[35])
		$g[59].$av2.setPos(BORDER+sl1+sl2+sw*tan(A2), 90+sw+20)
		$g[59].$av2.setTxt("A2 = %d", A2)
		for (let i=0; i<$g[31]; i++) {
			$g[57][i].$p0.setPos(0, -sr)
			$g[57][i].$p0.setPt(1, 0, sw*tan($g[35])+sl1-sw*tan(A2))
			$g[57][i].$p0.setPt(2, -sw, sw*tan($g[35])+sl1)
			$g[57][i].$p0.setPt(3, -sw, sw*tan($g[35]))
			$g[57][i].$p0.setAngle(-(90-$g[35])/2)
			$g[57][i].$p1.setPos(-shyp*sin((90-$g[35])/2), -sr+shyp*cos((90-$g[35])/2))
			$g[57][i].$p1.setPt(1, 0, sl2)
			$g[57][i].$p1.setPt(2, sw, sl2+sw*tan(A2))
			$g[57][i].$p1.setPt(3, sw, sw*tan($g[35]))
			$g[57][i].$p1.setAngle((90-$g[35])/2)
			if (i==0) {
				$g[57][0].$lenL1.setPos(0, -sr)
				$g[57][0].$lenL1.setPt(0, -sw-10, sw*tan($g[35])+sl1)
				$g[57][0].$lenL1.setPt(1, -sw-10, sw*tan($g[35]))
				$g[57][0].$lenL1.setTxt($g[32] ? "L1 = %5.1f" : "L1 = %5.2f", $g[33])
				$g[57][0].$lenL1.setAngle(-(90-$g[35])/2)
				$g[57][0].$lenL2.setPos(-shyp*sin((90-$g[35])/2), -sr+shyp*cos((90-$g[35])/2))
				$g[57][0].$lenL2.setPt(1, -10, sl2)
				$g[57][0].$lenL2.setTxt($g[32] ? "L2 = %5.1f" : "L2 = %5.2f", L2)
				$g[57][0].$lenL2.setAngle((90-$g[35])/2)
				$g[57][0].$aee.setPos(src*tan(360/$g[31]/2), -src)
				$g[57][0].$aee.setSpanAngle(-180*($g[31]-2)/$g[31])
				$g[57][0].$ac.setSpanAngle(360/$g[31])
			}
			$g[57][i].$edge.setPt(0, -src*tan(360/$g[31]/2), -src)
			$g[57][i].$edge.setPt(1, src*tan(360/$g[31]/2), -src)
			$g[57][i].$radius.setPt(0, 0, -sr)
		}
		$g[58].setPos(CX+sr, CY)
		$g[58].setPt(0, 0, -sr)
		$g[58].setPt(1, 0, sh-sr)
		$g[58].setTxt($g[32] ? "H = %5.1f" : "H = %5.2f", h)
		$g[58].setTxtOff(10, 0)
		$g[54].setTxt($g[32] ? "L2: %5.1f" : "L2: %5.2f", L2)
		$g[55].setTxt("A2: %d", A2)
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
				setVirtualWindow(0, 0, VW, VH, 1)
				$g[31]=getArgAsNum("N", 5)
				$g[32]=getArgAsNum("UNITS", 0)
				$g[33]=$g[32] ? 15 : 5.5
				$g[34]=$g[32] ? 2 : 0.75
				$g[35]=54
				$g[36]=$g[32] ? 15 : 40
				$g[37]=new Font("sans-serif", 16, 0)
				$g[38]=new Font("sans-serif", 20, 0)
				$g[39]=new Font("sans-serif", 32, 0)
				$g[40]=new SolidPen(0, 1, BLACK, ARROW40_START|ARROW40_END, 10, 10)
				$g[41]=new SolidPen(0, 1, BLUE, ARROW40_START|ARROW40_END, 10, 10)
				$g[42]=new SolidPen(0, 1, RED, ARROW40_START|ARROW40_END, 10, 10)
				$g[43]=new SolidPen(DOT, 1, BLACK)
				$g[44]=new SolidPen(DOT, 1, MAGENTA)
				$g[45]=new Rectangle2($g[0], 0, HLEFT|VCENTRE, 0, 0, BORDER, 0, VW-BORDER, 44, $g[1], $g[39], "N-agram")
				new Txt($g[0], 0, HLEFT, BORDER, 100, $g[1], 0, "N:")
				$g[46]=new Rectangle($g[0], 0, 0, $g[1], 0, BORDER+40, 80, 0, 0, 60, 50, 0, 0, "%d", $g[31])
				$g[47]=new Menu(GRAY192, WHITE, 0)
				$g[48]=3
				$pc = 1
			case 1:
				if (!($g[48]<13)) {
					$pc = 3
					continue
				}
				$g[47].addItem(sprintf(" %d ", $g[48]), $g[48])
				$pc = 2
			case 2:
				$g[48]++
				$pc = 1
				continue
			case 3:
				$g[46].addEventHandler("eventEE", $obj, $eh2)
				$g[46].addEventHandler("eventMB", $obj, 7)
				new Txt($g[0], 0, HLEFT, BORDER+120, 100, $g[1], 0, "Units:")
				$g[49]=new Rectangle($g[0], 0, 0, $g[1], 0, BORDER+200, 80, 0, 0, 60, 50, 0, 0, "%s", $g[32] ? "cm" : "in")
				$g[50]=new Menu(GRAY192, WHITE, 0)
				$g[50].addItem("in", $g[48])
				$g[50].addItem("cm", $g[48])
				$g[49].addEventHandler("eventEE", $obj, $eh4)
				$g[49].addEventHandler("eventMB", $obj, 10)
				new Txt($g[0], 0, HLEFT, BORDER, 200, $g[1], 0, "W:")
				$g[51]=new Slider(BORDER+100, 200, 160, 16, $g[32] ? 1.5 : 0.5, $g[32] ? 5 : 2, $g[32] ? 2 : 0.75, 0, $g[32] ? "%5.1f" : "%5.2f")
				$g[51].$r.addEventHandler("eventGRABBED", $obj, $eh6)
				new Txt($g[0], 0, HLEFT, BORDER, 300, $g[1], 0, "L1:")
				$g[52]=new Slider(BORDER+100, 300, 160, 16, $g[32] ? 7 : 3, $g[32] ? 25 : 10, $g[32] ? 15 : 5.5, 0, $g[32] ? "%5.1f" : "%5.2f")
				$g[52].$r.addEventHandler("eventGRABBED", $obj, $eh7)
				new Txt($g[0], 0, HLEFT, BORDER, 400, $g[1], 0, "A1:")
				$g[53]=new Slider(BORDER+100, 400, 160, 16, 0, 75, 54, 0, "%d")
				$g[53].$r.addEventHandler("eventGRABBED", $obj, $eh8)
				$g[54]=new Txt($g[0], 0, HLEFT, BORDER, 500, $g[1], 0)
				$g[55]=new Txt($g[0], 0, HLEFT, BORDER, 600, $g[1], 0)
				$g[56]=new Ellipse($g[0], 0, 0, 0, $g[16], CX, CY, -4, -4, 8, 8)
				$g[57]=newArray()
				$g[48]=0
				$pc = 4
			case 4:
				if (!($g[48]<$g[31])) {
					$pc = 6
					continue
				}
				$g[57][$g[48]]=new Vertex($g[0], $g[48]*360/$g[31])
				$pc = 5
			case 5:
				$g[48]++
				$pc = 4
				continue
			case 6:
				$g[58]=new Line($g[0], 0, ABSOLUTE|HLEFT, $g[40], 0, 0, 0, 0, 0)
				$g[58].setFont($g[38])
				$g[59]=new WoodTemplate($g[0], 0, 1000)
				compute()
				$return(0)
				continue
			case 7:
				$enter(1);	// $eh3
				if (!($stack[$fp-3])) {
					$pc = 9
					continue
				}
				$pc = 8
				$g[47].show($stack[$fp-5], $stack[$fp-6])
				return
			case 8:
				$stack[$fp+1] = $acc
				setArgFromNum("N", $stack[$fp+1]+3, 0)
				reset()
				return
			case 9:
				$acc = 0
				$return(4)
				continue
			case 10:
				$enter(1);	// $eh5
				if (!($stack[$fp-3])) {
					$pc = 12
					continue
				}
				$pc = 11
				$g[50].show($stack[$fp-5], $stack[$fp-6])
				return
			case 11:
				$stack[$fp+1] = $acc
				setArgFromNum("UNITS", $stack[$fp+1], 0)
				reset()
				return
			case 12:
				$acc = 0
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
