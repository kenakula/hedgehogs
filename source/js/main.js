import {ieFix} from './utils/ie-fix';
import {iosVhFix} from './utils/ios-vh-fix';

import {initModals} from './modules/init-modals';
import {toggler} from './modules/toggler';
import {slider} from './modules/slider';
import {pageScroll} from './modules/page-scroll';
import {formsValidation} from './modules/form-validation';
import {cardTooltip} from './modules/card-tooltip';

// Utils
// ---------------------------------

ieFix();
iosVhFix();

// Modules
// ---------------------------------

initModals();
toggler();
slider();
pageScroll();
formsValidation();
cardTooltip();
