import { Table, TableProps, Typography } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { ReactNode } from 'react';

const { Text } = Typography;

interface StandardTableProps<T> extends TableProps<T> {
  loading?: boolean;
  emptyText?: ReactNode;
  pagination?: false | TablePaginationConfig;

}

export function StandardTable<T extends object>({
  dataSource,
  rowSelection,
  columns,
  loading = false,
  title,
  emptyText = 'Nenhum registro encontrado.',
  pagination = false,
  ...rest
}: StandardTableProps<T>) {
  return (
    <Table<T>
      
      title={title}
      rowKey={(record) => (record as any).id ?? JSON.stringify(record)}
      dataSource={dataSource}
      rowSelection ={rowSelection}
      columns={columns}
      loading={loading}
      pagination={pagination} 
      locale={{ emptyText: <Text type="secondary">{emptyText}</Text> }}
      size="small"
      {...rest}
    />
  );
}
