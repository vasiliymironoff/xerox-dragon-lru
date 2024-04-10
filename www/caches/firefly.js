// generated by VivioJS 22.02 build 0 : 14-Feb-22 14:27:39

"use strict"

function firefly(vplayer) {

	// preload fonts
	let font = new FontFace('Open Sans', 'url("../fonts/open-sans-v18-latin-regular.woff")', {weight:400})
	font.load()
	document.fonts.add(font)
	font = new FontFace('Open Sans', 'url("../fonts/open-sans-v18-latin-700.woff")', {weight:700})
	font.load()
	document.fonts.add(font)
	font = new FontFace('Open Sans', 'url("../fonts/open-sans-v18-latin-italic.woff")', {style:'italic', weight:400})
	font.load()
	document.fonts.add(font)

	// const imports
	const ARROW60_END = vplayer.ARROW60_END
	const ARROW60_START = vplayer.ARROW60_START
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
	const HRIGHT = vplayer.HRIGHT
	const ITALIC = vplayer.ITALIC
	const JUSTIFY = vplayer.JUSTIFY
	const MAGENTA = vplayer.MAGENTA
	const MB_CTRL = vplayer.MB_CTRL
	const MB_LEFT = vplayer.MB_LEFT
	const PROPAGATE = vplayer.PROPAGATE
	const RED = vplayer.RED
	const REMEMBER = vplayer.REMEMBER
	const ROUND_END = vplayer.ROUND_END
	const SMALLCAPS = vplayer.SMALLCAPS
	const VBOTTOM = vplayer.VBOTTOM
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
	var EXTENDEDGOBJ = vplayer.EXTENDEDGOBJ
	var Font = vplayer.Font
	var fork = vplayer.fork
	var getArgAsNum = vplayer.getArgAsNum
	var getLastModifiedMS = vplayer.getLastModifiedMS
	var getTick = vplayer.getTick
	var getURL = vplayer.getURL
	var Group = vplayer.Group
	var Line2 = vplayer.Line2
	var newArray = vplayer.newArray
	var Rectangle = vplayer.Rectangle
	var Rectangle2 = vplayer.Rectangle2
	var reset = vplayer.reset
	var rgba = vplayer.rgba
	var setBgBrush = vplayer.setBgBrush
	var setTPS = vplayer.setTPS
	var setVirtualWindow = vplayer.setVirtualWindow
	var SolidBrush = vplayer.SolidBrush
	var SolidPen = vplayer.SolidPen
	var sprintf = vplayer.sprintf
	var start = vplayer.start
	var timeToString = vplayer.timeToString
	var Txt = vplayer.Txt
	var VObj = vplayer.VObj

	// const declarations
	const W=1024
	const H=640
	const TITLEX=10
	const TITLEY=10
	const TITLEH=40
	const BY=10
	const BW=100
	const BH=30
	const INFOX=TITLEX
	const INFOY=70
	const INFOW=350
	const INFOH=150
	const MEMY=80
	const MEMW=180
	const MEMH=100
	const ABUSY=290
	const ABUSW=12
	const DBUSY=250
	const DBUSW=12
	const SBUSY=330
	const SBUSW=8
	const CACHEY=380
	const CACHEW=MEMW
	const CACHEH=60
	const CPUY=500
	const CPUW=CACHEW
	const CPUH=MEMH
	const BUSOPY=206
	const NCPU=3
	const NADDR=4
	const NSET=2
	const TICKS=20
	const DIRTYBIT=1
	const SHAREDBIT=2
	const NSND=0
	const NSD=1
	const SND=2
	const SD=3
	const bgap=3
	const bw=(CPUW-3*bgap)/2
	const bh=(CPUH-(NADDR+1)*bgap)/NADDR

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

	function Bus(x, y, w, l, fgColour) {
		VObj.call(this)
		this.$busPen=new SolidPen(0, w, fgColour, ARROW60_START|ARROW60_END)
		this.$arrow=new Line2($g[0], 0, 0, this.$busPen, x, y, l, 0)
	}
	Bus.prototype = Object.create(VObj.prototype)

	Bus.prototype.$setColour = function(rgba) {
		this.$busPen.setRGBA(rgba)
	}

	function BusArrow(_x, _y, _w, _l, bgColour, fgColour) {
		VObj.call(this)
		this.$x=_x
		this.$y=_y
		this.$w=_w
		this.$l=_l
		this.$bgPen=new SolidPen(0, this.$w, bgColour, ARROW60_START|ARROW60_END)
		this.$bgArrow=new Line2($g[0], 0, 0, this.$bgPen, this.$x, this.$y, 0, this.$l)
		this.$fgPen=new SolidPen(0, this.$w, fgColour, ARROW60_END)
		this.$fgArrow=new Line2($g[0], 0, 0, this.$fgPen, this.$x, this.$y, 0, 0)
		this.$fgArrow.setOpacity(0)
	}
	BusArrow.prototype = Object.create(VObj.prototype)

	BusArrow.prototype.$reset = function() {
		this.$bgArrow.setOpacity(1)
		this.$fgArrow.setOpacity(0)
	}

	function Memory(_x, _y) {
		VObj.call(this)
		this.$mem=newArray(NADDR)
		this.$stale=newArray(NADDR)
		this.$memR=newArray(NADDR)
		this.$x=_x
		this.$y=_y
		this.$bgap=3
		this.$bw=MEMW-2*this.$bgap
		this.$bh=(MEMH-(NADDR+1)*this.$bgap)/NADDR
		this.$r=new Rectangle2($g[0], 0, 0, $g[1], $g[29], this.$x, this.$y, MEMW, MEMH)
		this.$r.setRounded(4, 4)
		this.$t=new Rectangle2($g[0], 0, 0, 0, 0, this.$x, this.$y-30, MEMW, 25, $g[3], $g[39], "MEMORY")
		this.$abus=new BusArrow(this.$x+MEMW/4, this.$y+MEMH, ABUSW, ABUSY-this.$y-MEMH-ABUSW/2, GRAY32, BLUE)
		this.$dbus=new BusArrow(this.$x+3*MEMW/4, this.$y+MEMH, DBUSW, DBUSY-this.$y-MEMH-DBUSW/2, GRAY32, RED)
		for (this.$i=0; this.$i<NADDR; this.$i++) {
			this.$mem[this.$i]=0
			this.$stale[this.$i]=0
			this.$memR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], this.$x+this.$bgap, this.$y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw, this.$bh, $g[1], $g[36], "address: a%d data: %d", this.$i, this.$mem[this.$i])
			this.$memR[this.$i].setRounded(2, 2)
			this.$memR[this.$i].setTxtOff(0, 1)
		}
	}
	Memory.prototype = Object.create(VObj.prototype)

	Memory.prototype.$highlight = function(addr, flag) {
		if (flag==1) {
			this.$memR[addr].setBrush($g[19])
		} else {
			if (this.$stale[addr]) {
				this.$memR[addr].setBrush($g[29])
			} else {
				this.$memR[addr].setBrush($g[17])
			}
		}
	}

	Memory.prototype.$reset = function() {
		for (let i=0; i<NADDR; i++)
		this.$highlight(i, 0)
	}

	function showBusOp(s) {
		$g[56].setTxt(s)
		let w=$g[56].getTxtW()+16
		$g[56].setPt(0, -w/2, -10)
		$g[56].setPt(1, w/2, 10)
		$g[56].setOpacity(1, TICKS, 0)
	}

	function Cache(x, y, _cpuN) {
		VObj.call(this)
		this.$aR=newArray(NSET), this.$dR=newArray(NSET), this.$sharedR=newArray(NSET), this.$dirtyR=newArray(NSET)
		this.$sharedX0=newArray(NSET), this.$sharedX1=newArray(NSET), this.$dirtyX0=newArray(NSET), this.$dirtyX1=newArray(NSET)
		this.$a=newArray(NSET), this.$d=newArray(NSET), this.$state=newArray(NSET)
		this.$cpuN=_cpuN
		this.$bgap=3
		this.$bw0=20
		this.$bw1=(CACHEW-5*this.$bgap-2*this.$bw0)/2
		this.$bh=(CACHEH-(NSET+1)*this.$bgap)/NSET
		this.$sbus=new BusArrow(x+this.$bgap+this.$bw0/2, SBUSY+SBUSW/2, SBUSW, y-SBUSY-SBUSW/2, GRAY32, MAGENTA)
		this.$abus=new BusArrow(x+2*this.$bw0+this.$bw1/2+3*this.$bgap, ABUSY+ABUSW/2, ABUSW, y-ABUSY-ABUSW/2, GRAY32, BLUE)
		this.$dbus=new BusArrow(x+2*this.$bw0+3*this.$bw1/2+4*this.$bgap, DBUSY+DBUSW/2, DBUSW, y-DBUSY-DBUSW/2, GRAY32, RED)
		this.$cpuabus=new BusArrow(x+CACHEW/4, y+CACHEH, ABUSW, CPUY-CACHEY-CACHEH, GRAY32, BLUE)
		this.$cpudbus=new BusArrow(x+3*CACHEW/4, y+CACHEH, DBUSW, CPUY-CACHEY-CACHEH, GRAY32, RED)
		this.$r=new Rectangle2($g[0], 0, 0, $g[1], $g[29], x, y, CACHEW, CACHEH)
		this.$r.setRounded(4, 4)
		this.$t=new Txt($g[0], 0, HLEFT|VTOP, x+CACHEW-20, y-30, $g[3], $g[39], "CACHE %d", this.$cpuN)
		$g[56].moveToFront()
		for (this.$i=0; this.$i<NSET; this.$i++) {
			this.$state[this.$i]=SND
			this.$sharedR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+this.$bgap, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw0, this.$bh, $g[1], $g[36], "S")
			this.$sharedR[this.$i].setRounded(2, 2)
			this.$sharedX0[this.$i]=new Line2($g[0], 0, 0, $g[3], x+this.$bgap, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw0, this.$bh)
			this.$sharedX0[this.$i].setOpacity(0)
			this.$sharedX1[this.$i]=new Line2($g[0], 0, 0, $g[3], x+2*this.$bgap+this.$bw0, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, -this.$bw0, this.$bh)
			this.$sharedX1[this.$i].setOpacity(0)
			this.$dirtyR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+2*this.$bgap+this.$bw0, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw0, this.$bh, $g[1], $g[36], "D")
			this.$dirtyR[this.$i].setRounded(2, 2)
			this.$dirtyX0[this.$i]=new Line2($g[0], 0, 0, $g[3], x+2*this.$bgap+this.$bw0, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw0, this.$bh)
			this.$dirtyX1[this.$i]=new Line2($g[0], 0, 0, $g[3], x+2*this.$bgap+2*this.$bw0, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, -this.$bw0, this.$bh)
			this.$a[this.$i]=this.$i
			this.$aR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+3*this.$bgap+2*this.$bw0, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw1, this.$bh, $g[1], $g[36], "a%d", this.$i)
			this.$aR[this.$i].setRounded(2, 2)
			this.$d[this.$i]=0
			this.$dR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+4*this.$bgap+2*this.$bw0+this.$bw1, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw1, this.$bh, $g[1], $g[36], "0")
			this.$dR[this.$i].setRounded(2, 2)
		}
	}
	Cache.prototype = Object.create(VObj.prototype)

	Cache.prototype.$setState = function(set) {
		let opacity=(this.$state[set]&SHAREDBIT) ? 0 : 1
		this.$sharedX0[set].setOpacity(opacity)
		this.$sharedX1[set].setOpacity(opacity)
		opacity=(this.$state[set]&DIRTYBIT) ? 0 : 1
		this.$dirtyX0[set].setOpacity(opacity)
		this.$dirtyX1[set].setOpacity(opacity)
	}

	Cache.prototype.$highlight = function(set, flag) {
		if (flag==1) {
			this.$sharedR[set].setBrush($g[19])
			this.$dirtyR[set].setBrush($g[19])
			this.$aR[set].setBrush($g[19])
			this.$dR[set].setBrush($g[19])
		} else {
			this.$sharedR[set].setBrush($g[17])
			this.$dirtyR[set].setBrush($g[17])
			this.$aR[set].setBrush($g[17])
			this.$dR[set].setBrush($g[17])
		}
	}

	Cache.prototype.$reset = function() {
		this.$cpuabus.$reset()
		this.$cpudbus.$reset()
		this.$highlight(0, 0)
		this.$highlight(1, 0)
	}

	Cache.prototype.$resetBus = function() {
		$g[55].$abus.$reset()
		$g[55].$dbus.$reset()
		$g[52].$setColour(GRAY32)
		$g[53].$setColour(GRAY32)
		$g[54].$setColour(GRAY32)
		$g[55].$reset()
		for (let i=0; i<NCPU; i++) {
			$g[58][i].$abus.$reset()
			$g[58][i].$dbus.$reset()
			$g[58][i].$sbus.$reset()
		}
	}

	function CPU(x, y, _cpuN) {
		VObj.call(this)
		this.$cpuN=_cpuN
		this.$buttonLock=0
		this.$selected
		this.$rb=newArray(NADDR)
		this.$wb=newArray(NADDR)
		this.$r=new Rectangle2($g[0], 0, 0, $g[1], $g[29], x, y, CPUW, CPUH)
		this.$r.setRounded(4, 4)
		new Txt($g[0], 0, HLEFT|VTOP, x+CPUW-20, y-30, $g[3], $g[39], "CPU %d", this.$cpuN)
		for (this.$i=0; this.$i<NADDR; this.$i++) {
			this.$rb[this.$i]=new this.$CPUButton(this, $g[0], 0, x+bgap, y+(this.$i+1)*bgap+this.$i*bh, this.$i)
			this.$wb[this.$i]=new this.$CPUButton(this, $g[0], 1, x+bgap+bw+bgap, y+(this.$i+1)*bgap+this.$i*bh, this.$i)
		}
	}
	CPU.prototype = Object.create(VObj.prototype)

	CPU.prototype.$CPUButton = function($parent, $grp, _rw, x, y, _addr) {
		this.parent = $parent
		SimpleButton.call(this, $grp, x, y, bw, bh, $g[17], $g[30], $g[32], $g[12], $g[1], $g[36], $g[37], "")
		this.$rw=_rw
		this.$addr=_addr
		this.setTxt(this.$rw ? "write a%d" : "read a%d", this.$addr)
		this.addEventHandler("eventMB", this, 103)
	}
	CPU.prototype.$CPUButton.prototype = Object.create(SimpleButton.prototype)

	CPU.prototype.$CPUButton.prototype.$select = function() {
		if (this.parent.$selected==this) {
			this.parent.$selected.setPen($g[32])
			this.parent.$selected=0
		} else {
			if (this.parent.$selected)
			this.parent.$selected.setPen($g[32])
			this.parent.$selected=this
			this.parent.$selected.setPen($g[33])
		}
	}

	CPU.prototype.$CPUButton.prototype.$resetCPUs = function(cpuN) {
		for (let i=0; i<NCPU; i++) {
			if ($g[59][i].$selected==0) {
				$g[58][i].$reset()
				$g[59][i].$r.setPen($g[1])
				$g[59][i].$resetButtons()
			}
		}
	}

	CPU.prototype.$resetButtons = function() {
		for (let i=0; i<NADDR; i++) {
			if (this.$selected!=this.$rb[i])
			this.$rb[i].setPen($g[32])
			if (this.$selected!=this.$wb[i])
			this.$wb[i].setPen($g[32])
		}
	}

	function $eh4(down, flags, $2, $3) {
		if (down&&(flags&MB_LEFT)) {
			if ($g[49]==2) {
				$g[49]=0
				$g[61].setTxt("bug free!")
			} else {
				$g[49]++
				$g[61].setTxt("bug %d", $g[49]-1)
			}
		}
		return 0
	}

	function $eh5(down, flags, $2, $3) {
		if (down&&(flags&MB_LEFT))
		getURL("fireflyHelp.htm")
		return 0
	}

	function $eh6(down, flags, $2, $3) {
		if (down&&(flags&MB_LEFT))
		getURL("../vivio.htm")
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
				setTPS(20)
				$g[31]=new SolidPen(0, 2, rgba(0, 0.59999999999999998, 0), ROUND_END)
				$g[32]=new SolidPen(0, 2, GRAY64, ROUND_END)
				$g[33]=new SolidPen(0, 2, rgba(1, 0.65000000000000002, 0), ROUND_END)
				$g[34]=new SolidPen(0, 2, RED, ROUND_END)
				$g[35]=new SolidBrush(rgba(0, 0.56000000000000005, 0.16))
				$g[36]=new Font("Open Sans", 14, 0)
				$g[37]=new Font("Open Sans", 13, 0)
				$g[38]=new Font("Open Sans", 12, 0)
				$g[39]=new Font("Open Sans", 16, SMALLCAPS)
				$g[40]=new Font("Open Sans", 10, ITALIC)
				$g[41]=new Font("Open Sans", 28, 0)
				setBgBrush($g[30])
				$g[42]=new Rectangle2($g[0], 0, 0, 0, $g[35], TITLEX, TITLEY, W/2, TITLEH, $g[2], $g[41], "Firefly Protocol")
				$g[42].setRounded(5, 5)
				$g[42].setTxtOff(0, 2)
				$g[42].setPt(1, $g[42].getTxtW()+16, TITLEH)
				$g[43]="Like real hardware, the CPUs can operate in\n"
				$g[43]+="parallel. Try pressing a button on different\n"
				$g[43]+="CPUs \"simultaneously\". Alternatively select\n"
				$g[43]+="buttons on different CPUs with the CTRL key and\n"
				$g[43]+="click on the last button without CTRL to start\n"
				$g[43]+="simultaneous transactions."
				new Rectangle2($g[0], 0, HLEFT|VCENTRE|JUSTIFY, 0, 0, INFOX, INFOY, INFOW, INFOH, $g[1], $g[38], $g[43])
				new Txt($g[0], 0, HRIGHT|VBOTTOM, W-10, H-10, $g[14], $g[40], timeToString(getLastModifiedMS(), "last modified %e-%b-%y"))
				$g[44]=0
				$g[45]=0
				$g[46]=0
				$g[47]=0
				$g[48]=0
				$g[49]=0
				$g[50]=-1
				$g[51]=0
				$g[52]=new Bus(10, DBUSY, DBUSW, W-40, GRAY32)
				new Txt($g[0], 0, HLEFT|VTOP, 60, DBUSY-30, $g[3], $g[39], "data bus")
				$g[53]=new Bus(20, ABUSY, ABUSW, W-40, GRAY32)
				new Txt($g[0], 0, HLEFT|VTOP, 70, ABUSY-30, $g[5], $g[39], "address bus")
				$g[54]=new Bus(30, SBUSY, SBUSW, W-40, GRAY32)
				new Txt($g[0], 0, HLEFT|VTOP, 220, SBUSY-25, $g[7], $g[39], "shared")
				$g[55]=new Memory((W-MEMW)/2, MEMY)
				$g[56]=new Rectangle($g[0], 0, 0, $g[1], $g[17], W/2, BUSOPY, 0, 0, 0, 0, 0, $g[38])
				$g[56].setOpacity(0)
				$g[56].setRounded(4, 4)
				$g[57]=new Txt($g[0], 0, HLEFT, 2*W/3, (ABUSY+DBUSY)/2, 0, $g[39], "bus cycles: %d", $g[51])
				$g[58]=newArray(NCPU)
				$g[59]=newArray(NCPU)
				$g[58][0]=new Cache((W-5*CACHEW)/2, CACHEY, 0)
				$g[58][1]=new Cache((W-5*CACHEW)/2+2*CACHEW, CACHEY, 1)
				$g[58][2]=new Cache((W-5*CACHEW)/2+4*CACHEW, CACHEY, 2)
				$g[59][0]=new CPU((W-5*CPUW)/2, CPUY, 0)
				$g[59][1]=new CPU((W-5*CPUW)/2+2*CPUW, CPUY, 1)
				$g[59][2]=new CPU((W-5*CPUW)/2+4*CPUW, CPUY, 2)
				$g[60]=new SimpleButton($g[0], W-2*BW-2*BW/8, BY, BW, BH, $g[17], $g[30], $g[32], $g[12], $g[1], $g[36], $g[37], "reset")
				$g[61]=new SimpleButton($g[0], W-BW-BW/8, BY, BW, BH, $g[17], $g[30], $g[32], $g[12], $g[1], $g[36], $g[37], "bug free!")
				$g[62]=new SimpleButton($g[0], W-2*BW-2*BW/8, BY+BH+BH/4, BW, BH, $g[17], $g[30], $g[32], $g[12], $g[1], $g[36], $g[37], "help")
				$g[63]=new SimpleButton($g[0], W-BW-BW/8, BY+BH+BH/4, BW, BH, $g[17], $g[30], $g[32], $g[12], $g[1], $g[36], $g[37], "VivioJS help")
				$g[60].addEventHandler("eventMB", $obj, 119)
				$g[61].addEventHandler("eventMB", $obj, $eh4)
				$g[62].addEventHandler("eventMB", $obj, $eh5)
				$g[63].addEventHandler("eventMB", $obj, $eh6)
				if (!(getArgAsNum("selfTest", 0))) {
					$pc = 11
					continue
				}
				$call(97, $g[59][0].$rb[0])
				continue
			case 1:
				$call(97, $g[59][0].$rb[2])
				continue
			case 2:
				$call(97, $g[59][0].$wb[2])
				continue
			case 3:
				$call(97, $g[59][0].$wb[2])
				continue
			case 4:
				$call(97, $g[59][1].$rb[2])
				continue
			case 5:
				$call(97, $g[59][1].$wb[2])
				continue
			case 6:
				$call(97, $g[59][1].$wb[2])
				continue
			case 7:
				$call(97, $g[59][1].$rb[0])
				continue
			case 8:
				$call(97, $g[59][0].$wb[2])
				continue
			case 9:
				$call(97, $g[59][0].$wb[2])
				continue
			case 10:
				debug("FINISHED tick=%d", getTick())
				$pc = 11
			case 11:
				$return(0)
				continue
			case 12:
				$enter(0);	// moveUp
				$obj.$fgArrow.setPt(0, 0, $obj.$l)
				$obj.$fgArrow.setPt(1, 0, $obj.$l)
				$obj.$fgArrow.setPt(1, 0, 0, $stack[$fp-3], 0)
				$obj.$fgArrow.setOpacity(1, $stack[$fp-3]/4, 0)
				$pc = 13
				if ($obj.$bgArrow.setOpacity(0, $stack[$fp-3], $stack[$fp-4])) {
					return
				}
			case 13:
				$return(2)
				continue
			case 14:
				$enter(0);	// moveDown
				$obj.$fgArrow.setPt(0, 0, 0)
				$obj.$fgArrow.setPt(1, 0, 0)
				$obj.$fgArrow.setPt(1, 0, $obj.$l, $stack[$fp-3], 0)
				$obj.$fgArrow.setOpacity(1, $stack[$fp-3]/4, 0)
				$pc = 15
				if ($obj.$bgArrow.setOpacity(0, $stack[$fp-3], $stack[$fp-4])) {
					return
				}
			case 15:
				$return(2)
				continue
			case 16:
				$enter(1);	// busWatchHelper
				$stack[$fp+1]=$stack[$fp-3]%NSET
				if (!($stack[$fp-4]&&$obj.$a[$stack[$fp+1]]==$stack[$fp-3])) {
					$pc = 19
					continue
				}
				$call(14, $obj.$dbus, TICKS, 0)
				continue
			case 17:
				$call(12, $obj.$sbus, TICKS, 0)
				continue
			case 18:
				$pc = 19
			case 19:
				$call(14, $obj.$abus, TICKS, 1)
				continue
			case 20:
				if (!($obj.$a[$stack[$fp+1]]!=$stack[$fp-3])) {
					$pc = 21
					continue
				}
				$g[45]--
				$return(3)
				continue
			case 21:
				$obj.$state[$stack[$fp+1]]|=SHAREDBIT
				$obj.$highlight($stack[$fp+1], 1)
				if (!($g[47])) {
					$pc = 23
					continue
				}
				showBusOp(sprintf("CPU %d reads a%d from memory - CPU(s) intervene and supply data", $obj.$cpuN, $stack[$fp-3]))
				$call(12, $obj.$dbus, TICKS, 0)
				continue
			case 22:
				$pc = 23
			case 23:
				if (!($stack[$fp-4]==1)) {
					$pc = 24
					continue
				}
				$obj.$d[$stack[$fp+1]]=$stack[$fp-5]
				$obj.$dR[$stack[$fp+1]].setTxt("%d", $stack[$fp-5])
				$obj.$state[$stack[$fp+1]]=$obj.$state[$stack[$fp+1]]&~DIRTYBIT
				$pc = 24
			case 24:
				$obj.$setState($stack[$fp+1])
				$g[45]--
				if (!($stack[$fp-4]==0)) {
					$pc = 26
					continue
				}
				$call(12, $obj.$sbus, TICKS, 0)
				continue
			case 25:
				$pc = 26
			case 26:
				$return(3)
				continue
			case 27:
				$enter(2);	// busWatch
				$stack[$fp+1]=$stack[$fp-3]%NSET
				$g[46]=0
				$g[47]=0
				$stack[$fp+2]=0
				$pc = 28
			case 28:
				if (!($stack[$fp+2]<NCPU)) {
					$pc = 32
					continue
				}
				if (!($stack[$fp+2]==$stack[$fp-4])) {
					$pc = 29
					continue
				}
				$pc = 31
				continue
			case 29:
				if (!($g[58][$stack[$fp+2]].$a[$stack[$fp+1]]==$stack[$fp-3])) {
					$pc = 30
					continue
				}
				$g[46]=1
				$g[47]=($stack[$fp-5]==0)&&$g[58][$stack[$fp+2]].$state[$stack[$fp+1]]&DIRTYBIT
				$g[48]=$g[58][$stack[$fp+2]].$d[$stack[$fp+1]]
				$pc = 32
				continue
			case 30:
				$pc = 31
			case 31:
				$stack[$fp+2]++
				$pc = 28
				continue
			case 32:
				$call(12, $g[55].$abus, TICKS, 0)
				continue
			case 33:
				if (!($stack[$fp-5]&&$g[47]==0)) {
					$pc = 35
					continue
				}
				$call(12, $g[55].$dbus, TICKS, 0)
				continue
			case 34:
				$pc = 35
			case 35:
				$g[45]=NCPU-1
				$stack[$fp+2]=0
				$pc = 36
			case 36:
				if (!($stack[$fp+2]<NCPU)) {
					$pc = 39
					continue
				}
				if (!($stack[$fp+2]!=$stack[$fp-4])) {
					$pc = 37
					continue
				}
				fork(16, $g[58][$stack[$fp+2]], $stack[$fp-3], $stack[$fp-5], $stack[$fp-6])
				$pc = 37
			case 37:
				$pc = 38
			case 38:
				$stack[$fp+2]++
				$pc = 36
				continue
			case 39:
				$pc = 40
			case 40:
				if (!($g[45])) {
					$pc = 42
					continue
				}
				$pc = 41
				if (wait(1)) {
					return
				}
			case 41:
				$pc = 40
				continue
			case 42:
				$return(4)
				continue
			case 43:
				$enter(2);	// flush
				$stack[$fp+1]=$stack[$fp-4]%NSET
				$stack[$fp+2]=$obj.$a[$stack[$fp+1]]
				$call(12, $obj.$abus, TICKS, 0)
				continue
			case 44:
				$call(12, $obj.$dbus, TICKS, 1)
				continue
			case 45:
				$g[53].$setColour(BLUE)
				$g[52].$setColour(RED)
				$call(27, $obj, $stack[$fp-4], $stack[$fp-3], 1, $obj.$d[$stack[$fp+1]])
				continue
			case 46:
				if (!($g[46])) {
					$pc = 47
					continue
				}
				$g[54].$setColour(MAGENTA)
				$pc = 47
			case 47:
				$call(14, $obj.$sbus, TICKS, 1)
				continue
			case 48:
				$obj.$state[$stack[$fp+1]]=$obj.$state[$stack[$fp+1]]&~DIRTYBIT
				$obj.$setState($stack[$fp+1])
				$g[55].$stale[$stack[$fp+2]]=0
				$g[55].$memR[$stack[$fp+2]].setBrush($g[17])
				$g[55].$mem[$stack[$fp+2]]=$obj.$d[$stack[$fp+1]]
				$g[55].$memR[$stack[$fp+2]].setTxt("address: a%d data: %d", $stack[$fp+2], $g[55].$mem[$stack[$fp+2]])
				$return(2)
				continue
			case 49:
				$enter(0);	// getBusLock
				if (!($g[50]==$obj.$cpuN)) {
					$pc = 50
					continue
				}
				$return(0)
				continue
			case 50:
				$pc = 51
			case 51:
				if (!($g[50]>=0)) {
					$pc = 53
					continue
				}
				$pc = 52
				if (wait(1)) {
					return
				}
			case 52:
				$pc = 51
				continue
			case 53:
				$g[50]=$obj.$cpuN
				$return(0)
				continue
			case 54:
				$enter(0);	// releaseBusLock
				$g[50]=-1
				$pc = 55
				if (wait(1)) {
					return
				}
			case 55:
				$return(0)
				continue
			case 56:
				$enter(1);	// read
				$stack[$fp+1]=$stack[$fp-3]%NSET
				if (!($g[50]==-1)) {
					$pc = 57
					continue
				}
				$obj.$resetBus()
				$pc = 57
			case 57:
				if (!($stack[$fp-4])) {
					$pc = 59
					continue
				}
				$call(12, $obj.$cpuabus, TICKS, 1)
				continue
			case 58:
				$pc = 59
			case 59:
				if (!($obj.$a[$stack[$fp+1]]==$stack[$fp-3])) {
					$pc = 62
					continue
				}
				if (!($stack[$fp-4])) {
					$pc = 61
					continue
				}
				$call(14, $obj.$cpudbus, TICKS, 1)
				continue
			case 60:
				$pc = 61
			case 61:
				$return(2)
				continue
			case 62:
				if (!(($obj.$state[$stack[$fp+1]]&DIRTYBIT)&&($g[49]!=2))) {
					$pc = 66
					continue
				}
				$call(49, $obj)
				continue
			case 63:
				showBusOp(sprintf("CPU %d flushes a%d from its cache to memory", $obj.$cpuN, $stack[$fp-3]))
				$g[51]++
				$g[57].setTxt("bus cycles: %d", $g[51])
				$obj.$resetBus()
				$call(43, $obj, $obj.$cpuN, $obj.$a[$stack[$fp+1]])
				continue
			case 64:
				$call(54, $obj)
				continue
			case 65:
				$pc = 66
			case 66:
				$obj.$highlight($stack[$fp+1], 1)
				$call(49, $obj)
				continue
			case 67:
				$obj.$resetBus()
				showBusOp(sprintf("CPU %d reads a%d from memory", $obj.$cpuN, $stack[$fp-3]))
				$g[51]++
				$g[57].setTxt("bus cycles: %d", $g[51])
				$call(12, $obj.$abus, TICKS, 1)
				continue
			case 68:
				$g[53].$setColour(BLUE)
				$call(27, $obj, $stack[$fp-3], $obj.$cpuN, 0, 0)
				continue
			case 69:
				if (!($g[47])) {
					$pc = 71
					continue
				}
				$pc = 70
				if (wait(TICKS)) {
					return
				}
			case 70:
				$pc = 73
				continue
			case 71:
				$call(14, $g[55].$dbus, TICKS, 1)
				continue
			case 72:
				$pc = 73
			case 73:
				if (!($g[46])) {
					$pc = 74
					continue
				}
				$g[54].$setColour(MAGENTA)
				$pc = 74
			case 74:
				$g[52].$setColour(RED)
				$call(14, $obj.$sbus, TICKS, 0)
				continue
			case 75:
				$call(14, $obj.$dbus, TICKS, 1)
				continue
			case 76:
				if (!($g[47])) {
					$pc = 77
					continue
				}
				$obj.$d[$stack[$fp+1]]=$g[48]
				$obj.$state[$stack[$fp+1]]=SD
				$pc = 78
				continue
			case 77:
				$g[55].$highlight($stack[$fp-3], 1)
				$obj.$d[$stack[$fp+1]]=$g[55].$mem[$stack[$fp-3]]
				$obj.$state[$stack[$fp+1]]=($g[46]) ? SND : NSND
				$pc = 78
			case 78:
				$obj.$a[$stack[$fp+1]]=$stack[$fp-3]
				$obj.$aR[$stack[$fp+1]].setTxt("a%d", $stack[$fp-3])
				$obj.$dR[$stack[$fp+1]].setTxt("%d", $obj.$d[$stack[$fp+1]])
				$obj.$setState($stack[$fp+1])
				$call(54, $obj)
				continue
			case 79:
				if (!($stack[$fp-4])) {
					$pc = 81
					continue
				}
				$call(14, $obj.$cpudbus, TICKS, 1)
				continue
			case 80:
				$pc = 81
			case 81:
				$return(2)
				continue
			case 82:
				$enter(1);	// write
				$stack[$fp+1]=$stack[$fp-3]%NSET
				if (!($g[50]==-1)) {
					$pc = 83
					continue
				}
				$obj.$resetBus()
				$pc = 83
			case 83:
				$call(12, $obj.$cpudbus, TICKS, 0)
				continue
			case 84:
				$call(12, $obj.$cpuabus, TICKS, 1)
				continue
			case 85:
				$obj.$highlight($stack[$fp+1], 1)
				if (!($obj.$a[$stack[$fp+1]]!=$stack[$fp-3])) {
					$pc = 87
					continue
				}
				$call(56, $obj, $stack[$fp-3], 0)
				continue
			case 86:
				$pc = 87
			case 87:
				$g[44]++
				if (!(($obj.$state[$stack[$fp+1]]&SHAREDBIT)&&($g[49]!=1))) {
					$pc = 96
					continue
				}
				$call(49, $obj)
				continue
			case 88:
				$obj.$resetBus()
				showBusOp(sprintf("CPU %d writes %d to memory address a%d", $obj.$cpuN, $g[44], $stack[$fp-3]))
				$g[51]++
				$g[57].setTxt("bus cycles: %d", $g[51])
				$obj.$a[$stack[$fp+1]]=$stack[$fp-3]
				$obj.$aR[$stack[$fp+1]].setTxt("a%d", $stack[$fp-3])
				$obj.$d[$stack[$fp+1]]=$g[44]
				$obj.$dR[$stack[$fp+1]].setTxt("%d", $g[44])
				$call(12, $obj.$abus, TICKS, 0)
				continue
			case 89:
				$call(12, $obj.$dbus, TICKS, 1)
				continue
			case 90:
				$g[53].$setColour(BLUE)
				$g[52].$setColour(RED)
				$call(27, $obj, $stack[$fp-3], $obj.$cpuN, 1, $obj.$d[$stack[$fp+1]])
				continue
			case 91:
				$call(14, $obj.$sbus, TICKS, 1)
				continue
			case 92:
				if (!($g[46])) {
					$pc = 93
					continue
				}
				$g[54].$setColour(MAGENTA)
				$obj.$state[$stack[$fp+1]]=SND
				$pc = 94
				continue
			case 93:
				$obj.$state[$stack[$fp+1]]=NSND
				$pc = 94
			case 94:
				$obj.$setState($stack[$fp+1])
				$g[55].$mem[$stack[$fp-3]]=$obj.$d[$stack[$fp+1]]
				$g[55].$memR[$stack[$fp-3]].setTxt("address: a%d data: %d", $stack[$fp-3], $g[55].$mem[$stack[$fp-3]])
				$g[55].$stale[$stack[$fp-3]]=0
				$g[55].$highlight($stack[$fp-3], 1)
				$call(54, $obj)
				continue
			case 95:
				$return(1)
				continue
			case 96:
				$obj.$a[$stack[$fp+1]]=$stack[$fp-3]
				$obj.$aR[$stack[$fp+1]].setTxt("a%d", $stack[$fp-3])
				$obj.$d[$stack[$fp+1]]=$g[44]
				$obj.$dR[$stack[$fp+1]].setTxt("%d", $g[44])
				$obj.$state[$stack[$fp+1]]=NSD
				$obj.$setState($stack[$fp+1])
				$g[55].$stale[$stack[$fp-3]]=1
				$g[55].$memR[$stack[$fp-3]].setBrush($g[29])
				$return(1)
				continue
			case 97:
				$enter(0);	// cpuButtonAction
				$obj.$resetCPUs($obj.parent.$cpuN)
				if (!($g[50]==-1)) {
					$pc = 98
					continue
				}
				$g[58][$obj.parent.$cpuN].$resetBus()
				$pc = 98
			case 98:
				$obj.parent.$buttonLock=1
				$g[58][$obj.parent.$cpuN].$reset()
				$obj.parent.$r.setPen($g[31])
				$obj.setPen($g[34])
				if (!($obj.$rw)) {
					$pc = 100
					continue
				}
				$call(82, $g[58][$obj.parent.$cpuN], $obj.$addr)
				continue
			case 99:
				$pc = 102
				continue
			case 100:
				$call(56, $g[58][$obj.parent.$cpuN], $obj.$addr, 1)
				continue
			case 101:
				$pc = 102
			case 102:
				$obj.$resetCPUs($obj.parent.$cpuN)
				$obj.parent.$selected=0
				checkPoint()
				$obj.parent.$buttonLock=0
				$return(0)
				continue
			case 103:
				$enter(2);	// $eh2
				$stack[$fp+1]=0
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT))) {
					$pc = 111
					continue
				}
				$stack[$fp+1]|=REMEMBER
				if (!($obj.parent.$buttonLock)) {
					$pc = 104
					continue
				}
				$acc = $stack[$fp+1]
				$return(4)
				continue
			case 104:
				$stack[$fp+2]=0
				$pc = 105
			case 105:
				if (!($stack[$fp+2]<NCPU)) {
					$pc = 107
					continue
				}
				$g[59][$stack[$fp+2]].$resetButtons()
				$pc = 106
			case 106:
				$stack[$fp+2]++
				$pc = 105
				continue
			case 107:
				if (!($stack[$fp-4]&MB_CTRL)) {
					$pc = 108
					continue
				}
				$obj.$select()
				$pc = 110
				continue
			case 108:
				$obj.parent.$selected=$obj
				$call(115, $obj)
				continue
			case 109:
				$pc = 110
			case 110:
				$pc = 111
			case 111:
				$acc = $stack[$fp+1]
				$return(4)
				continue
			case 112:
				$enter(0);	// cpuAction
				if (!($obj.$selected&&$obj.$buttonLock==0)) {
					$pc = 114
					continue
				}
				$call(97, $obj.$selected)
				continue
			case 113:
				$pc = 114
			case 114:
				$return(0)
				continue
			case 115:
				$enter(1);	// startAction
				start()
				$stack[$fp+1]=0
				$pc = 116
			case 116:
				if (!($stack[$fp+1]<NCPU)) {
					$pc = 118
					continue
				}
				fork(112, $g[59][$stack[$fp+1]])
				$pc = 117
			case 117:
				$stack[$fp+1]++
				$pc = 116
				continue
			case 118:
				$return(0)
				continue
			case 119:
				$enter(0);	// $eh3
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT))) {
					$pc = 120
					continue
				}
				reset()
				return
			case 120:
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