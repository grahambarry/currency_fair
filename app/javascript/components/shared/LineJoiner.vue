<template>
  <div>
    <a href="" @click.prevent="handleScroll">
      LineJoiner
    </a>
    <div ref="scrollyg" id="scrollyg" style="height:2000px">
      <div ref="leftId" id="leftId" style="background-color:blue;height:50px;width:50px;">
      </div>
      <div ref="rightId" id="rightId" style="position:absolute;top:100%;margin-left:300px;background-color:red;height:50px;width:50px;">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LineJoiner',
  data() {
    return {
      markerInitialized: false,
      nodeOne: null,
      nodeTwo: null,
      elmnt: null,
      x1: null,
      path: null,
    }
  },
  mounted() {
    this.nodeOne = this.$refs.leftId
    this.nodeTwo = this.$refs.rightId
    this.elmnt = this.$refs.scrollyg
    this.$nextTick(() => {
      this.connectDivs(this.nodeOne, this.nodeTwo, 'green', 0.5)
		})
  },
  methods: {
    handleScroll: function() {
      console.log('123')
      this.connectDivs(this.nodeOne, this.nodeTwo, 'green', 0.5)
    },
    createSVG: function() {
      let svg = document.getElementById("svg-canvas")
      if (null == svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute('id', 'svg-canvas')
        svg.setAttribute('style', 'pointer-events:none;position:absolute; top:0px; left:0px')
        svg.setAttribute('width', document.body.clientWidth)
        svg.setAttribute('height', document.body.clientHeight)
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
        document.body.appendChild(svg)
      }
      return svg
    },
    drawCircle: function(x, y, radius, color) {
      let svg = this.createSVG()
      const shape = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      shape.setAttributeNS(null, "cx", x)
      shape.setAttributeNS(null, "cy", y)
      shape.setAttributeNS(null, "r",  radius)
      shape.setAttributeNS(null, "fill", color)
      svg.appendChild(shape)
    },
    findAbsolutePosition: function(htmlElement) {
      let x = htmlElement.offsetLeft
      let y = htmlElement.offsetTop
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
      console.log('Called')
      let scrollx = this.elmnt.scrollLeft
      let scrolly = this.elmnt.scrollTop

      let leftPos = this.findAbsolutePosition(leftId)
      this.x1 = leftPos.x
      let y1 = leftPos.y
      this.x1 += leftId.offsetWidth
      y1 += (leftId.offsetHeight / 2)

      let rightPos = this.findAbsolutePosition(rightId)
      let x2 = rightPos.x
      let y2 = rightPos.y - scrolly
      x2 += (rightId.offsetWidth / 2)
      y2 += (rightId.offsetHeight / 2)

      this.drawCircle(this.x1, y1, 3, color)
      this.drawCircle(x2, y2, 3, color)
      this.createTriangleMarker(color)
      this.drawCurvedLine(y1, x2, y2, color, tension)
    },
    drawCurvedLine: function(y1, x2, y2, color, tension) {
      let svg = this.createSVG()
      let shape = document.createElementNS("http://www.w3.org/2000/svg", "path")
      if (tension < 0) {
          let delta = (y2 - y1) * tension
          let hx1 = this.x1
          let hy1 = y1-delta
          let hx2 = x2
          let hy2 = y2+delta
          this.path = "M " + this.x1 + " " + y1 +  " C " + hx1 + " " + hy1 + " " + hx2 + " " + hy2 + " " + x2 + " " + y2;
      } else {
          let delta = (x2 - this.x1) * tension
          let hx1 = this.x1+delta
          let hy1=y1
          let hx2=x2-delta
          let hy2=y2
          this.path = "M " + this.x1 + " " + y1 + 
                 " C " + hx1 + " " + hy1 + " "  
                 + hx2 + " " + hy2 + " " 
                 + x2 + " " + y2;
      }
      shape.setAttributeNS(null, "d", this.path)
      shape.setAttributeNS(null, "fill", "none")
      shape.setAttributeNS(null, "stroke", color)
      shape.setAttributeNS(null, "stroke-width", "5")
      shape.setAttributeNS(null, "marker-start", "url(#trianglebackwards)")
      shape.setAttributeNS(null, "marker-end", "url(#triangle)")
      svg.appendChild(shape)
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
