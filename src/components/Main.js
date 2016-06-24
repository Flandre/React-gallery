require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//  获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

//  将图片名信息转换成URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

var ImgFigure = React.createClass({
  render: function () {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
});

var AppComponent = React.createClass({

  Constant: {
    centerPos: {
      left: 0,
      right: 0
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

  render: function () {

    var controllerUnits = [],
      imgFigures = [];

    imageDatas.forEach(function (value) {
      imgFigures.push(<ImgFigure data={value}/>);
    });

    return (
      <section className="stage">
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
