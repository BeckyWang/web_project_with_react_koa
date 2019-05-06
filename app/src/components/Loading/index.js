import React from 'react';
import styles from './styles';
import loadingImgUrl from '../../assets/images/loading.svg';

export default ({tips='加载中，请稍后'}) => <div className={styles['loading']}>
  <div className={styles['img']}><img src={loadingImgUrl} /></div>
  <div className={styles['tips']}>{tips}</div>
</div>;