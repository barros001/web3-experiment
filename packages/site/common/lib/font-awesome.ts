import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import {
  faSpinner,
  faChevronDown,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faEthereum } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;

library.add(faSpinner, faGithub, faChevronDown, faBars, faXmark, faEthereum);
