import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faEdit,
  faSearch,
  faCog,
  faThumbsUp,
  faThumbsDown,
  faPlus,
  faMinus,
  faTrash,
  faTimes,
  faHashtag,
  faUserEdit,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faEdit,
  faSearch,
  faCog,
  faThumbsUp,
  faThumbsDown,
  faPlus,
  faMinus,
  faTrash,
  faTimes,
  faHashtag,
  faUserEdit,
  faChevronRight
);
Vue.component('font-awesome-icon', FontAwesomeIcon);