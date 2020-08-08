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
		<Tooltip title={"-----" + props.placement + "-----"} {...props}>
			<button>{props.placement}</button>
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
				<TooltipButton placement="bottomLeft" />
				<TooltipButton placement="bottom" />
				<TooltipButton placement="bottomRight" />
				<hr />
				<TooltipButton placement="topLeft" />
				<TooltipButton placement="top" />
				<TooltipButton placement="topRight" />
				<hr />
				<TooltipButton placement="leftTop" />
				<br />
				<TooltipButton placement="left" />
				<br />
				<TooltipButton placement="leftBottom" />
				<hr />
				<TooltipButton placement="rightTop" />
				<br />
				<TooltipButton placement="right" defaultVisible />
				<br />
				<TooltipButton placement="rightBottom" />
			</div>
		);
	}
}
