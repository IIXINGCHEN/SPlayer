# AMLL for React 概述
## AMLL 组件库的 React 绑定，你可以通过此库来更加方便地使用 AMLL 歌词组件。

详情可以访问 Core 核心组件的 README.md。

## 安装
安装使用的依赖（如果以下列出的依赖包没有安装的话需要自行安装）：
```
Terminal window
npm install @pixi/app @pixi/core @pixi/display @pixi/filter-blur @pixi/filter-bulge-pinch @pixi/filter-color-matrix @pixi/sprite jss jss-preset-default # 使用 npm
yarn add @pixi/app @pixi/core @pixi/display @pixi/filter-blur @pixi/filter-bulge-pinch @pixi/filter-color-matrix @pixi/sprite jss jss-preset-default # 使用 yarn
```
安装 React 绑定需要使用的依赖（如果以下列出的依赖包没有安装的话需要自行安装）：
```
Terminal window
npm install react react-dom # 使用 npm
yarn add react react-dom # 使用 yarn
```
安装本体框架：
```
Terminal window
npm install @applemusic-like-lyrics/react # 使用 npm
yarn add @applemusic-like-lyrics/react # 使用 yarn
```
## 使用方式摘要
详细的 API 文档请参考 ./docs/modules.md

一个测试用途的程序可以在 ./src/test.tsx 里找到。
```
import { LyricPlayer } from "@applemusic-like-lyrics/react";

const App = () => {
    const [currentTime, setCurrentTime] = useState(0);
  const [lyricLines, setLyricLines] = useState<LyricLine[]>([]);
    return <LyricPlayer lyricLines={lyricLines} currentTime={currentTime} />
};
```

# 快速入门
## 概述
在本文档中，你将学习如何在一个React项目中使用AMLL核心组件。

快速入门文档仅包含使用AMLL的核心功能的教程。部分其他功能需要依赖bncm包。

目前，AMLL仅提供了对core的React绑定，AMLL的其他组件并未包含在内，你可以在bncm中找到它们。未来，AMLL将提供包含AMLL播放页面其他组件的react-full。

## 准备工作
1.创建一个React项目
React项目可以使用多种方式创建。本文档将使用与MDN React教程相同的create-react-app + jsx来作为示例。 你可以参考MDN React教程创建一个React项目。并使用例如Visual Studio Code等开发软件打开你的项目。

2.使用包管理软件安装AMLL
安装AMLL使用的需要的依赖（如果以下列出的依赖包没有安装的话需要自行安装）：
```
Terminal window
npm install @pixi/app @pixi/core @pixi/display @pixi/filter-blur @pixi/filter-bulge-pinch @pixi/filter-color-matrix @pixi/sprite jss jss-preset-default # 使用 npm
yarn add @pixi/app @pixi/core @pixi/display @pixi/filter-blur @pixi/filter-bulge-pinch @pixi/filter-color-matrix @pixi/sprite jss jss-preset-default # 使用 yarn
```
安装 React 绑定需要使用的依赖（如果以下列出的依赖包没有安装的话需要自行安装）：
```
Terminal window
npm install react react-dom # 使用 npm
yarn add react react-dom # 使用 yarn
```
安装本体框架：
```
Terminal window
npm install @applemusic-like-lyrics/react # 使用 npm
yarn add @applemusic-like-lyrics/react # 使用 yarn
```
现在，你已经具备在React中使用AMLL的必要条件

## 开始使用
1.在React项目中使用AMLL Lyric Player
Lyric Player是AMLL的核心组件之一，提供歌词的显示功能。

通过`import { LyricPlayer } from "@applemusic-like-lyrics/react"`;你可以将AMLL的Lyric Player导入到你的React项目中。

随后AMLL Lyric Player的React组件`<LyricPlayer />`便可以使用。

下面是一段示例。
```
import React from "react";
import { LyricPlayer } from "@applemusic-like-lyrics/react";

function App() {
  return (
  < LyricPlayer />
  );
}
export default App;
```
但是现在，AMLL Lyric Player还不会显示任何信息。你需要按照你的需要使用React的Props来为<LyricPlayer />赋值，同时根据歌曲的播放逐帧调用AMLL Lyric Player才能显示歌词。

