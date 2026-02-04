# vue2-zoom-image

[在线操作示例](https://IVANLEE99.github.io/vue2-zoom-image/)

![left](./img/left.png)
![right](./img/right.png)

## 1、安装

```
npm install vue2-zoom-image
```

## 2、导入

```
import ZoomImage from 'vue2-zoom-image'
```

## 3、注册

```
components: {
    ZoomImage
},
```

## 4、使用

```
<ZoomImage image-url="https://avatars.githubusercontent.com/u/18308725?v=4"></ZoomImage>

<div style="position: relative; right: -50%">
    <ZoomImage image-url="https://avatars.githubusercontent.com/u/18308725?v=4" position="left"></ZoomImage>
</div>
```

## 5、参数

| 参数 | 说明 | 类型 | 默认值 |备注 |
| --- | --- | --- | --- |---|
| width | 原图box宽度 | String | 50% | - |
| imageUrl | 图片地址 | String | - | - |
| position | 图片位置 | String | right | left:左侧显示，right:右侧显示 |
| zoomGap | 放大镜与原图间隔 | Number | 8 | 默认8px |
