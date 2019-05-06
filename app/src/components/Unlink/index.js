import React from 'react';
import styles from './styles';
import unlinkImgUrl from '../../assets/images/unlink.svg';

export default ({tips='链接异常，请稍候再试'}) => <div className={styles['unlink']}>
  <div className={styles['img']}><img src={unlinkImgUrl} /></div>
  <div className={styles['tips']}>{tips}</div>
</div>;