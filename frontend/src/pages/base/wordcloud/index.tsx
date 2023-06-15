import {WordCloud} from '@ant-design/plots';
import { useEffect, useState, useCallback} from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import WordCloudSearchFilter from './Filter';
export const interval = 5000;
export const MAX_MONITOR_RECORD_SIZE = 20;

export default function Component() {

  const [searchProps, changeSearchProps] = useState<defs.WordCloudQueryDTO>({
    //默认先出图2022
  });
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<defs.Select<defs.WordCloudVO>>(
  );

// 返数据
  const timeselect = useCallback((props: defs.WordCloudQueryDTO) => {
    setLoading(true);
    API.accounting.wordCloud.request({},props).then((data) => {
      setLoading(false);
      data && setPageData(data);
    });
  }, []);

  useEffect(() => {
    //默认先出图2022
    timeselect({accountingName : '花',});
  }, []);

  function tf2twoline(list0:defs.Select<defs.WordCloudVO>|undefined){
    let data: any;
    if(list0){
      data=pageData?.list!?.map(item=>{return{name:item.accountingName, money:item.description}})
    };
    if(!list0){
      data=[
      { 
        name: '0',
        money: 0 
      },
    ];}
    return data;
  };
  const data = tf2twoline(pageData);

  const config_wordcloud = {
    data,
    wordField: 'name',
    weightField: 'money',
    color: '#122c6b',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [24, 80],
    },
    // 设置交互类型
    interactions: [
      {
        type: 'element-active',
      },
    ],
    state: {
      active: {
        // 这里可以设置 active 时的样式
        style: {
          lineWidth: 3,
        },
      },
    },
  };
  return (
      <>
      <WordCloudSearchFilter
            searchProps={searchProps}
            changeSearchProps={(props: defs.WordCloudQueryDTO): void => {
              changeSearchProps({
                ...searchProps,
                ...props,
              });
            }}
            onSearch={() => {
              timeselect(searchProps);
            } } 
          />
            <div><WordCloud {...config_wordcloud} />;</div>
    </>
//报错但是正常工作？？？
  );
}