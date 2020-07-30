import React from "react";
import classnames from "classnames";
import Trigger, { TriggerProps } from "react-widget-trigger";

export interface TooltipProps
	extends Omit<TriggerProps, "popup" | "defaultPopupVisible" | "popupVisible"> {
	title?: React.ReactNode | (() => React.ReactNode);
	content?: React.ReactNode | (() => React.ReactNode);
	defaultVisible?: boolean;
	visible?: boolean;

	color?: string;

	placement?: any;
	trigger?: any;

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
		arrowSize: 8,
		offset: 0,
	};

	isEmptyTitle(title: any) {
		return title == null || title === "" || title === false;
	}

	getPopup = () => {
		const { prefixCls, title, content, visibieArrow } = this.props;

		const titleNode = typeof title === "function" ? title() : title;

		return (
			<>
				{visibieArrow ? (
					<div className={`${prefixCls}-arrow`}>
						<span className={`${prefixCls}-arrow-content`}></span>
					</div>
				) : null}
				<div className={`${prefixCls}-inner`}>
					{this.isEmptyTitle(titleNode) ? null : (
						<div className={`${prefixCls}-title`}>{titleNode}</div>
					)}
					<div className={`${prefixCls}-content`}>
						{typeof content === "function" ? content() : content}
					</div>
				</div>
			</>
		);
	};

	render() {
		const {
			title,
			content,
			visible,
			defaultVisible,
			placement,
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
				// action={trigger}
				offset={visibieArrow ? offset! + arrowSize! : offset}
				defaultPopupVisible={defaultVisible}
				popupVisible={visible}
				popup={this.getPopup}
			/>
		);
	}
}

export default Tooltip;
