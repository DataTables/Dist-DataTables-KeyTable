import DataTables, { Context, Api, CellIdx, ApiCellMethods, Dom } from 'datatables.net';
export { default } from 'datatables.net';

declare class KeyTable {
    static defaults: Defaults;
    static version: string;
    private c;
    private s;
    constructor(dt: Context | Api, opts: Config);
    /**
     * Blur the table's cell focus
     */
    blur(): void;
    /**
     * Enable cell focus for the table
     *
     * @param state Can be `true`, `false` or `-string navigation-only`
     */
    enable(state: boolean | 'navigation-only' | 'tab-only'): void;
    /**
     * Get enable status
     */
    enabled(): boolean | "navigation-only" | "tab-only";
    /**
     * Focus on a cell
     *
     * @param row    Row index
     * @param column Column index
     */
    focus(row: number, column: number): void;
    /**
     * Is the cell focused
     * @param  cell Cell index to check
     * @returns true if focused, false otherwise
     */
    focused(cell: CellIdx): boolean;
    /**
     * Initialise the KeyTable instance
     */
    private _init;
    /**
     * Blur the control
     *
     * @param noEvents Don't trigger updates / events (for destroying)
     */
    private _blur;
    /**
     * Clipboard interaction handlers
     */
    private _clipboard;
    /**
     * Get an array of the column indexes that KeyTable can operate on. This
     * is a merge of the user supplied columns and the visible columns.
     */
    private _columns;
    /**
     * Perform excel like navigation for Editor by triggering an edit on key
     * press
     *
     * @param key Key code for the pressed key
     * @param orig Original event
     */
    private _editor;
    private _inlineOptions;
    /**
     * Emit an event on the DataTable for listeners
     *
     * @param name Event name
     * @param args Event arguments
     */
    private _emitEvent;
    /**
     * Focus on a particular cell, shifting the table's paging if required
     *
     * @param row Can be given as an API instance that
     *   contains the cell to focus or as an integer. As the latter it is the
     *   visible row index (from the whole data set) - NOT the data index
     * @param column Not required if a cell is given as the first
     *   parameter. Otherwise this is the column data index for the cell to
     *   focus on
     * @param shiftKey Should the viewport be moved to show cell
     * @param originalEvent Triggering event
     */
    private _focus;
    /**
     * Handle key press
     *
     * @param e Event
     */
    private _key;
    /**
     * Whether we perform a key shift action immediately or not depends upon if
     * Editor is being used. If it is, then we wait until it completes its
     * action
     *
     * @param action Function to trigger when ready
     */
    private _keyAction;
    /**
     * Remove focus from all tables other than this one
     */
    private _removeOtherFocus;
    /**
     * Scroll a container to make a cell visible in it. This can be used for
     * both DataTables scrolling and native window scrolling.
     *
     * @param container Scrolling container
     * @param scroller  Item being scrolled
     * @param cell      Cell in the scroller
     * @param posOff    `position` or `offset` - which to use for the
     *   calculation. `offset` for the document, otherwise `position`
     */
    private _scroll;
    /**
     * Calculate a single offset movement in the table - up, down, left and
     * right and then perform the focus if possible
     *
     * @param e           Event object
     * @param direction   Movement direction
     * @param keyBlurable `true` if the key press can result in the table being
     *   blurred. This is so arrow keys won't blur the table, but tab will.
     */
    private _shift;
    /**
     * Create and insert a hidden input element that can receive focus on behalf
     * of the table
     *
     */
    private _tabInput;
    /**
     * Update fixed columns if they are enabled and if the cell we are
     * focusing is inside a fixed column
     * @param  column Index of the column being changed
     */
    private _updateFixedColumns;
}

