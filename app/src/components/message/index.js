import React from 'react';
import { render } from 'react-dom';
import styles from './styles';
import successImgUrl from '../../assets/images/success.svg';
import errorImgUrl from '../../assets/images/error.svg';
import warningImgUrl from '../../assets/images/warning.svg';

const imgMap = {
  'success': successImgUrl,
  'error': errorImgUrl,
  'warning': warningImgUrl
};

const messageQueue = [];
const bodyContainer = document.getElementById('container');

const close = messageId => {
  //移除节点
  const wrap = document.getElementById('message-wrap');
  wrap && wrap.removeChild(document.getElementById(messageId));

  //移除数组中的id
  const idx = messageQueue.indexOf(messageId);
  idx > -1 && messageQueue.splice(idx, 1);

  //移除最外层的容器
  if(messageQueue.length === 0) {
    wrap && bodyContainer.removeChild(wrap);
  }
};

const generate = (type, tips) => {
  //创建或获取最外层容器
  let wrap = null;
  if(messageQueue.length === 0) {
    wrap = document.createElement('div');
    wrap.id = 'message-wrap';
    wrap.className = styles['message-wrap'];
    bodyContainer.appendChild(wrap);
  } else {
    wrap = document.getElementById('message-wrap');
  }

  //数组保存单个消息容器的id
  const messageId = `${type}-${new Date().getTime()}`;
  messageQueue.push(messageId);

  //将单个消息渲染到最外层的容器中
  const mesContainer = document.createElement('div');
  mesContainer.id = messageId;
  mesContainer.className = styles['message-container'];
  wrap && wrap.appendChild(mesContainer);
  const mesChildren = [
    <div key='image' className={styles['img']}><img src={imgMap[type]} /></div>,
    <div key='tips' className={styles['tips']}>{tips}</div>
  ];
  render(mesChildren, mesContainer);

  //定时关闭消息框
  setTimeout(() => close(messageId), 2000);
};

export default {
  success: tips => generate('success', tips),
  error: tips => generate('error', tips),
  warning: tips => generate('warning', tips)
};