# tooltip

Tooltip组件

## 安装

`npm install --save react-widget-tooltip`


## 使用

[![Edit elated-montalcini-7mici](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/elated-montalcini-7mici?fontsize=14&hidenavigation=1&theme=dark)

```js
import React from "react";
import Tooltip from "react-widget-tooltip";
import "react-widget-tooltip/style";
import "./styles.css";

export default function App() {
  return (
    <div
      className="App"
      style={{
        padding: 100
      }}
    >
      <Tooltip
        title="...Tooltip..."
      >
        <button>试试</button>
      </Trigger>
    </div>
  );
}

```

### Interfaces

```ts
export interface TooltipProps extends Omit<TriggerProps, "popup" | "defaultPopupVisible" | "popupVisible" | "destroyPopupOnHide" | "action" | "popupTransition" | "adjustPosition"> {
    /** 提示文字 */
    title?: React.ReactNode | (() => React.ReactNode);
    /** 提示框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom */
    placement?: TriggerProps["placement"];
    /** 默认是否显隐 */
    defaultVisible?: boolean;
    /** 用于手动控制浮层显隐，受控 */
    visible?: boolean;
    /** 触发行为，可选 "click" | "contextMenu" | "focus" | "hover" 可使用数组设置多个触发行为 */
    trigger?: TriggerProps["action"];
    /** 提示框偏移量 */
    offset?: number;
    /** 是否显示提示箭头 */
    visibleArrow?: boolean;
    /** 箭头大小，默认为：6 */
    arrowSize?: number;
    /** 箭头保持在中间 */
    keepArrowAtCenter?: boolean;
    /** 关闭后是否销毁 */
    destroyTooltipOnHide?: boolean;
    /** 提示动画，参考 react-transition-group*/
    transition?: TriggerProps["popupTransition"];
    /** 显示隐藏的回调 */
    onVisibleChange?: (visible: boolean) => void;
}
```

其他参数 [trigger](https://github.com/react-widget/trigger)

### defaultProps
```js
{
	prefixCls: "rw-tooltip",
	placement: "top",
	defaultVisible: false,
	visibleArrow: true,
	keepArrowAtCenter: false,
	destroyTooltipOnHide: true,
	arrowSize: 6,
	offset: 0,
	delay: 100,
	trigger: ["hover"],
	outsideHideEventName: ["mousedown", "click"],
	transition: {
		classNames: {
			appear: "tooltip-animated",
			appearActive: "tooltip-fade-in",
			appearDone: "",
			enter: "tooltip-animated",
			enterActive: "tooltip-fade-in",
			enterDone: "",
			exit: "tooltip-animated",
			exitActive: "tooltip-fade-out",
			exitDone: "",
		},
		timeout: 300,
	},
}
```

### 基础样式

```css
.rw-tooltip-root {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
}

.rw-tooltip {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    z-index: 2000;
}

.rw-tooltip-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.1;
    z-index: 2000;
}

.rw-tooltip-inner {
    position: relative;
    min-width: 30px;
    min-height: 32px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
}

.rw-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;

    box-sizing: border-box;
}

.rw-tooltip-placement-top > .rw-tooltip-arrow,
.rw-tooltip-placement-top-left > .rw-tooltip-arrow,
.rw-tooltip-placement-top-right > .rw-tooltip-arrow {
    bottom: -5px;
    border-width: 5px 5px 0;
    border-top-color: rgba(0, 0, 0, 0.9);
}

.rw-tooltip-placement-bottom > .rw-tooltip-arrow,
.rw-tooltip-placement-bottom-left > .rw-tooltip-arrow,
.rw-tooltip-placement-bottom-right > .rw-tooltip-arrow {
    top: -5px;
    border-width: 0 5px 5px;
    border-bottom-color: rgba(0, 0, 0, 0.9);
}

.rw-tooltip-placement-left > .rw-tooltip-arrow,
.rw-tooltip-placement-left-top > .rw-tooltip-arrow,
.rw-tooltip-placement-left-bottom > .rw-tooltip-arrow {
    right: -5px;
    border-width: 5px 0 5px 5px;
    border-left-color: rgba(0, 0, 0, 0.9);
}

.rw-tooltip-placement-right > .rw-tooltip-arrow,
.rw-tooltip-placement-right-top > .rw-tooltip-arrow,
.rw-tooltip-placement-right-bottom > .rw-tooltip-arrow {
    left: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: rgba(0, 0, 0, 0.9);
}

.rw-tooltip-placement-top-left > .rw-tooltip-arrow,
.rw-tooltip-placement-bottom-left > .rw-tooltip-arrow {
    left: 16px;
}

.rw-tooltip-placement-top > .rw-tooltip-arrow,
.rw-tooltip-placement-bottom > .rw-tooltip-arrow {
    left: 50%;
    margin-left: -5px;
}

.rw-tooltip-placement-top-right > .rw-tooltip-arrow,
.rw-tooltip-placement-bottom-right > .rw-tooltip-arrow {
    right: 16px;
}

.rw-tooltip-placement-left-top > .rw-tooltip-arrow,
.rw-tooltip-placement-right-top > .rw-tooltip-arrow {
    top: 8px;
}

.rw-tooltip-placement-left > .rw-tooltip-arrow,
.rw-tooltip-placement-right > .rw-tooltip-arrow {
    top: 50%;
    margin-top: -5px;
}

.rw-tooltip-placement-left-bottom > .rw-tooltip-arrow,
.rw-tooltip-placement-right-bottom > .rw-tooltip-arrow {
    bottom: 8px;
}

.tooltip-animated {
    animation-duration: 0.3s;
}

.tooltip-fade-in {
    animation-name: TooltipFadeIn;
}

.tooltip-fade-out {
    animation-name: TooltipFadeOut;
}

@keyframes TooltipFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
@keyframes TooltipFadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

```
