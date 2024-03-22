import { css } from 'lit';

export const tableStyles = css`
.tabulator-row.tabulator-row-even {
    background-color: #fff;
}
.tabulator .tabulator-tableholder {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    overflow-y: auto;
    position: relative;
    white-space: nowrap;
    width: 100%;
}
.tabulator-cell {
    width:"calc(100% - 24px)"
}
`;
