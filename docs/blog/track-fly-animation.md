# 轨迹飞行动画

## 1. 前言

十月黄金周闲来无事，city rider 了一圈，博客小记一下

打开地图看一眼，梧桐山还没上去过啊，那去骑车看看吧

![](/img/szu-to-wutong-mountain.png)

说走就走，早上 6 点起床，穿上骑行服和骑行鞋，装上 6 根能量棒，向着朝霞前进

经过一天的跋山涉水，果然 rider 了个圈，差一点就到山顶了（不对

![](/img/raw-track.png)

顺手记录一下吧，但一个圈看着挺单调的，做成轨迹飞行动画怎么样？

其实灵感来源自历年来的 Grand Tour 路线发布视频

例如 [The route of Tour De Fronce 2024](https://www.youtube.com/watch?v=48eANiuRwM4){target="_blank"}：

<video controls>
    <source src="/video/track-fly-demo.mp4">
</video>

可以看到，镜头由近及远，跟随轨迹的大致方向移动，且同时不会随轨迹出现抖动现象，但怎么实现呢？

这可以直接联想到 Mapbox 上的两个 API （其实也是之前偶然积累的素材）：

1. 渐变显示一条 path: [Animate a line](https://docs.mapbox.com/mapbox-gl-js/example/animate-a-line/){target="_blank"}
2. 让相机沿着 path 移动: [Animate the camera along a path](https://docs.mapbox.com/mapbox-gl-js/example/free-camera-path/){target="_blank"}

于是，思路有了，开始动手：

## 2. 注视点平滑轨迹生成

我们这里其实已经有了一条曲折的轨迹，因此之后直接套用 Animate a line 这个 API 即可

而若想让相机三维坐标在移动过程中不产生抖动，就需要在已有的曲折轨迹附近生成一条弯曲平滑的运镜路线，并且让相机的注视点运动轨迹也保持平滑渐变，保证相机倾角也不会产生大幅的抖动

我们首先处理平滑注视点轨迹，先 clone 一下 track_fly 仓库：

```sh
git clone https://github.com/szchixy/track_fly.git
```

用 QGIS 打开 /qgis_process/test.qgs ，导入 /data/track.geojson， 原始轨迹 track 如下图所示：

![](/img/track-layer.png)

然后，对 track 重投影到当前地理区域的投影坐标系下，例如深圳使用 EPGS:4526，并得到 track-4526 图层

接着，为了对 track-4526 进行平滑处理，需要先将曲线简化，这里选择 "简化（simplify）" 工具，以默认的 "距离（Douglas Peucker）, 1m" 参数进行简化，得到 simplify-4526 图层如下图所示：

![](/img/simplify-4526-layer.png)

最后，对 simplify-4526 进行平滑处理：选择 "平滑" 工具并以迭代次数 5 运行即可得到一条平滑的曲线 smooth-4526，转到 EPGS:4326 坐标系下即可得到 target 图层并保存到 /data/target.geojson，在QGIS 中如下图所示：

![](/img/target-layer.png)

## 3. 相机平滑轨迹点生成

当有了 target.geojson 后，我们需要在注视点周围生成平滑的运镜点轨迹，这里给出一个 python_process/target2camera.py，它的大致意思就是在轨迹变化的整体过程中，相机从注视点的西侧半径为 r 处的位置出发，在轨迹点变化的过程中不断计算以轨迹点为圆心，以 r 为半径顺时针旋转，同时高度保持不变，最终计算得到一个 camera.json，放到 QGIS 中如下图所示：

![](/img/camera-layer.png)

## 4. 动画生成

最终，我们使用前面提到的两个 Mapbox API，在 /js/animation.js 中分别将 track.json, target.json, camera.json 依次导入并渲染即可在浏览器中观看最终效果（由于作者太懒，具体 API 调用的代码讲解过程就略过吧）：

[轨迹飞行动画 🚲](https://szchixy.github.io/track_fly/index.html){target="_blank"}

---

动手找一条轨迹试一下吧? (°▽°)/
