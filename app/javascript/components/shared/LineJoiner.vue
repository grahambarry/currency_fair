<template>
  <div ref="scrollyg" :class="`parallax__group ${layer}`" :style="{width: widthPanel, height: bgHeight + 'vh'}">
    <div :class="`parallax__layer parallax__layer--fore ${foreModClass}`" :style="`${foreMod}`">
      <div v-if="isAnnotated" ref="annotationRef" class="annotation_panel" :style="annotateStyles">
        <h1 :style="{color: h1Color}">{{ heading }}</h1>
        <h2 :style="{color: h2Color}">{{ subheading }}</h2>
        <p :style="{color: pColor}">{{ paragraph }}</p>
      </div>
    </div>
    <div :id="`plxgroup-${this.sectionId}`" :class="`parallax__layer parallax__layer--${layer} ${bgMod}`" :style="bgStyles">
      <PictureSrcSet :images="images" 
                      ref="imageRef"
                      class="image"
                      :style="imageStyles"/>
    </div>
  </div>
</template>
<script>
import PictureSrcSet from "~components/shared/PictureSrcSet"
export default {
  components: {
    PictureSrcSet
  },
  name: 'LineJoiner',
  props: {
    sectionId: {
      type: String,
      default: ''
    },
    sectionHeight: {
      type: String,
      default: '170'
    },
    image: {
      type: String,
      required: false,
      default: ''
    },
    imageTop: {
      type: String,
      default: '14%'
    },
    imageBottom: {
      type: String,
      default: 'unset'
    },
    imageLeft: {
      type: String,
      default: 'unset'
    },
    imageRight: {
      type: String,
      default: 'unset'
    },
    imageWidth: {
      type: String,
      default: '52vw'
    },
    layer: {
      type: String,
      default: 'deep',
    },
    annotateColor: {
      type: String,
      required: false
    },
    arrowColor: {
      type: String,
      required: false
    },
    bodyColor: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: false
    },
    subheading: {
      type: String,
      required: false
    },
    paragraph: {
      type: String,
      required: false
    },
    h1Color: {
      type: String,
      required: true
    },
    h2Color: {
      type: String,
      required: true
    },
    pColor: {
      type: String,
      required: true
    },
    faded: {
      type: Boolean,
      default: false
    },
    annTop: {
      type: String,
      default: '51'
    },
    annBottom: {
      type: String,
      default: ''
    },
    annLeft: {
      type: String,
      default: ''
    },
    annRight: {
      type: String,
      default: ''
    },
    linePos: {
      type: String,
      default: 'left'
    },
    xArrow: {
      type: String,
      default: '1',
    },
    yArrow: {
      type: String,
      default: '1',
    },
    yImage: {
      type: String,
      default: '0',
    },
    xImage: {
      type: String,
      default: '0',
    },
    images: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
      default: '100',
    },
    slackness: {
      type: String,
      default: '0.5',
    },
    arrowIsOn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      markerInitialized: false,
      shape: null,
      strokeWidth: 5,
      nodeImage: null,
      nodeAnnotatePanel: null,
      elmnt: null,
      path: null,
      parallaxScroller: null,
      parallaxH: null
    }
  },
  computed: {
    isAnnotated: function() {
      if (this.heading || this.subheading || this.paragraph) {
        return true
      }
      else {
        return false
      }
    },
    annotateStyles: function () {
      let styleAnnotation = {
        backgroundColor: this.annotateColor,
        top: this.annTop + 'px',
        bottom: this.annBottom + 'px',
        right: this.annRight + 'px',
        left: this.annLeft + 'px'
      }
      return styleAnnotation
    },
    imageStyles: function () {
      let imageStyle = {
        transform: `translate(${this.xImage}, ${this.yImage})`,
        width: this.imageWidth,
        top: this.imageTop,
        bottom: this.imageBottom,
        right: this.imageRight,
        left: this.imageLeft,
      }
      return imageStyle
    },
    arrowStyles: function () {
      let arrow = this.arrowColor ? this.arrowColor : this.annotateColor
      return arrow
    },
    bgMod: function () {
      if (this.width !== '100') {
        return `${this.layer}-mod`
      } 
      else {
        return ''
      }
    },
    foreMod: function () {
      let origin = (100 / this.width) * 100
      if (this.width !== '100' && (this.layer === 'back' || this.layer === 'deep') ) {
        return `-webkit-transform-origin-x: ${origin}%; transform-origin-x: ${origin}%;`
      } 
      else {
        return ''
      }
    },
    foreModClass: function () {
      if (this.width !== '100') {
        return `fore-mod`
      } 
      else {
        return ''
      }
    },
    widthPanel: function () {
      return this.width + '%'
    },
    bgStyles: function () {
      if (this.faded) {
        return `box-shadow: 0px -26px 150px 90px ${this.bodyColor};
                backgroundColor: ${this.bodyColor}`
      } 
      else {
        return `box-shadow: none;
                backgroundColor: ${this.bodyColor}`
      }
    },
    bgHeight: function () {
      return this.faded ? + this.sectionHeight + + 90 : this.sectionHeight
    }
  },
  mounted() {
    this.elmnt = this.$refs.scrollyg
    this.nodeAnnotatePanel = this.$refs.annotationRef
    this.nodeImage = this.$refs.imageRef.$refs.root
    this.parallaxScroller = document.getElementById("parallaxid")
    if (this.isAnnotated) {
      setTimeout(() => this.initIntersect(this.nodeAnnotatePanel), 50)
      if (this.arrowIsOn) {
        setTimeout(() => this.handleScroll(), 40)
        this.$nextTick(() => {
          this.parallaxScroller.addEventListener('scroll', this.handleScroll)
          window.addEventListener('resize', this.handleScroll) 
        })
      }
    }
  },
  destroyed () {
    this.parallaxScroller.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll) 
  },
  methods: {
    initIntersect: function (el) {
      window.addEventListener('load',
        this.createObserver(el),
      )
    },
    createObserver: function (boxElement) {
      let observer;

      let options = {
        root: null,
        rootMargin: "-140px 0px -90px 0px",
        threshold: this.buildThresholdList()
      };

      observer = new IntersectionObserver(this.handleIntersect, options);
      observer.observe(boxElement);
    },
    buildThresholdList: function () {
      let thresholds = [];
      let numSteps = 100;

      for (let i=1.0; i<=numSteps; i++) {
        let ratio = i/numSteps;
        thresholds.push(ratio);
      }
      thresholds.push(0);
      return thresholds;
    },
    handleIntersect: function (entries, observer) {
      entries.forEach((entry) => {
        entry.target.style.opacity = entry.intersectionRatio
        this.shape.style.opacity = entry.intersectionRatio
      });
    },
    handleScroll: function() {
      if (window.innerWidth > 1000) {
        this.$nextTick(() => {
          this.connectDivs(this.nodeAnnotatePanel, this.nodeImage, this.arrowStyles, this.slackness)
        })
      }
    },
    createSVG: function() {
      let svg = document.getElementById("svg-canvas")
      if (null == svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute('id', 'svg-canvas')
        svg.setAttribute('style', 'pointer-events:none;position:absolute; top:0px; left:0px')
        svg.setAttribute('width', document.body.clientWidth)
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
      let x = htmlElement.getBoundingClientRect().left
      let y = htmlElement.getBoundingClientRect().top
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
    linePosition: function(el) {
      let x = 0
      let y = 0
      switch (this.linePos) {
        case 'top': x = el.getBoundingClientRect().width / 2, y = this.strokeWidth
        break
        case 'right': x = el.getBoundingClientRect().width, y = el.getBoundingClientRect().height / 2
        break
        case 'left': x = 0, y = el.getBoundingClientRect().height / 2
        break
        case 'bottom': x = el.getBoundingClientRect().width / 2, y = el.getBoundingClientRect().height - this.strokeWidth
        break
        case 'center': x = el.getBoundingClientRect().width / 2, y = el.getBoundingClientRect().height / 2
        break
      }
      return {
        "x": x,
        "y": y
      }
    },
    connectDivs: function(nodeA, nodeImage, color, tension) {
      this.parallaxH = this.parallaxScroller.getBoundingClientRect().height
      let scrollx = this.elmnt.scrollLeft
      let scrolly = this.elmnt.scrollTop

      let annotatePos = this.findAbsolutePosition(nodeA)
      let x1 = annotatePos.x
      let y1 = annotatePos.y
      let linePos = this.linePosition(nodeA)
      y1 += linePos.y
      x1 += linePos.x
      const imagePos = this.findAbsolutePosition(nodeImage)
      let x2 = imagePos.x
      let y2 = imagePos.y - scrolly
      let imageWidth = nodeImage.getBoundingClientRect().width
      let imageHeight = nodeImage.getBoundingClientRect().height
      x2 += (imageWidth / 2) * this.xArrow
      y2 += (imageHeight / 2) * this.yArrow
      // this.drawCircle(x1, y1, this.strokeWidth / 2, color)
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
      this.shape.setAttributeNS(null, "marker-end", `url(#triangle-${this.sectionId})`)

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
      marker.setAttribute('id', `triangle-${this.sectionId}`)
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
<style lang="scss" scoped>
  @import 'app/assets/stylesheets/design_vars';

  .annotation_panel {
    position: absolute;
    border-radius: 19px;
    padding: 12px 19px 13px 19px;
    width: 368px;
    font-weight: 400;
    h1, h2, p {
      font-family: $font-family-1;
      margin: 0px;
      padding: 0px;
    }
    h1 {
      font-size: 30px;
      line-height: 37px;
    }
    h2 {
      font-size: 24px;
      line-height: 30px;
    }
    p {
      font-size: 15px;
      line-height: 19px; 
    }
  }
  .parallax__group {
    position: relative;
    width: 100%;
  }
  .parallax__layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .parallax__layer--base {
    z-index: 4;
  }
  .parallax__layer--back {
    z-index: 3;
  }
  .parallax__layer--deep {
    z-index: 2;
  }
  .parallax__layer--fore {
    z-index: 1;
  }
  .parallax__group {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .parallax__layer {
    -webkit-transform-origin-x: 100%;
    transform-origin-x: 100%;
  }
  .parallax__layer--base {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  .parallax__layer--back {
    -webkit-transform: translateZ(-300px) scale(2);
    transform: translateZ(-300px) scale(2);
  }
  .parallax__layer--deep {
    -webkit-transform: translateZ(-600px) scale(3);
    transform: translateZ(-600px) scale(3);
  }
  .parallax__layer--fore {
    -webkit-transform: translateZ(90px) scale(.7);
    transform: translateZ(90px) scale(.7);
  }
  .fore-mod {
    .annotation_panel {
      -webkit-transform: translateZ(10px) scale(0.7);
      transform: translateZ(10px) scale(0.7);
      -webkit-transform-origin-x: 100%;
      transform-origin-x: 100%;
    }
  }
  .back-mod {
    -webkit-transform: translateY(30%) translateZ(-100px) scale(2);
    transform: translateY(30%) translateZ(-100px) scale(2);
  }
  .deep-mod {
    -webkit-transform: translateZ(-200px) scale(3);
    transform: translateZ(-200px) scale(3);
  }
  /* Parallax Styles Media Query */
  // @media screen and (min-width: 1000px) {
  //   @supports ((perspective: 1px) and (not (-webkit-overflow-scrolling: touch))) {
  //     .parallax__layer--base {
  //       -webkit-transform: translateZ(0);
  //       transform: translateZ(0);
  //     }
  //     .parallax__layer--back {
  //       -webkit-transform: translateZ(-300px) scale(2);
  //       transform: translateZ(-300px) scale(2);
  //     }
  //     .parallax__layer--deep {
  //       -webkit-transform: translateZ(-600px) scale(3);
  //       transform: translateZ(-600px) scale(3);
  //     }
  //     .parallax__layer--fore {
  //       -webkit-transform: translateZ(90px) scale(.7);
  //       transform: translateZ(90px) scale(.7);
  //     }
  //   }
  @media screen and (max-width: $breakpoint-small) {
    .parallax__group {
      width: 100% !important;
      height: 100vh !important;
    }
    .deep {
      height: 190vh !important;
    }
  }
</style>
