import { Input } from 'antd';
import styles from '@/styles/search-filter.less';
interface TimeSearchFilterProps {
  onSearch: () => void;
  searchProps: defs.TimeQueryDTO;
  changeSearchProps: (searchProps: defs.TimeQueryDTO) => void;
}

  export default function TimeSearchFilter(props: TimeSearchFilterProps) {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterItem}>
        <span className={styles.label}>年份：</span>
        <Input.Search
          allowClear={true}
          value={props.searchProps.year}
          onSearch={props.onSearch}
          onChange={(e) =>
            props.changeSearchProps({
              year: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
