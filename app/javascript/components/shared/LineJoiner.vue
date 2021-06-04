<template>
  <div>
    <div ref="scrollyg" id="scrollyg" class="parallax__group">
      <div class="parallax__layer parallax__layer--back">
        <div ref="leftId" id="leftId" class="nodes" style="background-color:blue">
        </div>
      </div>
      <div class="parallax__layer parallax__layer--base">
        <div ref="rightId" id="rightId" class="nodes" style="margin-left:500px;background-color:red">
        </div>
        <div class="nodes" style="margin-top:1200px;background-color:red;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LineJoiner',
  props: {
    sectionId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      sectionId: '',
      markerInitialized: false,
      shape: null,
      strokeWidth: 5,
      nodeOne: null,
      nodeTwo: null,
      elmnt: null,
      path: null,
      flipped: false,
      parallaxScroller: null,
      parallaxH: null,
    }
  },
  mounted() {
    this.nodeOne = this.$refs.leftId
    this.nodeTwo = this.$refs.rightId
    this.elmnt = this.$refs.scrollyg
    this.parallaxScroller = document.getElementById("parallaxid")
    console.log(this.parallaxH + ' this.parallaxH')
    this.$nextTick(() => {
      this.connectDivs(this.nodeOne, this.nodeTwo, 'green', 0.5)
      this.parallaxScroller.addEventListener('scroll', this.handleScroll)
		})
  },
  methods: {
    handleScroll: function() {
      this.strokeWidth = 10
      this.connectDivs(this.nodeOne, this.nodeTwo, 'green', 0.5)
    },
    createSVG: function() {
      let svg = document.getElementById("svg-canvas")
      console.log('svg' + svg)
      if (null == svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute('id', 'svg-canvas')
        svg.setAttribute('style', 'pointer-events:none;position:absolute; top:0px; left:0px')
        svg.setAttribute('width', document.body.clientWidth)
        console.log(this.parallaxH + ' this.parallaxH')
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
        document.body.appendChild(svg)
      }
      svg.setAttribute('height', this.parallaxH)
      return svg
    },
    drawCircle: function(x, y, radius, color) {
      let svg = this.createSVG()
      let shape = document.getElementById(`circle-${this.sectionId}`)
      if (null == shape) {
        shape = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        shape.setAttribute("id", `circle-${this.sectionId}`)
        svg.appendChild(shape)
      }
      shape.setAttributeNS(null, "cx", x)
      shape.setAttributeNS(null, "cy", y)
      shape.setAttributeNS(null, "r",  radius)
      shape.setAttributeNS(null, "fill", color)
      return shape
    },
    findAbsolutePosition: function(htmlElement) {
      let x = htmlElement.offsetLeft
      console.log('x' + x)
      let y = htmlElement.getBoundingClientRect().top

      console.log('y' + y)
      console.log('bounding ' + htmlElement.getBoundingClientRect().top)
      for (let x = 0, y = 0, el=htmlElement; 
        el != null; 
        el = el.offsetParent) {
          x += el.offsetLeft;
          y += el.offsetTop;
      }
      return {
        "x": x,
        "y": y
      }
    },
    connectDivs: function(leftId, rightId, color, tension) {
      this.parallaxH = this.parallaxScroller.getBoundingClientRect().height
      console.log('triggered')
      console.log(this.parallaxH + ' this.parallaxH')
      let scrollx = this.elmnt.scrollLeft
      let scrolly = this.elmnt.scrollTop

      let leftPos = this.findAbsolutePosition(leftId)
      let x1 = leftPos.x
      console.log(x1 + 'x1')
      let y1 = leftPos.y
      console.log(y1 + 'y1')
      x1 += leftId.offsetWidth
      y1 += (leftId.offsetHeight / 2)

      let rightPos = this.findAbsolutePosition(rightId)
      let x2 = rightPos.x
      let y2 = rightPos.y - scrolly
      x2 += (rightId.offsetWidth / 2)
      y2 += (rightId.offsetHeight / 2)
      this.flipped ? this.drawCircle(x2, y2, 3, color) : this.drawCircle(x1, y1, 3, color)
      this.createTriangleMarker(color)
      this.drawCurvedLine(x1, y1, x2, y2, color, tension)
    },
    drawCurvedLine: function(x1, y1, x2, y2, color, tension) {
      let svg = this.createSVG()
      this.shape = document.getElementById(`path-${this.sectionId}`)
      if (null == this.shape) {
        this.shape = document.createElementNS("http://www.w3.org/2000/svg", "path")
        this.shape.setAttribute("id", `path-${this.sectionId}`)
        svg.appendChild(this.shape)
      }
      if (tension < 0) {
          let delta = (y2 - y1) * tension
          let hx1 = x1
          let hy1 = y1-delta
          let hx2 = x2
          let hy2 = y2+delta
          this.path = "M " + x1 + " " + y1 +  " C " + hx1 + " " + hy1 + " " + hx2 + " " + hy2 + " " + x2 + " " + y2;
      } else {
          let delta = (x2 - x1) * tension
          let hx1 = x1 + delta
          let hy1=y1
          let hx2=x2-delta
          let hy2=y2
          this.path = "M " + x1 + " " + y1 + 
                " C " + hx1 + " " + hy1 + " "  
                + hx2 + " " + hy2 + " " 
                + x2 + " " + y2;
      }
      this.shape.setAttributeNS(null, "d", this.path)
      this.shape.setAttributeNS(null, "fill", "none")
      this.shape.setAttributeNS(null, "stroke", color)
      this.shape.setAttributeNS(null, "stroke-width", this.strokeWidth)
      this.shape.setAttributeNS(null, "marker-start", "url(#trianglebackwards)")
      this.shape.setAttributeNS(null, "marker-end", "url(#triangle)")

      return this.shape
    },
    createTriangleMarker: function(color) {
      if (this.markerInitialized)
        return
      this.markerInitialized = true
      let svg = this.createSVG()
      let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      svg.appendChild(defs)

      let marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker')
      marker.setAttribute('id', 'triangle')
      marker.setAttribute('viewBox', '0 0 10 10')
      marker.setAttribute('refX', '0')
      marker.setAttribute('refY', '5')
      marker.setAttribute('markerUnits', 'strokeWidth')
      marker.setAttribute('markerWidth', '5')
      marker.setAttribute('markerHeight', '4')
      marker.setAttribute('orient', 'auto')
      marker.setAttributeNS(null, "fill", color)
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      marker.appendChild(path)
      path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z')
      defs.appendChild(marker)   
    }
  }
}
</script>
<style scoped>
  /* Parallax Styles Media Query */
  @media screen and (min-width: 1000px) {
    @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
      .nodes{
        height:50px;
        width:50px;
      }
      .parallax__layer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        -webkit-transform-origin-x: 100%;
        transform-origin-x: 100%;
      }
      .parallax__layer--base {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        z-index: 4;
      }
      .parallax__layer--back {
        -webkit-transform: translateZ(-300px) scale(2);
        transform: translateZ(-300px) scale(2);
        z-index: 3;
      }
      .parallax__layer--deep {
        -webkit-transform: translateZ(-600px) scale(3);
        transform: translateZ(-600px) scale(3);
        z-index: 2;
      }
      .parallax__layer--fore {
        -webkit-transform: translateZ(90px) scale(.7);
        transform: translateZ(90px) scale(.7);
        z-index: 1;
      }
      .parallax__group {
        position: relative;
        height: 100vh;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
      }
    }
  }
</style>
