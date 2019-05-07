import React from 'react';
import Loading from '../../components/Loading';
import Unlink from '../../components/Unlink';
import styles from './styles';
import { generateSummary, getRandomText } from '../../api/home';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      originalText: '',
      summary: '',
      inputTips: '',
      loading: false,
      error: false
    };

    this.toTry = this.toTry.bind(this);
    this.toGetRandomText = this.toGetRandomText.bind(this);
    this.toClearTextarea = this.toClearTextarea.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.toCheckInput = this.toCheckInput.bind(this);
    this.toSubmit = this.toSubmit.bind(this);
  }

  toTry() {
    window.scrollTo(0, this.refs.demo.offsetTop);
  }

  async toGetRandomText() {
    try {
      const { text } = await getRandomText();
      this.setState({
        originalText: text,
        inputTips: ''
      });
    } catch ({ info = '未知错误，请稍候再试！' }) {
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  toClearTextarea() {
    this.setState({
      originalText: ''
    })
  }

  handleTextareaChange(e) {
    this.setState({
      inputTips: '',
      originalText: e.target.value
    })
  }

  toCheckInput(text) {
    if (!text) {
      this.setState({
        inputTips: '输入不能为空！'
      });
      return false;
    } else if (text.length < 20) {
      this.setState({
        inputTips: '文章不能少于20个字！'
      });
      return false;
    }
    return true;
  }

  async toSubmit() {
    const { originalText } = this.state;

    if (this.toCheckInput(originalText)) {
      this.setState({
        loading: true,
        error: false
      });

      try {
        const { summary } = await generateSummary({
          originalText
        })
        this.setState({
          summary,
          loading: false
        });
      } catch ({ info = '未知错误，请稍候再试！' }) {
        this.setState({
          loading: false,
          error: true
        });
      }
    }
  }

  render() {
    const { originalText, summary, loading, error, inputTips } = this.state;

    return (<div className={styles['home-container']}>
      <div className={styles['banner']}>
        <div className={styles['content']}>
          <div className={styles['title']}>基于TPM模型的自动文本摘要</div>
          <div className={styles['info']}>基于深度语义分析模型，并融入文本的主题信息，自动生成科研文档的摘要，使科研人员通过阅读摘要即能快速准确地获取文档中的重要信息，从而提高分析文档的效率。</div>
          <div className={styles['try-btn']}><button onClick={this.toTry}>试一试</button></div>
        </div>
      </div>
  
      <div className={styles['demo']} ref='demo'>
        <div className={styles['header']}>功能演示</div>
        
        <div className={styles['container']}>
          <div className={styles['input']}>
            <div className={styles['title']}>
              <div>
                <span>请输入一段想分析的科研文章：</span>
                <span className={styles['random-text-link']} onClick={this.toGetRandomText}>随机示例</span>
              </div>
              { originalText.length > 0 && <button className={styles['textarea-clear-btn']} onClick={this.toClearTextarea}>清空输入</button>}
            </div>
            <div className={styles['input-box']}>
              <textarea rows="10" className={styles['nlp-textarea']} value={originalText} onChange={this.handleTextareaChange}></textarea>
            </div>
            { inputTips.length > 0 && <div className={styles['input-tips']}>{inputTips}</div>}
          </div>

          <div className={styles['submit-btn']}><button onClick={this.toSubmit}>开始分析</button></div>

          <div className={styles['result']}>
            <div>分析结果</div>
            { loading && <div className={styles['tips']}><Loading tips='分析中，请稍后'/></div>}
            { error && <div className={styles['tips']}><Unlink tips='服务器异常，建议您稍后体验'/></div> } 
            {!(loading || error) && <div className={styles['result-box']}>{summary}</div>}
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Home;