import { LitElement, html, css } from 'lit';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

class listviewElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-listviewer',
      fallbackDisableSubmit: false,
      description: 'Display a list of records',
      iconUrl: "group-control",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dataobject: {
          type: 'string',
          title: 'DSV Object JSON',
          description: 'Insert the DSV JSON string for your list of records.'
        },
        listURL: {
          type: 'string',
          title: 'List URL',
          description: 'The URL of the list used in the DSV, for this to work you need to ensure ID is returned in the DSV data'
        },
        pageItemLimit: {
          type: 'string',
          enum: ['5', '10', '15', '30', '50', '100'],
          title: 'Page Item Limit',
          description: 'Number of items to show per page',
          defaultValue: '5',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static styles = css`
  .tabulator{position:relative;border:1px solid #dee2e6;font-size:16px;text-align:left;overflow:hidden;-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0)}.tabulator[tabulator-layout=fitDataFill] .tabulator-tableholder .tabulator-table{min-width:100%}.tabulator[tabulator-layout=fitDataTable]{display:inline-block}.tabulator.tabulator-block-select{user-select:none}.tabulator .tabulator-header{position:relative;box-sizing:border-box;width:100%;border-bottom:1px solid #dee2e6;background-color:#fff;color:#555;font-weight:700;white-space:nowrap;overflow:hidden;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none}.tabulator .tabulator-header.tabulator-header-hidden{display:none}.tabulator .tabulator-header .tabulator-header-contents{position:relative;overflow:hidden}.tabulator .tabulator-header .tabulator-header-contents .tabulator-headers{display:inline-block}.tabulator .tabulator-header .tabulator-col{display:inline-flex;position:relative;box-sizing:border-box;flex-direction:column;justify-content:flex-start;border-right:1px solid #aaa;background:#fff;text-align:left;vertical-align:bottom;overflow:hidden}.tabulator .tabulator-header .tabulator-col.tabulator-moving{position:absolute;border:1px solid #dee2e6;background:#e6e6e6;pointer-events:none}.tabulator .tabulator-header .tabulator-col .tabulator-col-content{box-sizing:border-box;position:relative;padding:4px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-header-popup-button{padding:0 8px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-header-popup-button:hover{cursor:pointer;opacity:.6}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title-holder{position:relative}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title{box-sizing:border-box;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:bottom}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title.tabulator-col-title-wrap{white-space:normal;text-overflow:clip}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title .tabulator-title-editor{box-sizing:border-box;width:100%;border:1px solid #999;padding:1px;background:#fff}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title .tabulator-header-popup-button+.tabulator-title-editor{width:calc(100% - 22px)}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter{display:flex;align-items:center;position:absolute;top:0;bottom:0;right:4px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #bbb}.tabulator .tabulator-header .tabulator-col.tabulator-col-group .tabulator-col-group-cols{position:relative;display:flex;border-top:1px solid #aaa;overflow:hidden;margin-right:-1px}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter{position:relative;box-sizing:border-box;margin-top:2px;width:100%;text-align:center}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter textarea{height:auto!important}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter svg{margin-top:3px}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter input::-ms-clear{width:0;height:0}.tabulator .tabulator-header .tabulator-col.tabulator-sortable .tabulator-col-title{padding-right:25px}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-header .tabulator-col.tabulator-sortable.tabulator-col-sorter-element:hover{cursor:pointer;background-color:#e6e6e6}}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-col-sorter{color:#bbb}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-col-sorter.tabulator-col-sorter-element .tabulator-arrow:hover{cursor:pointer;border-bottom:6px solid #555}}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{border-top:none;border-bottom:6px solid #bbb}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=ascending] .tabulator-col-content .tabulator-col-sorter{color:#666}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=ascending] .tabulator-col-content .tabulator-col-sorter.tabulator-col-sorter-element .tabulator-arrow:hover{cursor:pointer;border-bottom:6px solid #555}}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=ascending] .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{border-top:none;border-bottom:6px solid #666}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=descending] .tabulator-col-content .tabulator-col-sorter{color:#666}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=descending] .tabulator-col-content .tabulator-col-sorter.tabulator-col-sorter-element .tabulator-arrow:hover{cursor:pointer;border-top:6px solid #555}}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=descending] .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{border-bottom:none;border-top:6px solid #666;color:#666}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical .tabulator-col-content .tabulator-col-title{writing-mode:vertical-rl;text-orientation:mixed;display:flex;align-items:center;justify-content:center}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-col-vertical-flip .tabulator-col-title{transform:rotate(180deg)}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-sortable .tabulator-col-title{padding-right:0;padding-top:20px}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-sortable.tabulator-col-vertical-flip .tabulator-col-title{padding-right:0;padding-bottom:20px}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-sortable .tabulator-col-sorter{justify-content:center;left:0;right:0;top:4px;bottom:auto}.tabulator .tabulator-header .tabulator-frozen{position:sticky;left:0;z-index:10}.tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-left{border-right:2px solid #dee2e6}.tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-right{border-left:2px solid #dee2e6}.tabulator .tabulator-header .tabulator-calcs-holder{box-sizing:border-box;background:#fff!important;border-top:1px solid #dee2e6;border-bottom:1px solid #aaa}.tabulator .tabulator-header .tabulator-calcs-holder .tabulator-row{background:#fff!important}.tabulator .tabulator-header .tabulator-calcs-holder .tabulator-row .tabulator-col-resize-handle,.tabulator .tabulator-header .tabulator-frozen-rows-holder:empty{display:none}.tabulator .tabulator-tableholder{position:relative;width:100%;white-space:nowrap;overflow:auto;-webkit-overflow-scrolling:touch}.tabulator .tabulator-tableholder:focus{outline:none}.tabulator .tabulator-tableholder .tabulator-placeholder{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:100%}.tabulator .tabulator-tableholder .tabulator-placeholder[tabulator-render-mode=virtual]{min-height:100%;min-width:100%}.tabulator .tabulator-tableholder .tabulator-placeholder .tabulator-placeholder-contents{display:inline-block;text-align:center;padding:10px;color:#ccc;font-weight:700;font-size:20px;white-space:normal}.tabulator .tabulator-tableholder .tabulator-table{position:relative;display:inline-block;background-color:#fff;white-space:nowrap;overflow:visible;color:#333}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.tabulator-calcs{font-weight:700;background:#dadfe4!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.tabulator-calcs.tabulator-calcs-top{border-bottom:2px solid #dee2e6}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.tabulator-calcs.tabulator-calcs-bottom{border-top:2px solid #dee2e6}.tabulator .tabulator-footer{border-top:1px solid #dee2e6;background-color:#e6e6e6;color:#555;font-weight:700;white-space:nowrap;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none}.tabulator .tabulator-footer .tabulator-footer-contents{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:5px 10px}.tabulator .tabulator-footer .tabulator-footer-contents:empty{display:none}.tabulator .tabulator-footer .tabulator-calcs-holder{box-sizing:border-box;width:100%;text-align:left;background:#f3f3f3!important;border-bottom:1px solid #dee2e6;border-top:1px solid #dee2e6;overflow:hidden}.tabulator .tabulator-footer .tabulator-calcs-holder .tabulator-row{display:inline-block;background:#f3f3f3!important}.tabulator .tabulator-footer .tabulator-calcs-holder .tabulator-row .tabulator-col-resize-handle{display:none}.tabulator .tabulator-footer .tabulator-calcs-holder:only-child{margin-bottom:-5px;border-bottom:none}.tabulator .tabulator-footer>*+.tabulator-page-counter{margin-left:10px}.tabulator .tabulator-footer .tabulator-page-counter{font-weight:400}.tabulator .tabulator-footer .tabulator-paginator{flex:1;text-align:right;color:#555;font-family:inherit;font-weight:inherit;font-size:inherit}.tabulator .tabulator-footer .tabulator-page-size{display:inline-block;margin: 5px;padding: 8px 12px;;border:1px solid #dee2e6;border-radius:3px}.tabulator .tabulator-footer .tabulator-pages{margin:0 7px}.tabulator .tabulator-footer .tabulator-page{display:inline-block;margin:0 2px;padding:2px 5px;border:1px solid #dee2e6;border-radius:3px;background:hsla(0,0%,100%,.2)}.tabulator .tabulator-footer .tabulator-page:disabled{opacity:.5}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-footer .tabulator-page:not(.disabled):hover{cursor:pointer;background:rgba(0,0,0,.2);color:#fff}}.tabulator .tabulator-col-resize-handle{position:relative;display:inline-block;width:6px;margin-left:-3px;margin-right:-3px;z-index:10;vertical-align:middle}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-col-resize-handle:hover{cursor:ew-resize}}.tabulator .tabulator-col-resize-handle:last-of-type{width:3px;margin-right:0}.tabulator .tabulator-alert{position:absolute;display:flex;align-items:center;top:0;left:0;z-index:100;height:100%;width:100%;background:rgba(0,0,0,.4);text-align:center}.tabulator .tabulator-alert .tabulator-alert-msg{display:inline-block;margin:0 auto;padding:10px 20px;border-radius:10px;background:#fff;font-weight:700;font-size:16px}.tabulator .tabulator-alert .tabulator-alert-msg.tabulator-alert-state-msg{border:4px solid #333;color:#000}.tabulator .tabulator-alert .tabulator-alert-msg.tabulator-alert-state-error{border:4px solid #d00;color:#590000}.tabulator-row{position:relative;box-sizing:border-box;min-height:24px;background-color:#fff}.tabulator-row.tabulator-row-even{background-color:#e9ecef}@media (hover:hover) and (pointer:fine){.tabulator-row.tabulator-selectable:hover{background-color:#ced4da;cursor:pointer}}.tabulator-row.tabulator-selected{background-color:#9abcea}@media (hover:hover) and (pointer:fine){.tabulator-row.tabulator-selected:hover{background-color:#769bcc;cursor:pointer}}.tabulator-row.tabulator-row-moving{border:1px solid #000;background:#fff}.tabulator-row.tabulator-moving{position:absolute;border-top:1px solid #dee2e6;border-bottom:1px solid #dee2e6;pointer-events:none;z-index:15}.tabulator-row .tabulator-row-resize-handle{position:absolute;right:0;bottom:0;left:0;height:5px}.tabulator-row .tabulator-row-resize-handle.prev{top:0;bottom:auto}@media (hover:hover) and (pointer:fine){.tabulator-row .tabulator-row-resize-handle:hover{cursor:ns-resize}}.tabulator-row .tabulator-responsive-collapse{box-sizing:border-box;padding:5px;border-top:1px solid #dee2e6;border-bottom:1px solid #dee2e6}.tabulator-row .tabulator-responsive-collapse:empty{display:none}.tabulator-row .tabulator-responsive-collapse table{font-size:16px}.tabulator-row .tabulator-responsive-collapse table tr td{position:relative}.tabulator-row .tabulator-responsive-collapse table tr td:first-of-type{padding-right:10px}.tabulator-row .tabulator-cell{display:inline-block;position:relative;box-sizing:border-box;padding:4px;border-right:1px solid #dee2e6;vertical-align:middle;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tabulator-row .tabulator-cell.tabulator-frozen{display:inline-block;position:sticky;left:0;background-color:inherit;z-index:10}.tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-left{border-right:2px solid #dee2e6}.tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-right{border-left:2px solid #dee2e6}.tabulator-row .tabulator-cell.tabulator-editing{border:1px solid #1d68cd;outline:none;padding:0}.tabulator-row .tabulator-cell.tabulator-editing input,.tabulator-row .tabulator-cell.tabulator-editing select{border:1px;background:transparent;outline:none}.tabulator-row .tabulator-cell.tabulator-validation-fail{border:1px solid #d00}.tabulator-row .tabulator-cell.tabulator-validation-fail input,.tabulator-row .tabulator-cell.tabulator-validation-fail select{border:1px;background:transparent;color:#d00}.tabulator-row .tabulator-cell.tabulator-row-handle{display:inline-flex;align-items:center;justify-content:center;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none}.tabulator-row .tabulator-cell.tabulator-row-handle .tabulator-row-handle-box{width:80%}.tabulator-row .tabulator-cell.tabulator-row-handle .tabulator-row-handle-box .tabulator-row-handle-bar{width:100%;height:3px;margin-top:2px;background:#666}.tabulator-row .tabulator-cell .tabulator-data-tree-branch{display:inline-block;vertical-align:middle;height:9px;width:7px;margin-top:-9px;margin-right:5px;border-bottom-left-radius:1px;border-left:2px solid #dee2e6;border-bottom:2px solid #dee2e6}.tabulator-row .tabulator-cell .tabulator-data-tree-control{display:inline-flex;justify-content:center;align-items:center;vertical-align:middle;height:11px;width:11px;margin-right:5px;border:1px solid #333;border-radius:2px;background:rgba(0,0,0,.1);overflow:hidden}@media (hover:hover) and (pointer:fine){.tabulator-row .tabulator-cell .tabulator-data-tree-control:hover{cursor:pointer;background:rgba(0,0,0,.2)}}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-collapse{display:inline-block;position:relative;height:7px;width:1px;background:transparent}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-collapse:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-expand{display:inline-block;position:relative;height:7px;width:1px;background:#333}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-expand:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle{display:inline-flex;align-items:center;justify-content:center;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;height:15px;width:15px;border-radius:20px;background:#666;color:#fff;font-weight:700;font-size:1.1em}@media (hover:hover) and (pointer:fine){.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle:hover{opacity:.7;cursor:pointer}}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle.open .tabulator-responsive-collapse-toggle-close{display:initial}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle.open .tabulator-responsive-collapse-toggle-open{display:none}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle svg{stroke:#fff}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle .tabulator-responsive-collapse-toggle-close{display:none}.tabulator-row .tabulator-cell .tabulator-traffic-light{display:inline-block;height:14px;width:14px;border-radius:14px}.tabulator-row.tabulator-group{box-sizing:border-box;border-bottom:1px solid #999;border-right:1px solid #dee2e6;border-top:1px solid #999;padding:5px 5px 5px 10px;background:#ccc;font-weight:700;min-width:100%}@media (hover:hover) and (pointer:fine){.tabulator-row.tabulator-group:hover{cursor:pointer;background-color:rgba(0,0,0,.1)}}.tabulator-row.tabulator-group.tabulator-group-visible .tabulator-arrow{margin-right:10px;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #666;border-bottom:0}.tabulator-row.tabulator-group.tabulator-group-level-1{padding-left:30px}.tabulator-row.tabulator-group.tabulator-group-level-2{padding-left:50px}.tabulator-row.tabulator-group.tabulator-group-level-3{padding-left:70px}.tabulator-row.tabulator-group.tabulator-group-level-4{padding-left:90px}.tabulator-row.tabulator-group.tabulator-group-level-5{padding-left:110px}.tabulator-row.tabulator-group .tabulator-group-toggle{display:inline-block}.tabulator-row.tabulator-group .tabulator-arrow{display:inline-block;width:0;height:0;margin-right:16px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:0;border-left:6px solid #666;vertical-align:middle}.tabulator-row.tabulator-group span{margin-left:10px;color:#d00}.tabulator-popup-container{position:absolute;display:inline-block;box-sizing:border-box;border:1px solid #dee2e6;box-shadow:0 0 5px 0 rgba(0,0,0,.2);font-size:16px;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:10000}.tabulator-popup{padding:5px;border-radius:3px}.tabulator-tooltip{max-width:Min(500px,100%);padding:3px 5px;border-radius:2px;box-shadow:none;font-size:12px;pointer-events:none}.tabulator-menu .tabulator-menu-item{position:relative;box-sizing:border-box;padding:5px 10px;user-select:none}.tabulator-menu .tabulator-menu-item.tabulator-menu-item-disabled{opacity:.5}@media (hover:hover) and (pointer:fine){.tabulator-menu .tabulator-menu-item:not(.tabulator-menu-item-disabled):hover{cursor:pointer;background:#e9ecef}}.tabulator-menu .tabulator-menu-item.tabulator-menu-item-submenu{padding-right:25px}.tabulator-menu .tabulator-menu-item.tabulator-menu-item-submenu:after{display:inline-block;position:absolute;top:calc(5px + .4em);right:10px;height:7px;width:7px;content:"";border-color:#dee2e6;border-style:solid;border-width:1px 1px 0 0;vertical-align:top;transform:rotate(45deg)}.tabulator-menu .tabulator-menu-separator{border-top:1px solid #dee2e6}.tabulator-edit-list{max-height:200px;font-size:16px;overflow-y:auto;-webkit-overflow-scrolling:touch}.tabulator-edit-list .tabulator-edit-list-item{padding:4px;color:#333;outline:none}.tabulator-edit-list .tabulator-edit-list-item.active{background:#1d68cd}.tabulator-edit-list .tabulator-edit-list-item.focused{outline:1px solid #1d68cd}@media (hover:hover) and (pointer:fine){.tabulator-edit-list .tabulator-edit-list-item:hover{cursor:pointer;color:#fff;background:#1d68cd}}.tabulator-edit-list .tabulator-edit-list-placeholder{padding:4px;color:#333;text-align:center}.tabulator-edit-list .tabulator-edit-list-group{border-bottom:1px solid #dee2e6;padding:6px 4px 4px;color:#333;font-weight:700}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-2,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-2{padding-left:12px}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-3,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-3{padding-left:20px}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-4,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-4{padding-left:28px}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-5,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-5{padding-left:36px}.tabulator.tabulator-ltr{direction:ltr}.tabulator.tabulator-rtl{text-align:initial;direction:rtl}.tabulator.tabulator-rtl .tabulator-header .tabulator-col{border-left:1px solid #aaa;border-right:initial}.tabulator.tabulator-rtl .tabulator-header .tabulator-col.tabulator-col-group .tabulator-col-group-cols{margin-right:0;margin-left:-1px}.tabulator.tabulator-rtl .tabulator-header .tabulator-col.tabulator-sortable .tabulator-col-title{padding-right:0;padding-left:25px}.tabulator.tabulator-rtl .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter{left:8px;right:auto}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell{border-right:initial;border-left:1px solid #dee2e6}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell .tabulator-data-tree-branch{margin-right:0;margin-left:5px;border-bottom-left-radius:0;border-bottom-right-radius:1px;border-left:initial;border-right:2px solid #dee2e6}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell .tabulator-data-tree-control{margin-right:0;margin-left:5px}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-left{border-left:2px solid #dee2e6}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-right{border-right:2px solid #dee2e6}.tabulator.tabulator-rtl .tabulator-row .tabulator-col-resize-handle:last-of-type{width:3px;margin-left:0;margin-right:-3px}.tabulator.tabulator-rtl .tabulator-footer .tabulator-calcs-holder{text-align:initial}.tabulator-print-fullscreen{position:absolute;top:0;bottom:0;left:0;right:0;z-index:10000}body.tabulator-print-fullscreen-hide>:not(.tabulator-print-fullscreen){display:none!important}.tabulator-print-table{border-collapse:collapse}.tabulator-print-table .tabulator-data-tree-branch{display:inline-block;vertical-align:middle;height:9px;width:7px;margin-top:-9px;margin-right:5px;border-bottom-left-radius:1px;border-left:2px solid #dee2e6;border-bottom:2px solid #dee2e6}.tabulator-print-table .tabulator-print-table-group{box-sizing:border-box;border-bottom:1px solid #999;border-right:1px solid #dee2e6;border-top:1px solid #999;padding:5px 5px 5px 10px;background:#ccc;font-weight:700;min-width:100%}@media (hover:hover) and (pointer:fine){.tabulator-print-table .tabulator-print-table-group:hover{cursor:pointer;background-color:rgba(0,0,0,.1)}}.tabulator-print-table .tabulator-print-table-group.tabulator-group-visible .tabulator-arrow{margin-right:10px;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #666;border-bottom:0}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-1 td{padding-left:30px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-2 td{padding-left:50px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-3 td{padding-left:70px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-4 td{padding-left:90px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-5 td{padding-left:110px!important}.tabulator-print-table .tabulator-print-table-group .tabulator-group-toggle{display:inline-block}.tabulator-print-table .tabulator-print-table-group .tabulator-arrow{display:inline-block;width:0;height:0;margin-right:16px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:0;border-left:6px solid #666;vertical-align:middle}.tabulator-print-table .tabulator-print-table-group span{margin-left:10px;color:#d00}.tabulator-print-table .tabulator-data-tree-control{display:inline-flex;justify-content:center;align-items:center;vertical-align:middle;height:11px;width:11px;margin-right:5px;border:1px solid #333;border-radius:2px;background:rgba(0,0,0,.1);overflow:hidden}@media (hover:hover) and (pointer:fine){.tabulator-print-table .tabulator-data-tree-control:hover{cursor:pointer;background:rgba(0,0,0,.2)}}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-collapse{display:inline-block;position:relative;height:7px;width:1px;background:transparent}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-collapse:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-expand{display:inline-block;position:relative;height:7px;width:1px;background:#333}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-expand:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator{background-color:#fff;border:none}.tabulator .tabulator-header{border-top:1px solid #dee2e6;border-bottom:2px solid #dee2e6;color:inherit}.tabulator .tabulator-header .tabulator-col{border-right:none;background-color:#fff}.tabulator .tabulator-header .tabulator-col .tabulator-col-content{padding:12px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter{right:0}.tabulator .tabulator-header .tabulator-col.tabulator-col-group .tabulator-col-group-cols{border-top:1px solid #dee2e6}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter input{padding:.375rem .75rem;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;font-size:1rem;line-height:1.5;color:#495057}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter input:focus{color:#495057;background-color:#fff;border:1px solid #1d68cd;outline:0}.tabulator .tabulator-header .tabulator-calcs-holder{width:100%;border-bottom:1px solid #dee2e6}.tabulator .tabulator-tableholder .tabulator-placeholder span{color:#000}.tabulator .tabulator-footer,.tabulator .tabulator-footer .tabulator-paginator,.tabulator .tabulator-tableholder .tabulator-table{color:inherit}.tabulator .tabulator-footer .tabulator-pages{margin:0}.tabulator .tabulator-footer .tabulator-page{margin:5px 0 0;padding:8px 12px}.tabulator .tabulator-footer .tabulator-page[data-page=first]{border-top-left-radius:4px;border-bottom-left-radius:4px}.tabulator .tabulator-footer .tabulator-page[data-page=last]{border:1px solid #dee2e6;border-top-right-radius:4px;border-bottom-right-radius:4px}.tabulator .tabulator-footer .tabulator-page.active{border-color:#0d6efd;background-color:#0d6efd;color:#fff}.tabulator .tabulator-footer .tabulator-page:disabled{border-color:#dee2e6;background:#fff;color:#6c757d}@media (hover:hover) and (pointer:fine){.tabulator .tabulator-footer .tabulator-page:not(.disabled):hover{border-color:#dee2e6;background:#e9ecef;color:#0a58ca}}.tabulator.thead-dark .tabulator-header,.tabulator.thead-dark .tabulator-header .tabulator-col{border-color:#dee2e6;background-color:#fff;color:#212529}.tabulator.table{background-color:#fff}.tabulator.table:not(.thead-light) .tabulator-header,.tabulator.table:not(.thead-light) .tabulator-header .tabulator-col{border-color:#dee2e6;background-color:#fff;color:#212529}.tabulator.table .tabulator-tableholder{color:#212529}.tabulator.table .tabulator-row{border-color:#dee2e6;background-color:#fff;color:#212529}@media (hover:hover) and (pointer:fine){.tabulator.table .tabulator-row:hover{background-color:#dee2e6}.tabulator.table .tabulator-row:hover .tabulator-cell{background-color:#ced4da}}.tabulator.table .tabulator-row.tabulator-selected{background-color:#9abcea}.tabulator.table .tabulator-footer{border-color:#dee2e6!important}.tabulator.table .tabulator-footer .tabulator-calcs-holder{border-color:#dee2e6!important;background:#fff!important}.tabulator.table .tabulator-footer .tabulator-calcs-holder .tabulator-row{border-color:#dee2e6!important;background-color:#fff!important;color:#212529!important}.tabulator.table-striped:not(.table) .tabulator-row.tabulator-row-even{background-color:#e9ecef}.tabulator.table-striped:not(.table) .tabulator-row.tabulator-row-even.tabulator-selected{background-color:#9abcea}@media (hover:hover) and (pointer:fine){.tabulator.table-striped:not(.table) .tabulator-row.tabulator-row-even.tabulator-selectable:hover{background-color:#ced4da;cursor:pointer}.tabulator.table-striped:not(.table) .tabulator-row.tabulator-row-even.tabulator-selected:hover{background-color:#769bcc;cursor:pointer}}.tabulator.table-striped.table .tabulator-row:nth-child(2n) .tabulator-cell{background-color:transparent}.tabulator.table-bordered{border:1px solid #dee2e6}.tabulator.table-bordered .tabulator-header .tabulator-col,.tabulator.table-bordered .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell{border-right:1px solid #dee2e6}.tabulator.table-borderless .tabulator-header,.tabulator.table-borderless .tabulator-row{border:none}.tabulator.table-sm .tabulator-header .tabulator-col .tabulator-col-content{padding:5px!important}.tabulator.table-sm .tabulator-tableholder .tabulator-table .tabulator-row{min-height:26px}.tabulator.table-sm .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell{padding:5px!important}.tabulator.table-sm .tabulator-row{padding-top:0;padding-bottom:0}.tabulator.table-sm .tabulator-col-resize-handle{padding:0}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-primary{background:#cfe2ff!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-secondary{background:#e2e3e5!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-success{background:#d1e7dd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-info{background:#cff4fc!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-warning{background:#fff3cd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-danger{background:#f8d7da!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-light{background:#f8f9fa!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table{background:#212529!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.table-active{background:#6c757d!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-primary{background:#cfe2ff!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-secondary{background:#e2e3e5!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-success{background:#d1e7dd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-info{background:#cff4fc!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-warning{background:#fff3cd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-danger{background:#f8d7da!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-light{background:#f8f9fa!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-dark{background:#212529!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.bg-active{background:#6c757d!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-primary{background:#cfe2ff!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-secondary{background:#e2e3e5!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-success{background:#d1e7dd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-info{background:#cff4fc!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-warning{background:#fff3cd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-danger{background:#f8d7da!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-light{background:#f8f9fa!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table{background:#212529!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.table-active{background:#6c757d!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-primary{background:#cfe2ff!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-secondary{background:#e2e3e5!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-success{background:#d1e7dd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-info{background:#cff4fc!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-warning{background:#fff3cd!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-danger{background:#f8d7da!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-light{background:#f8f9fa!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-dark{background:#212529!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row .tabulator-cell.bg-active{background:#6c757d!important}.tabulator-row{min-height:40px;border-bottom:1px solid #dee2e6}.tabulator-row .tabulator-cell{padding:12px;border-right:none}.tabulator-row .tabulator-cell:last-of-type{border-right:none}.tabulator-row .tabulator-cell .tabulator-data-tree-control{border:1px solid #ccc}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-collapse:after,.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-expand,.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-expand:after{background:#ccc}.tabulator-row.tabulator-group{background:#fafafa}.tabulator-row.tabulator-group span{color:#666}.tabulator-edit-select-list{background:#fff}.tabulator-edit-select-list .tabulator-edit-select-list-item.active{color:#fff}.tabulator-edit-select-list .tabulator-edit-select-list-item.active.focused{outline:1px solid hsla(0,0%,100%,.5)}@media (hover:hover) and (pointer:fine){.tabulator-edit-select-list .tabulator-edit-select-list-item:hover{color:#fff}}.tabulator-edit-select-list .tabulator-edit-select-list-group,.tabulator-edit-select-list .tabulator-edit-select-list-notice{color:inherit}.tabulator.tabulator-rtl .tabulator-header .tabulator-col{text-align:initial;border-left:initial}.tabulator-print-table .tabulator-print-table-group{background:#fafafa}.tabulator-print-table .tabulator-print-table-group span{color:#666}.tabulator-print-table .tabulator-data-tree-control{color:inherit}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-collapse:after,.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-expand,.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-expand:after{background:#ccc}.tabulator-popup-container{background:#fff}.tabulator-edit-list .tabulator-edit-list-item.active{color:#fff}.tabulator-edit-list .tabulator-edit-list-item.active.focused{outline:1px solid hsla(0,0%,100%,.5)}@media (hover:hover) and (pointer:fine){.tabulator-edit-list .tabulator-edit-list-item:hover{color:#fff}}
    /* Custom styles for the filter bar */
    #filter-value {
      padding: 4px;
      border: 1px solid #000;
      border-radius: 4px;
    }

    #filter-field {
      padding: 4px;
      border: 1px solid #000;
      border-radius: 4px;
    }

    .fltr-btn {
      padding: 4px 8px;
      background-color: #999;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .fltr-btn:hover {
      background-color: #666;
    }

    .fltr-btn:active {
      background-color: #666;
    }
    .choices-container {
      display: flex;
      flex-wrap: wrap;
    }

    .choice-pill {
      display: inline-flex;
      align-items: center;
      background-color: #e1e1e1;
      color: #333;
      border-radius: 10px;
      padding: 4px 8px;
      margin-right: 4px;
      margin-bottom: 4px;
      font-size: 12px;
    }
    .neo-lv-table {
    border: var(--ntx-form-theme-border-width) var(--ntx-form-theme-border-style) var(--ntx-form-theme-color-border);
    border-radius: var(--ntx-form-theme-border-radius);
}
  `;

  static get properties() {
    return {
      dataobject: { type: String },
      pageItemLimit: { type: Number },
      currentPage: { type: Number },
      listURL: { type: String },
      headersElement: { type: String },
      table: { type: Object },
      keys: { type: Array },
    };
  }

  constructor() {
    super();
    this.dataobject = '';
    this.listURL = '';
    this.pageItemLimit = 5;
    this.currentPage = 0;
    this.table = null;
    this.keys = [];
    this.listdata = [];
  }

  parseDataObject() {
    let tabledata, keys;

    try {
      tabledata = JSON.parse(this.dataobject);
      tabledata = this.replaceUnicodeRegex(tabledata);
      keys = tabledata.length > 0 ? Object.keys(tabledata[0]) : [];
    } catch (e) {
      console.error(e);
      tabledata = null;
      keys = [];
    }

    return { data: tabledata, keys };
  }

  constructUrl(baseUrl, endpoint) {
    return baseUrl.endsWith('/') ? `${baseUrl}${endpoint}` : `${baseUrl}/${endpoint}`;
  }


  replaceUnicodeRegex(input) {
    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    return JSON.parse(JSON.stringify(input).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  preprocessData() {
    this.listdata = this.listdata.map((item, index) => {
      // Check if item is null or not an object
      if (!item || typeof item !== 'object') {
        return item;
      }
  
      let newItem = { ...item };
  
      // Handle objects with the "Person" field data structure
      for (const [key, value] of Object.entries(item)) {
        // Check if value is null or not an object
        if (!value || typeof value !== 'object') {
          continue;
        }
  
        if (Object.keys(value).includes('EMail')) {
          const parentKeyName = key;
          const emailKey = `${parentKeyName}_Email`;
          const usernameKey = `${parentKeyName}_Username`;
          const displayNameKey = `${parentKeyName}_DisplayName`;
  
          newItem[parentKeyName] = value.EMail; // Replace the parent key field with the email property
          delete newItem[emailKey]; // Remove the _Email field
          delete newItem[usernameKey]; // Remove the _Username field
          delete newItem[displayNameKey]; // Remove the _DisplayName field
        }
      }
  
      // Process each property of the item
      for (const [key, value] of Object.entries(item)) {
        // Handle location field
        if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
          try {
            const locationObj = JSON.parse(value);
            if (
              locationObj.Address &&
              locationObj.Address.Street &&
              locationObj.Address.City &&
              locationObj.Address.CountryOrRegion
            ) {
              newItem[key] = `${locationObj.Address.Street}, ${locationObj.Address.City}, ${locationObj.Address.CountryOrRegion}`;
            }
          } catch (error) {
            // Invalid JSON, leave the value as it is
          }
        }
  
        // Handle date and time fields
        if (typeof value === 'string') {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            // Valid date, check if ISO formatted
            if (value === date.toISOString()) {
              // ISO formatted, update the value
              if (key.toLowerCase().includes('date')) {
                newItem[key] = date.toLocaleDateString('en-GB');
              }
              if (key.toLowerCase().includes('datetime')) {
                newItem[key] = date.toLocaleString('en-GB');
              }
            }
          }
        }
  
        // Handle image field
        if (typeof value === 'string') {
          try {
            const imgObj = JSON.parse(value);
            if (imgObj.serverUrl && imgObj.serverRelativeUrl) {
              newItem[key] = `<img height="42px" width="42px" src="${imgObj.serverUrl}${imgObj.serverRelativeUrl}" alt="Image">`;
            }
          } catch (error) {
            // Invalid JSON, leave the value as it is
          }
        }
  
        // Handle hyperlink field
        if (typeof value === 'string') {
          const regex = /^https?:\/\/[^\s,]+, .+$/;
          if (regex.test(value)) {
            const [url, label] = value.split(', ');
            newItem[key] = url; // Store only the URL part
          }
        }

        // Handle semicolon-separated values
        if (typeof value === 'string' && value.includes(';')) {
          const choices = value.split(';').map(choice => choice.trim().replace('#', ''));
          newItem[key] = choices.map(choice => html`<span class="choice-pill">${choice}</span>`);
        }
      }
  
      return newItem;
    });
  }
  
  firstUpdated() {
    super.firstUpdated();
  
    const { data: tabledata, keys } = this.parseDataObject();
  
    if (!tabledata) {
      console.error('Invalid data object');
      return;
    }
  
    this.keys = keys;
  
    // Preprocess the data
    this.listdata = tabledata.map(item => ({ ...item })); // Make a copy of the tabledata array
  
    this.preprocessData();
  
    // Replace Unicode regex
    const processedData = this.replaceUnicodeRegex(this.listdata);

    // Handle formatting
    const columns = Object.keys(processedData[0]).map(key => {
      return {
        title: key,
        field: key,
        formatter: (cell) => {
          const value = cell.getValue();
          if (value === null || value === undefined) {
            return ''; // Return an empty string for null or undefined values
          } else if (typeof value === 'string' && value.startsWith('http')) {
            return html`<a href="${value}" target="_blank">${value}</a>`;
          }
          return value;
        }
      };
    });
    
    const tableDiv = this.shadowRoot.querySelector('#table'); // Get the table div
    tableDiv.classList.add("neo-lv-table");
  
    // Keep a reference to the Tabulator instance
    this.table = new Tabulator(tableDiv, {
      data: processedData, // Use the preprocessed and parsed data
      layout: 'fitDataFill',
      pagination: 'local',
      paginationSize: this.pageItemLimit,
      paginationSizeSelector: [5, 10, 15, 30, 50, 100],
      movableColumns: true,
      height: 'auto',
      columns: columns, // Use the dynamically generated columns definition
    });
  
    this.table.on("rowDblClick", (e, row) => {
      // Double-click event handler
      const id = row.getData().ID; // Get the ID value from the double-clicked row
      const url = `${this.listURL}/DispForm.aspx?ID=${id}`; // Combine the list URL and ID to form the SharePoint item URL
      window.open(url, "_blank");
    });
  
    this.table.on("rowClick", (e, row) => {
      // Row click event handler
      e.preventDefault(); // Prevent default row selection behavior
    });
  }

  
  handleFilterClick() {
    const filterField = this.shadowRoot.querySelector('#filter-field').value;
    const filterValue = this.shadowRoot.querySelector('#filter-value').value;
    this.table.setFilter(filterField, "like", filterValue);
  }

  handleResetClick() {
    this.table.clearFilter();
  }

  render() {
    return html`
    <div style="margin-bottom:5px">
      <select id="filter-field">
        ${this.keys.map(key => html`<option value="${key}">${key}</option>`)}
      </select>
      <input id="filter-value" type="text" placeholder="Filter value"/>
      <button id="filter-btn" class="fltr-btn" @click="${this.handleFilterClick}">Filter</button>
      <button id="reset-btn" class="fltr-btn" @click="${this.handleResetClick}">Reset</button>
    </div>
    <div id="table"></div>
`;
  }
}

customElements.define('neo-listviewer', listviewElement);