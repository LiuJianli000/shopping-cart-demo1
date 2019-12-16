import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import FLoatCart from '../components/FloatCart'
import SizeBox from '../components/SizeBox'
import ContentList from '../components/ContentList';

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <FLoatCart />
        <div className={styles.content}>
          <SizeBox/>
          <ContentList/>
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
