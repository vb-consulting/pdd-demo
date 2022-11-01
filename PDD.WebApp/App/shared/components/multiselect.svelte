<script lang="ts">
    import { fly } from "svelte/transition";
    import { hideTooltips } from "./tooltips"
    import { mark, generateId } from "./strings";

    export let id: string = "ms-" + generateId();
    export let placeholder = "";
    export let searchFunc: (request: IMultiselectRequest) => Promise<IMultiselectResponse>;
    export let selected: IValueName[] = [];
    export let limit = 200;
    export let page = 50;
    export let count: number = 0;
    export const searchTimeoutMs = 500;
    /**
     * A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method Document.getElementsByClassName().
     */
    export { classes as class };
    /*
    * Contains CSS styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the style element have mainly the purpose of allowing for quick styling, for example for testing purposes.
    */
    export { styles as style };
    
    let classes: string = "";
    let styles: string = "";

    let selectedKeys: Record<any, boolean> = {};

    let input: HTMLInputElement;
    let inputValue: string;
    let list: HTMLUListElement;

    let activeIdx: number | undefined; 
    let options: IValueName[];
    let showOptions = false;
    let focused: boolean;
    let loading = false;
    let lastQuery: string;
    let offset = 0;

    let searchTimeout: NodeJS.Timeout | undefined;
    let scrollTimeout: NodeJS.Timeout | undefined;
    const scrollTimeoutMs = 500;

    const listItemId = (index: number) => `${id}-option-${index}`;

    const getListDimensions = () => {
        const itemHeight = (list.firstChild as Element).clientHeight;
        const listHeight = list.clientHeight;
        return {
            itemHeight,
            listHeight,
            itemsOnScreen: Math.round(listHeight / itemHeight)
        }
    };
    const load = async () => {
        const query = inputValue ?? "";
        offset = 0;
        loading = true;
        options = [];
        const response = await searchFunc({search: query, limit, offset});
        options = response.page;
        count = response.count;
        loading = false;
        activeIdx = undefined;
        lastQuery = query;
    }

    function search() {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = undefined;
        }
        searchTimeout = setTimeout(() => {
            searchTimeout = undefined;
            if (loading) {
                search();
            } else {
                load();
            }
        }, searchTimeoutMs);
    }

    function addSelected(token: IValueName) {
        if (token) {
            selected = [...selected, token];
            selectedKeys[token.value] = true;
            hideTooltips();
        }
    }

    function removeSelectedByValue(value: any) {
        selected = selected.filter(s => s.value != value);
        delete selectedKeys[value];
        selectedKeys = selectedKeys;
        hideTooltips();
    }

    function clearAllSelected() {
        selected = [];
        selectedKeys = {};
    }

    function optionsVisibility(show: boolean) {
        showOptions = show;
        if (show && !options && !loading) {
            load();
        }
    }

    function handleKey(e: KeyboardEvent) {
        if (loading) {
            return;
        }

        if (!showOptions) {
            if (["Enter", "ArrowUp", "ArrowDown"].includes(e.code)) {
                optionsVisibility(true);
            }
            return;
        }

        if (e.code == "Backspace" && !inputValue && hasSelected) {
            console.log("Remove last");
            //!!!!
            return;
        }

        if (e.code == "Escape") {
            optionsVisibility(false);
            return;
        }

        if (e.code == "Enter") {
            if (activeIdx != undefined) {
                let activeOption = options[activeIdx];
                if (activeOption) {
                    if (selected[activeOption.value]) {
                        removeSelectedByValue(activeOption.value);
                    } else {
                        addSelected(activeOption);
                    }
                }
            }
            return;
        }

        const 
            arrowUp = e.code == "ArrowUp", 
            pageUp = e.code == "PageUp",
            arrowDown = e.code == "ArrowDown", 
            pageDown = e.code == "PageDown";

        if (arrowDown || pageDown || arrowUp || pageUp) {

            let 
                idx = activeIdx, 
                len = options.length;
            const itemsOnScreen = getListDimensions().itemsOnScreen;

            if (arrowDown || pageDown) {
                if (idx == len - 1) {
                    return;
                }
                idx = idx == undefined ? 0 : idx + (pageDown ? itemsOnScreen : 1);
                if (idx > len - 1) {
                    idx = len - 1;
                }
            }
            if (arrowUp || pageUp) {
                if (idx == 0) {
                    return;
                }
                idx = idx == undefined ? len - 1 : idx - (pageUp ? itemsOnScreen : 1);
                if (idx < 0) {
                    idx = 0;
                }
            }

            if (idx != activeIdx) {
                activeIdx = idx;
                listScroll(true).then(() => {
                    let result = list.querySelectorAll(`#${listItemId(activeIdx as number)}`);
                    if (result.length) {
                        result[0].scrollIntoView({block: "nearest"});
                    }
                });
            }
        }
    }

    function handleOptionMousedown(e: MouseEvent) {
        const li = (e.target as any).closest("li") as HTMLLIElement;
        if (!li) {
            return
        }
        const value = li.dataset.value;
        if (!value) {
            return
        }
        if (selectedKeys[value]) {
            removeSelectedByValue(value);
        } else {
            addSelected(options.filter(o => o.value == value)[0]);
            input.focus();
        }
    }

    function inputBlur(e: FocusEvent) {
        if (e.relatedTarget == null || !(e.relatedTarget as Element).classList.contains("token")) {
            optionsVisibility(false);
        }
        focused = false;
    }

    function inputFocus() {
        focused = true;
        optionsVisibility(true);
        input.select();
    }

    async function listScroll(immidiate = false) {
        if (!options || !options.length) {
            return;
        }
        const {itemHeight, listHeight, itemsOnScreen} = getListDimensions();
        const higherTreshold = (itemsOnScreen / 2) * itemHeight;
        const lowerTreshold = (options.length * itemHeight) - listHeight - higherTreshold;

        const doScroll = async (offsetFunc: () => number, optionsFunc: (response: IMultiselectResponse) => IValueName[]) => {
            const scroll = async () => {
                offset = offsetFunc();
                const query = inputValue ?? "";
                loading = true;
                const response = await searchFunc({search: query, limit, offset});
                options = optionsFunc(response);
                loading = false;
            };
            if (immidiate) {
                scroll();
            } else {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = undefined;
                }
                scrollTimeout = setTimeout(async () => {
                    scrollTimeout = undefined;
                    await scroll();
                }, scrollTimeoutMs);
            }
        }

        if (list.scrollTop < higherTreshold && offset > 0) {
            await doScroll(
                () => offset - page < 0 ? 0 : offset - page, 
                response => [...response.page, ...options.slice(0, options.length - page)]
            );
        }

        if (list.scrollTop >= lowerTreshold && (offset + limit <= count)) {
            await doScroll(
                () => offset + page, 
                response => [...options.slice(page, options.length), ...response.page]
            );
        }
    }

    function iconClick() {
        if (!loading && hasSelected) {
            clearAllSelected();
        } 
        input.focus();
        hideTooltips();
    }

    function handleTokenClick(e: MouseEvent, item: IValueName) {
        removeSelectedByValue(item.value);
    }

    $: hasSelected = selected.length;
