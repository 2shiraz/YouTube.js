import Text from './misc/Text.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import { YTNode } from '../helpers.js';
class ToggleButton extends YTNode {
    constructor(data) {
        super();
        this.text = new Text(data.defaultText);
        this.toggled_text = new Text(data.toggledText);
        this.tooltip = data.defaultTooltip;
        this.toggled_tooltip = data.toggledTooltip;
        this.is_toggled = data.isToggled;
        this.is_disabled = data.isDisabled;
        this.icon_type = data.defaultIcon?.iconType;
        const acc_label = data?.defaultText?.accessibility?.accessibilityData?.label ||
            data?.accessibilityData?.accessibilityData?.label ||
            data?.accessibility?.label;
        if (this.icon_type == 'LIKE') {
            this.like_count = parseInt(acc_label.replace(/\D/g, ''));
            this.short_like_count = new Text(data.defaultText).toString();
        }
        this.endpoint =
            data.defaultServiceEndpoint?.commandExecutorCommand?.commands ?
                new NavigationEndpoint(data.defaultServiceEndpoint.commandExecutorCommand.commands.pop()) :
                new NavigationEndpoint(data.defaultServiceEndpoint);
        this.toggled_endpoint = new NavigationEndpoint(data.toggledServiceEndpoint);
        if (Reflect.has(data, 'toggleButtonSupportedData') && Reflect.has(data.toggleButtonSupportedData, 'toggleButtonIdData')) {
            this.button_id = data.toggleButtonSupportedData.toggleButtonIdData.id;
        }
        if (Reflect.has(data, 'targetId')) {
            this.target_id = data.targetId;
        }
    }
}
ToggleButton.type = 'ToggleButton';
export default ToggleButton;
//# sourceMappingURL=ToggleButton.js.map