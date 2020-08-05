import React from "react";
import Trigger, { TriggerProps, feedbackToPlacement, Feedback } from "react-widget-trigger";
import offset from "dom-helpers-extra/offset";

export const version = "%VERSION%";
export interface TooltipProps
	extends Omit<
		TriggerProps,
		| "popup"
		| "defaultPopupVisible"
		| "popupVisible"
		| "destroyPopupOnHide"
		| "action"
		| "popupTransition"
		| "adjustPosition"
	> {
	/** 提示文字 */
	title?: React.ReactNode | (() => React.ReactNode);
	/** 提示框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom */
	placement?: TriggerProps["placement"];
	/** 默认是否显隐 */
	defaultVisible?: boolean;
	/** 用于手动控制浮层显隐，受控 */
	visible?: boolean;
	// TODO:
	// color?: string;
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
	role?: string;
}

export interface TooltipState {}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
	static defaultProps: TooltipProps = {
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
			timeout: 290,
			// addEndListener(node: HTMLElement, cb: () => void) {
			// 	const next = () => {
			// 		node.removeEventListener("animationend", next);
			// 		cb();
			// 	};
			// 	node.addEventListener("animationend", next);
			// },
		},
		role: "tooltip",
	};

	arrowRef: React.RefObject<HTMLDivElement> = React.createRef();
	triggerRef: React.RefObject<Trigger> = React.createRef();
	feedback: Feedback | null;

	adjustArrowPosition = () => {
		const feedback = this.feedback;

		if (!feedback) return;

		const { visibleArrow, keepArrowAtCenter } = this.props;
		if (!visibleArrow) return;
		if (!this.triggerRef.current) return;

		const arrowNode = this.arrowRef.current;
		if (!arrowNode) return;

		//reset
		arrowNode.style.left = "";
		arrowNode.style.top = "";

		if (!keepArrowAtCenter) return;

		const triggerNode = this.triggerRef.current.getTriggerNode();
		const popupNode = this.triggerRef.current.getPopupNode() as HTMLDivElement;

		const placement = feedbackToPlacement(feedback);

		const triggerWidth = triggerNode.offsetWidth;
		const triggerHeight = triggerNode.offsetHeight;
		const popupWidth = popupNode.offsetWidth;
		const popupHeight = popupNode.offsetHeight;

		const rect = triggerNode.getBoundingClientRect();

		if (/^(top|bottom)/.test(placement)) {
			if (triggerWidth > popupWidth) {
				arrowNode.style.left = "50%";
			} else {
				const m = rect.left + triggerWidth / 2 - arrowNode.offsetWidth / 2;
				offset(arrowNode, {
					left: m,
				});
			}
		} else {
			if (triggerHeight > popupHeight) {
				arrowNode.style.top = "50%";
			} else {
				const m = rect.top + triggerHeight / 2 - arrowNode.offsetHeight / 2;
				offset(arrowNode, {
					top: m,
				});
			}
		}

		//reset
		this.feedback = null;
	};

	saveFeedback: TriggerProps["adjustPosition"] = (_, __, feedback) => {
		this.feedback = feedback;
	};

	componentDidMount() {
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		this.adjustArrowPosition();
	}

	getPopup = () => {
		const { prefixCls, title, visibleArrow, role } = this.props;

		const titleNode = typeof title === "function" ? title() : title;

		return (
			<>
				{visibleArrow ? (
					<div className={`${prefixCls}-arrow`} ref={this.arrowRef}></div>
				) : null}
				<div className={`${prefixCls}-inner`} role={role}>
					{titleNode}
				</div>
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
			visibleArrow,
			keepArrowAtCenter,
			destroyTooltipOnHide,
			transition,
			role,
			// color,
			...restProps
		} = this.props;

		return (
			<Trigger
				{...restProps}
				ref={this.triggerRef}
				popupTransition={transition}
				action={trigger}
				adjustPosition={this.saveFeedback}
				offset={visibleArrow ? offset! + arrowSize! : offset}
				destroyPopupOnHide={destroyTooltipOnHide}
				defaultPopupVisible={defaultVisible}
				popupVisible={visible}
				popup={this.getPopup}
			/>
		);
	}
}

export default Tooltip;
