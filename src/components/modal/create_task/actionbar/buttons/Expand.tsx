import { ReactElement } from "react";
import { Cloud, CloudFog } from "lucide-react";
import { useCallbackOnKetPressed } from "../../../../obsidian/wrapper/menu/utils";

export interface ExpandComponentProps {
	onClick: () => void;
	isExpanded: boolean;
}

export function ExpandComponent(props: ExpandComponentProps): ReactElement {
	return (
		<div
			className="quick-actions-icon"
			tabIndex={0}
			role="button"
			onClick={props.onClick}
			onKeyDown={useCallbackOnKetPressed(event => props.onClick())}
		>
      <span>
        {props.isExpanded ? <Cloud height={18}/> : <CloudFog height={18}/>}
      </span>
		</div>
	);
}
