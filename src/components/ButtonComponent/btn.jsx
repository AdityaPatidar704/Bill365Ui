export function ButtonComponent(props){
    const handleNoNeed=()=>{

    }
    return(
        <button type={props.type?props.type:undefined} className={props.className} onClick={props.onClick?props.onClick:undefined} value={props.value}>{props.label}</button>
    )
}