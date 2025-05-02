# SPlayer
> [!WARNING]
> 近期我发现有部分用户在`.env`文件中填入了我的网易云API, 可能会有人不懂, `Vercel`是有**500GB**流量限制的
> 这种现象导致了我的演示站点一直超出限制导致站点无法访问, 所以呼吁大家不要把我的API填入自己的`配置文件`内
> 要是还发现有人在肆无忌惮的使用我的`API`, 我将会**封禁你的IP**并且把你的`网易云Cookie`**公开**到当前仓库中

#### 一个简约的音乐播放器

![main](/screenshots/SPlayer.jpg)

## 说明
>[!IMPORTANT]
>
> # Q&A
> ### 你为什么要维护这个已经过时的版本
> 那是因为在imsyy的dev分支将会向本地播放器发展, 且把在线版本进入基本维护模式而导致有些功能将不会在网页端生效, 该版本是最后一个支持移动端和网页部署的版本, 我将会尽量把功能与dev分支同步, 以便能使用到与dev分支相同的功能.
> ### 严肃警告
>
> - 请务必遵守 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 许可协议
> - 在您的修改、演绎、分发或派生项目中，必须同样采用 **AGPL-3.0** 许可协议，**并在适当的位置包含本项目的许可和版权信息**
> - **禁止用于售卖或其他商业用途**，如若发现，作者保留追究法律责任的权利
> - 若发现未遵守 **AGPL-3.0** 许可协议的行为，**本项目将永久停更**
> - 感谢您的尊重与理解

