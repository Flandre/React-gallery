require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//  获取图片相关数据
let imageDatas = require('../data/imageDatas.json');
let reactDOM = require('react-dom');

//  将图片名信息转换成URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

/*
 *  获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

/*
 *  获取 0~30° 之间任意一个正负值
 */
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

var ImgFigure = React.createClass({
  /*
   *  imgFigure的点击处理函数
   */
  handleClick: function (e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center()
    }
    e.stopPropagation();
    e.preventDefault();
  },

  render: function () {
    var styleObj = {};
    //  如果 props 属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    //  中心图片层级调整
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    //  如果图片旋转角度有值并且不为0，添加旋转角度
    if (this.props.arrange.rotate) {
      (['-webkit-', '-moz-', '-ms-', '-o-', '']).forEach(function (value) {
        styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)'
      }.bind(this));
    }
    var imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>{this.props.data.desc}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
});

//  控制组件
var ControllerUnit = React.createClass({
  handleClick: function(e){
    //  如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应图片居中
    if(this.props.arrange.isCenter){
      this.props.inverse()
    }else{
      this.props.center()
    }
    e.preventDefault();
    e.stopPropagation();
  },
  render: function () {
    var controllerUnitClassName = 'controller-unit';
    //  如果对应居中图片，显示控制按钮的居中态
    if(this.props.arrange.isCenter){
      controllerUnitClassName += ' is-center';
      //  如果同时对应的是翻转图片，对应按钮的翻转态
      if(this.props.arrange.isInverse){
        controllerUnitClassName += ' is-inverse'
      }
    }
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    );
  }
});

var AppComponent = React.createClass({

  Constant: {
    centerPos: {
      left: 0,
      top: 0
    },
    hPosRange: { // 水平方向取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: { //  垂直方向取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  },

  /*
   *  翻转图片
   *  @prarm index  输入当前被执行 inverse 操作的图片对应图片信息数组的 index 值
   *  @return {function}  这是一个闭包函数，期内 return 一个真正待被执行的函数
   */

  inverse: function (index) {
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }.bind(this)
  },

  /*
   *  重新布局所有图片
   *  @param centerIndex 指定居中排布哪个图片
   */
  rearrange: function (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeTopArr = [],
    //取一个以下图片放在顶部
      topImgNum = Math.floor(Math.random() * 2),
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    imgsArrangeCenterArr[0] = {
      //  居中 centerIndex 的图片
      pos: centerPos,
      //  居中 centerIndex 图片不需要旋转
      rotate: 0,
      isCenter: true
    };

    //  取出要布局上侧图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    //  布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    });

    //  布局位于左右两侧的图片
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null;
      //  前半部分在左边布局，后半部分在右边布局
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  },


  /*
   *  利用rearrange函数，居中对应index图片
   *  @param index，需要被居中的图片对应的图片信息数组的index值
   *  @return {Function}
   */
  center: function (index) {
    return function () {
      this.rearrange(index);
    }.bind(this);
  },

  getInitialState: function () {
    return {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: '0',
        //     top: '0'
        //   },
        //   rotate: 0, //  旋转角度
        //   isInverse: false //  设置正反面
        //   isCenter: false  //  图片是否居中
        // }
      ]
    };
  },

  // 组件加载以后，为每张图片计算位置
  componentDidMount: function () {
    //  取得舞台大小
    var stageDOM = reactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    //  拿到一个imageFigure的大小
    var imageFigureDOM = reactDOM.findDOMNode(this.refs.imageFigure0),
      imgW = imageFigureDOM.scrollWidth,
      imgH = imageFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    //  计算中心位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    //  计算左侧右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //  计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0)

  },

  render: function () {

    var controllerUnits = [],
      imgFigures = [];
    //  初始化状态
    imageDatas.forEach(function (value, index) {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: '0',
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imageFigure' + index} arrange={this.state.imgsArrangeArr[index]}
                                 inverse={this.inverse(index)} center={this.center(index)}/>);
      controllerUnits.push(<ControllerUnit arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>)
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
});

AppComponent.defaultProps = {};

export default AppComponent;
