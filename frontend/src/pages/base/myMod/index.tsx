/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: 李洪文
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2020-04-01 12:20:23
 */
import { useCallback, useEffect, useState } from 'react';
import CustomTable from '@/components/CustomTable';
import FileAddOutlined from '@ant-design/icons/FileAddOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import GroupOutlined from '@ant-design/icons/GroupOutlined';
import SearchFilter from './SearchFilter';
import { Divider, message, Modal } from 'antd';
import { ButtonItem } from '@/data-type/common';
import { DEFAULT_SEARCH_PROPS, DEFAULT_PAGE_DATA } from '@/constants';
import InputDialog from './InputDialog';
export default function AccountingPage() {
  const [searchProps, changeSearchProps] = useState<defs.AccountingQueryDTO>({
    ...DEFAULT_SEARCH_PROPS,
  });
  // const [searchProps1, changeSearchProps1] = useState<defs.MonthQueryDTO>({
  //   ...DEFAULT_SEARCH_PROPS,
  // });
/////////////////
  const [pageData, setPageData] = useState<defs.Page<defs.AccountingVO>>(
    DEFAULT_PAGE_DATA,
  );
  const [selectedRowKeys, selectRow] = useState<number[] | string[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounting, setAccounting] = useState<defs.AccountingDTO | undefined>(
    undefined,
  );

  const fetchList = useCallback((props) => {
    setLoading(true);
    API.accounting.list.request({}, props).then((data) => {
      setLoading(false);
      data && setPageData(data);
    });
  }, []);
  useEffect(() => {
    if (!pageData.total) {
      fetchList(searchProps);
      // fetchList1(searchProps1);
    }
  }, []);

  const columns = [
    { title: '组ID', width: 30, dataIndex: 'id' },
    {
      title: '账目名称',
      width: 60,
      dataIndex: 'accountingName',
      render: (v: string, record: defs.AccountingVO) => {
        return (
          <a
            onClick={() => {
              setAccounting({ ...record });
              setVisible(true);
            }}
          >
            <GroupOutlined />
            <span style={{ marginLeft: 5 }}>{v}</span>
          </a>
        );
      },
    },
    { title: '描述', width: 60,dataIndex: 'description' },
    { title: '创建时间', width: 80, dataIndex: 'createdAt' },
    { title: '创建人', width: 50, dataIndex: 'createdBy' },
    { title: '更新时间', width: 200, dataIndex: 'updatedAt' },
    {
      title: '操作',
      width: 120,
      render: (_: any, record: defs.AccountingVO) => (
        <>
          <a
            onClick={() => {
              setAccounting({ ...record });
              setVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDelete([`${record.id}`]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  const handleDelete = async (ids: string[] | number[]) => {
    const modal = Modal.confirm({
      centered: true,
      title: `您确定要删除选定的${ids.length}个资源组吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const success = await API.accounting.remove.request(
          {},
          ids as number[],
        );
        if (success) {
          message.success("删除成功！")
          fetchList({
            ...searchProps,
            page: 1,
          });
          // fetchList1({
          //   ...searchProps1,
          //   page: 1,
          // });
          selectRow([]);
        }
      },
    });
  };

  const handleSave = (values: defs.AccountingDTO) => {
    let result: Promise<number>;
    if (accounting?.id) {
      result = API.accounting.update.request(
        {},
        {
          id: accounting.id,
          ...values,
        },
      );
    } else {
      result = API.accounting.add.request({}, values);
    }
    result.then(() => {
      setVisible(false);
      message.success('保存成功！');
      fetchList({
        ...searchProps,
      });
      // fetchList1({
      //   ...searchProps1,
      // });
    });
  };

  const buttons: ButtonItem[] = [
    {
      text: '新增',
      icon: <FileAddOutlined />,
      type: 'primary',
      onClick: () => {
        setAccounting(undefined);
        setVisible(true);
      },
    },
    {
      text: '删除',
      icon: <DeleteOutlined />,
      disabled: selectedRowKeys.length === 0,
      type: 'primary',
      onClick: () => handleDelete(selectedRowKeys),
    },
  ];
  const { list, page, total } = pageData;
  return (
    <>
      <CustomTable
        loading={loading}
        columns={columns}
        buttons={buttons}
        dataSource={list || []}//转义原则
        current={page}
        size="middle"
        total={total}
        genRowKey={(record: defs.AccountingVO) => `${record.id}`}
        onPagination={(current: number) => {
          const newSearchProps = {
            ...searchProps,
            page: current,
          };
          // const newSearchProps1 = {
          //   ...searchProps1,
          //   page: current,
          // };
          changeSearchProps(newSearchProps);
          // changeSearchProps1(newSearchProps1);
          fetchList(newSearchProps);
          // fetchList1(newSearchProps1);
        }}
        rowSelection={{
          columnTitle: '选择',
          columnWidth: 50,
          selectedRowKeys,
          onChange: (keys: string[]) => selectRow(keys),
        }}
      >
        <SearchFilter
          searchProps={searchProps}
          changeSearchProps={(props) => {
            changeSearchProps({
              ...searchProps,
              ...props,
            });
          }}
          onSearch={() => {
            fetchList(searchProps);
          }}
          />
          
      </CustomTable>

      <InputDialog
        visible={visible}
        detailData={accounting}
        onClose={() => setVisible(false)}
        onSubmit={handleSave}
      />
    </>
  );
}