</script>

<div class="multiselect {classes || ''}" style="{styles || ''}">

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span 
        class="multiselect-icon {loading ? "spinner-border" : (hasSelected ? "bi-x-circle-fill" : "bi-search")}" 
        on:click={() => iconClick()} 
        data-bs-toggle="tooltip"
        title="{loading ? "Loading..." : (hasSelected ? "Clear All" : (placeholder || "Search"))}">
    </span>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="tokens form-control" class:focused class:showOptions on:click={() => input.focus()}>
        {#each selected as item, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="token badge rounded-pill text-bg-secondary" 
                data-bs-toggle="tooltip"
                title="click to remove '{item.name}'" 
                style="{i == 0 ? "margin-left: 15px" : ""}"
                on:click={e => handleTokenClick(e, item)}>
                <span>{item.name}</span>
            </div>
        {/each}
        <div class="actions">
            <input id={id} 
                class=""
                style="{hasSelected ? "" : "text-indent: 18px"}"
                class:ms-1={hasSelected}
                autocomplete="off" 
                autocorrect="off"
                spellcheck="false"
                bind:value={inputValue} 
                bind:this={input} 
                on:keydown={handleKey} 
                on:blur={inputBlur} 
                on:focus={inputFocus} 
                on:input={search}
                placeholder={placeholder} />
            <span class="dropdown-arrow bi-caret-down" on:click={() => input.focus()}></span>
        </div>
    </div>

    {#if options}
        <ul class="options shadow" 
            bind:this={list} 
            class:d-none={!showOptions} 
            transition:fly="{{duration: 200, y: 5}}" 
            on:mousedown|preventDefault={handleOptionMousedown}
            on:scroll={() => listScroll()}>
            {#each options as option, index}
                <li id="{listItemId(index)}" class:selected={selectedKeys[option.value]} class:active={activeIdx == index} data-value="{option.value}">
                    {@html mark(option.name, lastQuery, `<span class="search-mark ${selectedKeys[option.value] ? "active" : ""}">`, "</span>")}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    @import "../../scss/colors";

    $multiselect-dark-theme-input-color: $white;
    $multiselect-option-item-background-color: var(--bs-body-bg);
    $multiselect-option-selected-item-background-color: $primary;
    $multiselect-option-selected-item-color: var(--bs-body-bg);
    
    .multiselect {
        position: relative;
        z-index: 1;

        & > .multiselect-icon {
            position: absolute;
            cursor: pointer;
            margin-left: 8px;
            top: 10px;
            z-index: 2;
        }
        & > .spinner-border {
            width: 16px;
            height: 16px;
            opacity: 0.5;
        }
        & .tokens {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            position: relative;
        }
        & .token {
            align-items: center;
            display: flex;
            transition: background-color .3s;
            white-space: nowrap;
            cursor: pointer;
            font-size: 0.9rem;
            & span {
                font-weight: initial;
            }
        }

        & .actions {
            align-items: center;
            display: flex;
            flex: 1;
            min-width: 15rem;
        }
        & input {
            border: none;
            margin: 0;
            outline: none;
            padding: 0;
            width: 100%;
            background-color: transparent;
        }
        & .options {
            left: 0;
            list-style: none;
            margin-block-end: 0;
            margin-block-start: 0;
            max-height: 70vh;
            overflow: auto;
            padding-inline-start: 0;
            position: absolute;
            top: calc(100% + 5px);
            width: 100%;
            & > li {
                background-color: $multiselect-option-item-background-color;
                cursor: pointer;
                padding: .5rem;
            }
            & > li:hover {
                filter: brightness(85%);
            }
            & > li.selected {
                background-color: $multiselect-option-selected-item-background-color;
                color: $multiselect-option-selected-item-color;
            }
        }
    }

    body.dark .multiselect {
        & input {
            color: $multiselect-dark-theme-input-color;
        }
    }
</style>
