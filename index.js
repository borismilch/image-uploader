import {upload} from './sourse/uploader.js';

import './sourse/style.scss';

upload('#input', {
    multi : true,
    b1Text : 'opening',
    b2Text : 'uploading',
    accept : ['.png', '.jpeg', '.jpg', '.psd']
})