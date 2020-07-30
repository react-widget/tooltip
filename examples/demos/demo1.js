import React, { Component } from "react";
import Tooltip from "../../src";

const animateClassNames = {
	appear: "animated",
	appearActive: "fadeBottomIn",
	enter: "animated",
	enterActive: "fadeBottomIn",
	enterDone: "",
	exit: "animated",
	exitActive: "fadeBottomOut",
	exitDone: "",
};

function TooltipButton({ text, ...props }) {
	return (
		<Tooltip
			// maskClosable={false}
			title="Title"
			content="Content"
			{...props}
		>
			<button>{text || props.placement}</button>
		</Tooltip>
	);
}

export default class DEMO extends Component {
	state = {
		visible: true,
	};

	componentDidMount() {}

	render() {
		return (
			<div>
				<TooltipButton action="hover" placement="bottomLeft" />
				<TooltipButton action="hover" placement="bottom" />
				<TooltipButton action="hover" placement="bottomRight" />
				<hr />
				<TooltipButton action="hover" placement="topLeft" />
				<TooltipButton action="hover" placement="top" />
				<TooltipButton action="hover" placement="topRight" />
				<hr />
				<TooltipButton action="hover" placement="leftTop" />
				<div
					style={{
						position: "relative",
					}}
				>
					<TooltipButton action="hover" usePortal={false} placement="left" />
				</div>
				<TooltipButton action="hover" placement="leftBottom" />
				<hr />
				<TooltipButton action="hover" placement="rightTop" />
				<div
					style={{
						position: "relative",
					}}
				>
					<TooltipButton action="hover" usePortal={false} placement="right" />
				</div>
				<TooltipButton action="hover" placement="rightBottom" />
				<hr />
				<TooltipButton
					placement="bottomLeft"
					action="contextMenu"
					hideAction="mouseDown"
					text="action:contextMenu"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TooltipButton
					placement="bottomLeft"
					action="click"
					// hideAction="mouseDown"
					text="action:click"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TooltipButton
					placement="bottomLeft"
					action="hover"
					text="action:hover"
					delay={200}
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TooltipButton
					placement="bottomLeft"
					action="focus"
					text="action:focus"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<TooltipButton
					placement="bottomLeft"
					action="mouseDown"
					text="action:mouseDown"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
				/>
				<hr />
				<TooltipButton placement="bottomLeft" mask text="mask" />
				<TooltipButton
					placement="bottomLeft"
					popupTransition={{ classNames: animateClassNames, timeout: 300 }}
					text="popupTransition"
				/>
			</div>
		);
	}
}
