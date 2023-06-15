import { Column, Line, Pie, WordCloud} from '@ant-design/plots';
import { useEffect, useState, useCallback} from 'react';
import {Collapse} from 'antd';
const { Panel } = Collapse;
import TimeSearchFilter from './Filter';
export const interval = 5000;
export const MAX_MONITOR_RECORD_SIZE = 20;
import ReactDOM from 'react-dom';

export default function Component() {

  const [searchProps, changeSearchProps] = useState<defs.TimeQueryDTO>({
    //默认先出图2022
    year : 2022,
  });
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<defs.Select<defs.TimeSelectVO>>(
  );

// 返数据
  const timeselect = useCallback((props: defs.TimeQueryDTO) => {
    setLoading(true);
    API.accounting.timeSelect.request({},props).then((data) => {
      setLoading(false);
      data && setPageData(data);
    });
  }, []);

  useEffect(() => {
    //默认先出图2022
    timeselect({year : 2022,});
  }, []);


  function tf2twoline(list0:defs.Select<defs.TimeSelectVO>|undefined){
    let data: any;
    if(list0){
      data=pageData?.list!?.map(item=>{return{month:item.updatedAt, money:item.description}})
    };
    if(!list0){
      data=[
      { 
        month: '0',
        money: 0 
      },
    ];}
    return data;
  };

  const data = tf2twoline(pageData);

  const config0 = {
    appendPadding: 20,
    data,
    angleField: 'money',
    colorField: 'month',
    radius: 1,
    label: {
      type: 'inner',
      offset: '30%',
      style: {
        fontSize: 20,
        textAlign: 'center',
      },
    },
  };
  const config1 = {
    data,
    xField: 'month',
    yField: 'money',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '月度',
      },
      sales: {
        alias: '账单总额',
      },
    },
  };
  const config2 = {
    data,
    padding: 'auto',
    xField: 'month',
    yField: 'money',
    xAxis: {
      tickCount: 12,
    },
  };
  // const config3 = {
  //   data,
  //   xField: 'year',
  //   yField: 'gdp',
  //   seriesField: 'name',
  //   yAxis: {
  //     label: {
  //       formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
  //     },
  //   },
  //   legend: {
  //     position: 'top',
  //   },
  //   smooth: true,
  //   // @TODO 后续会换一种动画方式
  //   animation: {
  //     appear: {
  //       animation: 'path-in',
  //       duration: 5000,
  //     },
  //   },
  // };
  return (
      <>
      <TimeSearchFilter
            searchProps={searchProps}
            changeSearchProps={(props: defs.TimeQueryDTO): void => {
              changeSearchProps({
                ...searchProps,
                ...props,
              });
            }}
            onSearch={() => {
              timeselect(searchProps);
            } } 
          />

        <Collapse defaultActiveKey={['0']}>
          <Panel header="饼图" key="1">
          <div><Pie {...config0} /></div>
            </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['0']}>
          <Panel header="条形统计图" key="1">
            <div><Column {...config1} />;</div>
            </Panel> 
        </Collapse>
        <Collapse defaultActiveKey={['0']}>
          <Panel header="折线统计图" key="1">

            <div><Line {...config2} />;</div>
            </Panel>
        </Collapse>
    </>
//报错但是正常工作？？？
  );
}