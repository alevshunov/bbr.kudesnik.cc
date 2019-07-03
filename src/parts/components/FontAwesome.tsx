import fa from 'font-awesome/scss/font-awesome.scss';
import classNames from 'classnames';

export default {
    lock: classNames(fa.fa, fa['fa-lock']),
    unlock: classNames(fa.fa, fa['fa-unlock']),
    minus: classNames(fa.fa, fa['fa-minus-circle']),
    plus: classNames(fa.fa, fa['fa-plus-circle']),
    clear: classNames(fa.fa, fa['fa-times-circle'])
};