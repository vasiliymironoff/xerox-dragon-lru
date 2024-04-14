// generated by VivioJS 22.02 build 0 : 14-Apr-24 19:28:35

"use strict"

function dragon(vplayer) {

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
	var EXTENDEDGOBJ = vplayer.EXTENDEDGOBJ
	var Font = vplayer.Font
	var fork = vplayer.fork
	var getLastModifiedMS = vplayer.getLastModifiedMS
	var Group = vplayer.Group
	var Line2 = vplayer.Line2
	var newArray = vplayer.newArray
	var Rectangle = vplayer.Rectangle
	var Rectangle2 = vplayer.Rectangle2
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
	const H=640+600
	const TITLEX=10
	const TITLEY=10
	const TITLEH=40
	const BY=10
	const BW=100
	const BH=30
	const INFOX=TITLEX
	const INFOY=60
	const INFOW=350
	const INFOH=150
	const MEMY=80
	const MEMW=180
	const MEMH=100*4
	const ABUSY=290+300
	const ABUSW=12
	const DBUSY=250+300
	const DBUSW=12
	const SBUSY=330+300
	const SBUSW=8
	const CACHEY=380+300
	const CACHEW=MEMW
	const CACHEH=60
	const CPUY=500+300
	const CPUW=CACHEW
	const CPUH=MEMH
	const BUSOPY=208
	const NCPU=4
	const NADDR=16
	const NSET=4
	const ASS=2
	const TICKS=20
	const INVALID=0
	const SHARED=1
	const EXCLUSIVE=2
	const MODIFIED=3
	const D=0
	const VE=1
	const SD=2
	const SC=3
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

	Bus.prototype.$setColour = function(colour) {
		this.$busPen.setRGBA(colour)
	}

	function BusArrow(x, y, w, _l, bgColour, fgColour) {
		VObj.call(this)
		this.$l=_l
		this.$bgPen=new SolidPen(0, w, bgColour, ARROW60_START|ARROW60_END)
		this.$bgArrow=new Line2($g[0], 0, 0, this.$bgPen, x, y, 0, this.$l)
		this.$fgPen=new SolidPen(0, w, fgColour, ARROW60_END)
		this.$fgArrow=new Line2($g[0], 0, 0, this.$fgPen, x, y, 0, 0)
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
		new Rectangle2($g[0], 0, 0, 0, 0, this.$x, this.$y-30, MEMW, 25, $g[3], $g[39], "MEMORY")
		this.$abus=new BusArrow(this.$x+MEMW/4, this.$y+MEMH, ABUSW, ABUSY-this.$y-MEMH-ABUSW/2, GRAY32, BLUE)
		this.$dbus=new BusArrow(this.$x+3*MEMW/4, this.$y+MEMH, DBUSW, DBUSY-this.$y-MEMH-DBUSW/2, GRAY32, RED)
		for (this.$i=0; this.$i<NADDR; this.$i++) {
			this.$mem[this.$i]=0
			this.$stale[this.$i]=0
			this.$memR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], this.$x+this.$bgap, this.$y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw, this.$bh, $g[1], $g[36], "address: a%d data: %d", this.$i, this.$mem[this.$i])
			this.$memR[this.$i].setRounded(2, 2)
		}
	}
	Memory.prototype = Object.create(VObj.prototype)

	Memory.prototype.$highlight = function(addr, flag) {
		this.$memR[addr].setBrush((flag) ? $g[19] : (this.$stale[addr]) ? $g[29] : $g[17])
	}

	Memory.prototype.$reset = function() {
		for (let i=0; i<NADDR; i++)
		this.$highlight(i, 0)
	}

	function showBusOp(s) {
		$g[53].setTxt(s)
		let w=$g[53].getTxtW()+16
		$g[53].setPt(0, -w/2, -10)
		$g[53].setPt(1, w/2, 10)
		$g[53].setOpacity(1, TICKS, 0)
	}

	function Cache(x, y, _cpuN) {
		VObj.call(this)
		this.$aR=newArray(NSET), this.$dR=newArray(NSET), this.$stateR=newArray(NSET)
		this.$a=newArray(NSET), this.$d=newArray(NSET), this.$state=newArray(NSET)
		this.$cpuN=_cpuN
		this.$bgap=3
		this.$bw0=20
		this.$bw1=(CACHEW-4*this.$bgap-this.$bw0)/2
		this.$bh=(CACHEH-(NSET+1)*this.$bgap)/NSET
		this.$sharedbus=new BusArrow(x+this.$bgap+this.$bw0/2, SBUSY+SBUSW/2, SBUSW, y-SBUSY-SBUSW/2, GRAY32, MAGENTA)
		this.$abus=new BusArrow(x+2*this.$bgap+this.$bw0+this.$bw1/2, ABUSY+ABUSW/2, ABUSW, y-ABUSY-ABUSW/2, GRAY32, BLUE)
		this.$dbus=new BusArrow(x+3*this.$bgap+this.$bw0+3*this.$bw1/2, DBUSY+DBUSW/2, DBUSW, y-DBUSY-DBUSW/2, GRAY32, RED)
		this.$cpuabus=new BusArrow(x+CACHEW/4, y+CACHEH, ABUSW, CPUY-CACHEY-CACHEH, GRAY32, BLUE)
		this.$cpudbus=new BusArrow(x+3*CACHEW/4, y+CACHEH, DBUSW, CPUY-CACHEY-CACHEH, GRAY32, RED)
		this.$r=new Rectangle2($g[0], 0, 0, $g[1], $g[29], x, y, CACHEW, CACHEH)
		this.$r.setRounded(4, 4)
		new Txt($g[0], 0, HLEFT|VTOP, x+CACHEW-20, y-30, $g[3], $g[39], "CACHE %d", this.$cpuN)
		$g[53].moveToFront()
		for (this.$i=0; this.$i<NSET; this.$i++) {
			this.$state[this.$i]=INVALID
			this.$stateR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+this.$bgap, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw0, this.$bh, $g[1], $g[36], "I")
			this.$stateR[this.$i].setRounded(2, 2)
			this.$a[this.$i]=0
			this.$aR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+2*this.$bgap+this.$bw0, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw1, this.$bh, $g[1], $g[36])
			this.$aR[this.$i].setRounded(2, 2)
			this.$d[this.$i]=0
			this.$dR[this.$i]=new Rectangle2($g[0], 0, 0, $g[1], $g[17], x+3*this.$bgap+this.$bw0+this.$bw1, y+(this.$i+1)*this.$bgap+this.$i*this.$bh, this.$bw1, this.$bh, $g[1], $g[36])
			this.$dR[this.$i].setRounded(2, 2)
		}
	}
	Cache.prototype = Object.create(VObj.prototype)

	Cache.prototype.$setValues = function(set, addr, data) {
		this.$a[set]=addr
		this.$aR[set].setTxt("a%d", addr)
		this.$d[set]=data
		this.$dR[set].setTxt("%d", data)
	}

	Cache.prototype.$highlight = function(set, flag) {
		let brush=flag ? $g[19] : $g[17]
		this.$stateR[set].setBrush(brush)
		this.$aR[set].setBrush(brush)
		this.$dR[set].setBrush(brush)
	}

	Cache.prototype.$reset = function() {
		this.$cpuabus.$reset()
		this.$cpudbus.$reset()
		for (let i=0; i<NSET; i++) {
			this.$highlight(i, 0)
		}
	}

	Cache.prototype.$resetBus = function() {
		$g[52].$abus.$reset()
		$g[52].$dbus.$reset()
		$g[50].$setColour(GRAY32)
		$g[49].$setColour(GRAY32)
		$g[51].$setColour(GRAY32)
		$g[52].$reset()
		for (let i=0; i<NCPU; i++) {
			$g[55][i].$abus.$reset()
			$g[55][i].$dbus.$reset()
			$g[55][i].$sharedbus.$reset()
		}
		$g[53].setOpacity(0, TICKS, 0)
	}

	function CPU(x, y, _cpuN) {
		VObj.call(this)
		this.$cpuN=_cpuN
		this.$buttonLock=0
		this.$selected
		this.$rb=newArray(NADDR)
		this.$wb=newArray(NADDR)
		this.$r=new Rectangle2($g[0], 0, 0, $g[1], $g[29], x, y, CPUW, CPUH, 0, 0, "CPUXXX%d", this.$cpuN)
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
		this.addEventHandler("eventMB", this, 80)
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
			if ($g[56][i].$selected==0) {
				$g[55][i].$reset()
				$g[56][i].$r.setPen($g[1])
				$g[56][i].$resetButtons()
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
				$g[31]=new SolidPen(0, 3, rgba(0, 0.59999999999999998, 0), ROUND_END)
				$g[32]=new SolidPen(0, 2, GRAY64, 0, ROUND_END)
				$g[33]=new SolidPen(0, 2, rgba(1, 0.65000000000000002, 0), ROUND_END)
				$g[34]=new SolidPen(0, 2, RED, ROUND_END)
				$g[35]=new SolidBrush(rgba(0, 0.56000000000000005, 0.16))
				$g[36]=new Font("Open Sans", 14, 0)
				$g[37]=new Font("Open Sans", 13, 0)
				$g[38]=new Font("Open Sans", 16, 0)
				$g[39]=new Font("Open Sans", 16, SMALLCAPS)
				$g[40]=new Font("Open Sans", 10, ITALIC)
				$g[41]=new Font("Open Sans", 28, 0)
				setBgBrush($g[30])
				$g[42]=new Rectangle2($g[0], 0, 0, 0, $g[35], TITLEX, TITLEY, W/2, TITLEH, $g[2], $g[41], "Xerox Gragon Protocol (LRU)")
				$g[42].setRounded(5, 5)
				$g[42].setTxtOff(0, 2)
				$g[42].setPt(1, $g[42].getTxtW()+16, TITLEH)
				$g[43]="Research work #2\n"
				new Rectangle2($g[0], 0, HLEFT|VCENTRE|JUSTIFY, 0, 0, INFOX, INFOY, INFOW, INFOH, $g[1], $g[38], $g[43])
				new Txt($g[0], 0, HRIGHT|VBOTTOM, W-20, H-10, $g[14], $g[40], timeToString(getLastModifiedMS(), "last modified %e-%b-%y"))
				$g[44]=0
				$g[45]=-1
				$g[46]=0
				$g[47]=-1
				$g[48]=0
				$g[49]=new Bus(10, DBUSY, DBUSW, W-40, GRAY32)
				new Txt($g[0], 0, HLEFT|VTOP, 60, DBUSY-30, $g[3], $g[39], "data bus")
				$g[50]=new Bus(20, ABUSY, ABUSW, W-40, GRAY32)
				new Txt($g[0], 0, HLEFT|VTOP, 70, ABUSY-30, $g[5], $g[39], "address bus")
				$g[51]=new Bus(30, SBUSY, SBUSW, W-40, GRAY32)
				new Txt($g[0], 0, HLEFT|VTOP, 220, SBUSY-25, $g[7], $g[39], "shared")
				$g[52]=new Memory((W-MEMW)/2, MEMY)
				$g[53]=new Rectangle($g[0], 0, 0, $g[1], $g[17], W/2, BUSOPY, 0, 0, 0, 0, 0, $g[38])
				$g[53].setOpacity(0)
				$g[53].setRounded(4, 4)
				$g[54]=new Txt($g[0], 0, HLEFT, 2*W/3, (ABUSY+DBUSY)/2, 0, $g[39], "bus cycles: %d", $g[48])
				$g[55]=newArray(NCPU)
				$g[56]=newArray(NCPU)
				$g[55][0]=new Cache((W-5*CACHEW)/2, CACHEY, 0)
				$g[55][1]=new Cache((W-5*CACHEW)/2+1.3*CACHEW, CACHEY, 1)
				$g[55][2]=new Cache((W-5*CACHEW)/2+2.7000000000000002*CACHEW, CACHEY, 2)
				$g[55][3]=new Cache((W-5*CACHEW)/2+4*CACHEW, CACHEY, 3)
				$g[56][0]=new CPU((W-5*CPUW)/2, CPUY, 0)
				$g[56][1]=new CPU((W-5*CPUW)/2+1.3*CPUW, CPUY, 1)
				$g[56][2]=new CPU((W-5*CPUW)/2+2.7000000000000002*CPUW, CPUY, 2)
				$g[56][3]=new CPU((W-5*CPUW)/2+4*CPUW, CPUY, 3)
				$return(0)
				continue
			case 1:
				$enter(0);	// moveUp
				$obj.$fgArrow.setPt(0, 0, $obj.$l)
				$obj.$fgArrow.setPt(1, 0, $obj.$l)
				$obj.$fgArrow.setPt(1, 0, 0, $stack[$fp-3], 0)
				$obj.$fgArrow.setOpacity(1, $stack[$fp-3]/4, 0)
				$pc = 2
				if ($obj.$bgArrow.setOpacity(0, $stack[$fp-3], $stack[$fp-4])) {
					return
				}
			case 2:
				$return(2)
				continue
			case 3:
				$enter(0);	// moveDown
				$obj.$fgArrow.setPt(0, 0, 0)
				$obj.$fgArrow.setPt(1, 0, 0)
				$obj.$fgArrow.setPt(1, 0, $obj.$l, $stack[$fp-3], 0)
				$obj.$fgArrow.setOpacity(1, $stack[$fp-3]/4, 0)
				$pc = 4
				if ($obj.$bgArrow.setOpacity(0, $stack[$fp-3], $stack[$fp-4])) {
					return
				}
			case 4:
				$return(2)
				continue
			case 5:
				$enter(2);	// flush
				$stack[$fp+1]=$stack[$fp-3]%NSET
				$stack[$fp+2]=$obj.$a[$stack[$fp+1]]
				$call(1, $obj.$abus, TICKS, 0)
				continue
			case 6:
				$call(1, $obj.$dbus, TICKS, 1)
				continue
			case 7:
				$g[50].$setColour(BLUE)
				$g[49].$setColour(RED)
				$call(1, $g[52].$abus, TICKS, 0)
				continue
			case 8:
				$call(1, $g[52].$dbus, TICKS, 1)
				continue
			case 9:
				$obj.$state[$stack[$fp+1]]=INVALID
				$obj.$stateR[$stack[$fp+1]].setTxt("I")
				$g[52].$stale[$stack[$fp+2]]=0
				$g[52].$memR[$stack[$fp+2]].setBrush($g[17])
				$g[52].$mem[$stack[$fp+2]]=$obj.$d[$stack[$fp+1]]
				$g[52].$memR[$stack[$fp+2]].setTxt("address: a%d data: %d", $stack[$fp+2], $g[52].$mem[$stack[$fp+2]])
				$obj.$resetBus()
				$return(1)
				continue
			case 10:
				$enter(2);	// busWatchHelper
				$stack[$fp+1]=$stack[$fp-3]%NSET
				$stack[$fp+2]=($obj.$a[$stack[$fp+1]]==$stack[$fp-3])&&($obj.$state[$stack[$fp+1]]!=INVALID)
				if (!($stack[$fp+2]&&$stack[$fp-4]==0)) {
					$pc = 12
					continue
				}
				$g[46]=1
				if (!($obj.$state[$stack[$fp+1]]==MODIFIED)) {
					$pc = 11
					continue
				}
				$g[45]=$obj.$cpuN
				$pc = 11
			case 11:
				$pc = 12
			case 12:
				$call(3, $obj.$abus, TICKS, 1)
				continue
			case 13:
				if (!($stack[$fp+2]==0)) {
					$pc = 14
					continue
				}
				$return(2)
				continue
			case 14:
				if (!($stack[$fp-4]==0)) {
					$pc = 19
					continue
				}
				if (!(($obj.$state[$stack[$fp+1]]==EXCLUSIVE)||($obj.$state[$stack[$fp+1]]==MODIFIED))) {
					$pc = 17
					continue
				}
				if (!($obj.$state[$stack[$fp+1]]==MODIFIED)) {
					$pc = 16
					continue
				}
				$g[55][$obj.$cpuN].$highlight($stack[$fp+1], 1)
				$call(1, $g[55][$obj.$cpuN].$dbus, TICKS, 0)
				continue
			case 15:
				$pc = 16
			case 16:
				$obj.$state[$stack[$fp+1]]=SHARED
				$obj.$stateR[$stack[$fp+1]].setTxt("S")
				$obj.$highlight($stack[$fp+1], 1)
				$pc = 17
			case 17:
				$call(1, $obj.$sharedbus, TICKS, 1)
				continue
			case 18:
				$g[51].$setColour(MAGENTA)
				$pc = 20
				continue
			case 19:
				$pc = 20
			case 20:
				$return(2)
				continue
			case 21:
				$enter(1);	// busWatch
				$g[45]=-1
				$g[46]=0
				$stack[$fp+1]=0
				$pc = 22
			case 22:
				if (!($stack[$fp+1]<NCPU)) {
					$pc = 25
					continue
				}
				if (!($stack[$fp+1]!=$stack[$fp-4])) {
					$pc = 23
					continue
				}
				fork(10, $g[55][$stack[$fp+1]], $stack[$fp-3], $stack[$fp-5])
				$pc = 23
			case 23:
				$pc = 24
			case 24:
				$stack[$fp+1]++
				$pc = 22
				continue
			case 25:
				if (!($stack[$fp-5]==0)) {
					$pc = 28
					continue
				}
				$pc = 26
				if (wait(2*TICKS)) {
					return
				}
			case 26:
				$call(3, $g[55][$stack[$fp-4]].$sharedbus, TICKS, 0)
				continue
			case 27:
				$pc = 28
			case 28:
				$return(3)
				continue
			case 29:
				$enter(0);	// getBusLock
				if (!($g[47]==$obj.$cpuN)) {
					$pc = 30
					continue
				}
				$return(0)
				continue
			case 30:
				$pc = 31
			case 31:
				if (!($g[47]>=0)) {
					$pc = 33
					continue
				}
				$pc = 32
				if (wait(1)) {
					return
				}
			case 32:
				$pc = 31
				continue
			case 33:
				$g[47]=$obj.$cpuN
				$return(0)
				continue
			case 34:
				$enter(0);	// releaseBusLock
				$g[47]=-1
				$pc = 35
				if (wait(1)) {
					return
				}
			case 35:
				$return(0)
				continue
			case 36:
				$enter(1);	// read
				$g[53].setOpacity(0)
				$stack[$fp+1]=$stack[$fp-3]%NSET
				if (!($stack[$fp-4])) {
					$pc = 38
					continue
				}
				$call(1, $obj.$cpuabus, TICKS, 1)
				continue
			case 37:
				$pc = 38
			case 38:
				if (!(($obj.$a[$stack[$fp+1]]==$stack[$fp-3])&&($obj.$state[$stack[$fp+1]]!=INVALID))) {
					$pc = 41
					continue
				}
				$obj.$highlight($stack[$fp+1], 1)
				if (!($stack[$fp-4])) {
					$pc = 40
					continue
				}
				$call(3, $obj.$cpudbus, TICKS, 1)
				continue
			case 39:
				$pc = 40
			case 40:
				$return(2)
				continue
			case 41:
				$call(29, $obj)
				continue
			case 42:
				$obj.$resetBus()
				showBusOp(sprintf("CPU %d reads a%d from memory", $obj.$cpuN, $stack[$fp-3]))
				$g[48]++
				$g[54].setTxt("bus cycles: %d", $g[48])
				$obj.$highlight($stack[$fp+1], 1)
				$call(1, $obj.$abus, TICKS, 1)
				continue
			case 43:
				$g[50].$setColour(BLUE)
				$call(1, $g[52].$abus, TICKS, 0)
				continue
			case 44:
				fork(21, $obj, $stack[$fp-3], $obj.$cpuN, 0)
				$pc = 45
				if (wait(TICKS)) {
					return
				}
			case 45:
				if (!($g[45]>=0)) {
					$pc = 49
					continue
				}
				$pc = 46
				if (wait(TICKS)) {
					return
				}
			case 46:
				showBusOp(sprintf("CPU %d reads a%d from memory - CPU %d intervenes and supplies data from its cache", $obj.$cpuN, $stack[$fp-3], $g[45]))
				$g[49].$setColour(RED)
				$call(1, $g[52].$dbus, TICKS, 0)
				continue
			case 47:
				$call(3, $obj.$dbus, TICKS, 1)
				continue
			case 48:
				$g[52].$mem[$stack[$fp-3]]=$g[55][$g[45]].$d[$stack[$fp+1]]
				$g[52].$stale[$stack[$fp-3]]=0
				$g[52].$memR[$stack[$fp-3]].setBrush($g[17])
				$g[52].$memR[$stack[$fp-3]].setTxt("address: a%d data: %d", $stack[$fp-3], $g[52].$mem[$stack[$fp-3]])
				$g[52].$highlight($stack[$fp-3], 1)
				$pc = 52
				continue
			case 49:
				$g[52].$highlight($stack[$fp-3], 1)
				$call(3, $g[52].$dbus, TICKS, 1)
				continue
			case 50:
				$g[49].$setColour(RED)
				$call(3, $obj.$dbus, TICKS, 1)
				continue
			case 51:
				$pc = 52
			case 52:
				$obj.$a[$stack[$fp+1]]=$stack[$fp-3]
				$obj.$aR[$stack[$fp+1]].setTxt("a%d", $stack[$fp-3])
				$obj.$d[$stack[$fp+1]]=$g[52].$mem[$stack[$fp-3]]
				$obj.$dR[$stack[$fp+1]].setTxt("%d", $obj.$d[$stack[$fp+1]])
				$obj.$state[$stack[$fp+1]]=$g[46] ? SHARED : EXCLUSIVE
				$obj.$stateR[$stack[$fp+1]].setTxt($g[46] ? "S" : "E")
				$call(34, $obj)
				continue
			case 53:
				if (!($stack[$fp-4])) {
					$pc = 55
					continue
				}
				$call(3, $obj.$cpudbus, TICKS, 1)
				continue
			case 54:
				$pc = 55
			case 55:
				$return(2)
				continue
			case 56:
				$enter(1);	// write
				$g[53].setOpacity(0)
				$stack[$fp+1]=$stack[$fp-3]%NSET
				$call(1, $obj.$cpudbus, TICKS, 0)
				continue
			case 57:
				$call(1, $obj.$cpuabus, TICKS, 1)
				continue
			case 58:
				$obj.$highlight($stack[$fp+1], 1)
				$g[44]++
				if (!(($obj.$a[$stack[$fp+1]]==$stack[$fp-3])&&(($obj.$state[$stack[$fp+1]]==EXCLUSIVE)||($obj.$state[$stack[$fp+1]]==MODIFIED)))) {
					$pc = 59
					continue
				}
				$obj.$setValues($stack[$fp+1], $stack[$fp-3], $g[44])
				$obj.$state[$stack[$fp+1]]=MODIFIED
				$obj.$stateR[$stack[$fp+1]].setTxt("M")
				$g[52].$stale[$stack[$fp-3]]=1
				$g[52].$memR[$stack[$fp-3]].setBrush($g[29])
				$return(1)
				continue
			case 59:
				$pc = 60
			case 60:
				if (!(1)) {
					$pc = 73
					continue
				}
				if (!(($obj.$state[$stack[$fp+1]]==INVALID)||($obj.$a[$stack[$fp+1]]!=$stack[$fp-3]))) {
					$pc = 62
					continue
				}
				$call(36, $obj, $stack[$fp-3], 0)
				continue
			case 61:
				$pc = 62
			case 62:
				if (!($obj.$state[$stack[$fp+1]]==SHARED)) {
					$pc = 70
					continue
				}
				$call(29, $obj)
				continue
			case 63:
				if (!($obj.$state[$stack[$fp+1]]==INVALID)) {
					$pc = 64
					continue
				}
				$pc = 60
				continue
			case 64:
				$obj.$resetBus()
				showBusOp(sprintf("CPU %d writes %d to a%d in memory", $obj.$cpuN, $g[44], $stack[$fp-3]))
				$g[48]++
				$g[54].setTxt("bus cycles: %d", $g[48])
				$obj.$setValues($stack[$fp+1], $stack[$fp-3], $g[44])
				$call(1, $obj.$abus, TICKS, 0)
				continue
			case 65:
				$call(1, $obj.$dbus, TICKS, 1)
				continue
			case 66:
				$g[50].$setColour(BLUE)
				$g[49].$setColour(RED)
				$call(1, $g[52].$abus, TICKS, 0)
				continue
			case 67:
				$call(1, $g[52].$dbus, TICKS, 0)
				continue
			case 68:
				fork(21, $obj, $stack[$fp-3], $obj.$cpuN, 1)
				$obj.$state[$stack[$fp+1]]=EXCLUSIVE
				$obj.$stateR[$stack[$fp+1]].setTxt("E")
				$g[52].$mem[$stack[$fp-3]]=$obj.$d[$stack[$fp+1]]
				$g[52].$memR[$stack[$fp-3]].setTxt("address: a%d data: %d", $stack[$fp-3], $g[52].$mem[$stack[$fp-3]])
				$g[52].$highlight($stack[$fp-3], 1)
				$call(34, $obj)
				continue
			case 69:
				$pc = 73
				continue
			case 70:
				if (!(($obj.$state[$stack[$fp+1]]==EXCLUSIVE)||($obj.$state[$stack[$fp+1]]==MODIFIED))) {
					$pc = 71
					continue
				}
				$obj.$setValues($stack[$fp+1], $stack[$fp-3], $g[44])
				$obj.$state[$stack[$fp+1]]=MODIFIED
				$obj.$stateR[$stack[$fp+1]].setTxt("M")
				$g[52].$stale[$stack[$fp-3]]=1
				$g[52].$memR[$stack[$fp-3]].setBrush($g[29])
				$g[53].setOpacity(0)
				$pc = 73
				continue
			case 71:
				$pc = 72
			case 72:
				$pc = 60
				continue
			case 73:
				$return(1)
				continue
			case 74:
				$enter(0);	// cpuButtonAction
				$obj.$resetCPUs($obj.parent.$cpuN)
				if (!($g[47]==-1)) {
					$pc = 75
					continue
				}
				$g[55][$obj.parent.$cpuN].$resetBus()
				$pc = 75
			case 75:
				$obj.parent.$buttonLock=1
				$g[55][$obj.parent.$cpuN].$reset()
				$obj.parent.$r.setPen($g[31])
				$obj.setPen($g[34])
				if (!($obj.$rw)) {
					$pc = 77
					continue
				}
				$call(56, $g[55][$obj.parent.$cpuN], $obj.$addr)
				continue
			case 76:
				$pc = 79
				continue
			case 77:
				$call(36, $g[55][$obj.parent.$cpuN], $obj.$addr, 1)
				continue
			case 78:
				$pc = 79
			case 79:
				$obj.$resetCPUs($obj.parent.$cpuN)
				$obj.parent.$selected=0
				checkPoint()
				$obj.parent.$buttonLock=0
				$return(0)
				continue
			case 80:
				$enter(2);	// $eh2
				$stack[$fp+1]=0
				if (!($stack[$fp-3]&&($stack[$fp-4]&MB_LEFT))) {
					$pc = 88
					continue
				}
				$stack[$fp+1]|=REMEMBER
				if (!($obj.parent.$buttonLock)) {
					$pc = 81
					continue
				}
				$acc = $stack[$fp+1]
				$return(4)
				continue
			case 81:
				$stack[$fp+2]=0
				$pc = 82
			case 82:
				if (!($stack[$fp+2]<NCPU)) {
					$pc = 84
					continue
				}
				$g[56][$stack[$fp+2]].$resetButtons()
				$pc = 83
			case 83:
				$stack[$fp+2]++
				$pc = 82
				continue
			case 84:
				if (!($stack[$fp-4]&MB_CTRL)) {
					$pc = 85
					continue
				}
				$obj.$select()
				$pc = 87
				continue
			case 85:
				$obj.parent.$selected=$obj
				$call(92, $obj)
				continue
			case 86:
				$pc = 87
			case 87:
				$pc = 88
			case 88:
				$acc = $stack[$fp+1]
				$return(4)
				continue
			case 89:
				$enter(0);	// cpuAction
				if (!($obj.$selected&&$obj.$buttonLock==0)) {
					$pc = 91
					continue
				}
				$call(74, $obj.$selected)
				continue
			case 90:
				$pc = 91
			case 91:
				$return(0)
				continue
			case 92:
				$enter(1);	// startTransactions
				start()
				$stack[$fp+1]=0
				$pc = 93
			case 93:
				if (!($stack[$fp+1]<NCPU)) {
					$pc = 95
					continue
				}
				fork(89, $g[56][$stack[$fp+1]])
				$pc = 94
			case 94:
				$stack[$fp+1]++
				$pc = 93
				continue
			case 95:
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
