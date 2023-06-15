import { Input } from 'antd';
import styles from '@/styles/search-filter.less';
interface WordCloudSearchFilterProps {
  onSearch: () => void;
  searchProps: defs.WordCloudQueryDTO;
  changeSearchProps: (searchProps: defs.WordCloudQueryDTO) => void;
}

  export default function WordCloudSearchFilter(props: WordCloudSearchFilterProps) {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>分类：</span>
        <Input.Search
          allowClear={true}
          value={props.searchProps.accountingName}
          onSearch={props.onSearch}
          onChange={(e) =>
            props.changeSearchProps({
              accountingName: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
