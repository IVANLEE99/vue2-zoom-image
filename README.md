# vue2-zoom-image

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
