import Vue from 'vue'


export const SHOW_MSG = 'show-msg';

export const eventBusService = new Vue();

// Supported types: success, danger
export function showMsg(txt, type='success') {
    eventBusService.$emit(SHOW_MSG, { txt, type});
}