现在，我们对代码稍做修改，使其满足我们的要求。
```
import React,{ useState } from "react";
import { LyricPlayer } from "@applemusic-like-lyrics/react";
import { parseTTML } from '@applemusic-like-lyrics/core';

const [currentTime, setCurrentTime] = useState(0);
const [lyricLines, setLyricLines] = useState(0);
const audio = document.getElementById("amll-audio");//获取<audio>元素

const parsedResult = parseTTML(TTML-Lyrics-Text);//对歌词进行处理
setLyricLines(parsedResult);//利用useState设置歌词

let lastTime = -1;
const frame = (time) => {
    if (lastTime === -1) {
        lastTime = time;
    }
    if (!audio.paused) {
        const time = (audio.currentTime * 1000) | 0;
        setCurrentTime(time);
    }
    lastTime = time;
    requestAnimationFrame(frame);//逐帧调用
};
requestAnimationFrame(frame);

function App() {
    return (
  <>
  <audio id="amll-audio" src="Audio-Music-Src" controls />
        <LyricPlayer
    lyricLines={lyricLines}  //设置歌词
    currentTime={currentTime}//通过逐帧调用函数，设置播放时间
  />
  </>
    );
}
export default App;
```
现在，我们创建了一个`<audio>`元素，id为amll-audio，用以播放歌曲。使用React中的useState来设置AMLL Lyric Player的当前播放时间。

定义一个frame函数，通过requestAnimationFrame();来逐帧调用。利用setCurrentTime();跟随音乐的播放来设置AMLL Lyric Player的时间，从而使AMLL Lyric Player进行歌词的演出。

我们还差最后一步：lyricLines的设置。lyricLines需要处理好的TTML歌词。AMLL提供了TTML歌词的处理程序，即parseTTML。我们需要通过import { parseTTML } from '@applemusic-like-lyrics/core';来导入。利用parseTTML();处理歌词，并将处理好的歌词通过setLyricLines赋值给AMLL Lyric Player。

注意：目前main分支的AMLL无法使用此方法导入parseTTML，你需要从dev分支下packages/core/src/lyric/ttml.ts导入。

标准的使用方法应为从@applemusic-like-lyrics/ttml导入而不是/core。

2.在React项目中使用BackgroundRender
BackgroundRender是AMLL的另一个核心组件。提供了歌曲播放背景显示的功能。

在本教程中，为了简洁易懂，将以BackgroundRender中的EplorRenderer（真流体背景）作为示例。

在最新的dev分支中，EplorRenderer也为默认的BackgroundRender

我们需要通过
```
import { BackgroundRender } from "@applemusic-like-lyrics/react";
import { EplorRenderer } from '@applemusic-like-lyrics/core';
```
来导入BackgroundRender与EplorRenderer。

我们将第三部分中的代码作为示例进行修改。
```
import React,{ useState } from "react";
import { LyricPlayer, BackgroundRender } from "@applemusic-like-lyrics/react";
import { EplorRenderer } from '@applemusic-like-lyrics/core';
import { parseTTML } from '@applemusic-like-lyrics/core';

const [currentTime, setCurrentTime] = useState(0);
const [lyricLines, setLyricLines] = useState(0);
const [albumUrl, setAlbumUrl] = useState(0);
const audio = document.getElementById("amll-audio");

const parsedResult = parseTTML(TTML-Lyrics-Text);
setLyricLines(parsedResult);

setAlbumUrl(Album-Pic-Url);//利用useState传入专辑图url

let lastTime = -1;
const frame = (time) => {
    if (lastTime === -1) {
        lastTime = time;
    }
    if (!audio.paused) {
        const time = (audio.currentTime * 1000) | 0;
        setCurrentTime(time);
    }
    lastTime = time;
    requestAnimationFrame(frame);
};
requestAnimationFrame(frame);

function App() {
    return (
  <>
    <audio id="amll-audio" src="Audio-Music-Src" controls />
    <BackgroundRender
        albumImageUrl={albumUrl} //将歌曲封面图url传入，来生成动态背景
        renderer={EplorRenderer} //渲染器的选择，这里为EplorRenderer真流体
    />
    <LyricPlayer
        lyricLines={lyricLines}
        currentTime={currentTime}
    />
  </>
    );
}
export default App;
```
通过使用`<BackgroundRender />`组件，并使用其Props进行设置，我们可以得到动态背景。

