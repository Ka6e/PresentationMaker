enum EditorActions {
    IMPORT = 'IMPORT',
    EXPORT = 'EXPORT',


}
 
const importAction = (jsonString: string) => {
    return {
        type: EditorActions.IMPORT,
        payload: jsonString,
    }
}

const exportAсtion = () => {
    return {
        type: EditorActions.EXPORT,
    }
}

export{
    importAction,
    exportAсtion,
    EditorActions,
}