declare module 'datatables.net' {
    interface Config {
        /**
         * KeyTable extension options
         */
        keys?: boolean | Config;
    }
    interface Defaults {
        /**
         * KeyTable defaults
         */
        keys?: Defaults;
    }
    interface Api<T> {
        /**
         * KeyTable methods container
         *
         * @returns Api for chaining with the additional KeyTable methods
         */
        keys: ApiKeyTableMethods<T>;
    }
    interface ApiCell<T> {
        /**
         * Blur focus from the currently focused cell
         */
        blur(): Api<T>;
    }
    interface ApiCellMethods<T> {
        /**
         * Focus on a cell
         */
        focus(): Api<T>;
    }
    interface DataTablesStatic {
        /**
         * KeyTable class
         */
        KeyTable: typeof KeyTable;
    }
    interface ApiSelectorModifier {
        /**
         * Pick cells which have focus. Note that this is for `cell()` and
         * `cells()` method only
         */
        focused?: boolean | undefined;
    }
    interface Context {
        keytable: KeyTable;
    }
    interface StateLoad {
        keyTable: CellIdx;
    }
}
interface Defaults {
    /**
     * Allow KeyTable's focus to be blurred (removed) from a table
     *
     * When set to true this option allows the table to lose focus (i.e. to be blurred),
     * while false will not allow the table to lose focus.
     */
    blurable: boolean;
    /**
     * Set the class name used for the focused cell
     *
     * The class name to be added and removed from cells as they gain and loose focus.
     */
    className: string;
    /**
     * Enable / disable clipboard interaction with KeyTable
     *
     * A boolean flag that can optionally be used to disable KeyTables' clipboard interaction, or an object for independent control of copy and paste actions.
     */
    clipboard: boolean | {
        copy: boolean;
        paste: boolean;
    };
    /**
     * Set the orthogonal data point for the data to copy to clipboard.
     */
    clipboardOrthogonal: string;
    /**
     * Select the columns that can gain focus
     *
     * The columns that can gain focus. This accepts all of the options of DataTable.ColumnSelector
     * such as class name selector, jQuery pseudo selects and column index selectors.
     */
    columns: any;
    /**
     * Control if editing should be activated immediately upon focus
     *
     * true to enable editing on focus, false to disable.
     */
    editOnFocus: boolean;
    /**
     * Attach an Editor instance for Excel like editing
     *
     * The Editor instance to use for editing of the table
     */
    editor: any;
    /**
     * Editor form options that is given to the `inline()` method.
     */
    editorOptions: ((idx: CellIdx) => any) | null;
    /**
     * Cell to receive initial focus in the table
     *
     * The cell that will receive focus when the table is initialised. This accepts all of
     * the options of DataTable.CellSelector such as class name selector, jQuery pseudo selects and
     * cell index selectors.
     */
    focus: any;
    /**
     * Limit the keys that KeyTable will listen for and take action on
     *
     * As null KeyTable will listen for all key presses, regardless of what key is pressed.
     * an array you can limit the keys that KeyTable will take action on to just the key
     * codes given in the array.
     */
    keys: number[] | null;
    /**
     * Set the table's tab index for when it will receive focus
     *
     * The tab index for the table. Like all other tab indexes, this can be -1 to disallow
     * tabbing into the table.
     */
    tabIndex: number | null;
}
interface Config extends Partial<Defaults> {
}
interface ApiKeyTableMethods<T> extends Api<T> {
    /**
 * Disable KeyTable's interactions (mouse and keyboard)
 *
 * @returns DataTables API instance
 */
    disable(): Api<T>;
    /**
     * Enable or disable KeyTable's interactions (mouse and keyboard)
     *
     * @param options This option can be given as the following values: true - Fully enable KeyTable; false - Fully disable KeyTable (keys.disable()); "navigation-only" - Respond to navigation inputs only;
     * @returns DataTables API instance
     */
    enable(options?: string | boolean): Api<T>;
    /**
     * Determine if KeyTable is enabled on this table
     *
     * @returns Current state
     */
    enabled(): boolean | 'navigation-only';
    /**
     * Move the focus from the current cell to one adjacent to it.
     *
     * @param direction String representing the direction that the focus should move in
     * @returns DataTables API instance.
     */
    move(direction: string): Api<T>;
}
interface Settings {
    /** DataTables' API instance */
    dt: Api;
    /** Indicate when the DataTable is redrawing - take no action on key presses */
    dtDrawing: boolean;
    enable: boolean | 'navigation-only' | 'tab-only';
    /** Flag for if a draw is triggered by focus */
    focusDraw: boolean;
    /**
     * Flag to indicate when waiting for a draw to happen. Will ignore key
     * presses at this point
     */
    waitingForDraw: boolean;
    /** Information about the last cell that was focused */
    lastFocus: null | {
        cell: ApiCellMethods<any>;
        node: HTMLElement;
        relative: {
            row: number;
            column: number;
        };
    };
    /** Unique namespace per instance */
    namespace: string;
    /** Submit on return */
    returnSubmit: boolean;
    /** Input element for tabbing into the table */
    tabInput: Dom | null;
}

export type { Config, Defaults, Settings };