将专辑图的url传入albumImageUrl，并选择EplorRenderer为renderer，渲染器会自动处理图片，生成精美的动态背景。

## 结语
我们在本章中学习了如何快速入门AMLL。希望能帮助你更轻松地进行AMLL相关的开发。

# LyricPlayer 组件
## 概述
LyricPlayer是AMLL的核心组件之一。AMLL的歌词演出（即歌词滚动、逐词歌词高亮、歌词辉光等效果）由LyricPlayer完成。

AMLL对LyricPlayer进行了React绑定，因此你可以方便的在React项目中使用LyricPlayer。

LyricPlayer的快速入门，你可以在AMLL React快速入门中找到。

## 使用
请参考AMLL React快速入门中的教程。

## Props参数
AMLL LyricPlayer已进行React绑定，通过Props即可进行自定义配置。

Lyric Player提供以下Props：

Props	类型	默认	作用
disabled	布尔值	true	是否演出部分效果，目前会控制播放间奏点的动画的播放暂停与否
playing	布尔值	true	是否演出部分效果，目前会控制播放间奏点的动画的播放暂停与否
alignAnchor	top/bottom/center	center	设置歌词行的对齐方式，分别向目标歌词行的顶部/底部/垂直中心对齐
alignPosition	数字	0.5	设置默认的歌词行对齐位置，相对于整个歌词播放组件的大小位置。可以设置一个 0.0-1.0 之间的任意数字，代表组件高度由上到下的比例位置
enableSpring	布尔值	true	设置是否使用物理弹簧算法实现歌词动画效果。如果启用，则会通过弹簧算法实时处理歌词位置，但是需要性能足够强劲的电脑方可流畅运行；如果不启用，则会回退到基于 transition 的过渡效果，对低性能的机器比较友好，但是效果会比较单一
enableBlur	布尔值	true	设置是否启用歌词行的模糊效果
enableScale	布尔值	true	设置是否使用物理弹簧算法实现歌词动画效果。如果启用，则会通过弹簧算法实时处理歌词位置，但是需要性能足够强劲的电脑方可流畅运行； 如果不启用，则会回退到基于 transition 的过渡效果，对低性能的机器比较友好，但是效果会比较单一
hidePassedLines	布尔值	false	设置是否隐藏已经播放过的歌词行
lyricLines	LyricLine[]	null	设置当前播放歌词，要注意传入后这个数组内的信息不得修改，否则会发生错误
currentTime	数字	null	设置当前播放进度，单位为毫秒且必须是整数，此时将会更新内部的歌词进度信息。内部会根据调用间隔和播放进度自动决定如何滚动和显示歌词，所以这个的调用频率越快越准确越好
linePosXSpringParams	Partial[spring.SpringParams]	null	设置所有歌词行在​纵坐标上的弹簧属性，包括重量、弹力和阻力。params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
linePosYSpringParams	Partial[spring.SpringParams]	null	设置所有歌词行在​纵坐标上的弹簧属性，包括重量、弹力和阻力。params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
lineScaleSpringParams	Partial[spring.SpringParams]	null	设置所有歌词行在​缩放大小上的弹簧属性，包括重量、弹力和阻力。 params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
bottomLine	ReactNode	null	在一个特殊的底栏元素内加入指定元素，默认是空白的，可以往内部添加任意元素。这个元素始终在歌词的底部，可以用于显示歌曲创作者等信息
onLyricLineClick	(line: LyricLineMouseEvent) => void	null	当某个歌词行被左键点击时触发的事件。line 歌词行的事件对象，可以访问到对应的歌词行信息和歌词行索引
onLyricLineContextMenu	(line: LyricLineMouseEvent) => void	null	当某个歌词行被右键点击时触发的事件。line 歌词行的事件对象，可以访问到对应的歌词行信息和歌词行索引