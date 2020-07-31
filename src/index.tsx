import React from "react";
import { findDOMNode } from "react-dom";
import Trigger, { TriggerProps, feedbackToPlacement } from "react-widget-trigger";

export interface TooltipProps
	extends Omit<TriggerProps, "popup" | "defaultPopupVisible" | "popupVisible"> {
	title?: React.ReactNode | (() => React.ReactNode);
	defaultVisible?: boolean;
	visible?: boolean;

	color?: string;

	trigger?: TriggerProps["action"];

	offset?: number;

	visibieArrow?: boolean;
	arrowSize?: number;
	keepArrowAtCenter?: boolean;

	onVisibleChange?: (visible: boolean) => void;
}

export interface TooltipState {}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
	static defaultProps: TooltipProps = {
		prefixCls: "rw-tooltip",
		defaultVisible: false,
		visibieArrow: true,
		arrowSize: 6,
		offset: 0,
		keepArrowAtCenter: false,
	};

	arrowRef: React.RefObject<HTMLDivElement> = React.createRef();
	triggerRef: React.RefObject<Trigger> = React.createRef();

	adjustArrowPosition: TriggerProps["adjustPosition"] = (_, pos, feedback) => {
		const { visibieArrow } = this.props;
		if (!visibieArrow) return;
		if (!this.triggerRef.current) return;

		const arrowNode = this.arrowRef.current;
		if (!arrowNode) return;

		const triggerNode = this.triggerRef.current.getTriggerNode();
		const popupNode = this.triggerRef.current.getPopupNode() as HTMLDivElement;

		const placement = feedbackToPlacement(feedback);

		const triggerWidth = triggerNode.offsetWidth;
		const triggerHeight = triggerNode.offsetHeight;
		const popupWidth = popupNode.offsetWidth;
		const popupHeight = popupNode.offsetHeight;

		console.log(placement);

		if (/^(top|bottom)/.test(placement)) {
			if (triggerWidth > popupWidth) {
				arrowNode.style.top = "";
				arrowNode.style.marginTop = "";
				arrowNode.style.left = "50%";
				arrowNode.style.marginLeft = `-${arrowNode.offsetWidth / 2}px`;
			} else {
				//TODO
			}
		} else {
			if (triggerHeight > popupHeight) {
				arrowNode.style.left = "";
				arrowNode.style.marginLeft = "";
				arrowNode.style.top = "50%";
				arrowNode.style.marginTop = `-${arrowNode.offsetHeight / 2}px`;
			} else {
				//TODO
			}
		}
	};

	getPopup = () => {
		const { prefixCls, title, visibieArrow } = this.props;

		const titleNode = typeof title === "function" ? title() : title;

		return (
			<>
				{visibieArrow ? (
					<div className={`${prefixCls}-arrow`} ref={this.arrowRef}></div>
				) : null}
				<div className={`${prefixCls}-inner`}>{titleNode}</div>
			</>
		);
	};

	render() {
		const {
			title,
			visible,
			defaultVisible,
			trigger,
			arrowSize,
			offset,
			visibieArrow,
			keepArrowAtCenter,
			color,
			...restProps
		} = this.props;

		return (
			<Trigger
				{...restProps}
				ref={this.triggerRef}
				adjustPosition={keepArrowAtCenter ? this.adjustArrowPosition : undefined}
				offset={visibieArrow ? offset! + arrowSize! : offset}
				defaultPopupVisible={defaultVisible}
				popupVisible={visible}
				popup={this.getPopup}
			/>
		);
	}
}

export default Tooltip;
