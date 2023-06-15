import { Button, Input } from 'antd';
import styles from '@/styles/search-filter.less';
import React from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { DatePicker, Space } from 'antd';

// const App: React.FC = () => (
//   <Space direction="vertical" size={12}>
//     <RangePicker />
//   </Space>
// );


interface SearchFilterProps {
  onSearch: () => void;
  searchProps: defs.AccountingQueryDTO;
  changeSearchProps: (searchProps: defs.AccountingQueryDTO) => void;
}

// interface TimeSearchFilterProps {
//   onSearch: () => void;
//   searchProps: defs.TimeQueryDTO;
//   changeSearchProps: (searchProps: defs.TimeQueryDTO) => void;
// }
// export default function SearchFilter(props: SearchFilterProps, timeprops: TimeSearchFilterProps) {
export default class SearchFilter extends React.PureComponent<SearchFilterProps> {
  render() {
    const { searchProps, onSearch, changeSearchProps } = this.props;
  return (
    <>
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>账单：</span>
        <Input.Search
          enterButton={false} 
          allowClear={true}
          placeholder="账目名"
          value={searchProps.accountingName}
          onSearch={onSearch}
          onChange={(e) =>
            changeSearchProps({
              accountingName: e.target.value,
            })
          }
        />
      </div>
    </div>
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>年：</span>
        <Input.Search
          allowClear={true}
          placeholder="年"
          value={searchProps.year}
          onSearch={onSearch}
          onChange={(e) =>
            changeSearchProps({
              year: e.target.value,
            })
          }
        />
      </div>
      </div>
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>起始年：</span>
        <Input.Search
          allowClear={true}
          placeholder="更新时间-年"
          value={searchProps.beginYear}
          onSearch={onSearch}
          onChange={(e) =>
            changeSearchProps({
                            //虽然格式报错，但是效果正确？？
              beginYear: e.target.value,
            })
          }
        />
      </div>
    </div>
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>终止年：</span>
        <Input.Search
          allowClear={true}
          placeholder="更新时间-年"
          value={searchProps.endYear}
          onSearch={onSearch}
          onChange={(e) =>
            changeSearchProps({
              //虽然格式报错，但是效果正确？？
              endYear: e.target.value,
            })
          }
        />
      </div>
    </div>
    <div>
      <Button type="dashed" 
        shape='round' 
        size= 'middle' 
        icon={<SearchOutlined/>}
        onClick={onSearch}>
        </Button>
    </div>
  </>
  );
}}
