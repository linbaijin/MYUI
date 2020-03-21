interface TreeDataItem {
    title:string,
    key:string,
    children?:TreeDataItem[]
}


interface RenderTreeItem {
    treeItem:TreeDataItem
    level:number
    treeProps:TreeProps
}

type TreeProps = {
    treeData:TreeDataItem[]
} & ({ multiple:true,selected:string[],onChange:(selected:string[]) => void} |
    { multiple:false, selected:string,onChange:(selected:string) => void})
