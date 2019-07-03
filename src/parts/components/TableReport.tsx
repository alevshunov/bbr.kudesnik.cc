import * as React from 'react';
import styles from './TableReport.scss';
import classNames from 'classnames';

enum Align {
    left = 1,
    right = 2,
    center = 3
}
interface Props<T> {
    cells: Array<{
        title: React.ReactNode | string;
        field: string;
        align?: Align;
        tooltip?: string;
        render?: (item: T) => any,
        userCls?: string,
        hidden?: boolean
    }>;

    data: Array<T> | undefined;
    rowExtraClass?: (obj: T, index: number) => string;
    title?: React.ReactNode | string;
    emptyMessage?: string;
    loadingMessage?: string;
    userCls?: string;
}

class TableReport<T> extends React.Component<Props<T>, {}> {

    constructor(props: Props<T>, context: any) {
        super(props, context);
    }

    render() {
        const cells = this.props.cells.filter(c => !c.hidden);
        return (
            <table className={classNames(styles.table_report, this.props.userCls)}>
                <thead>
                    {this.props.title &&
                        <tr>
                            <th
                                colSpan={cells.length}
                                className={classNames(styles.table_report_cell, styles.header, styles.title)}
                            >
                                {this.props.title}
                            </th>
                        </tr>
                    }
                    <tr className={styles.table_report_row}>
                        {cells.map((cell, index) => (
                            <th
                                className={
                                    classNames(
                                        styles.table_report_cell,
                                        {
                                            [styles.left]: !cell.align || cell.align === Align.left,
                                            [styles.center]: cell.align === Align.center,
                                            [styles.right]: cell.align === Align.right,
                                        },
                                        cell.userCls
                                    )
                                }
                                key={index}
                                title={cell.tooltip}
                            >
                                {cell.title}
                            </th>
                        ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        !this.props.data &&
                        <tr>
                            <td colSpan={cells.length} className={styles.table_report_cell}>
                                {this.props.loadingMessage || 'Загрузка...'}
                            </td>
                        </tr>
                    }
                    {
                        this.props.data && this.props.data.length === 0 &&
                        <tr>
                            <td colSpan={cells.length} className={styles.table_report_cell}>
                                {this.props.emptyMessage || 'Данные отсутствуют'}
                            </td>
                        </tr>
                    }
                    {
                        this.props.data && this.props.data.map((item, index) => (
                            <tr
                                key={index}
                                className={(this.props.rowExtraClass || (() => ''))(item, index)}
                            >
                                {
                                    cells.map((cell, index2) => (
                                        <td
                                            className={
                                                classNames(
                                                    styles.table_report_cell,
                                                    {
                                                        [styles.left]: !cell.align || cell.align === Align.left,
                                                        [styles.center]: cell.align === Align.center,
                                                        [styles.right]: cell.align === Align.right,
                                                    },
                                                    cell.userCls
                                                )
                                            }
                                            key={index2}
                                            title={cell.tooltip}
                                        >
                                            {
                                                cell.field === 'index' && !cell.render ?
                                                    index + 1 :
                                                    (cell.render || ((x) => x[cell.field]))(item)
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

export default TableReport;
export { Align };