- 本项目采用 [Vue 3](https://cn.vuejs.org/) 全家桶和 [Naïve UI](https://www.naiveui.com/) 组件库及 [Electron](https://www.electronjs.org/zh/docs/latest/) 开发
- 支持网页端与客户端，由于设备有限，目前仅适配 `Win`，其他平台可自行解决兼容性后进行构建
- 仅对移动端做了基础适配，**不保证功能全部可用**

  > 请注意，本程序不打算开发移动端，也不会对移动端进行完美适配，仅保证基础可用性

- 欢迎各位大佬 `Star` 😍

## 👀 Demo

- [SPlayer](https://player.focalors.ltd/)
> 该版本为dev分支

## 🎉 功能

- ✨ 支持扫码登录
- 📱 支持手机号登录(由于API问题可能不会登陆成功)
- 📅 自动进行每日签到及云贝签到
- 🎨 封面主题色自适应
- 🌚 Light / Dark 模式自动切换
- 📁 本地歌曲管理及分类（建议先使用 [音乐标签](https://www.cnblogs.com/vinlxc/p/11347744.html) 进行匹配后再使用）
- 🎵 **支持播放部分无版权歌曲（可能会与原曲不匹配）**
- ⬇️ 下载歌曲（最高支持 Hi-Res）
- ➕ 新建歌单及歌单编辑
- ❤️ 收藏 / 取消收藏歌单或歌手
- 🎶 每日推荐歌曲
- 📻 私人 FM
- ☁️ 云盘音乐上传
- 📂 云盘内歌曲播放
- 🔄 云盘内歌曲纠正
- 🗑️ 云盘歌曲删除
- 📝 支持逐字歌词
- 🔄 歌词滚动以及歌词翻译
- 📹 MV 与视频播放
- 🎶 音乐频谱显示
- ⏭️ 音乐渐入渐出
- 🔄 支持 PWA
- 💬 支持评论区及评论点赞
- 🌓 明暗模式自动 / 手动切换
- 📱 移动端基础适配
- ~~🌐 `i18n` 支持~~

## 🖼️ screenshots

> 开发中，仅供参考

<details>
<summary>主页面</summary>

![主页面](/screenshots/SPlayer%20-%20主页面.jpg)

</details>

<details>
<summary>播放页面</summary>

![播放页面](/screenshots/SPlayer%20-%20播放页面.jpg)

</details>

<details>
<summary>发现页面</summary>

![发现页面](/screenshots/SPlayer%20-%20发现页面.jpg)

</details>

<details>
<summary>歌单页面</summary>

![发现页面](/screenshots/SPlayer%20-%20歌单页面.jpg)

</details>

<details>
<summary>评论页面</summary>

![发现页面](/screenshots/SPlayer%20-%20评论页面.jpg)

</details>

<details>
<summary>本地音乐</summary>

![发现页面](/screenshots/SPlayer%20-%20本地音乐.jpg)

</details>

### 本地构建
> [!WARNING]
>
> 由于本项目破坏了一些electron的框架, 故本项目不提供安装版, 仅提供可部署的网页版本
> 请尽量拉取最新分支后使用本地构建方式，在线部署的仓库可能更新不及时

## 🐋 Docker 部署

现版本暂不支持`Docker`部署, 预计将会在版本后期计划

## ⚙️ Vercel 部署


1. 本程序依赖 [NeteaseCloudMusicApi](https://github.com/IamFurina/NeteaseCloudMusicApi) 运行以及[UNM-Server](https://act.focalors.ltd/unm-server)，并按照步骤部署, 请确保您已成功部署该项目，并成功取得在线访问地址
2. 点击本仓库右上角的 `Fork`，复制本仓库到你的 `GitHub` 账号
3. 复制 `/.env.example` 文件并重命名为 `/.env`
4. 将 `.env` 文件中的 `RENDERER_VITE_SERVER_URL` 和 `VITE_UNM_API` 改为第一步得到的 API 地址
> [!WARNING]
> 
> TMD`.env`文件已经明确表示不要用自带的`API`了, 我的`Vercel`的**500GB流量**就是被你们给耗光的
> 下次再让我见到这种情况, 我就把你们的网易云cookie公开出来!
>
5. 将 `.env` 文件中的 `RENDERER_VITE_SITE_URL` 改为您的站点地址, 用于解决跨域问题

   ```dotenv
   RENDERER_VITE_SERVER_URL = "https://api.example.com";
   VITE_UNM_API = "https://unm.example.com";
   RENDERER_VITE_SITE_URL = "https://player.example.com";
   ```
> [!IMPORTANT]
>
> 同时API也有另一种填入方式, 请在`vercel.json`里面
>
>```json
>
> "rewrites": [
>   {
>     "source": "/:path",
>     "destination": "/index.html"
>   },
>   {
>     "source": "/api/netease/:apiurl*",
>     "destination": "https://你的网易云api域名/:apiurl*"
>   },
>   {
>     "source": "/api/unblock/:match*",
>     "destination": "https://你的unmapi域名/:match*"
>   }
> ]
>```  
> 随后在`.env`里面填写
>
>```dotenv
>## 使用同级域名API
>RENDERER_VITE_SITE_ROOT = true
>```

5. 将 `Build and Output Settings` 中的 `Output Directory` 改为 `out/renderer`

   ![build](/screenshots/build.jpg)

6. 点击 `Deploy`，即可成功部署

## ⚙️ 服务器部署

1. 重复 `⚙️ Vercel 部署` 中的 1 - 4 步骤
2. 克隆仓库

   > 将链接中的 example/repository.git 替换为你要克隆的实际仓库的地址

   ```bash
   git clone https://github.com/example/repository.git
   ```

3. 安装依赖

   ```bash
   pnpm install
   # 或者
   yarn install
   # 或者
   npm install
   ```

4. 编译打包

   ```bash
   pnpm build
   # 或者
   yarn build
   # 或者
   npm build
   ```

5. 将站点运行目录设置为 `out/renderer` 目录

## ⚙️ 本地部署

1. 本地部署需要用到 `Node.js`。可前往 [Node.js 官网](https://nodejs.org/zh-cn/) 下载安装包，请下载最新稳定版
2. 安装 pnpm

   ```bash
   npm install pnpm -g
   ```

3. 克隆仓库并拉取至本地，此处不再赘述
4. 使用 `pnpm install` 安装项目依赖（若安装过程中遇到网络错误，请使用国内镜像源替代，此处不再赘述）
5. 复制 `/.env.example` 文件并重命名为 `/.env` 并修改配置
6. 打包客户端，请依据你的系统类型来选择，打包成功后，会输出安装包或可执行文件在 `/dist` 目录中，可自行安装

   | 命令               | 系统类型 |
   | ------------------ | -------- |
   | `pnpm build:win`   | Windows  |
   | `pnpm build:linux` | Linux    |
   | `pnpm build:mac`   | MacOS    |

## 😘 鸣谢

特此感谢为本项目提供支持与灵感的项目

- [原版SPlayer](https://github.com/imsyy/splayer)
- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [YesPlayMusic](https://github.com/qier222/YesPlayMusic)
- [UnblockNeteaseMusic](https://github.com/UnblockNeteaseMusic/server)
- [Vue-mmPlayer](https://github.com/maomao1996/Vue-mmPlayer)
- [refined-now-playing-netease](https://github.com/solstice23/refined-now-playing-netease)
- [material-color-utilities](https://github.com/material-foundation/material-color-utilities)

## 📢 免责声明

本项目部分功能使用了网易云音乐的第三方 API 服务，**仅供个人学习研究使用，禁止用于商业及非法用途**

同时，本项目开发者承诺 **严格遵守相关法律法规和网易云音乐 API 使用协议，不会利用本项目进行任何违法活动。** 如因使用本项目而引起的任何纠纷或责任，均由使用者自行承担。**本项目开发者不承担任何因使用本项目而导致的任何直接或间接责任，并保留追究使用者违法行为的权利**

请使用者在使用本项目时遵守相关法律法规，**不要将本项目用于任何商业及非法用途。如有违反，一切后果由使用者自负。** 同时，使用者应该自行承担因使用本项目而带来的风险和责任。本项目开发者不对本项目所提供的服务和内容做出任何保证

感谢您的理解

## 📜 开源许可

- **本项目仅供个人学习研究使用，禁止用于商业及非法用途**
- 本项目基于 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 许可进行开源
  1. **修改和分发：** 任何对本项目的修改和分发都必须基于 AGPL-3.0 进行，源代码必须一并提供
  2. **派生作品：** 任何派生作品必须同样采用 AGPL-3.0，并在适当的地方注明原始项目的许可证
  3. **注明原作者：** 在任何修改、派生作品或其他分发中，必须在适当的位置明确注明原作者及其贡献
  4. **免责声明：** 根据 AGPL-3.0，本项目不提供任何明示或暗示的担保。请详细阅读 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 以了解完整的免责声明内容
  5. **社区参与：** 欢迎社区的参与和贡献，我们鼓励开发者一同改进和维护本项目
  6. **许可证链接：** 请阅读 [GNU Affero General Public License (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html) 了解更多详情

## 📂 目录结构

<details>
<summary>查看目录结构详情</summary>

> ChatGPT 写的，如有错误，请见谅

```dir
├── auto-imports.d.ts                     # 自动导入
├── components.d.ts                       # 自动导入
├── docker-compose.yml                    # Docker Compose
├── Dockerfile                            # Docker
├── electron                              # Electron
│   ├── main                              # Electron 主进程
│   │   ├── index.js                      # 主进程入口
│   │   ├── mainIpcMain.js                # 主进程与渲染进程通信
│   │   ├── startMainServer.js            # 启动主进程服务器
│   │   ├── startNcmServer.js             # 启动网易云音乐服务
│   │   └── utils                         # 主进程工具函数
│   │       ├── checkUpdates.js           # 检查更新
│   │       ├── createGlobalShortcut.js   # 创建全局快捷键
│   │       ├── createSystemTray.js       # 创建系统托盘
│   │       ├── getNeteaseMusicUrl.js     # 解灰
│   │       ├── kwDES.js                  # DES加密算法
│   │       └── readDirAsync.js           # 异步读取目录
│   └── preload                           # Electron 预加载脚本
│       └── index.js                      # 预加载脚本入口文件
├── electron-builder.yml                  # Electron Builder
├── electron.vite.config.js               # Electron Vite
├── index.html                            # 主页面 HTML
├── LICENSE                               # 项目许可证
├── nginx.conf                            # Nginx 配置
├── src                                   # 项目源代码
│   ├── api                               # API 相关
│   │   ├── ./..
│   ├── App.vue                           # 根组件
│   ├── assets                            # 静态资源
│   │   ├── emoji.json                    # 表情数据
│   │   ├── icon.json                     # 图标数据
│   │   └── themeColor.json               # 主题颜色数据
│   ├── components                        # 组件目录
│   │   ├── Cover                         # 封面相关组件目录
│   │   │   ├── CoverDropdown.vue         # 封面下拉组件
│   │   │   ├── MainCover.vue             # 主封面组件
│   │   │   ├── SpecialCoverCard.vue      # 特殊封面卡片组件
│   │   │   └── SpecialCover.vue          # 特殊封面组件
│   │   ├── Global                        # 全局组件目录
│   │   │   ├── MainLayout.vue            # 主布局组件
│   │   │   ├── Menu.vue                  # 菜单组件
│   │   │   ├── Pagination.vue            # 分页组件
│   │   │   ├── Playlist.vue              # 歌单组件
│   │   │   ├── Provider.vue              # 全局化配置组件
│   │   │   └── SvgIcon.vue               # SVG 图标组件
│   │   ├── List                          # 列表组件目录
│   │   │   ├── CommentList.vue           # 评论列表组件
│   │   │   ├── SongListDropdown.vue      # 歌曲下拉组件
│   │   │   └── SongList.vue              # 歌曲列表组件
│   │   ├── Modal                         # 弹窗相关组件目录
│   │   │   ├── AddPlaylist.vue           # 添加歌单组件
│   │   │   ├── CloudSongMatch.vue        # 云盘歌曲匹配组件
│   │   │   ├── CreatePlaylist.vue        # 创建歌单组件
│   │   │   ├── DownloadSong.vue          # 下载歌曲组件
│   │   │   ├── LoginPhone.vue            # 手机登录组件
│   │   │   ├── LoginQRCode.vue           # 二维码登录组件
│   │   │   ├── Login.vue                 # 登录组件
│   │   │   ├── PlaylistUpdate.vue        # 歌单编辑组件
│   │   │   └── UpCloudSong.vue           # 上传云盘歌曲组件
│   │   ├── Nav                           # 导航相关组件目录
│   │   │   ├── MainNav.vue               # 主导航组件
│   │   │   └── UserData.vue              # 用户数据组件
│   │   ├── Player                        # 播放器相关组件目录
│   │   │   ├── CountDown.vue             # 倒计时组件
│   │   │   ├── FullPlayer.vue            # 全屏播放器组件
│   │   │   ├── Lyric.vue                 # 歌词组件
│   │   │   ├── MainControl.vue           # 主控制组件
│   │   │   ├── PlayerControl.vue         # 播放器控制组件
│   │   │   ├── PlayerCover.vue           # 播放器封面组件
│   │   │   └── PrivateFm.vue             # 私人 FM 组件
│   │   ├── Search                        # 搜索相关组件
│   │   │   ├── SearchHot.vue             # 热门搜索组件
│   │   │   ├── SearchInp.vue             # 搜索输入组件
│   │   │   └── SearchSuggestions.vue     # 搜索建议组件
│   │   └── WinDom                        # 窗口 DOM 相关组件
│   │       └── TitleBar.vue              # 标题栏组件
│   ├── main.js                           # Vue 应用的入口文件
│   ├── router                            # Vue Router 相关文件夹
│   │   ├── index.js                      # Vue Router 入口文件
│   │   └── routes.js                     # 路由配置文件
│   ├── stores                            # Vuex Store 相关文件夹
│   │   ├── indexedDB.js                  # IndexedDB 数据库相关文件
│   │   ├── index.js                      # Vuex Store 入口文件
│   │   ├── musicData.js                  # 音乐数据相关文件
│   │   ├── siteData.js                   # 网站数据相关文件
│   │   ├── siteSettings.js               # 网站设置相关文件
│   │   └── siteStatus.js                 # 网站状态相关文件
│   ├── style                             # 样式相关文件夹
│   │   ├── animate.scss                  # 动画样式文件
│   │   └── main.scss                     # 主样式文件
│   ├── utils                             # 工具函数文件夹
│   │   ├── auth.js                       # 认证相关函数
│   │   ├── base64.js                     # Base64编码解码相关函数
│   │   ├── color-utils.js                # 颜色工具函数
│   │   ├── cover-color.js                # 封面颜色相关函数
│   │   ├── debounce.js                   # 防抖函数
│   │   ├── formatData.js                 # 数据格式化函数
│   │   ├── formRules.js                  # 表单验证规则
│   │   ├── globalEvents.js               # 全局事件处理函数
│   │   ├── globalShortcut.js             # 全局快捷键相关函数
│   │   ├── helper.js                     # 辅助函数
│   │   ├── parseLyric.js                 # 解析歌词函数
│   │   ├── Player.js                     # 播放器控制相关函数
│   │   ├── request.js                    # 网络请求相关函数
│   │   ├── throttle.js                   # 节流函数
│   │   ├── timeTools.js                  # 时间工具函数
│   │   └── userSignIn.js                 # 用户登录相关函数
│   └── views                             # Vue组件文件夹
│       ├── Artist                        # 艺术家相关组件
│       │   ├── albums.vue                # 艺术家专辑组件
│       │   ├── hot.vue                   # 艺术家热门组件
│       │   ├── index.vue                 # 艺术家主组件
│       │   ├── songs.vue                 # 艺术家歌曲组件
│       │   └── videos.vue                # 艺术家视频组件
│       ├── Cloud.vue                     # 云盘组件
│       ├── Comment.vue                   # 评论组件
│       ├── DailySongs.vue                # 每日推荐组件
│       ├── Discover                      # 发现音乐相关组件
│       │   ├── artists.vue               # 发现音乐艺术家组件
│       │   ├── index.vue                 # 发现音乐主组件
│       │   ├── new.vue                   # 发现音乐新歌组件
│       │   ├── playlists.vue             # 发现音乐歌单组件
│       │   └── toplists.vue              # 发现音乐排行榜组件
│       ├── History.vue                   # 历史记录组件
│       ├── Home.vue                      # 主页组件
│       ├── Like                          # 我喜欢的相关组件
│       │   ├── albums.vue                # 我喜欢的专辑组件
│       │   ├── artists.vue               # 我喜欢的艺术家组件
│       │   ├── index.vue                 # 我喜欢的主组件
│       │   ├── playlists.vue             # 我喜欢的歌单组件
│       │   └── videos.vue                # 我喜欢的视频组件
│       ├── List                          # 列表相关组件
│       │   ├── album.vue                 # 专辑组件
│       │   └── playlist.vue              # 歌单组件
│       │   └── dj.vue                    # 电台组件
│       ├── Local                         # 本地音乐相关组件
│       │   ├── albums.vue                # 本地音乐专辑组件
│       │   ├── artists.vue               # 本地音乐艺术家组件
│       │   ├── index.vue                 # 本地音乐主组件
│       │   └── songs.vue                 # 本地音乐歌曲组件
│       ├── Player.vue                    # 视频播放器组件
│       ├── Dj                            # 电台相关组件
│       │   └── index.vue                 # 电台主组件
│       │   └── type.vue                  # 电台分类组件
│       ├── Search                        # 搜索相关组件
│       │   ├── albums.vue                # 搜索专辑组件
│       │   ├── artists.vue               # 搜索艺术家组件
│       │   ├── index.vue                 # 搜索主组件
│       │   ├── playlists.vue             # 搜索歌单组件
│       │   ├── songs.vue                 # 搜索歌曲组件
│       │   └── videos.vue                # 搜索视频组件
│       │   └── djs.vue                   # 搜索电台组件
│       ├── Setting                       # 设置相关组件
│       │   └── index.vue                 # 设置主组件
│       ├── Song.vue
│       ├── State
│       │   ├── 403.vue
│       │   ├── 404.vue
│       │   └── 500.vue
│       └── Test.vue
└── vercel.json                           # Vercel 部署配置
```

</details>

## 📄 todo列表
- [x] 支持清除pwa缓存
- [x] 支持Apple Music-Like Lyrics
> - [x] 解决歌词处理问题
- [x] 解灰支持酷我源
- [ ] 修复imsyy的陈年老bug
- [ ] 同步dev分支
- [x] 解决跨资源共享问题
- [ ] 支持多语言
- [x] 支持修改全局字体
> - [x] 同时支持单独修改歌词字体

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=IamFurina/SPlayer&type=Date)](https://star-history.com/#IamFurina/SPlayer&Date)
